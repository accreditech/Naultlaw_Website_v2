import { NextRequest, NextResponse } from "next/server";

import {
  evaluateSpamSignals,
  formatFieldErrors,
  stageOneIntakeSchema,
} from "@/lib/intake";
import {
  createLeadRecord,
  hashValue,
  logIntakeFailure,
  persistEmailDeliveryResult,
  syncLeadAndPersist,
} from "@/lib/intake-server";
import { sendIntakeEmail } from "@/lib/intake-email";
import { checkLeadRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const rawIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const ipHash = hashValue(rawIp);
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  let payload: Record<string, unknown> = {};

  try {
    const parsedJson = await request.json();
    payload =
      typeof parsedJson === "object" && parsedJson !== null
        ? (parsedJson as Record<string, unknown>)
        : { payload: parsedJson };
  } catch {
    await logIntakeFailure({
      route: "stage-one",
      reason: "Invalid JSON payload.",
      payload: {},
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error: "We could not read that submission. Please try again.",
      },
      { status: 400 }
    );
  }

  const rateLimit = await checkLeadRateLimit({ ipHash });

  if (!rateLimit.allowed) {
    await logIntakeFailure({
      route: "stage-one",
      reason: "Rate limit exceeded.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "Too many intake attempts were received from this connection. Please call the office for time-sensitive issues.",
      },
      { status: 429 }
    );
  }

  const parsed = stageOneIntakeSchema.safeParse(payload);

  if (!parsed.success) {
    await logIntakeFailure({
      route: "stage-one",
      reason: "Validation failed.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error: "Please review the highlighted fields and try again.",
        fieldErrors: formatFieldErrors(parsed.error),
      },
      { status: 400 }
    );
  }

  const spamSignals = evaluateSpamSignals(parsed.data);

  if (spamSignals.blocked) {
    await logIntakeFailure({
      route: "stage-one",
      reason: "Spam checks blocked the submission.",
      payload: {
        practiceArea: parsed.data.practiceArea,
        sourcePath: parsed.data.sourcePath,
        spamSignals,
      },
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "We could not accept that submission. Please call the office if your matter is time sensitive.",
      },
      { status: 400 }
    );
  }

  // Saving the lead is the ONLY hard prerequisite — we need a leadId. If this
  // throws we can't proceed, so it (and only it) returns a 500.
  let leadId: string;
  try {
    leadId = await createLeadRecord({
      input: parsed.data,
      ipHash,
      userAgent,
      spamSignals,
    });
  } catch (error) {
    await logIntakeFailure({
      route: "stage-one",
      reason:
        error instanceof Error
          ? error.message
          : "Unknown intake submission failure.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "We could not submit your request right now. Please call the office if the matter is urgent.",
      },
      { status: 500 }
    );
  }

  // From here the lead is saved. CRM sync and the notification email are
  // INDEPENDENT best-effort actions — each runs in its own try/catch so a
  // failure in one can never skip the other, and neither can fail the 201.
  // Both persist their own outcome so nothing fails silently.

  let crmStatus = "failed";
  try {
    const crmResult = await syncLeadAndPersist({ leadId, input: parsed.data });
    crmStatus = crmResult.status;
  } catch (error) {
    console.error("intake CRM sync threw", {
      leadId,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // Awaited (not fire-and-forget): a floating promise here would be dropped
  // when the serverless function freezes after the response is sent. We wait
  // for the send, record the outcome durably, and shout on any non-"sent".
  let emailStatus = "failed";
  try {
    const emailResult = await sendIntakeEmail({
      leadId,
      intake: parsed.data,
      ipHash,
    });
    emailStatus = emailResult.status;
    await persistEmailDeliveryResult({
      leadId,
      result: emailResult,
      stage: "stage-one",
    });
    if (emailResult.status !== "sent") {
      console.error("intake notification email did not send", {
        leadId,
        status: emailResult.status,
        detail:
          emailResult.status === "failed"
            ? emailResult.error
            : emailResult.reason,
      });
    }
  } catch (error) {
    console.error("intake email threw", {
      leadId,
      error: error instanceof Error ? error.message : String(error),
    });
    await persistEmailDeliveryResult({
      leadId,
      result: {
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
        recipient: parsed.data.email,
      },
      stage: "stage-one",
    });
  }

  const queryParams: Record<string, string> = { lead: leadId };
  if (parsed.data.practiceArea) {
    queryParams.practice = parsed.data.practiceArea;
  }
  const query = new URLSearchParams(queryParams);

  return NextResponse.json(
    {
      ok: true,
      leadId,
      crmStatus,
      emailStatus,
      redirectUrl: `/contact/stage-two?${query.toString()}`,
    },
    { status: 201 }
  );
}

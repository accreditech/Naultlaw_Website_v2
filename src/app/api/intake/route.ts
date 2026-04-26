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
  syncLeadAndPersist,
} from "@/lib/intake-server";
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

  try {
    const leadId = await createLeadRecord({
      input: parsed.data,
      ipHash,
      userAgent,
      spamSignals,
    });

    const crmResult = await syncLeadAndPersist({
      leadId,
      input: parsed.data,
    });

    const queryParams: Record<string, string> = { lead: leadId };
    if (parsed.data.practiceArea) {
      queryParams.practice = parsed.data.practiceArea;
    }
    const query = new URLSearchParams(queryParams);

    return NextResponse.json(
      {
        ok: true,
        leadId,
        crmStatus: crmResult.status,
        redirectUrl: `/contact/stage-two?${query.toString()}`,
      },
      { status: 201 }
    );
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
}

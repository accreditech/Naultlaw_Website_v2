import { NextRequest, NextResponse } from "next/server";

import {
  evaluateStageTwoSpamSignals,
  formatStageTwoFieldErrors,
  getStageTwoBranch,
  type StageTwoSubmissionPayload,
} from "@/lib/intake-stage-two";
import {
  createStageTwoSubmission,
  findLeadById,
  hashValue,
  logIntakeFailure,
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
      route: "stage-two",
      reason: "Invalid JSON payload.",
      payload: {},
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error: "We could not read that follow-up submission. Please try again.",
      },
      { status: 400 }
    );
  }

  const rateLimit = await checkLeadRateLimit({ ipHash });

  if (!rateLimit.allowed) {
    await logIntakeFailure({
      route: "stage-two",
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

  const practiceArea =
    typeof payload.practiceArea === "string" ? payload.practiceArea : null;
  const branch = getStageTwoBranch(practiceArea);

  if (!branch) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Unknown practice area branch.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error: "We could not identify the requested follow-up branch.",
      },
      { status: 400 }
    );
  }

  const parsed = branch.schema.safeParse(payload);

  if (!parsed.success) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Validation failed.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error: "Please review the highlighted follow-up fields and try again.",
        fieldErrors: formatStageTwoFieldErrors(parsed.error),
      },
      { status: 400 }
    );
  }

  const submission = parsed.data as StageTwoSubmissionPayload;
  const spamSignals = evaluateStageTwoSpamSignals(submission);

  if (spamSignals.blocked) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Spam checks blocked the submission.",
      payload: {
        practiceArea: submission.practiceArea,
        leadId: submission.leadId,
        spamSignals,
      },
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "We could not accept that follow-up submission. Please call the office if the matter is time sensitive.",
      },
      { status: 400 }
    );
  }

  const lead = await findLeadById(submission.leadId);

  if (!lead) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Lead not found.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "We could not match that follow-up to an intake record. Please contact the office before resubmitting.",
      },
      { status: 404 }
    );
  }

  if (lead.practiceArea !== submission.practiceArea) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Lead practice area mismatch.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "The follow-up link and intake record do not match. Please contact the office if you need a corrected follow-up request.",
      },
      { status: 400 }
    );
  }

  try {
    const summary = branch.summarize(submission);
    const submissionId = await createStageTwoSubmission({
      leadId: submission.leadId,
      practiceArea: submission.practiceArea,
      branchTitle: branch.title,
      summary,
      payload: {
        ...submission,
        spamSignals,
      },
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        ok: true,
        submissionId,
        stageTwoStatus: "received",
        summary,
      },
      { status: 201 }
    );
  } catch (error) {
    await logIntakeFailure({
      route: "stage-two",
      reason:
        error instanceof Error
          ? error.message
          : "Unknown stage-two submission failure.",
      payload,
      ipHash,
      userAgent,
    });

    return NextResponse.json(
      {
        error:
          "We could not submit the structured follow-up right now. Please call the office if the matter is urgent.",
      },
      { status: 500 }
    );
  }
}

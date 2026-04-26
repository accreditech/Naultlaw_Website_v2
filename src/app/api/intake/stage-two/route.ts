/**
 * Stage-Two follow-up API route.
 *
 * Accepts the optional fields collected on /contact/stage-two and updates
 * the existing lead record with whatever was provided. Re-syncs to the CRM
 * with the same leadId so the CRM upserts the record.
 *
 * Empty strings/undefined are treated as "no change" — we only update
 * fields that came in with a value, so a user filling in just one field
 * doesn't clobber data they entered earlier.
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import {
  hashValue,
  logIntakeFailure,
  syncLeadAndPersist,
} from "@/lib/intake-server";
import { checkLeadRateLimit } from "@/lib/rate-limit";
import type { StageOneIntakeInput } from "@/lib/intake";

const stageTwoSchema = z.object({
  leadId: z.string().uuid(),
  description: z.string().trim().max(4000).optional(),
  county: z.string().trim().max(120).optional(),
  practiceArea: z.string().trim().max(140).optional(),
  issueType: z.string().trim().max(180).optional(),
  opposingParties: z.string().trim().max(255).optional(),
  propertyAddress: z.string().trim().max(255).optional(),
});

function blankToUndef(v?: string) {
  return v && v.trim().length > 0 ? v.trim() : undefined;
}

export async function POST(request: NextRequest) {
  const rawIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const ipHash = hashValue(rawIp);
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  let payload: Record<string, unknown> = {};
  try {
    const json = await request.json();
    payload =
      typeof json === "object" && json !== null
        ? (json as Record<string, unknown>)
        : { payload: json };
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const rateLimit = await checkLeadRateLimit({ ipHash });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const parsed = stageTwoSchema.safeParse(payload);
  if (!parsed.success) {
    await logIntakeFailure({
      route: "stage-two",
      reason: "Validation failed.",
      payload,
      ipHash,
      userAgent,
    });
    return NextResponse.json(
      { error: "Please review the highlighted fields and try again." },
      { status: 400 }
    );
  }

  if (!db) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 }
    );
  }

  try {
    const [existing] = await db
      .select()
      .from(schema.leads)
      .where(eq(schema.leads.id, parsed.data.leadId))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { error: "We couldn't find that submission." },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    const description = blankToUndef(parsed.data.description);
    if (description) updates.description = description;
    const county = blankToUndef(parsed.data.county);
    if (county) updates.county = county;
    const practiceArea = blankToUndef(parsed.data.practiceArea);
    if (practiceArea) updates.practiceArea = practiceArea;
    const issueType = blankToUndef(parsed.data.issueType);
    if (issueType) updates.issueType = issueType;
    const opposingParties = blankToUndef(parsed.data.opposingParties);
    if (opposingParties) updates.opposingParties = opposingParties;
    const propertyAddress = blankToUndef(parsed.data.propertyAddress);
    if (propertyAddress) updates.propertyAddress = propertyAddress;
    updates.stageTwoStatus = "received";

    await db
      .update(schema.leads)
      .set(updates)
      .where(eq(schema.leads.id, parsed.data.leadId));

    // Audit row — track what was supplied at Stage Two separately from
    // the leads table.
    try {
      await db.insert(schema.leadStageTwoSubmissions).values({
        leadId: parsed.data.leadId,
        practiceArea: practiceArea ?? existing.practiceArea ?? "unknown",
        branchTitle: "stage-two-followup",
        status: "received",
        summary: description ?? "",
        payload: parsed.data,
        ipHash,
        userAgent,
        updatedAt: new Date(),
      });
    } catch (e) {
      console.error("stage-two audit write failed", e);
    }

    // Re-sync to CRM with the SAME leadId so the prospect record gets
    // upserted with the new info.
    const merged: StageOneIntakeInput = {
      name: existing.name,
      email: existing.email,
      phone: existing.phone,
      companyName: existing.companyName ?? undefined,
      description: description ?? existing.description ?? undefined,
      valueAtStake: (existing.valueAtStake ?? undefined) as never,
      bestTime: undefined,
      county: (county ?? existing.county ?? undefined) as never,
      opposingParties:
        opposingParties ?? existing.opposingParties ?? undefined,
      practiceArea: (practiceArea ?? existing.practiceArea ?? undefined) as never,
      issueType: issueType ?? existing.issueType ?? undefined,
      propertyAddress: propertyAddress ?? existing.propertyAddress ?? undefined,
      pendingMatter:
        existing.pendingMatter === true
          ? ("yes" as never)
          : existing.pendingMatter === false
            ? ("no" as never)
            : undefined,
      urgencyDeadline: (existing.urgencyDeadline ?? undefined) as never,
      referralSource: (existing.referralSource ?? undefined) as never,
      utmSource: existing.utmSource ?? undefined,
      utmMedium: existing.utmMedium ?? undefined,
      utmCampaign: existing.utmCampaign ?? undefined,
      utmTerm: existing.utmTerm ?? undefined,
      utmContent: existing.utmContent ?? undefined,
      referrerUrl: existing.referrerUrl ?? undefined,
      landingPath: existing.landingPath ?? undefined,
      journey:
        Array.isArray(existing.journey) && existing.journey.length > 0
          ? (existing.journey as Array<{ path: string; ts: string }>)
          : undefined,
      acknowledgment: true,
      website: "",
      formStartedAt: String(existing.createdAt.getTime()),
      sourcePath: existing.sourcePath ?? "/contact",
    };

    await syncLeadAndPersist({
      leadId: parsed.data.leadId,
      input: merged,
      source: { form: "stage-two", intakeStage: "stage-two" },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    await logIntakeFailure({
      route: "stage-two",
      reason:
        error instanceof Error
          ? error.message
          : "Unknown stage-two failure.",
      payload,
      ipHash,
      userAgent,
    });
    return NextResponse.json(
      { error: "We couldn't save those details right now." },
      { status: 500 }
    );
  }
}

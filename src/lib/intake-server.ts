import "server-only";

import { createHash } from "node:crypto";

import { eq } from "drizzle-orm";

import { syncLeadToCrm, type CrmSyncResult } from "@/lib/crm";
import { db, schema } from "@/lib/db";
import type { StageOneIntakeInput } from "@/lib/intake";

export function hashValue(value: string) {
  return createHash("sha256")
    .update(`${process.env.INTAKE_SPAM_SALT ?? "local-salt"}:${value}`)
    .digest("hex");
}

export async function createLeadRecord({
  input,
  ipHash,
  userAgent,
  spamSignals,
}: {
  input: StageOneIntakeInput;
  ipHash: string;
  userAgent: string;
  spamSignals: Record<string, unknown>;
}) {
  if (!db) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const pendingMatter =
    input.pendingMatter === "yes"
      ? true
      : input.pendingMatter === "no"
        ? false
        : null;

  const [lead] = await db
    .insert(schema.leads)
    .values({
      name: input.name,
      companyName: input.companyName ?? null,
      email: input.email.toLowerCase(),
      phone: input.phone,
      description: input.description ?? null,
      valueAtStake: input.valueAtStake ?? null,
      county: input.county ?? null,
      opposingParties: input.opposingParties ?? null,
      practiceArea: input.practiceArea ?? null,
      issueType: input.issueType ?? null,
      propertyAddress: input.propertyAddress ?? null,
      pendingMatter,
      urgencyDeadline: input.urgencyDeadline ?? null,
      referralSource: input.referralSource ?? null,
      // First-touch attribution + on-site behavior
      utmSource: input.utmSource ?? null,
      utmMedium: input.utmMedium ?? null,
      utmCampaign: input.utmCampaign ?? null,
      utmTerm: input.utmTerm ?? null,
      utmContent: input.utmContent ?? null,
      referrerUrl: input.referrerUrl ?? null,
      landingPath: input.landingPath ?? null,
      journey: input.journey && input.journey.length > 0 ? input.journey : null,
      // Server-collected
      sourcePath: input.sourcePath ?? null,
      ipHash,
      userAgent,
      spamSignals,
      updatedAt: new Date(),
    })
    .returning({ id: schema.leads.id });

  return lead.id;
}

/**
 * Look up prior leads with the same hashed IP, ordered most-recent first.
 * Used by the BCC admin email to surface "this prospect (or this device)
 * has submitted before" signal — without ever exposing the actual IP.
 */
export async function findPriorLeadsByIpHash({
  ipHash,
  excludeLeadId,
  limit = 5,
}: {
  ipHash: string;
  excludeLeadId?: string;
  limit?: number;
}) {
  if (!db) return [];
  if (!ipHash || ipHash === "unknown") return [];

  const rows = await db
    .select({
      id: schema.leads.id,
      name: schema.leads.name,
      email: schema.leads.email,
      createdAt: schema.leads.createdAt,
    })
    .from(schema.leads)
    .where(eq(schema.leads.ipHash, ipHash))
    .orderBy(schema.leads.createdAt)
    .limit(limit + 1);

  return rows
    .filter((row) => row.id !== excludeLeadId)
    .slice(0, limit);
}

export async function findLeadById(leadId: string) {
  if (!db) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const [lead] = await db
    .select({
      id: schema.leads.id,
      practiceArea: schema.leads.practiceArea,
      stageTwoStatus: schema.leads.stageTwoStatus,
    })
    .from(schema.leads)
    .where(eq(schema.leads.id, leadId))
    .limit(1);

  return lead ?? null;
}

export async function persistCrmSyncResult(
  leadId: string,
  result: CrmSyncResult
) {
  if (!db) {
    return;
  }

  try {
    await db.insert(schema.crmSyncLogs).values({
      leadId,
      status: result.status,
      endpoint: result.endpoint,
      responseStatus: result.responseStatus,
      responseBody: result.responseBody,
      errorMessage: result.errorMessage,
      payload: result.payload,
    });

    await db
      .update(schema.leads)
      .set({
        crmSyncStatus: result.status,
        updatedAt: new Date(),
      })
      .where(eq(schema.leads.id, leadId));
  } catch (error) {
    console.error("CRM sync persistence failure", {
      leadId,
      status: result.status,
      error: error instanceof Error ? error.message : "Unknown persistence error.",
    });
  }
}

export async function logIntakeFailure({
  route,
  reason,
  payload,
  ipHash,
  userAgent,
}: {
  route: string;
  reason: string;
  payload: Record<string, unknown>;
  ipHash?: string;
  userAgent?: string;
}) {
  if (!db) {
    console.error("Intake failure", { route, reason, payload, ipHash, userAgent });
    return;
  }

  try {
    await db.insert(schema.intakeFailures).values({
      route,
      reason,
      payload,
      ipHash,
      userAgent,
    });
  } catch (error) {
    console.error("Intake failure logging error", {
      route,
      reason,
      payload,
      ipHash,
      userAgent,
      error: error instanceof Error ? error.message : "Unknown intake logging error.",
    });
  }
}

export async function syncLeadAndPersist({
  leadId,
  input,
}: {
  leadId: string;
  input: StageOneIntakeInput;
}) {
  const result = await syncLeadToCrm({ leadId, intake: input });
  await persistCrmSyncResult(leadId, result);
  return result;
}

export async function createStageTwoSubmission({
  leadId,
  practiceArea,
  branchTitle,
  summary,
  payload,
  ipHash,
  userAgent,
}: {
  leadId: string;
  practiceArea: string;
  branchTitle: string;
  summary: string;
  payload: Record<string, unknown>;
  ipHash: string;
  userAgent: string;
}) {
  if (!db) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const [submission] = await db
    .insert(schema.leadStageTwoSubmissions)
    .values({
      leadId,
      practiceArea,
      branchTitle,
      summary,
      payload,
      ipHash,
      userAgent,
      updatedAt: new Date(),
    })
    .returning({ id: schema.leadStageTwoSubmissions.id });

  await db
    .update(schema.leads)
    .set({
      stageTwoStatus: "received",
      updatedAt: new Date(),
    })
    .where(eq(schema.leads.id, leadId));

  return submission.id;
}

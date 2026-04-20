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

  const [lead] = await db
    .insert(schema.leads)
    .values({
      name: input.name,
      companyName: input.companyName || null,
      email: input.email.toLowerCase(),
      phone: input.phone,
      county: input.county,
      opposingParties: input.opposingParties,
      practiceArea: input.practiceArea,
      issueType: input.issueType,
      propertyAddress: input.propertyAddress || null,
      pendingMatter: input.pendingMatter === "yes",
      urgencyDeadline: input.urgencyDeadline,
      referralSource: input.referralSource,
      sourcePath: input.sourcePath || null,
      ipHash,
      userAgent,
      spamSignals,
      updatedAt: new Date(),
    })
    .returning({ id: schema.leads.id });

  return lead.id;
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

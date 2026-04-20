import "server-only";

import { and, eq, gte } from "drizzle-orm";

import { db, schema } from "@/lib/db";

const inMemoryAttempts = new Map<string, number[]>();

function checkInMemoryRateLimit({
  ipHash,
  maxPerHour,
}: {
  ipHash: string;
  maxPerHour: number;
}) {
  const existing = inMemoryAttempts.get(ipHash) ?? [];
  const recent = existing.filter((timestamp) => timestamp > Date.now() - 60 * 60 * 1000);
  recent.push(Date.now());
  inMemoryAttempts.set(ipHash, recent);

  return {
    allowed: recent.length <= maxPerHour,
    attempts: recent.length,
    maxPerHour,
  };
}

export async function checkLeadRateLimit({
  ipHash,
}: {
  ipHash: string;
}) {
  const maxPerHour = Number(process.env.INTAKE_RATE_LIMIT_MAX_PER_HOUR ?? "5");
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  if (db) {
    try {
      const recentLeadCount = await db.$count(
        schema.leads,
        and(
          eq(schema.leads.ipHash, ipHash),
          gte(schema.leads.createdAt, oneHourAgo)
        )
      );

      const recentFailureCount = await db.$count(
        schema.intakeFailures,
        and(
          eq(schema.intakeFailures.ipHash, ipHash),
          gte(schema.intakeFailures.createdAt, oneHourAgo)
        )
      );

      const attempts = recentLeadCount + recentFailureCount;

      return {
        allowed: attempts < maxPerHour,
        attempts,
        maxPerHour,
      };
    } catch (error) {
      console.error("Rate-limit storage unavailable, falling back to memory.", {
        ipHash,
        error: error instanceof Error ? error.message : "Unknown rate-limit error.",
      });
    }
  }

  return checkInMemoryRateLimit({ ipHash, maxPerHour });
}

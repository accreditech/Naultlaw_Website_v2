// IndexNow trigger endpoint.
//
// Two callers:
//   1. Vercel Cron — GET, weekly, submits the full sitemap as a safety
//      net. Vercel passes `Authorization: Bearer <CRON_SECRET>` if the
//      env var is set (we require it).
//   2. GitHub Actions on push-to-master — POST with a JSON body listing
//      the URLs changed in the deploy. Same auth header, same secret.
//
// The endpoint never trusts the input host/protocol — `prepareUrls` in
// `@/lib/indexnow` validates every URL is `https://naultlaw.com/...`
// before any submission, so a misconfigured caller can't fan out
// arbitrary URLs through our IndexNow key.

import { NextRequest, NextResponse } from "next/server";

import {
  INDEXNOW_KEY,
  submitToIndexNow,
  type IndexNowSubmissionResult,
} from "@/lib/indexnow";
import { buildSitemapUrls } from "@/lib/sitemap-data";

// Route-handler runtime. Default Node runtime is fine — no edge-only
// constraints. Explicit `dynamic = 'force-dynamic'` so caching never
// short-circuits a real submission.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized(message: string): NextResponse {
  return NextResponse.json(
    { ok: false, error: message, code: "unauthorized" },
    { status: 401 },
  );
}

function checkAuth(request: NextRequest): {
  ok: true;
} | {
  ok: false;
  response: NextResponse;
} {
  const expected = (process.env.CRON_SECRET ?? "").trim();
  if (!expected) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          ok: false,
          error:
            "CRON_SECRET is not configured on the server; refusing to submit.",
          code: "server_misconfigured",
        },
        { status: 500 },
      ),
    };
  }
  const header = request.headers.get("authorization") ?? "";
  // Accept "Bearer <secret>" (the Vercel Cron convention) or a raw
  // secret (some CI clients won't quote properly). Constant-time compare
  // is unnecessary here — the secret is high-entropy and the response
  // gives no length oracle.
  const presented = header.startsWith("Bearer ")
    ? header.slice("Bearer ".length).trim()
    : header.trim();
  if (presented !== expected) {
    return { ok: false, response: unauthorized("invalid or missing bearer token") };
  }
  return { ok: true };
}

function summarize(
  result: IndexNowSubmissionResult,
): Record<string, unknown> {
  return {
    ok: result.failedBatches === 0,
    keyFingerprint: INDEXNOW_KEY.slice(0, 8) + "…",
    totalUrls: result.totalUrls,
    totalBatches: result.totalBatches,
    successfulBatches: result.successfulBatches,
    failedBatches: result.failedBatches,
    batches: result.batches.map((b) => ({
      batchSize: b.batchSize,
      status: b.status,
      ok: b.ok,
      // Truncate the IndexNow body to keep the response (and log) small.
      // IndexNow's success body is empty; on 4xx it's a short JSON
      // payload, plenty under 512 chars.
      body: b.body.length > 512 ? `${b.body.slice(0, 512)}…` : b.body,
    })),
  };
}

/**
 * GET — submit every URL in the sitemap. Used by the Vercel Cron weekly
 * safety-net trigger and as a manual trigger from a CLI (curl) for ad
 * hoc full-site resubmissions.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const auth = checkAuth(request);
  if (!auth.ok) return auth.response;

  const urls = buildSitemapUrls();
  const result = await submitToIndexNow(urls);
  const summary = summarize(result);
  console.log("[indexnow] sitemap-mode submission", summary);
  return NextResponse.json(
    {
      mode: "sitemap",
      ...summary,
    },
    { status: summary.ok ? 200 : 502 },
  );
}

/**
 * POST — submit a caller-supplied URL list. Used by the GitHub Action
 * on push-to-master, which diffs the commit range and supplies only the
 * URLs whose underlying files changed in that deploy. Body:
 *   { "urls": ["https://naultlaw.com/...", ...] }
 *
 * Off-host or non-https URLs in the body cause a 400 — caller's bug.
 * An empty list is a no-op success (204-equivalent).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const auth = checkAuth(request);
  if (!auth.ok) return auth.response;

  let body: unknown = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "request body must be valid JSON", code: "bad_request" },
      { status: 400 },
    );
  }

  const urlsRaw =
    body && typeof body === "object" && "urls" in body
      ? (body as { urls: unknown }).urls
      : null;
  if (!Array.isArray(urlsRaw) || !urlsRaw.every((u) => typeof u === "string")) {
    return NextResponse.json(
      {
        ok: false,
        error: 'body.urls must be a non-null array of strings',
        code: "bad_request",
      },
      { status: 400 },
    );
  }

  let result: IndexNowSubmissionResult;
  try {
    result = await submitToIndexNow(urlsRaw as string[]);
  } catch (err) {
    // prepareUrls throws on malformed / off-host input.
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        code: "bad_request",
      },
      { status: 400 },
    );
  }

  const summary = summarize(result);
  console.log("[indexnow] explicit-url submission", summary);
  if (result.totalUrls === 0) {
    return NextResponse.json(
      { mode: "explicit", note: "no URLs supplied; nothing submitted", ...summary },
      { status: 200 },
    );
  }
  return NextResponse.json(
    { mode: "explicit", ...summary },
    { status: summary.ok ? 200 : 502 },
  );
}

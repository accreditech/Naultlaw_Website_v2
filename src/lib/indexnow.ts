// IndexNow submission helper. Posts a list of absolute URLs to the
// canonical IndexNow endpoint, which fans out to every IndexNow-honoring
// engine (Bing, Yandex, Seznam.cz, Naver, several AI-search products) in
// one call.
//
// The IndexNow key is HARDCODED here because it's intentionally public —
// the same key is served at https://naultlaw.com/<key>.txt for ownership
// verification. Anyone reading either file knows the key. Rotating it is
// a paired change (rename the public/<key>.txt file + update INDEXNOW_KEY
// here in the same PR). See docs/seo-indexing.md.
//
// IndexNow allows up to 10,000 URLs per request. We never get close to
// that ceiling on naultlaw.com (~70 URLs total), but the helper batches
// at INDEXNOW_BATCH_LIMIT defensively in case a future automation calls
// it with a large list. 200 OK and 202 Accepted both mean success; 4xx
// non-2xx responses surface the body for diagnosis.

export const INDEXNOW_HOST = "naultlaw.com";
export const INDEXNOW_KEY = "f276f972f0843e20930e6069796ea8fc";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// IndexNow's own ceiling is 10,000 / request; 500 matches the long-
// running external submitter to avoid any edge-network surprises.
export const INDEXNOW_BATCH_LIMIT = 500;

export interface IndexNowBatchResult {
  batchSize: number;
  status: number;
  ok: boolean;
  body: string;
}

export interface IndexNowSubmissionResult {
  totalUrls: number;
  totalBatches: number;
  successfulBatches: number;
  failedBatches: number;
  batches: IndexNowBatchResult[];
}

/**
 * Validate + canonicalize a URL list before submission. Drops empty
 * entries, deduplicates, asserts every URL is an absolute `https://`
 * URL on the IndexNow host. Throws on the first off-host URL so a
 * caller that built the list wrong fails loudly instead of getting
 * silently-ignored submissions from IndexNow.
 */
export function prepareUrls(urls: readonly string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of urls) {
    if (!raw) continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new Error(`IndexNow: malformed URL "${trimmed}"`);
    }
    if (parsed.protocol !== "https:") {
      throw new Error(
        `IndexNow: URL must be https:// (got "${trimmed}")`,
      );
    }
    if (parsed.hostname !== INDEXNOW_HOST) {
      throw new Error(
        `IndexNow: URL host must be "${INDEXNOW_HOST}" (got "${parsed.hostname}" for "${trimmed}")`,
      );
    }
    const canonical = parsed.toString();
    if (seen.has(canonical)) continue;
    seen.add(canonical);
    out.push(canonical);
  }
  return out;
}

function chunk<T>(arr: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

/**
 * POST one batch to IndexNow. Pure I/O — caller decides whether to retry
 * or fail loudly on a non-2xx.
 */
export async function submitBatchToIndexNow(
  urls: readonly string[],
  fetchImpl: typeof fetch = fetch,
): Promise<IndexNowBatchResult> {
  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetchImpl(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    // IndexNow has no useful caching semantics for us.
    cache: "no-store",
  });
  const text = await res.text().catch(() => "");
  return {
    batchSize: urls.length,
    status: res.status,
    // IndexNow treats 200 and 202 both as success.
    ok: res.status === 200 || res.status === 202,
    body: text,
  };
}

/**
 * Submit a URL list to IndexNow, chunking at INDEXNOW_BATCH_LIMIT.
 * Returns a per-batch breakdown. Never throws on individual batch
 * failure — the caller (the API route handler) inspects the result and
 * decides on the response status.
 */
export async function submitToIndexNow(
  rawUrls: readonly string[],
  fetchImpl: typeof fetch = fetch,
): Promise<IndexNowSubmissionResult> {
  const urls = prepareUrls(rawUrls);
  if (urls.length === 0) {
    return {
      totalUrls: 0,
      totalBatches: 0,
      successfulBatches: 0,
      failedBatches: 0,
      batches: [],
    };
  }
  const batches: IndexNowBatchResult[] = [];
  for (const group of chunk(urls, INDEXNOW_BATCH_LIMIT)) {
    try {
      const r = await submitBatchToIndexNow(group, fetchImpl);
      batches.push(r);
    } catch (err) {
      batches.push({
        batchSize: group.length,
        status: 0,
        ok: false,
        body: `Network error: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }
  return {
    totalUrls: urls.length,
    totalBatches: batches.length,
    successfulBatches: batches.filter((b) => b.ok).length,
    failedBatches: batches.filter((b) => !b.ok).length,
    batches,
  };
}

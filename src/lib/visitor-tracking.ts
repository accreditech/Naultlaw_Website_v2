/**
 * Visitor tracking — first-touch UTM attribution + on-site journey capture.
 *
 * Lifecycle (all client-side, no third-party scripts):
 *
 *   1. On the first page view of a browser session, capture:
 *      - UTM parameters from the URL (?utm_source=…&utm_campaign=…)
 *      - The HTTP Referer header (where the visitor came from)
 *      - The landing path (the first internal URL they hit)
 *      Persist all of this to sessionStorage. It survives navigations within
 *      the same tab/session and resets on a new browser session.
 *
 *   2. On every subsequent page navigation in the same session, append the
 *      new path + a timestamp to a journey array in sessionStorage. Capped
 *      at the 50 most recent entries (FIFO) to keep the payload bounded.
 *
 *   3. At intake submit time, the IntakeForm reads everything from
 *      sessionStorage via `readVisitorContext()` and includes it in the
 *      POST payload, where it lands in the leads table and gets forwarded
 *      to the CRM under the analytics.* section.
 *
 * Privacy: all data stays first-party (your DB + your CRM). Disclosed in
 * /legal#privacy-policy. No third-party trackers, no cookies, no fingerprint
 * hashing — just session-scoped behavioral context tied to a submitted lead.
 */

const STORAGE_KEY = "nl_visitor_v1";
const MAX_JOURNEY_ENTRIES = 50;

export type JourneyEntry = {
  path: string;
  ts: string;
};

export type VisitorContext = {
  /** First page view of this session; null if SSR before client mount. */
  landingPath: string | null;
  /** document.referrer at session start (the external site that sent them). */
  referrerUrl: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  journey: JourneyEntry[];
};

const EMPTY: VisitorContext = {
  landingPath: null,
  referrerUrl: null,
  utmSource: null,
  utmMedium: null,
  utmCampaign: null,
  utmTerm: null,
  utmContent: null,
  journey: [],
};

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

function safeParse(raw: string | null): VisitorContext | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return { ...EMPTY, ...parsed };
  } catch {
    return null;
  }
}

function safeWrite(value: VisitorContext) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Ignore quota / private-mode failures; tracking is best-effort.
  }
}

/** Read the current visitor context from sessionStorage. SSR-safe. */
export function readVisitorContext(): VisitorContext {
  if (!isBrowser()) return EMPTY;
  return safeParse(sessionStorage.getItem(STORAGE_KEY)) ?? EMPTY;
}

/** Capture utm_* params from the current URL. */
function readUtmParams(url: URL) {
  return {
    utmSource: url.searchParams.get("utm_source"),
    utmMedium: url.searchParams.get("utm_medium"),
    utmCampaign: url.searchParams.get("utm_campaign"),
    utmTerm: url.searchParams.get("utm_term"),
    utmContent: url.searchParams.get("utm_content"),
  };
}

/**
 * Initialize the visitor context on first page view of a session, OR append
 * the current path to the journey array on subsequent views.
 *
 * Idempotent: safe to call from multiple places. The "first view" branch
 * runs only once per session.
 */
export function recordPageView(): void {
  if (!isBrowser()) return;

  const current = readVisitorContext();
  const url = new URL(window.location.href);
  const path = url.pathname + (url.search ? url.search : "");
  const ts = new Date().toISOString();

  if (!current.landingPath) {
    // First view of this session — establish the baseline.
    const utm = readUtmParams(url);
    const referrer =
      typeof document !== "undefined" && document.referrer
        ? document.referrer
        : null;

    safeWrite({
      ...EMPTY,
      ...utm,
      landingPath: path,
      referrerUrl: referrer,
      journey: [{ path, ts }],
    });
    return;
  }

  // Subsequent view — append (skip if same path as the most recent entry,
  // to avoid double-logging when a route renders twice).
  const last = current.journey[current.journey.length - 1];
  if (last && last.path === path) return;

  const trimmed = [...current.journey, { path, ts }].slice(
    -MAX_JOURNEY_ENTRIES
  );

  safeWrite({ ...current, journey: trimmed });
}

/**
 * Returns the visitor context as a payload patch ready to merge into the
 * intake form submission. Empty/null fields are returned as `undefined` so
 * they're stripped at JSON.stringify time, keeping the payload clean.
 */
export function readVisitorContextForSubmit() {
  const ctx = readVisitorContext();
  return {
    landingPath: ctx.landingPath ?? undefined,
    referrerUrl: ctx.referrerUrl ?? undefined,
    utmSource: ctx.utmSource ?? undefined,
    utmMedium: ctx.utmMedium ?? undefined,
    utmCampaign: ctx.utmCampaign ?? undefined,
    utmTerm: ctx.utmTerm ?? undefined,
    utmContent: ctx.utmContent ?? undefined,
    journey: ctx.journey.length > 0 ? ctx.journey : undefined,
  };
}

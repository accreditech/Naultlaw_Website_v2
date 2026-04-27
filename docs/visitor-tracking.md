# Visitor Tracking

First-touch UTM attribution + on-site journey capture. All client-side, no third-party scripts, no cookies.

## What it captures

When a visitor first lands on naultlaw.com in a fresh browser session, the visitor-tracking utility records:

- **UTM parameters** from the URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`)
- **HTTP Referer** (`document.referrer`) — the external site that sent them
- **Landing path** — the first internal URL they hit on the site

That info is stashed in `sessionStorage` and persists until they close the tab or open a new browser session.

On every subsequent page navigation in the same session, a new entry is appended to a `journey` array — `{ path, ts }` — with timestamp. Capped at the 50 most recent entries (FIFO) so the payload stays bounded.

## What it does NOT capture

- No cross-session tracking (closing the tab clears everything)
- No third-party cookies, no fingerprinting
- No raw IP address (the API hashes it server-side)
- No exact mouse position, scroll depth, click events
- No external analytics (Vercel Analytics is separate and aggregate-only)

## Where the captured data goes

When the user submits the intake form, the form reads `sessionStorage` via `readVisitorContextForSubmit()` and includes the captured fields in the POST payload. Server-side:

- Stored in the `leads` table (`utm_*`, `referrer_url`, `landing_path`, `journey` columns)
- Synced to the CRM under the `analytics.*` section of the payload
- Last 8 entries shown in the BCC admin email's "Source" block

## Files

- `src/lib/visitor-tracking.ts` — the storage utility (reads/writes sessionStorage)
- `src/components/site/visitor-tracker.tsx` — the invisible client component mounted in the root layout that calls `recordPageView()` on every Next.js navigation
- `src/components/contact/intake-form.tsx` — reads context at submit time

## sessionStorage key

`nl_visitor_v1` — versioned so we can rev the schema without colliding with old session data.

## Privacy

Disclosed in `/legal#privacy-policy`:

> When you submit a contact or intake form, this website may also record general first-touch attribution information (such as a campaign or referral parameter present in the URL when you first arrived) and a high-level summary of the public pages you visited during the same browser session. This information is stored only with the lead record you submitted and is used to understand how prospective clients find the office and to prepare for the initial conversation. It is not shared with third parties for marketing.

## Adding UTM-tagged links

Append the parameters to any inbound link. Example for a Google Ads campaign:

```
https://www.naultlaw.com/?utm_source=google&utm_medium=cpc&utm_campaign=trec-defense
```

Conventions to keep things tidy:
- `utm_source`: where the visitor came from (`google`, `facebook`, `linkedin`, `newsletter`, `bar-association`)
- `utm_medium`: type of placement (`cpc`, `email`, `social`, `referral`)
- `utm_campaign`: lowercase, hyphen-separated, descriptive (`trec-defense-spring-2026`, `commercial-leasing-newsletter`)

You can also tag the destination page on a campaign — e.g., link to the practice-area page directly:

```
https://www.naultlaw.com/practice-areas/commercial-leasing?utm_source=newsletter&utm_campaign=q2-2026
```

## Reading the journey blob

On any lead record, the `journey` column is a JSON array. Example:

```json
[
  { "path": "/", "ts": "2026-04-26T13:42:11.000Z" },
  { "path": "/articles/commission-disputes-that-carry-more-than-money-risk", "ts": "2026-04-26T13:43:50.000Z" },
  { "path": "/practice-areas/trec-defense-and-realtor-complaints", "ts": "2026-04-26T13:46:02.000Z" },
  { "path": "/contact", "ts": "2026-04-26T13:48:33.000Z" }
]
```

This tells you: the visitor landed on the home page, read an article on commission disputes for ~2 minutes, browsed the TREC defense practice area, then hit the contact page and submitted. Useful context for the first call.

## Limits

- **Max 50 entries.** A visitor who browses 100 pages will only have the last 50 stored. Sufficient for almost every real session.
- **Same-path dedup.** If the user refreshes a page, we don't double-log it.
- **No private-mode handling.** If the user is in incognito, sessionStorage may be unavailable; tracking gracefully degrades to "no data captured" (the lead still goes through fine).

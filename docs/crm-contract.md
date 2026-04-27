# CRM Webhook Contract

The website's intake pipeline POSTs every lead to the firm's CRM via a webhook.
This document is the canonical reference for the wire format — what the website
sends, what the CRM accepts, and how the upsert behavior works.

For the website-side flow that produces this payload, see
[`docs/intake-pipeline.md`](./intake-pipeline.md).

## Endpoint

| Setting | Value |
|---|---|
| URL | `process.env.CRM_WEBHOOK_URL` (set in Vercel env vars) |
| Method | `POST` |
| Auth | `Authorization: Bearer ${process.env.CRM_API_KEY}` |
| Content-Type | `application/json` |
| Extra headers | `X-CRM-Source: <source name>`, `X-Lead-Id: <UUID>` |

If `CRM_WEBHOOK_URL` is unset, the website skips the call but still saves the
lead to its own database. Failures are logged to the `crm_sync_logs` table and
do not block the user — they get the success screen regardless.

## Upsert behavior

Deduplication is keyed off **`source.leadId`**, which is a UUID generated on
the website side when the Stage-One form is submitted.

| Scenario | Behavior |
|---|---|
| First POST with a new `leadId` | CRM creates a new prospect record |
| Second POST with the same `leadId` | CRM updates the existing record in place; response includes `updatedExisting: true` |

The website relies on this for the Stage-Two flow:

1. Visitor submits Stage-One → website POSTs with `source.form: "stage-one"`.
2. Visitor lands on the success screen and optionally fills in the Stage-Two
   form (more detail about the matter).
3. Website POSTs again with the **same `leadId`** and `source.form: "stage-two"`.
4. CRM upserts — no duplicate prospect created.

## Payload shape

The full payload is built in
[`src/lib/crm.ts`](../src/lib/crm.ts) → `buildCrmPayload`.

```json
{
  "source": {
    "name": "Website Consultation Intake",
    "channel": "website",
    "form": "stage-one",
    "leadId": "uuid-v4-string",
    "submittedAt": "2026-04-27T13:42:11.000Z",
    "sourcePath": "/contact",
    "siteUrl": "https://www.naultlaw.com"
  },
  "office": { ... firm metadata ... },
  "contact": {
    "name": "...",
    "companyName": null,
    "email": "...",
    "phone": "...",
    "county": null,
    "referralSource": null
  },
  "matter": {
    "practiceAreaSlug": null,
    "practiceAreaTitle": null,
    "issueType": null,
    "opposingParties": null,
    "propertyAddress": null,
    "pendingMatter": null,
    "urgencyDeadline": null,
    "valueAtStake": null,
    "description": null
  },
  "analytics": {
    "utmSource": null,
    "utmMedium": null,
    "utmCampaign": null,
    "utmTerm": null,
    "utmContent": null,
    "referrerUrl": null,
    "landingPath": null,
    "journey": []
  },
  "workflow": { ... lead status / stage flags ... },
  "compliance": { ... acknowledgment record ... },
  "routing": { ... tags + service-area metadata ... },
  "notes": { "summaryLine": "...", "internalSummary": "..." },
  "screeningInput": { ... mirror of contact + matter for screening UI ... }
}
```

## Required vs optional

The only fields the website requires the visitor to fill in are:

- `contact.name`
- `contact.email`
- `contact.phone`
- `compliance.acknowledgmentAccepted` (must be `true`)

Everything else may be `null`. The CRM is expected to ignore null/missing values
silently — the website will always send the full top-level shape, but most
inner fields will be null on a typical Stage-One submission.

## Analytics block — capture & meaning

| Field | Source | Notes |
|---|---|---|
| `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent` | URL on first visit | Captured by `src/lib/visitor-tracking.ts`, stored in `sessionStorage` until tab closes |
| `referrerUrl` | `document.referrer` at session start | The external site that sent them |
| `landingPath` | First internal URL hit | Distinct from `source.sourcePath` (which is the page where they submitted the form) |
| `journey` | Array of `{ path, ts }` | Up to 50 entries, FIFO, same-path dedup. Captured per page nav by `src/components/site/visitor-tracker.tsx`. |

For the deeper privacy/scope notes, see [`docs/visitor-tracking.md`](./visitor-tracking.md).

## Tags

`routing.tags` is an array the CRM can use for triage. The website always
includes:

- `"website-intake"` — every lead
- `"stage-one"` or `"stage-two"` — which form variant produced the POST
- `practiceAreaSlug` — if the visitor selected one
- `<county-slug>` — if the visitor entered one (lowercased, hyphenated)
- `"pending-matter"` or `"no-pending-matter"` — if they answered that question
- `"value-<bucket>"` — if they picked a `valueAtStake` bucket
- `"utm-<source>"` — if a UTM source was captured

## Failure handling

| Outcome | Website behavior |
|---|---|
| `CRM_WEBHOOK_URL` unset | Skip POST; lead saved locally; `crm_sync_logs.status = "skipped"` |
| Network error | Retry path TBD (today: log failure, return error to API caller, but lead is still saved) |
| Non-2xx response | Log full response body to `crm_sync_logs.responseBody`; lead is still saved |
| 2xx response | `crm_sync_logs.status = "success"`, `responseBody` retained for audit |

The website is the system of record for "did the lead arrive?" — every form
submission produces a `leads` row regardless of CRM outcome.

## Environment variables

| Variable | Purpose | Where set |
|---|---|---|
| `CRM_WEBHOOK_URL` | Endpoint URL | Vercel project env vars (Production + Preview) |
| `CRM_API_KEY` | Bearer token | Vercel project env vars (Production + Preview) |
| `CRM_SOURCE_NAME` | Optional — overrides default `source.name` | Vercel project env vars (defaults to `"Website Consultation Intake"`) |

## Related docs

- [`docs/intake-pipeline.md`](./intake-pipeline.md) — end-to-end flow, file map, spam protection
- [`docs/database-schema.md`](./database-schema.md) — local DB shape for `leads` and `crm_sync_logs`
- [`docs/visitor-tracking.md`](./visitor-tracking.md) — what the analytics block captures
- [`docs/email-notifications.md`](./email-notifications.md) — admin BCC email sent in parallel with CRM sync

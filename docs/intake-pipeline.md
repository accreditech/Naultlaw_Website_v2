# Intake Pipeline

End-to-end flow of an intake submission, from form click to lead in CRM.

```
Visitor → /contact → IntakeForm submit
                            │
                            ▼
                    POST /api/intake
                            │
              ┌─────────────┼──────────────┐
              ▼             ▼              ▼
        Zod validation   Rate limit     Spam signals
              │             │              │
              └─────────────┴──────────────┘
                            │
                            ▼
                    createLeadRecord
                    (writes to leads table)
                            │
                            ▼
                  syncLeadAndPersist
                  (calls CRM webhook,
                   writes crm_sync_logs)
                            │
                            ▼
                  sendIntakeEmail (async)
                  (Resend → client + BCC admin)
                            │
                            ▼
              redirectUrl: /contact/stage-two?lead=...
```

## Files

| File | Role |
|---|---|
| `src/components/contact/intake-form.tsx` | The Stage-One form UI |
| `src/lib/intake.ts` | Zod schema, option lists, defaults |
| `src/lib/visitor-tracking.ts` | UTM + journey capture (client-side) |
| `src/components/site/visitor-tracker.tsx` | Mounted in layout; calls `recordPageView` on every nav |
| `src/app/api/intake/route.ts` | Stage-One API handler |
| `src/lib/intake-server.ts` | DB writes + CRM-sync orchestrator |
| `src/lib/crm.ts` | CRM webhook payload builder + POST |
| `src/lib/intake-email.ts` | Resend email send (client + BCC admin) |
| `src/app/contact/stage-two/page.tsx` | Success screen + optional follow-up |
| `src/components/contact/stage-two-form.tsx` | Stage-Two follow-up form |
| `src/app/api/intake/stage-two/route.ts` | Stage-Two API handler (upsert, re-sync) |
| `drizzle/schema.ts` | Database table definitions |

## Required form fields

- `name` (min 2 chars)
- `email` (RFC valid)
- `phone` (10+ digits)
- `acknowledgment` (must be true)

Everything else is optional.

## Hidden tracking fields populated by visitor-tracker

Captured on first session view, stored in `sessionStorage`, attached at submit time:

- `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`
- `referrerUrl` (HTTP Referer at session start)
- `landingPath` (first internal URL visited)
- `journey` (array of `{path, ts}`, capped at 50, FIFO)

## Adding a new field

1. Add column to `drizzle/schema.ts` (`leads` table). Make it nullable.
2. Run `npm run db:push` (preview) and `npm run db:push:prod` (production).
3. Add the field to `stageOneIntakeSchema` in `src/lib/intake.ts`.
4. Add it to `stageOneDefaults` (empty string / null).
5. Add it to the form in `src/components/contact/intake-form.tsx`.
6. Add it to `createLeadRecord` in `src/lib/intake-server.ts`.
7. Add it to `buildCrmPayload` in `src/lib/crm.ts`.
8. Tell the CRM team — they need to add the field on their side too.

## Spam protection

Three layers, each in `src/lib/intake.ts` / `evaluateSpamSignals`:

- **Honeypot** — a hidden `website` field. Bots fill, humans don't.
- **Suspicious-fast** — submissions <2.5s after form mount blocked.
- **Stale form** — submissions >24h after mount blocked.

Plus IP-based rate limiting in `src/lib/rate-limit.ts`.

## Stage-Two re-sync

When a user fills out the optional Stage-Two form:

1. POST `/api/intake/stage-two` with `{ leadId, ...optional fields }`
2. Server fetches the existing lead, applies non-empty patches in place
3. Writes audit row to `lead_stage_two_submissions`
4. Re-calls `syncLeadAndPersist` with the same `leadId` and `source.form: "stage-two"`
5. CRM upserts the existing prospect with the new info

## Privacy

- IP addresses are SHA-256 hashed with `INTAKE_SPAM_SALT` server-side. The actual IP is never stored or transmitted to the CRM.
- The journey blob is session-scoped only — no cross-session tracking, no third-party cookies, no fingerprinting.
- Disclosed in `/legal#privacy-policy`.

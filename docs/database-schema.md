# Database Schema

Drizzle ORM definitions live in `drizzle/schema.ts`. Migrations applied via `npm run db:push` (preview) and `npm run db:push:prod` (production).

## Tables

### `leads`

The canonical lead record. One row per intake submission.

| Column | Type | Nullable | Notes |
|---|---|---|---|
| `id` | uuid | no (PK) | Generated server-side |
| `status` | varchar(40) | no | `"new"` default |
| `stage_two_status` | varchar(40) | no | `"planned"` / `"received"` |
| `crm_sync_status` | varchar(40) | no | `"pending"` / `"success"` / `"failed"` |
| `name` | varchar(180) | no | **Required** at form |
| `email` | varchar(255) | no | **Required**; lowercased on save |
| `phone` | varchar(40) | no | **Required**; auto-formatted |
| `company_name` | varchar(180) | yes | Optional, may overlap with `name` |
| `description` | text | yes | Optional, up to 4000 chars |
| `value_at_stake` | varchar(80) | yes | Free string; bucket label |
| `county` | varchar(120) | yes | Was NOT NULL pre-V2; now nullable |
| `opposing_parties` | varchar(255) | yes | Was NOT NULL pre-V2; now nullable |
| `practice_area` | varchar(140) | yes | Was NOT NULL pre-V2; now nullable |
| `issue_type` | varchar(160) | yes | Was NOT NULL pre-V2; now nullable |
| `property_address` | varchar(255) | yes | Optional |
| `pending_matter` | boolean | yes | Was NOT NULL pre-V2; now nullable so "didn't pick" ≠ "no" |
| `urgency_deadline` | varchar(160) | yes | Was NOT NULL pre-V2; now nullable |
| `referral_source` | varchar(160) | yes | Was NOT NULL pre-V2; now nullable |
| `utm_source` | varchar(160) | yes | First-touch attribution |
| `utm_medium` | varchar(160) | yes | First-touch attribution |
| `utm_campaign` | varchar(200) | yes | First-touch attribution |
| `utm_term` | varchar(200) | yes | First-touch attribution |
| `utm_content` | varchar(200) | yes | First-touch attribution |
| `referrer_url` | text | yes | HTTP Referer at session start |
| `landing_path` | varchar(255) | yes | First internal URL of session |
| `journey` | jsonb | yes | Array of `{path, ts}`, max 50 |
| `source_path` | varchar(255) | yes | URL the form was submitted from |
| `ip_hash` | varchar(128) | yes | SHA-256 hash; never the raw IP |
| `user_agent` | text | yes | Browser/device string |
| `spam_signals` | jsonb | no | Object: `{honeypotHit, suspiciouslyFast, staleSubmission, elapsedMs, blocked}` |
| `created_at` | timestamptz | no | Default now() |
| `updated_at` | timestamptz | no | Default now(); updated on Stage-Two upsert |

**Indexes:**
- `leads_email_idx` (email)
- `leads_created_at_idx` (created_at)
- `leads_ip_hash_idx` (ip_hash) — used by `findPriorLeadsByIpHash`
- `leads_utm_source_idx` (utm_source) — marketing attribution queries

### `crm_sync_logs`

Audit trail of every CRM webhook call. Useful for debugging "why didn't this lead show up in the CRM."

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `lead_id` | uuid | FK → leads.id (cascade delete) |
| `status` | varchar(40) | `"success"` / `"failed"` / `"skipped"` |
| `endpoint` | varchar(255) | Webhook URL we POSTed to |
| `response_status` | integer | HTTP status (200, 422, etc.) |
| `response_body` | text | Raw response from CRM |
| `error_message` | text | Failure detail if status=failed |
| `payload` | jsonb | The full payload we sent |
| `created_at` | timestamptz | Default now() |

### `lead_stage_two_submissions`

Audit trail of Stage-Two follow-up submissions. The lead record itself is updated in place, but this captures what arrived in each Stage-Two POST.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `lead_id` | uuid | FK → leads.id |
| `practice_area` | varchar(140) | Required by schema |
| `branch_title` | varchar(180) | `"stage-two-followup"` for the V2 simplified flow |
| `status` | varchar(40) | `"received"` |
| `summary` | text | Description text submitted at Stage Two |
| `payload` | jsonb | Full payload that hit `/api/intake/stage-two` |
| `ip_hash` | varchar(128) | Hashed IP at submit |
| `user_agent` | text | Browser string |
| `created_at` / `updated_at` | timestamptz | |

### `intake_failures`

When the API rejects a submission (validation error, spam, rate limit), it's logged here for debugging.

### `practice_areas`, `resources`, `testimonials`, `referral_sources`, `page_settings`

Content tables. Currently the site reads its content from in-code TypeScript constants (`src/lib/content/*`), not these tables. They're vestigial from an earlier CMS direction; safe to leave for now.

## Migration history

Migrations are applied via `drizzle-kit push` (no migration files committed). To see the current state of the production DB:

```bash
npx drizzle-kit introspect:pg
```

This generates a `schema.sql` reflecting what's actually in production. Useful when debugging schema drift.

## Backups

Neon's standard backup retention applies. For point-in-time recovery, use the Neon dashboard.

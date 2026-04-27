# Admin Guide — Naultlaw Website

Plain-English reference for what the website is doing under the hood, written for Steve.

---

## When a lead comes in

Every successful intake submission triggers **three things in this order**:

1. **A row is written to the Postgres database** (the `leads` table on Neon). This is your durable record.
2. **The lead is sent to the proprietary CRM** via webhook (`CRM_WEBHOOK_URL`). The CRM upserts a Prospect record. Audit trail of CRM sync attempts lives in `crm_sync_logs`.
3. **A confirmation email is sent** to the prospect, with `admin@naultlaw.com` BCC'd. Sent via Resend from `noreply@naultlaw.com`.

If any step fails, the others still happen — they're independent. CRM and email are best-effort; the DB write is the source of truth.

---

## Reading the BCC email in your inbox

Every intake email comes with a unique subject line:

> `NaultLaw Intake — Jane Prospect — a1b2c3d4`

The 8-character ID at the end is the start of the `leadId` UUID — it's unique per submission.

**Recommended Gmail filter:**
- `from:noreply@naultlaw.com` → label "Intake", auto-archive (so they don't pile up in inbox; check the label periodically)

Or in Outlook, set up a Rule on `Subject contains "NaultLaw Intake"` → move to a Naultlaw Intake folder.

The email body shows:
- Name, email, phone, value at stake, urgency, etc.
- "How they heard about this office"
- The full description if they wrote one
- **Repeat-IP signal** if the same connection has submitted before — flagged in red at the top of the body
- **Source** section at the bottom: UTM params (if any), referrer, landing page, last 8 pages they browsed before submitting

---

## Setting up UTM-tagged marketing links

When you run an ad, place a link in a newsletter, or post on social, append UTM parameters so the lead's source is captured.

**Format:**
```
https://www.naultlaw.com/?utm_source=google&utm_medium=cpc&utm_campaign=trec-defense
```

Fields:
- `utm_source` — where the visitor came from (`google`, `facebook`, `linkedin`, `newsletter`, `bar-association`, etc.)
- `utm_medium` — type of placement (`cpc` for paid search, `email`, `social`, `referral`)
- `utm_campaign` — your campaign label (`trec-defense`, `commercial-leasing-spring`)
- `utm_term` — optional, used for paid keywords
- `utm_content` — optional, used to differentiate ads with the same campaign

These get captured the first time the visitor lands on the site (sessionStorage), and are sent with the lead even if they wander around the site for 20 minutes before submitting.

**Test it:** click your tagged link, fill out the form, look at the BCC email — the Source section should show your UTM values.

---

## Domain + email setup that's already in place

**Hosting:**
- Vercel project linked to GitHub repo `accreditech/Naultlaw_Website_v2`
- Auto-deploys on every push to `master`
- Custom domain `www.naultlaw.com` (with `naultlaw.com` redirecting to www)

**Database:**
- Neon Postgres
- Two databases: `preview` (for `*.vercel.app` test deploys) and `production` (for naultlaw.com)
- Connection strings in Vercel env vars (`DATABASE_URL` / `DATABASE_URL_PRODUCTION`)

**Email:**
- Resend account, sender domain `naultlaw.com` verified
- API key in Vercel env vars (`RESEND_API_KEY`)
- Sends from `noreply@naultlaw.com`, replies bounce
- BCC always to `admin@naultlaw.com`

**CRM webhook:**
- Endpoint configured via `CRM_WEBHOOK_URL`
- Authenticated with `CRM_WEBHOOK_API_KEY` (Bearer token)
- Each lead has a stable UUID; re-submission of the same leadId updates the existing Prospect

---

## What to do if something breaks

| Symptom | First thing to check |
|---|---|
| Lead came in but no email arrived | Check `RESEND_API_KEY` is still set in Vercel; check Resend dashboard logs |
| Lead came in but not in CRM | Check `CRM_WEBHOOK_URL` in Vercel; check `crm_sync_logs` table |
| Visitor reports the form doesn't submit | Check Vercel deployment logs; reproduce on the live site |
| Email arrives but client never gets it | Check spam folder; verify Resend sender domain still verified |
| Old `/terms-of-use` link 404s | The 301 redirects live in `next.config.ts`; verify it's still deployed |

For all of the above, also see the matching technical doc (`docs/email-notifications.md`, `docs/intake-pipeline.md`, etc.).

---

## Editing the legal page

The four legal sections (Site Terms, Privacy, Attorney Advertising, Engagement Terms) are all served from one page at `/legal`. The actual copy is in `src/lib/public-disclosures.ts` — that's where most of the content lives. The Engagement Terms section is hardcoded inside `src/app/legal/page.tsx` since it's new.

**Have your law-firm hat on, not a developer hat:** when you want to update copy, tell me what you want changed and I'll edit the right file. Don't try to edit it yourself unless you're feeling brave.

The "Last reviewed" date at the top of `/legal` is a constant in `src/app/legal/page.tsx`. Update it whenever you do a substantive review.

---

## Where the source code lives

GitHub: <https://github.com/accreditech/Naultlaw_Website_v2>

Branches:
- `master` — what's live on naultlaw.com
- `feat/intake-and-legal-refactor` (or whatever branch is currently in flight) — preview deploys to a `*.vercel.app` URL for testing

Every commit gets its own preview URL on Vercel so we can see changes before they go to naultlaw.com.

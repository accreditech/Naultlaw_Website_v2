# Email Notifications

How the client-confirmation + admin-BCC email works, and how to keep it working.

## Stack

- **Sender:** Resend (resend.com)
- **Sender domain:** `naultlaw.com` (verified via DNS records on GoDaddy)
- **From address:** `noreply@naultlaw.com` (replies bounce by design)
- **Reply-To address:** `admin@naultlaw.com` (any client reply goes here)
- **BCC:** `admin@naultlaw.com` (interim staff notification)

## Trigger

Every successful POST to `/api/intake` (Stage-One) calls `sendIntakeEmail()` from `src/lib/intake-email.ts`, asynchronously, AFTER the DB write and CRM sync. Email failure does not affect the API response — the lead is already saved.

Stage-Two re-submissions do NOT trigger another email (the prospect already got the confirmation; sending a second one would be noise).

## Subject line format

```
NaultLaw Intake — {Name} — {leadId-short}
```

Where `leadId-short` is the first 8 characters of the UUID (e.g., `a1b2c3d4`).

Steve's recommended Gmail filter: `from:noreply@naultlaw.com` → label "Intake" → archive.

## Email body structure

1. Dark navy header strip — "Thanks — your message is in."
2. Greeting (using first name from `intake.name`)
3. Confirmation paragraph — 1-3 business day SLA, office phone for urgent
4. Submission summary table — every non-blank field they entered
5. **Repeat-IP block** if applicable — flagged in red at top of summary
6. **Source block** — UTM, referrer, last 8 pages browsed (only if any present)
7. Footer with office address, phone, link to legal page, reference ID (full leadId)

## Environment variables

| Var | Where | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Vercel (all envs) | Resend authentication |

That's it for email-specific config. Everything else (sender domain, recipient addresses) is hardcoded in `src/lib/intake-email.ts`.

## Resend domain verification

Already done on April 26, 2026. If it ever needs to be redone:

1. Resend dashboard → Domains → Add Domain → `naultlaw.com`
2. Resend will give you 3 DNS records (SPF, DKIM, DMARC)
3. Add them at GoDaddy → DNS management
4. Click Verify in Resend; usually takes 5–30 min for DNS propagation

## Troubleshooting

### "Lead came in but no email arrived"

1. Check Resend dashboard → Logs. Filter by recipient email. If you see the send recorded, it left Resend successfully.
2. If "delivered" but client didn't get it: check spam folder; check the recipient email is correct.
3. If "bounced" — recipient address invalid.
4. If "failed" — Resend rejected (usually rate limit or domain not verified anymore).

### "API key isn't recognized"

1. Vercel → Settings → Environment Variables
2. Confirm `RESEND_API_KEY` exists for Production + Preview + Development
3. If you rotated the key in Resend, update it in Vercel and redeploy.

### "Replies are going to noreply@ and bouncing"

That's by design. The email body includes a note: *"This is an automated confirmation — to follow up, call the office or use the contact form."* The `Reply-To` header is set to `admin@naultlaw.com`, so most modern email clients will reply to admin@ — but some clients (older Outlook) ignore Reply-To. If this becomes a real problem, switch the sender to `intake@naultlaw.com` (a real inbox), or set up `noreply@naultlaw.com` as a forwarder to `admin@naultlaw.com`.

### "I want to change the email design"

Edit `buildEmailHtml()` in `src/lib/intake-email.ts`. The template is inline-styled HTML (the only kind of HTML email clients reliably render). Test changes with the Resend "Send Test" feature in their dashboard before deploying.

### "I want a separate email for high-value leads"

In `sendIntakeEmail()`, branch on `intake.valueAtStake` and either:
- Send to a different BCC for high-value leads (e.g., `urgent@naultlaw.com`)
- Use a different subject line prefix (e.g., `[HIGH VALUE]`)
- Skip Resend entirely and use a paging service (PagerDuty, etc.)

## Quotas + costs

Resend free tier: **3,000 emails/month**. Naultlaw Intake's volume is well under that — likely <50/month at most.

If volume grows, the next tier ($20/month) covers 50,000 emails. No reason to upgrade in the foreseeable future.

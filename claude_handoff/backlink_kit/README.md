# Backlink directory submission kit

Pre-written profile copy for the 12 highest-leverage directories +
local-business listings for The Law Office of Stephen Nault. Each file
is ready to paste, respects the platform's character limits, and
satisfies TN RPC 7.1.

This kit is the SEO-side companion to the indexing-automation work in
[`docs/seo-indexing.md`](../../docs/seo-indexing.md). Where the
indexing pipeline tells search engines "we exist," this kit tells the
directories search engines trust "here is who Stephen Nault is and
here is the canonical NAP."

## How to use this folder

**Read first:**

1. [`CANONICAL_FIRM_FACTS.md`](CANONICAL_FIRM_FACTS.md) — the single source
   of truth for every directory submission. NAP (Name, Address, Phone),
   email, website, hours, bar admissions, practice areas, the safe
   phrasings list, etc. Use these values verbatim.

**Then work through platforms in priority order:**

2. [`TRACKING_CHECKLIST.md`](TRACKING_CHECKLIST.md) — recommended order,
   estimated time per platform, status table to update as profiles go
   live.

3. The 12 numbered platform files. Each one has step-by-step claim
   instructions + ready-to-paste copy for each field. Suggested working
   order:
   1. [`09_google_business_profile.md`](09_google_business_profile.md)
      — highest priority (local-pack)
   2. [`01_avvo.md`](01_avvo.md)
   3. [`02_justia.md`](02_justia.md)
   4. [`03_findlaw.md`](03_findlaw.md)
   5. [`04_martindale.md`](04_martindale.md)
   6. [`07_tn_bpr.md`](07_tn_bpr.md) — refresh existing BPR record
   7. [`06_tba_directory.md`](06_tba_directory.md) — requires TBA membership
   8. [`10_bing_places.md`](10_bing_places.md) — import from GBP
   9. [`11_linkedin_personal.md`](11_linkedin_personal.md) — RPC 7.1 sweep on existing profile
   10. [`12_linkedin_company.md`](12_linkedin_company.md) — verify if exists or create
   11. [`05_bbb.md`](05_bbb.md) — free listing first; accreditation decision separate
   12. [`08_sumner_chamber.md`](08_sumner_chamber.md) — verify ROI before paying dues

## The "drafts only" pattern

**Steve claims each profile manually.** This kit does NOT autonomously
submit anything anywhere. The copy is pre-written so the claiming work
is "sit and paste," not "sit and write" — but the actual claim,
verification, and submission steps require Steve to log in as himself.

Reasons:

- Several platforms (Justia, FindLaw, Avvo) verify bar admission via
  the email on file at the Tennessee BPR. Automating that path would
  require Steve's BPR credentials, which the kit does not have and
  should not.
- Several platforms (GBP, Bing Places, BBB) verify by mailed postcard
  or phone call to the office. Cannot be automated.
- Several platforms (LinkedIn personal, LinkedIn company) require an
  authenticated Steve to act as principal. Submission by anyone else
  would violate ToS and Tennessee RPC 5.3 (responsibilities regarding
  non-lawyer assistants).

## TN RPC 7.1 compliance

Every word of every platform file has been pre-screened for TN RPC 7.1
compliance:

- **No "specialist / specialty / specializes in / specialization /
  specialized"** applied to Steve's practice. (Comments [9]-[10] —
  banned for non-ABA-certified lawyers.)
- **No outcome guarantees** ("we will win," "always wins," "every
  time," "guaranteed result"). (Comment [3] — unjustified expectations.)
- **No unsubstantiated comparative superlatives** ("best," "top-rated,"
  "leading," "premier," "elite," "most experienced"). (Comment [3] —
  comparative-claim restriction.)
- **"Expert"** is used only in the FRE-702 sense ("expert-witness
  support") — the specific exception called out in the Phase 2 RPC 7.1
  briefing.
- **Closing-attorney scope fence** is present in every platform's
  long-form copy: "This office does not handle real-estate closings."
  Steve is NOT a closing attorney; never describe him as one.
- **Past-results disclaimer** ("Prior results do not guarantee a similar
  outcome") is in every long-form bio and is also sitewide via the
  footer.

If a platform's required field would force a non-compliant phrasing
(e.g., a directory asks for "specialty"), the platform file documents
the workaround. Most often: leave the field blank, or use "practice
focus" / "practice area" instead.

## Future maintenance

When canonical firm facts change (new office, new phone, new email,
new credential):

1. Update [`CANONICAL_FIRM_FACTS.md`](CANONICAL_FIRM_FACTS.md) FIRST.
2. Sweep through each of the 12 platform files. Update any value that
   matches the old fact. The files are intentionally redundant copies
   of the canonical data — that redundancy is what makes per-platform
   editing fast, but it does require this sync step.
3. Log into each live profile and update the data there. Use
   [`TRACKING_CHECKLIST.md`](TRACKING_CHECKLIST.md) as the list of
   profiles to update.
4. **NAP consistency matters most.** Google's local-pack ranking
   degrades when the same firm appears with slightly different NAP on
   different directories. "Ste 100" vs "Suite 100" is a real signal
   degradation. Re-sync carefully.

## Platforms intentionally NOT included

- **Super Lawyers, Best Lawyers in America** — peer-review-gated and
  require multi-year practice tenure. Revisit after 12+ months.
- **Lead Counsel, Lawyerlegion, Lawyer.com (separate from Lawyers.com)**
  — lower DA, often spam-flavored, not worth the claim time.
- **Yelp Legal** — Yelp's legal-services category exists but most
  attorneys see negligible inquiry-volume lift; reviews can also
  attract opportunistic complaints. Defer.
- **Mid-tier directory aggregators** (LawTrades, Lawtally,
  lawyer-directory.net, etc.) — generally low-quality. Skip.
- **Out-of-state local directories** — only TN-relevant directories
  are in the kit.

If Steve wants to add any of these later, follow the same per-platform
file pattern (copy `01_avvo.md` as a template, swap in the platform's
specifics).

## Cross-reference with PR #23 (Bing IndexNow)

The Bing Places file (`10_bing_places.md`) pairs naturally with the
IndexNow integration in
[`docs/seo-indexing.md`](../../docs/seo-indexing.md). Once both are
live, Bing has two channels feeding the firm's data:

- **IndexNow** tells Bing about new URLs as they ship.
- **Bing Places** tells Bing about the business itself (NAP, hours,
  categories, photos).

Both should be set up in the same week to align the Bing-side
visibility lift.

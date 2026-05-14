# Actions planned — Phase 2

## Summary

- Pages before Phase 2: **67** (6 hubs + 61 services, post Phase 1).
- Pages after Phase 2: **39–40** (6 hubs + 33–34 services).
- 23 DELETE + 5 MERGE = **28 page removals**.
- 28 corresponding 301 redirects added to `next.config.ts`.
- 0 KEEP-AND-IMPROVE pages auto-expanded (briefing rule).
- 2 FLAG-FOR-REVIEW items (owner-financing service + real-estate-transactions hub).
- 0 RPC 7.1 compliance findings on surviving pages.

## Counts by hub

| Hub | Before | After | Removed |
|---|---|---|---|
| expert-witness | 10 | 10 | 0 |
| business-formation | 13 | 8 | 5 |
| contract-services | 11 | 7 | 4 |
| real-estate-transactions | 6 | 1–2 | 4 |
| real-estate-disputes | 20 | 9 | 11 |
| business-disputes | 7 | 4 | 3 |
| **TOTAL** | **67** | **39–40** | **27–28** |

## Redirect map preview

28 redirects total. See `AUDIT_REPORT.md` for the full table.

## Execution sequence

Phase 5 is committed in logical chunks. Order matters: redirects must
be in place before the content entries are removed, so any inbound link
to an old URL lands on the redirect target rather than 404.

### Commit 1 — add 28 redirects to next.config.ts

Append redirects to the `redirects()` array. Group with a leading
comment so Phase 1 and Phase 2 redirect groups remain distinguishable.

### Commit 2 — business-formation deletes (5)

Remove 5 entries from `src/lib/content/bofu/business-formation-children.ts`:

- foreign-llc-qualification-attorney-tennessee
- llc-dissolution-attorney-tennessee
- partnership-agreement-attorney-tennessee
- holding-company-formation-attorney-tennessee
- nonprofit-formation-attorney-tennessee

Remove matching `childSlugs` entries from the business-formation hub
in `bofu-services.ts`. Update cross-tree linking in
`practice-area-services.ts` (drop or repoint).

### Commit 3 — contract-services deletes (4)

Remove 4 entries from `src/lib/content/bofu/contract-services-children.ts`:

- nda-attorney-tennessee
- master-service-agreement-attorney-tennessee
- asset-purchase-agreement-attorney-tennessee
- letter-of-intent-attorney-tennessee

Remove matching `childSlugs` entries from the contract-services hub.

### Commit 4 — real-estate-transactions merge + 3 deletes

Fold purchase-agreement content into real-estate-contract:

- Move PSA-specific content (contingency-period mechanics, financing-
  contingency timing, default-and-cure language, FSBO/investor framing)
  into `real-estate-contract-attorney-tennessee` if not already covered.

Remove 4 entries from
`src/lib/content/bofu/real-estate-transactions-children.ts`:

- real-estate-purchase-agreement-attorney-tennessee (merged into real-estate-contract)
- land-contract-attorney-tennessee
- real-estate-joint-venture-attorney-tennessee
- assignment-of-contract-attorney-tennessee

Remove `real-estate-purchase-agreement-attorney-tennessee` from the
real-estate-transactions hub's `childSlugs` (also from the
real-estate-disputes hub's childSlugs if cross-listed; it is not).

Leave the real-estate-transactions hub and `owner-financing` as-is
(FLAGGED in FOR_REVIEW.md).

### Commit 5 — real-estate-disputes merge + 10 deletes

Fold failure-to-disclose content into real-estate-fraud:

- Move TRPCDA-specific paragraphs (statutory cite, one-year claim period,
  as-is and exempted-transaction defenses, common-law-fraud-overlay)
  into `real-estate-fraud-attorney-tennessee`.

Remove 11 entries from
`src/lib/content/bofu/real-estate-disputes-children.ts`:

- failure-to-disclose-attorney-tennessee (merged into real-estate-fraud)
- specific-performance-attorney-tennessee
- earnest-money-dispute-attorney-tennessee
- construction-defect-attorney-tennessee
- hoa-dispute-attorney-tennessee
- foreclosure-excess-proceeds-attorney-tennessee
- landlord-attorney-tennessee
- tenant-attorney-tennessee
- eviction-attorney-tennessee
- eviction-defense-attorney-tennessee
- mold-claim-attorney-tennessee

Remove matching `childSlugs` from the real-estate-disputes hub.

### Commit 6 — business-disputes 3-way merge + 1 delete

Fold three pages into business-partnership-dispute:

- llc-member-buyout-attorney-tennessee — LLC member exit / dissociation
  / forced-buyout framing.
- shareholder-dispute-attorney-tennessee — closely held corporation,
  minority-oppression framing.
- breach-of-fiduciary-duty-attorney-tennessee — duty / breach /
  self-dealing framing.

Remove 4 entries from
`src/lib/content/bofu/business-disputes-children.ts`:

- llc-member-buyout-attorney-tennessee (merged)
- shareholder-dispute-attorney-tennessee (merged)
- breach-of-fiduciary-duty-attorney-tennessee (merged)
- tortious-interference-attorney-tennessee (deleted to hub)

Remove matching `childSlugs` from the business-disputes hub.

### Commit 7 — cross-tree linking + resources internal-link updates

Update `src/lib/content/practice-area-services.ts`:

- Drop all deleted slugs from `practiceAreaServiceLinks` clusters
  (`commercial-leasing`, `real-estate-disputes`,
  `business-contract-drafting-and-review`,
  `operating-agreements-and-owner-disputes`, `arbitration-and-dispute-resolution`,
  `expert-witness-real-estate-and-brokerage-matters`).
- Drop all deleted slugs from `serviceParentPracticeArea`.

Update `src/lib/content/resources.ts`:

- Repoint every `href: "/services/<deleted-slug>"` to the merge target
  (for MERGEs) or the parent hub (for DELETEs).

### Commit 8 — validation, then ACTIONS_TAKEN.md

After commits 1–7, run `npx tsc --noEmit`, `npm run build`, then start
the preview and verify:

- 6 hub URLs return 200 (including the FLAGGED real-estate-transactions hub).
- 5 sampled BOFU pages return 200.
- 3 deleted slugs return a 301 to the expected target.
- 1 merge target page (real-estate-contract / real-estate-fraud /
  business-partnership-dispute) renders the absorbed content.
- `/sitemap.xml` excludes all 28 deleted slugs.

Then commit `ACTIONS_TAKEN.md`.

## Risk and rollback

- All page removals are reversible by reverting the content-array
  edits and removing the redirects.
- Steve's GSC will see the 28 old URLs return 301; Google passes
  authority to the redirect target and re-crawls.
- After deploy, click **Validate Fix** in GSC for the
  "Discovered – currently not indexed" report.
- If Steve decides differently on either FOR_REVIEW item, the follow-up
  commit lands on a sibling cleanup branch.

## What this phase does NOT do

- Does not modify any KEEP-AND-IMPROVE page (54 pages remain at
  current word counts).
- Does not touch the 2 FLAG-FOR-REVIEW items.
- Does not auto-fix RPC 7.1 compliance findings (there are none on
  surviving pages, so no fixes to skip).
- Does not change `/practice-areas/*` editorial content.
- Does not change `src/lib/intake*`, `src/app/api/*`, or legal
  disclosure pages.
- Does not deploy or change Vercel configuration.

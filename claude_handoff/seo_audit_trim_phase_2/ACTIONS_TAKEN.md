# Actions taken — Phase 2 (final record)

Branch: `seo/audit-and-trim-phase-2` (layered on `seo/audit-and-trim-phase-1`)
Final commit count on branch (above `seo/audit-and-trim-phase-1`): 9.
Date: 2026-05-14.

This document is the post-execution record. It is the companion to
`AUDIT_REPORT.md` (decisions), `ACTIONS_PLANNED.md` (plan), and
`COMPLIANCE_REPORT.md` (RPC 7.1 scan). For any disagreement, this file
wins.

## Summary

- Pages before Phase 2: **67** (6 hubs + 61 services, post Phase 1).
- Pages after Phase 2: **40** (6 hubs + 34 services, including the
  FLAGGED owner-financing). If Steve later deletes owner-financing,
  drops to **39**.
- Phase 2 changes: **5 MERGEs + 23 DELETEs = 28 page removals**.
- Phase 2 redirects added: **28** (in addition to the 5 from Phase 1).
- Phase 2 KEEP-AND-IMPROVE flagged for future content work: 31.
- Phase 2 FLAG-FOR-REVIEW: 2 items (`owner-financing-attorney-tennessee`
  + `/services/real-estate-transactions/` hub).
- Phase 2 RPC 7.1 compliance findings on surviving pages: **0**.

**Combined Phase 1 + Phase 2 delta:** 72 → 40 (or 39) live pages. **−44%
of /services/* URLs** since Phase 1 began, all replaced by 301 redirects
preserving authority.

## DELETE actions (23)

Each redirect target was added to `next.config.ts` `redirects()` array
in the first Phase 2 commit, before any content was removed.

| from | redirect target | reason |
|---|---|---|
| /services/foreign-llc-qualification-attorney-tennessee | /services/business-formation | off-list, 221w |
| /services/llc-dissolution-attorney-tennessee | /services/business-formation | off-list, 237w |
| /services/partnership-agreement-attorney-tennessee | /services/business-formation | off-list, 223w |
| /services/holding-company-formation-attorney-tennessee | /services/business-formation | off-list, 209w |
| /services/nonprofit-formation-attorney-tennessee | /services/business-formation | off-list, 223w |
| /services/nda-attorney-tennessee | /services/contract-services | off-list, 211w |
| /services/master-service-agreement-attorney-tennessee | /services/contract-services | off-list, 196w |
| /services/asset-purchase-agreement-attorney-tennessee | /services/contract-services | off-list, 231w |
| /services/letter-of-intent-attorney-tennessee | /services/contract-services | off-list, 213w |
| /services/land-contract-attorney-tennessee | /services/real-estate-transactions | off-list, 245w |
| /services/real-estate-joint-venture-attorney-tennessee | /services/real-estate-transactions | off-list, 222w |
| /services/assignment-of-contract-attorney-tennessee | /services/real-estate-transactions | off-list, 293w |
| /services/specific-performance-attorney-tennessee | /services/real-estate-disputes | off-list, 208w |
| /services/earnest-money-dispute-attorney-tennessee | /services/real-estate-disputes | off-list, 199w |
| /services/construction-defect-attorney-tennessee | /services/real-estate-disputes | off-list, 241w |
| /services/hoa-dispute-attorney-tennessee | /services/real-estate-disputes | off-list, 185w |
| /services/foreclosure-excess-proceeds-attorney-tennessee | /services/real-estate-disputes | off-list, 319w |
| /services/landlord-attorney-tennessee | /services/real-estate-disputes | off-list, 183w |
| /services/tenant-attorney-tennessee | /services/real-estate-disputes | off-list, 257w |
| /services/eviction-attorney-tennessee | /services/real-estate-disputes | off-list (statewide variant cannibalizes Sumner County variant on the approved list), 220w |
| /services/eviction-defense-attorney-tennessee | /services/real-estate-disputes | off-list, 198w |
| /services/mold-claim-attorney-tennessee | /services/real-estate-disputes | off-list, 256w |
| /services/tortious-interference-attorney-tennessee | /services/business-disputes | off-list, 200w |

If Steve later deletes the `/services/real-estate-transactions/` hub
per FOR_REVIEW item 2, the three deletes redirecting there should be
repointed (likely to `/services/contract-services` for land-contract,
joint-venture, and assignment-of-contract).

## MERGE actions (5)

Each merge folded unique source content into the approved-list merge
target, then removed the source entry from the content array. 301
redirect added before content removal.

### Merge 1: real-estate-purchase-agreement → real-estate-contract

- From: `/services/real-estate-purchase-agreement-attorney-tennessee`
  (239w, off-list).
- To: `/services/real-estate-contract-attorney-tennessee` (#22 on
  approved list).
- Content preserved on the target:
  - "What this covers" expanded to name residential + commercial PSAs
    explicitly, including FSBO/investor framing and the "engagement
    often starts at the offer stage and runs through the
    contingency-clearing period" line.
  - Audience expanded to "Commercial buyers and sellers reviewing a
    counterparty-supplied PSA before signing."
  - "Common issues addressed" gained TRPCDA disclosure-form interaction
    cite (Tenn. Code Ann. §§ 66-5-201 et seq.) for residential PSAs.
  - Intro and metaDescription updated to mention residential and
    commercial PSAs.
  - The not-a-closing-attorney scope fence is preserved on the target.

### Merge 2: failure-to-disclose → real-estate-fraud

- From: `/services/failure-to-disclose-attorney-tennessee` (308w,
  off-list).
- To: `/services/real-estate-fraud-attorney-tennessee` (#26 on approved
  list).
- Content preserved on the target:
  - "What this covers" expanded to list common-defect categories
    (foundation, water intrusion, mold history, septic and well, prior
    insurance claims, zoning).
  - Buyer-side claims, seller-side defenses (as-is and
    exempted-transaction defenses under TRPCDA), and litigation-strategy
    scope explicitly named.
  - "Tennessee specifics" rewritten to include the full TRPCDA framework
    (Tenn. Code Ann. §§ 66-5-201 et seq.), the one-year claim period
    (Tenn. Code Ann. § 66-5-208), and the common TRPCDA exemptions list
    (foreclosure, trustee, fiduciary, co-owner, family, court-order,
    government, certain new-construction).
  - "When to call" expanded with the
    when-buyer-knew-or-should-have-known statute-of-limitations framing.
  - Intro and metaDescription updated to mention TRPCDA and
    failure-to-disclose alongside fraud claims.

### Merge 3: llc-member-buyout → business-partnership-dispute

- From: `/services/llc-member-buyout-attorney-tennessee` (215w,
  off-list).
- To: `/services/business-partnership-dispute-attorney-tennessee` (#27
  on approved list).
- Content preserved:
  - "What this covers" expanded to name "member or partner buyouts
    (voluntary, dissociation-driven, or forced)" and the LLC-member-exit
    valuation/payment-terms framing.

### Merge 4: shareholder-dispute → business-partnership-dispute

- From: `/services/shareholder-dispute-attorney-tennessee` (179w,
  off-list).
- To: same target as merge 3.
- Content preserved:
  - "What this covers" expanded to name "shareholder-versus-controlling-
    shareholder disputes in closely held corporations (minority
    oppression, frozen-out shareholders, employment terminated as a
    control move)" and "derivative actions."
  - "Tennessee specifics" expanded with the Business Corporation Act
    framing and the minority-shareholder statutory rights (books-and-
    records, oppression remedies).

### Merge 5: breach-of-fiduciary-duty → business-partnership-dispute

- From: `/services/breach-of-fiduciary-duty-attorney-tennessee` (225w,
  off-list).
- To: same target as merge 3.
- Content preserved:
  - "What this covers" expanded to name "allegations of self-dealing or
    breach of loyalty by managers or officers."
  - "Tennessee specifics" expanded with the fiduciary-duty framing
    (loyalty + care duties across LLC managers, corporate officers and
    directors, general partners, and trustees).
  - "When to call" expanded with the fiduciary-duty privilege/analysis
    framing.

The business-partnership-dispute target absorbed three sources in a
single edit. The expanded H1/intro/metaDescription/audience now read
as the consolidated landing for partnership-and-closely-held-business
disputes.

## KEEP-AND-IMPROVE list

54 pages remain on the approved keep-list (28 BOFU keywords + 5 Phase 1
FOR_REVIEW KEEPs + 6 hubs + 1 KEEP-AS-IS at 404w + the FLAGGED
owner-financing). 31 of the 32 services that fall below 350 words are
flagged for a future content-writing pass. The per-page work-list is in
`KEEP_AND_IMPROVE.md`. **No page was auto-expanded in this phase.**

## FLAG-FOR-REVIEW list

Two items left untouched. Steve decides next.

1. **owner-financing-attorney-tennessee** (377w). Off-list, just shy of
   the 400w "legit extension" carve-out. Substantive Dodd-Frank +
   Tennessee seller-financing content. Audit's lean: KEEP and migrate
   to `/services/contract-services/`.
2. **/services/real-estate-transactions/** hub. Off-architecture (not
   in the approved 5-hub list). After Phase 2 has only owner-financing
   as a child (and only if owner-financing is kept). Audit's lean:
   DELETE the hub, migrate owner-financing into contract-services.

Full details in `FOR_REVIEW.md`.

## Internal-link updates

`src/lib/content/practice-area-services.ts`:
- 5 clusters in `practiceAreaServiceLinks` had entries dropped:
  - `commercial-leasing`: dropped 4 entries, added eviction-sumner.
  - `operating-agreements-and-owner-disputes`: dropped 4 entries; rewrote
    the partnership-dispute anchor to cover the merged topics.
  - `real-estate-disputes`: dropped 3 entries; added title-defect and
    mechanics-lien; rewrote the real-estate-fraud anchor.
  - `business-contract-drafting-and-review`: dropped 2 entries; added
    independent-contractor; rewrote the real-estate-contract anchor.
  - `arbitration-and-dispute-resolution`: dropped 2 entries; added
    non-compete; rewrote the partnership anchor.
- `serviceParentPracticeArea`: dropped 28 deleted-slug keys.

`src/lib/content/resources.ts`:
- 6 article-internal-link `href:` values were repointed away from
  deleted slugs. All now point to either the merge target (for MERGEs)
  or the parent hub variant (for DELETEs). Anchor text updated to
  reflect the combined topic where appropriate.

Final grep across `src/` confirms zero remaining `/services/<deleted-slug>`
references anywhere except the redirect entries in `next.config.ts`.

## Validation results

- `npx tsc --noEmit` — clean (no errors).
- `npm run build` — clean. `/services/[slug]` reports 3 + 36 = 39
  prerendered paths, matching the planned post-trim count (6 hubs +
  33 services; owner-financing brings the service total to 34 → 40
  total since it is KEPT in this phase).
- Production preview tested:
  - 7 hubs return 200 (including FLAGGED `/services/real-estate-transactions`).
  - 5 sampled BOFU pages return 200.
  - 3 merge targets return 200 and render the absorbed content
    (verified by string match for "residential and commercial purchase
    agreements (PSAs)", "Tenn. Code Ann. § 66-5-208", "minority-oppression",
    "Business Corporation Act", and others).
  - 5 sampled deleted slugs return 200 after following 301.
  - 5 sampled merged slugs return 200 after following 301.
  - `/sitemap.xml` returns 200 with 68 URL entries (down from 96 in
    Phase 1); none of the 28 deleted slugs appear.
  - No console errors.

## RPC 7.1 compliance scan

Zero findings on surviving pages across all severity tiers (CRITICAL,
HIGH, MEDIUM, LOW). The sitewide footer satisfies Rule 7.1(b) (firm
name + contact info) and Rule 7.1 Comment [3] (past-results disclaimer).
Full report in `COMPLIANCE_REPORT.md`.

| Severity | Count |
|---|---|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 0 |
| LOW | 0 |

The compliance scan was run as a separate layer on every surviving
`/services/*` page. No content was modified to fix compliance issues
(no issues were found). The scan's grep patterns are documented in
`COMPLIANCE_REPORT.md` and should be re-run when KEEP-AND-IMPROVE
pages are later expanded by a writer.

## Architectural decision on /services/real-estate-transactions/ hub

The audit did not auto-delete this hub per the briefing's instruction
("Do not auto-delete the hub"). After Phase 2 the hub has at most one
child (owner-financing, which is itself FLAGGED). The
`real-estate-transactions` hub continues to render at
`/services/real-estate-transactions/` for now.

Three of the deletes redirect to this hub. If Steve later kills the
hub, those three redirects need to be repointed to either
`/services/contract-services/` (the natural transactional home) or
`/services/real-estate-disputes/`. The cleanup is a single edit to
`next.config.ts` plus a redirect for the hub itself.

## Deviations from the briefing

### 1. Some deletes redirect to /services/real-estate-transactions/

The briefing said "For DELETE, redirect target is the parent hub."
Three deleted pages had `/services/real-estate-transactions/` as their
parent in the content arrays. Per the briefing rule, their redirects
land there — even though the hub itself is FLAGGED. This is the cleanest
landing for now and is documented in `FOR_REVIEW.md` so Steve can
repoint when the hub is killed.

### 2. eviction-attorney-tennessee removed even though it has substance

The statewide variant (220w) is cleaner content than some of the kept
KEEP-AND-IMPROVE pages. But it is not on the approved 28-keyword list
— only the Sumner County local-intent variant (#9) is approved. Keeping
the statewide variant would cannibalize the local variant's intent.
Removed per criterion 7 strictly. If Steve disagrees, this is the most
defensible reinstatement candidate from the 23 deletes.

### 3. tortious-interference-attorney-tennessee not merged into non-compete

Criterion 6 allows merging when audiences and intents overlap. The
audit considered merging tortious-interference into non-compete (both
cover competition-related claims). The audit decided tortious-interference
is doctrinally broader (any third-party interference with contracts,
not just employee-restrictive-covenant scenarios), so a forced merge
would dilute non-compete and confuse the audience. Deleted to hub
instead.

### 4. KEEP-AND-IMPROVE threshold met by almost every surviving page

The current word-count distribution means 31 of 32 surviving non-hub
services qualify as KEEP-AND-IMPROVE (only
real-estate-broker-standard-of-care-expert-witness-tennessee at 404w
is KEEP-AS-IS). The KEEP-AND-IMPROVE work-list is the deliverable
for a future content-writing pass; auto-expansion would have
reproduced the same thin-content problem.

## Recommended next actions

After this PR is merged:

1. **GSC "Validate Fix"** on the "Discovered – currently not indexed"
   report. Steve clicks Validate Fix; Google re-crawls; the 28 new
   redirects pass authority to the merge target or parent hub.
2. **Submit the 3 merge targets in GSC** for re-indexing:
   - `/services/real-estate-contract-attorney-tennessee`
   - `/services/real-estate-fraud-attorney-tennessee`
   - `/services/business-partnership-dispute-attorney-tennessee`
3. **Bing IndexNow ping** with the deleted-and-new URL set so Bing
   drops the deleted slugs and recrawls the survivors.
4. **Steve decides the 2 FOR_REVIEW items** and lands a follow-up
   cleanup commit. The decisions form `seo/audit-and-trim-phase-3` (or
   whatever Steve chooses to name the cleanup branch).
5. **Content expansion pass for KEEP-AND-IMPROVE pages**.
   `KEEP_AND_IMPROVE.md` has the per-page target-word-count + content-gap
   work-list. Run the `COMPLIANCE_REPORT.md` grep set on the new copy
   before each expanded page deploys.
6. **Backlink kit** — not in scope for Phase 2; recommended for a
   future SEO sprint.
7. **Monitor GSC** — indexing-report movement should show within 2–3
   weeks of deploy.

## What this PR does NOT include

- No new BOFU pages.
- No modifications to the 28-keyword list.
- No expansion of approved keep-list beyond the 28 + 5 + 5 spec'd in
  the Phase 2 briefing.
- No `/practice-areas/*` editorial changes.
- No `src/lib/intake*`, `src/app/api/*`, or legal-disclosure-page edits.
- No deployment or Vercel configuration changes.
- No sitemap, robots, opengraph-image, or twitter-image edits (none
  of the deleted slugs were hardcoded there; the sitemap derives from
  the bofuServices array and auto-excludes deleted entries).
- No auto-expansion of thin pages.
- No auto-fix of compliance findings (there were none on surviving
  pages).
- No deletion of the `/services/real-estate-transactions/` hub — that
  is one of the two FLAG-FOR-REVIEW items, and the briefing explicitly
  said "Do not auto-delete the hub." **(Resolved post-Phase-2 — see
  next section.)**

## FOR_REVIEW resolution (post-Phase-2)

Steve resolved both Phase 2 FOR_REVIEW items. Decisions applied as
two additional commits on the same `seo/audit-and-trim-phase-2`
branch; PR #22 picks them up automatically. Full record in
[FOR_REVIEW_RESOLVED.md](FOR_REVIEW_RESOLVED.md).

**Item 1: owner-financing-attorney-tennessee → KEEP + MIGRATE.** Moved
the entry from `src/lib/content/bofu/real-estate-transactions-children.ts`
to `src/lib/content/bofu/contract-services-children.ts`. Updated the
entry's `hub` field to `contract-services`. Added the slug to the
contract-services hub's `childSlugs` in `bofu-services.ts`. The slug
itself does not change, so no redirect is needed for the page — only
the hub it appears under changes (breadcrumb routes through
`/services/contract-services` instead of `/services/real-estate-transactions`).

**Item 2: /services/real-estate-transactions/ hub → DELETE.** Removed
the entire `real-estate-transactions` hub object from `bofuHubs` in
`bofu-services.ts`, removed `"real-estate-transactions"` from the
`BofuHubId` union, removed the `realEstateTransactionsChildren` import
+ spread, and updated the JSDoc comment that referenced it. Deleted
`src/lib/content/bofu/real-estate-transactions-children.ts`. Added a
301 redirect `/services/real-estate-transactions → /services` in
`next.config.ts`. Next.js handles the trailing-slash variant
(`/services/real-estate-transactions/`) automatically.

**Cross-tree-link cleanup.** None needed. The Phase 5g commit already
purged every reference to `real-estate-transactions` from
`practice-area-services.ts`, `resources.ts`, the site footer, and all
components. A final grep confirms zero remaining references in `src/`
or `public/` except the redirect entry in `next.config.ts`.

**Phase 2 deletes that redirected to `/services/real-estate-transactions`.**
The three Phase 2 deletes (`land-contract`, `real-estate-joint-venture`,
`assignment-of-contract`) had their redirect target as
`/services/real-estate-transactions`. After this resolution, those
three redirects now chain: deleted slug → `/services/real-estate-transactions`
→ `/services`. Two hops instead of one. Acceptable for SEO (Google
follows 301 chains), but a future cleanup commit could repoint them
directly to `/services` for one fewer hop. Not done in this commit
because the briefing scoped this task to the two FOR_REVIEW items only.

**Validation (re-run after FOR_REVIEW resolution):**

- `npx tsc --noEmit` — clean.
- `npm run build` — clean. `/services/[slug]` reports 3 + 35 = **38
  prerendered paths** (5 hubs + 33 services, down 1 hub from Phase 2's
  6 hubs). Service count unchanged (33) since owner-financing migrated
  within the count.
- Production preview tested:
  - `/services` lists exactly 5 hubs; `real-estate-transactions` absent.
  - `/services/contract-services` lists owner-financing in its child cards.
  - `/services/owner-financing-attorney-tennessee` returns 200 with
    breadcrumb routing through contract-services.
  - `/services/real-estate-transactions` 301 → `/services` (200 final).
  - `/services/real-estate-transactions/` (trailing slash) 301 →
    `/services` (200 final).
  - `/sitemap.xml`: **67 URL entries** (down from 68); the
    real-estate-transactions hub is absent; owner-financing is present.
  - No console errors.

**Final post-resolution count:** 6 hubs → 5 hubs; 34 services → 33
services (owner-financing moved within count); 28 redirects → 29
redirects (added 1 hub redirect). Combined Phase 1 + Phase 2 + this
resolution: **72 → 38 live `/services/*` URLs (−47%)**.

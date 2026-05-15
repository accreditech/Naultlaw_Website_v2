# Actions taken — Phase 1 (final record)

Branch: `seo/audit-and-trim-phase-1`
Final commit count on branch (above origin/feat/phase-1-4-apply): 6.

This document is the post-execution record of what actually happened. It is
the companion to `AUDIT_REPORT.md` (decisions) and `ACTIONS_PLANNED.md`
(plan). For any disagreement between the three, this file wins.

## Summary

- Pages before: **72** (6 hubs + 66 services).
- Pages after: **67** (6 hubs + 61 services).
- 5 page removals, all via MERGE (with content preserved on the target).
- 5 corresponding 301 redirects added to `next.config.ts`.
- 0 deletions (no closing-attorney pages, no pure boilerplate twins).
- 0 KEEP-AND-IMPROVE pages auto-expanded (deliberate; see briefing).
- 6 FLAG-FOR-REVIEW pages left untouched for Steve to decide.

## DELETE actions

None. The audit found no pages targeting closing keywords (the only
matches for closing/settlement terms in the BOFU content are explicit
denials — "this is contract work, not closing work…"). The off-list
expert-witness pages that would have qualified under criterion 3
(<350 words + not in any hub `childSlugs` array) were all converted to
MERGE on conservatism grounds because plausible merge targets exist.

## MERGE actions

Five MERGEs, executed as: (1) fold unique content from source into target,
(2) remove the source entry from the content array, (3) add 301 redirect.

### Expert-witness consolidation (4 source pages → 2 targets)

Target 1: **real-estate-broker-standard-of-care-expert-witness-tennessee**

| from | content preserved on the target |
|---|---|
| realtor-dispute-expert-witness-tennessee | REALTOR-conduct framing; the "communication breakdowns, deposit handling, and cooperation between listing and selling sides" case-type phrasing. |
| agent-malpractice-expert-witness-tennessee | E&O carrier framing; the "duty, breach, and what a reasonably competent Tennessee agent would have done" trace-the-file framing; the "disclosure and misrepresentation, transaction-handling errors, dual-agency conflicts, deposit and escrow problems, broker-supervision failures, and post-closing issues" case-category list. |
| consumer-real-estate-agent-dispute-expert-witness-tennessee | Consumer-against-own-agent framing; the "agency formation, scope of representation" framing of what the licensee owed the client. |

Implementation:
- Updated `metaDescription` and `intro` on the target to mention
  agent-malpractice, realtor-dispute, and consumer-against-own-agent
  alongside brokerage-duty.
- Expanded "What this covers" with an "Adjacent case categories analyzed
  under the same standard-of-care lens" paragraph that names all three
  merged subjects.
- Expanded "When attorneys retain me" to include E&O-carrier and
  consumer-side counsel as retention sources.

Target 2: **property-valuation-expert-witness-tennessee**

| from | content preserved on the target |
|---|---|
| broker-opinion-of-value-expert-witness-tennessee | BOV/BPO methodology framing ("comparable selection, adjustments, market-condition treatment, and the broker's basis for the conclusion"); REO/foreclosure/loss-mitigation BPO contexts; the "original BOV-author broker is unavailable or non-responsive" retention pattern. |

Implementation:
- Added a third paragraph to "What this covers" explaining BOV/BPO disputes
  as a recurring sub-category of property-valuation work.
- Expanded "When attorneys retain me" to include the unavailable-author
  retention pattern.

### Disputes consolidation (1 source page → 1 target)

Target: **failure-to-disclose-attorney-tennessee**

| from | content preserved on the target |
|---|---|
| property-condition-disclosure-dispute-attorney-tennessee | TRPCDA statutory cite (Tenn. Code Ann. §§ 66-5-201 et seq.); one-year claim period (§ 66-5-208); buyer-side / seller-side / litigation-strategy scope phrasing; common TRPCDA exemptions list (foreclosure, trustee, fiduciary, co-owner, family, court-order, government, certain new-construction transfers). |

Implementation:
- Updated `metaDescription` and `intro` on the target to mention TRPCDA
  alongside common-law failure-to-disclose claims.
- Added a third paragraph to "What this covers" covering buyer-side claims,
  seller-side defenses (as-is, exempted-transaction), and escalation
  strategy.
- Replaced the short "Tennessee specifics" section with the TRPCDA-specific
  framework including statutory cite and one-year limitations period.
- Updated `audience` to read "Residential buyers and sellers in TRPCDA and
  failure-to-disclose disputes."
- Removed property-condition-disclosure-dispute-attorney-tennessee from
  the real-estate-disputes hub's `childSlugs` array in
  `src/lib/content/bofu-services.ts`.

## 301 redirects added

Appended to the `redirects()` array in `next.config.ts`:

| from | to |
|---|---|
| /services/realtor-dispute-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/agent-malpractice-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/consumer-real-estate-agent-dispute-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/broker-opinion-of-value-expert-witness-tennessee | /services/property-valuation-expert-witness-tennessee |
| /services/property-condition-disclosure-dispute-attorney-tennessee | /services/failure-to-disclose-attorney-tennessee |

All five tested in Phase 5 with `fetch(..., { redirect: "follow" })` and
confirmed to land on the correct merge target with 200.

## KEEP-AND-IMPROVE list

54 pages flagged for future content expansion in `KEEP_AND_IMPROVE.md`.
No content changes made this phase. Each page has a target word count
(~415 unique body words) and a per-page content-gap list. Suggested
priority order:

1. llc-formation-attorney-tennessee
2. operating-agreement-attorney-tennessee
3. real-estate-broker-standard-of-care-expert-witness-tennessee (the
   consolidated expert-witness landing after the 3-way merge — may
   approach the target after merge content is added)
4. commercial-lease-attorney-tennessee
5. mechanics-lien-attorney-tennessee

## FLAG-FOR-REVIEW list

6 pages left untouched in Phase 4. Steve decides:

1. trec-complaint-expert-witness-tennessee (audit recommendation: lean KEEP)
2. landlord-tenant-expert-witness-tennessee (audit recommendation: lean KEEP)
3. property-management-expert-witness-tennessee (audit recommendation: lean KEEP)
4. real-estate-disclosure-expert-witness-tennessee (audit recommendation: lean KEEP)
5. real-estate-commission-dispute-expert-witness-tennessee (audit recommendation: lean KEEP)
6. eviction-attorney-sumner-county-tn (audit recommendation: lean KEEP)

See `FOR_REVIEW.md` for the per-page rationale and recommendation.

## Internal-link updates

- `src/lib/content/practice-area-services.ts`:
  - Dropped `realtor-dispute-expert-witness-tennessee`,
    `agent-malpractice-expert-witness-tennessee`,
    `consumer-real-estate-agent-dispute-expert-witness-tennessee`,
    `broker-opinion-of-value-expert-witness-tennessee` from the
    `practiceAreaServiceLinks` clusters; rewrote the
    `real-estate-broker-standard-of-care` anchor to "Broker
    standard-of-care, agent-malpractice, and realtor-dispute expert
    witness" (combined-topic anchor).
  - Expanded the `property-valuation-expert-witness-tennessee` anchor in
    the expert-witness-real-estate-and-brokerage-matters cluster to read
    "Property valuation and BOV expert witness."
  - Dropped all 5 deleted slugs from `serviceParentPracticeArea`.
- `src/lib/content/resources.ts`:
  - Three `href: "/services/<deleted-slug>"` references repointed to the
    broker-standard-of-care merge target with anchor text reflecting the
    combined topic.

Final grep confirms zero `src/`-side references to any of the 5 deleted
slugs in either content arrays or component links.

## Validation results

- `npx tsc --noEmit` — clean (no errors).
- `npm run build` — clean. Build output reports 67 service paths
  (3 + 64 more = 67 in the dynamic `/services/[slug]` route's static
  generation list).
- Production preview server (`npm run start` via preview_start) tested:
  - 7 hub URLs return 200.
  - 5 sampled BOFU URLs (title-expert-witness, llc-formation,
    owner-financing, quiet-title, tortious-interference) return 200.
  - 3 merge-target URLs return 200 with the merged content rendered.
  - 5 deleted slugs return 200 after following the 301 redirect to the
    expected target.
  - `/sitemap.xml` returns 200 with 96 URL entries; none of the 5
    deleted slugs appear.
  - No console errors.
  - Hub pages no longer list the merged-away children.

## Deviations from the briefing

### 1. Missing briefing documents

The briefing referenced `claude_handoff/seo_bofu_pages/` (README,
keywords.csv, hub_architecture.md, practice_scope.md) as the source of
truth for the approved 28-keyword list, the 5 hubs, and the practice-scope
rules. **That directory does not exist in this repo or in git history.**
The closest reference in code is a comment in `src/lib/content/bofu-services.ts`
noting that briefing files are "untracked, see README.md."

What I used as substitutes:

- **Approved-list proxy:** each hub's `childSlugs` array in `bofu-services.ts`.
  Pages whose slugs are in some hub's `childSlugs` are treated as approved;
  the off-list slugs are the 9 extra expert-witness pages added later
  beyond the hub's official 4-child structure. The substituted list has
  ~57 unique slugs, not 28 — but it is the only authoritative editorial
  signal in the repo.
- **Practice-scope rule:** verified the no-closing rule by grep across all
  BOFU content. The two matches are explicit denials; no page positions
  Steve as a closing attorney. Zero closing-language deletes needed.
- **Hub architecture:** read directly from `bofuHubs` in `bofu-services.ts`.
  Five practice areas, with real-estate split into transactions and
  disputes for six hub pages total.

This deviation is documented in the top of `AUDIT_REPORT.md`.

### 2. Most KEEP pages came in below the 350-word KEEP-AS-IS threshold

The briefing's KEEP-AS-IS criterion (350+ unique words) classifies only
**owner-financing-attorney-tennessee** as KEEP-AS-IS (377 words). Every
other approved-list service is between 175 and 330 unique-body words.
Per the briefing's explicit instruction ("do not auto-expand thin pages
in this phase. Auto-generating words to hit 350 produces exactly the thin
content that got the page deprioritized in the first place"), these 53
pages were classified KEEP-AND-IMPROVE and not modified. The list is the
deliverable for a future content-writing pass.

### 3. `claude_handoff/` is gitignored

The repo's `.gitignore` excludes `/claude_handoff/`. The briefing
explicitly instructs to commit the audit deliverables on the feature
branch. To honor both, `.gitignore` was changed from `/claude_handoff/`
to `/claude_handoff/*` with an explicit allowlist for
`!/claude_handoff/seo_audit_trim/`. The rest of the directory remains
untracked, matching repo convention.

### 4. The word-count "approved list" interpretation

`AUDIT_REPORT.md` notes that criterion 3 (DELETE if off-list AND <350
words) would technically apply to all 9 off-list expert-witness pages.
Applying it strictly would have produced 9 DELETEs. The briefing's
conservatism instruction ("When in doubt about whether to delete or keep
a page, KEEP and flag for review") was honored by:

- Converting 4 of those 9 to MERGEs (where a kept page subsumes the
  intent).
- Converting the remaining 5 to FLAG-FOR-REVIEW (where there is no clean
  merge target and the page has its own distinct angle).

No DELETE actions were taken.

## Recommended next actions

After this PR is merged:

1. **Click "Validate Fix" in Google Search Console** for the
   "Discovered – currently not indexed" report. The five removed slugs
   will return 301; GSC will re-crawl and update.
2. **Submit the merge-target URLs in GSC** for re-indexing:
   - /services/real-estate-broker-standard-of-care-expert-witness-tennessee
   - /services/property-valuation-expert-witness-tennessee
   - /services/failure-to-disclose-attorney-tennessee
3. **Bing IndexNow** — ping Bing with the new sitemap URL set. The
   IndexNow API takes the JSON `{ host, key, urlList }` payload; both
   deleted and surviving URLs should be included so Bing knows to drop
   the deleted ones and re-index the survivors.
4. **Steve decides the 6 FLAG-FOR-REVIEW pages** (see `FOR_REVIEW.md`).
   Apply each decision in a follow-up commit on a sibling branch using
   the same pattern (content-fold + remove + redirect, or no-op).
5. **Content expansion pass for KEEP-AND-IMPROVE pages** —
   `KEEP_AND_IMPROVE.md` lists 54 pages with per-page target word count
   (~415) and a content-gap list. Priority order is documented there.
6. **Backlink kit** — a referring-domain audit and outreach kit was not
   produced as part of this phase. Recommended for a future SEO sprint.
7. **Monitor GSC** — the indexing report should show movement within
   2-3 weeks of deploy.

## What this PR does NOT include

- No new BOFU pages.
- No modifications to the 28-keyword list (which was not available).
- No `/practice-areas/*` editorial changes.
- No `src/lib/intake*`, `src/app/api/*`, or legal-disclosure page edits.
- No deployment or Vercel configuration changes.
- No sitemap, robots, opengraph-image, or twitter-image edits (none of
  the deleted slugs were hardcoded in these files; removing them from the
  `bofuServices` array automatically excludes them from the sitemap).
- No auto-expansion of thin pages.

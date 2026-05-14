# Actions planned — Phase 4

This is the executable plan that follows from the audit. The destructive
operations will be applied on the `seo/audit-and-trim-phase-1` branch in the
order below. Each step is reversible up until merge.

## Summary

- Pages before: **72** (6 hubs + 66 services).
- Pages after: **67** (6 hubs + 61 services).
- DELETE: **0**.
- MERGE: **5**.
- KEEP-AS-IS: **7** (6 hubs + `owner-financing-attorney-tennessee`).
- KEEP-AND-IMPROVE (flagged for future content work, untouched this phase): **54**.
- FLAG-FOR-REVIEW (untouched this phase, Steve decides next): **6**.
- 301 redirects to add to `next.config.ts`: **5**.

## Counts by hub

| Hub | Before | After | Removed | Reason |
|---|---|---|---|---|
| expert-witness | 14 | 10 | 4 | 4 off-list, semantically subsumed by kept pages |
| business-formation | 13 | 13 | 0 | All on approved list, all in active use |
| contract-services | 11 | 11 | 0 | All on approved list, all in active use |
| real-estate-transactions | 6 | 6 | 0 | All on approved list, all in active use |
| real-estate-disputes | 21 | 20 | 1 | property-condition-disclosure-dispute subsumed by failure-to-disclose |
| business-disputes | 7 | 7 | 0 | All on approved list, all in active use |

## Redirect map preview

Five 301 redirects to add to `next.config.ts` in the `redirects()` array,
each with `permanent: true`. The existing redirect convention in the repo
uses the same shape (see the legal-pages consolidation block already in
`next.config.ts`).

| old slug | → | new slug |
|---|---|---|
| /services/realtor-dispute-expert-witness-tennessee | → | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/agent-malpractice-expert-witness-tennessee | → | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/consumer-real-estate-agent-dispute-expert-witness-tennessee | → | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/broker-opinion-of-value-expert-witness-tennessee | → | /services/property-valuation-expert-witness-tennessee |
| /services/property-condition-disclosure-dispute-attorney-tennessee | → | /services/failure-to-disclose-attorney-tennessee |

## Execution sequence

Phase 4 is committed in logical chunks. The order matters: redirects must
be in place before the content entries are removed, so that anyone visiting
an old URL after deploy lands on the merge target rather than a 404.

### Commit 1 — redirects in next.config.ts

Add the 5 redirects above. Verify by visiting `/services/<old-slug>` after
restart and confirming a 301 to the merge target.

### Commit 2 — expert-witness merges

For each of the four expert-witness pages being merged:

- `realtor-dispute-expert-witness-tennessee` → fold unique
  realtor-conduct-specific framing (custom-and-practice expectations for
  Tennessee REALTORS, buyer-/seller-/brokerage-side variants) into the
  target page if not already covered.
- `agent-malpractice-expert-witness-tennessee` → fold the
  duty-breach-standard framing and the disclosure-misrepresentation /
  deposit-and-escrow case categories into the target page if not already
  covered.
- `consumer-real-estate-agent-dispute-expert-witness-tennessee` → fold the
  consumer-side buyer/seller-against-own-agent framing into the target.
- `broker-opinion-of-value-expert-witness-tennessee` → fold the BOV/BPO
  methodology focus (comparable selection, adjustments, market-condition
  treatment) into the property-valuation target.

Then remove the four entries from
`src/lib/content/bofu/expert-witness-children.ts`.

### Commit 3 — disputes merge

Fold the TRPCDA-specific framework paragraphs and the as-is and
exempted-transaction defense framing from
`property-condition-disclosure-dispute-attorney-tennessee` into
`failure-to-disclose-attorney-tennessee`.

Then remove the entry from
`src/lib/content/bofu/real-estate-disputes-children.ts`.

### Commit 4 — cross-tree linking + internal-link updates

Update [src/lib/content/practice-area-services.ts](src/lib/content/practice-area-services.ts):

- Remove the five deleted slugs from `practiceAreaServiceLinks` (the
  `trec-defense-and-realtor-complaints` and
  `expert-witness-real-estate-and-brokerage-matters` clusters reference
  them with anchor text — drop those entries).
- Remove the five deleted slugs from `serviceParentPracticeArea`.

Update [src/lib/content/resources.ts](src/lib/content/resources.ts):

- Repoint every `href: "/services/<old-slug>"` reference to the
  corresponding merge target.

The dynamic `/services/[slug]` route reads from the content arrays
directly, so removing the entries automatically:

- Drops the routes from `generateStaticParams` (`/services/[slug]` no
  longer pre-renders them).
- Removes them from the sitemap (which derives from `bofuServices`).
- Returns 404 for any direct hit if the redirect were not in place — but
  the redirect is in place from Commit 1, so visitors land on the merge
  target with a 301.

### Commit 5 — validation, then audit-deliverables documentation

After commits 1–4, run `pnpm tsc --noEmit`, `pnpm build`, then start the
dev server and verify:

- The parent `/services/` hub renders without errors.
- All 5 sub-hubs render and list the correct (post-trim) children.
- A sample of 5 random KEEP-AS-IS pages renders correctly.
- 3 deleted slugs return a 301 to the expected target.

Then write `ACTIONS_TAKEN.md` documenting what actually happened (with any
deviations from the plan) and commit it alongside any final fixes.

## Risk and rollback

- All five page removals are reversible by reverting the content-array
  edits and removing the redirects.
- Steve's GSC will see the five old URLs return 301, which is the correct
  signal — Google will pass authority to the merge target and re-crawl.
- After deploy, click **Validate Fix** in GSC for the "Discovered – currently
  not indexed" report to nudge re-crawl on the new live URLs.
- Bing's IndexNow API can also be pinged with the deleted-and-new URL set;
  this is a recommended follow-up but not part of this phase.

## What this phase does NOT do

- Does not expand any KEEP-AND-IMPROVE page. That is a separate content-
  writing pass driven by `KEEP_AND_IMPROVE.md`.
- Does not touch any FLAG-FOR-REVIEW page. Steve decides those next.
- Does not change `/practice-areas/*` editorial content.
- Does not change the sitemap, robots, opengraph-image, twitter-image —
  none of the deleted slugs are hardcoded there.
- Does not modify `src/lib/intake*`, `src/app/api/*`, or any legal
  disclosure page.
- Does not deploy. Steve merges and deploys when ready.

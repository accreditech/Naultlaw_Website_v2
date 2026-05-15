# Phase 2 FOR_REVIEW — Steve's resolution

Steve resolved the two FOR_REVIEW items from `FOR_REVIEW.md` on
2026-05-14. Both decisions are applied as additional commits on the
existing `seo/audit-and-trim-phase-2` branch; PR #22 picks them up
automatically without needing a new branch or new PR.

## Decision table

| # | Slug / item | Steve's decision | Implementation |
|---|---|---|---|
| 1 | `owner-financing-attorney-tennessee` | **KEEP and migrate** from `real-estate-transactions` hub to `contract-services` hub | Entry moved between children files; `hub` field updated; slug added to `contract-services` `childSlugs`. Slug itself unchanged, so no per-page redirect needed — only the hub assignment and breadcrumb change. |
| 2 | `/services/real-estate-transactions/` hub | **DELETE** (no remaining children after owner-financing migrated) | Hub object removed from `bofuHubs`; `BofuHubId` union narrowed; import + spread removed; children file deleted. 301 redirect `/services/real-estate-transactions → /services` added in `next.config.ts`. |

## Commits

Two commits applied on `seo/audit-and-trim-phase-2`:

1. **`seo: migrate owner-financing from real-estate-transactions to contract-services`**
   - `src/lib/content/bofu/contract-services-children.ts` (+58 lines)
   - `src/lib/content/bofu/real-estate-transactions-children.ts` (−58 lines; emptied)
   - `src/lib/content/bofu-services.ts` (added `owner-financing-attorney-tennessee` to `contract-services` `childSlugs`)

2. **`seo: delete real-estate-transactions hub, redirect to top-level services hub`**
   - `src/lib/content/bofu-services.ts` (removed hub object, union member, import, spread; updated JSDoc)
   - `src/lib/content/bofu/real-estate-transactions-children.ts` (file deleted)
   - `next.config.ts` (added `/services/real-estate-transactions → /services` 301)

A third commit on this branch records this resolution in
`ACTIONS_TAKEN.md` and creates this file.

## Combined post-resolution state

- **Hubs:** 5 (expert-witness, business-formation, contract-services,
  real-estate-disputes, business-disputes).
- **Services:** 33 (owner-financing now under contract-services).
- **Total `/services/*` URLs:** 38.
- **Redirects in `next.config.ts`:** 5 (Phase 1) + 28 (Phase 2) + 1
  (this resolution) = 34 total. (Plus the unrelated /legal, /resources,
  /terms-of-use, etc. redirects.)
- **Combined Phase 1 + Phase 2 + resolution delta:** 72 → 38 live
  `/services/*` URLs (−47%), all removed slugs replaced with 301s.

## Note on chained redirects

Three Phase 2 deletes (`land-contract`, `real-estate-joint-venture`,
`assignment-of-contract`) had `/services/real-estate-transactions` as
their redirect target. After this resolution those redirects now chain:

`deleted slug → /services/real-estate-transactions → /services`

Two hops instead of one. Google handles 301 chains (up to a reasonable
depth) and passes link authority through, so this is acceptable for
SEO. A future cleanup commit could repoint those three directly to
`/services` to save one hop, but it was out of scope here. If Steve
wants the cleanup, the edits are three line-changes in `next.config.ts`.

## Validation

- `npx tsc --noEmit` — clean.
- `npm run build` — clean. `/services/[slug]` reports **38 prerendered
  paths** (5 hubs + 33 services), down 1 from Phase 2's 39 (the
  deleted hub).
- Production preview tested:
  - `/services` lists 5 hubs; `real-estate-transactions` absent. ✓
  - `/services/contract-services` lists `owner-financing` in its child cards. ✓
  - `/services/owner-financing-attorney-tennessee` returns 200; breadcrumb routes through `/services/contract-services`. ✓
  - `/services/real-estate-transactions` 301-redirects to `/services` (200 final). ✓
  - `/services/real-estate-transactions/` (trailing slash) also 301-redirects to `/services` (Next.js handles automatically). ✓
  - `/sitemap.xml`: 67 URL entries (down 1); hub absent; owner-financing present. ✓
  - No console errors.

## What's still open

Nothing in this PR. After PR #22 merges to master:

1. **GSC Validate Fix** on "Discovered – currently not indexed" report
   (29 Phase 2 + 5 Phase 1 redirects).
2. **GSC re-index submissions** for the 3 merge targets
   (broker-standard-of-care, real-estate-contract, real-estate-fraud,
   business-partnership-dispute) plus `/services/contract-services`
   (which now lists owner-financing).
3. **Bing IndexNow** ping with the deleted-and-new URL set.
4. **Future content-writing pass** against `KEEP_AND_IMPROVE.md` — 31
   thin pages targeting ~415 words each, with the COMPLIANCE_REPORT.md
   grep set re-run before each expanded page deploys.

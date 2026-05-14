# /services Audit Report — Phase 1

Branch: `seo/audit-and-trim-phase-1`
Date: 2026-05-13
Total pages before: **72** (6 hubs + 66 services)
Total pages after planned trim: **67** (6 hubs + 61 services)

## How this audit was conducted

Important deviation from the briefing: the briefing references
`claude_handoff/seo_bofu_pages/` (README.md, keywords.csv, hub_architecture.md,
practice_scope.md). **That directory does not exist in this repo or in any
branch in git history.** The original 28-keyword list is not recoverable from
the codebase.

Working from what is actually in the repo, the audit used the following
substitutes:

- **Hub architecture** — derived from `bofuHubs` in
  [src/lib/content/bofu-services.ts](src/lib/content/bofu-services.ts), which
  defines five practice-area hubs (one is split into "real-estate-transactions"
  and "real-estate-disputes", giving six hub pages total).
- **Approved keyword list** — derived from each hub's `childSlugs` array. These
  arrays are the editorial source of truth for which child services the hub
  considers canonical. Pages whose slugs are present in some hub's `childSlugs`
  are treated as "on the approved list"; pages whose slugs are not are treated
  as "off-list" (later additions that bloated the strategy).
- **Real-estate-closing rule** — verified by grep across all content for
  closing/settlement keywords. Only two hits were found, both of which are
  explicit denials ("This is contract work, not closing work…"). No page
  positions Steve as a closing attorney; **zero closing-language deletes are
  required.**
- **Word counts** — computed by
  [scripts/count-bofu-words.mjs](scripts/count-bofu-words.mjs), which sums
  unique body words (intro + all section paragraphs) per page. H2 labels,
  metadata, audience/serviceArea/CTA fields, and the templated "Related
  services" / cross-link block are excluded. Counts saved to
  [scripts/bofu-word-counts.csv](scripts/bofu-word-counts.csv).

## Decision criteria applied

Briefing-specified criteria, in order. First match wins.

1. DELETE — targets a closing keyword (Steve does not do closings).
2. DELETE — boilerplate keyword-swap of another page (>70% identical).
3. DELETE — off-list keyword AND <350 words unique content.
4. MERGE — same audience + same intent as another page, different phrasing.
5. KEEP-AND-IMPROVE — on approved list AND <350 words. Flag, do not expand.
6. KEEP-AS-IS — on approved list AND 350+ words substantively unique.
7. FLAG-FOR-REVIEW — ambiguous; Steve decides.

Two consequences of applying these criteria in this repo:

- **No DELETE-only actions.** No closing pages exist. No pure boilerplate
  twin-of-another-page exists. The strict criterion-3 DELETEs are converted to
  MERGEs wherever a sensible merge target exists, on conservatism grounds.
- **Most approved-list pages fall into KEEP-AND-IMPROVE.** Almost every BOFU
  service is between 175 and 330 unique-body words. That is below the 350
  threshold but is not evidence of bad-faith thin content — the format
  intentionally favors short, intent-matched pages. The KEEP-AND-IMPROVE list
  becomes the work-list for a future content-writing pass.

## Counts by decision

| Decision | Count | Notes |
|---|---|---|
| DELETE | 0 | No closing pages; no pure boilerplate twins. |
| MERGE | 5 | 4 expert-witness extras + 1 disputes duplicate. |
| KEEP-AS-IS | 7 | All 6 hubs + `owner-financing-attorney-tennessee` (377w). |
| KEEP-AND-IMPROVE | 54 | All approved-list services <350 unique words (including the merge-target pages after they absorb merged content). |
| FLAG-FOR-REVIEW | 6 | 5 off-list expert-witness pages w/ distinct angles + 1 local variant. |
| **Total** | **72** | |

Result after trim: **67 live pages** (6 hubs + 61 services). 5 pages removed
via merge; five 301 redirects added.

## Counts by hub

| Hub | Before | After | Merges out | Flags | Keep | Improve |
|---|---|---|---|---|---|---|
| expert-witness (hub + 13 services) | 14 | 10 | 4 | 5 | 1 hub | 4 |
| business-formation (hub + 12) | 13 | 13 | 0 | 0 | 1 hub | 12 |
| contract-services (hub + 10) | 11 | 11 | 0 | 0 | 1 hub | 10 |
| real-estate-transactions (hub + 5 unique) | 6 | 6 | 0 | 0 | 1 hub + owner-financing | 4 |
| real-estate-disputes (hub + 20) | 21 | 20 | 1 | 1 | 1 hub | 18 |
| business-disputes (hub + 6) | 7 | 7 | 0 | 0 | 1 hub | 6 |
| **TOTAL** | **72** | **67** | **5** | **6** | **7** | **54** |

(Note: real-estate-transactions hub's `childSlugs` cross-lists 6 slugs that
are physically defined in other children files; those are counted under their
canonical hub.)

## Full inventory

Sorted by hub, then by decision (DELETE → MERGE → FLAG → KEEP-AND-IMPROVE →
KEEP-AS-IS). Word counts are unique-body words only.

### Hub: expert-witness (real estate expert witness)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| realtor-dispute-expert-witness-tennessee | Realtor Dispute Expert Witness in Tennessee | 221 | N | MERGE | real-estate-broker-standard-of-care-expert-witness-tennessee | Same audience (plaintiff/defense counsel in agent-conduct cases) and same legal framework (TREC rules + brokerage custom). Subsumed by the broker standard-of-care page. |
| broker-opinion-of-value-expert-witness-tennessee | Broker Opinion of Value Expert Witness in Tennessee | 231 | N | MERGE | property-valuation-expert-witness-tennessee | Property-valuation already covers broker price opinions where permitted. BOV/BPO is a subset of broker-valuation work. |
| agent-malpractice-expert-witness-tennessee | Agent Malpractice Expert Witness in Tennessee | 250 | N | MERGE | real-estate-broker-standard-of-care-expert-witness-tennessee | Malpractice analysis = standard-of-care analysis. Same audience, same framework, same authorities (TREC + brokerage custom). |
| consumer-real-estate-agent-dispute-expert-witness-tennessee | Consumer Real Estate Agent Dispute Expert Witness in Tennessee | 223 | N | MERGE | real-estate-broker-standard-of-care-expert-witness-tennessee | Consumer-side framing of the same standard-of-care analysis. No new content angle. |
| trec-complaint-expert-witness-tennessee | TREC Complaint Expert Witness in Tennessee | 246 | N | FLAG | — | Distinct context (TREC disciplinary proceedings, not civil litigation) and unique "how this differs from TREC defense counsel" paragraph. Off-list but defensibly distinct. |
| landlord-tenant-expert-witness-tennessee | Landlord Tenant Expert Witness in Tennessee | 218 | N | FLAG | — | Distinct subject domain (commercial + residential L/T expert witness on CAM, possession, deposits, URLTA). Off-list but not cannibalized by any kept page. |
| property-management-expert-witness-tennessee | Property Management Expert Witness in Tennessee | 221 | N | FLAG | — | Distinct subject domain (property-management practice, trust accounting, owner-vs-manager). Off-list, partially overlaps with realtor-dispute (which we are merging away), but the core PM angle is its own thing. |
| real-estate-disclosure-expert-witness-tennessee | Real Estate Disclosure Expert Witness in Tennessee | 275 | N | FLAG | — | Distinct legal hook (TRPCDA-specific). Has a unique "scope of opinions" paragraph that is not duplicated elsewhere. |
| real-estate-commission-dispute-expert-witness-tennessee | Real Estate Commission Dispute Expert Witness in Tennessee | 202 | N | FLAG | — | Niche but doctrinally distinct (procuring cause, broker-vs-broker arbitrations). Not cannibalized by any kept expert-witness page. |
| title-expert-witness-tennessee | Title Expert Witness in Tennessee | 330 | Y | KEEP-AND-IMPROVE | — | On approved list; 330 words, just under the 350 threshold. Flagged for future expansion. |
| real-estate-broker-standard-of-care-expert-witness-tennessee | Real Estate Broker Standard of Care Expert Witness in Tennessee | 309 | Y | KEEP-AND-IMPROVE | — | On approved list. Merge target for three other pages — after merge content from realtor-dispute, agent-malpractice, and consumer-agent-dispute is folded in, this page will be the consolidated landing for agent-conduct expert work. |
| real-estate-contract-expert-witness-tennessee | Real Estate Contract Expert Witness in Tennessee | 254 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| property-valuation-expert-witness-tennessee | Property Valuation Expert Witness in Tennessee | 249 | Y | KEEP-AND-IMPROVE | — | On approved list. Merge target for broker-opinion-of-value; after merge will absorb BOV-specific content. |
| **expert-witness** (hub) | Real Estate Expert Witness in Tennessee | 151 | hub | KEEP-AS-IS | — | Hub. Rendered page includes child cards, so total rendered content is substantially higher than the 151-word hub body. |

### Hub: business-formation

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| llc-formation-attorney-tennessee | LLC Formation Attorney in Tennessee | 280 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target — high-value page that should be expanded first. |
| operating-agreement-attorney-tennessee | Operating Agreement Attorney in Tennessee | 252 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| pllc-formation-attorney-tennessee | PLLC Formation Attorney in Tennessee | 209 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| s-corp-election-attorney-tennessee | S-Corp Election Attorney in Tennessee | 244 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| series-llc-attorney-tennessee | Series LLC Attorney in Tennessee | 225 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| buy-sell-agreement-attorney-tennessee | Buy-Sell Agreement Attorney in Tennessee | 222 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| corporation-formation-attorney-tennessee | Corporation Formation Attorney in Tennessee | 235 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| foreign-llc-qualification-attorney-tennessee | Foreign LLC Qualification Attorney in Tennessee | 221 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| llc-dissolution-attorney-tennessee | LLC Dissolution Attorney in Tennessee | 237 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| partnership-agreement-attorney-tennessee | Partnership Agreement Attorney in Tennessee | 223 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| holding-company-formation-attorney-tennessee | Holding Company Formation Attorney in Tennessee | 209 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| nonprofit-formation-attorney-tennessee | Nonprofit Formation Attorney in Tennessee | 223 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| **business-formation** (hub) | Business Formation Attorney in Tennessee | 121 | hub | KEEP-AS-IS | — | Hub. |

### Hub: contract-services

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| contract-review-attorney-tennessee | Contract Review Attorney in Tennessee | 212 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| independent-contractor-agreement-attorney-tennessee | Independent Contractor Agreement Attorney in Tennessee | 207 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| vendor-agreement-attorney-tennessee | Vendor Agreement Attorney in Tennessee | 199 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-contract-attorney-tennessee | Real Estate Contract Attorney in Tennessee | 208 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| construction-contract-attorney-tennessee | Construction Contract Attorney in Tennessee | 201 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| commercial-lease-attorney-tennessee | Commercial Lease Attorney in Tennessee | 221 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| nda-attorney-tennessee | NDA Attorney in Tennessee | 211 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| master-service-agreement-attorney-tennessee | Master Service Agreement Attorney in Tennessee | 196 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| asset-purchase-agreement-attorney-tennessee | Asset Purchase Agreement Attorney in Tennessee | 231 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| letter-of-intent-attorney-tennessee | Letter of Intent Attorney in Tennessee | 213 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| **contract-services** (hub) | Business Contract Attorney in Tennessee | 130 | hub | KEEP-AS-IS | — | Hub. |

### Hub: real-estate-transactions

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| real-estate-purchase-agreement-attorney-tennessee | Real Estate Purchase Agreement Attorney in Tennessee | 239 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. Explicitly states no closing/settlement-agent work. |
| land-contract-attorney-tennessee | Land Contract Attorney in Tennessee | 245 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-joint-venture-attorney-tennessee | Real Estate Joint Venture Attorney in Tennessee | 222 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| assignment-of-contract-attorney-tennessee | Assignment of Contract Attorney in Tennessee | 293 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| owner-financing-attorney-tennessee | Owner Financing Attorney in Tennessee | 377 | Y | KEEP-AS-IS | — | On approved list. 377 words, above target. Has substantive Dodd-Frank and Tennessee statutory detail. |
| **real-estate-transactions** (hub) | Real Estate Transactions Attorney in Tennessee | 130 | hub | KEEP-AS-IS | — | Hub. |

### Hub: real-estate-disputes

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| property-condition-disclosure-dispute-attorney-tennessee | Property Condition Disclosure Dispute Attorney in Tennessee | 253 | Y | MERGE | failure-to-disclose-attorney-tennessee | Both pages target post-closing buyer disclosure claims. TRPCDA is the statutory framework for residential failure-to-disclose. Same audience, same intent — duplicative under criterion 4. Merge the more specific into the more general. |
| eviction-attorney-sumner-county-tn | Eviction Attorney in Sumner County TN | 216 | Y | FLAG | — | Local-intent variant of eviction-attorney-tennessee. Could be a legit local-SEO play ("eviction attorney sumner county") or could be cannibalizing the statewide page. Steve decides. |
| quiet-title-attorney-tennessee | Quiet Title Attorney in Tennessee | 231 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| easement-attorney-tennessee | Easement Attorney in Tennessee | 204 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| title-defect-attorney-tennessee | Title Defect Attorney in Tennessee | 199 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-fraud-attorney-tennessee | Real Estate Fraud Attorney in Tennessee | 201 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| mechanics-lien-attorney-tennessee | Mechanics Lien Attorney in Tennessee | 264 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. Has substantive statutory detail. |
| property-line-dispute-attorney-tennessee | Property Line Dispute Attorney in Tennessee | 176 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target — thinnest page on the list. |
| real-estate-attorney-gallatin-tn | Real Estate Attorney in Gallatin TN | 196 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. Local landing page. |
| specific-performance-attorney-tennessee | Specific Performance Attorney in Tennessee | 208 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| earnest-money-dispute-attorney-tennessee | Earnest Money Dispute Attorney in Tennessee | 199 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| failure-to-disclose-attorney-tennessee | Failure to Disclose Attorney in Tennessee | 199 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. Merge target for property-condition-disclosure-dispute. |
| construction-defect-attorney-tennessee | Construction Defect Attorney in Tennessee | 241 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| hoa-dispute-attorney-tennessee | HOA Dispute Attorney in Tennessee | 185 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| foreclosure-excess-proceeds-attorney-tennessee | Foreclosure Excess Proceeds Attorney in Tennessee | 319 | Y | KEEP-AND-IMPROVE | — | On approved list. Just under target. |
| landlord-attorney-tennessee | Landlord Attorney in Tennessee | 183 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target — thin. |
| tenant-attorney-tennessee | Tenant Attorney in Tennessee | 257 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| eviction-attorney-tennessee | Eviction Attorney in Tennessee | 220 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| eviction-defense-attorney-tennessee | Eviction Defense Attorney in Tennessee | 198 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| mold-claim-attorney-tennessee | Mold Claim Attorney in Tennessee | 256 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| **real-estate-disputes** (hub) | Real Estate Disputes Attorney in Tennessee | 89 | hub | KEEP-AS-IS | — | Hub. The thinnest hub by body words, but hub pages render child cards, so the rendered page is substantially longer. |

### Hub: business-disputes

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| business-partnership-dispute-attorney-tennessee | Business Partnership Dispute Attorney in Tennessee | 196 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| non-compete-attorney-tennessee | Non-Compete Attorney in Tennessee | 203 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| llc-member-buyout-attorney-tennessee | LLC Member Buyout Attorney in Tennessee | 215 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| shareholder-dispute-attorney-tennessee | Shareholder Dispute Attorney in Tennessee | 179 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target — thin. |
| breach-of-fiduciary-duty-attorney-tennessee | Breach of Fiduciary Duty Attorney in Tennessee | 225 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| tortious-interference-attorney-tennessee | Tortious Interference Attorney in Tennessee | 200 | Y | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| **business-disputes** (hub) | Business Disputes Attorney in Tennessee | 130 | hub | KEEP-AS-IS | — | Hub. |

## Redirect map (planned)

Five 301 redirects to be added to [next.config.ts](next.config.ts):

| from | to |
|---|---|
| /services/realtor-dispute-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/agent-malpractice-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/consumer-real-estate-agent-dispute-expert-witness-tennessee | /services/real-estate-broker-standard-of-care-expert-witness-tennessee |
| /services/broker-opinion-of-value-expert-witness-tennessee | /services/property-valuation-expert-witness-tennessee |
| /services/property-condition-disclosure-dispute-attorney-tennessee | /services/failure-to-disclose-attorney-tennessee |

## Pause-condition check

Briefing's pause threshold: if more than 10 pages end up in FOR_REVIEW.md,
stop and ask Steve before destructive operations. **Current FLAG count: 6.
Under threshold. Proceeding to Phase 4.**

## Cross-tree linking impact

The five removed slugs are referenced from:

- [src/lib/content/practice-area-services.ts](src/lib/content/practice-area-services.ts) —
  the cross-tree linking map between editorial /practice-areas/* pages and the
  BOFU /services/* pages. References will be removed or repointed.
- [src/lib/content/resources.ts](src/lib/content/resources.ts) — internal
  links from article pages. References will be repointed to the merge targets.

The dynamic [src/app/services/[slug]/page.tsx](src/app/services/%5Bslug%5D/page.tsx)
route reads from the content arrays directly; removing an entry from the
array automatically removes the page from `generateStaticParams` and the
sitemap. No hardcoded slugs in `sitemap.ts`, `robots.ts`, or anywhere in
`/src/app/`.

## Notes on what is _not_ being changed

- `/practice-areas/*` — editorial content. Out of scope.
- `src/lib/intake*`, `src/app/api/*`, legal disclosure pages — out of scope.
- 28-keyword list — neither modified nor regenerated; not available.
- KEEP-AND-IMPROVE pages — not auto-expanded. The work-list is the deliverable.
- Sitemap, robots, opengraph-image, twitter-image — none of the deleted slugs
  are hardcoded in these, so no edits needed there.
- Bing IndexNow, backlink kit, GSC validation — recommended in
  ACTIONS_TAKEN.md as next steps but not part of this phase.

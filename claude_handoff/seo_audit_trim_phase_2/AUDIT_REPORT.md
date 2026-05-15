# /services Audit Report — Phase 2

Branch: `seo/audit-and-trim-phase-2` (layered on `seo/audit-and-trim-phase-1`)
Date: 2026-05-14
Total pages before Phase 2: **67** (6 hubs + 61 services, post Phase 1)
Total pages after planned Phase 2 trim: **39** (6 hubs + 33 services), or **40** if Steve keeps owner-financing per FOR_REVIEW

Delta from Phase 1: **−28 pages** (23 deletes + 5 merges). Phase 1 trimmed
72 → 67. Phase 2 trims 67 → 39 (or 40 with owner-financing). Combined Phase
1 + Phase 2: **72 → 39/40 (−46%)**.

## What changed since Phase 1

Phase 2 uses the **actual 28-keyword approved list** plus Steve's 5
FOR_REVIEW KEEP decisions and the 5 approved hubs. Phase 1 used each
hub's `childSlugs` array as a proxy approved-list (~57 unique slugs)
because the canonical list was not in the repo. With the real list in
hand, Phase 2 cuts the off-list pages that Phase 1's broader proxy
treated as approved.

The compliance scan layer is new in Phase 2: every surviving page is
scanned for TN RPC 7.1 violations (specialization terms, outcome
guarantees, unsubstantiated superlatives, comparative claims). The
findings live in `COMPLIANCE_REPORT.md`.

## Approved keep-list applied in this phase

- **28 canonical BOFU keywords** (inlined in the Phase 2 starter prompt,
  not in the repo).
- **5 Phase 1 FOR_REVIEW KEEPs**: trec-complaint, landlord-tenant,
  property-management, real-estate-disclosure, real-estate-commission-dispute
  (all expert-witness).
- **5 approved hubs**: expert-witness, business-formation, contract-services,
  real-estate-disputes, business-disputes.
- **1 unapproved hub flagged**: real-estate-transactions — not in the
  approved 5-hub architecture. Treated as off-list for its children;
  the hub itself is FLAGGED for Steve.

## Decision criteria applied

Phase 2 criteria, in order. First match wins.

1. DELETE — targets a closing keyword.
2. DELETE — boilerplate one-line keyword swap (>70% identical).
3. KEEP-AS-IS — on approved keep-list AND 350+ unique-body words.
4. KEEP-AND-IMPROVE — on approved keep-list AND <350 words. Do not auto-expand.
5. KEEP-AS-IS — off approved keep-list BUT 400+ words AND distinct subject.
6. MERGE — off approved keep-list AND overlaps an approved page in audience + intent.
7. DELETE — off approved keep-list AND <350 words AND no carve-out.
8. FLAG-FOR-REVIEW — ambiguous (350–399 words off-list; unclear merge target; architectural decision).

## Counts by decision

| Decision | Count | Notes |
|---|---|---|
| DELETE | 23 | Off-list pages with <350 words and no clean merge target. Redirect to parent hub. |
| MERGE | 5 | Off-list pages whose intent is subsumed by an approved-list page. Content preserved on the target. |
| KEEP-AS-IS | 1 service + 5 hubs | Only `real-estate-broker-standard-of-care-expert-witness-tennessee` (404w, the Phase 1 consolidated landing). Hubs are auto-keep. |
| KEEP-AND-IMPROVE | 31 | On approved keep-list AND <350 words. Future content-writing pass. |
| FLAG-FOR-REVIEW | 2 | `owner-financing-attorney-tennessee` (377w, just shy of 400w carve-out); `/services/real-estate-transactions/` hub (architectural decision). |
| **Total** | **62** | (61 services + 1 unapproved hub flagged.) |

Plus 5 approved hubs auto-keep (not counted above). Final pages live:
**39** with owner-financing deleted; **40** with owner-financing kept.

## Counts by hub

| Hub | Before | After | Removed | Notes |
|---|---|---|---|---|
| expert-witness (1 hub + 9 services) | 10 | 10 | 0 | All 9 children on approved list (4 from 28-list + 5 Phase 1 KEEPs). |
| business-formation (1 hub + 12 services) | 13 | 8 | 5 | 5 off-list deletes: foreign-llc-qualification, llc-dissolution, partnership-agreement, holding-company-formation, nonprofit-formation. |
| contract-services (1 hub + 10 services) | 11 | 7 | 4 | 4 off-list deletes: nda, master-service-agreement, asset-purchase-agreement, letter-of-intent. |
| real-estate-transactions (1 hub + 5 services) | 6 | 2 | 4 | 1 merge (purchase-agreement → real-estate-contract), 3 deletes (land-contract, joint-venture, assignment-of-contract). Hub + owner-financing FLAGGED. |
| real-estate-disputes (1 hub + 19 services) | 20 | 9 | 11 | 1 merge (failure-to-disclose → real-estate-fraud), 10 deletes. |
| business-disputes (1 hub + 6 services) | 7 | 4 | 3 | 3 merges into business-partnership-dispute (member-buyout, shareholder, fiduciary-duty), 1 delete (tortious-interference). |
| **TOTAL** | **67** | **40** | **28** | If owner-financing flagged-and-deleted, **39**. |

## Redirect map (planned)

Twenty-eight 301 redirects added to `next.config.ts`.

### Deletes (23) → redirect to parent hub

| from | to |
|---|---|
| /services/foreign-llc-qualification-attorney-tennessee | /services/business-formation |
| /services/llc-dissolution-attorney-tennessee | /services/business-formation |
| /services/partnership-agreement-attorney-tennessee | /services/business-formation |
| /services/holding-company-formation-attorney-tennessee | /services/business-formation |
| /services/nonprofit-formation-attorney-tennessee | /services/business-formation |
| /services/nda-attorney-tennessee | /services/contract-services |
| /services/master-service-agreement-attorney-tennessee | /services/contract-services |
| /services/asset-purchase-agreement-attorney-tennessee | /services/contract-services |
| /services/letter-of-intent-attorney-tennessee | /services/contract-services |
| /services/land-contract-attorney-tennessee | /services/real-estate-transactions |
| /services/real-estate-joint-venture-attorney-tennessee | /services/real-estate-transactions |
| /services/assignment-of-contract-attorney-tennessee | /services/real-estate-transactions |
| /services/specific-performance-attorney-tennessee | /services/real-estate-disputes |
| /services/earnest-money-dispute-attorney-tennessee | /services/real-estate-disputes |
| /services/construction-defect-attorney-tennessee | /services/real-estate-disputes |
| /services/hoa-dispute-attorney-tennessee | /services/real-estate-disputes |
| /services/foreclosure-excess-proceeds-attorney-tennessee | /services/real-estate-disputes |
| /services/landlord-attorney-tennessee | /services/real-estate-disputes |
| /services/tenant-attorney-tennessee | /services/real-estate-disputes |
| /services/eviction-attorney-tennessee | /services/real-estate-disputes |
| /services/eviction-defense-attorney-tennessee | /services/real-estate-disputes |
| /services/mold-claim-attorney-tennessee | /services/real-estate-disputes |
| /services/tortious-interference-attorney-tennessee | /services/business-disputes |

### Merges (5) → redirect to merge target

| from | to |
|---|---|
| /services/real-estate-purchase-agreement-attorney-tennessee | /services/real-estate-contract-attorney-tennessee |
| /services/failure-to-disclose-attorney-tennessee | /services/real-estate-fraud-attorney-tennessee |
| /services/llc-member-buyout-attorney-tennessee | /services/business-partnership-dispute-attorney-tennessee |
| /services/shareholder-dispute-attorney-tennessee | /services/business-partnership-dispute-attorney-tennessee |
| /services/breach-of-fiduciary-duty-attorney-tennessee | /services/business-partnership-dispute-attorney-tennessee |

If Steve later kills the `/services/real-estate-transactions/` hub, the
three deletes redirecting there will need their targets updated (likely
to `/services/contract-services` or `/services/real-estate-disputes`,
depending on the slug). See `FOR_REVIEW.md` for the architectural
question.

## Full inventory

Sorted by hub, then by decision (DELETE → MERGE → KEEP-AND-IMPROVE → KEEP-AS-IS → FLAG).

### Hub: expert-witness (1 hub + 9 services)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **expert-witness** (hub) | Real Estate Expert Witness in Tennessee | 151 | hub | KEEP-AS-IS | — | Approved hub. |
| real-estate-broker-standard-of-care-expert-witness-tennessee | Real Estate Broker Standard of Care Expert Witness in Tennessee | 404 | Y (#12) | KEEP-AS-IS | — | On approved list, 404 unique-body words after Phase 1 absorbed three merges. Only single service to meet the 350+ threshold. |
| title-expert-witness-tennessee | Title Expert Witness in Tennessee | 330 | Y (#1) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-contract-expert-witness-tennessee | Real Estate Contract Expert Witness in Tennessee | 254 | Y (#13) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| property-valuation-expert-witness-tennessee | Property Valuation Expert Witness in Tennessee | 344 | Y (#14) | KEEP-AND-IMPROVE | — | On approved list. Just below target. |
| trec-complaint-expert-witness-tennessee | TREC Complaint Expert Witness in Tennessee | 246 | Y (Phase 1 KEEP) | KEEP-AND-IMPROVE | — | Phase 1 FOR_REVIEW KEEP. Distinct legal context. |
| landlord-tenant-expert-witness-tennessee | Landlord Tenant Expert Witness in Tennessee | 218 | Y (Phase 1 KEEP) | KEEP-AND-IMPROVE | — | Phase 1 FOR_REVIEW KEEP. |
| property-management-expert-witness-tennessee | Property Management Expert Witness in Tennessee | 221 | Y (Phase 1 KEEP) | KEEP-AND-IMPROVE | — | Phase 1 FOR_REVIEW KEEP. |
| real-estate-disclosure-expert-witness-tennessee | Real Estate Disclosure Expert Witness in Tennessee | 275 | Y (Phase 1 KEEP) | KEEP-AND-IMPROVE | — | Phase 1 FOR_REVIEW KEEP. |
| real-estate-commission-dispute-expert-witness-tennessee | Real Estate Commission Dispute Expert Witness in Tennessee | 202 | Y (Phase 1 KEEP) | KEEP-AND-IMPROVE | — | Phase 1 FOR_REVIEW KEEP. |

### Hub: business-formation (1 hub + 12 services → 7)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **business-formation** (hub) | Business Formation Attorney in Tennessee | 121 | hub | KEEP-AS-IS | — | Approved hub. |
| foreign-llc-qualification-attorney-tennessee | Foreign LLC Qualification Attorney in Tennessee | 221 | N | DELETE | — | Off-list, <350w, no clean merge target. Distinct topic (out-of-state LLCs entering TN) but doesn't meet 400w carve-out. Redirect to `/services/business-formation`. |
| llc-dissolution-attorney-tennessee | LLC Dissolution Attorney in Tennessee | 237 | N | DELETE | — | Off-list, <350w. Distinct topic (winding up an LLC) but no merge target on the approved list. |
| partnership-agreement-attorney-tennessee | Partnership Agreement Attorney in Tennessee | 223 | N | DELETE | — | Off-list, <350w. Partnership-agreement drafting; the approved list has business-partnership-dispute (litigation) and operating-agreement (LLC); GP/LP drafting falls outside both. |
| holding-company-formation-attorney-tennessee | Holding Company Formation Attorney in Tennessee | 209 | N | DELETE | — | Off-list, <350w. Multi-entity structuring; distinct from llc-formation. |
| nonprofit-formation-attorney-tennessee | Nonprofit Formation Attorney in Tennessee | 223 | N | DELETE | — | Off-list, <350w. 501(c)(3) work is distinct from for-profit formation; no approved-list overlap. |
| llc-formation-attorney-tennessee | LLC Formation Attorney in Tennessee | 280 | Y (#6) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| operating-agreement-attorney-tennessee | Operating Agreement Attorney in Tennessee | 252 | Y (#7) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| pllc-formation-attorney-tennessee | PLLC Formation Attorney in Tennessee | 209 | Y (#15) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| s-corp-election-attorney-tennessee | S-Corp Election Attorney in Tennessee | 244 | Y (#16) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| series-llc-attorney-tennessee | Series LLC Attorney in Tennessee | 225 | Y (#17) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| buy-sell-agreement-attorney-tennessee | Buy-Sell Agreement Attorney in Tennessee | 222 | Y (#18) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| corporation-formation-attorney-tennessee | Corporation Formation Attorney in Tennessee | 235 | Y (#19) | KEEP-AND-IMPROVE | — | On approved list. Below target. |

### Hub: contract-services (1 hub + 10 services → 6)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **contract-services** (hub) | Business Contract Attorney in Tennessee | 130 | hub | KEEP-AS-IS | — | Approved hub. |
| nda-attorney-tennessee | NDA Attorney in Tennessee | 211 | N | DELETE | — | Off-list, <350w. NDAs are a contract subspecies; the approved contract-review-attorney page covers the general intent. No clean merge (intent is broader than "review"). |
| master-service-agreement-attorney-tennessee | Master Service Agreement Attorney in Tennessee | 196 | N | DELETE | — | Off-list, <350w. MSA work is a subset of broader contract drafting/review. |
| asset-purchase-agreement-attorney-tennessee | Asset Purchase Agreement Attorney in Tennessee | 231 | N | DELETE | — | Off-list, <350w. APA is M&A-deal-side; no approved-list match. |
| letter-of-intent-attorney-tennessee | Letter of Intent Attorney in Tennessee | 213 | N | DELETE | — | Off-list, <350w. LOI work is deal-stage; no approved-list match. |
| contract-review-attorney-tennessee | Contract Review Attorney in Tennessee | 212 | Y (#2) | KEEP-AND-IMPROVE | — | On approved list. Below target. The broad-intent landing for the contract-services hub. |
| independent-contractor-agreement-attorney-tennessee | Independent Contractor Agreement Attorney in Tennessee | 207 | Y (#20) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| vendor-agreement-attorney-tennessee | Vendor Agreement Attorney in Tennessee | 199 | Y (#21) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-contract-attorney-tennessee | Real Estate Contract Attorney in Tennessee | 208 | Y (#22) | KEEP-AND-IMPROVE | — | On approved list. Below target. Merge target for real-estate-purchase-agreement. |
| construction-contract-attorney-tennessee | Construction Contract Attorney in Tennessee | 201 | Y (#23) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| commercial-lease-attorney-tennessee | Commercial Lease Attorney in Tennessee | 221 | Y (#10) | KEEP-AND-IMPROVE | — | On approved list. Below target. |

### Hub: real-estate-transactions (FLAGGED) (1 hub + 5 services → 1–2)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **real-estate-transactions** (hub) | Real Estate Transactions Attorney in Tennessee | 130 | N (off-list hub) | FLAG | — | Not in the approved 5-hub architecture. Recommendation: delete this hub and migrate `owner-financing` (if Steve keeps it) into `contract-services` or `real-estate-disputes`. Phase 2 does NOT auto-delete the hub. See FOR_REVIEW.md. |
| real-estate-purchase-agreement-attorney-tennessee | Real Estate Purchase Agreement Attorney in Tennessee | 239 | N | MERGE | real-estate-contract-attorney-tennessee | Same audience and intent: drafting/reviewing residential and commercial PSAs. Merge target is the approved Real Estate Contract Attorney page; PSAs are subsumed. |
| land-contract-attorney-tennessee | Land Contract Attorney in Tennessee | 245 | N | DELETE | — | Off-list, <350w. Installment land sales are distinct but niche; no clean merge to an approved page. |
| real-estate-joint-venture-attorney-tennessee | Real Estate Joint Venture Attorney in Tennessee | 222 | N | DELETE | — | Off-list, <350w. JV structuring is distinct (operator + capital partner) but no approved-list match. |
| assignment-of-contract-attorney-tennessee | Assignment of Contract Attorney in Tennessee | 293 | N | DELETE | — | Off-list, <350w. Wholesaler assignments are niche; no approved-list match. |
| owner-financing-attorney-tennessee | Owner Financing Attorney in Tennessee | 377 | N | FLAG | — | Off-list. 377w — just below the 400w "legit extension" carve-out. Distinct subject (seller-financed real-estate sales with note + deed of trust + Dodd-Frank seller-financing exclusion analysis). Audit's lean: KEEP and migrate to `contract-services` or `real-estate-disputes` if the hub is deleted. See FOR_REVIEW.md. |

### Hub: real-estate-disputes (1 hub + 19 services → 8)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **real-estate-disputes** (hub) | Real Estate Disputes Attorney in Tennessee | 89 | hub | KEEP-AS-IS | — | Approved hub. |
| failure-to-disclose-attorney-tennessee | Failure to Disclose Attorney in Tennessee | 308 | N | MERGE | real-estate-fraud-attorney-tennessee | Same audience (post-closing buyers with disclosure-based claims) and overlapping intent. The approved real-estate-fraud page already mentions seller-disclosure-based claims; merging consolidates. TRPCDA-specific content is preserved on the target. |
| specific-performance-attorney-tennessee | Specific Performance Attorney in Tennessee | 208 | N | DELETE | — | Off-list, <350w. Equitable remedy is distinct from any approved page. |
| earnest-money-dispute-attorney-tennessee | Earnest Money Dispute Attorney in Tennessee | 199 | N | DELETE | — | Off-list, <350w. Deposit-release disputes are narrow. |
| construction-defect-attorney-tennessee | Construction Defect Attorney in Tennessee | 241 | N | DELETE | — | Off-list, <350w. Commercial construction defects are distinct from the construction-contract drafting work approved in contract-services. |
| hoa-dispute-attorney-tennessee | HOA Dispute Attorney in Tennessee | 185 | N | DELETE | — | Off-list, <350w. Covenant-enforcement work. |
| foreclosure-excess-proceeds-attorney-tennessee | Foreclosure Excess Proceeds Attorney in Tennessee | 319 | N | DELETE | — | Off-list, <350w. Surplus-funds recovery is distinct doctrinal work. |
| landlord-attorney-tennessee | Landlord Attorney in Tennessee | 183 | N | DELETE | — | Off-list, <350w. Landlord representation is broad; approved list has eviction-attorney-sumner-county-tn (#9) as the local-intent variant. |
| tenant-attorney-tennessee | Tenant Attorney in Tennessee | 257 | N | DELETE | — | Off-list, <350w. Tenant-side representation. |
| eviction-attorney-tennessee | Eviction Attorney in Tennessee | 220 | N | DELETE | — | Off-list, <350w. The approved list has only the Sumner County variant (#9). The statewide variant cannibalizes the local-intent page. |
| eviction-defense-attorney-tennessee | Eviction Defense Attorney in Tennessee | 198 | N | DELETE | — | Off-list, <350w. Tenant-side eviction defense. |
| mold-claim-attorney-tennessee | Mold Claim Attorney in Tennessee | 256 | N | DELETE | — | Off-list, <350w. Narrow claim type. |
| quiet-title-attorney-tennessee | Quiet Title Attorney in Tennessee | 231 | Y (#3) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| easement-attorney-tennessee | Easement Attorney in Tennessee | 204 | Y (#24) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| title-defect-attorney-tennessee | Title Defect Attorney in Tennessee | 199 | Y (#25) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| real-estate-fraud-attorney-tennessee | Real Estate Fraud Attorney in Tennessee | 201 | Y (#26) | KEEP-AND-IMPROVE | — | On approved list. Below target. Merge target for failure-to-disclose. |
| mechanics-lien-attorney-tennessee | Mechanics Lien Attorney in Tennessee | 264 | Y (#8) | KEEP-AND-IMPROVE | — | On approved list. Below target. |
| property-line-dispute-attorney-tennessee | Property Line Dispute Attorney in Tennessee | 176 | Y (#11) | KEEP-AND-IMPROVE | — | On approved list. Below target — thinnest page on the list. |
| real-estate-attorney-gallatin-tn | Real Estate Attorney in Gallatin TN | 196 | Y (#4) | KEEP-AND-IMPROVE | — | On approved list. Below target. Local landing page. |
| eviction-attorney-sumner-county-tn | Eviction Attorney in Sumner County TN | 216 | Y (#9) | KEEP-AND-IMPROVE | — | On approved list. Below target. Local-intent variant. |

### Hub: business-disputes (1 hub + 6 services → 3)

| slug | primary keyword | words | on-list | decision | merge-into | reasoning |
|---|---|---|---|---|---|---|
| **business-disputes** (hub) | Business Disputes Attorney in Tennessee | 130 | hub | KEEP-AS-IS | — | Approved hub. |
| llc-member-buyout-attorney-tennessee | LLC Member Buyout Attorney in Tennessee | 215 | N | MERGE | business-partnership-dispute-attorney-tennessee | Same audience (LLC members in conflict), same intent (resolving exits / dissociation). Member-buyout content folded into the approved partnership-dispute landing. |
| shareholder-dispute-attorney-tennessee | Shareholder Dispute Attorney in Tennessee | 179 | N | MERGE | business-partnership-dispute-attorney-tennessee | Closely held corporation conflicts — the partnership-dispute page's content already includes "shareholders" alongside LLC members and partners. Merge consolidates. |
| breach-of-fiduciary-duty-attorney-tennessee | Breach of Fiduciary Duty Attorney in Tennessee | 225 | N | MERGE | business-partnership-dispute-attorney-tennessee | Fiduciary breach is a partnership/LLC-internal claim. Same audience. Merge target consolidates the family of partnership-internal disputes. |
| tortious-interference-attorney-tennessee | Tortious Interference Attorney in Tennessee | 200 | N | DELETE | — | Off-list, <350w. Tort claim broader than non-compete; cleaner to delete than to force a merge. |
| business-partnership-dispute-attorney-tennessee | Business Partnership Dispute Attorney in Tennessee | 196 | Y (#27) | KEEP-AND-IMPROVE | — | On approved list. Below target. Merge target for three pages. |
| non-compete-attorney-tennessee | Non-Compete Attorney in Tennessee | 203 | Y (#28) | KEEP-AND-IMPROVE | — | On approved list. Below target. |

## Pause-condition check

Phase 2 threshold: pause if >12 pages in `FOR_REVIEW.md`. Current FLAG
count: **2** (owner-financing service + real-estate-transactions hub).
Under threshold. Proceeding to Phase 5.

## Cross-tree linking impact

The 28 removed slugs are referenced from:

- `src/lib/content/practice-area-services.ts` — cross-tree linking map.
  Drop or repoint the matching entries in `practiceAreaServiceLinks`
  clusters and remove the matching `serviceParentPracticeArea` keys.
- `src/lib/content/resources.ts` — article internal links. Repoint each
  `href: "/services/<deleted-slug>"` to either the merge target (for
  MERGEs) or the parent hub (for DELETEs).

The dynamic `/services/[slug]` route reads from the content arrays
directly; removing an entry from the array automatically:

- Drops the route from `generateStaticParams`.
- Removes it from the sitemap.
- Returns 404 unless a redirect is in place — the redirects are added
  in Phase 5 commit 1, before the content removals in subsequent commits.

## Notes on what is _not_ being changed

- `/practice-areas/*` editorial content — out of scope.
- `src/lib/intake*`, `src/app/api/*`, legal disclosure pages — out of scope.
- The 28-keyword list — neither modified nor regenerated.
- KEEP-AND-IMPROVE pages — not auto-expanded (briefing rule).
- COMPLIANCE findings — flagged only, not auto-fixed (briefing rule).
- Sitemap, robots, opengraph-image, twitter-image — none of the deleted
  slugs are hardcoded in these files.

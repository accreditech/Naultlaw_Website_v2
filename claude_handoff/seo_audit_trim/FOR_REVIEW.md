# Pages flagged for Steve's review

Six pages that the audit could not resolve under the briefing's decision
criteria. The audit's lean (DELETE / MERGE / KEEP) for each one is below.
**Phase 4 leaves these pages untouched.** They keep their current slugs and
no redirects are added. Steve decides each one and the resulting decisions
should be applied in a follow-up commit.

The pause threshold from the briefing is "more than 10." This list has 6, so
Phase 4 proceeds. Five of these are off-list expert-witness pages whose
content is distinct enough to defend keeping; one is a local-intent eviction
variant.

---

## 1. trec-complaint-expert-witness-tennessee

- Slug: `/services/trec-complaint-expert-witness-tennessee`
- Primary keyword: TREC Complaint Expert Witness in Tennessee
- Current unique-body words: 246
- Why ambiguous: not in any hub's `childSlugs` array, so technically off-list.
  But the content is doctrinally distinct from the other expert-witness pages
  the audit is keeping. It addresses TREC disciplinary proceedings (an
  administrative-law context), not civil litigation. It also contains a
  unique paragraph explaining how the expert-witness role differs from the
  TREC-defense-counsel role Steve separately offers as counsel. None of the
  pages the audit is keeping cover this ground.
- **Audit recommendation: lean KEEP.** Distinct legal context, no
  cannibalization risk, niche but real demand from licensees and complainants.
  If Steve disagrees, the cleanest merge target is
  `real-estate-broker-standard-of-care-expert-witness-tennessee`.

---

## 2. landlord-tenant-expert-witness-tennessee

- Slug: `/services/landlord-tenant-expert-witness-tennessee`
- Primary keyword: Landlord Tenant Expert Witness in Tennessee
- Current unique-body words: 218
- Why ambiguous: off-list, but the content is squarely in a subject domain
  (commercial L/T expert work — CAM, possession, deposit accounting, URLTA)
  that none of the four kept expert-witness pages cover. Steve has 120+
  commercial leases in past roles and oversaw multi-million-square-foot
  portfolios, which is the credential basis for this engagement type.
- **Audit recommendation: lean KEEP.** Distinct subject domain, real
  expertise behind the page. If Steve disagrees, no clean merge target
  exists; the page would be DELETE (with redirect to the
  `/services/expert-witness` hub).

---

## 3. property-management-expert-witness-tennessee

- Slug: `/services/property-management-expert-witness-tennessee`
- Primary keyword: Property Management Expert Witness in Tennessee
- Current unique-body words: 221
- Why ambiguous: off-list, distinct subject domain (PM practice, trust
  accounting, owner-vs-manager). Partially overlaps with the
  `realtor-dispute-expert-witness` page (which is being merged away in this
  phase), but the core PM angle — trust accounting and TREC management-broker
  rules — is its own subject. Steve has hands-on PM experience including
  oversight of multi-million-square-foot office portfolios, which is the
  credential basis.
- **Audit recommendation: lean KEEP.** Distinct subject domain. If Steve
  disagrees, no clean merge target exists; would be DELETE with redirect to
  the `/services/expert-witness` hub.

---

## 4. real-estate-disclosure-expert-witness-tennessee

- Slug: `/services/real-estate-disclosure-expert-witness-tennessee`
- Primary keyword: Real Estate Disclosure Expert Witness in Tennessee
- Current unique-body words: 275
- Why ambiguous: off-list. The content overlaps somewhat with two pages we
  are keeping —
  `real-estate-broker-standard-of-care-expert-witness-tennessee` and the
  failure-to-disclose litigation page in the disputes hub. But this page has
  a distinct angle (TRPCDA framework specifically) and a unique "scope of
  opinions" paragraph that flags Steve is not a certified appraiser, home
  inspector, or guarantor of outcome — useful belt-and-suspenders compliance
  language not duplicated elsewhere.
- **Audit recommendation: lean KEEP.** Distinct legal hook + unique scope
  paragraph. If Steve disagrees, the cleanest merge target is
  `real-estate-broker-standard-of-care-expert-witness-tennessee` (preserving
  the TRPCDA paragraph in the merged content).

---

## 5. real-estate-commission-dispute-expert-witness-tennessee

- Slug: `/services/real-estate-commission-dispute-expert-witness-tennessee`
- Primary keyword: Real Estate Commission Dispute Expert Witness in Tennessee
- Current unique-body words: 202
- Why ambiguous: off-list and the thinnest of the flagged pages. But the
  content is doctrinally distinct (procuring-cause analysis, listing- and
  buyer-broker-agreement enforcement, broker-vs-broker arbitrations). This is
  its own case category and not covered by any kept expert-witness page.
- **Audit recommendation: lean KEEP.** Niche but doctrinally distinct, real
  demand from broker-vs-broker disputes. If Steve disagrees, the cleanest
  merge target is `real-estate-broker-standard-of-care-expert-witness-tennessee`.

---

## 6. eviction-attorney-sumner-county-tn

- Slug: `/services/eviction-attorney-sumner-county-tn`
- Primary keyword: Eviction Attorney in Sumner County TN
- Current unique-body words: 216
- Why ambiguous: this is the only local-intent variant slug for an existing
  statewide page (`eviction-attorney-tennessee`). Two plausible reads —
  legitimate local-SEO play targeting "eviction attorney sumner county"
  searches, OR cannibalization of the statewide page that Google may be
  triaging as near-duplicate. The Gallatin/Sumner geographic focus is
  consistent with Steve's office location, but the rest of the eviction work
  is statewide.
- **Audit recommendation: lean KEEP.** The local-intent variant is a
  defensible SEO play for the office-location market, and the content does
  call out Sumner County General Sessions specifically. If Steve disagrees,
  merge into `eviction-attorney-tennessee` with a 301 redirect, preserving
  the Sumner County General Sessions paragraph.

---

## Format for Steve's response

For each item Steve can write one of: `KEEP`, `MERGE-INTO-<slug>`, or
`DELETE`. The follow-up commit applies the decisions in the same redirect
pattern used in Phase 4.

| # | Slug | Steve's decision |
|---|---|---|
| 1 | trec-complaint-expert-witness-tennessee | _____ |
| 2 | landlord-tenant-expert-witness-tennessee | _____ |
| 3 | property-management-expert-witness-tennessee | _____ |
| 4 | real-estate-disclosure-expert-witness-tennessee | _____ |
| 5 | real-estate-commission-dispute-expert-witness-tennessee | _____ |
| 6 | eviction-attorney-sumner-county-tn | _____ |

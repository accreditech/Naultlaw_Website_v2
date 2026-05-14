# Phase 2 — Pages flagged for Steve's review

Two items the audit could not resolve under the substantive criteria.
Phase 5 leaves both untouched (no slug changes, no redirects). Steve
decides each one and the resulting decisions should be applied in a
follow-up commit.

Pause-threshold check: briefing threshold is "more than 12." This list
has 2. Phase 5 proceeds.

---

## 1. owner-financing-attorney-tennessee

- Slug: `/services/owner-financing-attorney-tennessee`
- Primary keyword: Owner Financing Attorney in Tennessee
- Current unique-body words: **377**
- Hub: `/services/real-estate-transactions/` (also flagged below)

**Why ambiguous.** Not on the approved 28-keyword list. Word count is
377 — short by 23 of the 400-word "legit extension" carve-out
(criterion 5). The content is doctrinally distinct from anything on
the approved list: it's the seller-financed-real-estate-sale page,
with a substantive Dodd-Frank seller-financing-exclusion analysis,
a Tennessee usury-and-rate-limit cite (Tenn. Code Ann. §§ 47-14-103,
47-14-117, 47-15-102), and a TN mortgage-licensing rule cite (§ 45-13-201).
No approved page covers this material; redirecting to
`/services/real-estate-transactions/` would lose substance.

The Phase 1 audit classified this as KEEP-AS-IS (it was the only
service page over 350 words at the time). Phase 2's strict criteria
mark it as off-list with a near-miss carve-out, so it's flagged.

**Audit recommendation: lean KEEP.** The content is real and the
Dodd-Frank framing is genuinely useful. If Steve agrees, the page
should migrate to either `/services/contract-services/` (closer to
the transactional drafting hub) or `/services/real-estate-disputes/`
(if owner-financing disputes are the more common engagement type).
The hub-migration decision pairs with the next item.

If Steve disagrees, DELETE with redirect to
`/services/real-estate-transactions/` for now (or to the parent of the
migration target if the hub is also being deleted).

---

## 2. /services/real-estate-transactions/ (hub)

- URL: `/services/real-estate-transactions`
- H1: Real Estate Transactions Attorney in Tennessee
- Current unique-body words: 130 hub body + child cards (rendered with each child)

**Why ambiguous.** This hub is not in the approved 5-hub architecture
documented in the Phase 2 starter prompt. The approved hubs are
expert-witness, business-formation, contract-services,
real-estate-disputes, business-disputes. The
real-estate-transactions hub is a sixth hub that exists in the repo
but not in the approved structure.

After Phase 2's child-level trim, the hub contains:

- `owner-financing-attorney-tennessee` (item 1 above, flagged) — if KEEP, the hub has 1 child.
- Three deleted children (`land-contract`, `real-estate-joint-venture`, `assignment-of-contract`) redirected here.
- One merged child (`real-estate-purchase-agreement`) redirected away to `real-estate-contract-attorney-tennessee`.

The briefing's architectural recommendation: "(a) keep the hub if 2+
children survive, (b) delete the hub and migrate any surviving child
into `contract-services` or `real-estate-disputes`." After Phase 2,
at most 1 child survives (owner-financing, and only if Steve keeps
it). So criterion (b) applies.

**Audit recommendation: lean DELETE + migrate.** Specifically:

1. If owner-financing is KEPT (item 1): move it to
   `/services/contract-services/` (drafting/transactional fits). Update
   its `hub` field, move it in the children files, add it to
   `contract-services` `childSlugs`. Add a 301:
   `/services/owner-financing-attorney-tennessee` would remain at the
   same URL (slugs don't change, only the hub assignment), so no
   redirect needed for the page itself. Add a 301 for the hub:
   `/services/real-estate-transactions` → `/services/contract-services`.
   Update the three Phase 2 deletes (land-contract,
   real-estate-joint-venture, assignment-of-contract) that currently
   redirect to `/services/real-estate-transactions` to redirect to
   `/services/contract-services` instead.

2. If owner-financing is DELETED: delete the hub entirely. Add a 301:
   `/services/real-estate-transactions` → `/services/`. Update the
   three Phase 2 deletes to redirect to `/services/contract-services`
   (or `/services/real-estate-disputes`, depending on what fits each
   slug's topic best).

The audit prefers option (a) on item 1 + option (1) on item 2 —
that is, keep owner-financing, move it to contract-services, kill the
real-estate-transactions hub — because (i) owner-financing is
substantive and serves real demand, and (ii) the
real-estate-transactions hub is off-architecture and confusing
alongside real-estate-disputes.

---

## Format for Steve's response

For each item Steve picks one of `KEEP`, `MERGE-INTO-<slug>`, or
`DELETE`. For item 2, the relevant decision is whether the hub stays,
goes, or migrates. The follow-up commit applies the decisions.

| # | Item | Steve's decision |
|---|---|---|
| 1 | owner-financing-attorney-tennessee | KEEP / DELETE / MIGRATE-TO-<hub> |
| 2 | /services/real-estate-transactions/ hub | KEEP / DELETE / MIGRATE-children-to-<hub> |

If item 1 is KEEP and item 2 is DELETE, both deltas can land in a
single follow-up commit on `seo/audit-and-trim-phase-3` (or however
Steve names the cleanup branch).

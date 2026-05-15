# RPC 7.1 Compliance Scan — Phase 2

Scan date: 2026-05-14
Branch: `seo/audit-and-trim-phase-2`
Rule reference: TN RPC 7.1 (the current rule; old 7.4 and 7.5 are
deleted-and-reserved, with their substance folded into 7.1 comments).

## Site-wide check

| Item | Status | Notes |
|---|---|---|
| Footer firm name (Rule 7.1(b)) | **PASS** | `src/components/site/site-footer.tsx:250` reads "© 2025 The Law Office of Stephen Nault." Present on every page via the global layout. |
| Footer contact info (Rule 7.1(b)) | **PASS** | Footer includes a `/contact` link (line 161) plus the firm-name attribution. The dedicated `/contact` page is reachable from every layout. |
| Past-results disclaimer (Rule 7.1 Comment [3]) | **PASS** | `src/components/site/site-footer.tsx:251`: "Prior results do not guarantee a similar outcome." Present sitewide. |
| Attorney-advertising disclosure | **PASS** | Footer states "Attorney advertising" (line 250). |
| No-attorney-client-relationship disclaimer | **PASS** | Footer states "No attorney-client relationship is formed by visiting or submitting information through this website." (line 252–253). |

The sitewide-mandated language for Rule 7.1(b) and the unjustified-expectations
disclaimer (Comment [3]) are all in place. The footer is the right place
for these disclaimers — rendered on every `/services/*` page via the
shared layout.

## Scan methodology

For each surviving `/services/*` page (the 39–40 pages remaining after
Phase 2's trim), grep was run against the underlying content arrays
(`src/lib/content/bofu-services.ts`, `src/lib/content/bofu/*.ts`) and
the cross-tree linking map (`src/lib/content/practice-area-services.ts`)
for these patterns:

- **CRITICAL** banned specialization terms: `\bspecialist\b`,
  `\bspecialty\b`, `specializes? in`, `\bspecialization\b`,
  `\bspecialized\b` (applied to the lawyer's practice).
- **CRITICAL** outcome guarantees: `\bguarantee[ds]?\b`, "we will win,"
  "always win(s)?", "every (time|case)", "will (recover|succeed)".
- **CRITICAL** unsubstantiated superlatives: `\bbest\b` (in
  attorney/lawyer contexts), `\btop-?rated\b`, `\bleading\b`,
  `\bpremier\b`, `\belite\b`, "most (experienced|knowledgeable)".
- **HIGH** "expert in [practice area]" (could read as specialization
  claim).
- **HIGH** comparative claims ("more experienced than", "better than
  other/local/TN").
- **MEDIUM** past-results claim without disclaimer (the sitewide
  disclaimer above generally covers this; flag if a page makes a
  specific outcome claim and lacks page-level context).
- **MEDIUM** named testimonials embedded directly in a `/services/*`
  page (testimonials live on the homepage, not on service pages).

The scan also examined `src/app/page.tsx`, `src/app/about/page.tsx`,
`src/lib/content/attorney.ts`, and `src/lib/content/practice-areas.ts`
for sitewide chrome that might render on `/services/*` pages.

## Findings

### CRITICAL findings

**0.** Zero CRITICAL findings on surviving `/services/*` pages. No
banned specialization terms, no outcome guarantees, no unsubstantiated
superlatives anywhere in the BOFU content arrays.

### HIGH findings

**0.** Zero HIGH findings. No "expert in [practice area]" patterns.
The literal phrase "expert witness" appears throughout the
expert-witness-hub pages, but this is the FRE 702 service title (a
paid service Steve offers), not a specialization claim about the
lawyer's practice. Per the briefing's explicit nuance: "expert witness"
is allowed; only "specialist / specialty / specializes in /
specialization / specialized" are banned.

No comparative claims.

### MEDIUM findings

**0.** Zero MEDIUM findings on surviving `/services/*` pages. No
page-level past-results claims; no named testimonials embedded in
service pages. (Named testimonials live in
`src/lib/content/testimonials.ts` and are rendered on the homepage and
the "About" page. They are Google + Yelp reviews with source
attribution, which is the standard accepted form for attorney
advertising. They do not appear on `/services/*` pages.)

### LOW findings

**0.** Zero LOW findings. No implied-certification language
("certified", "approved", "recognized") without naming the certifying
body. The expert-witness pages reference TREC course-instructor licensure
and Tennessee real-estate brokerage licensure — both name the licensing
authority explicitly.

## Notes that look like findings but are not

These were caught by the scan and reviewed; none are actual violations:

1. **"Prior results do not guarantee a similar outcome"** in
   `src/components/site/site-footer.tsx:251` matched the `guarantee`
   pattern. This is the disclaimer language itself — the correct
   compliance language, not a violation.

2. **"expert witness in Tennessee"** appears many times across
   `src/lib/content/bofu/expert-witness-children.ts`. Per the briefing,
   this is the FRE 702 service title, not a specialization claim. Not a
   finding.

3. **"specialty"** in non-self-descriptive contexts (e.g., describing
   a niche legal subject area) was not found in any surviving
   `/services/*` content.

4. **"best"** in superlative contexts ("best attorney", "best lawyer")
   was not found in surviving content.

## Summary counts

| Severity | Count on surviving pages | Count site-wide (excluding /services/*) |
|---|---|---|
| CRITICAL | 0 | 0 |
| HIGH | 0 | 0 |
| MEDIUM | 0 | 0 (named testimonials with source attribution are accepted form) |
| LOW | 0 | 0 |
| **Total** | **0** | **0** |

## Recommendation

The surviving `/services/*` pages and the sitewide chrome are clean
under TN RPC 7.1 as currently enforced. The footer Rule 7.1(b)
attribution and the Comment [3] disclaimer are in place. No fixes
required.

**Future-content-pass note:** when the KEEP-AND-IMPROVE pages are
expanded by a writer in a future pass, this scan should be re-run
on the new content before deployment. The same patterns (specialization
terms, outcome guarantees, superlatives, "expert in [practice area]"
phrasing) are the easy traps to fall into when expanding a thin page
into a substantive one.

## Why this scan is narrow

The briefing says: "Flag findings; do not auto-fix." Per that
instruction, this report records what was scanned and what was found —
nothing was modified. A second-pass reviewer (Steve or an editor)
should re-read every surviving page in full before deploying any new
content, because automated grep will not catch subtle
unjustified-expectations problems that require judgment (e.g., a true
fact framed in a way that creates an unjustified expectation).

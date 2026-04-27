# Legal Page

The four legal notices required by Tennessee RPC + standard internet hygiene live on a single consolidated page at `/legal`. This doc tracks what's there, where the copy lives, and the periodic-review checklist.

## URL

- Live URL: `https://www.naultlaw.com/legal`
- 301 redirects (in `next.config.ts`) from the old per-section URLs:
  - `/terms-of-use` → `/legal#site-terms`
  - `/terms-disclaimer` → `/legal#site-terms`
  - `/privacy-policy` → `/legal#privacy-policy`
  - `/website-disclaimer` → `/legal#attorney-advertising`
  - `/no-attorney-client-relationship` → `/legal#attorney-advertising`

## Sections

The page renders 4 sections in order:

1. **Site Terms** (`#site-terms`) — copy from `publicDisclosures.termsOfUse`
2. **Privacy Policy** (`#privacy-policy`) — copy from `publicDisclosures.privacyPolicy` PLUS two new paragraphs disclosing visitor tracking + IP hashing
3. **Attorney Advertising** (`#attorney-advertising`) — copy from `publicDisclosures.websiteDisclaimer` PLUS the no-attorney-client-relationship copy as a sub-section
4. **Engagement Terms** (`#engagement-terms`) — net-new content scaffolded in `src/app/legal/page.tsx`. Covers scope, fees, communication, confidentiality, file retention, termination, jurisdiction.

## Where the copy lives

| Section | Source |
|---|---|
| Site Terms | `src/lib/public-disclosures.ts` → `termsOfUse` |
| Privacy Policy | `src/lib/public-disclosures.ts` → `privacyPolicy` + 2 hardcoded paragraphs in `src/app/legal/page.tsx` |
| Attorney Advertising | `src/lib/public-disclosures.ts` → `websiteDisclaimer` + `noAttorneyClientRelationship` |
| Engagement Terms | Hardcoded in `src/app/legal/page.tsx` (`SECTIONS[3].paragraphs`) |

When you (Steve) want to update legal copy, ask the developer to edit `src/lib/public-disclosures.ts`. Everything except Engagement Terms flows from there. The footer disclaimer also reads from `publicDisclosures.footer`.

## Last reviewed

The "Last reviewed: April 2026" line at the top of `/legal` is a constant `LAST_REVIEWED` in `src/app/legal/page.tsx`. **Update it whenever you do a substantive review** — this signals to readers (and to courts in the unlikely event of a dispute) when the document was last attorney-reviewed.

## Periodic review checklist

Recommended cadence: **annually**, or any time:

- Tennessee Rules of Professional Conduct change (especially the 7.x advertising rules, 1.18 prospective-client rules)
- Tennessee state privacy law changes
- Federal privacy law changes (e.g., TDPSA going into effect)
- The website starts collecting a new category of data
- A new revenue model is added (e.g., flat-fee subscriptions, online payments)
- The site adds a third-party analytics tool

For each section:

- [ ] Site Terms — does it accurately describe what users can/can't do?
- [ ] Privacy Policy — does it reflect every category of data we actually collect? Including any new analytics, cookies, third parties.
- [ ] Attorney Advertising — does it comply with current TN RPC 7.1, 7.2, 7.5? Does it identify the responsible attorney? Does it disclaim that prior results don't predict future outcomes?
- [ ] Engagement Terms — does it match the actual engagement letter the firm uses? Are scope, fees, termination provisions consistent?
- [ ] Update `LAST_REVIEWED` in `src/app/legal/page.tsx` to the new month/year.

## Compliance flags

The current copy was scaffolded for V2 launch. **A licensed Tennessee attorney should review the Engagement Terms section in particular** before the site is held out as a substantive engagement basis. Items to verify:

- Whether your engagement letters refer to "Site Terms" by name, and whether that creates an ambiguity
- Whether jurisdiction-of-disputes language matches what's in the engagement letter
- Whether "fees and billing" language in `/legal#engagement-terms` is precise enough or should be more permissive (currently says fees are described in the engagement letter — that's correct but verify)

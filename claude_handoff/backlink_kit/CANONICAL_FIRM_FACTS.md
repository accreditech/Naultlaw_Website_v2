# Canonical firm facts

**Single source of truth for every directory submission.** NAP
consistency (Name, Address, Phone) is a Google local-SEO signal. Even
minor inconsistency between directories ("Ste 100" vs "Suite 100",
"615-953-9505" vs "(615) 953-9505") degrades that signal.

Use this file verbatim. If a directory's required field doesn't appear
below, mark it `[NEEDS VALUE FROM STEVE]` in the platform file rather
than guessing.

Source files (in this repo):

- `src/lib/site-config.ts`
- `src/lib/content/attorney.ts`
- `src/app/contact/page.tsx`
- `src/components/site/site-footer.tsx`

---

## Identity

| Field | Value |
|---|---|
| Firm legal name | The Law Office of Stephen Nault |
| Firm display name (short) | Nault Law |
| Attorney legal name | Stephen C. Nault, Esq. |
| Attorney first name | Stephen |
| Attorney last name | Nault |
| Title | Tennessee attorney based in Gallatin |
| Brand line | Practical counsel for business, real estate, and difficult disputes. |

## NAP (use exactly as written)

| Field | Value |
|---|---|
| Street address | 121 S. Hickory Ave |
| City | Gallatin |
| State | TN |
| ZIP | 37066 |
| Country | United States |
| One-line address | 121 S. Hickory Ave, Gallatin, TN 37066 |
| Phone (display) | (615) 953-9505 |
| Phone (E.164) | +16159539505 |
| Phone (digits only) | 6159539505 |
| Email | stephen@naultlaw.com |
| Website | https://naultlaw.com |

## Hours

| Field | Value |
|---|---|
| Days | Monday–Friday |
| Hours | By appointment |
| Time zone | America/Chicago (Central) |
| Initial intake response | Generally within one business day |

## Service area

| Tier | Counties |
|---|---|
| Primary (trial + local) | Sumner County |
| Trial counties (statewide advice + in-person representation) | Sumner, Wilson, Robertson, Trousdale, Williamson, Davidson |
| Statewide advice | All Tennessee counties |

City anchor: **Gallatin, TN** (office location). Secondary reach:
Nashville / Davidson County.

## Practice areas

Per `src/lib/content/attorney.ts` and the Phase 3 starter prompt:

| Practice area | Notes |
|---|---|
| Business law | LLC / PLLC / S-Corp / Series LLC / corporation formation, operating agreements, buy-sell agreements, vendor / customer / independent-contractor agreements, business disputes (partnership, non-compete). |
| Real estate law (non-closing) | Contract drafting and review (purchase agreements, leases, options, lease-to-own), real estate disputes (quiet title, easement, title defect, real-estate fraud, boundary, mechanics lien), commercial leasing, landlord/tenant matters. **NOT a closing attorney.** |
| Expert witness | For litigators in real-estate, brokerage, valuation, standard-of-care, contract-interpretation, and TRPCDA-disclosure cases. "Expert witness" is the FRE 702 service title — not banned by TN RPC 7.1. |
| Juvenile defense | Per Phase 3 starter prompt. (Not currently in the website's BOFU tree — confirm scope with Steve before claiming directories that ask for sub-areas.) |
| Construction law | Construction contracts, mechanics liens, construction defects. |

## Bar admissions & credentials

| Field | Value |
|---|---|
| State bar | Tennessee, admitted 2018 |
| Federal court | U.S. District Court for the Middle District of Tennessee |
| Other professional licenses | Tennessee Real Estate Broker (since 2012); Managing Broker of Accredited Realty LLC (since 2021-05-06); TREC course instructor (since 2020); Rule 31 Mediator (since 2025) |
| Bar number | [NEEDS VALUE FROM STEVE] |
| BPR (TN Board of Professional Responsibility) number | [NEEDS VALUE FROM STEVE] |

## Education

| Degree | Institution |
|---|---|
| JD | Nashville School of Law |
| Undergraduate | Bryant University, Smithfield, Rhode Island |
| Civic | Gallatin Government Institute, Class of 2019 |

## Demographic / extra-directory fields

| Field | Value |
|---|---|
| Languages | English |
| Year admitted to TN bar | 2018 |
| Year practice founded | [NEEDS VALUE FROM STEVE — admitted 2018, but the firm's solo-practice founding date isn't in the repo] |
| Number of attorneys | 1 |
| Office type | Solo |
| Headshot URL | [NEEDS VALUE FROM STEVE — `NEXT_PUBLIC_HEADSHOT_URL` is empty in the deployed env] |
| Office photo | `https://naultlaw.com/images/naultlawoffice.jpg` (used as hero on contact page) |
| Social: LinkedIn personal | [NEEDS VALUE FROM STEVE] |
| Social: LinkedIn company | [NEEDS VALUE FROM STEVE — may need to be created; see `12_linkedin_company.md`] |
| Social: Facebook | [NEEDS VALUE FROM STEVE] |
| Social: X / Twitter | [NEEDS VALUE FROM STEVE — may not exist] |

## Sub-areas (for platforms that take 3–5 areas of practice)

In priority order:

1. Business law
2. Real estate law
3. Expert witness
4. Construction law
5. Juvenile defense

## Compliance constants (use these phrasings)

Per TN RPC 7.1 — these are the safe phrasings that should appear
verbatim across directory bios:

| Use this | Don't use this |
|---|---|
| "Practice focuses on …" / "Focuses his practice on …" | "Specializes in …" / "Specialist in …" / "Specialty …" |
| "Experienced in …" / "Background in …" / "Practical experience with …" | "Expert in …" (when describing the lawyer's practice — "expert witness" the service title is fine) |
| "Counsel for business, real estate, and dispute matters" | "Best Tennessee business lawyer" / "Top-rated …" / "Leading …" / "Premier …" |
| "Results vary based on the facts of each case" / "Prior results do not guarantee a similar outcome" | "Guaranteed result" / "We will win" / "Always wins" |
| "This is contract work, not closing work" | Anything that positions Stephen as a **closing attorney** |

## Source verification

If any value in this file changes (new office, new email, new phone),
update this file FIRST, then sweep through every platform file in
this folder and update them to match. The platform files are
intentionally redundant copies of this canonical data, formatted to
each platform's character limits — that redundancy is the point (it
makes per-platform editing fast) but it does mean the data has to be
re-synced when the source of truth changes.

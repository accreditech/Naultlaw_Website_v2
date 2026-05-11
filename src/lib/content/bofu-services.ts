/**
 * Bottom-of-funnel (BOFU) practice-area pages built using Edward Sturm's
 * Compact Keywords methodology. Short, intent-matched pages organized into
 * five hubs. URL paths live under /services/...; user-facing labels say
 * "Practice Areas". Coexists with the editorial /practice-areas/... routes —
 * the two trees serve different intents and do not replace each other.
 *
 * Briefing: claude_handoff/seo_bofu_pages/ (untracked, see README.md).
 *
 * Hubs live in the bofuHubs array below. Children for each hub live in
 * src/lib/content/bofu/<hub>-children.ts and are concatenated into the
 * bofuServices array.
 */

import { businessDisputesChildren } from "@/lib/content/bofu/business-disputes-children";
import { businessFormationChildren } from "@/lib/content/bofu/business-formation-children";
import { contractServicesChildren } from "@/lib/content/bofu/contract-services-children";
import { expertWitnessChildren } from "@/lib/content/bofu/expert-witness-children";
import { realEstateDisputesChildren } from "@/lib/content/bofu/real-estate-disputes-children";
import { realEstateTransactionsChildren } from "@/lib/content/bofu/real-estate-transactions-children";

export type BofuHubId =
  | "expert-witness"
  | "business-formation"
  | "contract-services"
  | "real-estate-disputes"
  | "real-estate-transactions"
  | "business-disputes";

export type BofuHub = {
  id: BofuHubId;
  slug: string;
  primaryKeyword: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  whatThisCovers?: string;
  /** Optional rich narrative paragraphs rendered below "What this covers"
      to expand thin hub pages with substantive framing. */
  narrative?: string[];
  whenToCall: string;
  primaryCtaLabel: string;
  childSlugs: string[];
  isLitigation?: boolean;
};

export type BofuServiceSection = {
  h2: string;
  paragraphs: string[];
};

export type BofuService = {
  slug: string;
  hub: BofuHubId;
  primaryKeyword: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  sections: BofuServiceSection[];
  audience: string;
  serviceArea: string;
  isLitigation: boolean;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  needsSteveReview?: string[];
};

export const bofuHubs: BofuHub[] = [
  {
    id: "expert-witness",
    slug: "expert-witness",
    primaryKeyword: "Real Estate Expert Witness in Tennessee",
    title: "Real Estate Expert Witness in Tennessee | Nault Law",
    h1: "Real Estate Expert Witness in Tennessee",
    metaDescription:
      "Real estate expert witness in Tennessee for title, contract, valuation, and standard-of-care disputes. CV and prior testimony available. Call Nault Law.",
    intro:
      "Real estate expert witness work in Tennessee from an attorney and active managing broker — opinions on title, contract, valuation, brokerage standard of care, and property-management practice for litigators on both sides.",
    whatThisCovers:
      "Tennessee real estate disputes often turn on industry custom, document analysis, and how the underlying business actually operates. Opinions stay grounded in the record and limited to what the documents and the transaction actually support. Engagements range from confidential pre-designation consulting through Rule 26 disclosures, written reports, deposition support, and trial testimony.",
    narrative: [
      "What attorneys retain Nault Law for is an unusual combination: a Tennessee-licensed lawyer who is also an active managing broker, a TREC course instructor, a Rule 31 mediator, and a property-management operator across two decades of commercial real estate. Most expert witnesses in real-estate cases come from one of those tracks, not the combination. That mix matters because Tennessee real-estate disputes rarely turn on pure law or pure brokerage — they turn on the intersection: how the licensee is supposed to behave, what the documents should have said, and what a competent operator actually does in the field. The opinions you get reflect that practical, working-attorney-and-broker perspective rather than retired or theoretical analysis.",
      "Common case profiles include title and chain-of-title disputes (deed errors, missing instruments, conveyance defects), real-estate contract litigation (purchase agreements, options, lease-to-own, contingency-clause fights), broker and agent standard-of-care matters (TREC rule application, supervision questions, commission disputes), property-valuation context for damages, divorce, and partition cases, and disclosure or nondisclosure claims under the Tennessee Residential Property Condition Disclosure Act. Some matters need a designated expert with a written Rule 26 report; others benefit from earlier consulting work that helps the firm decide whether the theory is supportable before designation. Both engagement modes are available, and pre-designation work stays confidential under work product.",
      "Engagements are scoped at the front. The initial review covers the complaint, the brokerage or transaction file, and a short call to confirm scope. From there, written report, deposition support, and trial testimony follow as the matter requires. Hourly billing applies, with retainers sized to the case rather than a one-size-fits-all rate sheet. CV and prior testimony list are made available on request. The work avoids overreach: opinions are limited to what the record supports and what industry custom actually establishes — not advocacy disguised as analysis.",
    ],
    whenToCall:
      "Most retentions come at one of three points — pre-designation consulting before the theory is fixed, designation after a complaint is filed, or rebuttal of an opposing expert's report. Pre-designation work stays confidential under work product; each engagement is scoped at the front with hourly billing and retainers sized to the case. CV and prior testimony list are available on request.",
    primaryCtaLabel: "Request CV and consultation",
    childSlugs: [
      "title-expert-witness-tennessee",
      "real-estate-broker-standard-of-care-expert-witness-tennessee",
      "real-estate-contract-expert-witness-tennessee",
      "property-valuation-expert-witness-tennessee",
    ],
    isLitigation: false,
  },
  {
    id: "business-formation",
    slug: "business-formation",
    primaryKeyword: "Business Formation Attorney in Tennessee",
    title: "Business Formation Attorney in Tennessee | Nault Law",
    h1: "Business Formation Attorney in Tennessee",
    metaDescription:
      "Business formation attorney in Tennessee handling LLCs, PLLCs, S-Corp elections, operating agreements, and buy-sell agreements. Statewide. Call Nault Law.",
    intro:
      "Business formation attorney in Tennessee handling entity choice, articles, operating documents, and buy-sell terms for owners, partners, and licensed professionals across the state.",
    whatThisCovers:
      "Formation work covers entity selection, articles of organization or incorporation, operating agreements or bylaws, registered-agent setup, EIN coordination, and the early governance choices that shape liability and tax posture. The right structure depends on liability, tax election, ownership economics, and how the business will actually be run after launch.",
    narrative: [
      "Entity choice is the single biggest decision new owners make in their first year, and it is hard to undo cleanly later. The right structure depends on three things at once: how liability is meant to flow if something goes wrong, what tax election makes sense given expected income and growth, and how the owners actually plan to make decisions and split returns over time. A standard LLC works for most single-member businesses; a multi-member LLC or corporation makes sense when partners are involved or investors are expected; a PLLC is required for many licensed professions in Tennessee. The work is to match the structure to those facts before paperwork gets filed.",
      "Tennessee LLC filings are handled through the Secretary of State, with annual report fees that scale with member count and franchise-and-excise tax exposure for most operating entities under Tenn. Code Ann. § 67-4-2106 and § 67-4-2007 (subject to FONCE, obligated-member, and other exemptions). Beyond formation, the operating agreement is what actually governs how the business runs — capital, distributions, voting, transfer restrictions, and what happens at exit. Skipping that document or using a generic template is a common cause of expensive owner disputes later. Flat-fee or capped pricing applies to straightforward formations; complex multi-entity or investor-driven structures move to hourly billing with a sized retainer.",
    ],
    whenToCall:
      "Most engagements start at one of three points — pre-formation entity choice, partner-change events that require new operating documents, or buy-sell triggers like death, divorce, or sale of the business. Flat-fee or capped pricing is available for straightforward formations; more complex structures move to hourly with a sized retainer.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "llc-formation-attorney-tennessee",
      "operating-agreement-attorney-tennessee",
      "pllc-formation-attorney-tennessee",
      "s-corp-election-attorney-tennessee",
      "series-llc-attorney-tennessee",
      "buy-sell-agreement-attorney-tennessee",
      "corporation-formation-attorney-tennessee",
      "foreign-llc-qualification-attorney-tennessee",
      "llc-dissolution-attorney-tennessee",
      "partnership-agreement-attorney-tennessee",
      "nonprofit-formation-attorney-tennessee",
    ],
    isLitigation: false,
  },
  {
    id: "contract-services",
    slug: "contract-services",
    primaryKeyword: "Business Contract Attorney in Tennessee",
    title: "Business Contract Attorney in Tennessee | Nault Law",
    h1: "Business Contract Attorney in Tennessee",
    metaDescription:
      "Business contract attorney in Tennessee for vendor, independent-contractor, lease, real-estate, and construction agreements. Flat-fee review. Call Nault Law.",
    intro:
      "Business contract attorney in Tennessee for owners, agencies, contractors, and real-estate operators who need clean drafting, fast review, or smarter risk allocation before a deal closes.",
    whatThisCovers:
      "Most disputes are decided by what the contract said before anyone read it carefully. The work covers drafting from scratch, reviewing what the other side sent, and revising boilerplate that does not fit the actual deal. Flat-fee review is available for many standard contracts; rush turnaround is available when the deal is on a clock.",
    narrative: [
      "Contracts are the only law of the deal in Tennessee. Courts assume commercial parties are sophisticated and enforce one-sided terms as written, which means most disputes are decided by what the document said before anyone read it carefully. The work focuses on the items that drive disputes: scope and deliverables, payment terms, indemnification and liability caps, termination rights, dispute-resolution and forum, intellectual-property assignment, and confidentiality. The fastest way to spend money in court is to leave any of those vague. The fastest way to avoid that is a careful read before signing — which is what most of this engagement is.",
      "Flat-fee review is available for many standard contracts: vendor agreements, NDAs, independent-contractor terms, lease documents, master service agreements, and standard purchase agreements. Custom drafting from scratch is hourly with a sized retainer. Rush turnaround is available when the deal is on a clock. The output is a marked-up document plus a short call walking through the points that matter, the points that can be left alone, and what to push back on. The goal is to make the negotiation easier and the post-signing dispute less likely — not to redline for the sake of volume.",
    ],
    whenToCall:
      "Triggered by an actual document on your desk — a vendor contract, lease, independent-contractor agreement, asset purchase agreement, or letter of intent that needs review before signing. Engagement runs from a short scoping call through marked-up redlines and a follow-up call to walk through what to push back on.",
    primaryCtaLabel: "Send a contract for review",
    childSlugs: [
      "contract-review-attorney-tennessee",
      "independent-contractor-agreement-attorney-tennessee",
      "vendor-agreement-attorney-tennessee",
      "construction-contract-attorney-tennessee",
      "commercial-lease-attorney-tennessee",
      "nda-attorney-tennessee",
      "asset-purchase-agreement-attorney-tennessee",
    ],
    isLitigation: false,
  },
  {
    id: "real-estate-transactions",
    slug: "real-estate-transactions",
    primaryKeyword: "Real Estate Transactions Attorney in Tennessee",
    title: "Real Estate Transactions Attorney in Tennessee | Nault Law",
    h1: "Real Estate Transactions Attorney in Tennessee",
    metaDescription:
      "Real estate transactions attorney in Tennessee for purchase agreements, commercial leases, owner financing, and joint ventures. Call Nault Law.",
    intro:
      "Real estate transactions attorney in Tennessee for the deal-side work — purchase agreements, commercial leases, owner financing, land contracts, joint ventures, and contract assignments — done before a dispute starts.",
    whatThisCovers:
      "Transactions work is preventive: clean documents, clear allocation of risk, and the leverage points spelled out before money or property changes hands. The goal is a deal that stays a deal, not one that turns into a fight after closing. The work covers contract drafting and review only — not closing or settlement-agent services, which the office does not handle.",
    narrative: [
      "Real estate transactions work is preventive — clean documents and clear risk allocation before money or property changes hands. The cases that come back as litigation usually started as ambiguous purchase agreements, vague easement grants, missing seller-financing documents, or operating arrangements that the parties never quite finalized. The work is to write the documents tightly enough that the deal stays a deal: clear contingencies, concrete default mechanics, complete seller representations, and the structural choices that decide who carries which risk after closing. Whether the engagement is a single residential PSA or a multi-property joint venture, the focus is the same.",
      "This is contract and structuring work, not closing work. The office does not act as the closing or settlement agent, does not run title searches as a closing service, does not prepare deeds for closings, and does not disburse closing funds. Engagements coordinate with whatever closing professional the parties have chosen — title company, settlement attorney, or transactional broker. Flat-fee or capped pricing applies to standard documents (residential PSAs, FSBO purchase agreements, owner-financing packages, simple joint ventures). More complex deals move to hourly billing with a sized retainer.",
    ],
    whenToCall:
      "When a contract is on the desk, when a deal is being structured, or when a property change-of-hands needs documents drafted carefully. Earlier engagement creates more options and lower cost; flat-fee or capped pricing is available for many standard transactions.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "real-estate-purchase-agreement-attorney-tennessee",
      "owner-financing-attorney-tennessee",
      "land-contract-attorney-tennessee",
      "real-estate-joint-venture-attorney-tennessee",
      "assignment-of-contract-attorney-tennessee",
      "1031-exchange-attorney-tennessee",
      "commercial-lease-attorney-tennessee",
      "easement-attorney-tennessee",
      "title-defect-attorney-tennessee",
      "construction-contract-attorney-tennessee",
      "real-estate-attorney-gallatin-tn",
    ],
    isLitigation: false,
  },
  {
    id: "real-estate-disputes",
    slug: "real-estate-disputes",
    primaryKeyword: "Real Estate Disputes Attorney in Tennessee",
    title: "Real Estate Disputes Attorney in Tennessee | Nault Law",
    h1: "Real Estate Disputes Attorney in Tennessee",
    metaDescription:
      "Real estate disputes attorney in Tennessee for quiet title, easements, mechanics liens, fraud, and disclosure claims. Statewide advice. Call Nault Law.",
    intro:
      "Real estate disputes attorney in Tennessee handling quiet title, easements, title defects, fraud, mechanics liens, and property-line claims for owners, contractors, and investors statewide.",
    whatThisCovers:
      "Property disputes turn quickly from inconvenience to leverage problems. The work centers on documents, timeline, and the practical value of the property position — sometimes negotiated cleanup, sometimes formal dispute action to set the terms of resolution.",
    narrative: [
      "Property disputes have a distinctive escalation pattern. They start as small inconveniences — a title problem found at refinance, a fence built too close to the line, a contractor unpaid on a project — and become leverage problems quickly because property is illiquid, public-record-bound, and tied to financing or occupancy. Once a deadline passes, a closing fails, or an opposing party records something on the title, the options narrow. The work centers on early documentation, careful framing of the dispute (negotiated cleanup vs. formal action), and disciplined positioning. Some matters resolve through a focused demand letter; others need a quiet-title action, an injunction, or detailed pre-litigation discovery.",
      "Tennessee real-estate disputes are concentrated in the Chancery Courts of the trial counties listed above; non-litigation advisory work is statewide. Common matter types include quiet title, easement disputes, title-defect curative work, mechanics-lien filing and enforcement, real-estate fraud claims, and disclosure-based actions under the Tennessee Residential Property Condition Disclosure Act. Engagements range from limited-scope demand-letter work through full litigation; pricing is hourly with retainers sized to the matter, with capped pricing available for some pre-suit positioning work.",
    ],
    whenToCall:
      "When deadlines, closings, occupancy, or lender expectations are in play. Early assessment helps preserve evidence, clarify the contract posture, and decide whether pressure should be applied or contained.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "quiet-title-attorney-tennessee",
      "easement-attorney-tennessee",
      "title-defect-attorney-tennessee",
      "real-estate-fraud-attorney-tennessee",
      "mechanics-lien-attorney-tennessee",
      "property-line-dispute-attorney-tennessee",
      "real-estate-attorney-gallatin-tn",
      "specific-performance-attorney-tennessee",
      "earnest-money-dispute-attorney-tennessee",
      "failure-to-disclose-attorney-tennessee",
      "construction-defect-attorney-tennessee",
      "hoa-dispute-attorney-tennessee",
      "property-condition-disclosure-dispute-attorney-tennessee",
      "foreclosure-excess-proceeds-attorney-tennessee",
      "landlord-attorney-tennessee",
      "tenant-attorney-tennessee",
      "eviction-attorney-tennessee",
      "eviction-defense-attorney-tennessee",
      "mold-claim-attorney-tennessee",
      "eviction-attorney-sumner-county-tn",
    ],
    isLitigation: true,
  },
  {
    id: "business-disputes",
    slug: "business-disputes",
    primaryKeyword: "Business Disputes Attorney in Tennessee",
    title: "Business Disputes Attorney in Tennessee | Nault Law",
    h1: "Business Disputes Attorney in Tennessee",
    metaDescription:
      "Business disputes attorney in Tennessee for partnership breakups, member buyouts, non-competes, and fiduciary-duty claims. Call Nault Law.",
    intro:
      "Business disputes attorney in Tennessee for owners, members, and shareholders working through partnership breakups, member buyouts, non-compete enforcement, and fiduciary-duty claims.",
    whatThisCovers:
      "Owner conflicts are rarely just legal problems. They are control, information, and continuity problems. Resolution can come through restructuring, buyout, structured negotiation, or formal dispute action — depending on leverage and what the business needs to keep running. The work integrates governance documents, operating reality, and the practical economics of staying in business with the people on the other side.",
    narrative: [
      "Owner conflicts are not ordinary contract disputes. They are control, information, and continuity problems — who can decide what, who has access to the books, and whether the business itself can keep operating while the conflict resolves. Resolution can come through restructuring, buyout, structured negotiation, or formal dispute action; which path fits depends on leverage, the operating documents, and what the business needs to keep running. The most expensive mistake is acting unilaterally before the procedural posture is clear: moving accounts, withholding records, terminating an employee-owner, or making major decisions without the required authority. Once those acts become facts on the ground, undoing them is harder.",
      "Tennessee owner disputes are governed primarily by the operating or partnership agreement, with the Tennessee Revised LLC Act, Revised Uniform Partnership Act, or Business Corporation Act filling gaps. Books-and-records rights, member-meeting requirements, and judicial-dissolution thresholds all matter to leverage. Some matters resolve through a buyout structured under the operating agreement; others escalate to litigation or arbitration. Engagements are hourly with sized retainers; pre-suit positioning work and operating-document review can sometimes be capped.",
    ],
    whenToCall:
      "When records are being withheld, accounts are being moved, or major decisions are being made unilaterally. Early intervention can protect the company and your bargaining position before unilateral acts become facts on the ground. Hourly billing with retainers sized to the matter; some pre-suit positioning work can be capped.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "business-partnership-dispute-attorney-tennessee",
      "non-compete-attorney-tennessee",
      "llc-member-buyout-attorney-tennessee",
      "shareholder-dispute-attorney-tennessee",
      "breach-of-fiduciary-duty-attorney-tennessee",
      "tortious-interference-attorney-tennessee",
    ],
    isLitigation: true,
  },
];

export const bofuServices: BofuService[] = [
  ...expertWitnessChildren,
  ...businessFormationChildren,
  ...contractServicesChildren,
  ...realEstateTransactionsChildren,
  ...realEstateDisputesChildren,
  ...businessDisputesChildren,
];

export function getBofuHub(idOrSlug: string): BofuHub | undefined {
  return bofuHubs.find((hub) => hub.slug === idOrSlug || hub.id === idOrSlug);
}

export function getBofuService(slug: string): BofuService | undefined {
  return bofuServices.find((svc) => svc.slug === slug);
}

/**
 * Returns the children listed under a hub, in the order specified by the
 * hub's childSlugs array. A child can appear under multiple hubs (e.g.,
 * commercial-lease lives in contract-services and is also listed under
 * real-estate-transactions). The child's primary `hub` field stays as the
 * canonical breadcrumb-source; this function only controls listings.
 */
export function getBofuChildren(hubId: BofuHubId): BofuService[] {
  const hub = bofuHubs.find((h) => h.id === hubId);
  if (!hub) return [];
  return hub.childSlugs
    .map((slug) => bofuServices.find((s) => s.slug === slug))
    .filter((s): s is BofuService => Boolean(s));
}

export function allBofuSlugs(): string[] {
  return [...bofuHubs.map((h) => h.slug), ...bofuServices.map((s) => s.slug)];
}

/**
 * Bottom-of-funnel (BOFU) practice-area pages built using Edward Sturm's
 * Compact Keywords methodology. Short, intent-matched pages organized into
 * five hubs. URL paths live under /services/...; user-facing labels say
 * "Practice Areas". Coexists with the editorial /practice-areas/... routes —
 * the two trees serve different intents and do not replace each other.
 *
 * Briefing: claude_handoff/seo_bofu_pages/ (untracked, see README.md).
 */

export type BofuHubId =
  | "expert-witness"
  | "business-formation"
  | "contract-services"
  | "real-estate-disputes"
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
      "Tennessee real estate disputes often turn on industry custom, document analysis, and how the underlying business actually operates. Opinions stay grounded in the record and limited to what the documents and the transaction actually support.",
    whenToCall:
      "Most retentions come at one of three points — pre-designation consulting before the theory is fixed, designation after a complaint is filed, or rebuttal of an opposing expert's report.",
    primaryCtaLabel: "Request CV and conflicts check",
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
      "Formation work covers entity selection, articles of organization or incorporation, operating agreements or bylaws, registered-agent setup, EIN coordination, and the early governance choices that shape liability and tax posture.",
    whenToCall:
      "Most engagements start at one of three points — pre-formation entity choice, partner-change events that require new operating documents, or buy-sell triggers like death, divorce, or sale of the business.",
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
      "holding-company-formation-attorney-tennessee",
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
      "Most disputes are decided by what the contract said before anyone read it carefully. The work covers drafting from scratch, reviewing what the other side sent, and revising boilerplate that does not fit the actual deal.",
    whenToCall:
      "Triggered by an actual document on your desk — a vendor contract, lease, independent-contractor agreement, asset purchase agreement, or letter of intent that needs review before signing.",
    primaryCtaLabel: "Send a contract for review",
    childSlugs: [
      "contract-review-attorney-tennessee",
      "independent-contractor-agreement-attorney-tennessee",
      "vendor-agreement-attorney-tennessee",
      "real-estate-contract-attorney-tennessee",
      "construction-contract-attorney-tennessee",
      "commercial-lease-attorney-tennessee",
      "nda-attorney-tennessee",
      "master-service-agreement-attorney-tennessee",
      "asset-purchase-agreement-attorney-tennessee",
      "letter-of-intent-attorney-tennessee",
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
      "Owner conflicts are rarely just legal problems. They are control, information, and continuity problems. Resolution can come through restructuring, buyout, structured negotiation, or formal dispute action — depending on leverage and what the business needs to keep running.",
    whenToCall:
      "When records are being withheld, accounts are being moved, or major decisions are being made unilaterally. Early intervention can protect the company and your bargaining position before unilateral acts become facts on the ground.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "business-partnership-dispute-attorney-tennessee",
      "non-compete-attorney-tennessee",
      "eviction-attorney-sumner-county-tn",
      "llc-member-buyout-attorney-tennessee",
      "shareholder-dispute-attorney-tennessee",
      "breach-of-fiduciary-duty-attorney-tennessee",
      "tortious-interference-attorney-tennessee",
    ],
    isLitigation: true,
  },
];

export const bofuServices: BofuService[] = [
  {
    slug: "title-expert-witness-tennessee",
    hub: "expert-witness",
    primaryKeyword: "Title Expert Witness in Tennessee",
    title: "Title Expert Witness in Tennessee | Nault Law",
    h1: "Title Expert Witness in Tennessee",
    metaDescription:
      "Title expert witness in Tennessee for chain-of-title, defect, and conveyance disputes. CV and prior testimony available. Statewide. Call Nault Law.",
    intro:
      "Title expert witness in Tennessee from an attorney and managing broker with two decades of real-estate experience, available for designation, written reports, depositions, and trial testimony in chain-of-title and defect disputes.",
    sections: [
      {
        h2: "What this covers",
        paragraphs: [
          "Title disputes turn on chain-of-title analysis, missing or misindexed instruments, and the practical behavior of title companies and closing professionals. Title expert witness opinions stay narrow to what the documents and the underlying transaction actually support.",
          "Common case categories include chain-of-title and missing-instrument analysis, conveyance documents that do not match the underlying transaction, title-defect litigation among buyer, seller, and title company, and standard-of-care analysis for title work performed by other professionals.",
        ],
      },
      {
        h2: "When attorneys retain me",
        paragraphs: [
          "Most retentions come from one of three triggers: a quiet-title or title-defect case has been filed and the firm needs an expert before the dispositive motion deadline; an opposing expert has produced a report and rebuttal analysis is needed; or the case is pre-designation and the firm needs a confidential read on whether industry custom and document analysis support the theory.",
          "Pre-designation consulting work can stay confidential under work product. Designation, written reports, and testimony follow once the matter is a fit and conflicts are clear.",
        ],
      },
      {
        h2: "Qualifications",
        paragraphs: [
          "Tennessee bar since 2018; admitted to the U.S. District Court for the Middle District of Tennessee. Tennessee licensed real estate broker since 2012; managing broker since 2021. TREC course instructor license since 2020. Rule 31 listed mediator. Two decades of hands-on commercial leasing, brokerage, and property-management experience.",
        ],
      },
      {
        h2: "How retention works",
        paragraphs: [
          "Title expert witness retention is scoped at the front: review of the complaint, the key conveyance documents, and a short call to confirm fit and conflicts. From there, written report, deposition support, and trial testimony follow as the matter requires. Hourly billing with retainers sized to the case.",
        ],
      },
      {
        h2: "How to start",
        paragraphs: [
          "Send a brief case description, the parties involved, and the documents central to the title dispute. The office responds with a fit assessment and a conflict-screening result within one business day. Title expert witness CV and prior testimony list are available on request after conflict screening.",
        ],
      },
    ],
    audience: "Tennessee litigators in title-defect and quiet-title cases",
    serviceArea: "Statewide TN",
    isLitigation: false,
    primaryCtaLabel: "Request CV and conflicts check",
  },
];

export function getBofuHub(idOrSlug: string): BofuHub | undefined {
  return bofuHubs.find((hub) => hub.slug === idOrSlug || hub.id === idOrSlug);
}

export function getBofuService(slug: string): BofuService | undefined {
  return bofuServices.find((svc) => svc.slug === slug);
}

export function getBofuChildren(hubId: BofuHubId): BofuService[] {
  return bofuServices.filter((svc) => svc.hub === hubId);
}

export function allBofuSlugs(): string[] {
  return [...bofuHubs.map((h) => h.slug), ...bofuServices.map((s) => s.slug)];
}

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
    id: "real-estate-transactions",
    slug: "real-estate-transactions",
    primaryKeyword: "Real Estate Transactions Attorney in Tennessee",
    title: "Real Estate Transactions Attorney in Tennessee | Nault Law",
    h1: "Real Estate Transactions Attorney in Tennessee",
    metaDescription:
      "Real estate transactions attorney in Tennessee for purchase agreements, commercial leases, owner financing, land contracts, and joint ventures. Call Nault Law.",
    intro:
      "Real estate transactions attorney in Tennessee for the deal-side work — purchase agreements, commercial leases, owner financing, land contracts, joint ventures, and contract assignments — done before a dispute starts.",
    whatThisCovers:
      "Transactions work is preventive: clean documents, clear allocation of risk, and the leverage points spelled out before money or property changes hands. The goal is a deal that stays a deal, not one that turns into a fight after closing.",
    whenToCall:
      "When a contract is on the desk, when a deal is being structured, or when a property change-of-hands needs documents drafted carefully. Earlier engagement creates more options.",
    primaryCtaLabel: "Schedule a Consultation",
    childSlugs: [
      "real-estate-purchase-agreement-attorney-tennessee",
      "real-estate-contract-attorney-tennessee",
      "owner-financing-attorney-tennessee",
      "land-contract-attorney-tennessee",
      "real-estate-joint-venture-attorney-tennessee",
      "assignment-of-contract-attorney-tennessee",
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
      "Owner conflicts are rarely just legal problems. They are control, information, and continuity problems. Resolution can come through restructuring, buyout, structured negotiation, or formal dispute action — depending on leverage and what the business needs to keep running.",
    whenToCall:
      "When records are being withheld, accounts are being moved, or major decisions are being made unilaterally. Early intervention can protect the company and your bargaining position before unilateral acts become facts on the ground.",
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

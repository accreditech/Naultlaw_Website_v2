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
    title: "Real Estate Expert Witness in Tennessee",
    h1: "Real Estate Expert Witness in Tennessee",
    metaDescription:
      "Real estate expert witness in Tennessee for title, contract, valuation, and standard-of-care disputes. CV and prior testimony available. Call Nault Law.",
    intro:
      "I am a real estate expert witness in Tennessee for litigators on both sides — title, contract, valuation, brokerage standard of care, and property-management practice. What I bring is the combination most experts do not have: a practicing attorney who is also an active managing broker, giving opinions from inside the business rather than above it.",
    whatThisCovers:
      "Tennessee real-estate disputes usually turn on three things at once — industry custom, what the documents actually say, and how the underlying business really operates. My opinions stay tied to the record and limited to what the documents and the transaction support. Engagements run from confidential pre-designation consulting through Rule 26 disclosures, written reports, deposition support, and trial testimony.",
    narrative: [
      "The reason counsel retains me is the combination. I am a Tennessee-licensed lawyer who is also an active managing broker, a TREC course instructor, a Rule 31 mediator, and a property-management operator across two decades of commercial real estate — beginning in employee roles before my 2012 agent license. Most real-estate experts come from one of those tracks, not all of them. That matters because these cases rarely turn on pure law or pure brokerage; they turn on the seam between them — how the licensee was supposed to behave, what the documents should have said, and what a competent operator actually does in the field. The opinions reflect a working attorney-and-broker view, not retired or theoretical analysis.",
      "The cases come in a few shapes. Title and chain-of-title disputes — deed errors, missing instruments, conveyance defects. Real-estate contract litigation — purchase agreements, options, lease-to-own, contingency fights. [Broker and agent standard-of-care matters](/articles/early-mistakes-that-make-a-brokerage-complaint-worse) — TREC rule application, supervision, commission disputes. Property-valuation context for damages, divorce, and partition. And disclosure or nondisclosure claims under the Tennessee Residential Property Condition Disclosure Act. Some need a designated expert with a written Rule 26 report; others are better served by earlier consulting that helps you decide whether the theory is supportable before designation. Both are available, and the pre-designation work stays confidential under work product.",
      "I scope every engagement at the front — the complaint, the brokerage or transaction file, and a short call to confirm scope — and from there the report, deposition, and testimony follow as the matter needs, billed hourly against a case-sized retainer rather than a flat rate sheet. CV and prior-testimony list go out on request. One thing I hold to: the opinions stay limited to what the record supports and what industry custom actually establishes. I am not interested in advocacy dressed up as analysis — that is how an expert gets taken apart, and it does not help the client.",
    ],
    whenToCall:
      "Most retentions come at one of three moments — pre-designation consulting before the theory is fixed, designation after a complaint is filed, or rebuttal of an opposing expert. The pre-designation work stays confidential under work product, and every engagement is scoped at the front, hourly, with a retainer sized to the case. CV and prior-testimony list on request.",
    primaryCtaLabel: "Request CV and consultation",
    childSlugs: [
      "title-expert-witness-tennessee",
      "real-estate-broker-standard-of-care-expert-witness-tennessee",
      "real-estate-contract-expert-witness-tennessee",
      "property-valuation-expert-witness-tennessee",
      "realtor-dispute-expert-witness-tennessee",
      "trec-complaint-expert-witness-tennessee",
      "broker-opinion-of-value-expert-witness-tennessee",
      "agent-malpractice-expert-witness-tennessee",
      "landlord-tenant-expert-witness-tennessee",
      "property-management-expert-witness-tennessee",
      "real-estate-disclosure-expert-witness-tennessee",
      "real-estate-commission-dispute-expert-witness-tennessee",
      "consumer-real-estate-agent-dispute-expert-witness-tennessee",
    ],
    isLitigation: false,
  },
  {
    id: "business-formation",
    slug: "business-formation",
    primaryKeyword: "Business Formation Attorney in Tennessee",
    title: "Business Formation Attorney in Tennessee",
    h1: "Business Formation Attorney in Tennessee",
    metaDescription:
      "Business formation attorney in Tennessee handling LLCs, PLLCs, S-Corp elections, operating agreements, and buy-sell agreements. Statewide. Call Nault Law.",
    intro:
      "I handle business formation for Tennessee owners, partners, and licensed professionals — entity choice, the articles and operating documents, and the buy-sell terms that decide what happens when an owner leaves. The filing itself is routine. Getting the structure to match how you actually plan to run and split the business is the part worth paying for.",
    whatThisCovers:
      "This is the front end of a business: choosing the entity, filing the articles of organization or incorporation, drafting the operating agreement or bylaws, setting up the registered agent and EIN, and making the early governance choices that quietly set your liability and tax posture for years. I match the structure to the facts — how liability should flow, what tax election fits, and how the owners plan to decide things and share returns — rather than handing over a default and moving on.",
    narrative: [
      "Entity choice is the biggest decision owners make in the first year, and the hardest to undo cleanly later. It comes down to three things at once: how liability is supposed to flow if something goes wrong, what tax election makes sense for the income and growth you expect, and how the owners actually plan to make decisions and split returns over time. A standard LLC fits most single-owner businesses. A multi-member LLC or a corporation fits when partners or investors are in the picture. A PLLC is required for a number of licensed professions in Tennessee. The job is to line the structure up with those facts before anything gets filed — not after.",
      "Tennessee LLCs file through the Secretary of State, with annual report fees that scale with the number of members, and most operating entities face franchise-and-excise tax under Tenn. Code Ann. § 67-4-2106 and § 67-4-2007 — subject to FONCE, obligated-member, and other exemptions that may or may not fit a given company. What that means in practice is the state taxes the entity itself, on top of whatever the owners owe individually, and whether an exemption applies is worth checking early. That said, the document that actually governs the business day to day is the operating agreement: capital, distributions, voting, transfer restrictions, and what happens at exit. Skipping it, or using a generic template that does not match how the owners really operate, is one of the most common causes of expensive owner disputes — the kind that is far harder to fix than to prevent. Straightforward formations are flat-fee or capped; multi-entity or investor-driven structures move to hourly with a sized retainer.",
    ],
    whenToCall:
      "Most owners come to me at one of three points: deciding the entity before anything is formed, a partner change that calls for new operating documents, or a buy-sell trigger like a death, a divorce, or a sale. If you are not sure which of those describes your situation, the first call sorts it out — every business is built a little differently, and the right structure follows the facts.",
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
    title: "Business Contract Attorney in Tennessee",
    h1: "Business Contract Attorney in Tennessee",
    metaDescription:
      "Business contract attorney in Tennessee for vendor, independent-contractor, lease, real-estate, and construction agreements. Flat-fee review. Call Nault Law.",
    intro:
      "I draft and review business contracts for Tennessee owners, agencies, contractors, and real-estate operators — clean drafting when you need a document, a fast read when the other side sent one, and smarter risk allocation before you sign either way.",
    whatThisCovers:
      "Most disputes are decided by what the contract said before anyone read it carefully. The work is drafting from scratch, reviewing what the other side sent, and fixing boilerplate that does not match the actual deal. Many standard contracts get flat-fee review, with rush turnaround when a deal is on the clock.",
    narrative: [
      "In Tennessee, the contract is the only law of the deal. Courts assume commercial parties are sophisticated and enforce one-sided terms as written, which is exactly why most disputes are settled by language nobody studied closely at signing. So I focus on the clauses that actually drive fights: scope and deliverables, payment, indemnification and liability caps, termination, dispute-resolution and forum, IP assignment, and confidentiality. Leaving any of those vague is the fastest way to end up in court; [a careful read before signing](/articles/five-commercial-lease-terms-worth-slowing-down-for) is the cheapest way to avoid it, and that read is most of what this work is.",
      "Flat-fee review covers a lot of the standard documents — vendor agreements, NDAs, independent-contractor terms, leases, master service agreements, standard purchase agreements. Custom drafting from scratch is hourly with a sized retainer, and rush turnaround is available when the clock is running. What you get back is a marked-up document and a short call: the points that matter, the points that are fine, and the specific language worth pushing on. The aim is an easier negotiation and a less likely dispute later — not redlines for the sake of volume.",
    ],
    whenToCall:
      "This starts with an actual document on your desk — a vendor contract, a lease, a 1099 agreement, an asset purchase agreement, an LOI — that needs a read before you sign. It runs from a short scoping call through the marked-up redlines and a follow-up call on what to push back on.",
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
    title: "Real Estate Transactions Attorney in Tennessee",
    h1: "Real Estate Transactions Attorney in Tennessee",
    metaDescription:
      "Real estate transactions attorney in Tennessee for purchase agreements, commercial leases, owner financing, and joint ventures. Call Nault Law.",
    intro:
      "Real estate transactions work is the deal-side, preventive half of what I do — purchase agreements, commercial leases, owner financing, land contracts, joint ventures, and assignments, all drafted before there is anything to fight about. The goal is simple: a deal that stays a deal.",
    whatThisCovers:
      "Transactions work is preventive — clean documents, clear risk allocation, and the leverage points spelled out before money or property changes hands. This is contract and structuring work only, not closing or settlement-agent service, which my office does not handle.",
    narrative: [
      "[The litigation that comes back usually started life as a sloppy transaction](/articles/when-a-transaction-complaint-may-also-create-civil-exposure) — an ambiguous purchase agreement, a vague easement grant, missing seller-financing documents, an operating arrangement the parties never quite finished. So the preventive work is to write the documents tightly enough that the deal holds: clear contingencies, concrete default mechanics, complete seller representations, and the structural choices that decide who carries which risk after closing. Whether it is a single residential PSA or a multi-property joint venture, the discipline is the same.",
      "To be clear about the line: this is contract and structuring work, not closing work. My office does not act as the closing or settlement agent, does not run title searches as a closing service, does not prepare deeds for closings, and does not disburse closing funds. I coordinate with whatever closing professional the parties have chosen — a title company, a settlement attorney, a transactional broker. Standard documents — residential and FSBO purchase agreements, owner-financing packages, simple joint ventures — are flat-fee or capped; more complex deals move to hourly with a sized retainer.",
    ],
    whenToCall:
      "When a contract is on the desk, a deal is being structured, or a property is about to change hands and the documents need to be drafted carefully. Earlier is cheaper and leaves more options; many standard transactions run on flat-fee or capped pricing.",
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
    title: "Real Estate Disputes Attorney in Tennessee",
    h1: "Real Estate Disputes Attorney in Tennessee",
    metaDescription:
      "Real estate disputes attorney in Tennessee for quiet title, easements, mechanics liens, fraud, and disclosure claims. Statewide advice. Call Nault Law.",
    intro:
      "When a property problem turns into a leverage problem — a title cloud at refinance, a fence over the line, a contractor unpaid — that is real-estate-disputes work. I handle quiet title, easements, title defects, fraud, mechanics liens, and property-line claims for owners, contractors, and investors statewide.",
    whatThisCovers:
      "Property disputes move from inconvenience to leverage problem fast. The work centers on the documents, the timeline, and the real-world value of the property position — sometimes a negotiated cleanup, sometimes a more formal action to set the terms of resolution.",
    narrative: [
      "Property disputes escalate in a particular way. They start small — a title problem surfaced at refinance, a structure built too close to the boundary, an unpaid contractor — and turn into leverage problems quickly, because property is illiquid, bound to the public record, and tied to financing and occupancy. Once a deadline passes, a closing fails, or the other side records something against the title, the options start closing. So the work is early documentation, a clear read on whether this is a negotiated cleanup or a formal fight, and disciplined positioning. Some matters end with one well-aimed demand letter; others need a quiet-title action, an injunction, or real pre-litigation discovery.",
      "Tennessee real-estate disputes are concentrated in the Chancery Courts of the trial counties; the advisory work is statewide. The recurring matter types are quiet title, easement disputes, title-defect curative work, mechanics-lien filing and enforcement, real-estate fraud, and disclosure claims under the Tennessee Residential Property Condition Disclosure Act. Engagements run from limited-scope demand-letter work through full litigation, billed hourly with a retainer sized to the matter, and some pre-suit positioning can be capped.",
    ],
    whenToCall:
      "When a deadline, a closing, an occupancy issue, or a lender's expectations are in play and a property problem could cost you options. Early assessment preserves the evidence, gets clear on the contract posture, and decides whether the right move is to apply pressure or contain it.",
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
    title: "Business Disputes Attorney in Tennessee",
    h1: "Business Disputes Attorney in Tennessee",
    metaDescription:
      "Business disputes attorney in Tennessee for partnership breakups, member buyouts, non-competes, and fiduciary-duty claims. Call Nault Law.",
    intro:
      "Business disputes are what happen when owners, members, or shareholders stop being able to work together — partnership breakups, member buyouts, non-compete fights, fiduciary-duty claims. My aim is to protect your position and, where the business is worth keeping, the business itself.",
    whatThisCovers:
      "Owner conflicts are rarely just legal problems — they are control, information, and continuity problems. Resolution can come through restructuring, a buyout, structured negotiation, or formal action, depending on leverage and what the business needs to keep running. The work pulls together the governance documents, the operating reality, and the economics of staying in business with the people across the table.",
    narrative: [
      "Owner conflicts are not ordinary contract disputes. They are about who decides, [who can see the books](/articles/books-records-and-account-access-early-control-red-flags), and whether the company can keep operating while the fight resolves. Which path fits — restructuring, buyout, structured negotiation, or formal action — depends on leverage, the operating documents, and what the business actually needs. The most expensive mistake is acting unilaterally before the procedural posture is clear: moving accounts, withholding records, firing an employee-owner, or making major decisions without authority. Once those become facts on the ground, they are hard to undo.",
      "Tennessee owner disputes run on the operating or partnership agreement first, with the Tennessee Revised LLC Act, the Revised Uniform Partnership Act, or the Business Corporation Act filling the gaps — and books-and-records rights, member-meeting requirements, and judicial-dissolution thresholds all feed leverage. Some resolve through a buyout structured under the operating agreement; others go to litigation or arbitration. Engagements are hourly with sized retainers, though pre-suit positioning and operating-document review can sometimes be capped.",
    ],
    whenToCall:
      "When records are being withheld, accounts are being moved, or [major decisions are being made without you](/articles/owner-dispute-warning-signs-before-the-business-stalls). Getting in early protects both the company and your bargaining position before unilateral acts harden into facts. Hourly with a retainer sized to the matter; some pre-suit positioning can be capped.",
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

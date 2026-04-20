export type LocationContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  overview: string;
  keyIssues: string[];
  whyLocal: string;
};

export const locations: LocationContent[] = [
  {
    slug: "gallatin",
    title: "Gallatin",
    metaTitle: "Gallatin Business, Real Estate, and Dispute-Resolution Counsel",
    metaDescription:
      "Gallatin-based business, real estate, and dispute-resolution counsel for owners, investors, brokers, contractors, property managers, and real estate professionals.",
    overview:
      "Gallatin is the home base of Stephen C. Nault's practice and the center of many client relationships involving commercial leasing, ownership disputes, brokerage issues, and business-facing real estate conflict.",
    keyIssues: [
      "Commercial leasing and landlord-side business issues",
      "Operating agreements and owner disputes in closely held businesses",
      "TREC complaints, realtor disputes, and transaction-related real estate conflict",
    ],
    whyLocal:
      "In Gallatin, practical local knowledge matters because business owners, brokers, investors, and property stakeholders often work in overlapping circles. Advice should reflect both the legal posture and the relationship map around the dispute.",
  },
  {
    slug: "sumner-county",
    title: "Sumner County",
    metaTitle: "Sumner County Business and Real Estate Attorney",
    metaDescription:
      "Business, real estate, and dispute-resolution counsel for Sumner County owners, investors, brokers, contractors, property managers, and referral sources.",
    overview:
      "Sumner County is the primary service market for the practice. Clients here often need counsel who can move comfortably between business judgment, commercial real estate realities, and disciplined dispute positioning.",
    keyIssues: [
      "Commercial real estate leasing, defaults, and owner-side conflicts",
      "Broker and agent risk, TREC matters, and transaction fallout",
      "Closely held business contract disputes, governance friction, and strategic case assessment",
    ],
    whyLocal:
      "Sumner County growth creates opportunity, but it also creates more points of friction. Local operators benefit from practical counsel that understands timing, leverage, and the real business consequence of a dispute.",
  },
  {
    slug: "wilson-county",
    title: "Wilson County",
    metaTitle: "Wilson County Business and Real Estate Counsel",
    metaDescription:
      "Practical counsel for Wilson County business owners, investors, brokers, landlords, contractors, and property professionals handling disputes and risk-sensitive matters.",
    overview:
      "Wilson County matters often combine growth, real estate investment, owner-side decision pressure, and the need for commercially useful legal strategy.",
    keyIssues: [
      "Lease review, defaults, and property-operation issues",
      "Business contracts and owner disputes affecting growing companies",
      "Real estate transaction problems, brokerage matters, and dispute-resolution strategy",
    ],
    whyLocal:
      "For Wilson County businesses and property stakeholders, timing often matters as much as doctrine. The right legal approach should protect leverage without creating unnecessary drag on the business.",
  },
  {
    slug: "robertson-county",
    title: "Robertson County",
    metaTitle: "Robertson County Business and Real Estate Counsel",
    metaDescription:
      "Counsel for Robertson County businesses and real estate professionals facing contract issues, ownership disputes, leasing problems, and business-facing real estate conflicts.",
    overview:
      "Robertson County clients often want a steady, practical advisor who can give a clear answer, manage dispute pressure, and stay aligned with the business objective rather than the drama around it.",
    keyIssues: [
      "Business contract drafting, review, and dispute analysis",
      "Real estate and land-use-related conflict with business implications",
      "Owner disputes and investigate-and-advise consultations before escalation",
    ],
    whyLocal:
      "Many Robertson County matters still turn on local relationships, practical operating realities, and the value of a low-drama but firm legal posture.",
  },
  {
    slug: "trousdale-county",
    title: "Trousdale County",
    metaTitle: "Trousdale County Business and Real Estate Counsel",
    metaDescription:
      "Business, real estate, and dispute-resolution counsel for Trousdale County owners, operators, brokers, investors, contractors, and property stakeholders.",
    overview:
      "Trousdale County matters often require practical legal strategy that fits owner-managed businesses, real estate holdings, and disputes where timing and local relationships still matter.",
    keyIssues: [
      "Owner and contract disputes in closely held businesses",
      "Commercial real estate, leasing, and property-use conflicts",
      "Early strategic case assessment before formal arbitration or litigation",
    ],
    whyLocal:
      "For Trousdale County clients, practical judgment and responsiveness are often more valuable than generic litigation posturing. The goal is to resolve real business problems well.",
  },
  {
    slug: "davidson-county",
    title: "Davidson County",
    metaTitle: "Davidson County Business and Real Estate Counsel",
    metaDescription:
      "Business, real estate, and dispute-resolution counsel for Davidson County owners, investors, brokers, contractors, property managers, and referral sources who need practical, industry-informed guidance.",
    overview:
      "Davidson County is part of the practice's broader Middle Tennessee reach for business, real estate, and dispute-resolution matters. It is a strong fit for owners, brokers, investors, contractors, and property professionals who want practical counsel grounded in both legal strategy and real-world real estate context.",
    keyIssues: [
      "Commercial leasing, contract friction, and ownership disputes with business consequences",
      "Brokerage, transaction, and TREC-adjacent issues where industry judgment matters",
      "Strategic case assessment for business-facing real estate disputes before escalation",
    ],
    whyLocal:
      "Davidson County matters often move quickly and involve multiple stakeholders, tighter timelines, and more pressure around deals, documents, and business relationships. Practical, disciplined advice helps keep the matter aligned with the real objective rather than the noise around it.",
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

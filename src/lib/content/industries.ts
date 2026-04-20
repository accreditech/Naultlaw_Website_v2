export type IndustryContent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  audience: string[];
  work: string[];
  whyEarlyCounsel: string;
  localAngle: string;
};

export const industries: IndustryContent[] = [
  {
    slug: "counsel-for-brokers-and-agents",
    title: "Counsel for Brokers and Agents",
    metaTitle: "Counsel for Brokers and Agents in Sumner County and Surrounding Areas",
    metaDescription:
      "Counsel for brokers and agents on TREC complaints, realtor disputes, commission issues, transaction risk, and business-focused real estate problems.",
    summary:
      "Brokers and agents need counsel who understands licensing risk, disclosure pressure, transaction realities, and the business consequences of a dispute that lands in a file, a complaint response, or a referral relationship.",
    audience: [
      "Principal brokers and brokerage leaders",
      "Affiliate brokers and transaction-facing agents",
      "Real estate professionals dealing with TREC complaints, commission disputes, or deal-related conflict",
    ],
    work: [
      "TREC complaint responses and strategic written positioning",
      "Commission, disclosure, supervision, and transaction disputes",
      "Contract review, brokerage-risk counseling, and early case assessment before escalation",
    ],
    whyEarlyCounsel:
      "The first response matters. Early legal review helps a broker or agent protect the record, avoid unnecessary admissions, and think about both the complaint and any parallel civil exposure together.",
    localAngle:
      "The brokerage community in Gallatin, Sumner County, Wilson County, Robertson County, and Trousdale County is relationship driven. That makes disciplined, credible counsel even more valuable when a dispute starts affecting business reputation and referrals.",
  },
  {
    slug: "counsel-for-investors-and-landlords",
    title: "Counsel for Investors and Landlords",
    metaTitle: "Counsel for Investors and Landlords in Gallatin and Surrounding Counties",
    metaDescription:
      "Practical counsel for investors and landlords on commercial leasing, ownership disputes, contracts, real estate conflicts, and property-operating risk.",
    summary:
      "Investors and landlords often need legal advice that accounts for property economics, lease leverage, ownership structure, and the practical effect a dispute will have on occupancy, financing, or exit plans.",
    audience: [
      "Single-asset and portfolio investors",
      "Owners, landlords, and asset managers",
      "Clients evaluating acquisitions, lease disputes, ownership friction, or property conflict",
    ],
    work: [
      "Commercial lease review, defaults, amendments, guaranties, and transfer issues",
      "Purchase disputes, post-closing issues, and real estate conflicts",
      "Operating agreements, owner disputes, and business contract review tied to the property or ownership group",
    ],
    whyEarlyCounsel:
      "Early review can preserve leverage, improve document quality, and keep a real estate problem from becoming an avoidable business loss.",
    localAngle:
      "Owners across Sumner, Wilson, Robertson, and Trousdale Counties often manage property through local relationships and practical dealmaking. Counsel should reflect that reality rather than assume a one-size-fits-all playbook.",
  },
  {
    slug: "counsel-for-property-managers",
    title: "Counsel for Property Managers",
    metaTitle: "Counsel for Property Managers in Sumner County and Surrounding Areas",
    metaDescription:
      "Counsel for property managers facing leasing pressure, owner disputes, vendor conflict, contract issues, and business-sensitive real estate questions.",
    summary:
      "Property managers often sit at the center of leasing, owner expectations, vendor performance, and day-to-day conflict. Legal advice needs to fit that operational role and the need to preserve both the asset and the relationship map around it.",
    audience: [
      "Third-party property managers",
      "Asset-management teams and owner representatives",
      "Managers pulled into lease defaults, vendor disputes, or owner-side conflict",
    ],
    work: [
      "Management-agreement review and dispute support",
      "Lease-related notices, defaults, and property-operation conflict",
      "Vendor contracts, owner-side disputes, and practical escalation strategy",
    ],
    whyEarlyCounsel:
      "Managers often benefit from early counsel before positions harden because they are trying to preserve both operating control and client confidence at the same time.",
    localAngle:
      "Managers in Gallatin and the surrounding counties often work in close-knit markets where professionalism, timing, and careful escalation matter as much as the legal issue itself.",
  },
  {
    slug: "counsel-for-contractors",
    title: "Counsel for Contractors",
    metaTitle: "Counsel for Contractors in Gallatin and Middle Tennessee",
    metaDescription:
      "Counsel for contractors on project contracts, payment disputes, owner conflict, scope issues, and business-facing real estate problems.",
    summary:
      "Contractors need practical legal support that understands payment cycles, scope drift, owner expectations, documentation habits, and how project disputes affect the ongoing business.",
    audience: [
      "General contractors and specialty trades",
      "Contractors handling private commercial and investment-property work",
      "Operators who need better contract footing before disputes grow",
    ],
    work: [
      "Contract drafting, review, and payment-risk analysis",
      "Owner disputes, scope disagreements, and pre-litigation strategy",
      "Business agreements tied to project execution and real estate operations",
    ],
    whyEarlyCounsel:
      "The right review before a project, or at the first sign of payment trouble, can preserve evidence, improve leverage, and keep a business dispute from swallowing the job.",
    localAngle:
      "In growing counties around Gallatin, contractors often work through repeat-owner and referral networks. The dispute strategy needs to respect both the project and the future pipeline.",
  },
  {
    slug: "for-referral-sources",
    title: "For Referral Sources",
    metaTitle: "For Referral Sources",
    metaDescription:
      "A referral-friendly page for lawyers, brokers, lenders, CPAs, and other professionals seeking practical, real-estate-informed counsel for business-facing disputes.",
    summary:
      "This practice is structured to be a reliable resource for referral sources who need practical business and real-estate-informed counsel, early case assessment, or attorney-support work in appropriate matters.",
    audience: [
      "Lawyers seeking real-estate-industry-informed consultation or expert witness support",
      "Brokers, lenders, CPAs, insurance professionals, and other trusted advisors",
      "Professionals who want a careful niche referral rather than a broad general-practice handoff",
    ],
    work: [
      "Strategic case assessment and investigate-and-advise engagements",
      "TREC and brokerage-related consultation, expert witness review, and attorney support",
      "Commercial leasing, owner disputes, and real-estate-industry-informed business conflict analysis",
    ],
    whyEarlyCounsel:
      "Referral sources often reach out before a client is ready to litigate. That is exactly when a grounded early assessment can add value, sharpen the options, and keep the matter moving in the right direction.",
    localAngle:
      "Based in Gallatin and serving Sumner County and surrounding counties, the practice is especially suited to matters where local business relationships, brokerage realities, and commercial real estate context matter.",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

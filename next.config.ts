import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/resources/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
      {
        source: "/resources",
        destination: "/articles",
        permanent: true,
      },
      // Legal pages consolidated into a single /legal page with anchor
      // sections. 301 redirects preserve external links + SEO on the old URLs.
      {
        source: "/terms-of-use",
        destination: "/legal#site-terms",
        permanent: true,
      },
      {
        source: "/terms-disclaimer",
        destination: "/legal#site-terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal#privacy-policy",
        permanent: true,
      },
      {
        source: "/website-disclaimer",
        destination: "/legal#attorney-advertising",
        permanent: true,
      },
      {
        source: "/no-attorney-client-relationship",
        destination: "/legal#attorney-advertising",
        permanent: true,
      },

      // /services trim Phase 1 (seo/audit-and-trim-phase-1).
      // Merged BOFU pages: surviving content is folded into the destination
      // page; 301 preserves authority and avoids broken inbound links.
      // See claude_handoff/seo_audit_trim/AUDIT_REPORT.md for the merge
      // rationale and ACTIONS_TAKEN.md for what content moved where.
      {
        source: "/services/realtor-dispute-expert-witness-tennessee",
        destination:
          "/services/real-estate-broker-standard-of-care-expert-witness-tennessee",
        permanent: true,
      },
      {
        source: "/services/agent-malpractice-expert-witness-tennessee",
        destination:
          "/services/real-estate-broker-standard-of-care-expert-witness-tennessee",
        permanent: true,
      },
      {
        source:
          "/services/consumer-real-estate-agent-dispute-expert-witness-tennessee",
        destination:
          "/services/real-estate-broker-standard-of-care-expert-witness-tennessee",
        permanent: true,
      },
      {
        source: "/services/broker-opinion-of-value-expert-witness-tennessee",
        destination: "/services/property-valuation-expert-witness-tennessee",
        permanent: true,
      },
      {
        source:
          "/services/property-condition-disclosure-dispute-attorney-tennessee",
        destination: "/services/failure-to-disclose-attorney-tennessee",
        permanent: true,
      },

      // /services trim Phase 2 (seo/audit-and-trim-phase-2).
      // Applies the actual 28-keyword approved list inlined in the Phase 2
      // briefing; off-list pages are merged into approved-list pages or
      // deleted to the parent hub. See
      // claude_handoff/seo_audit_trim_phase_2/AUDIT_REPORT.md for rationale.

      // Phase 2 MERGEs — surviving content folded into the destination.
      {
        source: "/services/real-estate-purchase-agreement-attorney-tennessee",
        destination: "/services/real-estate-contract-attorney-tennessee",
        permanent: true,
      },
      {
        source: "/services/failure-to-disclose-attorney-tennessee",
        destination: "/services/real-estate-fraud-attorney-tennessee",
        permanent: true,
      },
      {
        source: "/services/llc-member-buyout-attorney-tennessee",
        destination: "/services/business-partnership-dispute-attorney-tennessee",
        permanent: true,
      },
      {
        source: "/services/shareholder-dispute-attorney-tennessee",
        destination: "/services/business-partnership-dispute-attorney-tennessee",
        permanent: true,
      },
      {
        source: "/services/breach-of-fiduciary-duty-attorney-tennessee",
        destination: "/services/business-partnership-dispute-attorney-tennessee",
        permanent: true,
      },

      // Phase 2 DELETEs — off-list, <350w, no merge target. Redirect to hub.
      // business-formation hub (5)
      {
        source: "/services/foreign-llc-qualification-attorney-tennessee",
        destination: "/services/business-formation",
        permanent: true,
      },
      {
        source: "/services/llc-dissolution-attorney-tennessee",
        destination: "/services/business-formation",
        permanent: true,
      },
      {
        source: "/services/partnership-agreement-attorney-tennessee",
        destination: "/services/business-formation",
        permanent: true,
      },
      {
        source: "/services/holding-company-formation-attorney-tennessee",
        destination: "/services/business-formation",
        permanent: true,
      },
      {
        source: "/services/nonprofit-formation-attorney-tennessee",
        destination: "/services/business-formation",
        permanent: true,
      },
      // contract-services hub (4)
      {
        source: "/services/nda-attorney-tennessee",
        destination: "/services/contract-services",
        permanent: true,
      },
      {
        source: "/services/master-service-agreement-attorney-tennessee",
        destination: "/services/contract-services",
        permanent: true,
      },
      {
        source: "/services/asset-purchase-agreement-attorney-tennessee",
        destination: "/services/contract-services",
        permanent: true,
      },
      {
        source: "/services/letter-of-intent-attorney-tennessee",
        destination: "/services/contract-services",
        permanent: true,
      },
      // real-estate-transactions hub (3)
      // NOTE: this hub is FLAGGED in FOR_REVIEW.md. If Steve later kills
      // the hub, repoint these three to /services/contract-services or
      // /services/real-estate-disputes per the migration plan.
      {
        source: "/services/land-contract-attorney-tennessee",
        destination: "/services/real-estate-transactions",
        permanent: true,
      },
      {
        source: "/services/real-estate-joint-venture-attorney-tennessee",
        destination: "/services/real-estate-transactions",
        permanent: true,
      },
      {
        source: "/services/assignment-of-contract-attorney-tennessee",
        destination: "/services/real-estate-transactions",
        permanent: true,
      },
      // real-estate-disputes hub (10)
      {
        source: "/services/specific-performance-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/earnest-money-dispute-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/construction-defect-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/hoa-dispute-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/foreclosure-excess-proceeds-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/landlord-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/tenant-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/eviction-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/eviction-defense-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      {
        source: "/services/mold-claim-attorney-tennessee",
        destination: "/services/real-estate-disputes",
        permanent: true,
      },
      // business-disputes hub (1)
      {
        source: "/services/tortious-interference-attorney-tennessee",
        destination: "/services/business-disputes",
        permanent: true,
      },

      // Phase 2 FOR_REVIEW resolution: kill the real-estate-transactions
      // hub (off-architecture; owner-financing migrated to contract-services).
      // See claude_handoff/seo_audit_trim_phase_2/FOR_REVIEW_RESOLVED.md.
      {
        source: "/services/real-estate-transactions",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

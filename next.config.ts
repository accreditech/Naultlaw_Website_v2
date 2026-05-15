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
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Canonical host consolidation: 308 (permanent) redirect the bare apex
      // naultlaw.com -> www.naultlaw.com for every path. `www` is canonical
      // (Knowledge Panel link + ~95% of organic homepage clicks already land
      // there). The host condition only matches the apex, so requests already
      // on www are untouched and there is no redirect loop. Next.js emits 308
      // for `permanent: true`, which Google treats equivalently to a 301 for
      // signal consolidation. If the apex->www redirect is also configured at
      // the Vercel domain level, that edge redirect fires first and this rule
      // is a harmless backstop.
      {
        source: "/:path*",
        has: [{ type: "host", value: "naultlaw.com" }],
        destination: "https://www.naultlaw.com/:path*",
        permanent: true,
      },
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
      // BOFU page consolidated into the more search-aligned PSA page.
      // /real-estate-contract-attorney-tennessee was cannibalizing
      // /real-estate-purchase-agreement-attorney-tennessee per the SEO audit;
      // 301 preserves any external link equity while routing visitors to
      // the canonical page.
      {
        source: "/services/real-estate-contract-attorney-tennessee",
        destination: "/services/real-estate-purchase-agreement-attorney-tennessee",
        permanent: true,
      },
      // Borderline-thin BOFU pages removed per Steve's 2026-05-10 audit
      // review. Each redirects to the most contextually relevant surviving
      // page so external link equity routes correctly.
      {
        source: "/services/master-service-agreement-attorney-tennessee",
        destination: "/services/contract-services",
        permanent: true,
      },
      {
        source: "/services/letter-of-intent-attorney-tennessee",
        destination: "/services/asset-purchase-agreement-attorney-tennessee",
        permanent: true,
      },
      {
        source: "/services/holding-company-formation-attorney-tennessee",
        destination: "/services/llc-formation-attorney-tennessee",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

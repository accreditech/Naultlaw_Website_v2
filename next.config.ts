import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (≈25% smaller than WebP), WebP as fallback. Directly
    // reduces the homepage LCP image (a full-bleed hero) and every other
    // next/image asset. Encodes on demand and is cached at the Vercel edge.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every `quality` used by next/image to be allowlisted
    // (it 400s otherwise). 75 is the default; 60 is used for the gradient-
    // overlaid LCP hero where the reduction is invisible.
    qualities: [60, 75],
  },
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

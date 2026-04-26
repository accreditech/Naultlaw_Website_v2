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
    ];
  },
};

export default nextConfig;

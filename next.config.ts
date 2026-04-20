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
    ];
  },
};

export default nextConfig;

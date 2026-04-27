import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return path === "/" ? base : `${base}${path}`;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
}: CreateMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  // Apply the brand prefix to og:/twitter: titles so social cards match the
  // browser-tab title pattern ("NaultLaw - Home" instead of just "Home").
  const socialTitle = `NaultLaw - ${title}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: siteConfig.socialShareImageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [absoluteUrl("/twitter-image")],
    },
  };
}

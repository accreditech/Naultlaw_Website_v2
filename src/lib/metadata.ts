import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /**
   * Robots directive for the page. Defaults to fully indexable.
   *
   * Use { index: false, follow: true } on pages that exist for compliance
   * or housekeeping rather than ranking — they should not consume index
   * budget but should still pass link equity through to other pages.
   */
  robots?: {
    index: boolean;
    follow: boolean;
  };
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
  robots,
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
    ...(robots ? { robots } : {}),
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image.jpg"),
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
      images: [absoluteUrl("/twitter-image.jpg")],
    },
  };
}

import { type MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { practiceAreas } from "@/lib/content/practice-areas";
import { resources } from "@/lib/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/practice-areas`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/expert-witness`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/articles`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/website-disclaimer`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${base}/no-attorney-client-relationship`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${base}/terms-of-use`, priority: 0.3, changeFrequency: "yearly" },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const articleRoutes: MetadataRoute.Sitemap = resources.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...articleRoutes];
}

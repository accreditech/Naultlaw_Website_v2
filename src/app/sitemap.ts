import { type MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { bofuHubs, bofuServices } from "@/lib/content/bofu-services";
import { practiceAreas } from "@/lib/content/practice-areas";
import { resources } from "@/lib/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/practice-areas`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/expert-witness`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/articles`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/contact`, priority: 0.9, changeFrequency: "monthly" },
    // /legal is intentionally omitted from the sitemap — it carries a
    // noindex directive (see src/app/legal/page.tsx). Telling Google to
    // crawl a page we have asked it not to index is a mixed signal that
    // wastes crawl budget.
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const bofuHubRoutes: MetadataRoute.Sitemap = bofuHubs.map((hub) => ({
    url: `${base}/services/${hub.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const bofuServiceRoutes: MetadataRoute.Sitemap = bofuServices.map((svc) => ({
    url: `${base}/services/${svc.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  const articleRoutes: MetadataRoute.Sitemap = resources.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticRoutes,
    ...practiceAreaRoutes,
    ...bofuHubRoutes,
    ...bofuServiceRoutes,
    ...articleRoutes,
  ];
}

// Single source of truth for the URL list used by both
// `src/app/sitemap.ts` (XML output for crawlers) and
// `src/app/api/indexnow/route.ts` (POST body for IndexNow submission).
//
// Each entry's `lastModified` is the most recent commit timestamp across
// every file that contributes to that URL's rendered content. Computed
// against the manifest at `src/lib/generated/content-mtimes.json` (which
// `scripts/generate-content-mtimes.mjs` rebuilds each prebuild).

import { bofuHubs, bofuServices } from "@/lib/content/bofu-services";
import { practiceAreas } from "@/lib/content/practice-areas";
import { resources } from "@/lib/content/resources";
import { siteConfig } from "@/lib/site-config";
import mtimes from "@/lib/generated/content-mtimes.json";

const MTIMES = mtimes as Record<string, string>;

/** Most recent ISO timestamp across the supplied file list, or undefined
    if no path is known. Used to derive an entry's <lastmod>. */
function latestMtime(paths: string[]): string | undefined {
  let latest: string | undefined;
  for (const p of paths) {
    const t = MTIMES[p];
    if (!t) continue;
    if (!latest || t > latest) latest = t;
  }
  return latest;
}

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

/** Build the canonical sitemap entry list. Pure function; deterministic
    given the manifest + content arrays. */
export function buildSitemapEntries(): SitemapEntry[] {
  const base = siteConfig.url.replace(/\/$/, "");

  const toDate = (iso: string | undefined): Date | undefined =>
    iso ? new Date(iso) : undefined;

  // Hub content for /services/<slug> lives in a per-hub children file
  // PLUS the bofu-services.ts aggregator. The dynamic-route template is
  // shared by all /services/<slug> URLs.
  const bofuChildrenPathByHub: Record<string, string> = {
    "business-disputes":
      "src/lib/content/bofu/business-disputes-children.ts",
    "business-formation":
      "src/lib/content/bofu/business-formation-children.ts",
    "contract-services":
      "src/lib/content/bofu/contract-services-children.ts",
    "expert-witness": "src/lib/content/bofu/expert-witness-children.ts",
    "real-estate-disputes":
      "src/lib/content/bofu/real-estate-disputes-children.ts",
    "real-estate-transactions":
      "src/lib/content/bofu/real-estate-transactions-children.ts",
  };

  const staticRoutes: SitemapEntry[] = [
    {
      url: `${base}/`,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: toDate(latestMtime(["src/app/page.tsx"])),
    },
    {
      url: `${base}/practice-areas`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: toDate(latestMtime(["src/app/practice-areas/page.tsx"])),
    },
    {
      url: `${base}/expert-witness`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: toDate(latestMtime(["src/app/expert-witness/page.tsx"])),
    },
    {
      url: `${base}/services`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: toDate(latestMtime(["src/app/services/page.tsx"])),
    },
    {
      url: `${base}/about`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: toDate(latestMtime(["src/app/about/page.tsx"])),
    },
    {
      url: `${base}/articles`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: toDate(latestMtime(["src/app/articles/page.tsx"])),
    },
    {
      url: `${base}/contact`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: toDate(latestMtime(["src/app/contact/page.tsx"])),
    },
    // /legal is intentionally omitted from the sitemap — it carries a
    // noindex directive (see src/app/legal/page.tsx). Telling Google to
    // crawl a page we have asked it not to index is a mixed signal that
    // wastes crawl budget.
  ];

  const practiceAreaRoutes: SitemapEntry[] = practiceAreas.map((area) => ({
    url: `${base}/practice-areas/${area.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: toDate(
      latestMtime([
        "src/app/practice-areas/[slug]/page.tsx",
        "src/lib/content/practice-areas.ts",
      ]),
    ),
  }));

  const bofuHubRoutes: SitemapEntry[] = bofuHubs.map((hub) => ({
    url: `${base}/services/${hub.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: toDate(
      latestMtime(
        [
          "src/app/services/[slug]/page.tsx",
          "src/lib/content/bofu-services.ts",
          bofuChildrenPathByHub[hub.slug],
        ].filter((p): p is string => Boolean(p)),
      ),
    ),
  }));

  const bofuServiceRoutes: SitemapEntry[] = bofuServices.map((svc) => ({
    url: `${base}/services/${svc.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: toDate(
      latestMtime(
        [
          "src/app/services/[slug]/page.tsx",
          "src/lib/content/bofu-services.ts",
          bofuChildrenPathByHub[svc.hub],
        ].filter((p): p is string => Boolean(p)),
      ),
    ),
  }));

  const articleRoutes: SitemapEntry[] = resources.map((article) => ({
    url: `${base}/articles/${article.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: toDate(
      latestMtime([
        "src/app/articles/[slug]/page.tsx",
        "src/lib/content/resources.ts",
      ]),
    ),
  }));

  return [
    ...staticRoutes,
    ...practiceAreaRoutes,
    ...bofuHubRoutes,
    ...bofuServiceRoutes,
    ...articleRoutes,
  ];
}

/** Absolute URLs for IndexNow submission. Order matches the sitemap. */
export function buildSitemapUrls(): string[] {
  return buildSitemapEntries().map((e) => e.url);
}

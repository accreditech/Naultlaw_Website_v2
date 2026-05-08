/**
 * Cross-tree linking map between editorial /practice-areas/* pages and the
 * BOFU /services/* pages. Used to build hub-and-spoke internal links so that
 * the deeper /services/* pages get crawled and indexed instead of sitting in
 * Search Console as orphans.
 *
 * Three responsibilities:
 *   1. practiceAreaServiceLinks — for each /practice-areas/* slug, the list
 *      of /services/* pages that fit beneath it (with anchor text). Drives
 *      the "Specific services in this area" block on practice-area pages.
 *   2. serviceParentPracticeArea — for each /services/* slug, the canonical
 *      /practice-areas/* parent (or null to skip). Drives the in-body
 *      "broader practice area" sentence on service pages.
 *   3. getRelatedServices(slug) — sibling service slugs within the same
 *      practice-area cluster (or hub if no practice-area assigned). Drives
 *      the "Related services" block at the bottom of service pages.
 *
 * Anchor text is intentionally descriptive ("Tennessee commercial lease
 * attorney") rather than generic ("learn more"); naturalness matters more
 * than keyword density. Per-page link counts capped at 7 to avoid the
 * appearance of link stuffing.
 */

import {
  bofuHubs,
  bofuServices,
  type BofuHubId,
} from "@/lib/content/bofu-services";

export type ServiceLink = {
  slug: string;
  anchor: string;
};

export const practiceAreaServiceLinks: Record<string, ServiceLink[]> = {
  "commercial-leasing": [
    {
      slug: "commercial-lease-attorney-tennessee",
      anchor: "Tennessee commercial lease attorney",
    },
    {
      slug: "landlord-attorney-tennessee",
      anchor: "Tennessee landlord attorney",
    },
    {
      slug: "tenant-attorney-tennessee",
      anchor: "Tennessee commercial tenant attorney",
    },
    {
      slug: "eviction-attorney-tennessee",
      anchor: "Tennessee eviction attorney",
    },
    {
      slug: "eviction-defense-attorney-tennessee",
      anchor: "Tennessee eviction defense attorney",
    },
  ],
  "trec-defense-and-realtor-complaints": [
    {
      slug: "trec-complaint-expert-witness-tennessee",
      anchor: "TREC complaint expert witness in Tennessee",
    },
    {
      slug: "realtor-dispute-expert-witness-tennessee",
      anchor: "Realtor dispute expert witness",
    },
    {
      slug: "real-estate-broker-standard-of-care-expert-witness-tennessee",
      anchor: "Broker standard-of-care expert witness",
    },
    {
      slug: "agent-malpractice-expert-witness-tennessee",
      anchor: "Agent malpractice expert witness",
    },
    {
      slug: "real-estate-disclosure-expert-witness-tennessee",
      anchor: "Real estate disclosure expert witness",
    },
    {
      slug: "consumer-real-estate-agent-dispute-expert-witness-tennessee",
      anchor: "Consumer-vs-agent dispute expert witness",
    },
  ],
  "operating-agreements-and-owner-disputes": [
    {
      slug: "operating-agreement-attorney-tennessee",
      anchor: "Tennessee operating agreement attorney",
    },
    {
      slug: "llc-member-buyout-attorney-tennessee",
      anchor: "LLC member buyout attorney",
    },
    {
      slug: "business-partnership-dispute-attorney-tennessee",
      anchor: "Business partnership dispute attorney",
    },
    {
      slug: "shareholder-dispute-attorney-tennessee",
      anchor: "Shareholder dispute attorney",
    },
    {
      slug: "breach-of-fiduciary-duty-attorney-tennessee",
      anchor: "Breach of fiduciary duty attorney",
    },
    {
      slug: "llc-dissolution-attorney-tennessee",
      anchor: "LLC dissolution attorney",
    },
  ],
  "real-estate-disputes": [
    {
      slug: "quiet-title-attorney-tennessee",
      anchor: "Tennessee quiet title attorney",
    },
    {
      slug: "easement-attorney-tennessee",
      anchor: "Tennessee easement attorney",
    },
    {
      slug: "property-line-dispute-attorney-tennessee",
      anchor: "Property line dispute attorney",
    },
    {
      slug: "failure-to-disclose-attorney-tennessee",
      anchor: "Failure-to-disclose attorney",
    },
    {
      slug: "real-estate-fraud-attorney-tennessee",
      anchor: "Real estate fraud attorney",
    },
    {
      slug: "specific-performance-attorney-tennessee",
      anchor: "Specific performance attorney",
    },
    {
      slug: "earnest-money-dispute-attorney-tennessee",
      anchor: "Earnest money dispute attorney",
    },
  ],
  "business-contract-drafting-and-review": [
    {
      slug: "contract-review-attorney-tennessee",
      anchor: "Tennessee contract review attorney",
    },
    {
      slug: "real-estate-contract-attorney-tennessee",
      anchor: "Real estate contract attorney",
    },
    {
      slug: "non-compete-attorney-tennessee",
      anchor: "Non-compete attorney",
    },
    {
      slug: "nda-attorney-tennessee",
      anchor: "NDA attorney",
    },
    {
      slug: "vendor-agreement-attorney-tennessee",
      anchor: "Vendor agreement attorney",
    },
    {
      slug: "construction-contract-attorney-tennessee",
      anchor: "Construction contract attorney",
    },
    {
      slug: "master-service-agreement-attorney-tennessee",
      anchor: "Master service agreement attorney",
    },
  ],
  "strategic-case-assessment": [
    {
      slug: "real-estate-broker-standard-of-care-expert-witness-tennessee",
      anchor: "Broker standard-of-care expert witness",
    },
    {
      slug: "real-estate-contract-expert-witness-tennessee",
      anchor: "Real estate contract expert witness",
    },
  ],
  "arbitration-and-dispute-resolution": [
    {
      slug: "business-partnership-dispute-attorney-tennessee",
      anchor: "Business partnership dispute attorney",
    },
    {
      slug: "shareholder-dispute-attorney-tennessee",
      anchor: "Shareholder dispute attorney",
    },
    {
      slug: "hoa-dispute-attorney-tennessee",
      anchor: "HOA dispute attorney",
    },
  ],
  "expert-witness-real-estate-and-brokerage-matters": [
    {
      slug: "title-expert-witness-tennessee",
      anchor: "Title expert witness in Tennessee",
    },
    {
      slug: "real-estate-broker-standard-of-care-expert-witness-tennessee",
      anchor: "Broker standard-of-care expert witness",
    },
    {
      slug: "real-estate-contract-expert-witness-tennessee",
      anchor: "Real estate contract expert witness",
    },
    {
      slug: "property-valuation-expert-witness-tennessee",
      anchor: "Property valuation expert witness",
    },
    {
      slug: "realtor-dispute-expert-witness-tennessee",
      anchor: "Realtor dispute expert witness",
    },
    {
      slug: "trec-complaint-expert-witness-tennessee",
      anchor: "TREC complaint expert witness",
    },
    {
      slug: "agent-malpractice-expert-witness-tennessee",
      anchor: "Agent malpractice expert witness",
    },
  ],
};

/**
 * Canonical /practice-areas/* parent for each /services/* slug. Some services
 * fit naturally under more than one practice area; only one is listed here so
 * the in-body "broader practice area" sentence is unambiguous. A service with
 * no obvious editorial parent is omitted (the page just won't render the
 * sentence).
 */
export const serviceParentPracticeArea: Record<string, string> = {
  // Commercial leasing — landlord/tenant/eviction matters
  "commercial-lease-attorney-tennessee": "commercial-leasing",
  "landlord-attorney-tennessee": "commercial-leasing",
  "tenant-attorney-tennessee": "commercial-leasing",
  "eviction-attorney-tennessee": "commercial-leasing",
  "eviction-defense-attorney-tennessee": "commercial-leasing",
  "eviction-attorney-sumner-county-tn": "commercial-leasing",

  // Real estate disputes
  "quiet-title-attorney-tennessee": "real-estate-disputes",
  "easement-attorney-tennessee": "real-estate-disputes",
  "title-defect-attorney-tennessee": "real-estate-disputes",
  "real-estate-fraud-attorney-tennessee": "real-estate-disputes",
  "mechanics-lien-attorney-tennessee": "real-estate-disputes",
  "property-line-dispute-attorney-tennessee": "real-estate-disputes",
  "real-estate-attorney-gallatin-tn": "real-estate-disputes",
  "specific-performance-attorney-tennessee": "real-estate-disputes",
  "earnest-money-dispute-attorney-tennessee": "real-estate-disputes",
  "failure-to-disclose-attorney-tennessee": "real-estate-disputes",
  "construction-defect-attorney-tennessee": "real-estate-disputes",
  "hoa-dispute-attorney-tennessee": "real-estate-disputes",
  "property-condition-disclosure-dispute-attorney-tennessee":
    "real-estate-disputes",
  "foreclosure-excess-proceeds-attorney-tennessee": "real-estate-disputes",
  "mold-claim-attorney-tennessee": "real-estate-disputes",

  // Business contract drafting and review
  "contract-review-attorney-tennessee": "business-contract-drafting-and-review",
  "independent-contractor-agreement-attorney-tennessee":
    "business-contract-drafting-and-review",
  "vendor-agreement-attorney-tennessee":
    "business-contract-drafting-and-review",
  "real-estate-contract-attorney-tennessee":
    "business-contract-drafting-and-review",
  "construction-contract-attorney-tennessee":
    "business-contract-drafting-and-review",
  "nda-attorney-tennessee": "business-contract-drafting-and-review",
  "master-service-agreement-attorney-tennessee":
    "business-contract-drafting-and-review",
  "asset-purchase-agreement-attorney-tennessee":
    "business-contract-drafting-and-review",
  "letter-of-intent-attorney-tennessee":
    "business-contract-drafting-and-review",
  "real-estate-purchase-agreement-attorney-tennessee":
    "business-contract-drafting-and-review",
  "owner-financing-attorney-tennessee":
    "business-contract-drafting-and-review",
  "land-contract-attorney-tennessee": "business-contract-drafting-and-review",
  "real-estate-joint-venture-attorney-tennessee":
    "business-contract-drafting-and-review",
  "assignment-of-contract-attorney-tennessee":
    "business-contract-drafting-and-review",
  "non-compete-attorney-tennessee": "business-contract-drafting-and-review",

  // Operating agreements and owner disputes
  "operating-agreement-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "llc-formation-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "pllc-formation-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "s-corp-election-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "series-llc-attorney-tennessee": "operating-agreements-and-owner-disputes",
  "buy-sell-agreement-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "corporation-formation-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "foreign-llc-qualification-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "llc-dissolution-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "partnership-agreement-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "holding-company-formation-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "nonprofit-formation-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "business-partnership-dispute-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "llc-member-buyout-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "shareholder-dispute-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "breach-of-fiduciary-duty-attorney-tennessee":
    "operating-agreements-and-owner-disputes",
  "tortious-interference-attorney-tennessee":
    "operating-agreements-and-owner-disputes",

  // Expert witness — every expert-witness service rolls up here
  "title-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "real-estate-broker-standard-of-care-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "real-estate-contract-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "property-valuation-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "realtor-dispute-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "trec-complaint-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "broker-opinion-of-value-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "agent-malpractice-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "landlord-tenant-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "property-management-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "real-estate-disclosure-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "real-estate-commission-dispute-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
  "consumer-real-estate-agent-dispute-expert-witness-tennessee":
    "expert-witness-real-estate-and-brokerage-matters",
};

/**
 * Short, anchor-friendly label for a /services/* slug. Falls back to a
 * mechanical de-slug if the slug is not catalogued in
 * practiceAreaServiceLinks. Used for cross-link blocks on service pages.
 */
function deriveAnchorText(slug: string): string {
  for (const links of Object.values(practiceAreaServiceLinks)) {
    const match = links.find((l) => l.slug === slug);
    if (match) return match.anchor;
  }
  const svc = bofuServices.find((s) => s.slug === slug);
  if (svc) return svc.h1;
  return slug
    .replace(/-/g, " ")
    .replace(/\battorney tennessee\b/i, "attorney")
    .replace(/\btennessee\b/i, "Tennessee")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Returns up to `max` related /services/* slugs for a given service, in this
 * priority order:
 *   1. siblings within the same practice-area cluster (Pattern 1 mapping)
 *   2. siblings within the same BOFU hub
 * Self is always excluded; duplicates removed.
 */
export function getRelatedServices(slug: string, max = 3): ServiceLink[] {
  const out: ServiceLink[] = [];
  const seen = new Set<string>([slug]);

  const parentPa = serviceParentPracticeArea[slug];
  if (parentPa) {
    const cluster = practiceAreaServiceLinks[parentPa] ?? [];
    for (const link of cluster) {
      if (seen.has(link.slug)) continue;
      out.push(link);
      seen.add(link.slug);
      if (out.length >= max) return out;
    }
  }

  const svc = bofuServices.find((s) => s.slug === slug);
  if (svc) {
    const hub = bofuHubs.find((h) => h.id === svc.hub);
    if (hub) {
      for (const childSlug of hub.childSlugs) {
        if (seen.has(childSlug)) continue;
        out.push({ slug: childSlug, anchor: deriveAnchorText(childSlug) });
        seen.add(childSlug);
        if (out.length >= max) return out;
      }
    }
  }

  return out;
}

/** All slugs known to bofuServices, used by service pages for sanity checks. */
export function isKnownServiceSlug(slug: string): boolean {
  return bofuServices.some((s) => s.slug === slug);
}

export type { BofuHubId };

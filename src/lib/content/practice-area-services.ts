/**
 * Maps each /services/<slug> BOFU page to its canonical /practice-areas/<slug>
 * editorial parent and computes sibling-service links for cross-linking.
 *
 * Why this exists: PR #16 already added `practiceAreas[].relatedServices` for
 * the practice-area → services direction (drives the "Focused practice pages"
 * block on /practice-areas/* and /articles/* pages). This module handles the
 * other two link directions that are still missing on master:
 *
 *   • Pattern 2 — service-page header sentence linking back up to the
 *     editorial /practice-areas/<slug> parent. Drives parent-→-child SEO
 *     hierarchy signals.
 *   • Pattern 3 — sibling /services/<slug> links shown at the bottom of each
 *     service page body. Drives lateral cross-linking inside a topical
 *     cluster.
 *
 * The parent map below is the single source of truth for both directions.
 * Sibling resolution prefers practice-area cluster members (taken from
 * practiceAreas[].relatedServices) and falls back to BOFU hub siblings when
 * the cluster cannot fill the slot.
 */

import {
  bofuHubs,
  bofuServices,
} from "@/lib/content/bofu-services";
import { practiceAreas } from "@/lib/content/practice-areas";

export type ServiceLink = {
  slug: string;
  anchor: string;
};

/**
 * Canonical /practice-areas/<slug> parent for each /services/<slug> page.
 * A service that has no obvious editorial parent is intentionally omitted —
 * the in-body parent sentence simply will not render for those.
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
 * Compact, anchor-friendly label for a /services/<slug>. Falls back to a
 * mechanical de-slug if the slug is not catalogued anywhere.
 */
function deriveAnchorText(slug: string): string {
  const svc = bofuServices.find((s) => s.slug === slug);
  if (svc) return svc.h1;
  return slug
    .replace(/-/g, " ")
    .replace(/\battorney tennessee\b/i, "attorney")
    .replace(/\btennessee\b/i, "Tennessee")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Returns up to `max` related /services/<slug> links for cross-linking on a
 * service page. Resolution order:
 *   1. siblings from the parent practice area's `relatedServices` list
 *   2. siblings from the same BOFU hub
 * Self is always excluded; duplicates removed.
 */
export function getRelatedServices(slug: string, max = 3): ServiceLink[] {
  const out: ServiceLink[] = [];
  const seen = new Set<string>([slug]);

  const parentPaSlug = serviceParentPracticeArea[slug];
  if (parentPaSlug) {
    const pa = practiceAreas.find((p) => p.slug === parentPaSlug);
    const cluster = pa?.relatedServices ?? [];
    for (const link of cluster) {
      if (seen.has(link.slug)) continue;
      out.push({ slug: link.slug, anchor: link.label });
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

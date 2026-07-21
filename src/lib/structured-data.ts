import { attorneyProfile } from "@/lib/content/attorney";
import type { BofuHub, BofuService } from "@/lib/content/bofu-services";
import type { IndustryContent } from "@/lib/content/industries";
import type { LocationContent } from "@/lib/content/locations";
import type { PracticeAreaContent } from "@/lib/content/practice-areas";
import type { ResourceContent } from "@/lib/content/resources";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import contentMtimes from "@/lib/generated/content-mtimes.json";

// The 13 articles all live in src/lib/content/resources.ts, so git can only
// attribute dates at the file level (not per article). datePublished is that
// file's first commit (the article collection's launch); dateModified comes
// from the prebuild-generated git manifest (the same source the sitemap uses
// for <lastmod>), so it stays accurate as articles are edited. Both are real
// git facts, never fabricated; if the manifest lacks the key we fall back to
// the publish date (one reliable date used for both).
const ARTICLES_DATE_PUBLISHED = "2026-04-20";
const ARTICLES_DATE_MODIFIED =
  (contentMtimes as Record<string, string>)[
    "src/lib/content/resources.ts"
  ] ?? ARTICLES_DATE_PUBLISHED;

const schemaIds = {
  website: absoluteUrl("/#website"),
  organization: absoluteUrl("/#organization"),
  legalService: absoluteUrl("/#legal-service"),
  attorney: absoluteUrl("/#attorney"),
};

function serviceAreas(extraAreas: string[] = []) {
  return [
    ...new Set([
      "Gallatin",
      ...siteConfig.serviceCounties,
      ...siteConfig.broaderServiceCounties,
      ...extraAreas,
    ]),
  ];
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: siteConfig.url,
    name: siteConfig.firmName,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": schemaIds.organization,
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": schemaIds.organization,
    name: siteConfig.firmName,
    url: siteConfig.url,
    // Brand mark, so the Organization is a valid Article `publisher` with a
    // logo. Resolves to the non-www apex via absoluteUrl.
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.png"),
    },
    ...(siteConfig.hasEmail ? { email: siteConfig.email } : {}),
    telephone: siteConfig.schemaTelephone,
    areaServed: serviceAreas(),
    founder: {
      "@type": "Person",
      "@id": schemaIds.attorney,
      name: siteConfig.attorneyName,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness"],
    "@id": schemaIds.legalService,
    name: siteConfig.firmName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.schemaTelephone,
    ...(siteConfig.hasEmail ? { email: siteConfig.email } : {}),
    // Office photo (a definite repo asset) as the LocalBusiness image —
    // recommended for the type and resolves to the non-www apex via absoluteUrl.
    image: absoluteUrl("/images/naultlawoffice.jpg"),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.officeAddress,
    },
    // Statewide Tennessee for non-litigation work; trial representation is
    // concentrated in these counties. Modeled as the State plus the specific
    // trial-county AdministrativeAreas.
    areaServed: [
      { "@type": "State", name: "Tennessee" },
      { "@type": "AdministrativeArea", name: "Sumner County" },
      { "@type": "AdministrativeArea", name: "Davidson County" },
      { "@type": "AdministrativeArea", name: "Wilson County" },
      { "@type": "AdministrativeArea", name: "Macon County" },
      { "@type": "AdministrativeArea", name: "Trousdale County" },
    ],
    parentOrganization: {
      "@id": schemaIds.organization,
    },
  };
}

// Note: the firm intentionally does NOT emit self-serving review /
// aggregateRating markup on its own site. Google's review-snippet policy
// prohibits a business publishing reviews about itself on its own pages for
// LocalBusiness / Organization types. The genuine client reviews live on the
// Google Business Profile (linked via Person.sameAs) and render as visible
// page content via <TestimonialCarousel>, but are not marked up as schema.

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": schemaIds.attorney,
    // Full legal name + parts so Google can resolve the entity precisely and
    // separate it from same-named individuals in other states / professions.
    name: attorneyProfile.legalName,
    givenName: attorneyProfile.firstName,
    familyName: attorneyProfile.lastName,
    additionalName: attorneyProfile.additionalName,
    jobTitle: "Attorney",
    image: absoluteUrl(attorneyProfile.headshotPath),
    // Individual's email (steve@) + the firm's shared E.164 phone. The phone
    // matches the Organization / LegalService nodes for NAP consistency; the
    // email is person-specific.
    email: attorneyProfile.email,
    telephone: siteConfig.schemaTelephone,
    worksFor: {
      "@id": schemaIds.legalService,
    },
    description: attorneyProfile.authoritySummary,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.officeAddress,
    },
    alumniOf: attorneyProfile.education.map((school) => ({
      "@type": "EducationalOrganization",
      name: school,
    })),
    memberOf: [
      { "@type": "Organization", name: "Tennessee Bar Association" },
    ],
    // The Tennessee bar admission carries the BPR identifier + recognizing
    // authority (the strongest single disambiguation signal); the federal
    // admission is preserved from the prior `admissions`-derived list.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Tennessee Bar Admission",
        recognizedBy: {
          "@type": "Organization",
          name: "Tennessee Supreme Court",
        },
        identifier: attorneyProfile.bprNumber,
        dateCreated: attorneyProfile.barAdmissionYear,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "U.S. District Court, Middle District of Tennessee admission",
        recognizedBy: {
          "@type": "Organization",
          name: "United States District Court for the Middle District of Tennessee",
        },
      },
    ],
    knowsAbout: [
      "Commercial leasing",
      "Tennessee Real Estate Commission matters",
      "Operating agreements and owner disputes",
      "Business contract drafting and review",
      "Real estate disputes",
      "Strategic case assessment",
      "Expert witness support in real-estate-oriented matters",
    ],
    sameAs: attorneyProfile.sameAs,
  };
}

export function breadcrumbSchema(
  items: {
    name: string;
    path: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
  items: {
    name: string;
    path: string;
  }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.path)}#collection-page`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: {
      "@id": schemaIds.website,
    },
    about: {
      "@id": schemaIds.legalService,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function serviceSchema(practiceArea: PracticeAreaContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/practice-areas/${practiceArea.slug}`)}#service`,
    name: `${practiceArea.title} | ${siteConfig.attorneyName}`,
    provider: {
      "@id": schemaIds.legalService,
    },
    serviceType: practiceArea.title,
    areaServed: serviceAreas(),
    audience: practiceArea.whoItIsFor.map((entry) => ({
      "@type": "Audience",
      audienceType: entry,
    })),
    description: practiceArea.metaDescription,
  };
}

export function locationPageSchema(location: LocationContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/locations/${location.slug}`)}#service-area`,
    name: `${location.title} business and real estate counsel`,
    provider: {
      "@id": schemaIds.legalService,
    },
    areaServed: serviceAreas([location.title]),
    description: location.metaDescription,
  };
}

export function industryPageSchema(industry: IndustryContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/industries-served/${industry.slug}`)}#industry-service`,
    name: industry.title,
    provider: {
      "@id": schemaIds.legalService,
    },
    areaServed: serviceAreas(),
    audience: industry.audience.map((entry) => ({
      "@type": "Audience",
      audienceType: entry,
    })),
    description: industry.metaDescription,
  };
}

export function bofuHubSchema(hub: BofuHub) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${hub.slug}`)}#bofu-hub`,
    name: `${hub.h1} | ${siteConfig.attorneyName}`,
    provider: {
      "@id": schemaIds.legalService,
    },
    serviceType: hub.h1,
    areaServed: serviceAreas(),
    description: hub.metaDescription,
  };
}

export function bofuServiceSchema(service: BofuService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#bofu-service`,
    name: `${service.h1} | ${siteConfig.attorneyName}`,
    provider: {
      "@id": schemaIds.legalService,
    },
    serviceType: service.h1,
    areaServed: serviceAreas(),
    audience: {
      "@type": "Audience",
      audienceType: service.audience,
    },
    description: service.metaDescription,
  };
}

/**
 * FAQPage markup for a page that answers discrete questions.
 *
 * Note: Google restricted FAQ rich results to authoritative government and
 * health sites in 2023, so this will not produce FAQ rich snippets for this
 * site. It is still valid, machine-readable markup that helps search engines
 * and AI answer engines parse the Q&A, which is why it is emitted here.
 * Only call this where real question/answer content exists on the page —
 * schema must match visible content.
 */
export function faqPageSchema(
  path: string,
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(resource: ResourceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    // Articles render at /articles/<slug> (the old /resources/<slug> path now
    // 301s here), so the @id and url must use the live canonical path.
    "@id": `${absoluteUrl(`/articles/${resource.slug}`)}#article`,
    headline: resource.title,
    description: resource.metaDescription,
    url: absoluteUrl(`/articles/${resource.slug}`),
    datePublished: ARTICLES_DATE_PUBLISHED,
    dateModified: ARTICLES_DATE_MODIFIED,
    articleSection: resource.category,
    keywords: resource.takeaways,
    // Authorship tied to the single site-wide Person entity (Stephen Charles
    // Nault, @id .../#attorney); publisher is the firm Organization (which
    // now carries a logo). No per-article image asset exists, so `image` is
    // intentionally omitted rather than pointing at a generic site image.
    author: {
      "@id": schemaIds.attorney,
    },
    publisher: {
      "@id": schemaIds.organization,
    },
    about: {
      "@id": schemaIds.legalService,
    },
    inLanguage: "en-US",
  };
}

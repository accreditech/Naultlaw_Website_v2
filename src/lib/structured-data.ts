import { attorneyProfile } from "@/lib/content/attorney";
import type { IndustryContent } from "@/lib/content/industries";
import type { LocationContent } from "@/lib/content/locations";
import type { PracticeAreaContent } from "@/lib/content/practice-areas";
import type { ResourceContent } from "@/lib/content/resources";
import type { HomepageTestimonial } from "@/lib/content/testimonials";
import { absoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

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
    ...(siteConfig.hasEmail ? { email: siteConfig.email } : {}),
    ...(siteConfig.hasPhone ? { telephone: siteConfig.phoneLabel } : {}),
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
    ...(siteConfig.hasPhone ? { telephone: siteConfig.phoneLabel } : {}),
    ...(siteConfig.hasEmail ? { email: siteConfig.email } : {}),
    ...(siteConfig.headshotUrl ? { image: siteConfig.headshotUrl } : {}),
    address: {
      "@type": "PostalAddress",
      ...siteConfig.officeAddress,
    },
    areaServed: serviceAreas(),
    parentOrganization: {
      "@id": schemaIds.organization,
    },
  };
}

/**
 * Homepage variant of `localBusinessSchema` that adds the visible client
 * reviews and an aggregate rating. Google can render the aggregate rating
 * as star snippets in search results, which materially improves CTR. We
 * use a separate function so non-homepage pages don't double-publish the
 * review block.
 */
export function localBusinessWithReviewsSchema(
  testimonials: readonly HomepageTestimonial[]
) {
  const reviewCount = testimonials.length;
  const avg =
    reviewCount === 0
      ? 0
      : testimonials.reduce((sum, t) => sum + t.rating, 0) / reviewCount;
  const ratingValue = Math.round(avg * 10) / 10;

  return {
    ...localBusinessSchema(),
    ...(reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            bestRating: 5,
            worstRating: 1,
            reviewCount,
          },
          review: testimonials.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            datePublished: t.isoDate,
            reviewBody: t.quote,
            reviewRating: {
              "@type": "Rating",
              ratingValue: t.rating,
              bestRating: 5,
              worstRating: 1,
            },
            ...(t.source ? { publisher: { "@type": "Organization", name: t.source } } : {}),
          })),
        }
      : {}),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": schemaIds.attorney,
    name: siteConfig.attorneyName,
    jobTitle: "Attorney",
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
    hasCredential: attorneyProfile.admissions.map((admission) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Legal admission",
      name: admission,
    })),
    knowsAbout: [
      "Commercial leasing",
      "Tennessee Real Estate Commission matters",
      "Operating agreements and owner disputes",
      "Business contract drafting and review",
      "Real estate disputes",
      "Strategic case assessment",
      "Expert witness support in real-estate-oriented matters",
    ],
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

export function faqSchema(
  faqs: {
    question: string;
    answer: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function articleSchema(resource: ResourceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(`/resources/${resource.slug}`)}#article`,
    headline: resource.title,
    description: resource.metaDescription,
    url: absoluteUrl(`/resources/${resource.slug}`),
    articleSection: resource.category,
    keywords: resource.takeaways,
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

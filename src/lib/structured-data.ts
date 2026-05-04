import { attorneyProfile } from "@/lib/content/attorney";
import type { BofuHub, BofuService } from "@/lib/content/bofu-services";
import type { IndustryContent } from "@/lib/content/industries";
import type { LocationContent } from "@/lib/content/locations";
import type { PracticeAreaContent } from "@/lib/content/practice-areas";
import type { ResourceContent } from "@/lib/content/resources";
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

import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { BofuHubSection } from "@/components/sections/bofu-hub-section";
import { BofuServiceSection } from "@/components/sections/bofu-service-section";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import {
  bofuHubs,
  bofuServices,
  getBofuChildren,
  getBofuHub,
  getBofuService,
} from "@/lib/content/bofu-services";
import { createMetadata } from "@/lib/metadata";
import {
  bofuHubSchema,
  bofuServiceSchema,
  breadcrumbSchema,
} from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    ...bofuHubs.map((hub) => ({ slug: hub.slug })),
    ...bofuServices.map((svc) => ({ slug: svc.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hub = getBofuHub(slug);
  if (hub) {
    return createMetadata({
      title: hub.title,
      description: hub.metaDescription,
      path: `/services/${hub.slug}`,
    });
  }
  const svc = getBofuService(slug);
  if (svc) {
    return createMetadata({
      title: svc.title,
      description: svc.metaDescription,
      path: `/services/${svc.slug}`,
    });
  }
  return {};
}

export default async function ServicesSlugPage({ params }: Props) {
  const { slug } = await params;

  const hub = getBofuHub(slug);
  if (hub) {
    const children = getBofuChildren(hub.id);
    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Practice Areas", path: "/services" },
      { name: hub.h1, path: `/services/${hub.slug}` },
    ];

    return (
      <>
        <StructuredDataScript data={bofuHubSchema(hub)} />
        <StructuredDataScript data={breadcrumbSchema(crumbs)} />
        <Breadcrumbs items={crumbs} />
        <main className="fade-in">
          <BofuHubSection hub={hub} children={children} />
        </main>
      </>
    );
  }

  const svc = getBofuService(slug);
  if (svc) {
    const parentHub = getBofuHub(svc.hub);
    const hubTitle = parentHub?.h1 ?? "Practice Areas";
    const hubSlug = parentHub?.slug ?? svc.hub;

    const crumbs = [
      { name: "Home", path: "/" },
      { name: "Practice Areas", path: "/services" },
      { name: hubTitle, path: `/services/${hubSlug}` },
      { name: svc.h1, path: `/services/${svc.slug}` },
    ];

    return (
      <>
        <StructuredDataScript data={bofuServiceSchema(svc)} />
        <StructuredDataScript data={breadcrumbSchema(crumbs)} />
        <Breadcrumbs items={crumbs} />
        <main className="fade-in">
          <BofuServiceSection
            service={svc}
            hubTitle={hubTitle}
            hubSlug={hubSlug}
          />
        </main>
      </>
    );
  }

  notFound();
}

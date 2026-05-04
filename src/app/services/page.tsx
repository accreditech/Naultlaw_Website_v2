import Link from "next/link";
import { type Metadata } from "next";
import { ActionLink } from "@/components/site/action-link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { bofuHubs } from "@/lib/content/bofu-services";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Practice Areas",
  description:
    "Tennessee practice areas — expert witness, business formation, contracts, real estate transactions, and disputes. Statewide advisory work. Call Nault Law.",
  path: "/services",
});

export default function ServicesIndexPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Practice Areas", path: "/services" },
  ];

  return (
    <>
      <StructuredDataScript
        data={collectionPageSchema({
          title: "Practice Areas",
          description:
            "Five practice-area hubs: real estate expert witness, business formation, contracts, real estate disputes, and business disputes.",
          path: "/services",
          items: bofuHubs.map((hub) => ({
            name: hub.h1,
            path: `/services/${hub.slug}`,
          })),
        })}
      />
      <StructuredDataScript data={breadcrumbSchema(crumbs)} />

      <Breadcrumbs items={crumbs} />

      <main className="fade-in">
        <section className="section-padding bg-muted/30 border-b border-border">
          <div className="container-shell">
            <p className="eyebrow text-muted-foreground">Nault Law</p>
            <h1 className="mt-3 font-heading text-4xl tracking-tight text-foreground sm:text-5xl">
              Practice Areas
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Tennessee real estate and business law, organized into five
              practice-area hubs. Statewide advisory work; trial representation
              in trial counties.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-shell">
            <ul className="grid gap-6 sm:grid-cols-2">
              {bofuHubs.map((hub) => (
                <li key={hub.slug} className="flex">
                  <Link
                    href={`/services/${hub.slug}`}
                    className="surface-card group flex w-full flex-col gap-3 p-6 no-underline transition-shadow hover:shadow-md sm:p-8"
                  >
                    <p className="eyebrow text-muted-foreground">
                      Practice Area
                    </p>
                    <h2 className="font-heading text-xl leading-tight text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                      {hub.h1}
                    </h2>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {hub.metaDescription}
                    </p>
                    <p className="mt-auto pt-2 text-sm font-semibold text-accent">
                      Browse →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section-padding bg-muted/30 border-t border-border">
          <div className="container-shell flex flex-col items-start gap-4">
            <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
              Not sure which area fits?
            </h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              The intake is conflict-screened and short. The office generally
              responds within one business day of submission if the matter is a
              fit.
            </p>
            <ActionLink href="/contact?ref=/services">
              {siteConfig.primaryCta.label}
            </ActionLink>
          </div>
        </section>
      </main>
    </>
  );
}

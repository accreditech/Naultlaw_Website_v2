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
  title: "Tennessee Business & Real Estate Legal Services",
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
              Tennessee real estate and business law, organized into six
              practice-area hubs. Statewide advisory work; trial representation
              in Sumner, Wilson, Robertson, Trousdale, Williamson, and Davidson
              Counties.
            </p>
          </div>
        </section>

        <section className="section-padding border-b border-border">
          <div className="container-shell max-w-4xl">
            <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
              How this site is organized
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              <p>
                Naultlaw.com has two parallel ways to read about the firm&rsquo;s
                work, and both lead to the same intake. The{" "}
                <Link
                  href="/practice-areas"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Practice Areas overview
                </Link>{" "}
                pages are the broad editorial view of how Stephen Nault thinks
                about a category &mdash; the recurring fact patterns, the
                governing Tennessee statutes and case law, and how the firm
                approaches a matter from intake through resolution. Those pages
                are written for readers who are still framing the problem.
              </p>
              <p>
                The pages below are the focused-issue view. Each one targets a
                single recurring matter type &mdash; LLC formation, mechanics
                lien enforcement, TREC complaint expert witness work, eviction
                defense, an operating-agreement amendment, a quiet-title action
                &mdash; and is written for readers who already know what they
                need and are deciding whether to schedule a consultation.
                They&rsquo;re grouped into six hubs so you can browse by category
                or jump straight to the page that matches your situation.
              </p>
              <p>
                The same intake form appears on every focused-issue page and at{" "}
                <Link
                  href="/contact"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  /contact
                </Link>
                . Submitting it does not create an attorney-client relationship;
                it tells the office you&rsquo;d like to be contacted to discuss
                potential representation. The office generally responds within
                one business day of submission.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-shell">
            <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
              Browse by practice area
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
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
              The intake is short. The office generally responds within one
              business day of submission.
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

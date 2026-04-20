import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { CtaPanel } from "@/components/sections/cta-panel";
import { ActionLink } from "@/components/site/action-link";
import { DisclosurePanel } from "@/components/site/disclosure-panel";
import { practiceAreas, getPracticeArea } from "@/lib/content/practice-areas";
import { siteImages, pageImages } from "@/lib/content/images";
import { publicDisclosures } from "@/lib/public-disclosures";
import { siteConfig } from "@/lib/site-config";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return {};
  return createMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/practice-areas/${slug}`,
  });
}

export default async function PracticeAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  // Background image for hero
  const imageKey =
    pageImages.practiceAreas[slug as keyof typeof pageImages.practiceAreas] ??
    pageImages.practiceAreas.default;
  const bgSrc = siteImages[imageKey as keyof typeof siteImages];

  return (
    <>
      <PageHero
        eyebrow={area.eyebrow}
        title={area.title}
        summary={area.summary}
        backgroundImageSrc={bgSrc}
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            {/* ── LEFT COLUMN ─────────────────────────────── */}
            <div className="flex flex-col gap-10">
              {/* Intro pull */}
              <p className="editorial-pull">{area.intro}</p>

              {/* Who it's for */}
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  Who this is for
                </h2>
                <ul className="mt-4 divide-y divide-border">
                  {area.whoItIsFor.map((item) => (
                    <li
                      key={item}
                      className="catalog-rule py-3 text-sm leading-7 text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common problems */}
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  Common problems
                </h2>
                <ul className="mt-4 divide-y divide-border">
                  {area.commonProblems.map((item) => (
                    <li
                      key={item}
                      className="catalog-rule py-3 text-sm leading-7 text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Approach */}
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  How I approach it
                </h2>
                <p className="mt-3 text-base leading-8 text-foreground">
                  {area.approach}
                </p>
              </div>

              {/* Common mistakes */}
              {area.commonMistakes.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-foreground">
                    Common mistakes
                  </h2>
                  <ul className="mt-4 divide-y divide-border">
                    {area.commonMistakes.map((item) => (
                      <li
                        key={item}
                        className="catalog-rule py-3 text-sm leading-7 text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Inline CTA */}
              <div className="surface-card p-6 sm:p-8">
                <p className="font-heading text-xl text-foreground">
                  If this describes your situation
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The intake form takes about three minutes. You'll hear back within one business day if the matter is a fit.
                </p>
                <div className="mt-5">
                  <ActionLink href={`/contact?ref=/practice-areas/${area.slug}`}>
                    {siteConfig.primaryCta.label}
                  </ActionLink>
                </div>
              </div>

              {/* FAQs */}
              {area.faqs.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-foreground">
                    Common questions
                  </h2>
                  <div className="mt-4 divide-y divide-border">
                    {area.faqs.map((faq) => (
                      <details
                        key={faq.question}
                        className="group py-4"
                      >
                        <summary className="cursor-pointer list-none text-sm font-semibold text-foreground hover:text-accent">
                          {faq.question}
                        </summary>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN ────────────────────────────── */}
            <aside className="flex flex-col gap-6">
              {/* Why timing matters */}
              <div className="surface-card p-6">
                <p className="eyebrow text-muted-foreground">Why Timing Matters</p>
                <p className="mt-3 text-sm leading-7 text-foreground">
                  {area.whyTimingMatters}
                </p>
              </div>

              {/* Local service area */}
              {area.localServiceArea && (
                <div className="surface-card p-6">
                  <p className="eyebrow text-muted-foreground">Service Area</p>
                  <p className="mt-3 text-sm leading-7 text-foreground">
                    {area.localServiceArea}
                  </p>
                </div>
              )}

              {/* Office contact */}
              <div className="surface-card p-6">
                <p className="eyebrow text-muted-foreground">Office</p>
                <address className="mt-3 not-italic">
                  <p className="text-sm font-semibold text-foreground">
                    {siteConfig.firmName}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {siteConfig.officeAddressLines[0]}
                    <br />
                    {siteConfig.officeAddressLines[1]}
                  </p>
                  {siteConfig.hasPhone && (
                    <a
                      href={siteConfig.phoneHref}
                      className="mt-3 block text-sm font-medium text-foreground hover:text-accent"
                    >
                      {siteConfig.phoneLabel}
                    </a>
                  )}
                </address>
              </div>

              {/* Legal disclosure */}
              <DisclosurePanel
                title="Practice Area Notice"
                paragraphs={[publicDisclosures.practiceAreaShortDisclaimer]}
                tone="default"
              />
            </aside>
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}

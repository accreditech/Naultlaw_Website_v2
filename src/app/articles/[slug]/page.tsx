import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaPanel } from "@/components/sections/cta-panel";
import { ActionLink } from "@/components/site/action-link";
import { DisclosurePanel } from "@/components/site/disclosure-panel";
import { resources } from "@/lib/content/resources";
import { publicDisclosures } from "@/lib/public-disclosures";
import { siteConfig } from "@/lib/site-config";
import { createMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = resources.find((r) => r.slug === slug);
  if (!article) return {};
  return createMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/articles/${slug}`,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = resources.find((r) => r.slug === slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        summary={article.excerpt}
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            {/* ── LEFT: Article body ───────────────────────── */}
            <div className="min-w-0">
              {/* Hook */}
              {article.hook && (
                <p className="editorial-pull mb-8">{article.hook}</p>
              )}

              {/* Body paragraphs */}
              <div className="editorial-stack">
                {article.body.map((paragraph, i) => (
                  <p key={i} className="text-base leading-8 text-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Inline CTA */}
              <div className="mt-12 surface-card p-6 sm:p-8">
                <p className="font-heading text-xl text-foreground">
                  If this article describes your situation
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The intake form takes about three minutes. You'll hear back within one business day if the matter is a fit.
                </p>
                <div className="mt-5">
                  <ActionLink href={`/contact?ref=/articles/${article.slug}`}>
                    {siteConfig.primaryCta.label}
                  </ActionLink>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Sidebar ───────────────────────────── */}
            <aside className="flex flex-col gap-6">
              {/* Takeaways */}
              {article.takeaways.length > 0 && (
                <div className="surface-card p-6">
                  <p className="eyebrow text-muted-foreground">Key Takeaways</p>
                  <ul className="mt-4 flex flex-col gap-3">
                    {article.takeaways.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-6 text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQs */}
              {article.faqs.length > 0 && (
                <div className="surface-card p-6">
                  <p className="eyebrow text-muted-foreground">Common Questions</p>
                  <div className="mt-4 divide-y divide-border">
                    {article.faqs.map((faq) => (
                      <details key={faq.question} className="py-3">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-foreground hover:text-accent">
                          {faq.question}
                        </summary>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {/* Educational disclaimer */}
              <DisclosurePanel
                title={publicDisclosures.educationalContentNotice.title}
                paragraphs={publicDisclosures.educationalContentNotice.paragraphs}
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

import Link from "next/link";
import { type Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { resources } from "@/lib/content/resources";
import { createMetadata } from "@/lib/metadata";
import { collectionPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Guides",
  description:
    "Substantive guides on Tennessee commercial leasing, TREC defense, real estate disputes, owner disputes, and business law — with specific citations and practical context.",
  path: "/articles",
});

// Get unique categories
const categories = ["All", ...Array.from(new Set(resources.map((r) => r.category)))];

export default function ArticlesPage() {
  return (
    <>
      <StructuredDataScript
        data={collectionPageSchema({
          title: "Guides",
          description:
            "Substantive guides on Tennessee commercial leasing, TREC defense, real estate disputes, owner disputes, and business law — with specific citations and practical context.",
          path: "/articles",
          items: resources.map((r) => ({
            name: r.title,
            path: `/articles/${r.slug}`,
          })),
        })}
      />

      <PageHero
        eyebrow="Guides"
        title="Substantive writing on the issues this practice handles."
        summary="Thirteen guides on Tennessee real estate and business law — with specific citations, practical context, and no filler. Read before you call."
      />

      <section className="section-padding">
        <div className="container-shell">
          {/* Category labels */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Article grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="surface-card group flex flex-col gap-3 p-6 no-underline transition-shadow hover:shadow-md"
              >
                <p className="eyebrow text-muted-foreground">{article.category}</p>
                <h2 className="font-heading text-lg leading-snug text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h2>
                <p className="mt-auto text-sm leading-6 text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

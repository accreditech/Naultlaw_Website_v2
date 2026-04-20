import Link from "next/link";
import { type Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaPanel } from "@/components/sections/cta-panel";
import { practiceAreas } from "@/lib/content/practice-areas";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Practice Areas",
  description:
    "Commercial leasing, TREC defense, owner disputes, business contracts, real estate litigation, and more. Tennessee real estate and business law in Gallatin and Sumner County.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="What this practice handles."
        summary="Eight focused areas within Tennessee real estate and business law. If your matter fits one of these, you're in the right place."
      />

      <section className="section-padding">
        <div className="container-shell">
          <ul className="divide-y divide-border">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="group flex items-start justify-between gap-6 py-7 no-underline transition-colors hover:bg-muted/40 sm:py-8"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-foreground group-hover:text-accent transition-colors sm:text-lg">
                      {area.shortTitle}
                    </p>
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {area.intro}
                    </p>
                    {area.issueTypes.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {area.issueTypes.slice(0, 4).map((issue) => (
                          <li
                            key={issue}
                            className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground"
                          >
                            {issue}
                          </li>
                        ))}
                        {area.issueTypes.length > 4 && (
                          <li className="rounded-full border border-border px-3 py-0.5 text-xs text-muted-foreground">
                            +{area.issueTypes.length - 4} more
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}

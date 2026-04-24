import Link from "next/link";
import { type Metadata } from "next";

import { ActionLink } from "@/components/site/action-link";
import { CtaPanel } from "@/components/sections/cta-panel";
import { industries } from "@/lib/content/industries";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Who I Help",
  description:
    "Who this practice works with — brokers and agents, investors and landlords, property managers, contractors, and referral sources across Sumner County and surrounding counties.",
  path: "/who-i-help",
});

// Lead audiences surfaced at the top — exclude referral sources here so the
// page opens with the primary client roles; referral sources link separately.
const leadAudiences = industries.filter((i) => i.slug !== "for-referral-sources");
const referralAudience = industries.find((i) => i.slug === "for-referral-sources");

export default function WhoIHelpPage() {
  return (
    <>
      {/* ── Page header ───────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-shell max-w-3xl">
          <p className="eyebrow text-muted-foreground">Who I Help</p>
          <h1 className="mt-3 font-heading text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
            Counsel built for a specific group of people.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            This practice is structured around the clients who most often bring
            business and real-estate-facing problems to a Tennessee attorney
            who is also a licensed broker. If your role is listed below, the
            work, the pace, and the intake process are built with you in mind.
          </p>
        </div>
      </section>

      {/* ── Audience grid ─────────────────────────────────────────── */}
      <section className="section-padding bg-muted/30 pt-0">
        <div className="container-shell">
          <ul className="grid gap-6 sm:grid-cols-2">
            {leadAudiences.map((audience) => (
              <li key={audience.slug} className="flex">
                <article className="surface-card flex w-full flex-col gap-4 p-7">
                  <h2 className="font-heading text-2xl leading-snug text-foreground">
                    {audience.title}
                  </h2>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {audience.summary}
                  </p>
                  <div>
                    <p className="eyebrow mb-2 text-muted-foreground">
                      Who this fits
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {audience.audience.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2 text-sm leading-6 text-foreground"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/practice-areas`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent/80"
                    >
                      See the work
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Referral sources (secondary callout) ──────────────────── */}
      {referralAudience && (
        <section className="section-padding bg-background">
          <div className="container-shell max-w-3xl">
            <p className="eyebrow text-muted-foreground">
              For Other Professionals
            </p>
            <h2 className="mt-2 font-heading text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              {referralAudience.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {referralAudience.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionLink href="/practice-areas" variant="outlineGold">
                How I Help →
              </ActionLink>
              <ActionLink href="/articles" variant="ghost">
                Read the Guides →
              </ActionLink>
            </div>
          </div>
        </section>
      )}

      {/* ── Closing CTA ───────────────────────────────────────────── */}
      <CtaPanel
        title="If one of these sounds like you"
        summary="The intake is structured and short — name, contact, opposing party, and the basics of your situation. You'll hear back within one business day."
      />
    </>
  );
}

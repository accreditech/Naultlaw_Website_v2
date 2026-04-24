import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { Phone } from "lucide-react";
import { ActionLink } from "@/components/site/action-link";
import { CtaPanel } from "@/components/sections/cta-panel";
import { StructuredDataScript } from "@/components/site/structured-data-script";
import { siteConfig } from "@/lib/site-config";
import { siteImages, pageImages, type SiteImageKey } from "@/lib/content/images";
import { resources } from "@/lib/content/resources";
import { homepageTestimonials } from "@/lib/content/testimonials";
import { createMetadata } from "@/lib/metadata";
import {
  localBusinessSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = createMetadata({
  title: "Business, Real Estate, and Dispute-Resolution Counsel in Sumner County",
  description:
    "Business, real estate, and dispute-resolution counsel for owners, investors, brokers, contractors, and real estate professionals in Sumner County and surrounding counties.",
  path: "/",
});

type PracticeCard = {
  slug: string;
  label: string;
  description: string;
};

const practiceList: PracticeCard[] = [
  {
    slug: "commercial-leasing",
    label: "Commercial Leasing",
    description:
      "You're negotiating a commercial lease, dealing with a default, or disputing what the agreement actually requires. Landlords and tenants both.",
  },
  {
    slug: "trec-defense-and-realtor-complaints",
    label: "TREC Defense",
    description:
      "A complaint has been filed with TREC, or you've received notice of an investigation. Your license is the issue.",
  },
  {
    slug: "operating-agreements-and-owner-disputes",
    label: "Owner & Partner Disputes",
    description:
      "Two or more owners are at an impasse — deadlock, disagreement over distributions, a forced-buyout demand, or a fiduciary breach.",
  },
  {
    slug: "real-estate-disputes",
    label: "Real Estate Disputes",
    description:
      "A transaction failed, title came back with a problem, earnest money is being held, or a broker's conduct is in question.",
  },
  {
    slug: "business-contract-drafting-and-review",
    label: "Business Contracts",
    description:
      "A contract needs to be drafted, reviewed before you sign, or enforced — or someone is claiming you breached one.",
  },
  {
    slug: "strategic-case-assessment",
    label: "Strategic Case Assessment",
    description:
      "You're not sure whether you have a viable claim. A structured review before committing to a lawsuit.",
  },
];

function practiceImageFor(slug: string) {
  const map = pageImages.practiceAreaCards as Record<string, SiteImageKey>;
  const key = map[slug] ?? map.default;
  return siteImages[key];
}

const featuredTestimonials = homepageTestimonials.slice(0, 3);
const featuredArticles = resources.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <StructuredDataScript data={websiteSchema()} />
      <StructuredDataScript data={organizationSchema()} />
      <StructuredDataScript data={localBusinessSchema()} />
      <StructuredDataScript data={personSchema()} />

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="dark-block relative overflow-hidden section-padding">
        <Image
          src={siteImages.heroPrimary}
          alt=""
          fill
          className="object-cover object-center pointer-events-none"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/80 pointer-events-none" />

        <div className="container-shell relative z-10 max-w-4xl">
          <p className="eyebrow text-primary-foreground/60">
            Tennessee Real Estate &amp; Business Law
          </p>
          <h1 className="display-heading mt-3 text-primary-foreground">
            When the lease, the deal, or the<br className="hidden sm:block" />{" "}
            business relationship goes wrong.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">
            Stephen Nault is a Tennessee attorney and licensed real estate broker
            who handles commercial leasing, TREC defense, owner disputes, and
            real estate litigation — directly, without delegation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ActionLink
              href={siteConfig.primaryCta.href}
              className="bg-white text-primary hover:bg-white/90 sm:order-1"
            >
              {siteConfig.primaryCta.label}
            </ActionLink>
            {siteConfig.hasPhone ? (
              <ActionLink
                href={siteConfig.tertiaryCta.href}
                variant="outlineGold"
                className="order-first sm:order-2 border-accent text-accent hover:bg-accent/15"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.tertiaryCta.label}
              </ActionLink>
            ) : (
              <ActionLink
                href="/practice-areas"
                variant="outline"
                className="border-white/30 text-primary-foreground hover:border-white/50 hover:bg-white/10 sm:order-2"
              >
                Practice Areas
              </ActionLink>
            )}
          </div>

          {/* Stats strip */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-sm text-primary-foreground/60">
            <span>
              <span className="font-semibold text-primary-foreground">2012</span>{" "}
              — Tennessee Broker License
            </span>
            <span>
              <span className="font-semibold text-primary-foreground">2018</span>{" "}
              — Licensed to Practice Law
            </span>
            <span>Rule 31 Mediator</span>
            <span>TREC Course Instructor</span>
            <span>Gallatin, TN</span>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT I HANDLE ─────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-shell">
          <div className="max-w-xl">
            <p className="eyebrow text-muted-foreground">What I Handle</p>
            <h2 className="mt-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              Six problems this practice is built around.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              If your situation is on this list, you're in the right place.
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceList.map((item) => (
              <li key={item.slug} className="flex">
                <Link
                  href={`/practice-areas/${item.slug}`}
                  className="surface-card group flex w-full flex-col overflow-hidden no-underline transition-shadow hover:shadow-md"
                >
                  <div className="photo-frame relative aspect-[3/2] w-full">
                    <Image
                      src={practiceImageFor(item.slug)}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <p className="font-heading text-lg leading-snug text-foreground transition-colors group-hover:text-accent">
                      {item.label}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-accent">
                      Learn more
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <ActionLink href="/practice-areas" variant="outlineGold">
              View All 9 Practice Areas →
            </ActionLink>
          </div>
        </div>
      </section>

      {/* ── 3. WHY THIS PRACTICE ─────────────────────────────────── */}
      <section className="section-padding bg-muted/40">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="eyebrow text-muted-foreground">Why This Practice</p>
            <p className="editorial-pull mt-4">
              Most attorneys advise on real estate. This one has been licensed to
              sell it since 2012.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                "Tennessee broker license since 2012 — industry knowledge that most attorneys don't have and can't simulate.",
                "TREC course instructor — not an outside observer of the licensing system, but someone who teaches it.",
                "Your matter is handled directly. Not assigned to an associate. Not delegated after the intake call.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-base leading-7 text-foreground">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ActionLink href="/about" variant="outline">
                About Stephen Nault
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIALS ──────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="container-shell">
          <div className="max-w-xl">
            <p className="eyebrow text-muted-foreground">Client Reviews</p>
            <h2 className="mt-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              What clients say.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTestimonials.map((t) => (
              <div key={t.name} className="surface-card flex flex-col gap-4 p-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-auto border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.source} · {t.dateLabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. RECENT ARTICLES ───────────────────────────────────── */}
      <section className="section-padding bg-muted/40">
        <div className="container-shell">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-muted-foreground">Guides</p>
              <h2 className="mt-2 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
                Read before you call.
              </h2>
              <p className="mt-2 text-base text-muted-foreground">
                Substantive pieces on the issues this practice handles — with
                Tennessee-specific citations.
              </p>
            </div>
            <ActionLink
              href="/articles"
              variant="ghost"
              className="shrink-0 self-start sm:self-auto"
            >
              All Guides →
            </ActionLink>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="surface-card group flex flex-col gap-3 p-6 no-underline transition-shadow hover:shadow-md"
              >
                <p className="eyebrow text-muted-foreground">{article.category}</p>
                <h3 className="font-heading text-lg leading-snug text-foreground group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="mt-auto text-sm leading-6 text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA PANEL ─────────────────────────────────────────── */}
      <CtaPanel
        title="If any of this sounds like your situation"
        summary="The intake is structured and short — name, contact, opposing party, and the basics of your situation. You'll hear back within one business day."
        secondaryLabel={siteConfig.hasPhone ? siteConfig.tertiaryCta.label : undefined}
        secondaryHref={siteConfig.hasPhone ? siteConfig.tertiaryCta.href : undefined}
      />
    </>
  );
}

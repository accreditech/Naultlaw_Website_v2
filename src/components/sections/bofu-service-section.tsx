import Link from "next/link";
import { ActionLink } from "@/components/site/action-link";
import { BofuInlineIntakeForm } from "@/components/sections/bofu-inline-intake";
import type { BofuService } from "@/lib/content/bofu-services";
import { siteConfig } from "@/lib/site-config";

const trialCountyShortNames = [
  ...siteConfig.serviceCounties,
  ...siteConfig.broaderServiceCounties,
].map((c) => c.replace(/ County$/, ""));

const trialCountiesSentence = `Statewide advice; trial representation in ${trialCountyShortNames
  .slice(0, -1)
  .join(", ")}, and ${trialCountyShortNames.slice(-1)[0]} Counties.`;

type Props = {
  service: BofuService;
  hubTitle: string;
  hubSlug: string;
};

export function BofuServiceSection({ service, hubTitle, hubSlug }: Props) {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          {/* ── BODY ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-10">
            <header className="flex flex-col gap-4">
              <p className="eyebrow text-muted-foreground">Practice Area</p>
              <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
                {service.h1}
              </h1>
              <p className="editorial-pull">{service.intro}</p>
              <div className="mt-2">
                <ActionLink href="#bofu-intake">{service.primaryCtaLabel}</ActionLink>
              </div>
            </header>

            {service.sections.map((section) => (
              <div key={section.h2}>
                <h2 className="font-heading text-2xl text-foreground">{section.h2}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-7 text-foreground/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <p className="text-sm leading-6 text-muted-foreground italic">
              The information on this page is provided for general educational
              purposes only and is not legal advice. Laws change and facts
              matter; every situation is nuanced. If you would like the office
              to evaluate your specific facts, please share the basics below
              and we will be in touch.
            </p>

            <BofuInlineIntakeForm refSlug={service.slug} />
          </div>

          {/* ── RIGHT RAIL ───────────────────────────────────── */}
          <aside className="flex flex-col gap-6">
            <div className="surface-card p-6">
              <p className="eyebrow text-muted-foreground">Service Area</p>
              <p className="mt-3 text-sm leading-7 text-foreground">
                {service.isLitigation ? trialCountiesSentence : service.serviceArea}
              </p>
            </div>

            <div className="surface-card p-6">
              <p className="eyebrow text-muted-foreground">Audience</p>
              <p className="mt-3 text-sm leading-7 text-foreground">
                {service.audience}
              </p>
            </div>

            <div className="surface-card p-6">
              <p className="eyebrow text-muted-foreground">Within</p>
              <Link
                href={`/services/${hubSlug}`}
                className="mt-3 block text-sm font-medium leading-7 text-foreground hover:text-accent"
              >
                {hubTitle} →
              </Link>
              <Link
                href="/services"
                className="mt-2 block text-xs text-muted-foreground hover:text-foreground"
              >
                All practice areas
              </Link>
            </div>

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
          </aside>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ActionLink } from "@/components/site/action-link";
import { BofuInlineIntakeForm } from "@/components/sections/bofu-inline-intake";
import { renderInlineLinks } from "@/components/site/inline-rich-text";
import type { BofuService } from "@/lib/content/bofu-services";
import { toBlocks } from "@/lib/content/prose-blocks";
import { getPracticeArea } from "@/lib/content/practice-areas";
import {
  getRelatedServices,
  serviceParentPracticeArea,
} from "@/lib/content/practice-area-services";
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

// Prose-list convention (the "- " / "1. " prefixes) lives in
// @/lib/content/prose-blocks so articles and service pages share one parser.

export function BofuServiceSection({ service, hubTitle, hubSlug }: Props) {
  const parentPaSlug = serviceParentPracticeArea[service.slug];
  const parentPa = parentPaSlug ? getPracticeArea(parentPaSlug) : undefined;
  const relatedServices = getRelatedServices(service.slug, 3);

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
              <p className="editorial-pull">{renderInlineLinks(service.intro)}</p>
              {parentPa && (
                <p className="text-sm leading-7 text-muted-foreground">
                  This page covers a focused service. For the broader editorial
                  practice area, see{" "}
                  <Link
                    href={`/practice-areas/${parentPa.slug}`}
                    className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {parentPa.shortTitle} in Tennessee
                  </Link>
                  .
                </p>
              )}
              <div className="mt-2">
                <ActionLink href="#bofu-intake">{service.primaryCtaLabel}</ActionLink>
              </div>
            </header>

            {service.sections.map((section) => (
              <div key={section.h2}>
                <h2 className="font-heading text-2xl text-foreground">{section.h2}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {toBlocks(section.paragraphs).map((block, i) => {
                    if (block.kind === "ul") {
                      return (
                        <ul
                          key={i}
                          className="flex list-disc flex-col gap-2 pl-5 text-base leading-7 text-foreground/85"
                        >
                          {block.items.map((item, j) => (
                            <li key={j}>{renderInlineLinks(item)}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.kind === "ol") {
                      return (
                        <ol
                          key={i}
                          className="flex list-decimal flex-col gap-2 pl-5 text-base leading-7 text-foreground/85"
                        >
                          {block.items.map((item, j) => (
                            <li key={j}>{renderInlineLinks(item)}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={i} className="text-base leading-7 text-foreground/85">
                        {renderInlineLinks(block.text)}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}

            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  Frequently asked questions
                </h2>
                <div className="mt-4 flex flex-col gap-6">
                  {service.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-base font-semibold leading-7 text-foreground">
                        {faq.question}
                      </h3>
                      <p className="mt-2 text-base leading-7 text-foreground/85">
                        {renderInlineLinks(faq.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {relatedServices.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl text-foreground">
                  Related services
                </h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {relatedServices.map((link) => (
                    <li key={link.slug} className="catalog-rule py-2">
                      <Link
                        href={`/services/${link.slug}`}
                        className="text-sm font-medium leading-6 text-foreground transition-colors hover:text-accent"
                      >
                        {link.anchor}{" "}
                        <span
                          className="text-muted-foreground/60"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

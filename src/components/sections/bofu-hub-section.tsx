import Link from "next/link";
import { ActionLink } from "@/components/site/action-link";
import type { BofuHub, BofuService } from "@/lib/content/bofu-services";
import { siteConfig } from "@/lib/site-config";

const trialCountyShortNames = [
  ...siteConfig.serviceCounties,
  ...siteConfig.broaderServiceCounties,
].map((c) => c.replace(/ County$/, ""));

const trialCountiesSentence = `Statewide advice; trial representation in ${trialCountyShortNames
  .slice(0, -1)
  .join(", ")}, and ${trialCountyShortNames.slice(-1)[0]} Counties.`;

type Props = {
  hub: BofuHub;
  children: BofuService[];
};

export function BofuHubSection({ hub, children }: Props) {
  const ctaHref = `/contact?ref=/services/${hub.slug}`;

  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <header className="flex flex-col gap-4">
            <p className="eyebrow text-muted-foreground">Practice Area Hub</p>
            <h1 className="font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
              {hub.h1}
            </h1>
            <p className="editorial-pull">{hub.intro}</p>
            <div className="mt-2">
              <ActionLink href={ctaHref}>{hub.primaryCtaLabel}</ActionLink>
            </div>
          </header>

          {hub.whatThisCovers && (
            <div>
              <h2 className="font-heading text-2xl text-foreground">
                What this covers
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/85">
                {hub.whatThisCovers}
              </p>
            </div>
          )}

          {children.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-foreground">
                What I handle here
              </h2>
              <ul className="mt-4 divide-y divide-border">
                {children.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`/services/${child.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-4 no-underline"
                    >
                      <span className="text-base font-medium leading-7 text-foreground transition-colors group-hover:text-accent">
                        {child.h1}
                      </span>
                      <span className="shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="font-heading text-2xl text-foreground">When to call</h2>
            <p className="mt-4 text-base leading-7 text-foreground/85">
              {hub.whenToCall}
            </p>
            {hub.isLitigation && (
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {trialCountiesSentence}
              </p>
            )}
          </div>

          <div className="surface-card p-6 sm:p-8">
            <p className="font-heading text-xl text-foreground">
              If this is the kind of matter you have
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Conflict-screened intake. The office responds within one business
              day if the matter is a fit.
            </p>
            <div className="mt-5">
              <ActionLink href={ctaHref}>{hub.primaryCtaLabel}</ActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

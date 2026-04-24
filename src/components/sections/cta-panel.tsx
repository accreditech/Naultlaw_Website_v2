import { Phone } from "lucide-react";
import { ActionLink } from "@/components/site/action-link";
import { siteConfig } from "@/lib/site-config";

type CtaPanelProps = {
  title?: string;
  summary?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaPanel({
  title = "If any of this sounds like your situation",
  summary = "The intake is structured and short — name, contact, opposing party, brief description. You'll hear back within one business day.",
  primaryLabel = siteConfig.primaryCta.label,
  primaryHref = siteConfig.primaryCta.href,
  secondaryLabel,
  secondaryHref,
}: CtaPanelProps) {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="dark-block px-8 py-12 sm:px-12 sm:py-16 text-center">
          <h2 className="font-heading text-3xl text-primary-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-primary-foreground/72 max-w-xl mx-auto">
            {summary}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <ActionLink
              href={primaryHref}
              className="bg-white text-primary hover:bg-white/90 sm:order-2"
            >
              {primaryLabel}
            </ActionLink>
            {secondaryLabel && secondaryHref && (
              <ActionLink
                href={secondaryHref}
                className="order-first border border-accent bg-transparent text-accent hover:bg-accent/15 sm:order-1"
              >
                <Phone className="size-4" aria-hidden="true" />
                {secondaryLabel}
              </ActionLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

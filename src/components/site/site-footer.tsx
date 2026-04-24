import Link from "next/link";
import { Phone } from "lucide-react";
import { ActionLink } from "@/components/site/action-link";
import { BrandLogo } from "@/components/site/brand-logo";
import { siteConfig, officeHours } from "@/lib/site-config";
import { publicDisclosures } from "@/lib/public-disclosures";

const practiceLinks = [
  { label: "Commercial Leasing", href: "/practice-areas/commercial-leasing" },
  { label: "TREC Defense", href: "/practice-areas/trec-defense-and-realtor-complaints" },
  { label: "Owner Disputes", href: "/practice-areas/operating-agreements-and-owner-disputes" },
  { label: "Business Contracts", href: "/practice-areas/business-contract-drafting-and-review" },
  { label: "Real Estate Disputes", href: "/practice-areas/real-estate-disputes" },
  { label: "All Practice Areas", href: "/practice-areas" },
];

const legalLinks = [
  { label: "Website Disclaimer", href: "/website-disclaimer" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "No Attorney-Client Relationship", href: "/no-attorney-client-relationship" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-shell py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {siteConfig.firmName}
              <br />
              {siteConfig.officeAddressLines[0]}
              <br />
              {siteConfig.officeAddressLines[1]}
            </p>
            <div className="mt-6 flex flex-col items-start gap-3">
              <ActionLink href={siteConfig.primaryCta.href} size="sm">
                {siteConfig.primaryCta.label}
              </ActionLink>
              {siteConfig.hasPhone && (
                <ActionLink
                  href={siteConfig.phoneHref}
                  variant="outlineGold"
                  size="sm"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call {siteConfig.phoneLabel}
                </ActionLink>
              )}
            </div>
            {siteConfig.hasEmail && (
              <a
                href={siteConfig.emailHref}
                className="mt-5 block text-sm font-medium text-muted-foreground hover:text-accent"
              >
                {siteConfig.email}
              </a>
            )}
          </div>

          {/* Practice Areas */}
          <div>
            <p className="eyebrow mb-4">Practice Areas</p>
            <ul className="flex flex-col">
              {practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office hours */}
          <div>
            <p className="eyebrow mb-4">Office Hours</p>
            <ul className="flex flex-col gap-2">
              {officeHours.map((item) => (
                <li key={item} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow mb-4">Legal</p>
            <ul className="flex flex-col">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs leading-6 text-muted-foreground">
            &copy; {year} {siteConfig.firmName}. All rights reserved.
          </p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground max-w-3xl">
            {publicDisclosures.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}

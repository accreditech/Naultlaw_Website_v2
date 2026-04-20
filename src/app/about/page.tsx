import Image from "next/image";
import { type Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaPanel } from "@/components/sections/cta-panel";
import { ActionLink } from "@/components/site/action-link";
import { attorneyProfile } from "@/lib/content/attorney";
import { siteImages } from "@/lib/content/images";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About Stephen Nault",
  description:
    "Stephen C. Nault is a Tennessee attorney and licensed real estate broker based in Gallatin. His practice focuses on commercial leasing, TREC defense, owner disputes, and real estate litigation.",
  path: "/about",
});

const credentialHighlights = [
  { year: "2008", label: "Property Manager, Crossroads Office Park" },
  { year: "2012", label: "Tennessee Broker License" },
  { year: "2018", label: "Licensed to Practice Law in Tennessee" },
  { year: "2018", label: "U.S. District Court, Middle District of Tennessee" },
  { year: "2019", label: "Gallatin Government Institute Graduate" },
  { year: "2020", label: "TREC Course Instructor License" },
  { year: "2021", label: "Managing Broker, Accredited Realty LLC" },
  { year: "2025", label: "Rule 31 Mediator" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Tennessee attorney. Licensed broker since 2012."
        summary="Stephen C. Nault brings both a law license and direct industry experience to every matter — commercial real estate, brokerage, property management, and business advisory work done alongside, not in place of, legal practice."
      />

      {/* ── Bio + photo ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            {/* Text */}
            <div className="editorial-stack">
              {attorneyProfile.fullBio.map((paragraph, i) => (
                <p key={i} className="text-base leading-8 text-foreground">
                  {paragraph}
                </p>
              ))}

              <div className="mt-8">
                <ActionLink href="/contact">Request a Consultation</ActionLink>
              </div>
            </div>

            {/* Photo + credentials sidebar */}
            <aside className="flex flex-col gap-8">
              <div className="photo-frame relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src={siteImages.headshot}
                  alt="Stephen C. Nault, Esq."
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 340px"
                  priority
                />
              </div>

              {/* Credential timeline */}
              <div className="surface-card p-6">
                <p className="eyebrow text-muted-foreground">Timeline</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {credentialHighlights.map((item) => (
                    <li key={`${item.year}-${item.label}`} className="flex gap-4">
                      <span className="w-10 shrink-0 text-sm font-semibold tabular-nums text-foreground">
                        {item.year}
                      </span>
                      <span className="text-sm leading-6 text-muted-foreground">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Education & admissions ───────────────────────────── */}
      <section className="section-padding bg-muted/40">
        <div className="container-shell">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="eyebrow text-muted-foreground">Bar Admissions</p>
              <ul className="mt-4 flex flex-col gap-2">
                {attorneyProfile.admissions.map((item) => (
                  <li key={item} className="text-sm leading-7 text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-muted-foreground">Education</p>
              <ul className="mt-4 flex flex-col gap-2">
                {attorneyProfile.education.map((item) => (
                  <li key={item} className="text-sm leading-7 text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-muted-foreground">Licenses &amp; Credentials</p>
              <ul className="mt-4 flex flex-col gap-2">
                <li className="text-sm leading-7 text-foreground">
                  Tennessee Real Estate Broker License (2012)
                </li>
                <li className="text-sm leading-7 text-foreground">
                  TREC Course Instructor License (2020)
                </li>
                <li className="text-sm leading-7 text-foreground">
                  Managing Broker, Accredited Realty LLC (2021)
                </li>
                <li className="text-sm leading-7 text-foreground">
                  Rule 31 Mediator (2025)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Ready to talk through your situation?"
        summary="The intake form is structured and short. You'll hear back within one business day."
      />
    </>
  );
}

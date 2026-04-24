import { Suspense } from "react";
import { type Metadata } from "next";
import { IntakeForm } from "@/components/contact/intake-form";
import { PageHero } from "@/components/sections/page-hero";
import { siteConfig } from "@/lib/site-config";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Schedule a consultation review with Stephen Nault — Tennessee real estate and business attorney. Structured intake, conflict screen, response within one business day.",
  path: "/contact",
});

const processSteps = [
  {
    step: "01",
    heading: "Submit the intake form",
    body: "Name, contact information, opposing party, and a brief description of the issue. Takes about three minutes.",
  },
  {
    step: "02",
    heading: "Conflict screen and review",
    body: "The submission is reviewed for conflicts and fit. Not every matter is taken. If yours is, you'll hear back within one business day.",
  },
  {
    step: "03",
    heading: "Consultation scheduled",
    body: "If the matter appears to be a fit after the initial review, a consultation is scheduled to go into detail and determine next steps.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Schedule a consultation review."
        summary="This is a structured intake — not a general inquiry form. Fill it out completely. You'll hear back within one business day if the matter is a fit."
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_440px]">
            {/* Form — main column */}
            <div>
              <Suspense>
                <IntakeForm />
              </Suspense>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-8">
              {/* Process */}
              <div className="surface-card p-6">
                <p className="eyebrow text-muted-foreground">How It Works</p>
                <ul className="mt-4 flex flex-col gap-6">
                  {processSteps.map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="font-heading text-3xl leading-none text-muted-foreground tabular-nums" aria-hidden="true">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {item.heading}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Office details */}
              <div className="surface-card p-6" id="office-details">
                <p className="eyebrow text-muted-foreground">Office</p>
                <address className="mt-4 not-italic">
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
                  {siteConfig.hasEmail && (
                    <a
                      href={siteConfig.emailHref}
                      className="block text-sm font-medium text-foreground hover:text-accent"
                    >
                      {siteConfig.email}
                    </a>
                  )}
                </address>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

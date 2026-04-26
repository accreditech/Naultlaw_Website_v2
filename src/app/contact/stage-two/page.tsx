import { type Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ActionLink } from "@/components/site/action-link";
import { DisclosurePanel } from "@/components/site/disclosure-panel";
import { createMetadata } from "@/lib/metadata";
import { publicDisclosures } from "@/lib/public-disclosures";

export const metadata: Metadata = createMetadata({
  title: "Intake Submitted",
  description:
    "Your consultation request has been received. We will review it and respond within one business day.",
  path: "/contact/stage-two",
});

type Props = {
  searchParams: Promise<{ lead?: string; practice?: string }>;
};

const steps = [
  {
    number: "1",
    title: "Conflict and fit review",
    body: "The office reviews your submission to check for conflicts and confirm that the matter falls within the practice's scope.",
  },
  {
    number: "2",
    title: "Response within one business day",
    body: "If the matter clears the preliminary review, the office will reach out to discuss next steps, scheduling, or any additional information needed.",
  },
  {
    number: "3",
    title: "Consultation",
    body: "A structured consultation allows both parties to assess the matter, ask questions, and determine whether to proceed with an engagement.",
  },
];

export default async function StageTwoPage({ searchParams }: Props) {
  const params = await searchParams;
  const leadId = params.lead;

  return (
    <>
      <PageHero
        eyebrow="Confirmation"
        title="Your intake has been submitted."
        summary="The office has received your consultation request. You will hear back within one business day if the matter clears the preliminary conflict and fit review."
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
            {/* Left: What happens next */}
            <div>
              {leadId && (
                <p className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  Reference number:{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {leadId}
                  </span>
                </p>
              )}

              <div className="surface-card p-6 sm:p-8">
                <p className="eyebrow text-muted-foreground">What Happens Next</p>
                <ol className="mt-6 flex flex-col gap-8">
                  {steps.map((step) => (
                    <li key={step.number} className="flex gap-5">
                      <span
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <div>
                        <p className="font-semibold text-foreground">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-muted-foreground">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <ActionLink href="/">Return Home</ActionLink>
                <ActionLink href="/practice-areas" variant="outline">
                  Practice Areas
                </ActionLink>
              </div>
            </div>

            {/* Right: Disclosures */}
            <aside className="flex flex-col gap-4">
              <DisclosurePanel
                title={publicDisclosures.confirmationResponse.title}
                paragraphs={publicDisclosures.confirmationResponse.paragraphs}
              />
              <DisclosurePanel
                title={publicDisclosures.consultationRequestNotice.title}
                paragraphs={
                  publicDisclosures.consultationRequestNotice.paragraphs
                }
              />
              <DisclosurePanel
                title={publicDisclosures.emergencyDeadlineNotice.title}
                paragraphs={
                  publicDisclosures.emergencyDeadlineNotice.paragraphs
                }
                tone="warning"
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

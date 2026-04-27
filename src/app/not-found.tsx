import { PageHero } from "@/components/sections/page-hero";
import { ActionLink } from "@/components/site/action-link";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found."
        summary="The page you're looking for doesn't exist or may have moved. Use the links below to find what you need."
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="flex flex-wrap gap-4">
            <ActionLink href="/">Return Home</ActionLink>
            <ActionLink href="/practice-areas" variant="outline">
              Practice Areas
            </ActionLink>
            <ActionLink href="/contact" variant="outline">
              Contact
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

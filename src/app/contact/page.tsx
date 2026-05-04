import { Suspense } from "react";
import Image from "next/image";
import { type Metadata } from "next";
import { IntakeForm } from "@/components/contact/intake-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Schedule a consultation review with Stephen Nault — Tennessee real estate and business attorney. Structured intake, conflict screen, response within one business day.",
  path: "/contact",
});

const PHONE_DISPLAY = "(615) 953-9505";
const PHONE_HREF = "tel:+16159539505";
const EMAIL_HREF = "mailto:stephen@naultlaw.com";

export default function ContactPage() {
  return (
    <main className="fade-in">
      {/* Hero */}
      <section
        style={{
          background: "var(--primary)",
          paddingBlock: "5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/naultlawoffice.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.18 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(18,35,44,.92) 0%,rgba(18,35,44,.78) 100%)",
          }}
        />
        <div
          className="shell"
          style={{ position: "relative", zIndex: 2, maxWidth: 820 }}
        >
          <p className="eyebrow light" style={{ marginBottom: 12 }}>
            Contact
          </p>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(2rem,4vw,3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              color: "var(--white)",
              marginBottom: "1rem",
            }}
          >
            Let&apos;s discuss your matter.
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,.72)",
            }}
          >
            Choose the channel that suits you — call, email, or submit the
            intake form below. Every matter is conflict-screened before
            detailed review begins.
          </p>
        </div>
      </section>

      {/* Three contact channels */}
      <section
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          paddingBlock: "2.5rem",
        }}
      >
        <div
          className="shell g-cards-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1rem",
          }}
        >
          {[
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ),
              l: "Call the Office",
              v: PHONE_DISPLAY,
              sub: "Monday–Friday, 9–5 CT",
              href: PHONE_HREF,
            },
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ),
              l: "Email",
              v: "Click to send email",
              sub: "Replies within one business day",
              href: EMAIL_HREF,
            },
            {
              icon: (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
              l: "Visit the Office",
              v: "121 S. Hickory Ave",
              sub: "Gallatin, TN 37066 · By appointment",
              href: "https://maps.google.com/?q=121+S+Hickory+Ave+Gallatin+TN",
            },
          ].map((c) => (
            <a
              key={c.l}
              href={c.href}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "1.25rem 1.5rem",
                border: "1px solid var(--border)",
                borderRadius: 8,
                background: "var(--bg)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  color: "var(--accent)",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {c.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: ".68rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: ".16em",
                    color: "var(--muted-fg)",
                    marginBottom: 4,
                  }}
                >
                  {c.l}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-head)",
                    fontStyle: "italic",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    marginBottom: 2,
                  }}
                >
                  {c.v}
                </p>
                <p style={{ fontSize: ".78rem", color: "var(--muted-fg)" }}>
                  {c.sub}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Intake form: prototype visual layout, real backend wired */}
      <section className="sec">
        <div className="shell">
          <div
            className="g-form-split"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "5rem",
              alignItems: "start",
            }}
          >
            {/* Sticky sidebar */}
            <aside
              className="no-sticky-mobile"
              style={{ position: "sticky", top: 100 }}
            >
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Intake Form
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-head)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  fontSize: "clamp(1.6rem,2.5vw,2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.12,
                  marginBottom: "1.25rem",
                }}
              >
                Share what you know.
              </h2>
              <p
                style={{
                  fontSize: ".9375rem",
                  lineHeight: 1.85,
                  color: "var(--muted-fg)",
                  marginBottom: "2rem",
                }}
              >
                Name, contact, opposing party if any, and a brief description.
                The intake is conflict-screened before detailed review begins.
                You&apos;ll hear back within one business day.
              </p>
              {[
                { l: "Office", v: "121 S. Hickory Ave\nGallatin, TN 37066" },
                {
                  l: "Hours",
                  v: "Monday–Friday\nConsultations by appointment",
                },
                {
                  l: "Service Area",
                  v: "Sumner, Wilson, Robertson,\nTrousdale, Williamson & Davidson Counties",
                },
              ].map((c) => (
                <div key={c.l} style={{ marginBottom: "1.25rem" }}>
                  <p
                    style={{
                      fontSize: ".68rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".18em",
                      color: "var(--muted-fg)",
                      marginBottom: 4,
                    }}
                  >
                    {c.l}
                  </p>
                  <p
                    style={{
                      fontSize: ".9rem",
                      lineHeight: 1.7,
                      color: "var(--fg)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {c.v}
                  </p>
                </div>
              ))}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1.25rem",
                  background: "var(--muted)",
                  borderRadius: 8,
                  fontSize: ".8125rem",
                  lineHeight: 1.75,
                  color: "var(--muted-fg)",
                }}
              >
                <strong
                  style={{
                    color: "var(--fg)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  No attorney-client relationship
                </strong>
                Submitting this form does not create an attorney-client
                relationship. That begins only when a written engagement is
                signed.
              </div>
            </aside>

            {/* Real intake form */}
            <div>
              <Suspense>
                <IntakeForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

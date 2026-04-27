import Image from "next/image";
import Link from "next/link";

const PRACTICE_LINKS = [
  { label: "Commercial Leasing", href: "/practice-areas/commercial-leasing" },
  { label: "TREC Defense and Realtor Representation", href: "/practice-areas/trec-defense-and-realtor-complaints" },
  { label: "Owner & Partner Disputes", href: "/practice-areas/operating-agreements-and-owner-disputes" },
  { label: "Real Estate Disputes", href: "/practice-areas/real-estate-disputes" },
  { label: "Business Contracts", href: "/practice-areas/business-contract-drafting-and-review" },
];

const MORE_LINKS = [
  { label: "Strategic Case Assessment", href: "/practice-areas/strategic-case-assessment" },
  { label: "Expert Witness", href: "/expert-witness" },
  { label: "Arbitration, Mediation and ADR", href: "/practice-areas/arbitration-and-dispute-resolution" },
  { label: "Property Management Disputes", href: "/practice-areas" },
];

const OFFICE_PHONE_DISPLAY = "(615) 953-9505";
const OFFICE_PHONE_HREF = "tel:+16159539505";

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--primary)",
        color: "rgba(255,255,255,.75)",
        paddingBlock: "4.5rem",
      }}
    >
      <div className="shell">
        <div
          className="g-4"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Nault Law"
              width={220}
              height={44}
              style={{ height: 44, width: "auto", marginBottom: 18, opacity: 0.92 }}
            />
            <p
              style={{
                fontSize: ".875rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,.65)",
                maxWidth: 260,
              }}
            >
              Practical counsel for business, real estate, strategic
              consultation, and dispute resolution.
            </p>
            <p
              style={{
                marginTop: 16,
                fontSize: ".8125rem",
                color: "rgba(255,255,255,.65)",
                lineHeight: 1.7,
              }}
            >
              121 S. Hickory Ave
              <br />
              Gallatin, TN 37066
            </p>
          </div>

          {/* Practice column */}
          <div>
            <p
              style={{
                fontSize: ".68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "rgba(255,255,255,.65)",
                marginBottom: 14,
              }}
            >
              Practice
            </p>
            {PRACTICE_LINKS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="footer-col-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: ".875rem",
                  marginBottom: 4,
                  padding: "8px 0",
                  color: "rgba(255,255,255,.65)",
                  minHeight: 40,
                  textDecoration: "none",
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* More column */}
          <div>
            <p
              style={{
                fontSize: ".68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "rgba(255,255,255,.65)",
                marginBottom: 14,
              }}
            >
              More
            </p>
            {MORE_LINKS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="footer-col-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: ".875rem",
                  marginBottom: 4,
                  padding: "8px 0",
                  color: "rgba(255,255,255,.65)",
                  minHeight: 40,
                  textDecoration: "none",
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>

          {/* Contact column */}
          <div>
            <p
              style={{
                fontSize: ".68rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".18em",
                color: "rgba(255,255,255,.65)",
                marginBottom: 14,
              }}
            >
              Contact
            </p>
            <Link
              href="/contact"
              style={{
                display: "block",
                width: "100%",
                fontFamily: "var(--font-body)",
                fontSize: ".85rem",
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: 6,
                background: "var(--accent)",
                color: "var(--primary)",
                marginBottom: 10,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Schedule a Consultation
            </Link>
            <a
              href={OFFICE_PHONE_HREF}
              style={{
                width: "100%",
                fontFamily: "var(--font-body)",
                fontSize: ".85rem",
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: 6,
                background: "transparent",
                color: "var(--accent)",
                border: "1.5px solid var(--accent)",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call {OFFICE_PHONE_DISPLAY}
            </a>
            <p
              style={{
                fontSize: ".75rem",
                color: "rgba(255,255,255,.65)",
                lineHeight: 1.75,
              }}
            >
              Monday–Friday
              <br />
              By appointment
              <br />
              Sumner, Wilson, Robertson,
              <br />
              Trousdale &amp; Davidson Counties
            </p>
          </div>
        </div>

        <div
          className="footer-bottom-row"
          style={{
            borderTop: "1px solid rgba(255,255,255,.1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <p
            style={{
              fontSize: ".75rem",
              color: "rgba(255,255,255,.55)",
              lineHeight: 1.7,
            }}
          >
            © 2025 The Law Office of Stephen Nault. Attorney advertising. No
            attorney-client relationship is formed by visiting or submitting
            information through this website.
          </p>
          <p
            style={{
              fontSize: ".75rem",
              color: "rgba(255,255,255,.55)",
              lineHeight: 1.7,
            }}
          >
            Website Terms and Conditions can be found{" "}
            <Link
              href="/legal"
              style={{
                color: "rgba(255,255,255,.85)",
                textDecoration: "underline",
                textUnderlineOffset: 2,
              }}
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

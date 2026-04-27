"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Expert Witness", href: "/expert-witness" },
  { label: "Articles", href: "/articles" },
  { label: "Contact Me", href: "/contact" },
] as const;

const OFFICE_PHONE_DISPLAY = "(615) 953-9505";
const OFFICE_PHONE_HREF = "tel:+16159539505";

const PhoneIcon = ({ size = 13 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
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
);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          boxShadow: scrolled ? "0 2px 16px rgba(18,35,44,.07)" : "none",
          transition: "box-shadow .2s",
        }}
      >
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <Link href="/" style={{ lineHeight: 0 }} aria-label="Nault Law home">
            <Image
              src="/brand/logo-full-color.png"
              alt="The Law Office of Stephen Nault"
              width={240}
              height={48}
              priority
              style={{ height: 48, width: "auto" }}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hide-tablet"
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: 0 }}
          >
            {NAV.map((n, i) => {
              const active = isActive(pathname, n.href);
              return (
                <span
                  key={n.href}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        width: 1,
                        height: 14,
                        background: "var(--border)",
                        margin: "0 20px",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: ".875rem",
                      fontWeight: 500,
                      color: active ? "var(--fg)" : "var(--muted-fg)",
                      borderBottom: active
                        ? "1px solid var(--accent)"
                        : "1px solid transparent",
                      paddingBottom: 2,
                      transition: "color .15s",
                      textDecoration: "none",
                    }}
                  >
                    {n.label}
                  </Link>
                </span>
              );
            })}
          </nav>

          {/* Desktop right-side CTAs */}
          <div
            className="hide-tablet"
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <a
              href={OFFICE_PHONE_HREF}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontFamily: "var(--font-body)",
                fontSize: ".85rem",
                fontWeight: 600,
                color: "var(--primary)",
                padding: "10px 16px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                textDecoration: "none",
                transition: "background .15s, border-color .15s",
              }}
            >
              <PhoneIcon />
              {OFFICE_PHONE_DISPLAY}
            </a>
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: ".9rem",
                padding: "12px 24px",
                borderRadius: 6,
                background: "var(--primary)",
                color: "var(--white)",
                border: "none",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "opacity .15s",
              }}
            >
              Schedule a Consultation
            </Link>
          </div>

          {/* Mobile/tablet right-side: phone icon + hamburger */}
          <div
            className="show-mobile"
            style={{ alignItems: "center", gap: 4 }}
          >
            <a
              href={OFFICE_PHONE_HREF}
              className="icon-btn"
              aria-label={`Call the office at ${OFFICE_PHONE_DISPLAY}`}
            >
              <PhoneIcon size={20} />
            </a>
            <button
              type="button"
              className="hamburger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="14" x2="21" y2="14" />
                <line x1="3" y1="21" x2="21" y2="21" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn("drawer-scrim", drawerOpen && "open")}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        className={cn("drawer", drawerOpen && "open")}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!drawerOpen}
      >
        <div className="drawer-head">
          <Link
            href="/"
            style={{ lineHeight: 0 }}
            onClick={() => setDrawerOpen(false)}
            aria-label="Nault Law home"
          >
            <Image
              src="/brand/logo-full-color.png"
              alt="Nault Law"
              width={180}
              height={36}
              style={{ height: 36, width: "auto" }}
            />
          </Link>
          <button
            type="button"
            className="hamburger"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <a href={OFFICE_PHONE_HREF} className="drawer-phone">
          <PhoneIcon size={22} />
          <div>
            <div className="sub">Call the Office</div>
            <div className="num">{OFFICE_PHONE_DISPLAY}</div>
          </div>
        </a>
        <nav className="drawer-nav" aria-label="Mobile navigation">
          {NAV.map((n) => {
            const active = isActive(pathname, n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setDrawerOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  minHeight: 56,
                  padding: "0 22px",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: active ? "var(--primary)" : "var(--fg)",
                  textDecoration: "none",
                  background: active ? "var(--muted)" : "transparent",
                  borderLeft: active
                    ? "3px solid var(--accent)"
                    : "3px solid transparent",
                  transition: "background .15s, border-color .15s",
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="drawer-cta">
          <Link
            href="/contact"
            onClick={() => setDrawerOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: ".9rem",
              padding: "12px 24px",
              borderRadius: 6,
              background: "var(--primary)",
              color: "var(--white)",
              textDecoration: "none",
            }}
          >
            Schedule a Consultation
          </Link>
        </div>
      </aside>
    </>
  );
}

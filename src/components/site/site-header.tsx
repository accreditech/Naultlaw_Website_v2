"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { ActionLink } from "@/components/site/action-link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close on Escape
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer open
  useEffect(() => {
    if (mobileOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <BrandLogo />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-5 lg:flex xl:gap-7"
          aria-label="Main navigation"
        >
          {siteConfig.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn("nav-link", isActive && "text-foreground")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <ActionLink href={siteConfig.primaryCta.href} size="sm">
            {siteConfig.primaryCta.label}
          </ActionLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-lg text-foreground lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer (wrapped so translate-x-full off-canvas state doesn't extend body scrollWidth on mobile) */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden lg:hidden">
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "pointer-events-auto absolute inset-y-0 right-0 flex w-[85vw] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <BrandLogo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex size-11 items-center justify-center rounded-lg text-foreground"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Phone block (top) */}
        {siteConfig.hasPhone && (
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-4 hover:bg-muted"
          >
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col">
              <span className="eyebrow text-muted-foreground">
                Call the Office
              </span>
              <span className="text-base font-semibold text-foreground">
                {siteConfig.phoneLabel}
              </span>
            </span>
          </a>
        )}

        {/* Nav list */}
        <nav
          className="flex-1 overflow-y-auto px-5 py-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-lg px-3 py-2.5 text-base font-medium text-foreground/75 hover:bg-muted hover:text-foreground",
                      isActive && "bg-muted text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA footer (pinned bottom) */}
        <div
          className="border-t border-border px-5 py-4"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
          }}
        >
          <ActionLink
            href={siteConfig.primaryCta.href}
            className="w-full justify-center"
          >
            {siteConfig.primaryCta.label}
          </ActionLink>
        </div>
      </aside>
      </div>
    </header>
  );
}

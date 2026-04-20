"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { ActionLink } from "@/components/site/action-link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close on route change (scroll)
  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <BrandLogo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <ActionLink href={siteConfig.primaryCta.href} size="sm">
            {siteConfig.primaryCta.label}
          </ActionLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "border-t border-border bg-background transition-all duration-200 md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav className="container-shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-border">
            <ActionLink
              href={siteConfig.primaryCta.href}
              className="w-full justify-center"
              onClick={() => setMobileOpen(false)}
            >
              {siteConfig.primaryCta.label}
            </ActionLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

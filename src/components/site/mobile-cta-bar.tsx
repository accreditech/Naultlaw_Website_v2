"use client";

import { Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom CTA bar — mobile only.
 * Call + Schedule, equal width, safe-area aware.
 * Hidden on the contact page itself (where the primary CTA is the form).
 */
export function MobileCtaBar() {
  const pathname = usePathname();

  // Suppress on contact page — the form is already the primary CTA there.
  if (pathname === "/contact" || pathname.startsWith("/contact/")) {
    return null;
  }

  const hasPhone = siteConfig.hasPhone;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
      )}
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="flex gap-2 px-3 py-2.5">
        {hasPhone && (
          <a
            href={siteConfig.phoneHref}
            className={cn(
              buttonVariants({ variant: "outlineGold", size: "default" }),
              "flex-1 min-h-11"
            )}
            aria-label={`Call ${siteConfig.phoneLabel}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
        )}
        <Link
          href={siteConfig.primaryCta.href}
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "flex-1 min-h-11"
          )}
        >
          {siteConfig.primaryCta.label}
        </Link>
      </div>
    </div>
  );
}

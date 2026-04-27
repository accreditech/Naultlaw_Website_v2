"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { recordPageView } from "@/lib/visitor-tracking";

/**
 * Mounts once in the root layout. Calls `recordPageView()` on every
 * Next.js client-side navigation so the journey + UTM context stays
 * up to date for any subsequent intake submission.
 *
 * Renders nothing — purely a side-effect component.
 */
export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    recordPageView();
    // Re-run when the route changes. searchParams is included so URL
    // parameter changes (e.g., a UTM-tagged inbound link) are captured.
  }, [pathname, searchParams]);

  return null;
}

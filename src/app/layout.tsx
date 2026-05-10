import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MobileBottomBar } from "@/components/site/mobile-bottom-bar";
import { VisitorTracker } from "@/components/site/visitor-tracker";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "NaultLaw - Home",
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  robots: siteConfig.shouldIndex
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.firmName,
  },
  // Google Search Console verification — only emitted when the env var is set.
  ...(siteConfig.hasGoogleSiteVerification
    ? {
        verification: {
          google: siteConfig.googleSiteVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileBottomBar />
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 — only loads when NEXT_PUBLIC_GA4_ID is set in
            Vercel env vars. Loads after-interactive so it does not block
            first paint. Coexists with Vercel Analytics (the two count
            traffic separately). */}
        {siteConfig.hasGa4 && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteConfig.ga4Id}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

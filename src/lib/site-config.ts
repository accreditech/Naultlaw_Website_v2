import { attorneyProfile } from "@/lib/content/attorney";

const officePhoneE164 = (process.env.NEXT_PUBLIC_OFFICE_PHONE_E164 ?? "").trim();
const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example-law-domain.com").trim() ||
  "https://www.example-law-domain.com";
const officePhoneLabel =
  (process.env.NEXT_PUBLIC_OFFICE_PHONE_LABEL ?? "[Office phone placeholder]").trim() ||
  "[Office phone placeholder]";
const intakeEmail =
  (process.env.NEXT_PUBLIC_INTAKE_EMAIL ?? "[Intake email placeholder]").trim() ||
  "[Intake email placeholder]";
const validEmail =
  intakeEmail.includes("@") && !intakeEmail.toLowerCase().includes("placeholder");
const parsedSiteUrl = (() => {
  try {
    return new URL(siteUrl);
  } catch {
    return null;
  }
})();
const siteHostname = parsedSiteUrl?.hostname.toLowerCase() ?? "";
const shouldIndexSite =
  siteHostname === "www.naultlaw.com" || siteHostname === "naultlaw.com";

export const siteConfig = {
  name: attorneyProfile.name,
  shortName: "Nault Law",
  firmName: "The Law Office of Stephen Nault",
  attorneyName: attorneyProfile.name,
  titleTemplate: "%s | Stephen C. Nault, Esq.",
  description:
    "Business, real estate, and dispute-resolution counsel for owners, investors, brokers, contractors, property managers, and real estate professionals in Sumner County and surrounding counties.",
  positioningStatement:
    "Business, real estate, and dispute-resolution counsel for owners, investors, brokers, contractors, property managers, and real estate professionals in Sumner County and surrounding counties.",
  shortBrandTone: attorneyProfile.shortBrandTone,
  url: siteUrl,
  hostname: siteHostname,
  shouldIndex: shouldIndexSite,
  isPrelaunch: !shouldIndexSite,
  phoneLabel: officePhoneLabel,
  phoneHref: officePhoneE164 ? `tel:${officePhoneE164}` : "",
  hasPhone: Boolean(officePhoneE164),
  email: intakeEmail,
  emailHref: validEmail ? `mailto:${intakeEmail}` : "",
  hasEmail: validEmail,
  headshotUrl: (process.env.NEXT_PUBLIC_HEADSHOT_URL ?? "").trim(),
  officeLabel: "121 S. Hickory Ave, Gallatin, TN 37066",
  officeAddressLines: ["121 S. Hickory Ave", "Gallatin, TN 37066"],
  officeAddress: {
    streetAddress: "121 S. Hickory Ave",
    addressLocality: "Gallatin",
    addressRegion: "TN",
    postalCode: "37066",
    addressCountry: "US",
  },
  serviceCounties: [
    "Sumner County",
    "Wilson County",
    "Robertson County",
    "Trousdale County",
  ],
  broaderServiceCounties: ["Davidson County"],
  secondaryReach: ["Nashville", "Davidson County"],
  primaryCta: {
    label: "Schedule a Consultation",
    href: "/contact",
  },
  secondaryCta: {
    label: "How the intake works",
    href: "/contact#conflict-screen",
  },
  tertiaryCta: {
    label: "Call the Office",
    href: officePhoneE164 ? `tel:${officePhoneE164}` : "/contact#office-details",
  },
  navItems: [
    { label: "Who I Help", href: "/who-i-help" },
    { label: "How I Help", href: "/practice-areas" },
    { label: "Guides", href: "/articles" },
    { label: "About", href: "/about" },
    {
      label: "Expert Witness",
      href: "/practice-areas/expert-witness-real-estate-and-brokerage-matters",
    },
    { label: "Contact", href: "/contact" },
  ],
  socialShareImageTitle:
    "Stephen C. Nault, Esq. - practical counsel for business, real estate, and difficult disputes",
  referralSources: [
    "Broker or agent referral",
    "Attorney or referral source",
    "CPA, lender, or insurance professional",
    "Former client or business contact",
    "Online search",
    "Social media",
    "Other",
  ],
  counties: [
    "Gallatin",
    "Sumner County",
    "Wilson County",
    "Robertson County",
    "Trousdale County",
    "Davidson County",
    "Other Tennessee county",
  ],
};

export const officeHours = [
  "Monday through Friday",
  "Consultations by appointment",
  "Stage-one intake is conflict-screened before detailed review",
];

/**
 * Site image registry.
 * All images live in public/images/. Reference by semantic key throughout the codebase
 * rather than hardcoding paths — makes swapping images trivial.
 */
export const siteImages = {
  // ── Headshots ──────────────────────────────────────────────────────────────
  /** About page, full-format portrait display */
  headshot: "/images/stephen-nault-headshot.jpg",
  /** Homepage circular avatar, small use contexts */
  avatar: "/images/stephen-nault-avatar.jpg",

  // ── Hero ───────────────────────────────────────────────────────────────────
  /** Homepage hero background — Gallatin-inspired town square at golden hour */
  heroPrimary: "/images/small_town_square.jpg",
  /** Homepage hero background — alternate street scene */
  heroSecondary: "/images/small_town_street.jpg",

  // ── Offices & interiors ────────────────────────────────────────────────────
  /** About page bio section supplementary photo */
  officeDeskClassic: "/images/elegant_lawyer_desk.jpg",
  /** About page authority panel subtle background */
  officeModernGrey: "/images/modern_grey_office.jpg",
  /** General office warm tones — article fallback, homepage sections */
  officeWarm: "/images/warm_modern_office.jpg",
  /** Contact page header or sidebar */
  officeConference: "/images/modern_executive_conference.jpg",
  /** Resource article fallback header */
  workspaceDesk: "/images/workspace_flat_lay.jpg",

  // ── Commercial buildings ───────────────────────────────────────────────────
  /** Default practice area page background (all 8 pages unless overridden) */
  buildingOffice: "/images/modern_office_bldg.jpg",
  /** Commercial leasing page — mixed-use override */
  buildingMixedUse: "/images/modern_commercial_mixed_bldg.jpg",
  /** Business / abstract articles — glass and steel corner */
  buildingGlass: "/images/modern_office_top_corner.jpg",
  /** Brokers & agents industry page */
  buildingBrokerage: "/images/modern_office_exterior.jpg",
  /** Investors & landlords industry page */
  buildingRetailStrip: "/images/indescript_retail_strip.jpg",
  /** Property managers industry page */
  buildingApartment: "/images/modern_apartment_bldg.jpg",

  // ── Construction ───────────────────────────────────────────────────────────
  /** Late stage completion — near-finished commercial project */
  constructionComplete: "/images/Construction_last_stages.jpg",
  /** Active construction underway — contractors industry page header */
  constructionUnderway: "/images/under_construction_office.jpg",
  /** Aerial development site — strategic case assessment page */
  constructionAerial: "/images/TN_construction_site_dirt.jpg",
  /** Construction progress mid-stage */
  constructionProgress: "/images/building_in_progress.jpg",
  /** Wide development overview — construction articles */
  constructionOverview: "/images/construction_collage.jpg",
  /** Close-up steel beam detail — contractor dispute articles */
  constructionDetail: "/images/steel_in_concrete.jpg",
  /** Sequential stages 1–6: raw land → completed building */
  constructionStage1: "/images/construction_stage_1.jpg",
  constructionStage2: "/images/construction_stage_2.jpg",
  constructionStage3: "/images/construction_stage_3.jpg",
  constructionStage4: "/images/construction_stage_4.jpg",
  constructionStage5: "/images/construction_stage_5.jpg",
  /** Best single construction image — fully finished building */
  constructionStage6: "/images/construction_stage_6.jpg",

  // ── Location pages ─────────────────────────────────────────────────────────
  locationGallatin: "/images/main_street_usa.jpg",
  locationSumnerCounty: "/images/sumner_county_golden_light.jpg",
  /** Shared between Wilson County and Robertson County */
  locationWilsonRobertson: "/images/suburban_blvd.jpg",
  locationTrousdale: "/images/charming_street_sunset.jpg",
  locationDavidson: "/images/biz_district_sunset.jpg",

  // ── Article / detail images ────────────────────────────────────────────────
  /** Business contract and leasing articles */
  articleContract: "/images/pen_contract.jpg",
  /** TREC, licensing, and structural articles */
  articleArchitecture: "/images/architecrural_corner_steel_brick.jpg",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/**
 * Per-page image assignments.
 * Used by templates to look up the correct image without hardcoding.
 */
export const pageImages = {
  // Practice areas — homepage card thumbnails (slug → image key)
  practiceAreaCards: {
    "commercial-leasing": "buildingMixedUse",
    "trec-defense-and-realtor-complaints": "buildingBrokerage",
    "operating-agreements-and-owner-disputes": "officeConference",
    "real-estate-disputes": "constructionStage6",
    "business-contract-drafting-and-review": "articleContract",
    "strategic-case-assessment": "officeDeskClassic",
    default: "buildingOffice",
  },
  // Practice areas — detail-page hero imagery (slug → image key).
  // Separate from homepage cards so detail pages can keep their own imagery
  // even when a homepage card is re-themed.
  practiceAreas: {
    "commercial-leasing": "buildingMixedUse",
    "real-estate-disputes": "constructionStage6",
    "strategic-case-assessment": "constructionAerial",
    default: "buildingOffice",
  },
  // Industries — slug → image key
  industries: {
    "brokers-and-agents": "buildingBrokerage",
    "investors-and-landlords": "buildingRetailStrip",
    "property-managers": "buildingApartment",
    "contractors": "constructionUnderway",
    default: "buildingOffice",
  },
  // Locations — slug → image key
  locations: {
    "gallatin": "locationGallatin",
    "sumner-county": "locationSumnerCounty",
    "wilson-county": "locationWilsonRobertson",
    "robertson-county": "locationWilsonRobertson",
    "trousdale-county": "locationTrousdale",
    "davidson-county": "locationDavidson",
    default: "heroPrimary",
  },
  // Resources — category → image key
  resources: {
    "commercial-leasing": "articleContract",
    "trec": "articleArchitecture",
    "business": "buildingGlass",
    "real-estate": "buildingMixedUse",
    default: "workspaceDesk",
  },
} as const;

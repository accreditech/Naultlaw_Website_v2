import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const practiceAreas = pgTable("practice_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 180 }).notNull(),
  summary: text("summary").notNull(),
  seoTitle: varchar("seo_title", { length: 180 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const resources = pgTable("resources", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  title: varchar("title", { length: 180 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body"),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  company: varchar("company", { length: 160 }),
  quote: text("quote").notNull(),
  sourceType: varchar("source_type", { length: 80 }).notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const referralSources = pgTable("referral_sources", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  label: varchar("label", { length: 180 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const pageSettings = pgTable("page_settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  title: varchar("title", { length: 180 }),
  metaDescription: text("meta_description"),
  heroEyebrow: varchar("hero_eyebrow", { length: 180 }),
  heroHeadline: varchar("hero_headline", { length: 220 }),
  heroSummary: text("hero_summary"),
  settings: jsonb("settings").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    status: varchar("status", { length: 40 }).notNull().default("new"),
    stageTwoStatus: varchar("stage_two_status", { length: 40 })
      .notNull()
      .default("planned"),
    crmSyncStatus: varchar("crm_sync_status", { length: 40 })
      .notNull()
      .default("pending"),
    name: varchar("name", { length: 180 }).notNull(),
    companyName: varchar("company_name", { length: 180 }),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    county: varchar("county", { length: 120 }).notNull(),
    opposingParties: varchar("opposing_parties", { length: 255 }).notNull(),
    practiceArea: varchar("practice_area", { length: 140 }).notNull(),
    issueType: varchar("issue_type", { length: 160 }).notNull(),
    propertyAddress: varchar("property_address", { length: 255 }),
    pendingMatter: boolean("pending_matter").notNull().default(false),
    urgencyDeadline: varchar("urgency_deadline", { length: 160 }).notNull(),
    referralSource: varchar("referral_source", { length: 160 }).notNull(),
    sourcePath: varchar("source_path", { length: 255 }),
    ipHash: varchar("ip_hash", { length: 128 }),
    userAgent: text("user_agent"),
    spamSignals: jsonb("spam_signals")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIndex: index("leads_email_idx").on(table.email),
    createdAtIndex: index("leads_created_at_idx").on(table.createdAt),
    ipIndex: index("leads_ip_hash_idx").on(table.ipHash),
  })
);

export const crmSyncLogs = pgTable(
  "crm_sync_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 40 }).notNull(),
    endpoint: varchar("endpoint", { length: 255 }),
    responseStatus: integer("response_status"),
    responseBody: text("response_body"),
    errorMessage: text("error_message"),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    leadIndex: index("crm_sync_logs_lead_idx").on(table.leadId),
  })
);

export const leadStageTwoSubmissions = pgTable(
  "lead_stage_two_submissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => leads.id, { onDelete: "cascade" }),
    practiceArea: varchar("practice_area", { length: 140 }).notNull(),
    branchTitle: varchar("branch_title", { length: 180 }).notNull(),
    status: varchar("status", { length: 40 }).notNull().default("received"),
    summary: text("summary").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    ipHash: varchar("ip_hash", { length: 128 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    leadIndex: index("lead_stage_two_submissions_lead_idx").on(table.leadId),
    createdAtIndex: index("lead_stage_two_submissions_created_at_idx").on(
      table.createdAt
    ),
  })
);

export const intakeFailures = pgTable(
  "intake_failures",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    route: varchar("route", { length: 120 }).notNull(),
    reason: text("reason").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull().default({}),
    ipHash: varchar("ip_hash", { length: 128 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    createdAtIndex: index("intake_failures_created_at_idx").on(table.createdAt),
    ipIndex: index("intake_failures_ip_hash_idx").on(table.ipHash),
  })
);

import { pgTable, text, integer, jsonb, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const assessments = pgTable("assessments", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email"),
  techStack: jsonb("tech_stack").notNull(),
  monthlyTickets: integer("monthly_tickets").notNull(),
  ticketDistribution: jsonb("ticket_distribution").notNull(),
  additionalContext: text("additional_context"),
  reportData: jsonb("report_data").notNull(),
  consentGiven: boolean("consent_given").default(false),
  consentTimestamp: timestamp("consent_timestamp"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = typeof assessments.$inferInsert;

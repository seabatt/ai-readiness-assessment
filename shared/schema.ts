import { pgTable, text, integer, jsonb, timestamp, uuid } from "drizzle-orm/pg-core";

export const assessments = pgTable("assessments", {
  id: uuid("id").defaultRandom().primaryKey(),
  techStack: jsonb("tech_stack").notNull(),
  monthlyTickets: integer("monthly_tickets").notNull(),
  ticketDistribution: jsonb("ticket_distribution").notNull(),
  additionalContext: text("additional_context"),
  reportData: jsonb("report_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = typeof assessments.$inferInsert;

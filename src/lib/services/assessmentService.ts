import { db } from "@/lib/db";
import { assessments, type Assessment, type InsertAssessment } from "../../../shared/schema";
import { eq } from "drizzle-orm";

export async function createAssessment(data: Omit<InsertAssessment, 'id' | 'createdAt'>): Promise<Assessment> {
  const [assessment] = await db
    .insert(assessments)
    .values(data)
    .returning();
  return assessment;
}

export async function getAssessmentById(id: string): Promise<Assessment | undefined> {
  const [assessment] = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, id));
  return assessment || undefined;
}

export async function getAllAssessments(): Promise<Assessment[]> {
  return await db.select().from(assessments).orderBy(assessments.createdAt);
}

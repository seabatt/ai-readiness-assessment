import { db } from '@/lib/db';
import { assessments } from '../../../shared/schema';
import { lt } from 'drizzle-orm';

const RETENTION_DAYS = 90;

/**
 * Delete assessments older than the retention period (90 days)
 * This should be run periodically via a cron job or scheduled task
 */
export async function cleanupOldAssessments() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);

    const result = await db
      .delete(assessments)
      .where(lt(assessments.createdAt, cutoffDate));

    return {
      success: true,
      message: `Deleted assessments older than ${RETENTION_DAYS} days`,
    };
  } catch (error) {
    console.error('Error cleaning up old assessments:', error);
    return {
      success: false,
      error: 'Failed to clean up old assessments',
    };
  }
}

/**
 * Get count of assessments that will be deleted
 */
export async function getAssessmentsToDelete() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);

    const result = await db
      .select()
      .from(assessments)
      .where(lt(assessments.createdAt, cutoffDate));

    return {
      count: result.length,
      cutoffDate,
    };
  } catch (error) {
    console.error('Error counting assessments to delete:', error);
    return {
      count: 0,
      cutoffDate: new Date(),
    };
  }
}

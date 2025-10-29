import { NextResponse } from 'next/server';
import { cleanupOldAssessments, getAssessmentsToDelete } from '@/lib/utils/data-retention';

/**
 * Admin endpoint to clean up old assessments
 * In production, this should be:
 * 1. Protected by authentication
 * 2. Called by a cron job/scheduled task
 * 3. Not exposed publicly
 */
export async function POST() {
  try {
    const result = await cleanupOldAssessments();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}

/**
 * Get count of assessments that will be deleted
 */
export async function GET() {
  try {
    const result = await getAssessmentsToDelete();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get cleanup info' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { assessments } from '../../../../../../shared/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { email } = await request.json();
    const { id } = params;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if assessment exists
    const [existing] = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Update assessment with email
    await db
      .update(assessments)
      .set({ email })
      .where(eq(assessments.id, id));

    return NextResponse.json({ 
      success: true,
      id
    });
  } catch (error) {
    console.error('Error updating assessment email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update email' },
      { status: 500 }
    );
  }
}

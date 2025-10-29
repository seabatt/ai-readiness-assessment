import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { assessments } from '../../../../../../shared/schema';
import { eq } from 'drizzle-orm';
import { updateEmailSchema } from '@/lib/validation/schemas';
import { ZodError } from 'zod';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;

    // Validate input
    const validatedData = updateEmailSchema.parse(body);

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

    // Update assessment with email and consent
    await db
      .update(assessments)
      .set({ 
        email: validatedData.email,
        consentGiven: true,
        consentTimestamp: validatedData.consentTimestamp ? new Date(validatedData.consentTimestamp) : new Date(),
        updatedAt: new Date()
      })
      .where(eq(assessments.id, id));

    return NextResponse.json({ 
      success: true,
      id
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update email' },
      { status: 500 }
    );
  }
}

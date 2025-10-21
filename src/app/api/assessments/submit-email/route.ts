import { NextRequest, NextResponse } from 'next/server';
import { createAssessment } from '@/lib/services/assessmentService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, techStack, monthlyTickets, ticketDistribution, additionalContext } = body;

    // Validate required fields
    if (!email || !techStack || !monthlyTickets || !ticketDistribution) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save assessment with email to database
    const assessment = await createAssessment({
      email,
      techStack,
      monthlyTickets,
      ticketDistribution,
      additionalContext,
      reportData: body, // Store full assessment data
    });

    return NextResponse.json({ 
      success: true, 
      id: assessment.id 
    });
  } catch (error) {
    console.error('Error saving assessment with email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save assessment' },
      { status: 500 }
    );
  }
}

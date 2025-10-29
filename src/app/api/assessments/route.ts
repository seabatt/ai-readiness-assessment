import { NextRequest, NextResponse } from "next/server";
import { createAssessment } from "@/lib/services/assessmentService";
import { createAssessmentSchema } from "@/lib/validation/schemas";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(req.headers);
    const rateLimit = checkRateLimit(clientIp, {
      maxRequests: 10,
      windowMs: 60 * 60 * 1000, // 10 assessments per hour
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimit.reset).toISOString(),
          },
        }
      );
    }

    const data = await req.json();
    
    // Validate input
    const validatedData = createAssessmentSchema.parse(data);
    
    const assessment = await createAssessment({
      techStack: validatedData.techStack,
      monthlyTickets: validatedData.monthlyTickets,
      ticketDistribution: validatedData.ticketDistribution,
      additionalContext: validatedData.additionalContext || null,
      reportData: validatedData.reportData,
    });
    
    return NextResponse.json(
      { 
        success: true, 
        id: assessment.id 
      },
      {
        headers: {
          'X-RateLimit-Limit': rateLimit.limit.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.reset).toISOString(),
        },
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}

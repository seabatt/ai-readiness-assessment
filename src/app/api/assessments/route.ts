import { NextRequest, NextResponse } from "next/server";
import { createAssessment } from "@/lib/services/assessmentService";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const assessment = await createAssessment({
      techStack: data.techStack,
      monthlyTickets: data.monthlyTickets,
      ticketDistribution: data.ticketDistribution,
      additionalContext: data.additionalContext || null,
      reportData: data.reportData,
    });
    
    return NextResponse.json({ 
      success: true, 
      id: assessment.id 
    });
  } catch (error) {
    console.error("Error saving assessment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save assessment" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAssessmentById } from "@/lib/services/assessmentService";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const assessment = await getAssessmentById(params.id);
    
    if (!assessment) {
      return NextResponse.json(
        { success: false, error: "Assessment not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: assessment 
    });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch assessment" },
      { status: 500 }
    );
  }
}

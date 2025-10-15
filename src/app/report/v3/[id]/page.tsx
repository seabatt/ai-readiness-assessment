"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentData, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { generateOpportunities, getTop5Opportunities, calculateTotalDeflection } from "@/lib/opportunityEngine";
import ExecutiveSummary from "@/components/assessment/report/v3/ExecutiveSummary";
import OpportunityAnalysis from "@/components/assessment/report/v3/OpportunityAnalysis";
import BestFitUseCases from "@/components/assessment/report/v3/BestFitUseCases";
import GetStartedRoadmap from "@/components/assessment/report/v3/GetStartedRoadmap";
import ExpectedOutcomes from "@/components/assessment/report/v3/ExpectedOutcomes";
import CustomReportCTA from "@/components/assessment/report/v3/CustomReportCTA";
import UnlockReportModal from "@/components/cta/UnlockReportModal";

export default function ReportV3Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<ReadinessScore | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Get data from sessionStorage
    const dataStr = sessionStorage.getItem("assessmentData");
    if (!dataStr) {
      router.push("/");
      return;
    }

    const data: AssessmentData = JSON.parse(dataStr);
    setAssessmentData(data);

    // Calculate score
    setTimeout(() => {
      const calcScore = calculateReadinessScore(data);
      setScore(calcScore);
      setLoading(false);
    }, 3000);

    // Show modal after 45 seconds
    const modalTimer = setTimeout(() => {
      setShowModal(true);
    }, 45000);

    return () => clearTimeout(modalTimer);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent-blue border-t-transparent mb-8" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Analyzing your environment...
          </h2>
          <p className="text-text-secondary">
            Running AI Worker readiness analysis
          </p>
        </div>
      </div>
    );
  }

  if (!score || !assessmentData) return null;

  // Generate automation opportunities
  const topOpportunities = getTop5Opportunities(assessmentData);
  const allOpportunities = generateOpportunities(assessmentData);
  const estimatedDeflection = calculateTotalDeflection(topOpportunities);

  // Calculate impact metrics
  const totalTickets = parseInt(assessmentData.ticketVolume.split("-")[0]) || 1000;
  const hoursSaved = Math.round((totalTickets * 12 * estimatedDeflection * 0.75) / 100);
  const fteImpact = parseFloat((hoursSaved / 2080).toFixed(1));

  // Check if they have approval workflows
  const hasApprovalWorkflows =
    assessmentData.approvalWorkflows === "automated" ||
    assessmentData.approvalWorkflows === "manual";

  return (
    <main className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">
                AI Worker Readiness Assessment
              </h1>
              <p className="text-xl text-gray-400">
                Your assessment and get-started plan
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Report Version</div>
              <div className="text-2xl font-bold text-white">V3.0</div>
            </div>
          </div>
        </div>

        {/* New V3 Narrative Flow */}
        <ExecutiveSummary
          score={score}
          assessmentData={assessmentData}
          estimatedDeflection={estimatedDeflection}
          hoursSaved={hoursSaved}
          fteImpact={fteImpact}
        />

        <OpportunityAnalysis
          topOpportunities={topOpportunities}
          estimatedDeflection={estimatedDeflection}
          techStack={assessmentData.techStack}
        />

        <BestFitUseCases
          opportunities={allOpportunities}
          techStack={assessmentData.techStack}
        />

        <GetStartedRoadmap
          topOpportunities={topOpportunities}
          hasApprovalWorkflows={hasApprovalWorkflows}
          techStack={assessmentData.techStack}
        />

        <ExpectedOutcomes
          estimatedDeflection={estimatedDeflection}
          hoursSaved={hoursSaved}
          fteImpact={fteImpact}
        />

        <CustomReportCTA onRequestDiscovery={() => setShowModal(true)} />
      </div>

      {/* Modal */}
      {showModal && (
        <UnlockReportModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}

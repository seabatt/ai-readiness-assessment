"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentData, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { generateOpportunities, getTop5Opportunities, calculateTotalDeflection } from "@/lib/opportunityEngine";
import ExecutiveSummary from "@/components/assessment/report/v2/ExecutiveSummary";
import WhereAutomationsWin from "@/components/assessment/report/v2/WhereAutomationsWin";
import AIWorkerSwimlanes from "@/components/assessment/report/v2/AIWorkerSwimlanes";
import TechStackCoverage from "@/components/assessment/report/v2/TechStackCoverage";
import GuardrailsGovernance from "@/components/assessment/report/v2/GuardrailsGovernance";
import PilotProjection from "@/components/assessment/report/v2/PilotProjection";
import DiscoveryCTA from "@/components/assessment/report/v2/DiscoveryCTA";
import UnlockReportModal from "@/components/cta/UnlockReportModal";

export default function ReportV2Page() {
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

    // Show modal after 45 seconds (longer for V2)
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
            Generating your comprehensive automation roadmap
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
          <button
            onClick={() => router.push("/report/new")}
            className="text-text-tertiary hover:text-text-primary mb-4 flex items-center gap-2"
          >
            ← Back to Summary Report
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">
                AI Automation Readiness Report
              </h1>
              <p className="text-xl text-gray-400">
                Your comprehensive roadmap to autonomous IT operations
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Report Version</div>
              <div className="text-2xl font-bold text-white">V2.0</div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <ExecutiveSummary
          score={score}
          topOpportunities={topOpportunities}
          estimatedDeflection={estimatedDeflection}
          hoursSaved={hoursSaved}
          fteImpact={fteImpact}
        />

        {/* Where Automations Win First */}
        <WhereAutomationsWin />

        {/* AI Worker Swimlanes */}
        <AIWorkerSwimlanes opportunities={allOpportunities} />

        {/* Tech Stack Coverage */}
        <TechStackCoverage selectedTools={assessmentData.techStack} />

        {/* Guardrails & Governance */}
        <GuardrailsGovernance hasApprovalWorkflows={hasApprovalWorkflows} />

        {/* Pilot Projection */}
        <PilotProjection />

        {/* Discovery CTA */}
        <DiscoveryCTA onRequestDiscovery={() => setShowModal(true)} />

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">
            This report is based on anonymized IT automation data and your self-reported inputs.
          </p>
          <p>
            For 100% accurate results, request a custom discovery report with actual ticket analysis.
          </p>
        </div>
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

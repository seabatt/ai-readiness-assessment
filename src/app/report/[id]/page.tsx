"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentData, MatchedWorker, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { matchAIWorkers, calculateProjectedImpact } from "@/lib/workerMatcher";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ScoreCircle from "@/components/assessment/report/ScoreCircle";
import ScoreBreakdown from "@/components/assessment/report/ScoreBreakdown";
import StatsImpactBanner from "@/components/assessment/report/StatsImpactBanner";
import AIWorkerCardCondensed from "@/components/assessment/report/AIWorkerCardCondensed";
import ImpactMetrics from "@/components/assessment/report/ImpactMetrics";
import UnlockReportModal from "@/components/cta/UnlockReportModal";

export default function ReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<ReadinessScore | null>(null);
  const [workers, setWorkers] = useState<MatchedWorker[]>([]);
  const [impact, setImpact] = useState<any>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null,
  );
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

    // Calculate score and matches
    setTimeout(() => {
      const calcScore = calculateReadinessScore(data);
      const matchedWorkers = matchAIWorkers(data);
      const projectedImpact = calculateProjectedImpact(matchedWorkers);

      setScore(calcScore);
      setWorkers(matchedWorkers);
      setImpact(projectedImpact);
      setLoading(false);
    }, 3000);

    // Show modal after 30 seconds
    const modalTimer = setTimeout(() => {
      setShowModal(true);
    }, 30000);

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
          <p className="text-text-secondary">Generating your readiness score</p>
        </div>
      </div>
    );
  }

  if (!score || !assessmentData) return null;

  // Get top workers for display
  const topWorkers = workers
    .filter(
      (w) => w.deploymentPhase === "week-1" || w.deploymentPhase === "month-2",
    )
    .slice(0, 9);

  // Calculate stats for banner
  const totalTickets =
    parseInt(assessmentData.ticketVolume.split("-")[0]) || 1000;
  const ticketDeflection = Math.round(
    (impact.phase2.ticketsHandled / totalTickets) * 100,
  );
  const hoursSavedYearly = impact.phase2.timeSaved * 12;

  return (
    <main className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => router.push("/assessment")}
            className="text-text-tertiary hover:text-text-primary mb-4 flex items-center gap-2"
          >
            ← Back to Assessment
          </button>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Your Readiness Report
          </h1>
          <p className="text-text-secondary">
            Here's how ready your organization is for autonomous AI workers
          </p>
        </div>

        {/* Hero Section - Overall Readiness Score + Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Overall Score */}
          <Card className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-text-primary mb-8">
              Overall Readiness Score
            </h2>
            <ScoreCircle score={score.total} rating={score.rating} />
          </Card>

          {/* Score Breakdown */}
          <ScoreBreakdown
            scores={score}
            techStackCount={assessmentData.techStack.length}
            hasApprovalWorkflows={
              assessmentData.approvalWorkflows === "automated" ||
              assessmentData.approvalWorkflows === "manual"
            }
            repetitivePercentage={assessmentData.repetitivePercentage}
          />
        </div>

        {/* Estimated Impact Banner */}
        <StatsImpactBanner
          ticketDeflection={ticketDeflection}
          hoursSaved={hoursSavedYearly}
          costSavings={impact.phase2.costSaved}
          fteEquivalent={impact.phase2.ftesSaved}
          confidence="Low (~40%)"
        />

        {/* Automation Opportunities */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Your Automation Opportunities
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              Based on your tech stack and workflows, here's what autonomous AI
              workers can handle
            </p>
          </div>

          {/* 3-column grid of AI Workers */}
          <div className="grid md:grid-cols-3 gap-6">
            {topWorkers.map((worker, index) => (
              <AIWorkerCardCondensed
                key={worker.id}
                worker={worker}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* Projected Impact */}
        {impact && (
          <ImpactMetrics phase1={impact.phase1} phase2={impact.phase2} />
        )}

        {/* CTA Section - Condensed */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-accent-blue/10 to-accent-green/10 border-accent-blue/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Want 100% Accurate Results?
              </h2>
              <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
                We'll analyze your actual ticket data and show you precise
                automation opportunities—down to the ticket category.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <span className="text-accent-green text-xl">✓</span>
                  <span className="text-sm text-text-secondary">
                    Exact ticket categories to automate
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-green text-xl">✓</span>
                  <span className="text-sm text-text-secondary">
                    ROI projections for your team
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent-green text-xl">✓</span>
                  <span className="text-sm text-text-secondary">
                    Custom 90-day roadmap
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowModal(true)}
                className="text-lg px-8 py-4"
              >
                Get My Custom Discovery Report
              </Button>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-text-tertiary">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Private & secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>1,000+ IT teams assessed</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Unlock Report Modal */}
      <UnlockReportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}

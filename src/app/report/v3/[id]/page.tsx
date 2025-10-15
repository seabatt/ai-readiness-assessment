"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentData, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { generateOpportunities, getTop5Opportunities, calculateTotalDeflection } from "@/lib/opportunityEngine";
import { FeasibilityEngine, FeasibilityResult } from "@/lib/engines/feasibility-engine";
import { UseCaseMatcher, MatchedUseCase } from "@/lib/engines/use-case-matcher";
import { ROICalculator, ROIResult } from "@/lib/engines/roi-calculator";
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
  
  // New engine results
  const [feasibilityResults, setFeasibilityResults] = useState<FeasibilityResult[]>([]);
  const [matchedUseCases, setMatchedUseCases] = useState<MatchedUseCase[]>([]);
  const [roiResult, setRoiResult] = useState<ROIResult | null>(null);

  useEffect(() => {
    // Get data from sessionStorage
    const dataStr = sessionStorage.getItem("assessmentData");
    if (!dataStr) {
      router.push("/");
      return;
    }

    const data: AssessmentData = JSON.parse(dataStr);
    setAssessmentData(data);

    // Calculate score and run engines
    setTimeout(() => {
      const calcScore = calculateReadinessScore(data);
      setScore(calcScore);
      
      // Initialize engines
      const feasibilityEngine = new FeasibilityEngine();
      const useCaseMatcher = new UseCaseMatcher();
      const roiCalculator = new ROICalculator();
      
      // Convert tech stack to tools format
      const tools = data.techStack?.map(toolName => ({
        name: toolName,
        license_tier: 'standard' // Default tier, could be enhanced later
      })) || [];
      
      // Convert ticket distribution to activities format
      const activities = [];
      if (data.ticketDistribution && data.monthlyTickets) {
        const categoryMapping: Record<string, {key: string, ttr: number}> = {
          applications: {key: 'app_access', ttr: 1.7},
          hardware: {key: 'hardware', ttr: 2.5},
          onboarding: {key: 'onboarding', ttr: 4.0},
          distributionLists: {key: 'distribution_lists', ttr: 0.75},
          network: {key: 'network', ttr: 1.5},
          security: {key: 'security', ttr: 3.0}
        };
        
        for (const [key, percentage] of Object.entries(data.ticketDistribution)) {
          const mapping = categoryMapping[key];
          if (mapping && percentage > 0) {
            activities.push({
              category: mapping.key,
              monthly_volume: Math.round((data.monthlyTickets * percentage) / 100),
              avg_ttr_hours: mapping.ttr
            });
          }
        }
      }
      
      // Run analysis engines
      const feasibility = feasibilityEngine.analyzeStack(tools);
      const matches = useCaseMatcher.matchUseCases(activities, feasibility);
      const roi = roiCalculator.calculateROI(data.monthlyTickets || 1000, matches);
      
      // Store results
      setFeasibilityResults(feasibility);
      setMatchedUseCases(matches);
      setRoiResult(roi);
      
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
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-highlight border-t-transparent mb-8" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Analyzing your environment...
          </h2>
          <p className="text-text-tertiary">
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
    <main className="min-h-screen bg-bg-primary py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-text-primary mb-3">
                AI Worker Readiness Assessment
              </h1>
              <p className="text-xl text-text-tertiary">
                Your assessment and get-started plan
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-text-tertiary">Report Version</div>
              <div className="text-2xl font-bold text-text-primary">V3.0</div>
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

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        <OpportunityAnalysis
          topOpportunities={topOpportunities}
          estimatedDeflection={estimatedDeflection}
          techStack={assessmentData.techStack}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        <BestFitUseCases
          opportunities={allOpportunities}
          techStack={assessmentData.techStack}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        <GetStartedRoadmap
          topOpportunities={topOpportunities}
          hasApprovalWorkflows={hasApprovalWorkflows}
          techStack={assessmentData.techStack}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        <ExpectedOutcomes
          estimatedDeflection={estimatedDeflection}
          hoursSaved={hoursSaved}
          fteImpact={fteImpact}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

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

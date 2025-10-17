"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AssessmentData, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { FeasibilityEngine, FeasibilityResult } from "@/lib/engines/feasibility-engine";
import { UseCaseMatcher, MatchedUseCase } from "@/lib/engines/use-case-matcher";
import { ROICalculator, ROIResult } from "@/lib/engines/roi-calculator";
import ExecutiveSummary from "@/components/assessment/report/v4/ExecutiveSummary";
import OpportunityAnalysis from "@/components/assessment/report/v4/OpportunityAnalysis";
import BestFitUseCases from "@/components/assessment/report/v4/BestFitUseCases";
import ROIBreakdown from "@/components/assessment/report/v4/ROIBreakdown";
import GetStartedPlan from "@/components/assessment/report/v4/GetStartedPlan";
import ExpectedOutcomes from "@/components/assessment/report/v4/ExpectedOutcomes";
import CustomReportCTA from "@/components/assessment/report/v4/CustomReportCTA";
import UnlockReportModal from "@/components/cta/UnlockReportModal";

export default function ReportV4Page() {
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

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-bg-card-alt/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image 
              src="/images/aiwork-logo.png" 
              alt="ai.work" 
              width={120} 
              height={30}
              className="h-7 w-auto"
            />
          </Link>
          <div className="text-right">
            <div className="text-xs text-text-tertiary">Report Version</div>
            <div className="text-lg font-bold text-text-primary">V4.0</div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Report Header */}
          <div className="mb-20">
            <h1 className="text-5xl font-normal text-text-primary mb-3">
              AI Worker Readiness Assessment
            </h1>
            <p className="text-xl text-text-tertiary">
              Based on your {assessmentData.techStack?.length || 0} selected tools and {(assessmentData.monthlyTickets || 0).toLocaleString()} monthly tickets
            </p>
          </div>

        {/* Executive Summary - Hero Section */}
        {roiResult && (
          <ExecutiveSummary
            roiResult={roiResult}
            totalMonthlyTickets={assessmentData.monthlyTickets || 1000}
            assessmentData={{
              techStack: assessmentData.techStack || [],
              additionalContext: assessmentData.additionalContext
            }}
            matchedUseCases={matchedUseCases}
          />
        )}

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        {/* What You Can Automate Right Now */}
        <OpportunityAnalysis
          matchedUseCases={matchedUseCases}
          feasibilityResults={feasibilityResults}
          topN={10}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        {/* ROI Breakdown */}
        {roiResult && (
          <>
            <ROIBreakdown 
              roiResult={roiResult}
              feasibilityResults={feasibilityResults}
            />
            <div className="border-t border-bg-card-alt/20 mb-20"></div>
          </>
        )}

        {/* How to Get Started */}
        <GetStartedPlan
          matchedUseCases={matchedUseCases}
        />

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        {/* What To Expect */}
        {roiResult && (
          <ExpectedOutcomes
            roiResult={roiResult}
            totalMonthlyTickets={assessmentData.monthlyTickets || 1000}
          />
        )}

        <div className="border-t border-bg-card-alt/20 mb-20"></div>

        {/* Call to Action Section */}
        <CustomReportCTA onRequestDiscovery={() => setShowModal(true)} />
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <UnlockReportModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

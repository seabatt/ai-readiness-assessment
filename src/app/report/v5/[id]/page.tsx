"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AssessmentData, ReadinessScore } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import {
  FeasibilityEngine,
  FeasibilityResult,
} from "@/lib/engines/feasibility-engine";
import { UseCaseMatcher, MatchedUseCase } from "@/lib/engines/use-case-matcher";
import { ROICalculator, ROIResult } from "@/lib/engines/roi-calculator";
import ExecutiveSummary from "@/components/assessment/report/v5/ExecutiveSummary";
import OpportunityAnalysis from "@/components/assessment/report/v5/OpportunityAnalysis";
import ExpectedOutcomes from "@/components/assessment/report/v5/ExpectedOutcomes";
import CustomReportCTA from "@/components/assessment/report/v5/CustomReportCTA";

export default function ReportV5Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<ReadinessScore | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(
    null,
  );
  const [copied, setCopied] = useState(false);

  const [feasibilityResults, setFeasibilityResults] = useState<
    FeasibilityResult[]
  >([]);
  const [matchedUseCases, setMatchedUseCases] = useState<MatchedUseCase[]>([]);
  const [roiResult, setRoiResult] = useState<ROIResult | null>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const dataStr = sessionStorage.getItem("assessmentData");
    if (!dataStr) {
      router.push("/");
      return;
    }

    const data: AssessmentData = JSON.parse(dataStr);
    setAssessmentData(data);

    setTimeout(() => {
      const calcScore = calculateReadinessScore(data);
      setScore(calcScore);

      const feasibilityEngine = new FeasibilityEngine();
      const useCaseMatcher = new UseCaseMatcher();
      const roiCalculator = new ROICalculator();

      const tools =
        data.techStack?.map((toolName) => ({
          name: toolName,
          license_tier: "standard",
        })) || [];

      const activities = [];
      if (data.ticketDistribution && data.monthlyTickets) {
        const categoryMapping: Record<string, { key: string; ttr: number }> = {
          applications: { key: "app_access", ttr: 1.7 },
          hardware: { key: "hardware", ttr: 2.5 },
          onboarding: { key: "onboarding", ttr: 4.0 },
          distributionLists: { key: "distribution_lists", ttr: 0.75 },
          network: { key: "network", ttr: 1.5 },
          security: { key: "security", ttr: 3.0 },
        };

        for (const [key, percentage] of Object.entries(
          data.ticketDistribution,
        )) {
          const mapping = categoryMapping[key];
          if (mapping && percentage > 0) {
            activities.push({
              category: mapping.key,
              monthly_volume: Math.round(
                (data.monthlyTickets * percentage) / 100,
              ),
              avg_ttr_hours: mapping.ttr,
            });
          }
        }
      }

      const feasibility = feasibilityEngine.analyzeStack(tools);
      const matches = useCaseMatcher.matchUseCases(activities, feasibility);
      const roi = roiCalculator.calculateROI(
        data.monthlyTickets || 1000,
        matches,
      );

      setFeasibilityResults(feasibility);
      setMatchedUseCases(matches);
      setRoiResult(roi);
      setLoading(false);
    }, 3000);
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
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-highlight"></span>
            <span className="text-sm">
              {copied ? "Copied!" : "Share this"}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Heading */}
          <div className="mb-20">
            <h1 className="text-5xl font-normal text-text-primary mb-3">
              AI Worker Readiness Blueprint
            </h1>
            <p className="text-xl text-text-tertiary">
              Derived from your {assessmentData.techStack?.length || 0}{" "}
              connected tools and{" "}
              {(assessmentData.monthlyTickets || 0).toLocaleString()} monthly
              tickets, this blueprint maps automation opportunities, readiness
              insights, and next steps for deploying AI Workers across your
              enterprise stack.
            </p>
          </div>

          {/* Hero Statistics */}
          {roiResult && (
            <ExecutiveSummary
              roiResult={roiResult}
              totalMonthlyTickets={assessmentData.monthlyTickets || 1000}
            />
          )}

          {/* Use Case Cards */}
          <OpportunityAnalysis
            matchedUseCases={matchedUseCases}
            feasibilityResults={feasibilityResults}
            topN={10}
          />

          <div className="border-t border-bg-card-alt/20 mb-20"></div>

          {/* What to Expect */}
          {roiResult && (
            <ExpectedOutcomes
              roiResult={roiResult}
              totalMonthlyTickets={assessmentData.monthlyTickets || 1000}
            />
          )}

          <div className="border-t border-bg-card-alt/20 mb-20"></div>

          {/* Call to Action */}
          <CustomReportCTA />
        </div>
      </main>
    </div>
  );
}

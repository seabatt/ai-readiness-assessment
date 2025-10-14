"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AssessmentData } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import { matchAIWorkers, calculateProjectedImpact } from "@/lib/workerMatcher";
import ScoreCircle from "@/components/assessment/report/ScoreCircle";
import ExecutiveSummary from "@/components/assessment/report/ExecutiveSummary";
import AIWorkerCard from "@/components/assessment/report/AIWorkerCard";
import ImpactMetrics from "@/components/assessment/report/ImpactMetrics";
import ComparisonTable from "@/components/assessment/report/ComparisonTable";
import Button from "@/components/ui/Button";
import { ArrowRight, Download, Share2 } from "lucide-react";

export default function ReportPage() {
  const router = useRouter();
  const [assessmentData, setAssessmentData] =
    React.useState<AssessmentData | null>(null);

  // Load assessment data from sessionStorage
  React.useEffect(() => {
    const data = sessionStorage.getItem("assessmentData");
    if (data) {
      setAssessmentData(JSON.parse(data));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!assessmentData) {
    return null;
  }

  // Calculate readiness score
  const readinessScore = calculateReadinessScore(assessmentData);

  // Match AI Workers to user's tech stack and workflows
  const matchedWorkers = matchAIWorkers(assessmentData);

  // Calculate projected impact
  const projectedImpact = calculateProjectedImpact(matchedWorkers);

  // Get top 8 workers to display
  const topWorkers = matchedWorkers.slice(0, 8);

  // Separate by deployment phase
  const week1Workers = topWorkers.filter((w) => w.deploymentPhase === "week-1");
  const month2Workers = topWorkers.filter(
    (w) => w.deploymentPhase === "month-2",
  );
  const month4Workers = topWorkers.filter(
    (w) => w.deploymentPhase === "month-4",
  );

  // Calculate average ticket volume for display
  const volumeParts = assessmentData.ticketVolume.split("-");
  const avgTicketVolume = Math.round(
    (parseInt(volumeParts[0]) + parseInt(volumeParts[1])) / 2,
  );

  // Calculate percentages for comparison
  const readinessVsAvg = Math.round(((readinessScore.total - 55) / 55) * 100);
  const readinessVsTop = Math.round(((85 - readinessScore.total) / 85) * 100);

  // Calculate tech stack compatibility percentage for comparison table
  const techStackPercentage = Math.round(
    (readinessScore.techStackScore / 40) * 100,
  );

  // Calculate deflection potential percentage for comparison table
  const deflectionPotential = Math.round(
    (projectedImpact.phase2.ticketsHandled / avgTicketVolume) * 100,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-elevated">
      {/* Header */}
      <div className="bg-bg-primary border-b border-brand-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-text-primary">
              Your IT Automation Readiness Score
            </h1>
            <div className="flex gap-3">
              <Button variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="secondary">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Score Circle */}
        <div className="max-w-5xl mx-auto mb-16">
          <ScoreCircle
            score={readinessScore.total}
            rating={readinessScore.rating}
          />
        </div>

        {/* SECTION 1: Executive Summary */}
        <div className="mb-16">
          <ExecutiveSummary
            scores={readinessScore}
            ticketVolume={avgTicketVolume}
            teamSize={assessmentData.teamSize}
          />
        </div>

        {/* SECTION 2: Your Automation Opportunities */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            Your Automation Opportunities
          </h2>
          <p className="text-text-secondary mb-8">
            Based on your tech stack and workflows, here's what autonomous AI
            workers can handle:
          </p>

          {/* High-Impact Workers (Deploy First - 4 weeks) - Red indicator */}
          {week1Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-text-primary">
                  High-Impact (Deploy First - 4 weeks)
                </h3>
              </div>
              <div className="grid gap-6">
                {week1Workers.map((worker, idx) => (
                  <AIWorkerCard
                    key={worker.id}
                    worker={worker}
                    rank={idx + 1}
                    isTopWorkflow={
                      idx === 0 &&
                      assessmentData.topWorkflows[0] &&
                      worker.relatedWorkflows?.includes(
                        assessmentData.topWorkflows[0],
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Medium-Impact Workers (Deploy Month 2-3) - Yellow indicator */}
          {month2Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-text-primary">
                  Medium-Impact (Deploy Month 2-3)
                </h3>
              </div>
              <div className="grid gap-6">
                {month2Workers.map((worker, idx) => (
                  <AIWorkerCard
                    key={worker.id}
                    worker={worker}
                    rank={week1Workers.length + idx + 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Wins (Deploy Month 1) - Green indicator */}
          {month4Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-text-primary">
                  Quick Wins (Deploy Month 1)
                </h3>
              </div>
              <div className="grid gap-6">
                {month4Workers.map((worker, idx) => (
                  <AIWorkerCard
                    key={worker.id}
                    worker={worker}
                    rank={week1Workers.length + month2Workers.length + idx + 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: Your Projected Impact */}
        <div className="mb-16">
          <ImpactMetrics
            phase1={projectedImpact.phase1}
            phase2={projectedImpact.phase2}
          />
        </div>

        {/* SECTION 4: Comparison to Peers */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            How You Stack Up
          </h2>
          <ComparisonTable
            userScore={readinessScore.total}
            techStackScore={techStackPercentage}
            deflectionPotential={deflectionPotential}
          />
          <div className="mt-6 p-4 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
            <p className="text-sm text-text-secondary">
              <strong className="text-text-primary">Key Insight:</strong> You're{" "}
              {Math.abs(readinessVsAvg)}%{" "}
              {readinessVsAvg > 0 ? "more ready" : "less ready"} than average
              but {Math.abs(readinessVsTop)}% behind industry leaders. The gap?
              Orchestration across your existing tools.
            </p>
          </div>
        </div>

        {/* SECTION 5: Your Missing Pieces */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            Your Missing Pieces
          </h2>
          <p className="text-text-secondary mb-6">
            To reach 85+ readiness score, consider:
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Strengths */}
            <div className="p-6 bg-accent-green/10 rounded-lg border border-accent-green/20">
              <h3 className="text-lg font-bold text-accent-green mb-4 flex items-center gap-2">
                ✅ Your Strengths
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                {assessmentData.techStack.includes("okta") && (
                  <li>
                    • Okta as identity hub (unlocks 70% of access automation)
                  </li>
                )}
                {(assessmentData.techStack.includes("servicenow") ||
                  assessmentData.techStack.includes("jira")) && (
                  <li>
                    •{" "}
                    {assessmentData.techStack.includes("servicenow")
                      ? "ServiceNow"
                      : "Jira"}{" "}
                    +
                    {assessmentData.techStack.includes("jira") &&
                    assessmentData.techStack.includes("servicenow")
                      ? " dual setup"
                      : ""}{" "}
                    (good coverage)
                  </li>
                )}
                {assessmentData.techStack.includes("google-workspace") && (
                  <li>
                    • Google Workspace (strong collaboration automation
                    potential)
                  </li>
                )}
                {assessmentData.techStack.includes("slack") && (
                  <li>• Slack for real-time communication automation</li>
                )}
                {assessmentData.techStack.length >= 5 && (
                  <li>
                    • Strong integration ecosystem (
                    {assessmentData.techStack.length} tools)
                  </li>
                )}
              </ul>
            </div>

            {/* Integration Gaps */}
            <div className="p-6 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
              <h3 className="text-lg font-bold text-yellow-700 mb-4 flex items-center gap-2">
                ⚠️ Integration Gaps
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                {!assessmentData.techStack.includes("slack") &&
                  !assessmentData.techStack.includes("microsoft-teams") && (
                    <li>• No team chat platform for real-time automation</li>
                  )}
                {!assessmentData.techStack.includes("okta") &&
                  !assessmentData.techStack.includes("microsoft-entra") && (
                    <li>
                      • Missing centralized identity provider (limits access
                      automation)
                    </li>
                  )}
                {assessmentData.techStack.includes("slack") &&
                  assessmentData.techStack.length < 5 && (
                    <li>
                      • Your Slack isn't enterprise-tier (limits admin API for
                      channel automation)
                    </li>
                  )}
                {assessmentData.approvalWorkflows === "none" && (
                  <li>
                    • No formal approval workflows (limits advanced automation)
                  </li>
                )}
                {!assessmentData.techStack.some((t) =>
                  ["notion", "confluence"].includes(t),
                ) && (
                  <li>
                    • Hardware asset tracking isn't centralized (limits
                    onboarding automation)
                  </li>
                )}
              </ul>
            </div>

            {/* Recommended Tools */}
            <div className="p-6 bg-accent-blue/10 rounded-lg border border-accent-blue/20">
              <h3 className="text-lg font-bold text-accent-blue mb-4 flex items-center gap-2">
                ❌ Not Using (but recommended)
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                {!assessmentData.techStack.includes("linear") &&
                  !assessmentData.techStack.includes("monday") && (
                    <li>• Linear or Monday.com for project/task automation</li>
                  )}
                {!assessmentData.techStack.includes("docusign") && (
                  <li>• DocuSign for approval workflow automation</li>
                )}
                {!assessmentData.techStack.includes("notion") &&
                  !assessmentData.techStack.includes("confluence") && (
                    <li>• Notion/Confluence for knowledge base automation</li>
                  )}
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 6: Call to Action */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-accent-blue to-accent-purple rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Want a 100% Accurate Assessment?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                This report is based on industry benchmarks. We can analyze YOUR
                actual ticket data to show you precise automation
                opportunities—down to the ticket category.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left">
                <h3 className="text-lg font-bold mb-4">
                  Let us analyze your IT tickets for one week. We'll deliver a
                  custom discovery report showing:
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green mt-1">✓</span>
                    <span>Exact ticket categories that can be automated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green mt-1">✓</span>
                    <span>Precise time savings by workflow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green mt-1">✓</span>
                    <span>ROI projections specific to your team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent-green mt-1">✓</span>
                    <span>Implementation roadmap</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h4 className="font-bold mb-3">What We Need:</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Read-only access to your ITSM (Jira/ServiceNow)</li>
                  <li>• 30-minute kickoff call</li>
                  <li>• 1-week observation period</li>
                </ul>
              </div>

              <Button
                variant="primary"
                onClick={() => router.push("/contact")}
                className="bg-white text-accent-blue hover:bg-white/90"
              >
                Get My Custom Discovery Report
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
                <span>🔒 Your data stays private—deleted after analysis</span>
                <span>✓ No commitment required</span>
                <span>📊 1,000+ IT teams assessed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
      </div>
    </div>
  );
}

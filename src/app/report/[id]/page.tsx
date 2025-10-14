'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { AssessmentData } from "@/types";
import { calculateReadinessScore } from "@/lib/scoringAlgorithm";
import {
  matchAIWorkers,
  calculateProjectedImpact,
} from "@/lib/workerMatcher";
import ScoreCircle from "@/components/assessment/report/ScoreCircle";
import ExecutiveSummary from "@/components/assessment/report/ExecutiveSummary";
import AIWorkerCard from "@/components/assessment/report/AIWorkerCard";
import BeforeAfterTimeline from "@/components/assessment/report/BeforeAfterTimeline";
import ImpactMetrics from "@/components/assessment/report/ImpactMetrics";
import ComparisonTable from "@/components/assessment/report/ComparisonTable";
import Button from "@/components/ui/Button";
import { ArrowRight, Download, Share2 } from "lucide-react";

export default function ReportPage() {
  const router = useRouter();
  const [assessmentData, setAssessmentData] = React.useState<AssessmentData | null>(null);

  // Load assessment data from sessionStorage
  React.useEffect(() => {
    const data = sessionStorage.getItem('assessmentData');
    if (data) {
      setAssessmentData(JSON.parse(data));
    } else {
      router.push('/');
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

  // Calculate total annual impact
  const annualSavings = projectedImpact.phase2.costSaved * 12;
  const annualTimeSaved = projectedImpact.phase2.timeSaved * 12;

  // Calculate percentages for comparison
  const readinessVsAvg = Math.round(((readinessScore.total - 55) / 55) * 100);
  const readinessVsTop = Math.round(((85 - readinessScore.total) / 85) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
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
        <div className="mb-12">
          <ScoreCircle
            score={readinessScore.total}
            rating={readinessScore.rating}
          />
        </div>

        {/* Executive Summary */}
        <div className="mb-12">
          <ExecutiveSummary
            scores={readinessScore}
            ticketVolume={parseInt(assessmentData.ticketVolume.split('-')[0]) || 0}
            teamSize={assessmentData.teamSize}
          />
        </div>

        {/* AI Workers Section - SECTION 2 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Automation Opportunities
          </h2>
          <p className="text-gray-600 mb-8">
            Based on your tech stack and workflows, here's what autonomous AI
            workers can handle:
          </p>

          {/* High-Impact Workers (Week 1) - Red indicator */}
          {week1Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">
                  High-Impact (Deploy First - 4 weeks)
                </h3>
              </div>
              <div className="grid gap-6">
                {week1Workers.map((worker, idx) => (
                  <AIWorkerCard
                    key={worker.id}
                    worker={worker}
                    rank={idx + 1}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Medium-Impact Workers (Month 2-3) - Yellow indicator */}
          {month2Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">
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

          {/* Quick Wins (Month 4+) - Green indicator */}
          {month4Workers.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">
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

        {/* Projected Impact - SECTION 3 */}
        <div className="mb-12">
          <ImpactMetrics
            phase1={projectedImpact.phase1}
            phase2={projectedImpact.phase2}
          />
        </div>

        {/* Comparison to Peers - SECTION 4 */}
        <div className="mb-12">
          <ComparisonTable userScore={readinessScore.total} />
        </div>

        {/* Missing Pieces - SECTION 5 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Missing Pieces
          </h2>
          <p className="text-gray-600 mb-6">
            To reach 85+ readiness score, consider:
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Strengths */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                ✅ Your Strengths
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                {assessmentData.techStack.includes("okta") && (
                  <li>
                    • Okta as identity hub (unlocks 70% of access automation)
                  </li>
                )}
                {assessmentData.techStack.includes("servicenow") && (
                  <li>• ServiceNow for structured ITSM workflows</li>
                )}
                {assessmentData.techStack.includes("jira") && (
                  <li>• Jira for flexible ticket management</li>
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
              </ul>
            </div>

            {/* Integration Gaps */}
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center gap-2">
                ⚠️ Integration Gaps
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
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
                {(!assessmentData.techStack.includes("slack") ||
                  assessmentData.techStack.length < 5) && (
                  <li>
                    • Limited API integrations available with current tools
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
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                ❌ Not Using (but recommended)
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
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

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want a 100% Accurate Assessment?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              This report is based on industry benchmarks. We can analyze YOUR
              actual ticket data to show you precise automation
              opportunities—down to the ticket category.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left">
              <h3 className="text-lg font-bold mb-4">
                Let us analyze your IT tickets for one week. We'll deliver a
                custom discovery report showing:
              </h3>
              <ul className="space-y-2 text-blue-50">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Exact ticket categories that can be automated</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Precise time savings by workflow</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>ROI projections specific to your team</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Implementation roadmap</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h4 className="font-bold mb-3">What We Need:</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Read-only access to your ITSM (Jira/ServiceNow)</li>
                <li>• 30-minute kickoff call</li>
                <li>• 1-week observation period</li>
              </ul>
            </div>

            <Button
              variant="primary"
              onClick={() => router.push("/contact")}
            >
              Get My Custom Discovery Report
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-blue-100">
              <span>🔒 Your data stays private—deleted after analysis</span>
              <span>✓ No commitment required</span>
              <span>📊 1,000+ IT teams assessed</span>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-12 text-center">
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

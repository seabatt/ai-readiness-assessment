import Card from "@/components/ui/Card";
import { ReadinessScore } from "@/types";

interface ScoreBreakdownProps {
  scores: ReadinessScore;
  techStackCount: number;
  hasApprovalWorkflows: boolean;
  repetitivePercentage: string;
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

export default function ScoreBreakdown({
  scores,
  techStackCount,
  hasApprovalWorkflows,
  repetitivePercentage,
}: ScoreBreakdownProps) {
  // Map existing scores to 5 new categories
  const calculateCategoryScores = (): CategoryScore[] => {
    // Data & APIs - based on tech stack integrations (out of 100)
    const dataAPIsScore = Math.min(100, (techStackCount / 8) * 100);

    // Process Clarity - based on workflows and repetition (out of 100)
    const processScore = Math.min(100, (scores.workflowScore / 35) * 100);

    // Volume & Variability - based on workflow score and volume (out of 100)
    const volumeScore = Math.min(
      100,
      ((scores.workflowScore + scores.operationalScore) / 60) * 100,
    );

    // Governance & Guardrails - based on operational readiness (out of 100)
    const governanceScore = hasApprovalWorkflows ? 100 : 50;

    // Stack Fit - based on tech stack score (out of 100)
    const stackFitScore = Math.min(100, (scores.techStackScore / 40) * 100);

    return [
      {
        name: "Data & APIs",
        score: Math.round(dataAPIsScore),
        maxScore: 100,
        description: "Baseline APIs and data access enabled",
      },
      {
        name: "Process Clarity",
        score: Math.round(processScore),
        maxScore: 100,
        description: "Well-defined documented workflows",
      },
      {
        name: "Volume & Variability",
        score: Math.round(volumeScore),
        maxScore: 100,
        description: "Consistent volume with quality information",
      },
      {
        name: "Governance & Guardrails",
        score: Math.round(governanceScore),
        maxScore: 100,
        description: "Clear approval policies and audit requirements",
      },
      {
        name: "Stack Fit",
        score: Math.round(stackFitScore),
        maxScore: 100,
        description: "Integrated tools for autonomous worker actions",
      },
    ];
  };

  const categories = calculateCategoryScores();

  return (
    <Card className="h-full">
      <h3 className="text-xl font-bold text-text-primary mb-6">
        Score Breakdown
      </h3>

      <div className="space-y-6">
        {categories.map((category) => {
          const percentage = (category.score / category.maxScore) * 100;

          return (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-text-primary">
                    {category.name}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {category.description}
                  </div>
                </div>
                <div className="text-lg font-bold text-text-primary ml-4">
                  {category.score}{" "}
                  <span className="text-text-tertiary text-sm">
                    / {category.maxScore}
                  </span>
                </div>
              </div>

              {/* Progress bar with gradient */}
              <div className="relative h-2 bg-bg-primary rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentage}%`,
                    background:
                      "linear-gradient(90deg, #6B7280 0%, #3B82F6 50%, #F97316 100%)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

import Card from "@/components/ui/Card";
import StatusPill from "@/components/ui/StatusPill";
import { MatchedUseCase } from "@/types/types-v3";
import { FeasibilityResult } from "@/lib/engines/feasibility-engine";
import useCaseMappings from "@/data/use-case-mappings.json";

interface OpportunityAnalysisProps {
  matchedUseCases: MatchedUseCase[];
  feasibilityResults: FeasibilityResult[];
  topN?: number;
}

export default function OpportunityAnalysis({
  matchedUseCases,
  feasibilityResults,
  topN = 10,
}: OpportunityAnalysisProps) {
  // Get all enabled use case IDs
  const enabledUseCaseIds = new Set(
    (feasibilityResults || []).flatMap((result) => result.enabled_use_cases),
  );

  // Build comprehensive list: matched use cases PLUS enabled use cases without volume matches
  const allOpportunities: MatchedUseCase[] = [];

  // First, add all matched use cases (these have impact data)
  allOpportunities.push(...matchedUseCases);

  // Then, add enabled use cases that weren't matched (no volume data, but still possible)
  const matchedIds = new Set(matchedUseCases.map((uc) => uc.use_case_id));

  (useCaseMappings as any).use_cases.forEach((uc: any) => {
    if (enabledUseCaseIds.has(uc.id) && !matchedIds.has(uc.id)) {
      // Create a pseudo-matched use case with estimated impact based on typical values
      const estimatedVolume = Math.round(
        (uc.typical_volume_pct || 0.05) * 1000,
      ); // Assume 1000 tickets baseline
      const estimatedHours =
        estimatedVolume *
        (uc.typical_ttr_hours || 1) *
        (uc.automation_rate || 0.8);

      allOpportunities.push({
        use_case_id: uc.id,
        name: uc.name,
        category: uc.category,
        description: uc.description,
        value_proposition: uc.value_proposition,
        fit_score: 45, // Base score for enabled but unmatched
        estimated_monthly_deflection: estimatedVolume,
        estimated_hours_saved: estimatedHours,
        confidence: uc.confidence * 0.7, // Lower confidence since no volume match
        implementation_effort: uc.implementation_effort,
        time_to_value_days: uc.time_to_value_days,
        prerequisites: uc.prerequisites,
        workflow_steps: uc.workflow_steps,
        priority:
          uc.time_to_value_days <= 7
            ? "immediate"
            : uc.time_to_value_days <= 21
              ? "quick_win"
              : "future",
        required_tools: uc.required_tools,
      });
    }
  });

  // Sort by fit score - show ALL opportunities
  const topUseCases = allOpportunities.sort(
    (a, b) => b.fit_score - a.fit_score,
  );

  if (topUseCases.length === 0) {
    return null;
  }

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return "text-accent-green";
    if (score >= 60) return "text-accent-blue";
    if (score >= 40) return "text-accent-orange";
    return "text-text-tertiary";
  };

  const getFitScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Fit";
    if (score >= 60) return "Good Fit";
    if (score >= 40) return "Moderate Fit";
    return "Basic Fit";
  };

  const getPriorityStatus = (
    priority: string,
  ): "success" | "active" | "warning" => {
    if (priority === "immediate") return "success";
    if (priority === "quick_win") return "active";
    return "warning";
  };

  const getPriorityLabel = (priority: string) => {
    if (priority === "immediate") return "Deploy Week 1";
    if (priority === "quick_win") return "Deploy Month 1-2";
    return "Deploy Month 3+";
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          What You Can Automate Right Now
        </h2>
        <p className="text-text-secondary">
          Common IT use cases that AI Workers can handle using your current
          tools and APIs. These are ranked by impact, feasibility, and
          time-to-value.
        </p>
      </div>

      <div className="space-y-6">
        {topUseCases.map((useCase, index) => (
          <Card key={useCase.use_case_id} hover>
            {/* Header with Rank and Priority */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center text-bg-primary font-bold text-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {useCase.name}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusPill status={getPriorityStatus(useCase.priority)}>
                      {getPriorityLabel(useCase.priority)}
                    </StatusPill>
                    <span className="text-sm text-text-tertiary">
                      {useCase.category}
                    </span>
                    <StatusPill status={getPriorityStatus(useCase.priority)}>
                      {getPriorityLabel(useCase.priority)}
                    </StatusPill>
                  </div>
                </div>
              </div>

              {/* Fit Score */}
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${getFitScoreColor(useCase.fit_score)}`}
                >
                  {useCase.fit_score}
                </div>
                <div className="text-xs text-text-tertiary">
                  {getFitScoreLabel(useCase.fit_score)}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-6 leading-relaxed">
              {useCase.value_proposition}
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-primary rounded-lg mb-6">
              <div>
                <div className="text-2xl font-bold text-accent-green">
                  {useCase.estimated_monthly_deflection.toLocaleString()}
                </div>
                <div className="text-xs text-text-tertiary">Tickets/Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-blue">
                  {Math.round(useCase.estimated_hours_saved).toLocaleString()}{" "}
                  hrs
                </div>
                <div className="text-xs text-text-tertiary">
                  Time Saved/Month
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {useCase.time_to_value_days} days
                </div>
                <div className="text-xs text-text-tertiary">Time to Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-orange">
                  {Math.round(useCase.confidence * 100)}%
                </div>
                <div className="text-xs text-text-tertiary">Confidence</div>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-text-primary mb-2">
                How it works:
              </h4>
              <ul className="space-y-1">
                {useCase.workflow_steps.map((step, i) => (
                  <li
                    key={i}
                    className="text-sm text-text-secondary flex items-start gap-2"
                  >
                    <span className="text-accent-green mt-0.5 flex-shrink-0">
                      →
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

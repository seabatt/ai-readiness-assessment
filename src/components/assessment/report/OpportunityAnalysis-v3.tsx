import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import { MatchedUseCase } from '@/types/types-v3';

interface OpportunityAnalysisProps {
  matchedUseCases: MatchedUseCase[];
  topN?: number;
}

export default function OpportunityAnalysis({ 
  matchedUseCases, 
  topN = 5 
}: OpportunityAnalysisProps) {
  
  // Get top N use cases sorted by fit_score
  const topUseCases = [...matchedUseCases]
    .sort((a, b) => b.fit_score - a.fit_score)
    .slice(0, topN);

  if (topUseCases.length === 0) {
    return null;
  }

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent-green';
    if (score >= 60) return 'text-accent-blue';
    if (score >= 40) return 'text-accent-orange';
    return 'text-text-tertiary';
  };

  const getFitScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Fit';
    if (score >= 60) return 'Good Fit';
    if (score >= 40) return 'Moderate Fit';
    return 'Basic Fit';
  };

  const getPriorityStatus = (priority: string): 'success' | 'active' | 'warning' => {
    if (priority === 'immediate') return 'success';
    if (priority === 'quick_win') return 'active';
    return 'warning';
  };

  const getPriorityLabel = (priority: string) => {
    if (priority === 'immediate') return 'Deploy Week 1';
    if (priority === 'quick_win') return 'Deploy Month 1-2';
    return 'Deploy Month 3+';
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          🎯 What You Can Automate Right Now
        </h2>
        <p className="text-text-secondary">
          Common IT use cases that AI Workers can handle using your current tools and APIs. These are ranked by impact, feasibility, and time-to-value.
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
                  </div>
                </div>
              </div>
              
              {/* Fit Score */}
              <div className="text-right">
                <div className={`text-3xl font-bold ${getFitScoreColor(useCase.fit_score)}`}>
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
                  {useCase.estimated_monthly_deflection}
                </div>
                <div className="text-xs text-text-tertiary">Tickets/Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-blue">
                  {useCase.estimated_hours_saved.toFixed(1)} hrs
                </div>
                <div className="text-xs text-text-tertiary">Time Saved/Month</div>
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
                {useCase.workflow_steps.slice(0, 3).map((step, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-accent-green mt-0.5 flex-shrink-0">→</span>
                    <span>{step}</span>
                  </li>
                ))}
                {useCase.workflow_steps.length > 3 && (
                  <li className="text-sm text-text-tertiary ml-5">
                    +{useCase.workflow_steps.length - 3} more steps
                  </li>
                )}
              </ul>
            </div>

            {/* Implementation Details */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-secondary/10">
              <div className="flex items-center gap-4 text-sm text-text-tertiary">
                <span>
                  ⚙️ {useCase.implementation_effort === 'low' ? 'Easy' : useCase.implementation_effort === 'medium' ? 'Moderate' : 'Complex'} Setup
                </span>
                <span>
                  📋 {useCase.prerequisites.length} Prerequisites
                </span>
              </div>
              <button className="text-sm text-accent-blue hover:underline">
                View Full Details →
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Footer */}
      {matchedUseCases.length > topN && (
        <div className="mt-8 text-center">
          <p className="text-text-tertiary mb-4">
            Showing top {topN} of {matchedUseCases.length} automation opportunities
          </p>
          <button className="text-accent-blue hover:underline">
            View All {matchedUseCases.length} Opportunities
          </button>
        </div>
      )}
    </div>
  );
}

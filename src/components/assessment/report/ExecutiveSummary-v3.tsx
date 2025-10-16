import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';

interface ExecutiveSummaryProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
  assessmentData: {
    techStack: string[];
    additionalContext?: string;
  };
}

export default function ExecutiveSummary({ 
  roiResult, 
  totalMonthlyTickets,
  assessmentData 
}: ExecutiveSummaryProps) {
  
  const getReadinessRating = (automatablePct: number) => {
    if (automatablePct >= 40) return { label: 'High Readiness', color: 'text-accent-green' };
    if (automatablePct >= 25) return { label: 'Moderate Readiness', color: 'text-accent-blue' };
    if (automatablePct >= 15) return { label: 'Early Opportunity', color: 'text-accent-orange' };
    return { label: 'Foundation Building', color: 'text-text-secondary' };
  };

  const rating = getReadinessRating(roiResult.automatable_pct);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Your IT Automation Readiness
        </h2>
        <p className="text-lg text-text-secondary">
          Based on your {assessmentData.techStack.length} selected tools and {totalMonthlyTickets.toLocaleString()} monthly tickets
        </p>
      </div>

      {/* Main Readiness Card */}
      <Card className="mb-8">
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold ${rating.color} mb-2`}>
            {roiResult.automatable_pct.toFixed(1)}%
          </div>
          <div className="text-xl text-text-secondary mb-4">
            of tickets can be automated immediately
          </div>
          <div className={`inline-block px-6 py-2 rounded-pill ${rating.color} bg-opacity-10 border border-current`}>
            {rating.label}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 pt-6 border-t border-brand-secondary/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green">
              {roiResult.automatable_tickets}
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Tickets Automatable/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue">
              {roiResult.total_hours_saved.toFixed(0)} hrs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Time Saved/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary">
              {roiResult.fte_equivalent.toFixed(1)} FTEs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Capacity Freed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange">
              ${(roiResult.annual_value_usd / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Annual Value
            </div>
          </div>
        </div>
      </Card>

      {/* Context Highlight (if provided) */}
      {assessmentData.additionalContext && (
        <Card className="mt-8 bg-accent-blue/5 border-accent-blue/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">
                Your Context Considered
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {assessmentData.additionalContext}
              </p>
              <p className="text-xs text-text-tertiary mt-2">
                This context has been factored into your automation recommendations and confidence scores.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

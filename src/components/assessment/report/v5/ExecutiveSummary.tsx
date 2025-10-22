'use client';

import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';
import { formatLargeNumber } from '@/lib/utils/formatNumber';

interface ExecutiveSummaryProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
}

export default function ExecutiveSummary({ 
  roiResult, 
  totalMonthlyTickets
}: ExecutiveSummaryProps) {
  const getReadinessRating = (automatablePct: number) => {
    if (automatablePct >= 40) return { label: 'High Readiness', color: 'text-accent-green', bgColor: 'bg-accent-green/20' };
    if (automatablePct >= 25) return { label: 'Moderate Readiness', color: 'text-accent-blue', bgColor: 'bg-accent-blue/20' };
    if (automatablePct >= 15) return { label: 'Early Opportunity', color: 'text-accent-orange', bgColor: 'bg-accent-orange/20' };
    return { label: 'Foundation Building', color: 'text-text-secondary', bgColor: 'bg-text-secondary/20' };
  };

  const rating = getReadinessRating(roiResult.automatable_pct);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Main Readiness Card */}
      <Card className="mb-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full ${rating.bgColor} ${rating.color} text-sm font-medium`}>
              {rating.label}
            </span>
          </div>
          <div className={`text-6xl font-bold ${rating.color} mb-2`}>
            {roiResult.automatable_pct.toFixed(1)}%
          </div>
          <div className="text-xl text-text-secondary">
            of tickets can be automated immediately
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 pt-6 border-t border-brand-secondary/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green">
              {roiResult.automatable_tickets.toLocaleString()}
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Tickets Automatable/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue">
              {Math.round(roiResult.total_hours_saved).toLocaleString()} hrs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Time Saved/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary">
              {roiResult.budget_fte.toFixed(1)} FTEs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Budget FTE (Conservative)
            </div>
            <div className="text-xs text-text-tertiary/60 mt-1">
              Capacity: {roiResult.capacity_fte.toFixed(1)} FTEs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange">
              {formatLargeNumber(roiResult.annual_value_usd, '$')}
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Annual Value
            </div>
          </div>
        </div>
      </Card>

      {/* Confidence Bands */}
      <Card>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Confidence Bands</h3>
          <p className="text-sm text-text-tertiary">
            Monthly time savings across different confidence scenarios based on implementation quality and adoption.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-accent-green/10 border border-accent-green/30">
            <div className="text-sm font-medium text-accent-green mb-2">Expected Scenario</div>
            <div className="text-3xl font-bold text-accent-green">
              {Math.round(roiResult.expected_hours_saved).toLocaleString()} hrs
            </div>
            <div className="text-xs text-text-tertiary mt-2">
              Confidence-weighted average
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-accent-blue/10 border border-accent-blue/30">
            <div className="text-sm font-medium text-accent-blue mb-2">Conservative (P70)</div>
            <div className="text-3xl font-bold text-accent-blue">
              {Math.round(roiResult.p70_hours_saved).toLocaleString()} hrs
            </div>
            <div className="text-xs text-text-tertiary mt-2">
              70% confidence floor
            </div>
          </div>

          <div className="text-center p-4 rounded-lg bg-accent-orange/10 border border-accent-orange/30">
            <div className="text-sm font-medium text-accent-orange mb-2">Very Conservative (P90)</div>
            <div className="text-3xl font-bold text-accent-orange">
              {Math.round(roiResult.p90_hours_saved).toLocaleString()} hrs
            </div>
            <div className="text-xs text-text-tertiary mt-2">
              90% confidence floor
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-bg-primary/50 rounded-lg">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold">Budget FTE Calculation:</span> Uses the Expected Scenario with a 50% capture rate and 1,800 effective hours per FTE to provide a realistic, finance-friendly forecast. This accounts for ramp-up time, edge cases, and real-world adoption challenges.
          </p>
        </div>
      </Card>
    </div>
  );
}

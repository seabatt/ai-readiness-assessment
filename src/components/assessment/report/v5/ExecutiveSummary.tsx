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
              {roiResult.fte_equivalent.toFixed(1)} FTEs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Capacity Freed
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

    </div>
  );
}

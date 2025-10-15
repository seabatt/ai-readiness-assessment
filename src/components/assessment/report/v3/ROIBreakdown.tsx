'use client';

import { ROIResult } from '@/lib/engines/roi-calculator';
import Card from '@/components/ui/Card';

interface ROIBreakdownProps {
  roiResult: ROIResult;
}

export default function ROIBreakdown({ roiResult }: ROIBreakdownProps) {
  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        ROI Breakdown
      </h2>
      <p className="text-xl text-text-tertiary mb-12">
        Detailed impact analysis by category
      </p>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">Automatable Tickets</div>
          <div className="text-3xl font-bold text-highlight">
            {roiResult.automatable_tickets}
            <span className="text-lg text-text-tertiary ml-2">
              ({roiResult.automatable_pct}%)
            </span>
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">Hours Saved/Month</div>
          <div className="text-3xl font-bold text-highlight">
            {roiResult.total_hours_saved}
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">FTE Equivalent</div>
          <div className="text-3xl font-bold text-highlight">
            {roiResult.fte_equivalent}
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">Annual Value</div>
          <div className="text-3xl font-bold text-highlight">
            ${Math.round(roiResult.annual_value_usd / 1000)}K
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="!bg-bg-card !border !border-bg-card-alt/20">
        <h3 className="text-2xl font-bold text-text-primary mb-6">
          Impact by Category
        </h3>

        <div className="space-y-6">
          {roiResult.breakdown_by_category.map((category, idx) => (
            <div key={idx} className="border-b border-bg-card-alt/20 last:border-0 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">
                    {category.category}
                  </h4>
                  <p className="text-sm text-text-tertiary">
                    {category.tickets} tickets/month automated
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-highlight/20 text-highlight text-sm font-medium">
                  {Math.round(category.confidence * 100)}% confidence
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-highlight">
                    {category.hours_saved} hours/month
                  </div>
                  <div className="text-sm text-text-tertiary">
                    ~{((category.hours_saved * 12) / 2000).toFixed(1)} FTE saved annually
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-bg-card-alt/30 rounded-lg">
          <p className="text-sm text-text-tertiary">
            <span className="font-semibold text-text-primary">Overall Confidence: {roiResult.confidence}%</span>
            {' '}— Based on weighted average of use case confidence scores and your ticket volumes
          </p>
        </div>
      </Card>
    </section>
  );
}

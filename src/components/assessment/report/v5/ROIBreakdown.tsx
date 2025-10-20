'use client';

import { ROIResult } from '@/lib/engines/roi-calculator';
import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import Card from '@/components/ui/Card';
import useCaseMappings from '@/data/use-case-mappings.json';
import { formatLargeNumber } from '@/lib/utils/formatNumber';

interface ROIBreakdownProps {
  roiResult: ROIResult;
  feasibilityResults: FeasibilityResult[];
}

export default function ROIBreakdown({ roiResult, feasibilityResults }: ROIBreakdownProps) {
  // Get all enabled use case IDs
  const enabledUseCaseIds = new Set(
    (feasibilityResults || []).flatMap(result => result.enabled_use_cases)
  );

  // Get categories from matched use cases (actual impact)
  const matchedCategories = new Set(
    roiResult.breakdown_by_category.map(cat => cat.category)
  );

  // Find additional categories with enabled use cases
  const additionalCategories: Record<string, {
    category: string;
    useCases: any[];
    estimatedTickets: number;
    estimatedHours: number;
  }> = {};

  (useCaseMappings as any).use_cases.forEach((uc: any) => {
    // Filter out Meetings & Collaboration Licenses category
    if (uc.category === 'Meetings & Collaboration Licenses') {
      return;
    }
    
    if (enabledUseCaseIds.has(uc.id) && !matchedCategories.has(uc.category)) {
      if (!additionalCategories[uc.category]) {
        additionalCategories[uc.category] = {
          category: uc.category,
          useCases: [],
          estimatedTickets: 0,
          estimatedHours: 0
        };
      }
      additionalCategories[uc.category].useCases.push(uc);
      // Estimate based on typical values (assuming 1000 ticket baseline)
      const estTickets = Math.round((uc.typical_volume_pct || 0.05) * 1000 * (uc.automation_rate || 0.8));
      const estHours = estTickets * (uc.typical_ttr_hours || 1.5);
      additionalCategories[uc.category].estimatedTickets += estTickets;
      additionalCategories[uc.category].estimatedHours += estHours;
    }
  });
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
            {roiResult.automatable_tickets.toLocaleString()}
            <span className="text-lg text-text-tertiary ml-2">
              ({roiResult.automatable_pct.toFixed(1)}%)
            </span>
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">Hours Saved/Month</div>
          <div className="text-3xl font-bold text-highlight">
            {Math.round(roiResult.total_hours_saved).toLocaleString()}
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">FTE Equivalent</div>
          <div className="text-3xl font-bold text-highlight">
            {roiResult.fte_equivalent.toFixed(1)}
          </div>
        </Card>

        <Card className="!bg-bg-card !border !border-bg-card-alt/20">
          <div className="text-sm text-text-tertiary mb-2">Annual Value</div>
          <div className="text-3xl font-bold text-highlight">
            {formatLargeNumber(roiResult.annual_value_usd, '$')}
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="!bg-bg-card !border !border-bg-card-alt/20">
        <h3 className="text-2xl font-bold text-text-primary mb-6">
          Impact by Category
        </h3>

        {/* Matched Categories with Actual Impact */}
        <div className="space-y-6 mb-8">
          {roiResult.breakdown_by_category
            .filter(cat => cat.category !== 'Meetings & Collaboration Licenses')
            .map((category, idx) => (
            <div key={idx} className="border-b border-bg-card-alt/20 pb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary">
                    {category.category}
                  </h4>
                  <p className="text-sm text-text-tertiary">
                    {category.tickets.toLocaleString()} tickets/month automated
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-highlight/20 text-highlight text-sm font-medium">
                  {Math.round(category.confidence * 100)}% confidence
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-highlight">
                    {Math.round(category.hours_saved).toLocaleString()} hours/month
                  </div>
                  <div className="text-sm text-text-tertiary">
                    ~{((category.hours_saved * 12) / 2000).toFixed(1)} FTE saved annually
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Categories with Estimated Potential */}
        {Object.keys(additionalCategories).length > 0 && (
          <>
            <div className="border-t border-bg-card-alt/20 pt-8 mb-6">
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Additional Automation Potential
              </h4>
              <p className="text-sm text-text-tertiary">
                More categories you can automate with your current capabilities
              </p>
            </div>

            <div className="space-y-6">
              {Object.values(additionalCategories).map((cat, idx) => (
                <div key={idx} className="border-b border-bg-card-alt/20 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-lg font-semibold text-text-primary">
                        {cat.category}
                      </h5>
                      <p className="text-sm text-text-tertiary">
                        {cat.useCases.length} AI Worker{cat.useCases.length !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-accent-blue/20 text-accent-blue text-sm font-medium">
                      Estimated
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-accent-blue">
                        ~{Math.round(cat.estimatedHours)} hours/month
                      </div>
                      <div className="text-sm text-text-tertiary">
                        Potential savings based on typical use patterns
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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

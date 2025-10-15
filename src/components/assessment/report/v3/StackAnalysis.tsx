'use client';

import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import { MatchedUseCase } from '@/lib/engines/use-case-matcher';
import Card from '@/components/ui/Card';

interface StackAnalysisProps {
  feasibilityResults: FeasibilityResult[];
  matchedUseCases: MatchedUseCase[];
}

export default function StackAnalysis({ feasibilityResults, matchedUseCases }: StackAnalysisProps) {
  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        Your Stack Analysis
      </h2>
      <p className="text-xl text-text-tertiary mb-12">
        Here's what you can automate with your current tools and APIs
      </p>

      <div className="space-y-8">
        {feasibilityResults.map((result, idx) => {
          // Find use cases for this tool
          const toolKey = result.tool.toLowerCase().replace(/\s+/g, '_');
          const toolUseCases = matchedUseCases.filter(uc => 
            uc.required_tools.includes(toolKey)
          );

          const totalImpact = toolUseCases.reduce((sum, uc) => sum + uc.estimated_hours_saved, 0);

          return (
            <Card key={idx} className="!bg-bg-card !border !border-bg-card-alt/20">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-primary">{result.tool}</h3>
                <span className="px-3 py-1 rounded-full bg-highlight/20 text-highlight text-sm font-medium">
                  {Math.round(result.confidence * 100)}% Confidence
                </span>
              </div>

              {result.available_apis.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-highlight">✓</span> APIs Available
                  </h4>
                  <ul className="space-y-2">
                    {result.available_apis.map((api, i) => (
                      <li key={i} className="text-text-tertiary pl-6">
                        • {api}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {toolUseCases.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-highlight">✓</span> AI Workers Ready to Deploy
                  </h4>
                  <ul className="space-y-2">
                    {toolUseCases.slice(0, 5).map((uc, i) => (
                      <li key={i} className="text-text-tertiary pl-6">
                        • {uc.name} <span className="text-text-tertiary/60">(addresses {uc.estimated_monthly_deflection} tickets/month)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {toolUseCases.length > 0 && (
                <div className="mb-6 p-4 bg-bg-card-alt/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <span>🎯</span> Your Opportunity
                  </h4>
                  <p className="text-text-tertiary mb-2">
                    {toolUseCases[0].value_proposition}
                  </p>
                  <p className="text-highlight font-medium">
                    Estimated impact: {Math.round(totalImpact)} hours/month
                  </p>
                </div>
              )}

              {result.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-text-tertiary">⚠️</span> Prerequisites
                  </h4>
                  <ul className="space-y-2">
                    {result.prerequisites.slice(0, 3).map((prereq, i) => (
                      <li key={i} className="text-text-tertiary pl-6 text-sm">
                        • {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

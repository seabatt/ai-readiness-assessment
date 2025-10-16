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
        Your AI Worker Capabilities
      </h2>
      <p className="text-xl text-text-tertiary mb-12">
        Here's what AI Workers can automate using your current tools and APIs
      </p>

      <div className="space-y-8">
        {feasibilityResults.map((result, idx) => {
          // Find use cases for this tool - try multiple matching strategies
          const toolKey = result.tool.toLowerCase().replace(/\s+/g, '_');
          const toolNameLower = result.tool.toLowerCase();
          const toolUseCases = matchedUseCases.filter(uc => 
            uc.required_tools.includes(toolKey) ||
            uc.required_tools.some(t => t.includes(toolNameLower) || toolNameLower.includes(t))
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

              {/* Always show APIs if available */}
              {result.available_apis.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-highlight">✓</span> Available APIs
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

              {/* Always show AI Worker actions - use toolUseCases if available, fallback to enabled_use_cases */}
              {(toolUseCases.length > 0 || result.enabled_use_cases.length > 0) && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-highlight">✓</span> AI Worker Actions Available
                  </h4>
                  <ul className="space-y-2">
                    {toolUseCases.length > 0 ? (
                      // Show matched use cases with impact data
                      toolUseCases.slice(0, 6).map((useCase, i) => (
                        <li key={i} className="text-text-tertiary pl-6">
                          • {useCase.name}
                          {useCase.estimated_monthly_deflection > 0 && (
                            <span className="text-text-tertiary/60"> (impacts {useCase.estimated_monthly_deflection} tickets/month)</span>
                          )}
                        </li>
                      ))
                    ) : (
                      // Fallback to enabled_use_cases list
                      result.enabled_use_cases.slice(0, 6).map((useCaseId, i) => {
                        const useCase = matchedUseCases.find(uc => uc.use_case_id === useCaseId);
                        const displayName = useCase?.name || useCaseId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        
                        return (
                          <li key={i} className="text-text-tertiary pl-6">
                            • {displayName}
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              )}

              {/* Show opportunity if we have matched use cases */}
              {toolUseCases.length > 0 && (
                <div className="mb-6 p-4 bg-bg-card-alt/30 rounded-lg border border-highlight/20">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <span>🎯</span> High-Impact Opportunity
                  </h4>
                  <p className="text-text-tertiary mb-2">
                    {toolUseCases[0].value_proposition}
                  </p>
                  <p className="text-highlight font-medium">
                    Estimated impact: {Math.round(totalImpact)} hours/month
                  </p>
                </div>
              )}

              {/* Show prerequisites */}
              {result.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-text-tertiary">⚙️</span> Setup Requirements
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

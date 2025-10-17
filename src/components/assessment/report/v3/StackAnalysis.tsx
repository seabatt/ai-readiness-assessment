'use client';

import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import { MatchedUseCase } from '@/lib/engines/use-case-matcher';
import Card from '@/components/ui/Card';
import useCaseMappings from '@/data/use-case-mappings.json';

interface StackAnalysisProps {
  feasibilityResults: FeasibilityResult[];
  matchedUseCases: MatchedUseCase[];
}

interface UseCaseInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedImpact?: number;
  isMatched: boolean;
  isRequired: boolean;
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
          // Get ALL use cases enabled by this tool from FeasibilityEngine
          const enabledUseCaseIds = new Set(result.enabled_use_cases);
          
          // Build comprehensive list of use cases
          const allUseCasesForTool: UseCaseInfo[] = [];
          
          (useCaseMappings as any).use_cases.forEach((uc: any) => {
            if (enabledUseCaseIds.has(uc.id)) {
              // Check if this use case has a volume match (for impact data)
              const matchedUseCase = matchedUseCases.find(muc => muc.use_case_id === uc.id);
              
              // Determine if tool is required or optional for this use case
              const toolNameNormalized = result.tool.toLowerCase().replace(/[\s-]+/g, '_');
              const isRequired = uc.required_tools?.includes(toolNameNormalized);
              
              allUseCasesForTool.push({
                id: uc.id,
                name: uc.name,
                category: uc.category,
                description: uc.description,
                estimatedImpact: matchedUseCase?.estimated_hours_saved,
                isMatched: !!matchedUseCase,
                isRequired: isRequired
              });
            }
          });

          // Sort: matched (with impact) first, then alphabetically
          allUseCasesForTool.sort((a, b) => {
            if (a.isMatched && !b.isMatched) return -1;
            if (!a.isMatched && b.isMatched) return 1;
            return a.name.localeCompare(b.name);
          });

          const totalImpact = allUseCasesForTool
            .filter(uc => uc.estimatedImpact)
            .reduce((sum, uc) => sum + (uc.estimatedImpact || 0), 0);

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

              {/* Show ALL AI Worker actions this tool enables */}
              {allUseCasesForTool.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-highlight">✓</span> AI Worker Actions Available ({allUseCasesForTool.length})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {allUseCasesForTool.map((uc, i) => (
                      <div key={uc.id} className="text-text-tertiary pl-6">
                        • <span className="font-medium">{uc.name}</span>
                        <span className="text-text-tertiary/60 text-sm ml-2">({uc.category})</span>
                        {!uc.isRequired && (
                          <span className="text-text-tertiary/40 text-xs ml-2">enhances</span>
                        )}
                        {uc.estimatedImpact && (
                          <span className="text-highlight text-sm ml-2">~{Math.round(uc.estimatedImpact)}h/mo</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show high-impact opportunity if we have matched use cases */}
              {totalImpact > 0 && (
                <div className="mb-6 p-4 bg-bg-card-alt/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    High-Impact Opportunities
                  </h4>
                  <p className="text-text-tertiary mb-2">
                    We've identified {allUseCasesForTool.filter(uc => uc.isMatched).length} action{allUseCasesForTool.filter(uc => uc.isMatched).length !== 1 ? 's' : ''} an AI Worker could perform based on your ticket volume
                  </p>
                  <p className="text-highlight font-medium">
                    Estimated impact: ~{Math.round(totalImpact).toLocaleString()} hours/month
                  </p>
                </div>
              )}

            </Card>
          );
        })}
      </div>
    </section>
  );
}

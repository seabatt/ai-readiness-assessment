'use client';

import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import Card from '@/components/ui/Card';
import useCaseMappings from '@/data/use-case-mappings.json';

interface GapAnalysisProps {
  feasibilityResults: FeasibilityResult[];
}

interface UseCaseInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

export default function GapAnalysis({ feasibilityResults }: GapAnalysisProps) {
  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        More Available Capabilities
      </h2>
      <p className="text-xl text-text-tertiary mb-12">
        Additional AI Worker capabilities available through your current tech stack
      </p>

      <div className="space-y-8">
        {feasibilityResults.map((result, idx) => {
          // Get ALL use cases enabled by this tool from FeasibilityEngine
          const enabledUseCaseIds = new Set(result.enabled_use_cases);
          
          // Build comprehensive list of use cases
          const allUseCasesForTool: UseCaseInfo[] = [];
          
          (useCaseMappings as any).use_cases.forEach((uc: any) => {
            if (enabledUseCaseIds.has(uc.id)) {
              allUseCasesForTool.push({
                id: uc.id,
                name: uc.name,
                category: uc.category,
                description: uc.description
              });
            }
          });

          // Sort alphabetically
          allUseCasesForTool.sort((a, b) => a.name.localeCompare(b.name));

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
                    <svg className="w-5 h-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Available APIs
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
                    <svg className="w-5 h-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AI Worker Actions Available ({allUseCasesForTool.length})
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {allUseCasesForTool.map((uc) => (
                      <div key={uc.id} className="text-text-tertiary pl-6">
                        • <span className="font-medium">{uc.name}</span>
                        <span className="text-text-tertiary/60 text-sm ml-2">({uc.category})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}

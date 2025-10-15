'use client';

import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import Card from '@/components/ui/Card';

interface GapAnalysisProps {
  feasibilityResults: FeasibilityResult[];
}

export default function GapAnalysis({ feasibilityResults }: GapAnalysisProps) {
  // Find tools with gaps
  const toolsWithGaps = feasibilityResults.filter(
    result => result.missing_apis.length > 0 || result.license_gaps.length > 0
  );

  if (toolsWithGaps.length === 0) {
    return null; // No gaps to show
  }

  return (
    <section className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-4">
        Unlock Additional Capabilities
      </h2>
      <p className="text-xl text-text-tertiary mb-12">
        Here's how to expand your automation potential
      </p>

      <div className="space-y-6">
        {toolsWithGaps.map((result, idx) => (
          <Card key={idx} className="!bg-bg-card !border !border-bg-card-alt/20">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-text-primary">{result.tool}</h3>
            </div>

            {result.missing_apis.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-text-tertiary mb-2">
                  Missing APIs
                </h4>
                <ul className="space-y-1">
                  {result.missing_apis.map((api, i) => (
                    <li key={i} className="text-text-tertiary pl-6 text-sm">
                      • {api}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.license_gaps.length > 0 && (
              <div className="p-4 bg-highlight/10 rounded-lg border border-highlight/30">
                <h4 className="text-lg font-semibold text-highlight mb-2">
                  💡 License Upgrade Opportunity
                </h4>
                <ul className="space-y-1">
                  {result.license_gaps.map((gap, i) => (
                    <li key={i} className="text-text-tertiary text-sm">
                      • {gap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

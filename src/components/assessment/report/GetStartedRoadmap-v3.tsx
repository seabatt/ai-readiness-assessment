import Card from '@/components/ui/Card';
import { MatchedUseCase } from '@/types/types-v3';
import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import useCaseMappings from '@/data/use-case-mappings.json';

interface GetStartedRoadmapProps {
  matchedUseCases: MatchedUseCase[];
  feasibilityResults: FeasibilityResult[];
}

export default function GetStartedRoadmap({ matchedUseCases, feasibilityResults }: GetStartedRoadmapProps) {
  
  // Group and prioritize
  const immediateUseCases = matchedUseCases
    .filter(uc => uc.priority === 'immediate')
    .sort((a, b) => b.fit_score - a.fit_score);
  
  const quickWinUseCases = matchedUseCases
    .filter(uc => uc.priority === 'quick_win')
    .sort((a, b) => b.fit_score - a.fit_score);

  // Find future/additional capabilities to expand into
  const enabledUseCaseIds = new Set(
    (feasibilityResults || []).flatMap(result => result.enabled_use_cases)
  );
  const matchedIds = new Set(matchedUseCases.map(uc => uc.use_case_id));
  
  const futureCapabilities: any[] = [];
  (useCaseMappings as any).use_cases.forEach((uc: any) => {
    if (enabledUseCaseIds.has(uc.id) && !matchedIds.has(uc.id)) {
      futureCapabilities.push(uc);
    }
  });
  
  // Sort by implementation effort and time to value
  futureCapabilities.sort((a, b) => {
    const effortOrder: Record<string, number> = { low: 0, medium: 1, high: 2 };
    if (effortOrder[a.implementation_effort] !== effortOrder[b.implementation_effort]) {
      return effortOrder[a.implementation_effort] - effortOrder[b.implementation_effort];
    }
    return a.time_to_value_days - b.time_to_value_days;
  });

  if (matchedUseCases.length === 0 && futureCapabilities.length === 0) {
    return null;
  }

  const renderPhase = (
    title: string,
    timeframe: string,
    useCases: MatchedUseCase[],
    phaseColor: string,
    icon: string
  ) => {
    if (useCases.length === 0) return null;

    const totalTickets = useCases.reduce((sum, uc) => sum + uc.estimated_monthly_deflection, 0);
    const totalHours = useCases.reduce((sum, uc) => sum + uc.estimated_hours_saved, 0);

    return (
      <div className="relative">
        <Card>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-12 h-12 ${phaseColor} rounded-full flex items-center justify-center relative z-10`}>
              <svg className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icon === '🚀' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                {icon === '⚡' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                {icon === '📈' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-1">{title}</h3>
              <p className="text-sm text-text-tertiary">{timeframe}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent-blue">{totalTickets} tickets/month</div>
              <div className="text-sm font-semibold text-text-primary">{totalHours.toFixed(0)} hrs saved/month</div>
            </div>
          </div>

          <div className="space-y-4">
            {useCases.map((useCase, index) => (
              <div key={useCase.use_case_id} className="p-4 bg-bg-primary rounded-lg border border-brand-secondary/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-accent-blue">
                        Step {index + 1}
                      </span>
                      <h4 className="text-base font-bold text-text-primary">
                        {useCase.name}
                      </h4>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-1">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div>
                    <div className="text-sm font-bold text-accent-green">
                      {useCase.estimated_monthly_deflection}
                    </div>
                    <div className="text-xs text-text-tertiary">Tickets</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-accent-blue">
                      {useCase.estimated_hours_saved.toFixed(0)}h
                    </div>
                    <div className="text-xs text-text-tertiary">Saved</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text-primary">
                      {useCase.time_to_value_days}d
                    </div>
                    <div className="text-xs text-text-tertiary">Setup</div>
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${
                      useCase.implementation_effort === 'low' ? 'text-accent-green' :
                      useCase.implementation_effort === 'medium' ? 'text-accent-blue' :
                      'text-accent-orange'
                    }`}>
                      {useCase.implementation_effort}
                    </div>
                    <div className="text-xs text-text-tertiary">Effort</div>
                  </div>
                </div>

                {/* Prerequisites Preview */}
                {useCase.prerequisites.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-brand-secondary/10">
                    <details className="group">
                      <summary className="text-xs text-accent-blue cursor-pointer hover:underline list-none flex items-center gap-1">
                        <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        View {useCase.prerequisites.length} prerequisite{useCase.prerequisites.length !== 1 ? 's' : ''}
                      </summary>
                      <ul className="mt-2 space-y-1 ml-4">
                        {useCase.prerequisites.map((prereq, i) => (
                          <li key={i} className="text-xs text-text-secondary flex items-start gap-1">
                            <span className="text-accent-green mt-0.5">✓</span>
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // Calculate cumulative impact
  const allPriorityUseCases = [...immediateUseCases, ...quickWinUseCases];
  const cumulativeTickets = allPriorityUseCases.reduce((sum, uc) => sum + uc.estimated_monthly_deflection, 0);
  const cumulativeHours = allPriorityUseCases.reduce((sum, uc) => sum + uc.estimated_hours_saved, 0);
  const cumulativeFTE = (cumulativeHours * 12) / 2000;
  const cumulativeValue = cumulativeFTE * 100000; // $100K fully loaded cost

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          How to Get Started
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          A phased deployment plan showing when to deploy each AI Worker, based on your current capabilities and business impact.
        </p>
      </div>

      <div className="space-y-8">
        {renderPhase(
          'Week 1: Quick Deploy',
          'Deploy in first 7 days',
          immediateUseCases,
          'bg-accent-green/20',
          '🚀'
        )}

        {renderPhase(
          'Month 1-2: Build Momentum',
          'Deploy over next 4-8 weeks',
          quickWinUseCases,
          'bg-accent-blue/20',
          '⚡'
        )}

        {/* Phase 3: Scale & Expand */}
        {futureCapabilities.length > 0 && (
          <div className="relative">
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-orange/20 rounded-full flex items-center justify-center relative z-10">
                  <svg className="w-6 h-6 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    Month 3+: Scale & Expand
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Expand automation across more workflows
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-orange">{futureCapabilities.length}</div>
                  <div className="text-xs text-text-tertiary">more AI Workers</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {futureCapabilities.map((uc: any) => (
                  <div key={uc.id} className="p-4 bg-bg-primary rounded-lg border border-brand-secondary/10">
                    <h4 className="text-sm font-bold text-text-primary mb-1">
                      {uc.name}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                      {uc.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-tertiary">{uc.category}</span>
                      <span className={`font-medium ${
                        uc.implementation_effort === 'low' ? 'text-accent-green' :
                        uc.implementation_effort === 'medium' ? 'text-accent-blue' :
                        'text-accent-orange'
                      }`}>
                        {uc.time_to_value_days}d • {uc.implementation_effort} effort
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Cumulative Impact Card */}
      {allPriorityUseCases.length > 0 && (
        <Card className="mt-12 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 border-accent-blue/20">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Cumulative Impact (First 2 Months)
            </h3>
            <p className="text-sm text-text-secondary">
              By deploying AI workers with these {allPriorityUseCases.length} skills
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-green mb-1">
                {cumulativeTickets}
              </div>
              <div className="text-xs text-text-tertiary">Tickets Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-blue mb-1">
                {cumulativeHours.toFixed(0)}
              </div>
              <div className="text-xs text-text-tertiary">Hours Saved/Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary mb-1">
                {cumulativeFTE.toFixed(1)}
              </div>
              <div className="text-xs text-text-tertiary">FTE Capacity Freed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-orange mb-1">
                ${(cumulativeValue / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-text-tertiary">Annual Value</div>
            </div>
          </div>
        </Card>
      )}

      {/* Next Steps CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-tertiary mb-4">
          Ready to start your deployment?
        </p>
        <button className="px-6 py-3 bg-accent-blue text-bg-primary rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors">
          Schedule Implementation Planning Call
        </button>
      </div>
    </div>
  );
}

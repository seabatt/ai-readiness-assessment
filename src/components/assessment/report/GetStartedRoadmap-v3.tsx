import Card from '@/components/ui/Card';
import { MatchedUseCase } from '@/types/types-v3';

interface GetStartedRoadmapProps {
  matchedUseCases: MatchedUseCase[];
}

export default function GetStartedRoadmap({ matchedUseCases }: GetStartedRoadmapProps) {
  
  // Group and prioritize
  const immediateUseCases = matchedUseCases
    .filter(uc => uc.priority === 'immediate')
    .sort((a, b) => b.fit_score - a.fit_score)
    .slice(0, 3);
  
  const quickWinUseCases = matchedUseCases
    .filter(uc => uc.priority === 'quick_win')
    .sort((a, b) => b.fit_score - a.fit_score)
    .slice(0, 3);

  if (matchedUseCases.length === 0) {
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
        {/* Timeline Connector */}
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-brand-secondary/20 hidden md:block" />

        <Card>
          <div className="flex items-start gap-4 mb-6">
            <div className={`flex-shrink-0 w-12 h-12 ${phaseColor} rounded-full flex items-center justify-center text-2xl relative z-10`}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text-primary mb-1">{title}</h3>
              <p className="text-sm text-text-tertiary">{timeframe}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent-blue">{totalTickets}</div>
              <div className="text-xs text-text-tertiary">tickets/month</div>
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

          {/* Phase Summary */}
          <div className="mt-6 pt-6 border-t border-brand-secondary/10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent-green">{totalTickets}</div>
                <div className="text-xs text-text-tertiary">Total Tickets Automated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-blue">{totalHours.toFixed(0)} hrs</div>
                <div className="text-xs text-text-tertiary">Total Time Saved/Month</div>
              </div>
            </div>
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
          🗺️ Your Get-Started Roadmap
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          A phased deployment plan prioritized by impact, implementation effort, and stack readiness.
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
      </div>

      {/* Cumulative Impact Card */}
      {allPriorityUseCases.length > 0 && (
        <Card className="mt-12 bg-gradient-to-br from-accent-blue/10 to-accent-green/10 border-accent-blue/20">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-text-primary mb-2">
              📈 Cumulative Impact (First 2 Months)
            </h3>
            <p className="text-sm text-text-secondary">
              By deploying these {allPriorityUseCases.length} AI Workers
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

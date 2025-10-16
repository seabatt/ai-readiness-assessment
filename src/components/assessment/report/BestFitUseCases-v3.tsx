import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import { MatchedUseCase } from '@/types/types-v3';
import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import useCaseMappings from '@/data/use-case-mappings.json';

interface BestFitUseCasesProps {
  matchedUseCases: MatchedUseCase[];
  feasibilityResults: FeasibilityResult[];
}

export default function BestFitUseCases({ matchedUseCases, feasibilityResults }: BestFitUseCasesProps) {
  
  // Group matched use cases by priority
  const immediateUseCases = matchedUseCases
    .filter(uc => uc.priority === 'immediate')
    .sort((a, b) => b.fit_score - a.fit_score);
  
  const quickWinUseCases = matchedUseCases
    .filter(uc => uc.priority === 'quick_win')
    .sort((a, b) => b.fit_score - a.fit_score);
  
  const futureUseCases = matchedUseCases
    .filter(uc => uc.priority === 'future')
    .sort((a, b) => b.fit_score - a.fit_score);

  // Get ALL enabled use cases
  const enabledUseCaseIds = new Set(
    (feasibilityResults || []).flatMap(result => result.enabled_use_cases)
  );
  
  // Find additional enabled capabilities not in matched use cases
  const matchedIds = new Set(matchedUseCases.map(uc => uc.use_case_id));
  const additionalCapabilities: any[] = [];
  
  (useCaseMappings as any).use_cases.forEach((uc: any) => {
    if (enabledUseCaseIds.has(uc.id) && !matchedIds.has(uc.id)) {
      additionalCapabilities.push(uc);
    }
  });
  
  // Group additional capabilities by category
  const capabilitiesByCategory: Record<string, any[]> = {};
  additionalCapabilities.forEach(uc => {
    if (!capabilitiesByCategory[uc.category]) {
      capabilitiesByCategory[uc.category] = [];
    }
    capabilitiesByCategory[uc.category].push(uc);
  });

  if (matchedUseCases.length === 0 && additionalCapabilities.length === 0) {
    return null;
  }

  const renderUseCaseGrid = (useCases: MatchedUseCase[]) => {
    if (useCases.length === 0) return null;

    return (
      <div className="grid md:grid-cols-2 gap-6">
        {useCases.map(useCase => (
          <Card key={useCase.use_case_id} hover>
            <div className="mb-3">
              <h4 className="text-lg font-bold text-text-primary mb-1">
                {useCase.name}
              </h4>
              <span className="text-sm text-text-tertiary">{useCase.category}</span>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {useCase.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <div className="text-lg font-bold text-accent-green">
                  {useCase.estimated_monthly_deflection}
                </div>
                <div className="text-xs text-text-tertiary">Tickets</div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent-blue">
                  {useCase.estimated_hours_saved.toFixed(0)}h
                </div>
                <div className="text-xs text-text-tertiary">Saved</div>
              </div>
              <div>
                <div className="text-lg font-bold text-text-primary">
                  {useCase.fit_score}
                </div>
                <div className="text-xs text-text-tertiary">Fit Score</div>
              </div>
            </div>

            {/* Implementation Info */}
            <div className="flex items-center justify-between text-xs text-text-tertiary">
              <span>{useCase.time_to_value_days} day setup</span>
              <span className={`font-semibold ${
                useCase.implementation_effort === 'low' ? 'text-accent-green' :
                useCase.implementation_effort === 'medium' ? 'text-accent-blue' :
                'text-accent-orange'
              }`}>
                {useCase.implementation_effort} effort
              </span>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          📚 Your AI Worker Deployment Plan
        </h2>
        <p className="text-text-secondary">
          Organized by when to deploy, based on setup complexity, time-to-value, and business impact.
        </p>
      </div>

      {/* Immediate Deployment (Week 1) */}
      {immediateUseCases.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-accent-green/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                Deploy Immediately (Week 1)
              </h3>
              <p className="text-sm text-text-secondary">
                {immediateUseCases.length} AI Worker{immediateUseCases.length !== 1 ? 's' : ''} ready for immediate deployment
              </p>
            </div>
          </div>
          {renderUseCaseGrid(immediateUseCases)}
        </div>
      )}

      {/* Quick Wins (Month 1-2) */}
      {quickWinUseCases.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                Quick Wins (Month 1-2)
              </h3>
              <p className="text-sm text-text-secondary">
                {quickWinUseCases.length} AI Worker{quickWinUseCases.length !== 1 ? 's' : ''} for near-term deployment
              </p>
            </div>
          </div>
          {renderUseCaseGrid(quickWinUseCases)}
        </div>
      )}

      {/* Future Opportunities (Month 3+) */}
      {futureUseCases.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-accent-orange/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                📅 Strategic Opportunities (Month 3+)
              </h3>
              <p className="text-sm text-text-secondary">
                {futureUseCases.length} AI Worker{futureUseCases.length !== 1 ? 's' : ''} for longer-term planning
              </p>
            </div>
          </div>
          {renderUseCaseGrid(futureUseCases)}
        </div>
      )}

      {/* Additional Capabilities */}
      {additionalCapabilities.length > 0 && (
        <div className="mt-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              More Available Capabilities
            </h3>
            <p className="text-text-secondary">
              {additionalCapabilities.length} additional AI Worker automation{additionalCapabilities.length !== 1 ? 's' : ''} you can deploy
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(capabilitiesByCategory).map(([category, capabilities]) => (
              <div key={category}>
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <span className="text-highlight">▸</span> {category}
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {capabilities.map((uc: any) => (
                    <Card key={uc.id} className="!p-4" hover>
                      <h5 className="font-semibold text-text-primary mb-1">{uc.name}</h5>
                      <p className="text-xs text-text-tertiary mb-3 line-clamp-2">{uc.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-tertiary">{uc.time_to_value_days}d setup</span>
                        <span className={`font-medium ${
                          uc.implementation_effort === 'low' ? 'text-accent-green' :
                          uc.implementation_effort === 'medium' ? 'text-accent-blue' :
                          'text-accent-orange'
                        }`}>
                          {uc.implementation_effort} effort
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

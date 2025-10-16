import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import { MatchedUseCase } from '@/types';

interface BestFitUseCasesProps {
  matchedUseCases: MatchedUseCase[];
}

export default function BestFitUseCases({ matchedUseCases }: BestFitUseCasesProps) {
  
  // Group by priority
  const immediateUseCases = matchedUseCases
    .filter(uc => uc.priority === 'immediate')
    .sort((a, b) => b.fit_score - a.fit_score);
  
  const quickWinUseCases = matchedUseCases
    .filter(uc => uc.priority === 'quick_win')
    .sort((a, b) => b.fit_score - a.fit_score);
  
  const futureUseCases = matchedUseCases
    .filter(uc => uc.priority === 'future')
    .sort((a, b) => b.fit_score - a.fit_score);

  if (matchedUseCases.length === 0) {
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
          📚 Best Fit AI Workers by Deployment Phase
        </h2>
        <p className="text-text-secondary">
          Organized by implementation priority based on effort, time-to-value, and impact.
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
                🚀 Deploy Immediately (Week 1)
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
                ⚡ Quick Wins (Month 1-2)
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

      {/* Summary Stats */}
      <Card className="mt-12 bg-bg-elevated">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-accent-green mb-1">
              {immediateUseCases.length}
            </div>
            <div className="text-sm text-text-tertiary">Immediate Deploy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-blue mb-1">
              {quickWinUseCases.length}
            </div>
            <div className="text-sm text-text-tertiary">Quick Wins</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent-orange mb-1">
              {futureUseCases.length}
            </div>
            <div className="text-sm text-text-tertiary">Strategic</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text-primary mb-1">
              {matchedUseCases.length}
            </div>
            <div className="text-sm text-text-tertiary">Total Available</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

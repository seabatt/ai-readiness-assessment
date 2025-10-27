import { AutomationOpportunity } from '@/types';
import ConnectedAppLogos from '@/components/ui/ConnectedAppLogos';

interface BestFitUseCasesProps {
  opportunities: AutomationOpportunity[];
  techStack: string[];
}

export default function BestFitUseCases({
  opportunities,
  techStack,
}: BestFitUseCasesProps) {
  // Get top 3 high-confidence opportunities for use case breakdown
  const topUseCases = opportunities
    .filter(opp => opp.confidence === 'high')
    .slice(0, 3);

  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-8">What This Looks Like in Practice</h2>
      
      <p className="text-lg text-text-tertiary mb-8 max-w-4xl leading-relaxed">
        Here are three high-confidence automation scenarios based on your tech stack. 
        Each shows the workstream, required skills, and AI Workers that handle the work.
      </p>

      <div className="space-y-8">
        {topUseCases.map((opp, index) => (
          <div key={index} className="bg-bg-card border border-bg-card-alt/20 rounded-lg overflow-hidden transition-all duration-200">
            {/* Header */}
            <div className="bg-bg-card-alt/30 border-b border-bg-card-alt/20 py-8 px-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-text-primary">{opp.processName}</h3>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-text-tertiary">{opp.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-tertiary">Integrates with:</span>
                    <ConnectedAppLogos 
                      apps={techStack.filter(tool => 
                        opp.tool.includes(tool) || opp.description.includes(tool)
                      ).slice(0, 5)}
                      maxVisible={5}
                      size={24}
                      spacing={12}
                    />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-3xl font-bold text-highlight">{opp.projectedDeflection}%</div>
                  <div className="text-sm text-text-tertiary">deflection</div>
                </div>
              </div>
            </div>

            {/* Workstream → Skills → Agents Breakdown */}
            <div className="py-8 px-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Workstream */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-text-tertiary mb-3">Workstream</div>
                  <div className="bg-bg-primary border border-bg-card-alt/20 rounded-lg p-4">
                    <div className="font-semibold text-text-primary mb-2">{opp.workstream}</div>
                    <p className="text-sm text-text-tertiary leading-relaxed">{opp.description}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-text-tertiary mb-3">Skills Required</div>
                  <div className="bg-bg-primary border border-bg-card-alt/20 rounded-lg p-4">
                    <div className="space-y-2">
                      {opp.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-highlight"></div>
                          <span className="text-sm text-text-tertiary">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Workers */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-text-tertiary mb-3">AI Workers</div>
                  <div className="bg-bg-primary border border-bg-card-alt/20 rounded-lg p-4">
                    <div className="space-y-2">
                      {opp.agents.map((agent, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-highlight"></div>
                          <span className="text-sm text-text-tertiary">{agent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="mt-6 pt-6 border-t border-bg-card-alt/20">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-highlight mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Expected Outcome</h4>
                    <p className="text-sm text-text-tertiary leading-relaxed">
                      {opp.projectedDeflection}% of {opp.processName.toLowerCase()} handled autonomously. 
                      Requests route through existing approval workflows and complete within enterprise guardrails.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

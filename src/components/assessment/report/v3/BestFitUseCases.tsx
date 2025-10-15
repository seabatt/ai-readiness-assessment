import { AutomationOpportunity } from '@/types';

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
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">What This Looks Like in Practice</h2>
      
      <p className="text-lg text-gray-300 mb-8 max-w-4xl">
        Here are three high-confidence automation scenarios based on your tech stack. 
        Each shows the workstream, required skills, and AI Workers that handle the work.
      </p>

      <div className="space-y-8">
        {topUseCases.map((opp, index) => (
          <div key={index} className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 border-b border-gray-800 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{opp.processName}</h3>
                  <p className="text-gray-300">{opp.tool} · {opp.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{opp.projectedDeflection}%</div>
                  <div className="text-sm text-gray-400">deflection</div>
                </div>
              </div>
            </div>

            {/* Workstream → Skills → Agents Breakdown */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Workstream */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Workstream</div>
                  <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">{opp.workstream}</div>
                    <p className="text-sm text-gray-400">{opp.description}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Skills Required</div>
                  <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                    <div className="space-y-2">
                      {opp.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Workers */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">AI Workers</div>
                  <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                    <div className="space-y-2">
                      {opp.agents.map((agent, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-300">{agent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Expected Outcome</h4>
                    <p className="text-sm text-gray-400">
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

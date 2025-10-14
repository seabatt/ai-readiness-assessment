import { AutomationOpportunity } from '@/types';

interface AIWorkerSwimlanesProps {
  opportunities: AutomationOpportunity[];
}

export default function AIWorkerSwimlanes({ opportunities }: AIWorkerSwimlanesProps) {
  // Show top 3 opportunities in swimlane format
  const topOpportunities = opportunities.slice(0, 3);

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">What an AI Worker Would Do</h2>
      <p className="text-lg text-gray-400 mb-8">
        Here's how autonomous workers would handle your top automation opportunities, organized by
        Workstream → Skills → Agents architecture.
      </p>

      <div className="space-y-8">
        {topOpportunities.map((opp, index) => (
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

            {/* Swimlane Content */}
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
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Skills</div>
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

                {/* Agents */}
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Agents</div>
                  <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                    <div className="space-y-2">
                      {opp.agents.map((agent, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-sm font-mono text-gray-300">{agent}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Supported Actions */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Supported Actions</div>
                <div className="flex flex-wrap gap-2">
                  {opp.supportedActions.map((action, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-xs text-gray-300"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Time to Resolution</div>
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-sm text-gray-400">Before</div>
                        <div className="text-lg font-semibold text-white">{opp.medianTTRBefore}</div>
                      </div>
                      <div className="text-gray-600">→</div>
                      <div>
                        <div className="text-sm text-gray-400">After</div>
                        <div className="text-lg font-semibold text-green-400">{opp.medianTTRAfter}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Confidence</div>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        opp.confidence === 'high' ? 'bg-green-900/30 text-green-400 border border-green-800/50' :
                        opp.confidence === 'medium' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50' :
                        'bg-gray-800/50 text-gray-400 border border-gray-700'
                      }`}>
                        {opp.confidence.charAt(0).toUpperCase() + opp.confidence.slice(1)} Confidence
                      </div>
                    </div>
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

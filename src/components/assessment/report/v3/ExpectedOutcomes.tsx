interface ExpectedOutcomesProps {
  estimatedDeflection: number;
  hoursSaved: number;
  fteImpact: number;
}

export default function ExpectedOutcomes({
  estimatedDeflection,
  hoursSaved,
  fteImpact,
}: ExpectedOutcomesProps) {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">What to Expect</h2>
      
      <p className="text-lg text-gray-300 mb-8 max-w-4xl">
        Here's the timeline and measurable outcomes based on teams with similar tech stacks 
        who've deployed AI Workers. These are conservative estimates grounded in operational reality.
      </p>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border border-blue-800/30 rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">30-Day Pilot Results</h3>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-4xl font-bold text-white mb-2">{estimatedDeflection}%</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Ticket Deflection</div>
            <p className="text-sm text-gray-400">
              Of total volume handled autonomously with approvals in place
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">Real-time</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">TTR for Approved Actions</div>
            <p className="text-sm text-gray-400">
              App access, group changes, license updates when policies exist
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">~{fteImpact}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">FTE Capacity</div>
            <p className="text-sm text-gray-400">
              Worth of time returned to team for strategic work
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h4 className="font-semibold text-white mb-4">4-Week Timeline</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-blue-400">Week 1</div>
              <div className="text-sm text-gray-300">
                Shadow mode validation. AI Worker observes, no live actions. Team reviews accuracy.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-blue-400">Week 2</div>
              <div className="text-sm text-gray-300">
                Enable first live workflow with approvals. Typically app access or group management.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-blue-400">Week 3</div>
              <div className="text-sm text-gray-300">
                Expand to 2-3 workflows. Configure guardrails and RBAC policies. Monitor deflection metrics.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-blue-400">Week 4</div>
              <div className="text-sm text-gray-300">
                Full pilot deployment. 3-5 AI Workers active. Measure ROI and prepare for scale.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Before AI Workers</h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Team handles {estimatedDeflection}% of tickets manually</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Average TTR: 1-2 hours for routine requests</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Skilled engineers spend time on repetitive work</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Queue grows faster than resolution capacity</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">After AI Workers</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>{estimatedDeflection}% of volume handled autonomously</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Real-time TTR for approved actions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>{hoursSaved.toLocaleString()} hours/year freed for strategic work</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Team capacity scales without headcount</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics You'll Track */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Metrics You'll Track</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">Operational Metrics</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Ticket deflection rate by workflow</li>
              <li>• Time to resolution (TTR) reduction</li>
              <li>• Volume handled autonomously</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">Team Impact</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Hours saved per week</li>
              <li>• FTE capacity returned</li>
              <li>• Strategic work vs. repetitive tasks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2 text-sm">Governance</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Approval workflow compliance</li>
              <li>• Audit log completeness</li>
              <li>• RBAC policy effectiveness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

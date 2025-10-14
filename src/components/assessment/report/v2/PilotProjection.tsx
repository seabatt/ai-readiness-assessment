export default function PilotProjection() {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">What to Expect in 4 Weeks</h2>
      <p className="text-lg text-gray-400 mb-8">
        Based on anonymized discovery data, here's what a typical 4-week pilot delivers for organizations
        with similar tech stacks and workflows.
      </p>

      <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border border-blue-800/30 rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Pilot Outcomes (Weeks 1-4)</h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Ticket Deflection</div>
              <div className="text-4xl font-bold text-white mb-1">~21.5%</div>
              <p className="text-sm text-gray-400">
                Of total ticket volume handled autonomously with proper approvals in place
              </p>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">FTE Impact</div>
              <div className="text-4xl font-bold text-white mb-1">~3 FTEs</div>
              <p className="text-sm text-gray-400">
                Worth of time returned to your team for strategic work
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">App Access & In-App Actions TTR</div>
              <div className="text-4xl font-bold text-green-400 mb-1">Real-time</div>
              <p className="text-sm text-gray-400">
                When approval policies exist. Includes app provisioning, group adds, license changes
              </p>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Other Requests</div>
              <div className="text-4xl font-bold text-white mb-1">50-75%</div>
              <p className="text-sm text-gray-400">
                Faster resolution for triage, routing, and assisted workflows
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="border-t border-gray-700 pt-6">
          <h4 className="font-semibold text-white mb-4">4-Week Pilot Timeline</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-400">Week 1</div>
              <div className="text-sm text-gray-300">
                Connector setup, approval workflow mapping, initial agent configuration
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-400">Week 2</div>
              <div className="text-sm text-gray-300">
                Shadow mode: agents observe and suggest actions, human approval required for all
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-400">Week 3</div>
              <div className="text-sm text-gray-300">
                Gradual autonomy: pre-approved categories execute autonomously, others remain assisted
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-400">Week 4</div>
              <div className="text-sm text-gray-300">
                Full pilot: measure deflection, TTR improvement, and team feedback for expansion
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Success Factors */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6">
        <h3 className="font-bold text-white mb-4">Key Success Factors</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Pre-existing approval workflows</div>
                <div className="text-sm text-gray-400">Speeds up autonomous operations significantly</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Clear ticket categorization</div>
                <div className="text-sm text-gray-400">Enables accurate pattern matching and routing</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <div className="font-semibold text-white text-sm mb-1">Team engagement</div>
                <div className="text-sm text-gray-400">Higher adoption when team understands the value</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <div>
                <div className="font-semibold text-white text-sm mb-1">API access to core systems</div>
                <div className="text-sm text-gray-400">Required for real-time execution capabilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

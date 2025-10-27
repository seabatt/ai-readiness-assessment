export default function WhereAutomationsWin() {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Where Automations Win First</h2>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 mb-8">
        <p className="text-lg text-gray-300 mb-6">
          Based on anonymized discovery data across IT organizations, three categories consistently show
          the highest automation potential with the fastest time-to-value:
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* App Access */}
          <div className="bg-black/50 border border-gray-800/50 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">23%</div>
            <h3 className="font-bold text-white mb-3">App Access</h3>
            <p className="text-sm text-gray-400 mb-4">
              Of total ticket volume. Median TTR: 1.5–1.7 hours.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Group-based provisioning</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Pre-approved app catalog</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Near real-time execution</span>
              </div>
            </div>
          </div>

          {/* DL Changes */}
          <div className="bg-black/50 border border-gray-800/50 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">13%</div>
            <h3 className="font-bold text-white mb-3">DL Changes</h3>
            <p className="text-sm text-gray-400 mb-4">
              Of total ticket volume. Median TTR: 1–1.5 hours.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Email group management</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Shared drive access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Rules-based automation</span>
              </div>
            </div>
          </div>

          {/* In-App Actions */}
          <div className="bg-black/50 border border-gray-800/50 rounded-lg p-6">
            <div className="text-3xl font-bold text-white mb-2">18%</div>
            <h3 className="font-bold text-white mb-3">In-App Actions</h3>
            <p className="text-sm text-gray-400 mb-4">
              Of total ticket volume. Median TTR: 45 min–2 hours.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">License tier changes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">Channel/workspace setup</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✓</span>
                <span className="text-gray-300">User attribute updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border border-blue-800/30 rounded-lg p-8">
        <h3 className="text-xl font-bold text-white mb-4">Why We're Confident Suggesting These First</h3>
        <p className="text-gray-300 mb-4">
          In anonymized analyses across IT organizations, these three categories consistently deliver:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Phase 1 Results (Weeks 1-4)</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• ~21.5% ticket deflection with the right connections</li>
              <li>• ~3 FTE worth of time returned to team</li>
              <li>• "Instant" TTR when approvals are pre-routed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">High-Confidence Criteria</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Clear approval workflows already exist</li>
              <li>• Repeatable patterns in ticket data</li>
              <li>• Structured data available via APIs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

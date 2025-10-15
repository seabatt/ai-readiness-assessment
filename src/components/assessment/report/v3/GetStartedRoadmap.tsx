import { AutomationOpportunity } from '@/types';

interface GetStartedRoadmapProps {
  topOpportunities: AutomationOpportunity[];
  hasApprovalWorkflows: boolean;
  techStack: string[];
}

export default function GetStartedRoadmap({
  topOpportunities,
  hasApprovalWorkflows,
  techStack,
}: GetStartedRoadmapProps) {
  // Get the top opportunity for each phase
  const crawlWorkflow = topOpportunities[0];
  const walkWorkflows = topOpportunities.slice(0, 2);
  const runWorkflows = topOpportunities.slice(0, 5);

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">How to Get Started: Crawl → Walk → Run</h2>
      
      <p className="text-lg text-gray-300 mb-8 max-w-4xl">
        Most teams deploy their first AI Worker within 2 weeks and see measurable impact within 30 days. 
        Here's your phased roadmap with recommended use cases for each stage.
      </p>

      <div className="space-y-6">
        {/* Crawl Phase */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Crawl (Week 1-2)</h3>
              <p className="text-gray-400">Shadow mode, single connector, low-risk workflow</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Recommended First Workflow</h4>
              <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                <div className="font-semibold text-white mb-1">{crawlWorkflow?.processName || 'App Access Requests'}</div>
                <p className="text-sm text-gray-400 mb-2">{crawlWorkflow?.tool || 'Okta'} integration</p>
                <p className="text-sm text-gray-300">{crawlWorkflow?.description}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Week 1-2 Activities</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Enable 1 read-only connector (15 min setup)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>AI Worker observes in shadow mode</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Review recommendations, no live actions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Validate accuracy before going live</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Goal:</span> Validate AI Worker understands your workflow patterns without risk. 
              Team gains confidence before enabling live actions.
            </p>
          </div>
        </div>

        {/* Walk Phase */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Walk (Week 3-4)</h3>
              <p className="text-gray-400">Live actions with approvals, expand to 2-3 workflows</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Add Workflows</h4>
              <div className="space-y-3">
                {walkWorkflows.map((opp, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800/50 rounded-lg p-3">
                    <div className="font-semibold text-white text-sm mb-1">{opp.processName}</div>
                    <p className="text-xs text-gray-400">{opp.projectedDeflection}% deflection · {opp.tool}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Week 3-4 Activities</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Enable live actions with approval workflows</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Expand to 2-3 connectors in your stack</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Configure RBAC policies and guardrails</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Monitor metrics: deflection rate, TTR reduction</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-800/30 rounded p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Goal:</span> Handle real requests with proper approvals in place. 
              Measure impact and build operational confidence.
            </p>
          </div>
        </div>

        {/* Run Phase */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Run (Month 2-3)</h3>
              <p className="text-gray-400">Full deployment, 5+ workflows, autonomous operations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Full Workflow Coverage</h4>
              <div className="bg-black/50 border border-gray-800/50 rounded-lg p-4">
                <div className="text-3xl font-bold text-white mb-2">{runWorkflows.length}</div>
                <p className="text-sm text-gray-400 mb-3">Active AI Workers</p>
                <div className="space-y-1">
                  {runWorkflows.map((opp, idx) => (
                    <div key={idx} className="text-xs text-gray-500">
                      • {opp.processName} ({opp.projectedDeflection}%)
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Month 2-3 Activities</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Deploy all 5 recommended AI Workers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Connect {techStack.length} tools in your stack</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Track ROI: deflection %, hours saved, FTE impact</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Optimize based on usage patterns and feedback</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-900/20 border border-purple-800/30 rounded p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Goal:</span> Autonomous IT operations at scale. 
              Team capacity freed for strategic initiatives, measurable ROI delivered.
            </p>
          </div>
        </div>
      </div>

      {/* Approval Workflows Note */}
      {!hasApprovalWorkflows && (
        <div className="mt-6 bg-orange-900/20 border border-orange-800/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-orange-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="font-semibold text-white mb-2">Set Up Approval Workflows First</h4>
              <p className="text-sm text-gray-300">
                AI Workers operate most effectively with approval workflows in place. Week 1 should include 
                mapping your existing approval processes before enabling live actions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

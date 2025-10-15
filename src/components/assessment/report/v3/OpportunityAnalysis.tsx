import { AutomationOpportunity } from '@/types';

interface OpportunityAnalysisProps {
  topOpportunities: AutomationOpportunity[];
  estimatedDeflection: number;
  techStack: string[];
}

export default function OpportunityAnalysis({
  topOpportunities,
  estimatedDeflection,
  techStack,
}: OpportunityAnalysisProps) {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Where AI Workers Help First</h2>
      
      <p className="text-lg text-gray-300 mb-8 max-w-4xl">
        Based on your tech stack and ticket patterns, AI Workers can automate {estimatedDeflection}% of 
        volume across five high-impact areas. These workflows integrate with your existing tools and 
        operate within enterprise guardrails.
      </p>

      <div className="space-y-4">
        {topOpportunities.map((opp, index) => (
          <div
            key={index}
            className="bg-[rgb(30,30,29)] rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{opp.processName}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{opp.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Tool:</span>
                      <span className="text-white font-semibold">{opp.tool}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-white">{opp.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Confidence:</span>
                      <span className="text-green-400 font-semibold capitalize">{opp.confidence}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 text-right">
                  <div className="text-4xl font-bold text-white mb-1">{opp.projectedDeflection}%</div>
                  <div className="text-sm text-gray-400">deflection</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Capabilities Callout */}
      <div className="mt-8 bg-blue-900/20 border border-blue-800/30 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-5.586a2 2 0 010 2.828l-3 3a2 2 0 01-2.828 0L8 9.172a2 2 0 000-2.828l3-3a2 2 0 012.828 0L15.586 5.414a2 2 0 012.828 0l3 3a2 2 0 010 2.828z" />
          </svg>
          <div>
            <h4 className="font-bold text-white mb-2">Enterprise-Grade Integration</h4>
            <p className="text-sm text-gray-300">
              AI Workers integrate with {techStack.length} tools in your stack through OAuth 2.0 connectors. 
              All actions flow through existing approval workflows, RBAC policies, and audit logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

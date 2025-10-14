interface TechStackCoverageProps {
  selectedTools: string[];
}

export default function TechStackCoverage({ selectedTools }: TechStackCoverageProps) {
  const categories = [
    {
      name: 'Identity & Access Management',
      tools: ['Okta', 'Microsoft Entra', 'JumpCloud', 'Google Workspace']
    },
    {
      name: 'ITSM Platforms',
      tools: ['ServiceNow', 'Jira Service Management', 'Freshservice', 'Ivanti']
    },
    {
      name: 'Communication',
      tools: ['Slack', 'Microsoft Teams', 'Zoom', 'Google Chat']
    },
    {
      name: 'Productivity Suites',
      tools: ['Google Workspace', 'Microsoft 365', 'Notion', 'Atlassian']
    },
    {
      name: 'HR Systems',
      tools: ['BambooHR', 'Workday', 'SuccessFactors', 'HiBob']
    },
    {
      name: 'CRM & Sales',
      tools: ['Salesforce', 'HubSpot', 'Zendesk', 'Intercom']
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Tech Stack Coverage</h2>
      <p className="text-lg text-gray-400 mb-8">
        AI Workers integrate with your existing tools through secure, enterprise-grade connectors.
      </p>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-300">Tool</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, catIndex) => (
                category.tools.map((tool, toolIndex) => (
                  <tr
                    key={`${catIndex}-${toolIndex}`}
                    className="border-b border-gray-800/50 hover:bg-black/30 transition-colors"
                  >
                    {toolIndex === 0 && (
                      <td
                        rowSpan={category.tools.length}
                        className="px-6 py-4 font-medium text-white border-r border-gray-800/50"
                      >
                        {category.name}
                      </td>
                    )}
                    <td className="px-6 py-4 text-gray-300">{tool}</td>
                    <td className="px-6 py-4 text-center">
                      {selectedTools.includes(tool) ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/30 border border-green-800/50 rounded-full">
                          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-semibold text-green-400">Connected</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/30 border border-gray-700/50 rounded-full">
                          <span className="text-sm text-gray-500">Available</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-blue-900/20 border border-blue-800/30 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="font-semibold text-white mb-2">Enterprise-Grade Security</h3>
            <p className="text-sm text-gray-300">
              All connectors use OAuth 2.0, support SSO, and operate with least-privilege access. 
              Credentials are encrypted at rest and in transit. SOC 2 Type II compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

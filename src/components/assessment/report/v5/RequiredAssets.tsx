'use client';

import ResponsiveTable from '@/components/ui/ResponsiveTable';

export default function RequiredAssets() {
  const categories = [
    {
      category: "Rules (Knowledge)",
      description: "All written policies, exception rules, approval workflows, and escalation paths. This includes IT service catalogs, compliance documents, access control matrices, and any documented decision trees. These materials form the AI Worker's 'source of truth' and ensure it follows your organization's governance standards. Without comprehensive rules, the AI Worker cannot make informed, policy-compliant decisions."
    },
    {
      category: "Data",
      description: "Historical tickets, support requests, incident logs, and user interaction data from the past 6-12 months. This data reveals patterns in ticket volume, resolution times, common issues, and edge cases. The AI Worker learns from this information to understand your environment's unique characteristics and improve accuracy over time. Minimum recommended dataset: 3 months of ticket history with at least 1,000 tickets."
    },
    {
      category: "Connections",
      description: "Read/write API access to integrated systems (ITSM tools, identity providers, collaboration platforms). This includes OAuth2 tokens, service account credentials, API keys, and SSO configurations. Proper integration credentials enable the AI Worker to execute actions across your tech stack. Security note: use dedicated service accounts with least-privilege access and enable audit logging for all automated actions."
    },
    {
      category: "Stakeholder Alignment",
      description: "Buy-in and availability from key participants including IT admins, security leads, process owners, legal/compliance teams, and end-user representatives. Each stakeholder plays a critical role in configuration, testing, and validation. Schedule regular check-ins during the 4-6 week deployment to address concerns, gather feedback, and ensure smooth adoption across departments."
    }
  ];

  const columns = [
    {
      key: 'category',
      label: 'Category',
      className: 'font-semibold text-text-primary w-1/4'
    },
    {
      key: 'description',
      label: 'Description',
      className: 'w-3/4'
    }
  ];

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        What You Will Need to Collect
      </h3>
      <p className="text-lg text-text-secondary mb-8">
        To ensure the AI Worker is configured correctly and governed effectively, gather the following before deployment:
      </p>
      
      <div className="bg-bg-card border border-brand-secondary/10 rounded-card p-6 mb-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-bg-card-alt/20">
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/4">Category</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-3/4">Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((row, index) => (
              <tr key={index} className="border-b border-bg-card-alt/10 hover:bg-bg-card-alt/5 transition-colors duration-200">
                <td className="py-4 px-4 text-sm font-semibold text-text-primary">{row.category}</td>
                <td className="py-4 px-4 text-sm text-text-secondary leading-relaxed">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-bg-card-alt/10 border border-bg-card-alt/20 rounded-card p-6">
        <h4 className="text-lg font-bold text-text-primary mb-3">
          Why This Matters
        </h4>
        <p className="text-lg text-text-secondary mb-3 leading-relaxed">
          This plan gives your team a <strong className="text-text-primary">realistic roadmap</strong> to deploy AI safely — not a hype cycle.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          By preparing these assets and stakeholders upfront, you'll ensure your AI Workers are operational, auditable, and scalable within weeks — not quarters.
        </p>
      </div>
    </section>
  );
}

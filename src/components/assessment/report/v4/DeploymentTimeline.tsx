'use client';

import ResponsiveTable from '@/components/ui/ResponsiveTable';

export default function DeploymentTimeline() {
  const timeline = [
    {
      phase: "Phase One — Integration Setup",
      activity: "Connect systems and validate API access",
      participants: "IT Admin, Security Lead, Implementation Engineer, CIO",
      collectionsNeeded: ["🔹 Connections (API tokens, permissions)", "🔹 Data (sample tickets)", "🔹 Budget (initial allocation)"]
    },
    {
      phase: "Phase Two — Rule & Policy Configuration",
      activity: "Input approval workflows, exception rules, escalation paths",
      participants: "Process Owner, Legal, End User Rep",
      collectionsNeeded: ["🔹 Rules (policy docs, decision trees)", "🔹 Documentation (SOPs, compliance requirements)"]
    },
    {
      phase: "Phase Three — AI Worker Training",
      activity: "Fine-tune AI Worker on historical tickets and validate accuracy",
      participants: "Implementation Engineer, IT Admin, End User Rep",
      collectionsNeeded: ["🔹 Data (historical requests for training)", "🔹 Connections (read/write access validated)"]
    },
    {
      phase: "Phase Four — User Acceptance Testing (UAT)",
      activity: "Test AI Worker with real scenarios; gather feedback",
      participants: "End User Rep, Department Head, Security Lead",
      collectionsNeeded: ["🔹 Rules (validated edge cases)", "🔹 Documentation (updated runbook)"]
    },
    {
      phase: "Phase Five — Security & Compliance Review",
      activity: "Final audit of data access, logging, and governance controls",
      participants: "Security Lead, Legal, CIO/CISO",
      collectionsNeeded: ["🔹 Documentation (audit trail, compliance checklist)", "🔹 Budget (final sign-off for production)"]
    },
    {
      phase: "Phase Six — Production Pilot Launch",
      activity: "Deploy AI Worker to production with limited scope; monitor performance",
      participants: "All Stakeholders (monitoring & support)",
      collectionsNeeded: ["🔹 All assets validated and operational"]
    }
  ];

  const columns = [
    {
      key: 'phase',
      label: 'Phase',
      className: 'font-semibold text-text-primary w-1/6'
    },
    {
      key: 'activity',
      label: 'Activity',
      className: 'w-2/6'
    },
    {
      key: 'participants',
      label: 'Key Participants',
      className: 'w-1/4'
    },
    {
      key: 'collectionsNeeded',
      label: 'What We Need to Collect',
      className: 'w-1/3',
      render: (value: string[]) => (
        <ul className="space-y-1">
          {value.map((item, index) => (
            <li key={index} className="text-sm">{item}</li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        Timeline to Deploy
      </h3>
      <p className="text-text-secondary mb-8">
        A realistic view of what to expect from kickoff to production, typically completed within <strong className="text-text-primary">4–6 weeks</strong>.
      </p>
      
      <div className="bg-bg-card border border-brand-secondary/10 rounded-card p-6 mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-bg-card-alt/20">
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/6">Phase</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-2/6">Activity</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/4">Key Participants</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/3">What We Need to Collect</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((row, index) => (
              <tr key={index} className="border-b border-bg-card-alt/10 hover:bg-bg-card-alt/5 transition-colors duration-200">
                <td className="py-4 px-4 text-sm font-semibold text-text-primary">{row.phase}</td>
                <td className="py-4 px-4 text-sm text-text-secondary">{row.activity}</td>
                <td className="py-4 px-4 text-sm text-text-secondary">{row.participants}</td>
                <td className="py-4 px-4 text-sm text-text-secondary">
                  <ul className="space-y-1">
                    {row.collectionsNeeded.map((item, idx) => (
                      <li key={idx} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

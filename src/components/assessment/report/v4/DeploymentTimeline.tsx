'use client';

export default function DeploymentTimeline() {
  const timeline = [
    {
      phaseNumber: "Phase One",
      phaseName: "Integration Setup",
      activity: "Connect systems and validate API access",
      participants: "IT Admin, Security Lead, Implementation Engineer, CIO"
    },
    {
      phaseNumber: "Phase Two",
      phaseName: "Rule & Policy Configuration",
      activity: "Input approval workflows, exception rules, escalation paths",
      participants: "Process Owner, Legal, End User Rep"
    },
    {
      phaseNumber: "Phase Three",
      phaseName: "AI Worker Training",
      activity: "Fine-tune AI Worker on historical tickets and validate accuracy",
      participants: "Implementation Engineer, IT Admin, End User Rep"
    },
    {
      phaseNumber: "Phase Four",
      phaseName: "User Acceptance Testing (UAT)",
      activity: "Test AI Worker with real scenarios; gather feedback",
      participants: "End User Rep, Department Head, Security Lead"
    },
    {
      phaseNumber: "Phase Five",
      phaseName: "Security & Compliance Review",
      activity: "Final audit of data access, logging, and governance controls",
      participants: "Security Lead, Legal, CIO/CISO"
    },
    {
      phaseNumber: "Phase Six",
      phaseName: "Production Pilot Launch",
      activity: "Deploy AI Worker to production with limited scope; monitor performance",
      participants: "All Stakeholders (monitoring & support)"
    }
  ];

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        Timeline to Deploy
      </h3>
      <p className="text-lg text-text-secondary mb-8">
        A realistic view of what to expect from kickoff to production, typically completed within <strong className="text-text-primary">4–6 weeks</strong>.
      </p>
      
      <div className="bg-bg-card border border-brand-secondary/10 rounded-card p-6 mb-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-bg-card-alt/20">
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/4">Phase</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/2">Activity</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-primary w-1/4">Key Participants</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((row, index) => (
              <tr key={index} className="border-b border-bg-card-alt/10 hover:bg-bg-card-alt/5 transition-colors duration-200">
                <td className="py-4 px-4 text-sm text-text-primary">
                  <div>{row.phaseNumber}</div>
                  <div className="font-bold">{row.phaseName}</div>
                </td>
                <td className="py-4 px-4 text-lg text-text-secondary">{row.activity}</td>
                <td className="py-4 px-4 text-lg text-text-secondary">{row.participants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

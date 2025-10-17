'use client';

import ResponsiveTable from '@/components/ui/ResponsiveTable';

export default function InternalAlignment() {
  const stakeholders = [
    {
      role: "IT Admin / System Owner",
      whyInvolved: "Provides admin API tokens and validates integrations",
      includeOnCalls: true,
      approvalNeeded: "Super Admin, Privacy & Security approval"
    },
    {
      role: "Security Lead",
      whyInvolved: "Approves OAuth scopes, validates data access controls",
      includeOnCalls: true,
      approvalNeeded: "Data access & encryption protocols"
    },
    {
      role: "Legal / Compliance Officer",
      whyInvolved: "Ensures AI Worker aligns with regulatory obligations",
      includeOnCalls: true,
      approvalNeeded: "AI governance & data residency approvals"
    },
    {
      role: "Finance / Procurement",
      whyInvolved: "Manages contract, budget allocation, and ROI tracking",
      includeOnCalls: false,
      approvalNeeded: "Contract & payment approvals"
    },
    {
      role: "End User Representative",
      whyInvolved: "Validates workflow accuracy and user experience",
      includeOnCalls: true,
      approvalNeeded: "Process sign-off"
    },
    {
      role: "Department Head (IT, HR, Procurement)",
      whyInvolved: "Champions adoption and ensures team readiness",
      includeOnCalls: false,
      approvalNeeded: "Change management approval"
    },
    {
      role: "CIO / CISO",
      whyInvolved: "Executive sponsor ensuring strategic alignment",
      includeOnCalls: true,
      approvalNeeded: "Strategic & security approval"
    }
  ];

  const columns = [
    {
      key: 'role',
      label: 'Role',
      className: 'font-semibold text-text-primary w-1/5'
    },
    {
      key: 'whyInvolved',
      label: 'Why They\'re Involved',
      className: 'w-2/5'
    },
    {
      key: 'includeOnCalls',
      label: 'Include on Calendar Invites',
      className: 'text-center w-1/6',
      render: (value: boolean) => (
        <div className="flex justify-center">
          {value ? (
            <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <span className="text-text-tertiary">—</span>
          )}
        </div>
      )
    },
    {
      key: 'approvalNeeded',
      label: 'Approval Needed',
      className: 'w-1/5'
    }
  ];

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        Secure Internal Alignment
      </h3>
      <p className="text-text-secondary mb-2">
        AI Workers cross multiple systems — and therefore multiple teams.
      </p>
      <p className="text-text-secondary mb-8">
        To deploy effectively, you'll need participation and approval from these roles:
      </p>
      
      <div className="bg-bg-card border border-brand-secondary/10 rounded-card p-6">
        <ResponsiveTable columns={columns} data={stakeholders} mobileStackBreakpoint="sm" />
      </div>
    </section>
  );
}

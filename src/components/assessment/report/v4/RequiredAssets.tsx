'use client';

import ResponsiveTable from '@/components/ui/ResponsiveTable';

export default function RequiredAssets() {
  const categories = [
    {
      category: "Rules (Knowledge)",
      description: "All written policies, exception rules, and approval logic — this becomes the AI Worker's 'source of truth.'"
    },
    {
      category: "Data",
      description: "Historical requests, tickets, or logs that show how your team currently operates."
    },
    {
      category: "Connections",
      description: "API tokens, OAuth permissions, and integration credentials needed to access your systems."
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
        What We Need to Collect
      </h3>
      <p className="text-text-secondary mb-8">
        To ensure the AI Worker is configured correctly and governed effectively, gather the following before deployment:
      </p>
      
      <div className="bg-bg-card border border-brand-secondary/10 rounded-card p-6 mb-8">
        <ResponsiveTable columns={columns} data={categories} />
      </div>

      <div className="bg-bg-card-alt/10 border border-bg-card-alt/20 rounded-card p-6">
        <h4 className="text-lg font-bold text-text-primary mb-3">
          Why This Matters
        </h4>
        <p className="text-text-secondary mb-3 leading-relaxed">
          This plan gives your team a <strong className="text-text-primary">realistic roadmap</strong> to deploy AI safely — not a hype cycle.
        </p>
        <p className="text-text-secondary leading-relaxed">
          By preparing these assets and stakeholders upfront, you'll ensure your AI Workers are operational, auditable, and scalable within weeks — not quarters.
        </p>
      </div>
    </section>
  );
}

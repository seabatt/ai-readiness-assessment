'use client';

import Card from '@/components/ui/Card';

interface AdditionalContextProps {
  additionalContext: string;
  onChange: (field: string, value: string) => void;
}

export default function AdditionalContext({
  additionalContext,
  onChange,
}: AdditionalContextProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        Additional Context
      </h2>
      <p className="text-text-tertiary mb-8">
        Tell us anything that you think would be valuable for us to understand your org. We'll use AI to layer that context into our assessment.
      </p>

      <Card className="!bg-bg-card !border !border-bg-card-alt/20">
        <textarea
          value={additionalContext}
          onChange={(e) => onChange('additionalContext', e.target.value)}
          className="w-full bg-black border border-bg-card-alt/40 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-highlight/40 transition-colors resize-none"
          rows={8}
          placeholder="We are an international company, I personally oversee the IT for NAM but our team in France uses Ivanti vs ServiceNow and is managed by a different individual. They need to respect GDPR and I want the report broken out separately for their work."
        />
        <p className="text-sm text-text-tertiary mt-4">
          Examples: Multi-region setups, compliance requirements, unique workflows, org structure, tool variations
        </p>
      </Card>
    </div>
  );
}

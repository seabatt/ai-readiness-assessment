import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import { 
  APPROVAL_WORKFLOW_OPTIONS, 
  REPETITIVE_PERCENTAGE_OPTIONS, 
  PAIN_POINT_OPTIONS 
} from '@/lib/constants';

interface CurrentStateQuestionsProps {
  approvalWorkflows: string;
  repetitivePercentage: string;
  primaryPainPoint: string;
  onChange: (field: string, value: string) => void;
}

export default function CurrentStateQuestions({
  approvalWorkflows,
  repetitivePercentage,
  primaryPainPoint,
  onChange
}: CurrentStateQuestionsProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        Last Few Questions About Your Current Setup
      </h2>
      <p className="text-text-secondary mb-8">
        This helps us provide the most accurate assessment
      </p>

      <Card className="!bg-black">
        <div className="space-y-6">
          <Select
            label="Do you have formal approval workflows for access requests?"
            value={approvalWorkflows}
            onChange={(e) => onChange('approvalWorkflows', e.target.value)}
            options={APPROVAL_WORKFLOW_OPTIONS}
            required
          />

          <Select
            label="What percentage of tickets are repetitive/routine?"
            value={repetitivePercentage}
            onChange={(e) => onChange('repetitivePercentage', e.target.value)}
            options={REPETITIVE_PERCENTAGE_OPTIONS}
            required
          />

          <Select
            label="Primary pain point with current ITSM"
            value={primaryPainPoint}
            onChange={(e) => onChange('primaryPainPoint', e.target.value)}
            options={PAIN_POINT_OPTIONS}
            required
          />
        </div>
      </Card>
    </div>
  );
}

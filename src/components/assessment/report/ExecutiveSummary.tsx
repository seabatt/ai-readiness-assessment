import Card from '@/components/ui/Card';
import { ReadinessScore } from '@/types';

interface ExecutiveSummaryProps {
  scores: ReadinessScore;
  ticketVolume: number;
  teamSize: string;
}

export default function ExecutiveSummary({ scores, ticketVolume, teamSize }: ExecutiveSummaryProps) {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
        Your Readiness Breakdown
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Tech Stack Compatibility
          </h3>
          <div className="text-3xl font-bold text-accent-blue mb-3">
            {scores.techStackScore}/40
          </div>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• Strong foundation for deployment</li>
            <li>• Rich integration data enables learning</li>
          </ul>
        </Card>

        <Card>
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Workflow Automation Potential
          </h3>
          <div className="text-3xl font-bold text-accent-green mb-3">
            {scores.workflowScore}/35
          </div>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• High-value activities are automatable</li>
            <li>• Expected autonomous handling: 25-50%</li>
          </ul>
        </Card>

        <Card>
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Scale & Impact
          </h3>
          <div className="text-3xl font-bold text-accent-orange mb-3">
            {scores.operationalScore}/25
          </div>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• With {ticketVolume} monthly tickets</li>
            <li>• High volume accelerates learning</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

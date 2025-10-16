import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';

interface ExpectedOutcomesProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
}

export default function ExpectedOutcomes({ 
  roiResult, 
  totalMonthlyTickets 
}: ExpectedOutcomesProps) {
  
  // Calculate additional metrics
  const ticketDeflectionRate = (roiResult.automatable_tickets / totalMonthlyTickets) * 100;
  const avgHoursPerTicket = roiResult.total_hours_saved / roiResult.automatable_tickets;
  const monthlyValue = roiResult.annual_value_usd / 12;

  // Learning curve projection (conservative 15% improvement over 6 months)
  const month6Multiplier = 1.15;
  const month6Tickets = Math.round(roiResult.automatable_tickets * month6Multiplier);
  const month6Hours = roiResult.total_hours_saved * month6Multiplier;
  const month6FTE = roiResult.fte_equivalent * month6Multiplier;
  const month6Value = roiResult.annual_value_usd * month6Multiplier;

  const outcomes = [
    {
      icon: '🎯',
      title: 'Ticket Deflection',
      baseline: {
        label: 'Month 1',
        value: `${roiResult.automatable_tickets}`,
        subtitle: `${ticketDeflectionRate.toFixed(1)}% of total volume`
      },
      improved: {
        label: 'Month 6',
        value: `${month6Tickets}`,
        subtitle: `${(month6Tickets / totalMonthlyTickets * 100).toFixed(1)}% of total volume`
      },
      description: 'Tickets handled autonomously without human intervention'
    },
    {
      icon: '⏰',
      title: 'Time Savings',
      baseline: {
        label: 'Month 1',
        value: `${roiResult.total_hours_saved.toFixed(0)} hrs`,
        subtitle: `${roiResult.fte_equivalent.toFixed(1)} FTE capacity`
      },
      improved: {
        label: 'Month 6',
        value: `${month6Hours.toFixed(0)} hrs`,
        subtitle: `${month6FTE.toFixed(1)} FTE capacity`
      },
      description: 'IT team hours redirected from routine work to strategic initiatives'
    },
    {
      icon: '💰',
      title: 'Cost Savings',
      baseline: {
        label: 'Monthly',
        value: `$${(monthlyValue / 1000).toFixed(1)}K`,
        subtitle: 'Labor cost savings'
      },
      improved: {
        label: 'Annual',
        value: `$${(month6Value / 1000).toFixed(0)}K`,
        subtitle: 'With learning curve'
      },
      description: 'Fully-loaded labor cost at $100K per FTE'
    },
    {
      icon: '⚡',
      title: 'Resolution Speed',
      baseline: {
        label: 'Current Avg',
        value: `${(avgHoursPerTicket * 60).toFixed(0)} min`,
        subtitle: 'Manual processing'
      },
      improved: {
        label: 'With AI Workers',
        value: '< 5 min',
        subtitle: '70-90% faster'
      },
      description: 'Average time from ticket creation to resolution'
    }
  ];

  const qualitativeOutcomes = [
    {
      icon: '🎓',
      title: 'Continuous Learning',
      description: 'AI Workers improve accuracy over time by learning from your unique policies, edge cases, and ticket patterns'
    },
    {
      icon: '😊',
      title: 'Employee Satisfaction',
      description: 'End users get faster responses, IT team focuses on meaningful work instead of repetitive tickets'
    },
    {
      icon: '📊',
      title: 'Operational Insights',
      description: 'Real-time dashboards showing automation rates, ticket patterns, and opportunities for optimization'
    },
    {
      icon: '🔒',
      title: 'Compliance & Audit',
      description: 'Complete audit trails for all automated actions, ensuring compliance and security governance'
    },
    {
      icon: '📈',
      title: 'Scalable Operations',
      description: 'Handle ticket volume growth without proportional headcount increases'
    },
    {
      icon: '🔄',
      title: 'Reduced Context Switching',
      description: 'IT team interrupted less frequently, can focus on project work and strategic initiatives'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          📊 Expected Outcomes
        </h2>
        <p className="text-text-secondary max-w-3xl mx-auto">
          Based on your {totalMonthlyTickets.toLocaleString()} monthly tickets and {roiResult.automatable_pct.toFixed(1)}% automation potential
        </p>
      </div>

      {/* Quantitative Outcomes */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Measurable Impact
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {outcomes.map((outcome, index) => (
            <Card key={index}>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center text-2xl">
                  {outcome.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-text-primary mb-1">
                    {outcome.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {outcome.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-bg-primary rounded-lg">
                <div>
                  <div className="text-xs text-text-tertiary mb-1">
                    {outcome.baseline.label}
                  </div>
                  <div className="text-2xl font-bold text-text-primary mb-1">
                    {outcome.baseline.value}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {outcome.baseline.subtitle}
                  </div>
                </div>
                <div className="border-l border-brand-secondary/20 pl-4">
                  <div className="text-xs text-accent-green mb-1">
                    {outcome.improved.label}
                  </div>
                  <div className="text-2xl font-bold text-accent-green mb-1">
                    {outcome.improved.value}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {outcome.improved.subtitle}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Qualitative Outcomes */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-text-primary mb-6">
          Strategic Benefits
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {qualitativeOutcomes.map((outcome, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-3">{outcome.icon}</div>
              <h4 className="text-base font-bold text-text-primary mb-2">
                {outcome.title}
              </h4>
              <p className="text-sm text-text-secondary">
                {outcome.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Curve Explanation */}
      <Card className="bg-accent-blue/5 border-accent-blue/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-text-primary mb-2">
              Why Performance Improves Over Time
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              Unlike traditional automation with static rules, AI Workers continuously learn from every ticket they process:
            </p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">→</span>
                <span><strong>Policy learning:</strong> Understand nuances in approval patterns and access policies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">→</span>
                <span><strong>Edge case handling:</strong> Build knowledge of exceptions and special scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">→</span>
                <span><strong>Ticket pattern recognition:</strong> Better categorization and routing over time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-blue mt-0.5">→</span>
                <span><strong>Context awareness:</strong> Learn relationships between users, teams, and resources</span>
              </li>
            </ul>
            <p className="text-xs text-text-tertiary mt-3">
              Conservative estimate: 15% improvement by Month 6. Top performers see 30-40% improvement by Month 12.
            </p>
          </div>
        </div>
      </Card>

      {/* Confidence Disclaimer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-tertiary">
          Outcomes based on {roiResult.confidence}% confidence score using your actual tech stack and ticket distribution.
          <button className="text-accent-blue hover:underline ml-1">
            View methodology
          </button>
        </p>
      </div>
    </div>
  );
}

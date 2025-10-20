import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';
import { formatLargeNumber } from '@/lib/utils/formatNumber';

interface ExpectedOutcomesProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
}

export default function ExpectedOutcomes({ 
  roiResult, 
  totalMonthlyTickets 
}: ExpectedOutcomesProps) {
  
  // Calculate additional metrics
  const ticketDeflectionRate = totalMonthlyTickets > 0 
    ? (roiResult.automatable_tickets / totalMonthlyTickets) * 100 
    : 0;
  const avgHoursPerTicket = roiResult.automatable_tickets > 0 
    ? roiResult.total_hours_saved / roiResult.automatable_tickets 
    : 0;
  const monthlyValue = roiResult.annual_value_usd / 12;

  // Learning curve projection (conservative 15% improvement over 6 months)
  const month6Multiplier = 1.15;
  const projectedMonth6Tickets = Math.round(roiResult.automatable_tickets * month6Multiplier);
  
  // Cap at total monthly tickets (can't automate more than 100%)
  const month6Tickets = Math.min(projectedMonth6Tickets, totalMonthlyTickets);
  
  // Calculate actual improvement ratio achieved (may be less than 1.15 if capped)
  // Guard against division by zero
  const actualMultiplier = roiResult.automatable_tickets > 0 
    ? month6Tickets / roiResult.automatable_tickets 
    : 0;
  
  // Apply proportional improvements to hours, FTE, and value
  const month6Hours = roiResult.total_hours_saved * actualMultiplier;
  const month6FTE = roiResult.fte_equivalent * actualMultiplier;
  const month6Value = roiResult.annual_value_usd * actualMultiplier;

  const getIconSvg = (iconType: string) => {
    const icons: Record<string, JSX.Element> = {
      target: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      clock: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      currency: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      lightning: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      graduation: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      smile: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      chart: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      lock: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      trending: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      refresh: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    };
    return icons[iconType] || null;
  };

  const outcomes = [
    {
      icon: 'target',
      title: 'Ticket Deflection',
      baseline: {
        label: 'Month 1',
        value: `${roiResult.automatable_tickets.toLocaleString()}`,
        subtitle: `${ticketDeflectionRate.toFixed(1)}% of total volume`
      },
      improved: {
        label: 'Month 6',
        value: `${month6Tickets.toLocaleString()}`,
        subtitle: totalMonthlyTickets > 0 
          ? `${(month6Tickets / totalMonthlyTickets * 100).toFixed(1)}% of total volume`
          : '0.0% of total volume'
      },
      description: 'Tickets handled autonomously without human intervention'
    },
    {
      icon: 'clock',
      title: 'Time Savings',
      baseline: {
        label: 'Month 1',
        value: `${Math.round(roiResult.total_hours_saved).toLocaleString()} hrs`,
        subtitle: `${roiResult.fte_equivalent.toFixed(1)} FTE capacity`
      },
      improved: {
        label: 'Month 6',
        value: `${Math.round(month6Hours).toLocaleString()} hrs`,
        subtitle: `${month6FTE.toFixed(1)} FTE capacity`
      },
      description: 'IT team hours redirected from routine work to strategic initiatives'
    },
    {
      icon: 'currency',
      title: 'Cost Savings',
      baseline: {
        label: 'Monthly',
        value: formatLargeNumber(monthlyValue, '$'),
        subtitle: 'Labor cost savings'
      },
      improved: {
        label: 'Annual',
        value: formatLargeNumber(month6Value, '$'),
        subtitle: 'With learning curve'
      },
      description: 'Fully-loaded labor cost at $100K per FTE'
    },
    {
      icon: 'lightning',
      title: 'Resolution Speed',
      baseline: {
        label: 'Current Avg',
        value: `${Math.round(avgHoursPerTicket * 60).toLocaleString()} min`,
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
      icon: 'graduation',
      title: 'Continuous Learning',
      description: 'AI Workers improve accuracy over time by learning from your unique policies, edge cases, and ticket patterns'
    },
    {
      icon: 'smile',
      title: 'Employee Satisfaction',
      description: 'End users get faster responses, IT team focuses on meaningful work instead of repetitive tickets'
    },
    {
      icon: 'chart',
      title: 'Operational Insights',
      description: 'Real-time dashboards showing automation rates, ticket patterns, and opportunities for optimization'
    },
    {
      icon: 'lock',
      title: 'Compliance & Audit',
      description: 'Complete audit trails for all automated actions, ensuring compliance and security governance'
    },
    {
      icon: 'trending',
      title: 'Scalable Operations',
      description: 'Handle ticket volume growth without proportional headcount increases'
    },
    {
      icon: 'refresh',
      title: 'Reduced Context Switching',
      description: 'IT team interrupted less frequently, can focus on project work and strategic initiatives'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          What to Expect
        </h2>
        <p className="text-text-secondary max-w-3xl">
          Projected results from deploying AI Workers with your {totalMonthlyTickets.toLocaleString()} monthly tickets
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
                <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center text-accent-blue">
                  {getIconSvg(outcome.icon)}
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
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center text-accent-blue">
                  {getIconSvg(outcome.icon)}
                </div>
              </div>
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
        </p>
      </div>
    </div>
  );
}

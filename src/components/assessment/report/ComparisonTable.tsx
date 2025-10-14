import Card from '@/components/ui/Card';

interface ComparisonTableProps {
  userScore: number;
}

export default function ComparisonTable({ userScore }: ComparisonTableProps) {
  const data = [
    { metric: 'Automation Readiness', you: userScore, industry: 55, topPerformers: 85 },
    { metric: 'Tech Stack Compatibility', you: Math.round(userScore * 1.2), industry: 60, topPerformers: 95 },
    { metric: 'Autonomous Handling Potential', you: `${Math.round(userScore * 0.6)}%`, industry: '30%', topPerformers: '65%' },
    { metric: 'Manual Ticket Processing', you: `${100 - userScore}%`, industry: '75%', topPerformers: '25%' },
  ];

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-text-primary mb-4 text-center">
        How You Stack Up
      </h2>
      <p className="text-text-secondary text-center mb-8">
        Comparison to industry benchmarks
      </p>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-secondary/20">
                <th className="text-left py-4 px-4 text-text-primary font-semibold">Metric</th>
                <th className="text-center py-4 px-4 text-accent-blue font-semibold">You</th>
                <th className="text-center py-4 px-4 text-text-tertiary font-semibold">Industry Avg</th>
                <th className="text-center py-4 px-4 text-accent-green font-semibold">Top Performers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-brand-secondary/10 last:border-0">
                  <td className="py-4 px-4 text-text-secondary">{row.metric}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-accent-blue">{row.you}</span>
                  </td>
                  <td className="py-4 px-4 text-center text-text-tertiary">{row.industry}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-bold text-accent-green">{row.topPerformers}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-bg-primary rounded-lg">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Key Insight:</span> You're {userScore - 55}% more ready than average but {85 - userScore}% behind industry leaders. 
            The gap? Orchestration across your existing tools and continuous learning from ticket patterns. 
            Top performers' AI Workers have been learning for 12+ months, reaching 65% autonomous handling vs. 46% for new deployments at Month 6.
          </p>
        </div>
      </Card>
    </div>
  );
}

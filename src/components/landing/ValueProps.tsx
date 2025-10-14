
import Card from '@/components/ui/Card';

export default function ValueProps() {
  const props = [
    {
      icon: '🧠',
      title: 'Learns Your Environment',
      points: [
        'Analyzes your actual ticket patterns',
        'Understands your specific policies',
        'Adapts to how your team works'
      ]
    },
    {
      icon: '📚',
      title: 'Production-Ready Library',
      points: [
        'Many pre-built AI Workers available',
        'Deploy in days, not quarters',
        'No custom development required'
      ]
    },
    {
      icon: '🛡️',
      title: 'Enterprise-Grade',
      points: [
        'Policy-safe autonomous decisions',
        'Human-in-the-loop when needed',
        'Full audit trail and dashboards'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 bg-bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <Card key={index}>
              <div className="text-5xl mb-4">{prop.icon}</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                {prop.title}
              </h3>
              <ul className="space-y-2">
                {prop.points.map((point, i) => (
                  <li key={i} className="text-text-secondary flex items-start gap-2">
                    <span className="text-accent-green mt-1">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

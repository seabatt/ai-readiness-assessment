import Card from '@/components/ui/Card';

export default function PainPoints() {
  const painPoints = [
    {
      icon: '⚡',
      title: 'Drowning in repetitive tickets?',
      description: 'Tickets that never quite follow the same pattern'
    },
    {
      icon: '📊',
      title: 'Boss expects more with less?',
      description: 'Pressure to be more efficient with fewer resources'
    },
    {
      icon: '🔧',
      title: 'Automation tools breaking?',
      description: 'Tools that break every time something changes'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <Card key={index} hover>
              <div className="text-4xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {point.title}
              </h3>
              <p className="text-text-secondary">{point.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

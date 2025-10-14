'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Is Your IT Team Ready for an AI Worker?
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            AI Workers learn from your tickets, adapt to your processes, and improve over time. 
            Find out if your IT stack can support a digital teammate that gets smarter with every request.
          </p>
          <Button 
            onClick={() => router.push('/assessment')}
            className="text-lg px-8 py-4"
          >
            Assess My IT Readiness (3 min)
          </Button>
        </div>

        {/* Pain Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <Card hover>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Drowning in repetitive tickets?</h3>
            <p className="text-text-secondary">
              Tickets that never quite follow the same pattern
            </p>
          </Card>
          <Card hover>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Boss expects more with less?</h3>
            <p className="text-text-secondary">
              Headcount pressure while ticket volume grows
            </p>
          </Card>
          <Card hover>
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">Automation tools that break?</h3>
            <p className="text-text-secondary">
              Every time something changes, workflows fail
            </p>
          </Card>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Learns Your Environment</h3>
            <p className="text-text-secondary text-sm">
              Analyzes your actual ticket patterns and adapts to how your team works
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Production-Ready Library</h3>
            <p className="text-text-secondary text-sm">
              Many pre-built AI Workers available — deploy in days, not quarters
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Enterprise-Grade</h3>
            <p className="text-text-secondary text-sm">
              Policy-safe with human oversight, full audit trails, and real-time dashboards
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-secondary/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-text-tertiary text-sm">
            Built by the team behind WalkMe • Backed by A*, lool ventures, FirstMinute Capital
          </p>
        </div>
      </footer>
    </main>
  );
}

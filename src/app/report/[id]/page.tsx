'use client';

import { useEffect, useState } from 'react';
import { AssessmentData, MatchedWorker, ReadinessScore } from '@/types';
import { calculateReadinessScore } from '@/lib/scoringAlgorithm';
import { matchAIWorkers, calculateProjectedImpact } from '@/lib/workerMatcher';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import StatusPill from '@/components/ui/StatusPill';

export default function ReportPage() {
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<ReadinessScore | null>(null);
  const [workers, setWorkers] = useState<MatchedWorker[]>([]);
  const [impact, setImpact] = useState<any>(null);

  useEffect(() => {
    // Get data from sessionStorage
    const dataStr = sessionStorage.getItem('assessmentData');
    if (!dataStr) {
      window.location.href = '/';
      return;
    }

    const data: AssessmentData = JSON.parse(dataStr);
    
    // Calculate score and matches
    setTimeout(() => {
      const calcScore = calculateReadinessScore(data);
      const matchedWorkers = matchAIWorkers(data);
      const projectedImpact = calculateProjectedImpact(matchedWorkers);

      setScore(calcScore);
      setWorkers(matchedWorkers);
      setImpact(projectedImpact);
      setLoading(false);
    }, 3000); // Simulate processing
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent-blue border-t-transparent mb-8" />
          <h2 className="text-2xl font-bold">Generating your report...</h2>
        </div>
      </div>
    );
  }

  const week1Workers = workers.filter(w => w.deploymentPhase === 'week-1').slice(0, 3);

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Score Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-8">Your IT Automation Readiness Score</h1>
          <div className="inline-flex flex-col items-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-bg-card"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - (score?.total || 0) / 100)}`}
                  className="text-accent-blue transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold">{score?.total}</div>
                  <div className="text-sm text-text-tertiary">/ 100</div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xl font-semibold text-accent-blue capitalize">
              {score?.rating.replace('-', ' ')}
            </div>
          </div>
        </div>

        {/* Top AI Workers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">🚀 Deploy These First (Week 1-2)</h2>
          <div className="space-y-6">
            {week1Workers.map(worker => (
              <Card key={worker.id} hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <StatusPill status="success">Week 1 Ready</StatusPill>
                    <h3 className="text-2xl font-bold mt-3">{worker.name}</h3>
                    <p className="text-text-tertiary text-sm">{worker.category}</p>
                  </div>
                </div>
                <p className="text-text-secondary mb-6">{worker.description}</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-accent-green">
                      {worker.estimatedTickets}
                    </div>
                    <div className="text-sm text-text-tertiary">Tickets/Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-blue">
                      {worker.timeSaved}hrs
                    </div>
                    <div className="text-sm text-text-tertiary">Time Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-green">
                      ${worker.costSaved.toLocaleString()}
                    </div>
                    <div className="text-sm text-text-tertiary">Cost Saved/Month</div>
                  </div>
                </div>

                <div className="text-sm text-text-tertiary">
                  ⏱️ Setup: {worker.setupTime} • 📊 Learning: {worker.learningPeriod}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        {impact && (
          <Card className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Your Projected Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Phase 1 (Weeks 1-4)</h3>
                <div className="space-y-2 text-text-secondary">
                  <div>Tickets Handled: <span className="font-bold text-text-primary">{impact.phase1.ticketsHandled}/month</span></div>
                  <div>Time Saved: <span className="font-bold text-text-primary">{impact.phase1.timeSaved} hours/month</span></div>
                  <div>Cost Saved: <span className="font-bold text-accent-green">${impact.phase1.costSaved.toLocaleString()}/month</span></div>
                  <div>FTEs Freed: <span className="font-bold text-text-primary">{impact.phase1.ftesSaved}</span></div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Phase 2 (Months 2-6)</h3>
                <div className="space-y-2 text-text-secondary">
                  <div>Tickets Handled: <span className="font-bold text-text-primary">{impact.phase2.ticketsHandled}/month</span></div>
                  <div>Time Saved: <span className="font-bold text-text-primary">{impact.phase2.timeSaved} hours/month</span></div>
                  <div>Cost Saved: <span className="font-bold text-accent-green">${impact.phase2.costSaved.toLocaleString()}/month</span></div>
                  <div>FTEs Freed: <span className="font-bold text-text-primary">{impact.phase2.ftesSaved}</span></div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">See Exactly Which AI Workers Will Work in YOUR Environment</h2>
            <p className="text-text-secondary mb-6">
              This assessment uses industry benchmarks. We can analyze your actual tickets to show you precise automation opportunities.
            </p>
            <Button className="text-lg">Request Discovery Analysis</Button>
          </Card>
        </div>
      </div>
    </main>
  );
}

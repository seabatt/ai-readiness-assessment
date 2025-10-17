'use client';

import { MatchedUseCase } from '@/types/types-v3';
import InternalAlignment from './InternalAlignment';
import DeploymentTimeline from './DeploymentTimeline';
import RequiredAssets from './RequiredAssets';

interface GetStartedPlanProps {
  matchedUseCases: MatchedUseCase[];
}

export default function GetStartedPlan({ matchedUseCases }: GetStartedPlanProps) {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Section 1: Introduction */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-text-primary mb-6">
          Get Started: Your AI Worker Deployment Plan
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          A clear, personalized blueprint for moving from readiness to real results. You've identified where your tech stack can support AI Workers. Now it's time to move from <em className="text-text-primary">readiness</em> to <em className="text-text-primary">deployment</em>. This blueprint shows what to expect during implementation — even if you work with other vendors — so your team can align, prepare, and accelerate securely.
        </p>
      </section>

      {/* Section 2: Internal Alignment */}
      <InternalAlignment />

      {/* Section 3: Deployment Timeline */}
      <DeploymentTimeline />

      {/* Section 4: Required Assets */}
      <RequiredAssets />

      {/* Call to Action Section */}
      <section className="mt-12 bg-bg-card-alt/10 border border-bg-card-alt/20 rounded-card p-8 text-center">
        <p className="text-lg text-text-secondary mb-4 leading-relaxed">
          Let our AI listen to your real system data and receive a customized deployment blueprint, including your top automation opportunities and readiness score.
        </p>
        <a 
          href="https://www.ai.work/book-a-demo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-xl font-bold text-text-primary hover:text-highlight transition-colors duration-200"
        >
          Run the Full Discovery Assessment →
        </a>
      </section>
    </div>
  );
}

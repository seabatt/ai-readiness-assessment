'use client';

import { MatchedUseCase } from '@/types/types-v3';
import UseCaseCards from './UseCaseCards';
import InternalAlignment from './InternalAlignment';
import DeploymentTimeline from './DeploymentTimeline';
import RequiredAssets from './RequiredAssets';

interface GetStartedPlanProps {
  matchedUseCases: MatchedUseCase[];
}

export default function GetStartedPlan({ matchedUseCases }: GetStartedPlanProps) {
  // Get top 3 use cases for the "Identify Valuable Use Cases" section
  const topThreeUseCases = matchedUseCases.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Section 1: Introduction */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-text-primary mb-6">
          Get Started: Your AI Worker Deployment Plan
        </h2>
        <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
          <p>
            A clear, personalized blueprint for moving from readiness to real results.
          </p>
          <p>
            You've identified where your tech stack can support AI Workers. Now it's time to move from <em className="text-text-primary">readiness</em> to <em className="text-text-primary">deployment</em>.
          </p>
          <p>
            This blueprint shows what to expect during implementation — even if you work with other vendors — so your team can align, prepare, and accelerate securely.
          </p>
        </div>
      </section>

      {/* Section 2: Identify Valuable Use Cases */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold text-text-primary mb-4">
          Identify Valuable Use Cases
        </h3>
        <p className="text-text-secondary mb-4">
          Every organization's AI journey begins with one or two high-impact workflows.
        </p>
        <p className="text-text-secondary mb-8">
          We used your stack data to pinpoint areas where AI Workers will have the most immediate effect:
        </p>
        
        {topThreeUseCases.length > 0 ? (
          <UseCaseCards useCases={topThreeUseCases} showRank={false} />
        ) : (
          <p className="text-text-tertiary italic">No use cases identified yet.</p>
        )}
      </section>

      {/* Section 3: Internal Alignment */}
      <InternalAlignment />

      {/* Section 4: Deployment Timeline */}
      <DeploymentTimeline />

      {/* Section 5: Required Assets */}
      <RequiredAssets />

      {/* Final CTA */}
      <div className="mt-12 text-center">
        <a 
          href="https://www.ai.work/book-a-demo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-bg-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-highlight"></span>
          Schedule Implementation Planning Call
        </a>
      </div>
    </div>
  );
}

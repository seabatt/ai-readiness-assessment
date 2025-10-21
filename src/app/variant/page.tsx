'use client';

import Link from "next/link";
import Image from "next/image";

export default function VariantLandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-bg-card-alt/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <Image
              src="/images/aiwork-logo.png"
              alt="ai.work"
              width={120}
              height={30}
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-text-primary">
            AI Readiness Report
          </h1>
          <p className="text-text-secondary text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Find out how much ticket volume your team can deflect with AI Workers.
          </p>
          <p className="text-text-tertiary text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
            In five minutes, you'll receive a personalized AI Readiness Report showing which workflows can be automated, how many tickets can be deflected, and what that means for your team's time, cost, and SLAs.
          </p>

          {/* CTA Button */}
          <div className="max-w-md mx-auto mb-6">
            <Link
              href="/assessment"
              className="w-full bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-highlight"></span>
              Start Assessment
              <span>→</span>
            </Link>
          </div>

          <p className="text-sm text-text-tertiary">
            5 minutes • Instant results • No data stored or shared
          </p>
        </section>

        {/* Value Proposition */}
        <section className="mb-20">
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-text-primary">
              Turn backlog into bandwidth.
            </h2>
            <p className="text-lg text-text-secondary mb-4 leading-relaxed">
              Every IT team faces growing ticket volume and shrinking resources.
              The AI Readiness Report highlights where AI Workers can take on repetitive requests—so your experts can focus on higher-value work instead of constant triage.
            </p>
            <p className="text-lg text-text-primary font-semibold leading-relaxed">
              It's not theory. It's your systems, your workflows, and your deflection potential—quantified.
            </p>
          </div>
        </section>

        {/* Your Report Includes */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-text-primary">
            Your Report Includes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Deflection Score */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <h3 className="font-bold text-xl mb-3 text-text-primary">
                Ticket Deflection Score
              </h3>
              <p className="text-text-secondary">
                Estimated percentage of requests AI Workers can handle end-to-end.
              </p>
            </div>

            {/* Opportunity Map */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <h3 className="font-bold text-xl mb-3 text-text-primary">
                Opportunity Map
              </h3>
              <p className="text-text-secondary">
                Repetitive workflows ready for automation across IT, HR, and Procurement.
              </p>
            </div>

            {/* Impact Forecast */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <h3 className="font-bold text-xl mb-3 text-text-primary">
                Impact Forecast
              </h3>
              <p className="text-text-secondary">
                Time and cost savings based on your current ticket load.
              </p>
            </div>

            {/* Implementation Plan */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <h3 className="font-bold text-xl mb-3 text-text-primary">
                Implementation Plan
              </h3>
              <p className="text-text-secondary">
                Step-by-step actions to deploy safely and measure ROI.
              </p>
            </div>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="mb-20">
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-text-primary">
              What You'll Get
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-text-secondary">
                  A personalized Ticket Deflection Report tailored to your stack
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-text-secondary">
                  Top categories of tickets AI Workers can resolve automatically
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-text-secondary">
                  Estimated reduction in backlog and resolution time
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-text-secondary">
                  A deployment plan to move from pilots to production deflection
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-highlight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-text-secondary">
                  Metrics you can share with leadership to prove value
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="max-w-md mx-auto mt-12">
              <Link
                href="/assessment"
                className="w-full bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-highlight"></span>
                Start Your Assessment
                <span>→</span>
              </Link>
            </div>

            <p className="text-xs text-text-tertiary mt-6 text-center">
              Join IT leaders using AI Workers to deflect tickets and free their teams for strategic work.
            </p>
          </div>
        </section>

        {/* From Deflection to Full Automation */}
        <section className="mb-20">
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-primary">
              From deflection to full automation
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              Ticket deflection is only the start.
              With the AI Blueprint, ai.work connects to your live systems to validate real ticket data, confirm deflection potential, and map how AI Workers can scale across departments—safely and within enterprise guardrails.
            </p>
            <Link
              href="https://ai.work/book-a-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-highlight"></span>
              See How the AI Blueprint Works
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-bg-card-alt/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} ai.work. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

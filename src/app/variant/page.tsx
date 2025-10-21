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
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-text-primary">
            Find out how much ticket volume your team can deflect with AI Workers.
          </h1>
          <p className="text-text-tertiary text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            In five minutes, you'll receive a personalized report showing which workflows can be automated, how many tickets can be deflected, and what that means for your team's time, cost, and SLAs.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ticket Deflection Score */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <div className="flex md:block items-start gap-4">
                <div className="w-12 h-12 bg-bg-card-alt rounded-full flex items-center justify-center flex-shrink-0 md:mb-4">
                  <svg
                    className="w-6 h-6 text-text-tertiary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    Ticket Deflection Score
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Estimated percentage of requests AI Workers can handle end-to-end.
                  </p>
                </div>
              </div>
            </div>

            {/* Opportunity Map */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <div className="flex md:block items-start gap-4">
                <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center flex-shrink-0 md:mb-4">
                  <svg
                    className="w-6 h-6 text-highlight"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    Opportunity Map
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Repetitive workflows ready for automation across IT, HR, and Procurement.
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Forecast */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <div className="flex md:block items-start gap-4">
                <div className="w-12 h-12 bg-status-active/20 rounded-full flex items-center justify-center flex-shrink-0 md:mb-4">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    Impact Forecast
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Time and cost savings based on your current ticket load.
                  </p>
                </div>
              </div>
            </div>

            {/* Implementation Plan */}
            <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
              <div className="flex md:block items-start gap-4">
                <div className="w-12 h-12 bg-status-warning/20 rounded-full flex items-center justify-center flex-shrink-0 md:mb-4">
                  <svg
                    className="w-6 h-6 text-status-warning"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-text-primary">
                    Implementation Plan
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Step-by-step actions to deploy safely and measure ROI.
                  </p>
                </div>
              </div>
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

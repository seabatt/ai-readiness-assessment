'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Preheader */}
      <div className="bg-bg-card border-b border-bg-card-alt/20">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4 text-highlight"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-text-tertiary">
            Assessment tool based on real IT automation data
          </span>
        </div>
      </div>

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
          <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-text-primary">
            Stop guessing how AI fits into your systems.{" "}
            <strong>Start with a blueprint.</strong>
          </h1>
          <p className="text-text-tertiary text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a personalized <strong>AI Blueprint</strong> that
            identifies your top automation use cases, outlines a clear plan to
            implement AI Workers, and sets realistic expectations for outcomes —{" "}
            <strong>all based on your actual tech stack</strong>
          </p>

          {/* Email Input Form */}
          <div className="max-w-md mx-auto mb-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                Work email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-highlight transition-colors"
                required
              />
            </div>
            <Link
              href="/assessment"
              className="w-full bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-highlight"></span>
              Get Your Blueprint
              <span>→</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-text-tertiary">
              5 minutes • Instant results
            </span>
          </div>
          <p className="text-xs text-text-tertiary mt-6 text-center">
            No sensitive data stored or shared. Responses anonymized for
            benchmarking.
          </p>
        </section>

        {/* Problem Statement */}
        <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 mb-20">
          <p className="text-text-secondary mb-4 text-center">
            Use this tool to get a data-driven, reality-based assessment of what
            your organization could responsibly automate with AI in the next
            year.
          </p>
          <p className="font-semibold text-center text-lg text-text-primary">
            Assess your readiness for autonomous work today.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Card 1 */}
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
                  Readiness Score
                </h3>
                <p className="text-sm text-text-tertiary">
                  0-100 score across 5 key pillars
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
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
                  AI Workers matched to your systems and workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
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
                  Implementation Roadmap
                </h3>
                <p className="text-sm text-text-tertiary">
                  Step-by-step actions to deploy safely and efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
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
                  Realistic Expectations
                </h3>
                <p className="text-sm text-text-tertiary">
                  What AI can automate today — and what comes next.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Discover Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-text-primary">
            What You'll Discover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Top automation opportunities
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Workflows AI Workers can handle first.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Implementation steps
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Clear actions to move from pilot to production.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Impact forecast
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Expected time, cost, and efficiency gains.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Readiness breakdown
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Data, process, and governance insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Practical outcomes{" "}
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    See what AI can automate today, and what to expect next.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Downloadable report
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Share insights with leadership and stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/assessment"
            className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-4 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-highlight"></span>
            Start Your Assessment →
          </Link>
          <p className="text-text-tertiary text-sm">
            Join IT leaders discovering their automation opportunities
          </p>
        </div>
      </main>
    </div>
  );
}

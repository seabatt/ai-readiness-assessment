import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-bg-card-alt/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-text-tertiary">
              Assessment tool based on real IT automation data
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 leading-tight text-text-primary">
            Find out if your IT stack can support a digital team mate.
          </h1>
          <p className="text-text-tertiary text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Every Enterprise is putting pressure on IT Teams to do more with AI. The disconnect between Executives reading headlines about AI and frontline IT is: legacy tools, policies and procedures.
          </p>
          <Link href="/assessment" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-3 mb-6">
            <span>Start Assessment →</span>
            <span className="text-sm font-normal">
              5 minutes • Instant results
            </span>
          </Link>
          <p className="text-xs text-text-tertiary mt-6">
            No sensitive data stored or shared. Responses anonymized for benchmarking.
          </p>
        </section>

        {/* Problem Statement */}
        <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 mb-20">
          <p className="text-text-secondary mb-4 text-center">
            AI isn't an easy button. Use this tool to get a data-driven, reality-based assessment of what your organization could reasonably do with AI in the next year.
          </p>
          <p className="font-semibold text-center text-lg text-text-primary">
            Assess your readiness for autonomous work.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Card 1 */}
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
            <div className="w-12 h-12 bg-bg-card-alt rounded-full flex items-center justify-center mb-4">
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
            <h3 className="font-bold text-lg mb-2 text-text-primary">Readiness Score</h3>
            <p className="text-sm text-text-tertiary">
              0-100 score across 5 key pillars
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
            <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-highlight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2 text-text-primary">Opportunity Map</h3>
            <p className="text-sm text-text-tertiary">
              AI workers matched to your stack
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
            <div className="w-12 h-12 bg-status-active/20 rounded-full flex items-center justify-center mb-4">
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
            <h3 className="font-bold text-lg mb-2 text-text-primary">ROI Simulation</h3>
            <p className="text-sm text-text-tertiary">Hours saved & FTE impact</p>
          </div>

          {/* Card 4 */}
          <div className="border border-bg-card-alt/20 bg-bg-card rounded-xl p-8 hover:border-bg-card-alt/40 transition-colors">
            <div className="w-12 h-12 bg-status-warning/20 rounded-full flex items-center justify-center mb-4">
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
            <h3 className="font-bold text-lg mb-2 text-text-primary">Enterprise-Ready</h3>
            <p className="text-sm text-text-tertiary">
              Governance & compliance built-in
            </p>
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
                    Matched to your actual tech stack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Time & cost savings
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    ~70% accuracy based on your inputs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    Action recommendations
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Only actions we support today
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
                    By Data, Process, Governance & more
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
                    Share with stakeholders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-highlight text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-text-primary">
                    100% accuracy option
                  </h3>
                  <p className="text-sm text-text-tertiary">
                    Analyze your actual ticket data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link href="/assessment" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-4 inline-block">
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

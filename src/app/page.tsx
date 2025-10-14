import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-400">
              Assessment tool based on real IT automation data
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Is Your IT Team Ready for an AI Worker?
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-3xl mx-auto">
            AI Workers learn from your tickets, adapt to your processes, and
            improve over time. Find out if your IT stack can support a digital
            teammate that gets smarter with every request.
          </p>
          <Link href="/assessment" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-3">
            <span>Start Assessment →</span>
            <span className="text-sm font-normal">
              5 minutes • Instant results
            </span>
          </Link>
        </section>

        {/* Problem Statement */}
        <div className="border border-gray-800 rounded-xl p-8 mb-16">
          <p className="text-gray-300 mb-4 text-center">
            Under pressure to do more with less? Boss thinks the queue is slow?
            Hard to know where AI helps?
          </p>
          <p className="font-semibold text-center text-lg">
            Find out fast if you're ready for autonomous workers—and where
            they'll make a meaningful dent.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Card 1 */}
          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Readiness Score</h3>
            <p className="text-sm text-gray-400">
              0-100 score across 5 key pillars
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Opportunity Map</h3>
            <p className="text-sm text-gray-400">
              AI workers matched to your stack
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
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
            <h3 className="font-bold text-lg mb-2">ROI Simulation</h3>
            <p className="text-sm text-gray-400">Hours saved & FTE impact</p>
          </div>

          {/* Card 4 */}
          <div className="border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
            <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-500"
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
            <h3 className="font-bold text-lg mb-2">Enterprise-Ready</h3>
            <p className="text-sm text-gray-400">
              Governance & compliance built-in
            </p>
          </div>
        </div>

        {/* What You'll Discover Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            What You'll Discover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-5xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Top automation opportunities
                  </h3>
                  <p className="text-sm text-gray-400">
                    Matched to your actual tech stack
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Time & cost savings
                  </h3>
                  <p className="text-sm text-gray-400">
                    ~70% accuracy based on your inputs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Action recommendations
                  </h3>
                  <p className="text-sm text-gray-400">
                    Only actions we support today
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Readiness breakdown
                  </h3>
                  <p className="text-sm text-gray-400">
                    By Data, Process, Governance & more
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    Downloadable report
                  </h3>
                  <p className="text-sm text-gray-400">
                    Share with stakeholders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-500 text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    100% accuracy option
                  </h3>
                  <p className="text-sm text-gray-400">
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
          <p className="text-gray-500 text-sm">
            Join IT leaders discovering their automation opportunities
          </p>
        </div>
      </main>
    </div>
  );
}

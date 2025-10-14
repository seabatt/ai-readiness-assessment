import Button from '@/components/ui/Button';

interface DiscoveryCTAProps {
  onRequestDiscovery: () => void;
}

export default function DiscoveryCTA({ onRequestDiscovery }: DiscoveryCTAProps) {
  return (
    <div className="mb-16">
      <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 border border-blue-800/40 rounded-xl p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get a 100% Accurate Report</h2>
          <p className="text-xl text-gray-300 mb-8">
            This assessment provides ~70% accuracy based on your self-reported data. For precise automation
            opportunities and ROI projections, we need to analyze your actual ticket data.
          </p>

          <div className="bg-black/50 border border-gray-800 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">7-Day Ticket Listening Process</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">1</div>
                <h4 className="font-semibold text-white mb-2">Quick Call (15 min)</h4>
                <p className="text-sm text-gray-400">
                  Enable read-only connectors to your ticket sources, collaboration tools, and identity systems
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">2</div>
                <h4 className="font-semibold text-white mb-2">Discovery Agent Runs</h4>
                <p className="text-sm text-gray-400">
                  Analyzes ticket patterns, classifies into 3-level hierarchy, computes median TTR by category
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
                <h4 className="font-semibold text-white mb-2">100% Accurate Report</h4>
                <p className="text-sm text-gray-400">
                  Empirically grounded plan with exact categories to automate, precise ROI, and custom roadmap
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h4 className="font-semibold text-white mb-4">What You'll Get</h4>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Exact ticket categories to automate (down to subcategory and entity level)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Precise ROI projections for your specific team composition
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Segmentation: fully automatable / assisted / human-in-loop
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Custom 90-day roadmap with phased deployment plan
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Baseline metrics: volume by category, current median TTR
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-300">
                    Confidence intervals for deflection predictions (typically 95%+)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={onRequestDiscovery} className="text-lg px-10 py-5">
            Request Custom Discovery Report
          </Button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Private & secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Read-only access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>7 days to insights</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>15-min setup call</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

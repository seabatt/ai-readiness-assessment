import HubSpotForm from '@/components/HubSpotForm';

interface CustomReportCTAProps {
  onRequestDiscovery?: () => void;
}

export default function CustomReportCTA({ onRequestDiscovery }: CustomReportCTAProps) {
  return (
    <div className="mb-20">
      <div className="bg-bg-card border border-bg-card-alt/20 rounded-xl py-8 px-6 transition-all duration-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Move from Blueprint to Proof.</h2>
          <p className="text-xl text-text-tertiary mb-10 leading-relaxed">
            This Blueprint gives you direction — now it's time to prove it. The Data Science Assessment validates each recommendation against your real ticket data to deliver a verified automation roadmap.
          </p>

          <div className="bg-bg-primary border border-bg-card-alt/20 rounded-lg py-8 px-6 mb-8 text-left">
            <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">7-Day Ticket Listening Process</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">1</div>
                <h4 className="font-semibold text-text-primary mb-2">Quick Call (15 min)</h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Enable read-only connectors to your ticket sources, collaboration tools, and identity systems
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">2</div>
                <h4 className="font-semibold text-text-primary mb-2">Discovery Agent Runs</h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Analyzes ticket patterns, classifies into 3-level hierarchy, computes median TTR by category
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">3</div>
                <h4 className="font-semibold text-text-primary mb-2">100% Accurate Report</h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Empirically grounded plan with exact categories to automate, precise ROI, and custom roadmap
                </p>
              </div>
            </div>

            <div className="border-t border-bg-card-alt/20 pt-6">
              <h4 className="font-semibold text-text-primary mb-4 text-center">What You'll Get</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-tertiary leading-relaxed">
                    Exact ticket categories to automate (down to subcategory level)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-tertiary leading-relaxed">
                    Precise ROI projections for your specific team
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-tertiary leading-relaxed">
                    Segmentation: fully automatable vs. human-in-loop
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-tertiary leading-relaxed">
                    Custom 90-day roadmap with phased deployment
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-tertiary leading-relaxed">
                    Baseline metrics: volume by category, current median TTR
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-highlight mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-text-tertiary leading-relaxed">
                    Confidence intervals for deflection (typically 95%+)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* HubSpot Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <HubSpotForm 
              portalId="145411173"
              formId="336ea270-b317-44e7-b3a8-132aae822d08"
              region="eu1"
            />
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>7-day analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Read-only access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>15-min setup call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-text-tertiary text-sm mt-8">
        <p className="leading-relaxed">
          This assessment is based on anonymized IT automation data. Confidence: ~70% accuracy with self-reported inputs.
        </p>
      </div>
    </div>
  );
}

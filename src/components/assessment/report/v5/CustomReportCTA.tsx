'use client';

import { useEffect } from 'react';

interface CustomReportCTAProps {
  onRequestDiscovery?: () => void;
}

export default function CustomReportCTA({
  onRequestDiscovery,
}: CustomReportCTAProps) {
  useEffect(() => {
    // Load HubSpot Meetings Embed script
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  return (
    <div className="mb-20">
      <div className="bg-bg-card border border-bg-card-alt/20 rounded-xl py-8 px-6 transition-all duration-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-text-primary mb-6">
            Validate your AI Worker plan — with real data.
          </h2>
          <p className="text-xl text-text-tertiary mb-10 leading-relaxed">
            Turn your Blueprint into proof. In 7 days, we’ll analyze your live
            ticket data to confirm which workflows are truly automation-ready,
            the ROI you can expect, and a deployment roadmap built on evidence —
            not estimates.
          </p>

          <div className="bg-bg-primary border border-bg-card-alt/20 rounded-lg py-8 px-6 mb-8 text-left">
            <h3 className="text-2xl font-bold text-text-primary mb-6 text-center">
              7-Day Ticket Listening Process
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">1</div>
                <h4 className="font-semibold text-text-primary mb-2">
                  Quick Call (15 min)
                </h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Confirm systems, scope, and security setup.
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">2</div>
                <h4 className="font-semibold text-text-primary mb-2">
                  Discovery Agent Runs
                </h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Analyze ticket data, classify patterns, and detect
                  automation-ready workflows.
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-highlight mb-2">3</div>
                <h4 className="font-semibold text-text-primary mb-2">
                  Verified Report
                </h4>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Receive your empirical automation roadmap with ROI confidence
                  scores and next-step guidance.
                </p>
              </div>
            </div>

            <div className="border-t border-bg-card-alt/20 pt-6">
              <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                Start your 7-day validation today
              </h2>
            </div>

            {/* HubSpot Meeting Scheduler */}
            <div className="border-bg-card-alt/20 pt-6 mt-6">
              <div 
                className="meetings-iframe-container" 
                data-src="https://meetings-eu1.hubspot.com/maor-ezer/schedule-an-onboarding-session?embed=true"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>7-day analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Read-only access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>15-min setup call</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-text-tertiary text-sm mt-8">
        <p className="leading-relaxed">
          This assessment is based on anonymized IT automation data. Confidence:
          ~70% accuracy with self-reported inputs.
        </p>
      </div>
    </div>
  );
}

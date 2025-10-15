export default function FeatureHighlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
  );
}

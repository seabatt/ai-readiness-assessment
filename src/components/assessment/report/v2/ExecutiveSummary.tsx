import { ReadinessScore, AutomationOpportunity } from '@/types';
import ScoreCircle from '../ScoreCircle';
import CountUp from 'react-countup';

interface ExecutiveSummaryProps {
  score: ReadinessScore;
  topOpportunities: AutomationOpportunity[];
  estimatedDeflection: number;
  hoursSaved: number;
  fteImpact: number;
}

export default function ExecutiveSummary({
  score,
  topOpportunities,
  estimatedDeflection,
  hoursSaved,
  fteImpact,
}: ExecutiveSummaryProps) {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-12">Executive Summary</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Overall Score */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-6">Overall Readiness</h3>
          <div className="flex justify-center">
            <ScoreCircle score={score.total} rating={score.rating} />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-6">Estimated Impact</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Ticket Deflection</span>
              <span className="text-2xl font-bold text-white">
                <CountUp end={estimatedDeflection} duration={2} />%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Hours Saved (Annual)</span>
              <span className="text-2xl font-bold text-white">
                <CountUp end={hoursSaved} duration={2} separator="," />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">FTE Impact</span>
              <span className="text-2xl font-bold text-white">
                ~<CountUp end={fteImpact} duration={2} decimals={1} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Automations */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
        <h3 className="text-xl font-bold text-white mb-6">Top 5 Automation Opportunities</h3>
        <div className="space-y-4">
          {topOpportunities.map((opp, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-black/50 rounded-lg border border-gray-800/50"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-1">{opp.processName}</h4>
                    <p className="text-sm text-gray-400 mb-2">{opp.tool} · {opp.category}</p>
                    <p className="text-sm text-gray-300">{opp.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-white">{opp.projectedDeflection}%</div>
                    <div className="text-xs text-gray-400">deflection</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Note */}
      <p className="text-sm text-gray-500 mt-6 text-center">
        Based on anonymized IT automation data. Confidence: ~70% accuracy with self-reported inputs.
      </p>
    </div>
  );
}

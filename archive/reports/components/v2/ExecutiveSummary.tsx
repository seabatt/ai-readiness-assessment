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

      {/* Centered Score */}
      <div className="flex justify-center mb-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-6">Overall Readiness</h3>
          <ScoreCircle score={score.total} rating={score.rating} />
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <p className="text-lg text-gray-300 leading-relaxed">
          Your IT team faces a familiar challenge: tickets pile up faster than you can handle them, 
          your skilled engineers spend hours on repetitive tasks, and leadership asks for "more efficiency 
          with fewer resources." The question isn't whether AI can help—it's <span className="text-white font-semibold">how to start</span>.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Your readiness score of <span className="text-white font-bold">{score.total}/100</span> reflects 
          three critical factors: your tech stack's compatibility with autonomous teammates, your team's 
          current process maturity, and the volume of repetitive work ready for intelligent handling. This 
          isn't just a number—it's a <span className="text-white font-semibold">validated pathway from reactive 
          firefighting to autonomous, intelligent service delivery</span>.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          Organizations at your readiness level typically deploy their first autonomous teammate within 
          30-60 days, starting with high-volume, low-complexity workflows. The impact metrics below aren't 
          projections—they're <span className="text-white font-semibold">conservative estimates based on teams 
          with similar tech stacks who've already made the transition</span>.
        </p>
      </div>

      {/* Full Width Impact Metrics */}
      <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border border-blue-800/30 rounded-lg p-8 mb-12">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Estimated Impact</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              <CountUp end={estimatedDeflection} duration={2} />%
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Ticket Deflection</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              <CountUp end={hoursSaved} duration={2} separator="," />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Hours Saved (Annual)</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              ~<CountUp end={fteImpact} duration={2} decimals={1} />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">FTE Impact</div>
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

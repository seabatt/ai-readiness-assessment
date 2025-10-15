import { ReadinessScore, AssessmentData } from '@/types';
import ScoreCircle from '../ScoreCircle';
import CountUp from 'react-countup';

interface ExecutiveSummaryProps {
  score: ReadinessScore;
  assessmentData: AssessmentData;
  estimatedDeflection: number;
  hoursSaved: number;
  fteImpact: number;
}

export default function ExecutiveSummary({
  score,
  assessmentData,
  estimatedDeflection,
  hoursSaved,
  fteImpact,
}: ExecutiveSummaryProps) {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold text-white mb-8">Here's What We Found</h2>

      {/* Centered Score */}
      <div className="flex justify-center mb-12">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-6">AI Worker Readiness</h3>
          <ScoreCircle score={score.total} rating={score.rating} />
        </div>
      </div>

      {/* What This Score Means */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <p className="text-lg text-gray-300 leading-relaxed">
          Our algorithm analyzed your tech stack ({assessmentData.techStack.length} tools), 
          team size ({assessmentData.teamSize} IT staff), and ticket volume ({assessmentData.ticketVolume} monthly). 
          Your readiness score of <span className="text-white font-bold">{score.total}/100</span> reflects 
          three factors: tech stack compatibility with AI Workers, process maturity, and volume of 
          repetitive work ready for autonomous handling.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed">
          <span className="text-white font-semibold">Bottom line:</span> AI Workers can handle{' '}
          <span className="text-white font-bold">{estimatedDeflection}% of your ticket volume</span>, returning{' '}
          <span className="text-white font-bold">{hoursSaved.toLocaleString()} hours annually</span> to 
          your team for strategic work. That's roughly{' '}
          <span className="text-white font-bold">{fteImpact} FTE</span> worth of capacity.
        </p>
      </div>

      {/* Impact Metrics */}
      <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 border border-blue-800/30 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Immediate Opportunity</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              <CountUp end={estimatedDeflection} duration={2} />%
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Ticket Deflection</div>
            <p className="text-xs text-gray-500 mt-2">Of total volume handled autonomously</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              <CountUp end={hoursSaved} duration={2} separator="," />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Hours Saved (Annual)</div>
            <p className="text-xs text-gray-500 mt-2">Returned to team for strategic work</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">
              ~<CountUp end={fteImpact} duration={2} decimals={1} />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">FTE Impact</div>
            <p className="text-xs text-gray-500 mt-2">Worth of capacity unlocked</p>
          </div>
        </div>
      </div>
    </div>
  );
}

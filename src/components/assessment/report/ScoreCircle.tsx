import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

interface ScoreCircleProps {
  score: number;
  rating: string;
}

export default function ScoreCircle({ score, rating }: ScoreCircleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getColor = () => {
    if (score >= 80) return '#00D97E';
    if (score >= 60) return '#4A9EFF';
    if (score >= 40) return '#FF6B35';
    return '#EF4444';
  };

  const getRatingText = () => {
    if (rating === 'high-readiness') return 'High Readiness';
    if (rating === 'moderate-readiness') return 'Moderate Readiness';
    if (rating === 'early-opportunity') return 'Early Opportunity';
    return 'Manual-Heavy Operations';
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            fill="none"
            stroke="#2A2A2A"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="90"
            fill="none"
            stroke={getColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out',
              filter: `drop-shadow(0 0 8px ${getColor()}40)`
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-text-primary">
            {isVisible ? <CountUp end={score} duration={1.5} /> : 0}
          </div>
          <div className="text-sm text-text-tertiary mt-1">/ 100</div>
        </div>
      </div>

      <div 
        className="mt-6 text-xl font-semibold"
        style={{ color: getColor() }}
      >
        {getRatingText()}
      </div>
    </div>
  );
}

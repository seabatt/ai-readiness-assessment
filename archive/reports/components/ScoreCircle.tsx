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

  const radius = 120;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getRatingColor = (ratingText: string) => {
    if (ratingText.includes('Not Ready') || ratingText.includes('Low')) return 'text-gray-400';
    if (ratingText.includes('Partially') || ratingText.includes('Medium')) return 'text-blue-400';
    return 'text-accent-green';
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-64 h-64">
        <svg className="transform -rotate-90 w-64 h-64">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
          
          <circle
            stroke="#2F2F2F"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          
          <circle
            stroke="url(#scoreGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{
              strokeDashoffset: isVisible ? strokeDashoffset : circumference,
              transition: 'stroke-dashoffset 1.5s ease-in-out',
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-text-primary">
            {isVisible ? <CountUp end={score} duration={1.5} /> : 0}
          </div>
          <div className="text-text-tertiary text-sm mt-1">/ 100</div>
        </div>
      </div>

      <div className={`mt-6 text-2xl font-semibold ${getRatingColor(rating)}`}>
        {rating}
      </div>
    </div>
  );
}

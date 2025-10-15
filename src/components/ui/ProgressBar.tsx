interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-text-tertiary">
          Step {current} of {total}
        </span>
        <span className="text-sm text-text-tertiary">{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
        <div
          className="h-full bg-highlight transition-all duration-200 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

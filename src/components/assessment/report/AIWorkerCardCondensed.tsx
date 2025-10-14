import Card from "@/components/ui/Card";
import { MatchedWorker } from "@/types";

interface AIWorkerCardCondensedProps {
  worker: MatchedWorker;
  rank?: number;
}

export default function AIWorkerCardCondensed({
  worker,
  rank,
}: AIWorkerCardCondensedProps) {
  const getPhaseLabel = () => {
    switch (worker.deploymentPhase) {
      case "week-1":
        return "Week 1";
      case "month-2":
        return "Month 2-3";
      case "month-4":
        return "Month 4-6";
      case "month-6":
        return "Month 6+";
    }
  };

  const getPhaseColor = () => {
    switch (worker.deploymentPhase) {
      case "week-1":
        return "text-accent-green";
      case "month-2":
        return "text-accent-blue";
      default:
        return "text-accent-orange";
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      {/* Header with phase badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`w-2 h-2 rounded-full ${getPhaseColor().replace("text-", "bg-")}`}
        />
        <span className="text-sm text-text-tertiary">{getPhaseLabel()}</span>
      </div>

      {/* Title with rank */}
      <div className="flex items-start gap-3 mb-3">
        {rank && (
          <span className="flex-shrink-0 w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center text-bg-primary font-bold text-sm">
            {rank}
          </span>
        )}
        <h3 className="text-lg font-bold text-text-primary leading-tight">
          {worker.name}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {worker.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-accent-green/10 border border-accent-green/20 rounded p-3">
          <div className="text-xl font-bold text-accent-green">
            {worker.estimatedTickets}
          </div>
          <div className="text-xs text-text-tertiary">Tickets/Mo</div>
        </div>
        <div className="bg-accent-blue/10 border border-accent-blue/20 rounded p-3">
          <div className="text-xl font-bold text-accent-blue">
            {worker.timeSaved}
          </div>
          <div className="text-xs text-text-tertiary">Hrs Saved</div>
        </div>
        <div className="bg-bg-primary border border-brand-secondary/20 rounded p-3">
          <div className="text-xl font-bold text-text-primary">
            ${Math.round(worker.costSaved / 100) * 100}
          </div>
          <div className="text-xs text-text-tertiary">Cost/Mo</div>
        </div>
      </div>

      {/* Before/After */}
      <div className="space-y-2 mb-4 flex-grow">
        <div className="bg-accent-orange/10 border border-accent-orange/20 rounded p-3">
          <div className="text-xs font-semibold text-text-tertiary mb-1">
            BEFORE
          </div>
          <p className="text-xs text-text-secondary line-clamp-2">
            {worker.beforeAfter.before}
          </p>
        </div>
        <div className="bg-accent-green/10 border border-accent-green/20 rounded p-3">
          <div className="text-xs font-semibold text-text-tertiary mb-1">
            AFTER
          </div>
          <p className="text-xs text-text-secondary line-clamp-2">
            {worker.beforeAfter.after}
          </p>
        </div>
      </div>

      {/* Why this matters */}
      <div className="border-t border-brand-secondary/10 pt-4 mt-auto">
        <p className="text-xs text-text-secondary line-clamp-3">
          <span className="font-semibold text-text-primary">
            Why this matters:
          </span>{" "}
          {worker.valueRationale}
        </p>
      </div>

      {/* Footer badges */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-brand-secondary/10">
        <div className="flex items-center gap-1 text-xs text-text-tertiary">
          <span>⏱️</span>
          <span>{worker.setupTime}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-tertiary">
          <span>📊</span>
          <span>{worker.learningPeriod}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-tertiary">
          <span
            className={`w-2 h-2 rounded-full ${
              worker.configComplexity === "low"
                ? "bg-accent-green"
                : worker.configComplexity === "medium"
                  ? "bg-accent-blue"
                  : "bg-accent-orange"
            }`}
          />
          <span className="capitalize">{worker.configComplexity}</span>
        </div>
      </div>
    </Card>
  );
}

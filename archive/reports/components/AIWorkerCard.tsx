import Card from "@/components/ui/Card";
import StatusPill from "@/components/ui/StatusPill";
import { MatchedWorker } from "@/types";
import toolsData from "@/data/tools.json";

interface AIWorkerCardProps {
  worker: MatchedWorker;
  rank?: number;
  isTopWorkflow?: boolean;
}

export default function AIWorkerCard({
  worker,
  rank,
  isTopWorkflow = false,
}: AIWorkerCardProps) {
  // Calculate reduction percentage
  const reductionPercentage = Math.round(
    ((worker.metrics.avgResolutionBefore - worker.metrics.avgResolutionAfter) /
      worker.metrics.avgResolutionBefore) *
      100,
  );

  // Get phase label and status per spec
  const getPhaseLabel = () => {
    switch (worker.deploymentPhase) {
      case "week-1":
        return "Week 1 Ready";
      case "month-2":
        return "Month 2-3";
      case "month-4":
        return "Month 4-6";
      case "month-6":
        return "Month 6+";
    }
  };

  const getPhaseStatus = (): "success" | "active" | "warning" => {
    switch (worker.deploymentPhase) {
      case "week-1":
        return "success";
      case "month-2":
        return "active";
      default:
        return "warning";
    }
  };

  // Format time (hours to hrs/min display)
  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} min`;
    }
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  };

  return (
    <Card hover className={isTopWorkflow ? "border-2 border-accent-blue" : ""}>
      {/* Top Workflow Banner */}
      {isTopWorkflow && (
        <div className="bg-accent-blue text-bg-primary text-xs font-bold px-4 py-2 flex items-center gap-2 -m-6 mb-4">
          <span className="text-lg">🏆</span>
          YOUR TOP WORKFLOW
        </div>
      )}

      {/* Tool Logos */}
      <div className="flex items-center gap-2 mb-4">
        {worker.requiredTools.slice(0, 3).map((toolId) => {
          const tool = toolsData.tools.find((t) => t.id === toolId);
          if (!tool) return null;
          return (
            <img
              key={toolId}
              src={tool.logo}
              alt={tool.name}
              className="w-8 h-8 rounded bg-bg-elevated p-1"
              title={tool.name}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          );
        })}
      </div>

      {/* Status Pill */}
      <div className="mb-4">
        <StatusPill status={getPhaseStatus()}>{getPhaseLabel()}</StatusPill>
      </div>

      {/* Title with Rank */}
      {rank && (
        <div className="flex items-center gap-3 mb-3">
          <span className="flex-shrink-0 w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center text-bg-primary font-bold text-sm">
            {rank}
          </span>
          <h3 className="text-xl font-bold text-text-primary">{worker.name}</h3>
        </div>
      )}
      {!rank && (
        <h3 className="text-xl font-bold text-text-primary mb-3">
          {worker.name}
        </h3>
      )}

      {/* Description */}
      <p className="text-text-secondary mb-6 leading-relaxed">
        {worker.description}
      </p>

      {/* Key Metrics - 3-column grid per spec */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-accent-green/10 rounded-lg">
          <div className="text-2xl font-bold text-accent-green">
            {worker.estimatedTickets}
          </div>
          <div className="text-xs text-text-tertiary mt-1">Tickets/Month</div>
        </div>

        <div className="text-center p-3 bg-accent-blue/10 rounded-lg">
          <div className="text-2xl font-bold text-accent-blue">
            {worker.timeSaved}
          </div>
          <div className="text-xs text-text-tertiary mt-1">Hours Saved</div>
        </div>

        <div className="text-center p-3 bg-accent-purple/10 rounded-lg">
          <div className="text-2xl font-bold text-accent-purple">
            ${worker.costSaved.toLocaleString()}
          </div>
          <div className="text-xs text-text-tertiary mt-1">
            Cost Saved/Month
          </div>
        </div>
      </div>

      {/* What it automates */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          What it automates:
        </h4>
        <p className="text-sm text-text-secondary italic">
          {worker.description}
        </p>
      </div>

      {/* Your current state */}
      <div className="bg-bg-primary rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-text-primary mb-3">
          Your current state:
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-text-tertiary">Volume:</span>
            <span className="ml-2 font-medium text-text-primary">
              {worker.estimatedTickets} tickets/month
            </span>
          </div>
          <div>
            <span className="text-text-tertiary">Avg Resolution:</span>
            <span className="ml-2 font-medium text-text-primary">
              {formatTime(worker.metrics.avgResolutionBefore)}
            </span>
          </div>
        </div>
      </div>

      {/* Before/After Timeline per spec */}
      <div className="mb-6">
        <div className="bg-bg-elevated rounded-lg p-4 mb-3">
          <h5 className="text-xs font-semibold text-text-tertiary uppercase mb-2">
            BEFORE
          </h5>
          <p className="text-sm text-text-secondary mb-2">
            {worker.beforeAfter.before}
          </p>
          <div className="text-xs font-bold text-text-tertiary">
            ⏱️ {formatTime(worker.metrics.avgResolutionBefore)}
          </div>
        </div>

        <div className="bg-accent-green/10 rounded-lg p-4 border-2 border-accent-green/20">
          <h5 className="text-xs font-semibold text-accent-green uppercase mb-2">
            AFTER
          </h5>
          <p className="text-sm text-text-primary mb-2">
            {worker.beforeAfter.after}
          </p>
          <div className="text-xs font-bold text-accent-green">
            ⏱️ {formatTime(worker.metrics.avgResolutionAfter)}
          </div>
        </div>
      </div>

      {/* With automation summary per spec */}
      <div className="bg-gradient-to-r from-accent-green/10 to-accent-blue/10 rounded-lg p-4 mb-4">
        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <span className="text-accent-green">📈</span>
          With automation:
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-text-secondary">• Time saved:</span>
            <span className="font-bold text-accent-green flex-1 text-right">
              {worker.timeSaved} hours/month ({reductionPercentage}% reduction)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-text-secondary">• Tickets deflected:</span>
            <span className="font-bold text-accent-blue flex-1 text-right">
              ~
              {Math.round(
                worker.estimatedTickets * worker.metrics.automationRate,
              )}{" "}
              tickets/month
            </span>
          </div>
        </div>
      </div>

      {/* Why this matters - Value Rationale per spec */}
      <div className="mb-4 pb-4 border-b border-brand-secondary/10">
        <h4 className="text-sm font-semibold text-text-primary mb-2">
          Why this matters:
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {worker.valueRationale}
        </p>
      </div>

      {/* Setup info footer per spec */}
      <div className="flex items-center justify-between text-xs text-text-tertiary">
        <div className="flex items-center gap-1">
          <span>⏰</span>
          <span>Setup: {worker.setupTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📚</span>
          <span>Learning: {worker.learningPeriod}</span>
        </div>
        <div className="flex items-center gap-1">
          <span
            className={
              worker.configComplexity === "low"
                ? "text-accent-green"
                : worker.configComplexity === "medium"
                  ? "text-yellow-600"
                  : "text-orange-600"
            }
          >
            {worker.configComplexity === "low"
              ? "🟢"
              : worker.configComplexity === "medium"
                ? "🟡"
                : "🟠"}
          </span>
          <span className="capitalize">{worker.configComplexity} setup</span>
        </div>
      </div>
    </Card>
  );
}

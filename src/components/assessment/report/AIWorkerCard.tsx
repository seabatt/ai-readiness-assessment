import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import { MatchedWorker } from '@/types';
import toolsData from '@/data/tools.json';

interface AIWorkerCardProps {
  worker: MatchedWorker;
  rank?: number;
}

export default function AIWorkerCard({ worker, rank }: AIWorkerCardProps) {
  const getPhaseLabel = () => {
    switch (worker.deploymentPhase) {
      case 'week-1': return 'Week 1 Ready';
      case 'month-2': return 'Month 2-3';
      case 'month-4': return 'Month 4-6';
      case 'month-6': return 'Month 6+';
    }
  };

  const getPhaseStatus = (): 'success' | 'active' | 'warning' => {
    switch (worker.deploymentPhase) {
      case 'week-1': return 'success';
      case 'month-2': return 'active';
      default: return 'warning';
    }
  };

  return (
    <Card hover>
      {/* Tool Logos */}
      <div className="flex items-center gap-2 mb-4">
        {worker.requiredTools.slice(0, 3).map(toolId => {
          const tool = toolsData.tools.find(t => t.id === toolId);
          if (!tool) return null;
          return (
            <img 
              key={toolId}
              src={tool.logo}
              alt={tool.name}
              className="w-8 h-8 rounded bg-bg-elevated p-1"
              title={tool.name}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          );
        })}
      </div>

      {/* Status Pill */}
      <div className="mb-4">
        <StatusPill status={getPhaseStatus()}>
          {getPhaseLabel()}
        </StatusPill>
      </div>

      {/* Title */}
      {rank && (
        <div className="flex items-center gap-3 mb-3">
          <span className="flex-shrink-0 w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center text-bg-primary font-bold text-sm">
            {rank}
          </span>
          <h3 className="text-xl font-bold text-text-primary">
            {worker.name}
          </h3>
        </div>
      )}
      {!rank && (
        <h3 className="text-xl font-bold text-text-primary mb-3">
          {worker.name}
        </h3>
      )}

      {/* Category */}
      <p className="text-sm text-text-tertiary mb-4">
        {worker.category}
      </p>

      {/* Description */}
      <p className="text-text-secondary mb-6 leading-relaxed">
        {worker.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-bg-primary rounded-lg mb-6">
        <div>
          <div className="text-2xl font-bold text-accent-green">
            {worker.timeSaved} hrs
          </div>
          <div className="text-xs text-text-tertiary">Time Saved/Month</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-accent-blue">
            ${worker.costSaved.toLocaleString()}
          </div>
          <div className="text-xs text-text-tertiary">Cost Saved/Month</div>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-text-primary mb-2">How it works:</h4>
        <ul className="space-y-1">
          {worker.howItWorks.slice(0, 3).map((step, index) => (
            <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
              <span className="text-accent-green mt-0.5">→</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deployment info */}
      <div className="pt-4 border-t border-brand-secondary/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-tertiary">Setup: {worker.setupTime}</span>
          <span className="text-text-tertiary">Complexity: {worker.configComplexity}</span>
        </div>
      </div>
    </Card>
  );
}

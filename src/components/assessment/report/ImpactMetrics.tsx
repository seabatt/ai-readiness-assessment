import Card from '@/components/ui/Card';
import CountUp from 'react-countup';
import { ImpactProjection } from '@/types';

interface ImpactMetricsProps {
  phase1: ImpactProjection;
  phase2: ImpactProjection;
}

export default function ImpactMetrics({ phase1, phase2 }: ImpactMetricsProps) {
  return (
    <div className="max-w-5xl mx-auto mb-16">
      <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
        Your Projected Impact
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Phase 1 */}
        <Card>
          <h3 className="text-xl font-bold text-text-primary mb-6">
            {phase1.phase}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-accent-green">
                <CountUp end={phase1.ticketsHandled} duration={2} separator="," />
              </div>
              <div className="text-sm text-text-tertiary">Tickets Handled Autonomously/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-blue">
                <CountUp end={phase1.timeSaved} duration={2} separator="," /> hrs
              </div>
              <div className="text-sm text-text-tertiary">Time Saved/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">
                <CountUp end={phase1.ftesSaved} duration={2} decimals={1} /> FTEs
              </div>
              <div className="text-sm text-text-tertiary">Team Capacity Freed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-orange">
                $<CountUp end={phase1.costSaved} duration={2} separator="," />
              </div>
              <div className="text-sm text-text-tertiary">Cost Savings/Month</div>
            </div>
          </div>
        </Card>

        {/* Phase 2 */}
        <Card>
          <h3 className="text-xl font-bold text-text-primary mb-6">
            {phase2.phase}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-accent-green">
                <CountUp end={phase2.ticketsHandled} duration={2} separator="," />
              </div>
              <div className="text-sm text-text-tertiary">Tickets Handled (as AI learns)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-blue">
                <CountUp end={phase2.timeSaved} duration={2} separator="," /> hrs
              </div>
              <div className="text-sm text-text-tertiary">Time Saved/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-text-primary">
                <CountUp end={phase2.ftesSaved} duration={2} decimals={1} /> FTEs
              </div>
              <div className="text-sm text-text-tertiary">Team Capacity Freed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-orange">
                $<CountUp end={phase2.costSaved} duration={2} separator="," />
              </div>
              <div className="text-sm text-text-tertiary">Cost Savings/Month</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Annual Impact */}
      <Card>
        <h3 className="text-lg font-bold text-text-primary mb-4">📈 Annual Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold text-accent-orange">
              $<CountUp end={phase2.costSaved * 12} duration={2} separator="," />+
            </div>
            <div className="text-xs text-text-tertiary">Labor Savings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text-primary">
              {phase2.ftesSaved}+ FTEs
            </div>
            <div className="text-xs text-text-tertiary">To Strategic Work</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-green">
              70%
            </div>
            <div className="text-xs text-text-tertiary">Faster Resolution</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-blue">
              ✨
            </div>
            <div className="text-xs text-text-tertiary">Happier Employees</div>
          </div>
        </div>
      </Card>

      <p className="text-sm text-text-tertiary text-center mt-4">
        Note: Unlike traditional automation with static performance, AI Workers improve over time as they learn your environment's patterns and policies.
      </p>
    </div>
  );
}

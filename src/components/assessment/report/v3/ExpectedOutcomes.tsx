interface ExpectedOutcomesProps {
  estimatedDeflection: number;
  hoursSaved: number;
  fteImpact: number;
}

export default function ExpectedOutcomes({
  estimatedDeflection,
  hoursSaved,
  fteImpact,
}: ExpectedOutcomesProps) {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-text-primary mb-8">What to Expect</h2>
      
      <p className="text-lg text-text-tertiary mb-8 max-w-4xl leading-relaxed">
        Here's the timeline and measurable outcomes based on teams with similar tech stacks 
        who've deployed AI Workers. These are conservative estimates grounded in operational reality.
      </p>

      {/* Timeline */}
      <div className="bg-bg-card border border-bg-card-alt/20 rounded-lg py-8 px-6 mb-8 transition-all duration-200">
        <h3 className="text-2xl font-bold text-text-primary mb-6">30-Day Pilot Results</h3>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-4xl font-bold text-highlight mb-2">{estimatedDeflection}%</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider mb-2">Ticket Deflection</div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Of total volume handled autonomously with approvals in place
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-highlight mb-2">Real-time</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider mb-2">TTR for Approved Actions</div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              App access, group changes, license updates when policies exist
            </p>
          </div>
          <div>
            <div className="text-4xl font-bold text-highlight mb-2">~{fteImpact}</div>
            <div className="text-sm text-text-tertiary uppercase tracking-wider mb-2">FTE Capacity</div>
            <p className="text-sm text-text-tertiary leading-relaxed">
              Worth of time returned to team for strategic work
            </p>
          </div>
        </div>

        <div className="border-t border-bg-card-alt/20 pt-6">
          <h4 className="font-semibold text-text-primary mb-4">4-Week Timeline</h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-highlight">Week 1</div>
              <div className="text-sm text-text-tertiary leading-relaxed">
                Shadow mode validation. AI Worker observes, no live actions. Team reviews accuracy.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-highlight">Week 2</div>
              <div className="text-sm text-text-tertiary leading-relaxed">
                Enable first live workflow with approvals. Typically app access or group management.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-highlight">Week 3</div>
              <div className="text-sm text-text-tertiary leading-relaxed">
                Expand to 2-3 workflows. Configure guardrails and RBAC policies. Monitor deflection metrics.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 text-sm font-semibold text-highlight">Week 4</div>
              <div className="text-sm text-text-tertiary leading-relaxed">
                Full pilot deployment. 3-5 AI Workers active. Measure ROI and prepare for scale.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-bg-card border border-bg-card-alt/20 rounded-lg py-8 px-6 transition-all duration-200">
          <h3 className="text-xl font-bold text-text-primary mb-4">Before AI Workers</h3>
          <div className="space-y-3 text-sm text-text-tertiary">
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Team handles {estimatedDeflection}% of tickets manually</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Average TTR: 1-2 hours for routine requests</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Skilled engineers spend time on repetitive work</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Queue grows faster than resolution capacity</span>
            </div>
          </div>
        </div>

        <div className="bg-bg-card border border-bg-card-alt/20 rounded-lg py-8 px-6 transition-all duration-200">
          <h3 className="text-xl font-bold text-text-primary mb-4">After AI Workers</h3>
          <div className="space-y-3 text-sm text-text-tertiary">
            <div className="flex items-start gap-2">
              <span className="text-highlight">✓</span>
              <span>{estimatedDeflection}% of volume handled autonomously</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-highlight">✓</span>
              <span>Real-time TTR for approved actions</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-highlight">✓</span>
              <span>{hoursSaved.toLocaleString()} hours/year freed for strategic work</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-highlight">✓</span>
              <span>Team capacity scales without headcount</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics You'll Track */}
      <div className="bg-bg-card border border-bg-card-alt/20 rounded-lg py-8 px-6 transition-all duration-200">
        <h3 className="text-xl font-bold text-text-primary mb-4">Metrics You'll Track</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-text-primary mb-2 text-sm">Operational Metrics</h4>
            <ul className="space-y-1 text-sm text-text-tertiary">
              <li>• Ticket deflection rate by workflow</li>
              <li>• Time to resolution (TTR) reduction</li>
              <li>• Volume handled autonomously</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2 text-sm">Team Impact</h4>
            <ul className="space-y-1 text-sm text-text-tertiary">
              <li>• Hours saved per week</li>
              <li>• FTE capacity returned</li>
              <li>• Strategic work vs. repetitive tasks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2 text-sm">Governance</h4>
            <ul className="space-y-1 text-sm text-text-tertiary">
              <li>• Approval workflow compliance</li>
              <li>• Audit log completeness</li>
              <li>• RBAC policy effectiveness</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

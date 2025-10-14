import CountUp from "react-countup";

interface StatsImpactBannerProps {
  ticketDeflection: number;
  hoursSaved: number;
  costSavings: number;
  fteEquivalent: number;
  confidence?: string;
}

export default function StatsImpactBanner({
  ticketDeflection,
  hoursSaved,
  costSavings,
  fteEquivalent,
  confidence = "Low (~40%)",
}: StatsImpactBannerProps) {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
        Estimated Impact
      </h2>

      {/* Stats Banner */}
      <div className="grid grid-cols-4 gap-0 bg-black rounded-lg overflow-hidden border border-brand-secondary/10">
        {/* Ticket Deflection */}
        <div className="border-r border-brand-secondary/20 px-8 py-12">
          <div className="text-xs uppercase tracking-wider text-text-tertiary mb-4 font-semibold">
            Automate Service Resolutions By
          </div>
          <div className="text-5xl font-bold text-text-primary">
            <CountUp end={ticketDeflection} duration={2} />%
          </div>
        </div>

        {/* Hours Saved */}
        <div className="border-r border-brand-secondary/20 px-8 py-12">
          <div className="text-xs uppercase tracking-wider text-text-tertiary mb-4 font-semibold">
            Hours Saved
          </div>
          <div className="text-5xl font-bold text-text-primary">
            <CountUp end={hoursSaved} duration={2} separator="," />
          </div>
          <div className="text-sm text-text-tertiary mt-2">Per year</div>
        </div>

        {/* Cost Savings */}
        <div className="border-r border-brand-secondary/20 px-8 py-12">
          <div className="text-xs uppercase tracking-wider text-text-tertiary mb-4 font-semibold">
            Reduce Operational Cost By
          </div>
          <div className="text-5xl font-bold text-text-primary">
            <CountUp
              end={Math.round((costSavings / (costSavings + 10000)) * 100)}
              duration={2}
            />
            %
          </div>
        </div>

        {/* FTE Equivalent */}
        <div className="px-8 py-12">
          <div className="text-xs uppercase tracking-wider text-text-tertiary mb-4 font-semibold">
            FTE Equivalent
          </div>
          <div className="text-5xl font-bold text-text-primary">
            <CountUp end={fteEquivalent} duration={2} decimals={1} />
          </div>
          <div className="text-sm text-text-tertiary mt-2">
            Full-time employees
          </div>
        </div>
      </div>

      {/* Confidence Note */}
      <p className="text-sm text-text-tertiary text-center mt-4">
        Confidence: {confidence} - Based on your self-reported data
      </p>
    </div>
  );
}

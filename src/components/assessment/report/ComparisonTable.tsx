import Card from "@/components/ui/Card";

interface ComparisonTableProps {
  userScore: number;
  techStackScore: number;
  deflectionPotential: number;
}

export default function ComparisonTable({
  userScore,
  techStackScore,
  deflectionPotential,
}: ComparisonTableProps) {
  // Calculate user's manual processing percentage (inverse of automation)
  const manualProcessing = 100 - deflectionPotential;

  // Industry benchmarks per spec
  const benchmarks = {
    industryAvg: {
      readiness: 55,
      techStack: 60,
      deflection: 30,
      manual: 75,
    },
    topPerformers: {
      readiness: 85,
      techStack: 95,
      deflection: 70,
      manual: 25,
    },
  };

  // Helper function to get color based on comparison
  const getScoreColor = (userVal: number, avgVal: number, topVal: number) => {
    if (userVal >= topVal - 5) return "text-accent-green font-bold";
    if (userVal >= avgVal) return "text-accent-blue font-semibold";
    if (userVal >= avgVal - 10) return "text-yellow-600";
    return "text-accent-orange";
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-brand-secondary/20">
              <th className="text-left py-3 px-4 font-bold text-text-primary">
                Metric
              </th>
              <th className="text-center py-3 px-4 font-bold text-accent-blue">
                You
              </th>
              <th className="text-center py-3 px-4 font-bold text-text-tertiary">
                Industry Avg
              </th>
              <th className="text-center py-3 px-4 font-bold text-accent-green">
                Top Performers
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-brand-secondary/10 hover:bg-bg-elevated transition-colors">
              <td className="py-4 px-4 text-text-secondary">
                Automation Readiness
              </td>
              <td
                className={`text-center py-4 px-4 text-lg ${getScoreColor(userScore, benchmarks.industryAvg.readiness, benchmarks.topPerformers.readiness)}`}
              >
                {userScore}/100
              </td>
              <td className="text-center py-4 px-4 text-text-tertiary">
                {benchmarks.industryAvg.readiness}/100
              </td>
              <td className="text-center py-4 px-4 text-accent-green font-semibold">
                {benchmarks.topPerformers.readiness}/100
              </td>
            </tr>

            <tr className="border-b border-brand-secondary/10 hover:bg-bg-elevated transition-colors">
              <td className="py-4 px-4 text-text-secondary">
                Tech Stack Compatibility
              </td>
              <td
                className={`text-center py-4 px-4 text-lg ${getScoreColor(techStackScore, benchmarks.industryAvg.techStack, benchmarks.topPerformers.techStack)}`}
              >
                {techStackScore}%
              </td>
              <td className="text-center py-4 px-4 text-text-tertiary">
                {benchmarks.industryAvg.techStack}%
              </td>
              <td className="text-center py-4 px-4 text-accent-green font-semibold">
                {benchmarks.topPerformers.techStack}%
              </td>
            </tr>

            <tr className="border-b border-brand-secondary/10 hover:bg-bg-elevated transition-colors">
              <td className="py-4 px-4 text-text-secondary">
                Ticket Deflection Potential
              </td>
              <td
                className={`text-center py-4 px-4 text-lg ${getScoreColor(deflectionPotential, benchmarks.industryAvg.deflection, benchmarks.topPerformers.deflection)}`}
              >
                {deflectionPotential}%
              </td>
              <td className="text-center py-4 px-4 text-text-tertiary">
                {benchmarks.industryAvg.deflection}%
              </td>
              <td className="text-center py-4 px-4 text-accent-green font-semibold">
                {benchmarks.topPerformers.deflection}%
              </td>
            </tr>

            <tr className="border-b border-brand-secondary/10 hover:bg-bg-elevated transition-colors">
              <td className="py-4 px-4 text-text-secondary">
                Manual Ticket Processing
              </td>
              <td
                className={`text-center py-4 px-4 text-lg ${
                  manualProcessing <= benchmarks.topPerformers.manual + 5
                    ? "text-accent-green font-bold"
                    : manualProcessing <= benchmarks.industryAvg.manual
                      ? "text-accent-blue font-semibold"
                      : manualProcessing <= benchmarks.industryAvg.manual + 10
                        ? "text-yellow-600"
                        : "text-accent-orange"
                }`}
              >
                {manualProcessing}%
              </td>
              <td className="text-center py-4 px-4 text-text-tertiary">
                {benchmarks.industryAvg.manual}%
              </td>
              <td className="text-center py-4 px-4 text-accent-green font-semibold">
                {benchmarks.topPerformers.manual}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-text-tertiary justify-end">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-accent-green/20 rounded"></div>
          <span>Top tier</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-accent-blue/20 rounded"></div>
          <span>Above average</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-600/20 rounded"></div>
          <span>Average</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-accent-orange/20 rounded"></div>
          <span>Below average</span>
        </div>
      </div>
    </Card>
  );
}

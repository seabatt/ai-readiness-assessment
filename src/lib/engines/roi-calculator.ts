import benchmarks from '@/data/benchmarks.json';
import { MatchedUseCase } from './use-case-matcher';

export interface ROIResult {
  total_monthly_tickets: number;
  automatable_tickets: number;
  automatable_pct: number;
  total_hours_saved: number;          // raw operational hours (pre-capture)
  expected_hours_saved: number;       // confidence-weighted EV
  p70_hours_saved: number;            // conservative band
  p90_hours_saved: number;            // more conservative band

  capacity_fte: number;               // hours/2000 (your legacy)
  budget_fte: number;                 // captured hours / effective_hours_per_FTE

  fte_equivalent: number;             // kept for backward-compat (alias of capacity_fte)
  annual_value_usd: number;           // budget value using budget_fte
  confidence: number;                 // 0-100

  breakdown_by_category: {
    category: string;
    tickets: number;
    hours_saved: number;
    confidence: number;
  }[];
}

export class ROICalculator {
  private readonly HOURS_PER_FTE_CAPACITY = 2000;   // legacy denominator
  private readonly DEFAULT_FULLY_LOADED_COST = 100000;
  private readonly DEFAULT_CAPTURE_RATE = 0.5;      // 50% realizable/budget capture
  private readonly DEFAULT_EFFECTIVE_HOURS_PER_FTE = 1800;

  /**
   * Calculates comprehensive ROI from matched use cases
   */
  calculateROI(
    totalMonthlyTickets: number,
    matchedUseCases: MatchedUseCase[],
    fullyLoadedCost: number = this.DEFAULT_FULLY_LOADED_COST,
    captureRate: number = this.DEFAULT_CAPTURE_RATE,
    effectiveHoursPerFTE: number = this.DEFAULT_EFFECTIVE_HOURS_PER_FTE
  ): ROIResult {
    // Raw totals (no rounding yet)
    const rawAutomatableTickets = matchedUseCases.reduce(
      (sum, uc) => sum + uc.estimated_monthly_deflection,
      0
    );

    const rawTotalHoursSaved = matchedUseCases.reduce(
      (sum, uc) => sum + uc.estimated_hours_saved,
      0
    );

    // Safety clamp: never exceed total monthly tickets
    const automatableTickets = Math.min(rawAutomatableTickets, totalMonthlyTickets);

    // Prorate hours if clamped
    const totalHoursSaved =
      rawAutomatableTickets > 0 && automatableTickets < rawAutomatableTickets
        ? rawTotalHoursSaved * (automatableTickets / rawAutomatableTickets)
        : rawTotalHoursSaved;

    const automatablePct =
      totalMonthlyTickets > 0 ? (automatableTickets / totalMonthlyTickets) * 100 : 0;

    // Weighted confidence on HOURS, not counts
    // CRITICAL: Use rawTotalHoursSaved as denominator to prevent confidence > 1.0 when clamped
    const rawWeightedConfidence =
      matchedUseCases.length > 0 && rawTotalHoursSaved > 0
        ? matchedUseCases.reduce((sum, uc) => sum + uc.confidence * uc.estimated_hours_saved, 0) /
          rawTotalHoursSaved
        : 0.7;
    
    // Clamp to [0, 1] for safety
    const weightedConfidence = Math.min(Math.max(rawWeightedConfidence, 0), 1);

    // Confidence bands (simple)
    const expectedHours = totalHoursSaved * weightedConfidence;               // EV
    const p70Hours = totalHoursSaved * Math.max(weightedConfidence - 0.10, 0.4);
    const p90Hours = totalHoursSaved * Math.max(weightedConfidence - 0.20, 0.3);

    // Capacity vs Budget FTE
    const capacityFTE = (totalHoursSaved * 12) / this.HOURS_PER_FTE_CAPACITY;
    const capturedAnnualHours = expectedHours * 12 * Math.min(Math.max(captureRate, 0), 1);
    const budgetFTE = capturedAnnualHours / Math.max(effectiveHoursPerFTE, 1);

    const annualValueUsd = budgetFTE * fullyLoadedCost;

    // Category breakdown with hours-weighted confidence
    const categoryMap = new Map<string, { tickets: number; hours: number; confNum: number }>();
    for (const uc of matchedUseCases) {
      const slot = categoryMap.get(uc.category) || { tickets: 0, hours: 0, confNum: 0 };
      slot.tickets += uc.estimated_monthly_deflection;
      slot.hours += uc.estimated_hours_saved;
      slot.confNum += uc.confidence * uc.estimated_hours_saved;
      categoryMap.set(uc.category, slot);
    }

    const breakdownByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      tickets: Math.round(data.tickets),
      hours_saved: Math.round(data.hours * 10) / 10,
      confidence: data.hours > 0 ? data.confNum / data.hours : 0.7
    })).sort((a, b) => b.hours_saved - a.hours_saved);

    return {
      total_monthly_tickets: totalMonthlyTickets,
      automatable_tickets: Math.round(automatableTickets),
      automatable_pct: Math.round(automatablePct * 10) / 10,

      total_hours_saved: Math.round(totalHoursSaved),
      expected_hours_saved: Math.round(expectedHours),
      p70_hours_saved: Math.round(p70Hours),
      p90_hours_saved: Math.round(p90Hours),

      capacity_fte: Math.round(capacityFTE * 10) / 10,
      budget_fte: Math.round(budgetFTE * 10) / 10,

      // Back-compat alias
      fte_equivalent: Math.round(capacityFTE * 10) / 10,

      annual_value_usd: Math.round(annualValueUsd),
      confidence: Math.round(weightedConfidence * 100),

      breakdown_by_category: breakdownByCategory
    };
  }

  /**
   * Estimates impact for a specific category based on benchmarks
   */
  estimateCategoryImpact(
    category: string,
    monthlyVolume: number,
    customTtr?: number
  ) {
    const categoryData = (benchmarks as any).ticket_categories[category];
    if (!categoryData) {
      return null;
    }

    const ttr = customTtr || categoryData.median_ttr_hours;
    const automationPotential = categoryData.automation_potential;
    
    const deflectableTickets = monthlyVolume * automationPotential;
    const hoursSaved = deflectableTickets * ttr;

    return {
      category,
      monthly_volume: monthlyVolume,
      deflectable_tickets: Math.round(deflectableTickets),
      hours_saved: Math.round(hoursSaved * 10) / 10,
      automation_potential: automationPotential,
      confidence: 0.70
    };
  }
}

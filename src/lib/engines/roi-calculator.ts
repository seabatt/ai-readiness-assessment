import benchmarks from '@/data/benchmarks.json';
import { MatchedUseCase } from './use-case-matcher';

export interface ROIResult {
  total_monthly_tickets: number;
  automatable_tickets: number;
  automatable_pct: number;
  total_hours_saved: number;
  fte_equivalent: number;
  annual_value_usd: number;
  confidence: number;
  breakdown_by_category: {
    category: string;
    tickets: number;
    hours_saved: number;
    confidence: number;
  }[];
}

export class ROICalculator {
  private readonly HOURS_PER_FTE = 2000;
  private readonly DEFAULT_FULLY_LOADED_COST = 100000;

  /**
   * Calculates comprehensive ROI from matched use cases
   */
  calculateROI(
    totalMonthlyTickets: number,
    matchedUseCases: MatchedUseCase[],
    fullyLoadedCost: number = this.DEFAULT_FULLY_LOADED_COST
  ): ROIResult {
    
    // Calculate totals
    const automatableTickets = matchedUseCases.reduce(
      (sum, uc) => sum + uc.estimated_monthly_deflection, 
      0
    );
    
    const totalHoursSaved = matchedUseCases.reduce(
      (sum, uc) => sum + uc.estimated_hours_saved,
      0
    );

    const automatablePct = totalMonthlyTickets > 0 
      ? (automatableTickets / totalMonthlyTickets) * 100
      : 0;

    const fteEquivalent = (totalHoursSaved * 12) / this.HOURS_PER_FTE;
    
    const annualValueUsd = fteEquivalent * fullyLoadedCost;

    // Calculate weighted confidence
    const weightedConfidence = matchedUseCases.length > 0
      ? matchedUseCases.reduce((sum, uc) => 
          sum + (uc.confidence * uc.estimated_hours_saved), 0
        ) / totalHoursSaved
      : 0.70;

    // Break down by category
    const categoryMap = new Map<string, {tickets: number, hours: number, confidences: number[]}>();
    
    for (const useCase of matchedUseCases) {
      const existing = categoryMap.get(useCase.category) || {tickets: 0, hours: 0, confidences: []};
      existing.tickets += useCase.estimated_monthly_deflection;
      existing.hours += useCase.estimated_hours_saved;
      existing.confidences.push(useCase.confidence);
      categoryMap.set(useCase.category, existing);
    }

    const breakdownByCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      tickets: Math.round(data.tickets),
      hours_saved: Math.round(data.hours * 10) / 10,
      confidence: data.confidences.reduce((sum, c) => sum + c, 0) / data.confidences.length
    }));

    return {
      total_monthly_tickets: totalMonthlyTickets,
      automatable_tickets: Math.round(automatableTickets),
      automatable_pct: Math.round(automatablePct * 10) / 10,
      total_hours_saved: Math.round(totalHoursSaved),
      fte_equivalent: Math.round(fteEquivalent * 10) / 10,
      annual_value_usd: Math.round(annualValueUsd),
      confidence: Math.round(weightedConfidence * 100),
      breakdown_by_category: breakdownByCategory.sort((a, b) => b.hours_saved - a.hours_saved)
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

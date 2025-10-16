import useCaseMappings from '@/data/use-case-mappings.json';
import { FeasibilityResult } from './feasibility-engine';

interface UserActivity {
  category: string;
  monthly_volume: number;
  avg_ttr_hours: number;
  requires_approval?: boolean;
}

export interface MatchedUseCase {
  use_case_id: string;
  name: string;
  category: string;
  description: string;
  value_proposition: string;
  fit_score: number;
  estimated_monthly_deflection: number;
  estimated_hours_saved: number;
  confidence: number;
  implementation_effort: 'low' | 'medium' | 'high';
  time_to_value_days: number;
  prerequisites: string[];
  workflow_steps: string[];
  priority: 'immediate' | 'quick_win' | 'future';
  required_tools: string[];
}

export class UseCaseMatcher {
  
  /**
   * Matches user activities to available AI Workers
   */
  matchUseCases(
    activities: UserActivity[],
    feasibilityResults: FeasibilityResult[]
  ): MatchedUseCase[] {
    
    // Get all enabled use case IDs from feasibility analysis
    const enabledUseCaseIds = new Set(
      feasibilityResults.flatMap(result => result.enabled_use_cases)
    );

    // Track remaining capacity per activity to prevent double-counting
    const remainingCapacity = new Map<string, number>();
    activities.forEach(activity => {
      remainingCapacity.set(activity.category, activity.monthly_volume);
    });

    const matches: MatchedUseCase[] = [];

    for (const useCase of (useCaseMappings as any).use_cases) {
      // Skip if not enabled by current stack
      if (!enabledUseCaseIds.has(useCase.id)) {
        continue;
      }

      // Find matching activities
      const matchingActivities = activities.filter(activity =>
        useCase.ticket_categories.some((category: string) => 
          activity.category.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(activity.category.toLowerCase())
        )
      );

      if (matchingActivities.length === 0) {
        continue;
      }

      // Calculate fit score (0-100) using ORIGINAL volumes (not remaining)
      let fitScore = 0;
      
      // Base score: stack support (40 points)
      fitScore += 40;
      
      // Volume score (30 points): higher volume = better fit
      const totalVolume = matchingActivities.reduce((sum, a) => sum + a.monthly_volume, 0);
      const volumeScore = Math.min(30, (totalVolume / 50) * 30); // 50+ tickets = max score
      fitScore += volumeScore;
      
      // TTR score (20 points): higher TTR = more savings
      const avgTtr = matchingActivities.reduce((sum, a) => sum + a.avg_ttr_hours, 0) / matchingActivities.length;
      const ttrScore = Math.min(20, (avgTtr / 2) * 20); // 2+ hours = max score
      fitScore += ttrScore;
      
      // Implementation effort score (10 points): lower effort = higher score
      const effortScore = useCase.implementation_effort === 'low' ? 10 : 
                         useCase.implementation_effort === 'medium' ? 6 : 3;
      fitScore += effortScore;

      // Calculate estimated impact using REMAINING capacity (prevents double-counting)
      let estimatedDeflection = 0;
      let estimatedHoursSaved = 0;

      for (const activity of matchingActivities) {
        const remaining = remainingCapacity.get(activity.category) || 0;
        const deflectable = Math.min(remaining, activity.monthly_volume * useCase.automation_rate);
        
        estimatedDeflection += deflectable;
        estimatedHoursSaved += deflectable * activity.avg_ttr_hours;
        
        // Reduce remaining capacity
        remainingCapacity.set(activity.category, remaining - deflectable);
      }

      // Determine priority
      let priority: 'immediate' | 'quick_win' | 'future';
      if (useCase.implementation_effort === 'low' && useCase.time_to_value_days <= 7) {
        priority = 'immediate';
      } else if (useCase.time_to_value_days <= 21) {
        priority = 'quick_win';
      } else {
        priority = 'future';
      }

      matches.push({
        use_case_id: useCase.id,
        name: useCase.name,
        category: useCase.category,
        description: useCase.description,
        value_proposition: useCase.value_proposition,
        fit_score: Math.round(fitScore),
        estimated_monthly_deflection: Math.round(estimatedDeflection),
        estimated_hours_saved: Math.round(estimatedHoursSaved * 10) / 10,
        confidence: useCase.confidence,
        implementation_effort: useCase.implementation_effort,
        time_to_value_days: useCase.time_to_value_days,
        prerequisites: useCase.prerequisites,
        workflow_steps: useCase.workflow_steps,
        priority,
        required_tools: useCase.required_tools
      });
    }

    // Sort by fit score (descending)
    return matches.sort((a, b) => b.fit_score - a.fit_score);
  }

  /**
   * Groups matched use cases by priority
   */
  groupByPriority(matches: MatchedUseCase[]) {
    return {
      immediate: matches.filter(m => m.priority === 'immediate'),
      quick_wins: matches.filter(m => m.priority === 'quick_win'),
      future: matches.filter(m => m.priority === 'future')
    };
  }

  /**
   * Gets top N use cases
   */
  getTopUseCases(matches: MatchedUseCase[], n: number = 5): MatchedUseCase[] {
    return matches.slice(0, n);
  }
}

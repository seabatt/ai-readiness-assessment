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
  estimated_monthly_deflection: number; // keep as float; no rounding here
  estimated_hours_saved: number;        // keep as float; no rounding here
  confidence: number;
  implementation_effort: 'low' | 'medium' | 'high';
  time_to_value_days: number;
  prerequisites: string[];
  workflow_steps: string[];
  priority: 'immediate' | 'quick_win' | 'future';
  required_tools: string[];

  // NEW (optional realism knobs)
  post_auto_ttr_hours?: number;   // if present, use time delta vs. full deflection
  approval_leakage_pct?: number;  // 0..1 portion needing human approval
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

    // Sort use cases by rough marginal value so higher-impact consumes capacity first
    const sortedUseCases = (useCaseMappings as any).use_cases
      .slice()
      .sort((a: any, b: any) => {
        const score = (uc: any) =>
          (uc.automation_rate ?? 0) * (uc.confidence ?? 0.7);
        return score(b) - score(a);
      });

    const matches: MatchedUseCase[] = [];

    for (const useCase of sortedUseCases) {
      // Skip if not enabled by current stack
      if (!enabledUseCaseIds.has(useCase.id)) {
        continue;
      }

      // Find matching activities
      const matchingActivities = activities.filter(activity =>
        useCase.ticket_categories?.some((category: string) => 
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
        const remaining = remainingCapacity.get(activity.category) ?? 0;
        if (remaining <= 0) continue;

        const deflectRate = Math.max(Math.min(useCase.automation_rate ?? 0, 1), 0);
        const possible = activity.monthly_volume * deflectRate;
        const deflectable = Math.min(remaining, possible);

        // Partial automation support
        const baseline = activity.avg_ttr_hours;
        const postAuto = Math.max(useCase.post_auto_ttr_hours ?? 0, 0);
        const hasPost = useCase.post_auto_ttr_hours != null;

        // Hours saved logic:
        // - If postAuto provided: use delta (baseline - postAuto)
        // - Else: assume full deflection (baseline)
        const delta = Math.max(baseline - postAuto, 0);
        const hoursPerTicket = hasPost ? delta : baseline;

        // Optional approval leakage (portion not fully automated)
        const leakage = Math.min(Math.max(useCase.approval_leakage_pct ?? 0, 0), 1);
        // Conservative assumption: leaked items yield zero savings (changeable)
        const effectiveHoursPerTicket = hoursPerTicket * (1 - leakage);

        estimatedDeflection += deflectable;
        estimatedHoursSaved += deflectable * effectiveHoursPerTicket;

        // Reduce remaining capacity
        remainingCapacity.set(activity.category, remaining - deflectable);
      }

      if (estimatedDeflection <= 0) continue;

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
        estimated_monthly_deflection: estimatedDeflection, // no rounding
        estimated_hours_saved: estimatedHoursSaved,         // no rounding
        confidence: useCase.confidence,
        implementation_effort: useCase.implementation_effort,
        time_to_value_days: useCase.time_to_value_days,
        prerequisites: useCase.prerequisites,
        workflow_steps: useCase.workflow_steps,
        priority,
        required_tools: useCase.required_tools,
        // pass through for inspection (optional)
        post_auto_ttr_hours: useCase.post_auto_ttr_hours,
        approval_leakage_pct: useCase.approval_leakage_pct
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

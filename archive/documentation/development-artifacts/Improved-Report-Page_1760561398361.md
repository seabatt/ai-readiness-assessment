<document title="replit-instructions-enhance-report.md" type="text/markdown">
# Replit Instructions: Enhance Existing Report Output

## Context
I have a working IT readiness assessment app. Users complete the assessment and get a report. I want to **dramatically improve the report** by:

1. **Analyzing their actual tech stack** against real APIs
2. **Matching to specific AI Workers** from our use case library
3. **Calculating precise ROI** based on their ticket volume
4. **Identifying gaps** and missing capabilities
5. **Providing actionable roadmap** with specific next steps

## What Already Exists
- Assessment flow (tech stack selection, activities, volume, governance)
- Basic report page showing readiness score
- Assessment data is captured and available

## What I've Added
Three data files in `/src/lib/data/`:
- `tool-apis.json` - Complete API capabilities for all supported tools
- `use-case-mappings.json` - 50+ AI Worker definitions with requirements
- `benchmarks.json` - Industry benchmarks for calculations

## What You Need to Build

### PHASE 1: Core Analysis Engines

Create these three analysis engines in `/src/lib/engines/`:

#### 1. `feasibility-engine.ts`
**Purpose:** Analyzes which APIs are available for user's selected tools

**What it does:**
- Takes user's selected tools (e.g., ["Okta", "ServiceNow", "Slack"])
- Looks up each tool in `tool-apis.json`
- Determines which APIs are available based on license tier
- Returns which AI Workers can be deployed with current stack
- Identifies missing APIs and license gaps

**Key function:**
```typescript
analyzeStack(tools: {name: string, license_tier?: string}[]): FeasibilityResult[]

// Returns for each tool:
// - available_apis: string[]
// - enabled_use_cases: string[] (IDs from use-case-mappings.json)
// - missing_apis: string[]
// - license_gaps: string[]
// - confidence: number
```

**Critical rule:** Only return APIs that exist in `tool-apis.json` - no invented capabilities.

**Full implementation:**
```typescript
// /src/lib/engines/feasibility-engine.ts

import toolApis from '../data/tool-apis.json';
import useCaseMappings from '../data/use-case-mappings.json';

interface Tool {
  name: string;
  license_tier?: string;
}

interface FeasibilityResult {
  tool: string;
  available_apis: string[];
  available_capabilities: string[];
  enabled_use_cases: string[];
  missing_apis: string[];
  license_gaps: string[];
  prerequisites: string[];
  confidence: number;
}

export class FeasibilityEngine {
  
  /**
   * Analyzes which APIs and capabilities are available for a given tool
   */
  analyzeToolFeasibility(tool: Tool): FeasibilityResult {
    const toolName = tool.name.toLowerCase().replace(/\s+/g, '_');
    const toolConfig = (toolApis as any).tools[toolName];
    
    if (!toolConfig) {
      return {
        tool: tool.name,
        available_apis: [],
        available_capabilities: [],
        enabled_use_cases: [],
        missing_apis: [],
        license_gaps: [],
        prerequisites: ['Tool configuration not found'],
        confidence: 0
      };
    }

    // Determine which APIs are available based on license tier
    const licenseTier = tool.license_tier || 'standard';
    const availableApiKeys = toolConfig.license_tiers[licenseTier] || [];
    
    const availableApis: string[] = [];
    const availableCapabilities: string[] = [];
    const prerequisites: string[] = [];

    // Collect available APIs and capabilities
    for (const apiKey of availableApiKeys) {
      const apiConfig = toolConfig.apis[apiKey];
      if (apiConfig) {
        availableApis.push(apiConfig.name);
        availableCapabilities.push(...apiConfig.capabilities);
        prerequisites.push(`${apiConfig.name}: ${toolConfig.prerequisites}`);
      }
    }

    // Find which use cases this tool enables
    const enabledUseCases = (useCaseMappings as any).use_cases
      .filter((useCase: any) => {
        // Check if tool is required
        if (!useCase.required_tools.includes(toolName)) {
          return false;
        }
        
        // Check if required APIs are available
        const requiredApis = useCase.required_apis[toolName] || [];
        const hasAllRequiredApis = requiredApis.every((api: string) => 
          availableApiKeys.includes(api)
        );
        
        return hasAllRequiredApis;
      })
      .map((useCase: any) => useCase.id);

    // Identify missing APIs for potential use cases
    const potentialUseCases = (useCaseMappings as any).use_cases
      .filter((useCase: any) => 
        useCase.required_tools.includes(toolName) && 
        !enabledUseCases.includes(useCase.id)
      );
    
    const missingApis = Array.from(new Set(
      potentialUseCases.flatMap((useCase: any) => 
        (useCase.required_apis[toolName] || [])
          .filter((api: string) => !availableApiKeys.includes(api))
      )
    ));

    // Check for license gaps
    const licenseGaps: string[] = [];
    const allApiKeys = Object.keys(toolConfig.apis);
    const unavailableApis = allApiKeys.filter(key => !availableApiKeys.includes(key));
    
    if (unavailableApis.length > 0) {
      // Find which tier would enable these
      for (const [tier, apis] of Object.entries(toolConfig.license_tiers)) {
        if (tier !== licenseTier && (apis as string[]).some(api => unavailableApis.includes(api))) {
          licenseGaps.push(`Upgrade to ${tier} to unlock ${unavailableApis.join(', ')}`);
        }
      }
    }

    return {
      tool: tool.name,
      available_apis: availableApis,
      available_capabilities: availableCapabilities,
      enabled_use_cases: enabledUseCases,
      missing_apis: missingApis,
      license_gaps: Array.from(new Set(licenseGaps)),
      prerequisites,
      confidence: enabledUseCases.length > 0 ? 0.90 : 0.50
    };
  }

  /**
   * Analyzes the entire stack
   */
  analyzeStack(tools: Tool[]): FeasibilityResult[] {
    return tools.map(tool => this.analyzeToolFeasibility(tool));
  }

  /**
   * Gets detailed API information for a specific tool and API category
   */
  getApiDetails(toolName: string, apiCategory: string) {
    const tool = (toolApis as any).tools[toolName.toLowerCase().replace(/\s+/g, '_')];
    if (!tool || !tool.apis[apiCategory]) {
      return null;
    }

    const api = tool.apis[apiCategory];
    return {
      name: api.name,
      base_url: api.base_url,
      endpoints: api.endpoints,
      capabilities: api.capabilities,
      scopes_required: api.scopes_required,
      documentation: api.documentation
    };
  }
}
```

---

#### 2. `use-case-matcher.ts`
**Purpose:** Matches user's activities to available AI Workers

**What it does:**
- Takes user's stated activities (e.g., "200 app access requests/month, 1.7 hrs each")
- Takes feasibility results (which use cases are enabled)
- Matches activities to use cases from `use-case-mappings.json`
- Calculates fit score (0-100) based on volume + TTR + effort
- Estimates specific deflection and hours saved per use case
- Prioritizes into: immediate wins, quick wins, future state

**Key function:**
```typescript
matchUseCases(
  activities: {category: string, monthly_volume: number, avg_ttr_hours: number}[],
  feasibilityResults: FeasibilityResult[]
): MatchedUseCase[]

// Returns sorted list with:
// - name, description
// - fit_score (0-100)
// - estimated_monthly_deflection (tickets)
// - estimated_hours_saved
// - priority: 'immediate' | 'quick_win' | 'future'
// - prerequisites, workflow_steps
```

**Fit score formula:**
- 40 points: Stack supports this use case
- 30 points: Volume score (50+ tickets/mo = max)
- 20 points: TTR score (2+ hours = max)
- 10 points: Low effort = 10, Medium = 6, High = 3

**Full implementation:**
```typescript
// /src/lib/engines/use-case-matcher.ts

import useCaseMappings from '../data/use-case-mappings.json';
import { FeasibilityResult } from './feasibility-engine';

interface UserActivity {
  category: string;
  monthly_volume: number;
  avg_ttr_hours: number;
  requires_approval?: boolean;
}

interface MatchedUseCase {
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

      // Calculate fit score (0-100)
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

      // Calculate estimated impact
      const estimatedDeflection = totalVolume * useCase.automation_rate;
      const estimatedHoursSaved = estimatedDeflection * avgTtr;

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
```

---

#### 3. `roi-calculator.ts`
**Purpose:** Calculates specific ROI from user's data

**What it does:**
- Sums ticket deflection across all matched use cases
- Calculates total hours saved (deflection × TTR)
- Converts to FTE equivalent: (hours × 12) / 2000
- Calculates annual value: FTE × $100K (default cost)
- Breaks down by category with confidence scores

**Key function:**
```typescript
calculateROI(
  totalMonthlyTickets: number,
  matchedUseCases: MatchedUseCase[]
): ROIResult

// Returns:
// - automatable_tickets, automatable_pct
// - total_hours_saved, fte_equivalent
// - annual_value_usd
// - confidence (weighted average)
// - breakdown_by_category[]
```

**Full implementation:**
```typescript
// /src/lib/engines/roi-calculator.ts

import benchmarks from '../data/benchmarks.json';
import { MatchedUseCase } from './use-case-matcher';

interface ROIResult {
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
```

---

### PHASE 2: Update Report Page

Enhance your existing report page/component to use these engines.

#### How to integrate into your existing report generation:

**Find your current report generation logic** (probably in a results page component or API route).

**Before** (current approach):
```typescript
// Probably something like:
const score = calculateScore(answers);
return <Report score={score} />
```

**After** (enhanced approach):
```typescript
import { FeasibilityEngine } from '@/lib/engines/feasibility-engine';
import { UseCaseMatcher } from '@/lib/engines/use-case-matcher';
import { ROICalculator } from '@/lib/engines/roi-calculator';

// Initialize engines
const feasibilityEngine = new FeasibilityEngine();
const useCaseMatcher = new UseCaseMatcher();
const roiCalculator = new ROICalculator();

// Run analysis
const feasibilityResults = feasibilityEngine.analyzeStack(answers.tools);
const matchedUseCases = useCaseMatcher.matchUseCases(answers.activities, feasibilityResults);
const roiResult = roiCalculator.calculateROI(answers.total_monthly_tickets, matchedUseCases);
const groupedOpportunities = useCaseMatcher.groupByPriority(matchedUseCases);

// Pass to enhanced report
return <Report 
  score={calculateScore(answers)}
  feasibility={feasibilityResults}
  opportunities={groupedOpportunities}
  roi={roiResult}
/>
```

#### Add New Report Sections:

**1. Stack Analysis Section** (add after Executive Summary)

For each tool the user selected, show:
```
[Tool Name] (e.g., Okta)

✅ APIs Available:
• User Lifecycle Management (/api/v1/users)
• Group Management (/api/v1/groups)
• Application Assignments (/api/v1/apps)

✅ AI Workers Ready to Deploy:
• Add User to Okta (addresses 16% of tickets)
• Grant Software Access via Okta (addresses 12% of tickets)
• Bulk Add Users to Okta Group

🎯 Your Opportunity:
Your 200 app access requests/month currently take 1.7 hours each (340 hours total).
With Okta's Grant User Access API, these become real-time (approval latency only).
Estimated impact: 340 hours/month → ~2 FTE saved

⚠️ Prerequisites:
• API token with okta.users.manage and okta.apps.manage scopes
• ServiceNow integration for approval tracking

Confidence: 90%
```

**Example React component:**
```typescript
interface StackAnalysisProps {
  feasibilityResults: FeasibilityResult[];
  matchedUseCases: MatchedUseCase[];
}

export function StackAnalysis({ feasibilityResults, matchedUseCases }: StackAnalysisProps) {
  return (
    <div className="stack-analysis">
      <h2>Your Stack Analysis</h2>
      <p className="section-intro">
        Here's what you can automate with your current tools and APIs:
      </p>

      {feasibilityResults.map((result, idx) => {
        // Find use cases for this tool
        const toolUseCases = matchedUseCases.filter(uc => 
          uc.required_tools.includes(result.tool.toLowerCase().replace(/\s+/g, '_'))
        );

        return (
          <div key={idx} className="tool-card">
            <div className="tool-header">
              <h3>{result.tool}</h3>
              <span className="confidence-badge">
                {Math.round(result.confidence * 100)}% Confidence
              </span>
            </div>

            <div className="apis-section">
              <h4>✅ APIs Available:</h4>
              <ul>
                {result.available_apis.map((api, i) => (
                  <li key={i}>{api}</li>
                ))}
              </ul>
            </div>

            <div className="use-cases-section">
              <h4>✅ AI Workers Ready to Deploy:</h4>
              <ul>
                {toolUseCases.slice(0, 5).map((uc, i) => (
                  <li key={i}>
                    {uc.name} (addresses {uc.estimated_monthly_deflection} tickets/month)
                  </li>
                ))}
              </ul>
            </div>

            <div className="opportunity-section">
              <h4>🎯 Your Opportunity:</h4>
              <p>
                {toolUseCases.length > 0 && toolUseCases[0].description}
              </p>
              <p className="impact">
                Estimated impact: {toolUseCases.reduce((sum, uc) => sum + uc.estimated_hours_saved, 0)} hours/month
              </p>
            </div>

            <div className="prerequisites-section">
              <h4>⚠️ Prerequisites:</h4>
              <ul>
                {result.prerequisites.map((prereq, i) => (
                  <li key={i}>{prereq}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**2. Enhanced Opportunity Map** (replace current opportunities section)

Show three priority tiers with detailed cards:

```typescript
interface OpportunityMapProps {
  opportunities: {
    immediate: MatchedUseCase[];
    quick_wins: MatchedUseCase[];
    future: MatchedUseCase[];
  };
}

export function OpportunityMap({ opportunities }: OpportunityMapProps) {
  return (
    <div className="opportunity-map">
      <h2>Opportunity Map</h2>

      {/* Immediate Wins */}
      <section className="immediate-wins">
        <h3>⚡ Immediate Wins (Week 1-4)</h3>
        <p>Deploy these AI Workers immediately with your current stack</p>
        
        {opportunities.immediate.map((uc, idx) => (
          <div key={idx} className="use-case-card detailed">
            <div className="card-header">
              <h4>{uc.name}</h4>
              <span className="fit-score">Fit Score: {uc.fit_score}/100</span>
            </div>
            
            <p className="description">{uc.description}</p>
            
            <div className="impact-metrics">
              <div className="metric">
                <span className="label">Addresses:</span>
                <span className="value">{uc.estimated_monthly_deflection} tickets/month</span>
              </div>
              <div className="metric">
                <span className="label">Hours saved:</span>
                <span className="value">{uc.estimated_hours_saved}/month</span>
              </div>
              <div className="metric">
                <span className="label">Confidence:</span>
                <span className="value">{Math.round(uc.confidence * 100)}%</span>
              </div>
            </div>

            <div className="workflow">
              <h5>How it works:</h5>
              <ol>
                {uc.workflow_steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="prerequisites">
              <h5>Prerequisites:</h5>
              <ul>
                {uc.prerequisites.map((prereq, i) => (
                  <li key={i}>
                    <span className="icon">
                      {prereq.toLowerCase().includes('you have') ? '✅' : '⚠️'}
                    </span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>

            <div className="implementation-info">
              <span className="effort">{uc.implementation_effort} effort</span>
              <span className="timeline">{uc.time_to_value_days} days to value</span>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Wins */}
      <section className="quick-wins">
        <h3>🎯 Quick Wins (Month 2-3)</h3>
        <p>High ROI with minor setup required</p>
        
        {opportunities.quick_wins.slice(0, 5).map((uc, idx) => (
          <div key={idx} className="use-case-card compact">
            <h4>{uc.name}</h4>
            <div className="quick-stats">
              <span>{uc.estimated_monthly_deflection} tickets/mo</span>
              <span>{uc.estimated_hours_saved} hrs saved</span>
              <span className="effort">{uc.implementation_effort} effort</span>
            </div>
          </div>
        ))}
      </section>

      {/* Future State */}
      {opportunities.future.length > 0 && (
        <section className="future-state">
          <h3>🔮 Future State (Month 4+)</h3>
          <p>Additional integrations or process maturity needed</p>
          
          <div className="future-grid">
            {opportunities.future.slice(0, 6).map((uc, idx) => (
              <div key={idx} className="future-card">
                <h5>{uc.name}</h5>
                <p>{uc.estimated_monthly_deflection} tickets/mo</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

**3. Gap Analysis Section** (NEW)

Show what they're missing:

```typescript
interface GapAnalysisProps {
  feasibilityResults: FeasibilityResult[];
}

export function GapAnalysis({ feasibilityResults }: GapAnalysisProps) {
  const gaps = feasibilityResults.filter(
    result => result.missing_apis.length > 0 || result.license_gaps.length > 0
  );

  if (gaps.length === 0) {
    return null;
  }

  return (
    <div className="gap-analysis">
      <h2>🔶 What You're Missing</h2>
      <p>Additional capabilities available with setup or upgrades:</p>

      {gaps.map((gap, idx) => (
        <div key={idx} className="gap-card">
          <h3>{gap.tool}</h3>
          
          {gap.missing_apis.length > 0 && (
            <div className="missing-apis">
              <h4>Missing APIs:</h4>
              <ul>
                {gap.missing_apis.map((api, i) => (
                  <li key={i}>{api}</li>
                ))}
              </ul>
            </div>
          )}

          {gap.license_gaps.length > 0 && (
            <div className="license-gaps">
              <h4>License Requirements:</h4>
              <ul>
                {gap.license_gaps.map((gap, i) => (
                  <li key={i}>{gap}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="gap-impact">
            <p>
              <strong>Potential Impact:</strong> Additional automation possible if addressed.
              Could unlock {gap.missing_apis.length} more API capabilities.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**4. By-the-Numbers ROI** (enhance existing ROI section)

```typescript
interface ROIBreakdownProps {
  roi: ROIResult;
  activities: UserActivity[];
}

export function ROIBreakdown({ roi, activities }: ROIBreakdownProps) {
  return (
    <div className="roi-breakdown">
      <h2>By-the-Numbers ROI</h2>

      <div className="current-state">
        <h3>📊 Your Current State:</h3>
        <ul>
          <li>Total monthly tickets: <strong>{roi.total_monthly_tickets}</strong></li>
          {activities.map((activity, idx) => (
            <li key={idx}>
              {activity.category}: {activity.monthly_volume} tickets × {activity.avg_ttr_hours} hrs = {Math.round(activity.monthly_volume * activity.avg_ttr_hours)} hrs
            </li>
          ))}
        </ul>
      </div>

      <div className="with-ai-workers">
        <h3>📈 With AI Workers:</h3>
        <ul>
          <li>Automatable tickets: <strong>{roi.automatable_tickets}</strong> ({roi.automatable_pct}%)</li>
          <li>Monthly hours saved: <strong>{roi.total_hours_saved} hours</strong></li>
          <li>FTE equivalent: <strong>{roi.fte_equivalent} FTE</strong></li>
          <li>Annual value: <strong>${roi.annual_value_usd.toLocaleString()}</strong></li>
        </ul>
      </div>

      <div className="category-breakdown">
        <h3>Breakdown by Category:</h3>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Tickets</th>
              <th>Hours Saved</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {roi.breakdown_by_category.map((cat, idx) => (
              <tr key={idx}>
                <td>{cat.category}</td>
                <td>{cat.tickets}</td>
                <td>{cat.hours_saved}</td>
                <td>{Math.round(cat.confidence * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="confidence-note">
        <p>
          <strong>Confidence:</strong> {roi.confidence}% (based on self-reported data)
        </p>
        <p>
          → Upgrade to 95% confidence with 7-day ticket listening
        </p>
      </div>
    </div>
  );
}
```

**5. Implementation Roadmap** (enhance existing roadmap)

```typescript
interface RoadmapProps {
  opportunities: {
    immediate: MatchedUseCase[];
    quick_wins: MatchedUseCase[];
  };
}

export function ImplementationRoadmap({ opportunities }: RoadmapProps) {
  const immediateHours = opportunities.immediate.reduce((sum, uc) => sum + uc.estimated_hours_saved, 0);
  const immediateTickets = opportunities.immediate.reduce((sum, uc) => sum + uc.estimated_monthly_deflection, 0);

  return (
    <div className="implementation-roadmap">
      <h2>Implementation Roadmap</h2>

      <div className="phase phase-1">
        <div className="phase-header">
          <h3>Phase 1: Foundation</h3>
          <span className="timeline">Weeks 1-2</span>
        </div>
        
        <div className="phase-content">
          <h4>Tasks:</h4>
          <ul>
            <li>Generate API tokens for selected tools</li>
            <li>Configure read-only connections</li>
            <li>Set up 7-day ticket listening</li>
            <li>Map approval workflows</li>
          </ul>
          
          <h4>Deliverables:</h4>
          <ul>
            <li>45-min setup call</li>
            <li>Baseline ticket analysis report</li>
          </ul>
        </div>
      </div>

      <div className="phase phase-2">
        <div className="phase-header">
          <h3>Phase 2: Quick Wins</h3>
          <span className="timeline">Weeks 3-6</span>
        </div>
        
        <div className="phase-content">
          <h4>AI Workers to Deploy:</h4>
          <ul>
            {opportunities.immediate.slice(0, 3).map((uc, idx) => (
              <li key={idx}>{uc.name}</li>
            ))}
          </ul>
          
          <h4>Expected Impact:</h4>
          <p>
            {immediateTickets} tickets/month automated<br/>
            {Math.round(immediateHours)} hours/month saved (~{Math.round((immediateHours * 12 / 2000) * 10) / 10} FTE)
          </p>
        </div>
      </div>

      <div className="phase phase-3">
        <div className="phase-header">
          <h3>Phase 3: Scale</h3>
          <span className="timeline">Months 2-3</span>
        </div>
        
        <div className="phase-content">
          <h4>Additional AI Workers:</h4>
          <ul>
            {opportunities.quick_wins.slice(0, 5).map((uc, idx) => (
              <li key={idx}>{uc.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

---

## Testing

### Test with this sample input:

```typescript
const testInput = {
  tools: [
    { name: "Okta", license_tier: "enterprise" },
    { name: "ServiceNow", license_tier: "professional" },
    { name: "Slack", license_tier: "business_plus" },
    { name: "Google Workspace", license_tier: "business_standard" }
  ],
  activities: [
    {
      category: "app_access",
      monthly_volume: 200,
      avg_ttr_hours: 1.7,
      requires_approval: true
    },
    {
      category: "distribution_lists",
      monthly_volume: 50,
      avg_ttr_hours: 0.75,
      requires_approval: false
    },
    {
      category: "onboarding",
      monthly_volume: 30,
      avg_ttr_hours: 4.0,
      requires_approval: true
    }
  ],
  total_monthly_tickets: 1000,
  governance: {
    identity_source: "okta",
    approval_required: true,
    kb_available: true
  }
};

// Test the engines
const feasibilityEngine = new FeasibilityEngine();
const useCaseMatcher = new UseCaseMatcher();
const roiCalculator = new ROICalculator();

const feasibility = feasibilityEngine.analyzeStack(testInput.tools);
console.log("Feasibility:", feasibility);

const matches = useCaseMatcher.matchUseCases(testInput.activities, feasibility);
console.log("Matched Use Cases:", matches);

const roi = roiCalculator.calculateROI(testInput.total_monthly_tickets, matches);
console.log("ROI:", roi);
```

### Expected Results:

- **Feasibility**: Should show Okta with 4 APIs, ServiceNow with Table API, Slack with Web + SCIM, Google Workspace with Directory + License APIs
- **Matched Use Cases**: Should include "Grant Software Access via Okta", "Group Management in Google Workspace", "Offboarding Employee" with high fit scores
- **ROI**: Should show ~250-300 automatable tickets, ~350-450 hours saved, ~2-2.5 FTE
- **No Hallucinations**: All APIs mentioned should exist in tool-apis.json

---

## Build Order

1. ✅ **Create `/src/lib/engines/` directory**
2. ✅ **Build `feasibility-engine.ts`** - Test it first
3. ✅ **Build `use-case-matcher.ts`** - Test it
4. ✅ **Build `roi-calculator.ts`** - Test it
5. ✅ **Update report generation logic** to use the engines
6. ✅ **Add new report components** one at a time:
   - StackAnalysis
   - OpportunityMap (enhanced)
   - GapAnalysis
   - ROIBreakdown (enhanced)
   - ImplementationRoadmap (enhanced)
7. ✅ **Test with sample data**
8. ✅ **Verify no API hallucinations**

---

## Critical Rules

1. **No API hallucinations** - Only show APIs that exist in tool-apis.json
2. **Use actual data** - Calculate ROI from user's real ticket volumes, not generic estimates
3. **Be specific** - Show actual endpoint paths (e.g., `/api/v1/users`, not "user API")
4. **Show prerequisites** - List what's needed (API tokens, scopes, licenses)
5. **Prioritize correctly** - Immediate wins = low effort + ≤7 days to value
6. **Validate everything** - Check that matched use cases actually have required APIs available

---

## Questions to Ask Me

If you need clarification:
- "Where is your current report page component located?"
- "How is assessment data currently passed to the report?"
- "Should I create TypeScript types file for shared interfaces?"
- "Do you want me to preserve existing report sections or replace them?"

---

## Start Building

Please start by:
1. Confirming you can see the three data files in `/src/lib/data/`
2. Creating `/src/lib/engines/` directory
3. Building `feasibility-engine.ts` first
4. Testing it with the sample input above
5. Showing me the console output before proceeding to the next engine

Then we'll build the other engines and update the report components.
</document>

Perfect! Now you can:
1. Download this artifact (click the download button)
2. Upload it to your Replit project
3. Open the Replit Agent and say: "Please read the file `replit-instructions-enhance-report.md` and follow the instructions to build the enhanced report system. Start with Step 1 (feasibility-engine.ts) and show me the results before proceeding."

This gives you a complete, downloadable instruction file! 🚀
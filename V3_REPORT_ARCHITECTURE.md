# V3 Report Architecture

## Overview

The V3 report system transforms user assessment data into specific, API-grounded recommendations for AI Worker deployment. Instead of generic estimates, it analyzes the user's actual tech stack capabilities, ticket distribution, and volumes to provide precise automation opportunities.

**Key Innovation:** The report shows exactly which AI Workers can be deployed based on the user's real API availability, not hypothetical scenarios.

## System Architecture

### High-Level Flow

```
Assessment Data (3 Steps)
    ↓
[Analysis Phase - 3 Engines]
    ├── FeasibilityEngine: Analyzes API availability
    ├── UseCaseMatcher: Matches AI Workers to ticket categories
    └── ROICalculator: Calculates precise ROI
    ↓
Report Components (Display Results)
```

### The Three Analysis Engines

Located in `/src/lib/engines/`, these engines process assessment data during the 3-second analysis phase:

#### 1. **FeasibilityEngine** (`feasibility-engine.ts`)

**Purpose:** Determines which APIs and capabilities are available based on user's tech stack and license tiers.

**Input:**
- Tools array: `[{ name: "Okta", license_tier: "enterprise" }]`

**Process:**
1. Looks up each tool in `tool-apis.json` under `tools.{tool_name}`
2. Gets available API keys from `license_tiers.{license_tier}`
3. Collects API details from `apis.{api_key}` for each available key
4. Cross-references with `use-case-mappings.json` to find enabled use case IDs
5. Identifies missing APIs by checking blocked use cases
6. Identifies license upgrade opportunities

**TypeScript Interface:**
```typescript
interface FeasibilityResult {
  tool: string;                      // Display name (e.g., "Okta")
  available_apis: string[];          // API display names
  available_capabilities: string[];  // Capabilities from all APIs
  enabled_use_cases: string[];       // Use case IDs (not names)
  missing_apis: string[];            // API keys blocking use cases
  license_gaps: string[];            // Upgrade messages
  prerequisites: string[];           // Setup requirements
  confidence: number;                // 0.90 if use cases enabled, 0.50 otherwise
}
```

**Example Output:**
```typescript
{
  tool: "Okta",
  available_apis: [
    "User Lifecycle Management",
    "Group Management",
    "Application Assignments"
  ],
  available_capabilities: [
    "create_user", "activate_user", "deactivate_user",
    "create_group", "add_user_to_group",
    "assign_user_to_app", "revoke_app_access"
  ],
  enabled_use_cases: [
    "grant_software_access_okta",
    "offboard_user_okta",
    "create_distribution_list"
  ],
  missing_apis: [],
  license_gaps: [],
  prerequisites: [
    "User Lifecycle Management: API token with appropriate scopes",
    "Group Management: API token with appropriate scopes",
    "Application Assignments: API token with appropriate scopes"
  ],
  confidence: 0.90
}
```

#### 2. **UseCaseMatcher** (`use-case-matcher.ts`)

**Purpose:** Matches user's ticket distribution to specific AI Workers using a fit scoring algorithm.

**Input:**
```typescript
interface UserActivity {
  category: string;              // "applications", "security", etc.
  monthly_volume: number;        // Ticket count
  avg_ttr_hours: number;         // Average time-to-resolve
  requires_approval?: boolean;
}
```

**Scoring Algorithm (0-100 points):**
- **40 points:** Stack support (use case is enabled)
- **30 points:** Volume suitability: `Math.min(30, (totalVolume / 50) * 30)` — 50+ tickets = max score
- **20 points:** TTR suitability: `Math.min(20, (avgTtr / 2) * 20)` — 2+ hours = max score  
- **10 points:** Implementation effort (low=10, medium=6, high=3)

**Process:**
1. Filter to only enabled use cases from feasibility results
2. For each use case, find matching activities by ticket_categories
3. Calculate fit score (0-100)
4. Estimate deflection: `totalVolume * automation_rate`
5. Estimate hours saved: `deflectedTickets * avgTtr`
6. Prioritize: immediate (low effort + ≤7 days), quick_win (≤21 days), future (>21 days)

**TypeScript Interface:**
```typescript
interface MatchedUseCase {
  use_case_id: string;
  name: string;
  category: string;
  description: string;
  value_proposition: string;
  fit_score: number;                       // 0-100
  estimated_monthly_deflection: number;    // Tickets automated
  estimated_hours_saved: number;           // Hours per month
  confidence: number;                      // From use case definition
  implementation_effort: 'low' | 'medium' | 'high';
  time_to_value_days: number;
  prerequisites: string[];
  workflow_steps: string[];
  priority: 'immediate' | 'quick_win' | 'future';
  required_tools: string[];
}
```

**Example Output:**
```typescript
{
  use_case_id: "grant_software_access_okta",
  name: "Grant Software Access via Okta",
  category: "applications",
  description: "...",
  value_proposition: "...",
  fit_score: 79,                          // 40 + 30 + 2.5 + 6 = 78.5 → 79
  estimated_monthly_deflection: 156,      // 240 tickets * 0.65 automation_rate
  estimated_hours_saved: 39.0,            // 156 * 0.25 avgTtr
  confidence: 0.85,
  implementation_effort: "medium",
  time_to_value_days: 7,
  prerequisites: [...],
  workflow_steps: [...],
  priority: "quick_win",                  // Medium effort → not immediate
  required_tools: ["okta"]
}
```

#### 3. **ROICalculator** (`roi-calculator.ts`)

**Purpose:** Calculates comprehensive ROI from all matched use cases.

**Input:**
- Total monthly tickets
- Matched use cases from UseCaseMatcher
- Fully loaded cost per FTE (default $100K)

**Calculations:**
- **Automatable Tickets:** Sum of `estimated_monthly_deflection` across all use cases
- **Automatable %:** `(automatableTickets / totalMonthlyTickets) * 100`
- **Total Hours Saved:** Sum of `estimated_hours_saved` across all use cases
- **FTE Equivalent:** `(totalHoursSaved * 12 months) / 2000 hours per FTE`
- **Annual Value:** `fteEquivalent * fullyLoadedCost`
- **Weighted Confidence:** `sum(useCase.confidence * useCase.estimated_hours_saved) / totalHoursSaved`
  - Guards against division by zero: returns 0.70 if totalHoursSaved == 0

**TypeScript Interface:**
```typescript
interface ROIResult {
  total_monthly_tickets: number;
  automatable_tickets: number;
  automatable_pct: number;          // Rounded to 1 decimal
  total_hours_saved: number;
  fte_equivalent: number;           // Rounded to 1 decimal
  annual_value_usd: number;
  confidence: number;               // Percentage (0-100)
  breakdown_by_category: {
    category: string;
    tickets: number;
    hours_saved: number;            // Rounded to 1 decimal
    confidence: number;             // Average of use case confidences
  }[];
}
```

**Example Output:**
```typescript
{
  total_monthly_tickets: 1000,
  automatable_tickets: 387,
  automatable_pct: 38.7,
  total_hours_saved: 156,
  fte_equivalent: 0.9,                    // (156 * 12) / 2000
  annual_value_usd: 93600,                // 0.9 * $100K (rounded)
  confidence: 78,                          // Weighted by hours saved
  breakdown_by_category: [
    {
      category: "applications",
      tickets: 168,
      hours_saved: 56.0,
      confidence: 0.85
    },
    {
      category: "security",
      tickets: 142,
      hours_saved: 68.0,
      confidence: 0.76
    },
    {
      category: "onboarding",
      tickets: 77,
      hours_saved: 32.0,
      confidence: 0.72
    }
  ]
}
```

## Data Sources

### 1. `tool-apis.json`

Root structure:
```json
{
  "tools": {
    "{tool_key}": {
      "name": "Display Name",
      "category": "identity|itsm|communication|productivity",
      "apis": {
        "{api_key}": {
          "name": "API Display Name",
          "base_url": "...",
          "endpoints": [...],
          "capabilities": ["capability_1", "capability_2"],
          "scopes_required": [...],
          "documentation": "url"
        }
      },
      "license_tiers": {
        "{tier_name}": ["api_key_1", "api_key_2"]
      },
      "prerequisites": "Setup requirements"
    }
  }
}
```

**Example:**
```json
{
  "tools": {
    "okta": {
      "name": "Okta",
      "category": "identity",
      "apis": {
        "user_lifecycle": {
          "name": "User Lifecycle Management",
          "capabilities": ["create_user", "activate_user", "deactivate_user"],
          ...
        },
        "app_assignments": {
          "name": "Application Assignments",
          "capabilities": ["assign_user_to_app", "revoke_app_access"],
          ...
        }
      },
      "license_tiers": {
        "workforce_identity": ["user_lifecycle", "group_management"],
        "enterprise": ["user_lifecycle", "group_management", "app_assignments", "audit_logs"]
      },
      "prerequisites": "API token with appropriate scopes"
    }
  }
}
```

### 2. `use-case-mappings.json`

Root structure:
```json
{
  "use_cases": [
    {
      "id": "string",
      "name": "Display Name",
      "category": "applications|security|hardware|...",
      "description": "...",
      "value_proposition": "...",
      "required_tools": ["tool_key_1"],
      "required_apis": {
        "tool_key_1": ["api_key_1", "api_key_2"]
      },
      "ticket_categories": ["applications", "security"],
      "automation_rate": 0.65,
      "implementation_effort": "low|medium|high",
      "time_to_value_days": 7,
      "confidence": 0.85,
      "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
      "workflow_steps": ["Step 1", "Step 2"]
    }
  ]
}
```

**Example:**
```json
{
  "use_cases": [
    {
      "id": "grant_software_access_okta",
      "name": "Grant Software Access via Okta",
      "category": "applications",
      "required_tools": ["okta"],
      "required_apis": {
        "okta": ["user_lifecycle", "app_assignments"]
      },
      "ticket_categories": ["applications"],
      "automation_rate": 0.65,
      "implementation_effort": "medium",
      "time_to_value_days": 7,
      "confidence": 0.85,
      ...
    }
  ]
}
```

### 3. `benchmarks.json`

Contains industry baseline metrics:
```json
{
  "ticket_categories": {
    "{category}": {
      "median_ttr_hours": number,
      "automation_potential": number
    }
  }
}
```

## Report Components

### 1. **Executive Summary**
**Status:** ⚠️ Needs update  
**Current:** Uses old opportunity engine (shows 0% deflection)  
**Should use:** `roiResult.automatable_pct`, `total_hours_saved`, `fte_equivalent`

### 2. **Stack Analysis**
**Status:** ✅ Working  
**Data source:** `feasibilityResults[]`  
**Displays:**
- Available APIs per tool (from `available_apis`)
- Enabled use case names (looks up IDs in `enabled_use_cases`)
- Opportunities: automatable tickets by use case
- Prerequisites needed

### 3. **Gap Analysis**
**Status:** ✅ Working  
**Data source:** `feasibilityResults[]`  
**Displays:**
- Missing APIs (from `missing_apis`)
- License upgrade paths (from `license_gaps`)
- Only renders if gaps exist

### 4. **Opportunity Analysis**
**Status:** ⚠️ Needs update  
**Current:** Uses old opportunity engine  
**Should use:** Top 5 from `matchedUseCases` sorted by fit_score

### 5. **Best Fit Use Cases**
**Status:** ⚠️ May need update  
**Current:** Uses old opportunities  
**Should use:** `matchedUseCases` filtered by priority tiers

### 6. **ROI Breakdown**
**Status:** ✅ Working  
**Data source:** `roiResult`  
**Displays:**
- Total metrics: automatable_tickets, automatable_pct, total_hours_saved, fte_equivalent, annual_value_usd
- Category breakdown: tickets, hours_saved, confidence per category
- Overall confidence percentage

### 7. **Get-Started Roadmap**
**Status:** ⚠️ May need update  
**Should prioritize:** Use cases by `priority` field (immediate → quick_win → future)

### 8. **Expected Outcomes**
**Current:** Uses old metrics  
**Should use:** Data from `roiResult`

## Data Flow Example

### Input: User Assessment
```javascript
{
  techStack: ["okta", "servicenow"],
  licenseTiers: { okta: "enterprise", servicenow: "standard" },
  monthlyTickets: 1000,
  ticketDistribution: {
    applications: 24,     // 240 tickets/month
    security: 25,          // 250 tickets/month
    hardware: 18,          // 180 tickets/month
    distributionLists: 12, // 120 tickets/month
    network: 11,           // 110 tickets/month
    onboarding: 10         // 100 tickets/month
  }
}
```

### Step 1: FeasibilityEngine Analysis

**Input to engine:**
```javascript
[
  { name: "Okta", license_tier: "enterprise" },
  { name: "ServiceNow", license_tier: "standard" }
]
```

**Output:**
```javascript
[
  {
    tool: "Okta",
    available_apis: [
      "User Lifecycle Management",
      "Group Management", 
      "Application Assignments",
      "System Logs"
    ],
    available_capabilities: [
      "create_user", "activate_user", "deactivate_user", 
      "create_group", "add_user_to_group",
      "assign_user_to_app", "revoke_app_access",
      "audit_access_changes"
    ],
    enabled_use_cases: [
      "grant_software_access_okta",
      "offboard_user_okta",
      "create_distribution_list"
    ],
    missing_apis: [],
    license_gaps: [],
    prerequisites: [...],
    confidence: 0.90
  },
  {
    tool: "ServiceNow",
    available_apis: ["Table API"],
    available_capabilities: [
      "create_ticket", "update_ticket", "add_work_notes"
    ],
    enabled_use_cases: ["create_servicenow_ticket"],
    missing_apis: [],
    license_gaps: [],
    prerequisites: [...],
    confidence: 0.90
  }
]
```

### Step 2: UseCaseMatcher Scoring

**Input to engine:**
```javascript
activities = [
  { category: "applications", monthly_volume: 240, avg_ttr_hours: 0.25 },
  { category: "security", monthly_volume: 250, avg_ttr_hours: 0.75 },
  ...
]

enabledUseCaseIds = [
  "grant_software_access_okta",
  "offboard_user_okta",
  "create_distribution_list",
  "create_servicenow_ticket"
]
```

**Processing "grant_software_access_okta":**
```javascript
// Matches activities: applications (240 tickets)
totalVolume = 240
avgTtr = 0.25 hours

// Fit score calculation:
stackSupport = 40        // Enabled by stack
volumeScore = 30         // Math.min(30, (240 / 50) * 30) = 30 (capped)
ttrScore = 2.5           // Math.min(20, (0.25 / 2) * 20) = 2.5
effortScore = 6          // Medium effort = 6 points
fitScore = 40 + 30 + 2.5 + 6 = 78.5 → 79 (rounded)

// Impact estimation:
automation_rate = 0.65 (from use case definition)
deflection = 240 * 0.65 = 156 tickets
hoursSaved = 156 * 0.25 = 39 hours

// Priority determination:
// Code: if (effort === 'low' && time_to_value_days <= 7) → "immediate"
//       else if (time_to_value_days <= 21) → "quick_win"  
//       else → "future"
effort = "medium", time_to_value_days = 7
→ priority = "quick_win"  // Not immediate because effort is medium, not low
```

**Output:**
```javascript
{
  use_case_id: "grant_software_access_okta",
  name: "Grant Software Access via Okta",
  category: "applications",
  fit_score: 79,
  estimated_monthly_deflection: 156,
  estimated_hours_saved: 39.0,
  confidence: 0.85,
  priority: "quick_win",    // Corrected: medium effort disqualifies from immediate
  ...
}
```

### Step 3: ROICalculator Aggregation

**Input to engine:**
```javascript
totalMonthlyTickets = 1000
matchedUseCases = [
  { estimated_monthly_deflection: 156, estimated_hours_saved: 39, confidence: 0.85, category: "applications" },
  { estimated_monthly_deflection: 142, estimated_hours_saved: 68, confidence: 0.76, category: "security" },
  { estimated_monthly_deflection: 77, estimated_hours_saved: 32, confidence: 0.72, category: "onboarding" }
]
```

**Calculations:**
```javascript
automatableTickets = 156 + 142 + 77 = 375
automatablePct = (375 / 1000) * 100 = 37.5%
totalHoursSaved = 39 + 68 + 32 = 139
fteEquivalent = (139 * 12) / 2000 = 0.8
annualValue = 0.8 * 100000 = $83,400

// Weighted confidence:
weightedConf = (0.85*39 + 0.76*68 + 0.72*32) / 139 = 0.77 → 77%

// Category breakdown:
applications: { tickets: 156, hours_saved: 39, confidence: 0.85 }
security: { tickets: 142, hours_saved: 68, confidence: 0.76 }
onboarding: { tickets: 77, hours_saved: 32, confidence: 0.72 }
```

**Output:**
```javascript
{
  total_monthly_tickets: 1000,
  automatable_tickets: 375,
  automatable_pct: 37.5,
  total_hours_saved: 139,
  fte_equivalent: 0.8,
  annual_value_usd: 83400,
  confidence: 77,
  breakdown_by_category: [...]
}
```

### Step 4: Report Display

**Stack Analysis** renders:
```
✓ Okta Enterprise provides:
  - User Lifecycle Management
  - Group Management  
  - Application Assignments
  - System Logs

✓ Enabled AI Workers:
  - Grant Software Access via Okta
  - Offboard User
  - Create Distribution List

✓ Opportunities:
  - 156 application tickets automatable with Grant Software Access (fit score: 79)
```

**ROI Breakdown** renders:
```
Total Impact:
  375 tickets/month (37.5%) automatable
  139 hours saved per month
  0.8 FTE equivalent
  $83,400 annual value
  77% confidence

By Category:
  Security: 142 tickets, 68 hrs/month (76% confidence)
  Applications: 156 tickets, 39 hrs/month (85% confidence)
  Onboarding: 77 tickets, 32 hrs/month (72% confidence)
```

## Key Design Principles

1. **No API Hallucination:** All APIs come from `tool-apis.json`. The system only shows capabilities that actually exist.

2. **Grounded in User Data:** Calculations use the user's actual ticket volumes and distribution, not generic industry averages.

3. **Confidence Scoring:** Every estimate includes a confidence score based on how well the use case matches the user's environment.

4. **Actionable Recommendations:** Report shows specific API calls, tools, and prerequisites needed.

5. **Transparent Calculations:** All fit scores and ROI calculations are derived from documented formulas.

## Current State & Known Issues

### Working ✅
- FeasibilityEngine: Correctly analyzes API availability per license tier
- UseCaseMatcher: Calculates fit scores and matches use cases to ticket categories
- ROICalculator: Computes ROI with category breakdowns
- Stack Analysis component: Displays API data accurately
- Gap Analysis: Shows missing capabilities
- ROI Breakdown: Shows category-level impact
- Division-by-zero bug fixed in ROI calculator

### Needs Update ⚠️
- **Executive Summary:** Uses old opportunity engine (shows 0% deflection). Should use `roiResult` data.
- **Opportunity Analysis:** Uses old opportunity engine. Should use top 5 `matchedUseCases` sorted by fit_score.
- **Get-Started Roadmap:** Should prioritize AI Workers based on `priority` field from UseCaseMatcher.
- **workerMatcher.ts:** Still references old assessment fields (`ticketVolume`, `topWorkflows`). Deprecated in favor of engines.

### Data Files Status
- `tool-apis.json`: ✅ Complete with 7 tools (Okta, ServiceNow, Slack, Google Workspace, Microsoft Entra, Jira, Zoom)
- `use-case-mappings.json`: ✅ Contains use case definitions with automation_rate, confidence, prerequisites
- `benchmarks.json`: ✅ Industry baseline metrics for ticket categories

## Future Enhancements

1. **Update Executive Summary:** Connect to `roiResult` for accurate metrics display

2. **Migrate Report Components:** Update Opportunity Analysis and Roadmap to use new engines

3. **LLM-Generated Narratives:** Use LLM to create personalized analysis based on feasibilityResults, matchedUseCases, roiResult, and additionalContext

4. **Dynamic Confidence Adjustment:** Factor in additional context (e.g., "GDPR required") to adjust confidence scores

5. **Remove Legacy Code:** Deprecate old opportunity engine and workerMatcher.ts once all components migrated

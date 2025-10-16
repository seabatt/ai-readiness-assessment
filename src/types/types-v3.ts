// V3 Architecture Type Definitions

// ============================================================================
// Assessment Input Types
// ============================================================================

export interface AssessmentInput {
  techStack: string[]; // Tool IDs selected by user
  monthlyTickets: number; // Total monthly ticket volume
  ticketDistribution: {
    // Percentage distribution (must sum to 100)
    [category: string]: number; // e.g., "applications": 24
  };
  additionalContext?: string; // Free-form context from Step 3
}

// ============================================================================
// Engine Output Types
// ============================================================================

// FeasibilityEngine Output
export interface FeasibilityResult {
  tool: string; // Display name (e.g., "Okta")
  available_apis: string[]; // API display names
  available_capabilities: string[]; // All capabilities from APIs
  enabled_use_cases: string[]; // Use case IDs (not names)
  missing_apis: string[]; // API keys blocking use cases
  license_gaps: string[]; // Upgrade messages
  prerequisites: string[]; // Setup requirements
  confidence: number; // 0.90 if use cases enabled, 0.50 otherwise
}

// UseCaseMatcher Output
export interface MatchedUseCase {
  use_case_id: string;
  name: string;
  category: string;
  description: string;
  value_proposition: string;
  fit_score: number; // 0-100
  estimated_monthly_deflection: number; // Tickets automated
  estimated_hours_saved: number; // Hours per month
  confidence: number; // From use case definition
  implementation_effort: "low" | "medium" | "high";
  time_to_value_days: number;
  prerequisites: string[];
  workflow_steps: string[];
  priority: "immediate" | "quick_win" | "future";
  required_tools: string[];
}

// ROICalculator Output
export interface ROIResult {
  total_monthly_tickets: number;
  automatable_tickets: number;
  automatable_pct: number; // Rounded to 1 decimal
  total_hours_saved: number;
  fte_equivalent: number; // Rounded to 1 decimal
  annual_value_usd: number;
  confidence: number; // Percentage (0-100)
  breakdown_by_category: CategoryBreakdown[];
}

export interface CategoryBreakdown {
  category: string;
  tickets: number;
  hours_saved: number; // Rounded to 1 decimal
  confidence: number; // Average of use case confidences
}

// ============================================================================
// Report Data Structure
// ============================================================================

export interface ReportData {
  assessmentInput: AssessmentInput;
  feasibilityResults: FeasibilityResult[];
  matchedUseCases: MatchedUseCase[];
  roiResult: ROIResult;
  generatedAt: string; // ISO timestamp
}

// ============================================================================
// Data Source Types (from JSON files)
// ============================================================================

// tool-apis.json structure
export interface ToolAPIsData {
  tools: {
    [toolKey: string]: {
      name: string;
      category: "identity" | "itsm" | "communication" | "productivity";
      apis: {
        [apiKey: string]: {
          name: string;
          base_url: string;
          endpoints: APIEndpoint[];
          capabilities: string[];
          scopes_required: string[];
          documentation: string;
        };
      };
      license_tiers: {
        [tierName: string]: string[]; // Array of API keys
      };
      prerequisites: string;
    };
  };
}

export interface APIEndpoint {
  method: string;
  path: string;
  description: string;
}

// use-case-mappings.json structure
export interface UseCaseMappingsData {
  use_cases: UseCaseDefinition[];
}

export interface UseCaseDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  value_proposition: string;
  required_tools: string[];
  required_apis: {
    [toolKey: string]: string[]; // Tool key → array of API keys
  };
  ticket_categories: string[]; // Categories this use case handles
  automation_rate: number; // 0.0 to 1.0
  implementation_effort: "low" | "medium" | "high";
  time_to_value_days: number;
  confidence: number; // 0.0 to 1.0
  prerequisites: string[];
  workflow_steps: string[];
}

// benchmarks.json structure
export interface BenchmarksData {
  ticket_categories: {
    [category: string]: {
      median_ttr_hours: number;
      automation_potential: number;
    };
  };
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface ExecutiveSummaryProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
  assessmentData: {
    techStack: string[];
    additionalContext?: string;
  };
}

export interface StackAnalysisProps {
  feasibilityResults: FeasibilityResult[];
  matchedUseCases: MatchedUseCase[];
}

export interface GapAnalysisProps {
  feasibilityResults: FeasibilityResult[];
}

export interface OpportunityAnalysisProps {
  matchedUseCases: MatchedUseCase[];
  topN?: number;
}

export interface BestFitUseCasesProps {
  matchedUseCases: MatchedUseCase[];
}

export interface ROIBreakdownProps {
  roiResult: ROIResult;
}

export interface GetStartedRoadmapProps {
  matchedUseCases: MatchedUseCase[];
}

export interface ExpectedOutcomesProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
}

// ============================================================================
// Internal Processing Types
// ============================================================================

export interface UserActivity {
  category: string; // "applications", "security", etc.
  monthly_volume: number; // Ticket count
  avg_ttr_hours: number; // Average time-to-resolve
  requires_approval?: boolean;
}

export interface FitScoreBreakdown {
  stack_support: number; // 0-40 points
  volume_score: number; // 0-30 points
  ttr_score: number; // 0-20 points
  effort_score: number; // 0-10 points
  total: number; // Sum (0-100)
}

// ============================================================================
// Utility Types
// ============================================================================

export type Priority = "immediate" | "quick_win" | "future";
export type ImplementationEffort = "low" | "medium" | "high";
export type ToolCategory =
  | "identity"
  | "itsm"
  | "communication"
  | "productivity";

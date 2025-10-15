// Assessment Data Types
export interface AssessmentData {
  techStack: string[];
  topWorkflows: string[];
  ticketVolume: string;
  teamSize: string;
  avgResolutionTime: string;
  employeeCount: string;
  approvalWorkflows: string;
  repetitivePercentage: string;
  primaryPainPoint: string;
  monthlyTickets?: number;
  ticketDistribution?: {
    applications: number;
    hardware: number;
    onboarding: number;
    distributionLists: number;
    network: number;
    security: number;
  };
  additionalContext?: string;
}

// AI Worker Types
export interface AIWorker {
  id: string;
  name: string;
  category: string;
  deploymentPhase: 'week-1' | 'month-2' | 'month-4' | 'month-6';
  priority: number;
  requiredTools: string[];
  optionalTools: string[];
  relatedWorkflows: string[];
  setupTime: string;
  configComplexity: 'low' | 'medium' | 'high';
  learningPeriod: string;
  metrics: {
    percentOfVolume: number;
    automationRate: number;
    avgResolutionBefore: number;
    avgResolutionAfter: number;
    timeSavingsPerTicket: number;
  };
  description: string;
  howItWorks: string[];
  valueRationale: string;
  beforeAfter: {
    before: string;
    after: string;
  };
}

// Matched Worker (with calculated metrics)
export interface MatchedWorker extends AIWorker {
  estimatedTickets: number;
  timeSaved: number;
  costSaved: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// Tool Types
export interface Tool {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  icon: string;
}

// Scoring Types
export interface ReadinessScore {
  total: number;
  techStackScore: number;
  workflowScore: number;
  operationalScore: number;
  rating: 'high-readiness' | 'moderate-readiness' | 'early-opportunity' | 'manual-heavy';
}

// Impact Projection Types
export interface ImpactProjection {
  phase: string;
  ticketsHandled: number;
  timeSaved: number;
  costSaved: number;
  ftesSaved: number;
}

// Assessment Result Types
export interface AssessmentResult {
  assessmentData: AssessmentData;
  readinessScore: ReadinessScore;
  matchedWorkers: MatchedWorker[];
  projectedImpact: {
    phase1: ImpactProjection;
    phase2: ImpactProjection;
  };
  timestamp: string;
}

// Lead Form Types
export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  itsmPlatform: string;
  monthlyVolume: string;
  interestedInDiscovery: boolean;
  preferredMeetingTime: string;
}

// V2 Report Types
export interface AutomationOpportunity {
  tool: string;
  category: string;
  processName: string;
  description: string;
  supportedActions: string[];
  projectedDeflection: string;
  medianTTRBefore: string;
  medianTTRAfter: string;
  confidence: 'high' | 'medium' | 'low';
  exampleUseCase: string;
  workstream: string;
  skills: string[];
  agents: string[];
}

export interface PilotProjection {
  weeklyDeflection: string;
  fteImpact: string;
  appAccessTTR: string;
  inAppActionsTTR: string;
  approvalDependency: string;
}

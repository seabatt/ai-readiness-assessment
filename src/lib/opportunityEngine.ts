import { AssessmentData } from '@/types';

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

export interface TechStackMapping {
  [key: string]: AutomationOpportunity[];
}

const OPPORTUNITY_DATABASE: TechStackMapping = {
  'Okta': [
    {
      tool: 'Okta',
      category: 'Identity & Access Management',
      processName: 'Automate app access via groups',
      description: 'Autonomous handling of application access requests through group-based provisioning',
      supportedActions: ['Search Apps', 'Grant User Access', 'Add User to Group', 'Reset User Password'],
      projectedDeflection: '16-18%',
      medianTTRBefore: '1.5-1.7 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'App access requests comprise 23% of ticket volume. With centralized IAM, deflection reaches 18% as agents handle group adds autonomously once approval is routed.',
      workstream: 'App Access & Provisioning',
      skills: ['Identity Verification', 'Group Management', 'Access Control'],
      agents: ['Use: App Access Agent', 'Use: Group Provisioning Agent']
    }
  ],
  'Microsoft Entra': [
    {
      tool: 'Microsoft Entra',
      category: 'Identity & Access Management',
      processName: 'Automate app access via groups',
      description: 'Autonomous handling of application access requests through Azure AD group-based provisioning',
      supportedActions: ['Search Apps', 'Grant User Access', 'Add User to Group', 'Reset User Password'],
      projectedDeflection: '16-18%',
      medianTTRBefore: '1.5-1.7 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'App access requests comprise 23% of ticket volume. With centralized IAM, deflection reaches 18% as agents handle group adds autonomously once approval is routed.',
      workstream: 'App Access & Provisioning',
      skills: ['Identity Verification', 'Group Management', 'Access Control'],
      agents: ['Use: App Access Agent', 'Use: Group Provisioning Agent']
    }
  ],
  'JumpCloud': [
    {
      tool: 'JumpCloud',
      category: 'Identity & Access Management',
      processName: 'Automate app access via groups',
      description: 'Autonomous handling of application access requests through group-based provisioning',
      supportedActions: ['Search Apps', 'Grant User Access', 'Add User to Group', 'Reset User Password'],
      projectedDeflection: '16-18%',
      medianTTRBefore: '1.5-1.7 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'App access requests comprise 23% of ticket volume. With centralized IAM, deflection reaches 18% as agents handle group adds autonomously once approval is routed.',
      workstream: 'App Access & Provisioning',
      skills: ['Identity Verification', 'Group Management', 'Access Control'],
      agents: ['Use: App Access Agent', 'Use: Group Provisioning Agent']
    }
  ],
  'Slack': [
    {
      tool: 'Slack',
      category: 'Communication',
      processName: 'Channel lifecycle governance',
      description: 'Autonomous channel creation, user management, and access control with approval routing',
      supportedActions: ['Create Channel', 'Add User to Channel', 'Manage User Groups', 'In-thread Notifications'],
      projectedDeflection: '8-12%',
      medianTTRBefore: '45 minutes - 1 hour',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'Channel requests and user group changes represent 11% of volume. Great for request intake + approvals with instant execution.',
      workstream: 'Collaboration & Communication',
      skills: ['Channel Management', 'User Group Operations', 'Notification Routing'],
      agents: ['Use: Slack Channel Agent', 'Use: User Group Agent']
    }
  ],
  'ServiceNow': [
    {
      tool: 'ServiceNow',
      category: 'ITSM Platform',
      processName: 'Ticket triage & transitions',
      description: 'Intelligent ticket classification, status updates, and comment automation',
      supportedActions: ['List Issues', 'Get Issue Details', 'Transition Issue', 'Add Comment'],
      projectedDeflection: '12-15%',
      medianTTRBefore: '2-3 hours',
      medianTTRAfter: '15-30 minutes (assisted) or real-time (full automation with patterns)',
      confidence: 'medium',
      exampleUseCase: 'Assist + partial automation first, full automation only with clear patterns. Reduces triage time by 75% for common request types.',
      workstream: 'IT Service Management',
      skills: ['Ticket Classification', 'Workflow Orchestration', 'Status Management'],
      agents: ['Use: Triage Agent', 'Use: Workflow Automation Agent']
    }
  ],
  'Jira': [
    {
      tool: 'Jira',
      category: 'ITSM Platform',
      processName: 'Ticket triage & transitions',
      description: 'Intelligent ticket classification, status updates, and comment automation',
      supportedActions: ['List Issues', 'Get Issue Details', 'Transition Issue', 'Add Comment'],
      projectedDeflection: '12-15%',
      medianTTRBefore: '2-3 hours',
      medianTTRAfter: '15-30 minutes (assisted) or real-time (full automation with patterns)',
      confidence: 'medium',
      exampleUseCase: 'Assist + partial automation first, full automation only with clear patterns. Reduces triage time by 75% for common request types.',
      workstream: 'IT Service Management',
      skills: ['Ticket Classification', 'Workflow Orchestration', 'Status Management'],
      agents: ['Use: Triage Agent', 'Use: Workflow Automation Agent']
    }
  ],
  'Jira Service Management': [
    {
      tool: 'Jira Service Management',
      category: 'ITSM Platform',
      processName: 'Ticket triage & transitions',
      description: 'Intelligent ticket classification, status updates, and comment automation',
      supportedActions: ['List Issues', 'Get Issue Details', 'Transition Issue', 'Add Comment'],
      projectedDeflection: '12-15%',
      medianTTRBefore: '2-3 hours',
      medianTTRAfter: '15-30 minutes (assisted) or real-time (full automation with patterns)',
      confidence: 'medium',
      exampleUseCase: 'Assist + partial automation first, full automation only with clear patterns. Reduces triage time by 75% for common request types.',
      workstream: 'IT Service Management',
      skills: ['Ticket Classification', 'Workflow Orchestration', 'Status Management'],
      agents: ['Use: Triage Agent', 'Use: Workflow Automation Agent']
    }
  ],
  'Zoom': [
    {
      tool: 'Zoom',
      category: 'Communication',
      processName: 'License upgrades on-demand',
      description: 'Autonomous license tier changes with approval-based workflows',
      supportedActions: ['Update User License', 'Notify Requester'],
      projectedDeflection: '5-7%',
      medianTTRBefore: '1-2 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'License upgrade requests are simple, repeatable, and approval-gated. Perfect for instant execution post-approval.',
      workstream: 'Software Licensing',
      skills: ['License Management', 'User Account Operations'],
      agents: ['Use: License Management Agent']
    }
  ],
  'Google Workspace': [
    {
      tool: 'Google Workspace',
      category: 'Productivity Suite',
      processName: 'Email group & drive access management',
      description: 'Autonomous DL changes, shared drive access, and calendar resource management',
      supportedActions: ['Add User to Group', 'Grant Drive Access', 'Manage Calendar Resources'],
      projectedDeflection: '10-14%',
      medianTTRBefore: '1-1.5 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'DL changes and shared drive access represent 13% of volume. Simple, rules-based operations with high automation potential.',
      workstream: 'Productivity & Collaboration',
      skills: ['Group Management', 'Access Control', 'Resource Management'],
      agents: ['Use: Workspace Access Agent', 'Use: Group Management Agent']
    }
  ],
  'Microsoft 365': [
    {
      tool: 'Microsoft 365',
      category: 'Productivity Suite',
      processName: 'Email group & drive access management',
      description: 'Autonomous DL changes, SharePoint access, and Teams resource management',
      supportedActions: ['Add User to Group', 'Grant SharePoint Access', 'Manage Teams Resources'],
      projectedDeflection: '10-14%',
      medianTTRBefore: '1-1.5 hours',
      medianTTRAfter: 'Near real-time + approval latency',
      confidence: 'high',
      exampleUseCase: 'DL changes and SharePoint access represent 13% of volume. Simple, rules-based operations with high automation potential.',
      workstream: 'Productivity & Collaboration',
      skills: ['Group Management', 'Access Control', 'Resource Management'],
      agents: ['Use: M365 Access Agent', 'Use: Group Management Agent']
    }
  ]
};

export function generateOpportunities(data: AssessmentData): AutomationOpportunity[] {
  const opportunities: AutomationOpportunity[] = [];
  
  // Map through selected tech stack and find opportunities
  data.techStack.forEach(tool => {
    const toolOpportunities = OPPORTUNITY_DATABASE[tool];
    if (toolOpportunities) {
      opportunities.push(...toolOpportunities);
    }
  });

  // Sort by projected deflection (descending)
  return opportunities.sort((a, b) => {
    const aDeflection = parseInt(a.projectedDeflection.split('-')[1]);
    const bDeflection = parseInt(b.projectedDeflection.split('-')[1]);
    return bDeflection - aDeflection;
  });
}

export function getTop5Opportunities(data: AssessmentData): AutomationOpportunity[] {
  const allOpportunities = generateOpportunities(data);
  return allOpportunities.slice(0, 5);
}

export function calculateTotalDeflection(opportunities: AutomationOpportunity[]): number {
  // Calculate combined deflection (not simple addition due to overlaps)
  // Use conservative estimate: 70% of sum for top 3, then diminishing returns
  if (opportunities.length === 0) return 0;
  
  const deflections = opportunities.slice(0, 5).map(opp => {
    const range = opp.projectedDeflection.split('-');
    return parseInt(range[1]); // Use upper bound
  });
  
  const topThree = deflections.slice(0, 3).reduce((sum, val) => sum + val, 0) * 0.7;
  const remaining = deflections.slice(3).reduce((sum, val) => sum + val, 0) * 0.4;
  
  return Math.round(topThree + remaining);
}

import { AssessmentData, ReadinessScore } from '@/types';

export function calculateReadinessScore(data: AssessmentData): ReadinessScore {
  let techStackScore = 0;
  let workflowScore = 0;
  let operationalScore = 0;

  // Tech Stack Compatibility (40 points)
  const identityTools = ['okta', 'microsoft-entra', 'jumpcloud'];
  const itsmTools = ['servicenow', 'jira', 'freshservice', 'ivanti'];
  const commTools = ['slack', 'microsoft-teams', 'zoom'];
  const productivityTools = ['google-workspace', 'microsoft-365'];
  
  // Identity provider present
  if (data.techStack.some(tool => identityTools.includes(tool))) {
    techStackScore += 15;
  }
  
  // ITSM platform present
  if (data.techStack.some(tool => itsmTools.includes(tool))) {
    techStackScore += 10;
  }
  
  // Communication tool present
  if (data.techStack.some(tool => commTools.includes(tool))) {
    techStackScore += 5;
  }
  
  // Productivity suite present
  if (data.techStack.some(tool => productivityTools.includes(tool))) {
    techStackScore += 5;
  }
  
  // 5+ additional tools
  if (data.techStack.length >= 5) {
    techStackScore += 5;
  }

  // Workflow Automation Potential (35 points)
  const highValueWorkflows = ['application-access', 'permission-changes', 'onboarding-offboarding'];
  
  // Top 3 workflows are automatable
  const topThreeAutomatable = data.topWorkflows.slice(0, 3).filter(workflow =>
    highValueWorkflows.includes(workflow)
  );
  workflowScore += topThreeAutomatable.length * 5; // Up to 15 points
  
  // Ticket volume > 1,500/month
  const volumeValue = parseInt(data.ticketVolume.split('-')[0]);
  if (volumeValue >= 1500) {
    workflowScore += 10;
  } else if (volumeValue >= 500) {
    workflowScore += 5;
  }
  
  // Repetitive tickets > 60%
  if (data.repetitivePercentage === '60-80' || data.repetitivePercentage === '80-100') {
    workflowScore += 10;
  } else if (data.repetitivePercentage === '40-60') {
    workflowScore += 5;
  }

  // Operational Readiness (25 points)
  // Formal approval workflows
  if (data.approvalWorkflows === 'automated') {
    operationalScore += 10;
  } else if (data.approvalWorkflows === 'manual') {
    operationalScore += 5;
  }
  
  // Team size appropriate for volume
  const teamSizeNum = parseInt(data.teamSize.split('-')[0]);
  if (teamSizeNum >= 4 && teamSizeNum <= 25) {
    operationalScore += 5;
  }
  
  // Resolution time > 2 hours (more to gain)
  if (data.avgResolutionTime === '2-8 hours' || 
      data.avgResolutionTime === '1-3 days' || 
      data.avgResolutionTime === '3+ days') {
    operationalScore += 10;
  }

  const total = techStackScore + workflowScore + operationalScore;

  let rating: ReadinessScore['rating'];
  if (total >= 80) rating = 'high-readiness';
  else if (total >= 60) rating = 'moderate-readiness';
  else if (total >= 40) rating = 'early-opportunity';
  else rating = 'manual-heavy';

  return {
    total,
    techStackScore,
    workflowScore,
    operationalScore,
    rating,
  };
}

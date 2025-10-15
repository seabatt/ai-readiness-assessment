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
  
  // High-value categories in ticket distribution (Applications, Security, Onboarding)
  let highValuePercentage = 0;
  if (data.ticketDistribution) {
    highValuePercentage += (data.ticketDistribution.applications || 0);
    highValuePercentage += (data.ticketDistribution.security || 0);
    highValuePercentage += (data.ticketDistribution.onboarding || 0);
  }
  
  // Score based on high-value category concentration
  if (highValuePercentage >= 60) {
    workflowScore += 15;
  } else if (highValuePercentage >= 40) {
    workflowScore += 10;
  } else if (highValuePercentage >= 20) {
    workflowScore += 5;
  }
  
  // Ticket volume scoring
  const monthlyTickets = data.monthlyTickets || 0;
  if (monthlyTickets >= 1500) {
    workflowScore += 10;
  } else if (monthlyTickets >= 500) {
    workflowScore += 5;
  }
  
  // Additional context provided (shows engagement/complexity)
  if (data.additionalContext && data.additionalContext.length > 50) {
    workflowScore += 10;
  } else if (data.additionalContext && data.additionalContext.length > 0) {
    workflowScore += 5;
  }

  // Operational Readiness (25 points)
  
  // Team size appropriate for volume
  const teamSizeNum = parseInt(data.teamSize.split('-')[0]);
  if (teamSizeNum >= 4 && teamSizeNum <= 25) {
    operationalScore += 10;
  } else if (teamSizeNum >= 1 && teamSizeNum <= 10) {
    operationalScore += 5;
  }
  
  // Resolution time > 2 hours (more to gain from automation)
  if (data.avgResolutionTime === '2-8 hours' || 
      data.avgResolutionTime === '1-3 days' || 
      data.avgResolutionTime === '3+ days') {
    operationalScore += 15;
  } else if (data.avgResolutionTime === '30min-2hrs') {
    operationalScore += 5;
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

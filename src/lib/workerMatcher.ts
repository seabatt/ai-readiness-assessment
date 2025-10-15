import { AssessmentData, AIWorker, MatchedWorker } from '@/types';
import aiWorkersData from '@/data/aiWorkers.json';

export function matchAIWorkers(data: AssessmentData): MatchedWorker[] {
  const allWorkers = aiWorkersData.aiWorkers as AIWorker[];
  const matched: MatchedWorker[] = [];

  // Get monthly tickets from simplified assessment
  const monthlyTickets = data.monthlyTickets || 1000;

  // Derive top workflows from ticket distribution (categories with highest percentages)
  const derivedTopWorkflows: string[] = [];
  if (data.ticketDistribution) {
    const sortedCategories = Object.entries(data.ticketDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
    
    // Map categories to workflow names (simplified mapping)
    const categoryToWorkflow: Record<string, string> = {
      'applications': 'application-access',
      'security': 'permission-changes',
      'onboarding': 'onboarding-offboarding',
      'hardware': 'hardware-provisioning',
      'network': 'network-access',
      'distributionLists': 'distribution-list-management',
    };
    
    sortedCategories.forEach(category => {
      const workflow = categoryToWorkflow[category];
      if (workflow) derivedTopWorkflows.push(workflow);
    });
  }

  // For each worker, check if user's stack supports it
  allWorkers.forEach(worker => {
    // Check if user has all required tools
    const hasRequiredTools = worker.requiredTools.every(tool =>
      data.techStack.includes(tool)
    );

    if (!hasRequiredTools) return;

    // Check if worker's workflows match user's top workflows
    const workflowMatch = worker.relatedWorkflows.some(workflow =>
      derivedTopWorkflows.includes(workflow)
    );

    // Calculate estimated impact
    const estimatedTickets = Math.round(monthlyTickets * worker.metrics.percentOfVolume * worker.metrics.automationRate);
    const timeSaved = Math.round(estimatedTickets * worker.metrics.timeSavingsPerTicket);
    const costSaved = Math.round(timeSaved * 12.5); // $150/hr blended rate

    // Create matched worker
    const matchedWorker: MatchedWorker = {
      ...worker,
      estimatedTickets,
      timeSaved,
      costSaved,
    };

    // Prioritize workers that match workflows
    if (workflowMatch) {
      matched.unshift(matchedWorker); // Add to beginning
    } else {
      matched.push(matchedWorker); // Add to end
    }
  });

  // Sort by priority and deployment phase
  matched.sort((a, b) => {
    const phaseOrder = { 'week-1': 1, 'month-2': 2, 'month-4': 3, 'month-6': 4 };
    if (phaseOrder[a.deploymentPhase] !== phaseOrder[b.deploymentPhase]) {
      return phaseOrder[a.deploymentPhase] - phaseOrder[b.deploymentPhase];
    }
    return a.priority - b.priority;
  });

  return matched;
}

export function calculateProjectedImpact(matchedWorkers: MatchedWorker[]) {
  // Phase 1: Week 1-4 workers
  const phase1Workers = matchedWorkers.filter(w => w.deploymentPhase === 'week-1');
  const phase1Tickets = phase1Workers.reduce((sum, w) => sum + w.estimatedTickets, 0);
  const phase1Time = phase1Workers.reduce((sum, w) => sum + w.timeSaved, 0);
  const phase1Cost = phase1Workers.reduce((sum, w) => sum + w.costSaved, 0);
  const phase1FTEs = Math.round((phase1Time / 160) * 10) / 10; // 160 hrs/month per FTE

  // Phase 2: All workers through month 6
  const phase2Workers = matchedWorkers.filter(w => 
    ['week-1', 'month-2', 'month-4'].includes(w.deploymentPhase)
  );
  const phase2Tickets = phase2Workers.reduce((sum, w) => sum + w.estimatedTickets, 0);
  const phase2Time = phase2Workers.reduce((sum, w) => sum + w.timeSaved, 0);
  const phase2Cost = phase2Workers.reduce((sum, w) => sum + w.costSaved, 0);
  const phase2FTEs = Math.round((phase2Time / 160) * 10) / 10;

  // Add 15% for learning improvement by Month 6
  const phase2TicketsWithLearning = Math.round(phase2Tickets * 1.15);
  const phase2TimeWithLearning = Math.round(phase2Time * 1.15);
  const phase2CostWithLearning = Math.round(phase2Cost * 1.15);
  const phase2FTEsWithLearning = Math.round((phase2TimeWithLearning / 160) * 10) / 10;

  return {
    phase1: {
      phase: 'Phase 1 (Weeks 1-4)',
      ticketsHandled: phase1Tickets,
      timeSaved: phase1Time,
      costSaved: phase1Cost,
      ftesSaved: phase1FTEs,
    },
    phase2: {
      phase: 'Phase 2 (Months 2-6)',
      ticketsHandled: phase2TicketsWithLearning,
      timeSaved: phase2TimeWithLearning,
      costSaved: phase2CostWithLearning,
      ftesSaved: phase2FTEsWithLearning,
    },
  };
}

'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import ConnectedAppLogos from '@/components/ui/ConnectedAppLogos';
import { MatchedUseCase } from '@/types/types-v3';
import { FeasibilityResult } from '@/lib/engines/feasibility-engine';
import useCaseMappings from '@/data/use-case-mappings.json';

interface OpportunityAnalysisProps {
  matchedUseCases: MatchedUseCase[];
  feasibilityResults: FeasibilityResult[];
  topN?: number;
}

export default function OpportunityAnalysis({ 
  matchedUseCases,
  feasibilityResults,
  topN = 10
}: OpportunityAnalysisProps) {
  const [expandedWorkflows, setExpandedWorkflows] = useState<Record<string, boolean>>({});

  // Convert tool names from underscore format to proper names
  const convertToolName = (tool: string): string => {
    const toolMap: Record<string, string> = {
      'okta': 'Okta',
      'servicenow': 'ServiceNow',
      'slack': 'Slack',
      'jira': 'Jira',
      'jira_service_management': 'Jira Service Management',
      'zendesk': 'Zendesk',
      'microsoft_365': 'Microsoft 365',
      'microsoft_entra': 'Microsoft Entra',
      'microsoft_teams': 'Microsoft Teams',
      'google_workspace': 'Google Workspace',
      'google_drive': 'Google Drive',
      'google_docs': 'Google Docs',
      'google_sheets': 'Google Sheets',
      'google_calendar': 'Google Calendar',
      'gmail': 'Gmail',
      'azure_ad': 'Azure AD',
      'salesforce': 'Salesforce',
      'github': 'GitHub',
      'gitlab': 'GitLab',
      'confluence': 'Confluence',
      'asana': 'Asana',
      'monday_com': 'Monday.com',
      'zoom': 'Zoom',
      'teams': 'Teams',
      'workday': 'Workday',
      'bamboohr': 'BambooHR',
      'duo_security': 'Duo Security',
      'cyberark': 'CyberArk',
      'jumpcloud': 'JumpCloud',
      'freshservice': 'Freshservice',
      'ivanti': 'Ivanti',
      'sap_successfactors': 'SAP SuccessFactors',
      'hibob': 'HiBob',
      'docusign': 'DocuSign',
      'linear': 'Linear',
      'sharepoint': 'SharePoint'
    };
    
    return toolMap[tool.toLowerCase()] || tool.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Get category color based on category name
  const getCategoryColor = (category: string): string => {
    const categoryColors: Record<string, string> = {
      'Identity Access & Compliance': 'bg-accent-green/20 text-accent-green',
      'CRM Integration': 'bg-accent-blue/20 text-accent-blue',
      'Knowledge Management': 'bg-purple-500/20 text-purple-400',
      'IT Service Management': 'bg-accent-orange/20 text-accent-orange',
      'HR & Onboarding': 'bg-pink-500/20 text-pink-400',
      'Procurement': 'bg-yellow-500/20 text-yellow-400',
      'Project Management': 'bg-indigo-500/20 text-indigo-400',
      'Communication & Collaboration': 'bg-teal-500/20 text-teal-400'
    };
    
    return categoryColors[category] || 'bg-accent-green/20 text-accent-green';
  };
  
  // Get all enabled use case IDs
  const enabledUseCaseIds = new Set(
    (feasibilityResults || []).flatMap(result => result.enabled_use_cases)
  );

  // Build comprehensive list: matched use cases PLUS enabled use cases without volume matches
  const allOpportunities: MatchedUseCase[] = [];
  
  // First, add all matched use cases (these have impact data)
  allOpportunities.push(...matchedUseCases);
  
  // Then, add enabled use cases that weren't matched (no volume data, but still possible)
  const matchedIds = new Set(matchedUseCases.map(uc => uc.use_case_id));
  
  (useCaseMappings as any).use_cases.forEach((uc: any) => {
    if (enabledUseCaseIds.has(uc.id) && !matchedIds.has(uc.id)) {
      // Create a pseudo-matched use case with estimated impact based on typical values
      const estimatedVolume = Math.round((uc.typical_volume_pct || 0.05) * 1000); // Assume 1000 tickets baseline
      const estimatedHours = estimatedVolume * (uc.typical_ttr_hours || 1) * (uc.automation_rate || 0.8);
      
      allOpportunities.push({
        use_case_id: uc.id,
        name: uc.name,
        category: uc.category,
        description: uc.description,
        value_proposition: uc.value_proposition,
        fit_score: 45, // Base score for enabled but unmatched
        estimated_monthly_deflection: estimatedVolume,
        estimated_hours_saved: estimatedHours,
        confidence: uc.confidence * 0.7, // Lower confidence since no volume match
        implementation_effort: uc.implementation_effort,
        time_to_value_days: uc.time_to_value_days,
        prerequisites: uc.prerequisites,
        workflow_steps: uc.workflow_steps,
        priority: uc.time_to_value_days <= 7 ? 'immediate' : 
                  uc.time_to_value_days <= 21 ? 'quick_win' : 'future',
        required_tools: uc.required_tools
      });
    }
  });

  // Sort by fit score and limit to topN
  const topUseCases = allOpportunities
    .sort((a, b) => b.fit_score - a.fit_score)
    .slice(0, topN);

  if (topUseCases.length === 0) {
    return null;
  }

  const getFitScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent-green';
    if (score >= 60) return 'text-accent-blue';
    if (score >= 40) return 'text-accent-orange';
    return 'text-text-tertiary';
  };

  const getFitScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Fit';
    if (score >= 60) return 'Good Fit';
    if (score >= 40) return 'Moderate Fit';
    return 'Basic Fit';
  };

  const getPriorityStatus = (priority: string): 'success' | 'active' | 'warning' => {
    if (priority === 'immediate') return 'success';
    if (priority === 'quick_win') return 'active';
    return 'warning';
  };

  const getPriorityLabel = (priority: string) => {
    if (priority === 'immediate') return 'Deploy Week 1';
    if (priority === 'quick_win') return 'Deploy Month 1-2';
    return 'Deploy Month 3+';
  };

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Call to Action Section */}
      <section className="mb-12 bg-bg-card-alt/10 border border-bg-card-alt/20 rounded-card p-8 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Validate Your Blueprint with Real Data</h2>
        <p className="text-lg text-text-secondary mb-6 leading-relaxed">
          Your personalized AI Blueprint shows where automation can create value. The next step is to validate those opportunities with your live ticket data — so you know exactly what results to expect before deploying.
        </p>
        <a 
          href="https://www.ai.work/book-a-demo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-highlight"></span>
          <span className="flex-1 text-center">Run My Data Science Assessment</span>
          <span>&gt;</span>
        </a>
        <p className="text-sm text-text-tertiary mt-4">7-day validation using your real environment data</p>
      </section>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          How to Identify Valuable Use Cases
        </h2>
        <p className="text-text-secondary">
          Not all IT tasks are good candidates for AI automation. Here's what works best—and what doesn't.
        </p>
      </div>

      {/* Good vs Poor Candidates Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Good Candidates Card */}
        <Card className="border-l-4 border-accent-green">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-text-primary">Good Candidates</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">High volume, repetitive tasks</div>
                <div className="text-sm text-text-tertiary">Tasks performed frequently with consistent patterns</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Clear rules and policies</div>
                <div className="text-sm text-text-tertiary">Well-documented procedures with defined criteria</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Structured data sources</div>
                <div className="text-sm text-text-tertiary">Information available through APIs and databases</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Multi-system workflows</div>
                <div className="text-sm text-text-tertiary">Tasks requiring coordination across tools</div>
              </div>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-bg-card-alt/20">
            <div className="text-sm font-semibold text-text-primary mb-2">Examples:</div>
            <div className="text-sm text-text-secondary">Password resets, app provisioning, user onboarding, access requests</div>
          </div>
        </Card>

        {/* Poor Candidates Card */}
        <Card className="border-l-4 border-accent-orange">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-text-primary">Poor Candidates</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Highly contextual decisions</div>
                <div className="text-sm text-text-tertiary">Requires deep understanding of unique situations</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Unstructured or missing data</div>
                <div className="text-sm text-text-tertiary">Information trapped in emails, chats, or conversations</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Frequent exceptions</div>
                <div className="text-sm text-text-tertiary">Each request requires special handling or judgment</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold text-text-primary">Requires physical presence</div>
                <div className="text-sm text-text-tertiary">Hands-on work with hardware or on-site equipment</div>
              </div>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-bg-card-alt/20">
            <div className="text-sm font-semibold text-text-primary mb-2">Examples:</div>
            <div className="text-sm text-text-secondary">Hardware repairs, vague user requests, complex troubleshooting</div>
          </div>
        </Card>
      </div>

      {/* Introduction to Use Cases */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          What You Can Automate Right Now
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          Based on your stack, here are <span className="font-semibold text-text-primary">examples of use cases where AI Workers can deliver immediate value</span>. We've identified the <span className="font-semibold text-text-primary">easiest wins first</span>—high-confidence automations that can be deployed quickly using your existing tools and APIs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {topUseCases.map((useCase, index) => (
          <Card key={useCase.use_case_id} hover>
            {/* Rank Number */}
            <div className="text-sm font-medium mb-1" style={{ color: '#8a8784' }}>
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Header with Priority */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {useCase.name}
                </h3>
              </div>
              
              {/* Category Badge */}
              <div className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getCategoryColor(useCase.category)}`}>
                {useCase.category}
              </div>
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-6 leading-relaxed">
              {useCase.value_proposition}
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-primary rounded-lg mb-6">
              <div>
                <div className="text-2xl font-bold text-accent-green">
                  {useCase.estimated_monthly_deflection.toLocaleString()}
                </div>
                <div className="text-xs text-text-tertiary">Tickets/Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-blue">
                  {Math.round(useCase.estimated_hours_saved).toLocaleString()} hrs
                </div>
                <div className="text-xs text-text-tertiary">Time Saved/Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">
                  {useCase.time_to_value_days} days
                </div>
                <div className="text-xs text-text-tertiary">Time to Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-orange">
                  {Math.round(useCase.confidence * 100)}%
                </div>
                <div className="text-xs text-text-tertiary">Confidence</div>
              </div>
            </div>

            {/* How It Works - Collapsible */}
            <div className="mb-4">
              <button
                onClick={() => setExpandedWorkflows(prev => ({
                  ...prev,
                  [useCase.use_case_id]: !prev[useCase.use_case_id]
                }))}
                className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-2 hover:text-highlight transition-colors duration-200 w-full text-left"
              >
                <span>How it works:</span>
                {/* Tool Logos */}
                {useCase.required_tools && useCase.required_tools.length > 0 && (
                  <ConnectedAppLogos 
                    apps={useCase.required_tools.map(convertToolName)}
                    maxVisible={5}
                    size={32}
                  />
                )}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ml-auto ${expandedWorkflows[useCase.use_case_id] ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedWorkflows[useCase.use_case_id] && (
                <ul className="space-y-1 mt-4">
                  {useCase.workflow_steps.map((step, i) => (
                    <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-accent-green mt-0.5 flex-shrink-0">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}

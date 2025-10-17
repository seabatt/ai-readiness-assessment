'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import StatusPill from '@/components/ui/StatusPill';
import ConnectedAppLogos from '@/components/ui/ConnectedAppLogos';
import { MatchedUseCase } from '@/types/types-v3';

interface UseCaseCardsProps {
  useCases: MatchedUseCase[];
  showRank?: boolean;
}

export default function UseCaseCards({ useCases, showRank = true }: UseCaseCardsProps) {
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
    <div className="space-y-6">
      {useCases.map((useCase, index) => (
        <Card key={useCase.use_case_id} hover>
          {/* Rank Number */}
          {showRank && (
            <div className="text-sm font-medium mb-3" style={{ color: '#8a8784' }}>
              {String(index + 1).padStart(2, '0')}
            </div>
          )}

          {/* Header with Priority */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-1">
                {useCase.name}
              </h3>
              <span className="text-sm text-text-tertiary">
                {useCase.category}
              </span>
            </div>
            
            {/* Badge, Tool Logos and Fit Score */}
            <div className="flex items-center gap-4">
              {/* Deploy Badge */}
              <StatusPill status={getPriorityStatus(useCase.priority)}>
                {getPriorityLabel(useCase.priority)}
              </StatusPill>
              
              {/* Tool Logos */}
              {useCase.required_tools && useCase.required_tools.length > 0 && (
                <ConnectedAppLogos 
                  apps={useCase.required_tools.map(convertToolName)}
                  maxVisible={5}
                  size={24}
                />
              )}
              
              {/* Fit Score */}
              <div className="text-right">
                <div className={`text-3xl font-bold ${getFitScoreColor(useCase.fit_score)}`}>
                  {useCase.fit_score}
                </div>
                <div className="text-xs text-text-tertiary">
                  {getFitScoreLabel(useCase.fit_score)}
                </div>
              </div>
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
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expandedWorkflows[useCase.use_case_id] ? 'rotate-180' : ''}`}
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
  );
}

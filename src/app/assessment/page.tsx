'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Select from '@/components/ui/Select';
import { AssessmentData } from '@/types';
import toolsData from '@/data/tools.json';
import {
  TICKET_VOLUME_OPTIONS,
  TEAM_SIZE_OPTIONS,
  RESOLUTION_TIME_OPTIONS,
  EMPLOYEE_COUNT_OPTIONS,
  APPROVAL_WORKFLOW_OPTIONS,
  REPETITIVE_PERCENTAGE_OPTIONS,
  PAIN_POINT_OPTIONS,
} from '@/lib/constants';

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<AssessmentData>>({
    techStack: [],
    topWorkflows: [],
  });

  const workflows = [
    { id: 'application-access', name: 'Application access requests (new user onboarding, app provisioning)' },
    { id: 'password-resets', name: 'Password resets and account lockouts' },
    { id: 'permission-changes', name: 'Permission/group changes (adding to Slack channels, Google groups, etc.)' },
    { id: 'software-troubleshooting', name: 'Software troubleshooting (Okta errors, app login issues)' },
    { id: 'hardware-requests', name: 'Hardware requests and replacements' },
    { id: 'license-management', name: 'License management (assigning, upgrading, removing)' },
    { id: 'distribution-lists', name: 'Distribution list/email group updates' },
    { id: 'onboarding-offboarding', name: 'Onboarding/offboarding tasks' },
    { id: 'ticket-routing', name: 'Ticket routing and triage' },
    { id: 'reporting', name: 'Creating reports for leadership' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Show loading screen
      setStep(5);
      // Save to sessionStorage and redirect to report after brief delay
      setTimeout(() => {
        sessionStorage.setItem('assessmentData', JSON.stringify(data));
        router.push('/report/new');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleTool = (toolId: string) => {
    const current = data.techStack || [];
    if (current.includes(toolId)) {
      setData({ ...data, techStack: current.filter(id => id !== toolId) });
    } else {
      setData({ ...data, techStack: [...current, toolId] });
    }
  };

  const toggleWorkflow = (workflowId: string) => {
    const current = data.topWorkflows || [];
    if (current.includes(workflowId)) {
      setData({ ...data, topWorkflows: current.filter(id => id !== workflowId) });
    } else if (current.length < 5) {
      setData({ ...data, topWorkflows: [...current, workflowId] });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return (data.techStack?.length || 0) >= 1;
      case 2:
        return (data.topWorkflows?.length || 0) === 5;
      case 3:
        return data.ticketVolume && data.teamSize && data.avgResolutionTime && data.employeeCount;
      case 4:
        return data.approvalWorkflows && data.repetitivePercentage && data.primaryPainPoint;
      default:
        return true;
    }
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <ProgressBar current={step} total={5} />

        {/* Step 1: Tech Stack */}
        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-4">What's Your Current IT Stack?</h2>
            <p className="text-text-secondary mb-8">
              Select all the tools your team uses. We'll show you exactly which pre-built AI Workers are ready for your environment.
            </p>

            <div className="space-y-6 mb-8">
              {['identity', 'itsm', 'communication', 'productivity', 'business', 'development'].map(category => {
                const categoryTools = toolsData.tools.filter(t => t.category === category);
                if (categoryTools.length === 0) return null;

                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {categoryTools.map(tool => (
                        <Checkbox
                          key={tool.id}
                          label={tool.name}
                          checked={data.techStack?.includes(tool.id) || false}
                          onChange={() => toggleTool(tool.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Workflows */}
        {step === 2 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-4">What Eats Up Most of Your Team's Time?</h2>
            <p className="text-text-secondary mb-8">
              Select your top 5 most time-consuming activities ({data.topWorkflows?.length || 0}/5 selected)
            </p>

            <div className="space-y-3 mb-8">
              {workflows.map(workflow => (
                <div
                  key={workflow.id}
                  onClick={() => toggleWorkflow(workflow.id)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${data.topWorkflows?.includes(workflow.id)
                      ? 'border-accent-blue bg-accent-blue/5'
                      : 'border-brand-secondary/10 hover:border-brand-secondary/30'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">{workflow.name}</span>
                    {data.topWorkflows?.includes(workflow.id) && (
                      <span className="text-accent-blue font-semibold">
                        #{data.topWorkflows.indexOf(workflow.id) + 1}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Scale */}
        {step === 3 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-4">Help Us Understand Your Scale</h2>
            <div className="space-y-6 mb-8">
              <Select
                label="Monthly IT ticket volume"
                options={TICKET_VOLUME_OPTIONS}
                value={data.ticketVolume || ''}
                onChange={(e) => setData({ ...data, ticketVolume: e.target.value })}
                required
              />
              <Select
                label="IT team size"
                options={TEAM_SIZE_OPTIONS}
                value={data.teamSize || ''}
                onChange={(e) => setData({ ...data, teamSize: e.target.value })}
                required
              />
              <Select
                label="Average time to resolve a typical access request"
                options={RESOLUTION_TIME_OPTIONS}
                value={data.avgResolutionTime || ''}
                onChange={(e) => setData({ ...data, avgResolutionTime: e.target.value })}
                required
              />
              <Select
                label="Employee count"
                options={EMPLOYEE_COUNT_OPTIONS}
                value={data.employeeCount || ''}
                onChange={(e) => setData({ ...data, employeeCount: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {/* Step 4: Current State */}
        {step === 4 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-4">Last Few Questions About Your Current Setup</h2>
            <div className="space-y-6 mb-8">
              <Select
                label="Do you have formal approval workflows for access requests?"
                options={APPROVAL_WORKFLOW_OPTIONS}
                value={data.approvalWorkflows || ''}
                onChange={(e) => setData({ ...data, approvalWorkflows: e.target.value })}
                required
              />
              <Select
                label="What percentage of tickets are repetitive/routine?"
                options={REPETITIVE_PERCENTAGE_OPTIONS}
                value={data.repetitivePercentage || ''}
                onChange={(e) => setData({ ...data, repetitivePercentage: e.target.value })}
                required
              />
              <Select
                label="Primary pain point with current ITSM"
                options={PAIN_POINT_OPTIONS}
                value={data.primaryPainPoint || ''}
                onChange={(e) => setData({ ...data, primaryPainPoint: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {/* Step 5: Loading */}
        {step === 5 && (
          <div className="animate-in fade-in duration-500 text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-accent-blue border-t-transparent mb-8" />
            <h2 className="text-2xl font-bold mb-4">Analyzing your tech stack...</h2>
            <p className="text-text-secondary">Generating your readiness score...</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 1 && step < 5 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 5 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="ml-auto"
            >
              {step === 4 ? 'Generate Report' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

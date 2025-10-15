'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import TechStackSelector from '@/components/assessment/TechStackSelector';
import WorkflowRanker from '@/components/assessment/WorkflowRanker';
import ScaleQuestions from '@/components/assessment/ScaleQuestions';
import CurrentStateQuestions from '@/components/assessment/CurrentStateQuestions';
import LoadingScreen from '@/components/assessment/LoadingScreen';
import { AssessmentData } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<AssessmentData>>({
    // Pre-filled for quick testing
    techStack: ['Okta', 'ServiceNow', 'Slack', 'Jira'],
    topWorkflows: ['Password Reset', 'Access Provisioning', 'Incident Triage', 'Software Installation', 'VPN Access'],
    ticketVolume: '500-1000',
    teamSize: '11-25',
    avgResolutionTime: '4-8 hours',
    employeeCount: '500-1000',
    approvalWorkflows: 'sometimes',
    repetitivePercentage: '50-75%',
    primaryPainPoint: 'ticket-volume',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Show loading screen
      setStep(5);
      // Save to sessionStorage and redirect to V3 report after brief delay
      setTimeout(() => {
        sessionStorage.setItem('assessmentData', JSON.stringify(data));
        router.push('/report/v3/new');
      }, 3000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFieldChange = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return (data.techStack?.length ?? 0) > 0;
      case 2:
        return (data.topWorkflows?.length ?? 0) === 5;
      case 3:
        return !!(data.ticketVolume && data.teamSize && data.avgResolutionTime && data.employeeCount);
      case 4:
        return !!(data.approvalWorkflows && data.repetitivePercentage && data.primaryPainPoint);
      default:
        return false;
    }
  };

  const totalSteps = 4;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Progress Bar */}
      {step <= 4 && (
        <div className="border-b border-bg-card-alt/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <ProgressBar current={step} total={totalSteps} />
            <p className="text-xs text-text-tertiary text-center mt-2">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {step === 1 && (
          <TechStackSelector
            selectedTools={data.techStack || []}
            onToolsChange={(tools) => setData({ ...data, techStack: tools })}
          />
        )}

        {step === 2 && (
          <WorkflowRanker
            selectedWorkflows={data.topWorkflows || []}
            onWorkflowsChange={(workflows) => setData({ ...data, topWorkflows: workflows })}
          />
        )}

        {step === 3 && (
          <ScaleQuestions
            ticketVolume={data.ticketVolume || ''}
            teamSize={data.teamSize || ''}
            avgResolutionTime={data.avgResolutionTime || ''}
            employeeCount={data.employeeCount || ''}
            onChange={handleFieldChange}
          />
        )}

        {step === 4 && (
          <CurrentStateQuestions
            approvalWorkflows={data.approvalWorkflows || ''}
            repetitivePercentage={data.repetitivePercentage || ''}
            primaryPainPoint={data.primaryPainPoint || ''}
            onChange={handleFieldChange}
          />
        )}

        {step === 5 && <LoadingScreen />}
      </div>

      {/* Navigation */}
      {step <= 4 && (
        <div className="bg-bg-primary border-t border-bg-card-alt/20">
          <div className={`mx-auto px-6 py-6 ${step <= 2 ? 'max-w-4xl' : 'max-w-2xl'}`}>
            <div className="flex justify-between items-center">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={!isStepComplete()}
              >
                {step === 4 ? 'Generate Report' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

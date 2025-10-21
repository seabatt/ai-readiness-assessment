'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import TechStackSelector from '@/components/assessment/TechStackSelector';
import VolumeServiceProfile from '@/components/assessment/VolumeServiceProfile';
import AdditionalContext from '@/components/assessment/AdditionalContext';
import LoadingScreen from '@/components/assessment/LoadingScreen';
import { AssessmentData } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<AssessmentData>>({
    techStack: [],
    monthlyTickets: 1000,
    ticketDistribution: {
      applications: 24,
      hardware: 18,
      onboarding: 10,
      distributionLists: 12,
      network: 11,
      security: 25,
    },
    additionalContext: '',
  });

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // Show loading screen
      setStep(4);
      
      // Save to sessionStorage as fallback
      sessionStorage.setItem('assessmentData', JSON.stringify(data));
      
      // Save to database and redirect with ID
      try {
        const response = await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            techStack: data.techStack,
            monthlyTickets: data.monthlyTickets,
            ticketDistribution: data.ticketDistribution,
            additionalContext: data.additionalContext,
            reportData: data,
          }),
        });
        
        const result = await response.json();
        
        if (result.success && result.id) {
          // Redirect to report with database ID
          setTimeout(() => {
            router.push(`/report/v5/${result.id}`);
          }, 3000);
        } else {
          // Fallback to /new route if database save failed
          setTimeout(() => {
            router.push('/report/v5/new');
          }, 3000);
        }
      } catch (error) {
        console.error('Error saving assessment:', error);
        // Fallback to /new route on error
        setTimeout(() => {
          router.push('/report/v5/new');
        }, 3000);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFieldChange = (field: string, value: any) => {
    setData({ ...data, [field]: value });
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return (data.techStack?.length ?? 0) > 0;
      case 2:
        // Check if monthlyTickets is set and distribution equals 100%
        if (!data.monthlyTickets || data.monthlyTickets <= 0) return false;
        if (!data.ticketDistribution) return false;
        const total = Object.values(data.ticketDistribution).reduce((sum, val) => sum + val, 0);
        return total === 100;
      case 3:
        // Additional context is optional, so always valid
        return true;
      default:
        return false;
    }
  };

  const totalSteps = 3;

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-bg-card-alt/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <Image 
              src="/images/aiwork-logo.png" 
              alt="ai.work" 
              width={120} 
              height={30}
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      {step <= 3 && (
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
          <VolumeServiceProfile
            monthlyTickets={data.monthlyTickets || 1000}
            ticketDistribution={data.ticketDistribution || {
              applications: 24,
              hardware: 18,
              onboarding: 10,
              distributionLists: 12,
              network: 11,
              security: 25,
            }}
            onChange={handleFieldChange}
          />
        )}

        {step === 3 && (
          <AdditionalContext
            additionalContext={data.additionalContext || ''}
            onChange={handleFieldChange}
          />
        )}

        {step === 4 && <LoadingScreen />}
      </div>

      {/* Navigation */}
      {step <= 3 && (
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
                {step === 3 ? 'Generate Report' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

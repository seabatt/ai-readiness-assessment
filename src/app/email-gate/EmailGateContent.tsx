'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function EmailGateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [opportunityCount, setOpportunityCount] = useState(0);

  useEffect(() => {
    // Check if there's an assessment ID in URL params
    const id = searchParams.get('id');
    
    if (id) {
      // Load assessment from database
      setAssessmentId(id);
      fetch(`/api/assessments/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setHasAssessment(true);
            setAssessmentData(data.data);
            // Calculate opportunity count from matched use cases
            const count = data.data.reportData?.matchedUseCases?.length || 0;
            setOpportunityCount(count);
          } else {
            // Fallback to sessionStorage
            const storedData = sessionStorage.getItem('assessmentData');
            if (storedData) {
              setHasAssessment(true);
              setAssessmentData(JSON.parse(storedData));
            } else {
              router.push('/');
            }
          }
        })
        .catch(() => {
          // Fallback to sessionStorage on error
          const storedData = sessionStorage.getItem('assessmentData');
          if (storedData) {
            setHasAssessment(true);
            setAssessmentData(JSON.parse(storedData));
          } else {
            router.push('/');
          }
        });
    } else {
      // Check sessionStorage as fallback
      const data = sessionStorage.getItem('assessmentData');
      if (data) {
        const parsedData = JSON.parse(data);
        setHasAssessment(true);
        setAssessmentData(parsedData);
        // Calculate opportunity count from matched use cases
        const count = parsedData.matchedUseCases?.length || 0;
        setOpportunityCount(count);
      } else {
        router.push('/');
      }
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted, email:', email);
    console.log('Assessment ID:', assessmentId);
    console.log('Assessment Data:', assessmentData);
    
    if (!email) {
      console.log('No email provided');
      return;
    }

    setIsSubmitting(true);

    try {
      if (assessmentId) {
        // Update existing assessment with email
        console.log('Updating assessment with ID:', assessmentId);
        const response = await fetch(`/api/assessments/${assessmentId}/update-email`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (!response.ok) {
          throw new Error(`Failed to submit email: ${response.status} - ${JSON.stringify(responseData)}`);
        }

        // Clear sessionStorage
        sessionStorage.removeItem('assessmentData');

        // Redirect to full report
        console.log('Redirecting to:', `/report/v5/${assessmentId}`);
        router.push(`/report/v5/${assessmentId}`);
      } else if (assessmentData) {
        // Fallback: create new assessment with email
        console.log('Creating new assessment with email');
        const response = await fetch('/api/assessments/submit-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            ...assessmentData,
          }),
        });

        console.log('Response status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);

        if (!response.ok) {
          throw new Error(`Failed to submit email: ${response.status} - ${JSON.stringify(responseData)}`);
        }

        const { id } = responseData;

        // Clear sessionStorage
        sessionStorage.removeItem('assessmentData');

        // Redirect to full report
        console.log('Redirecting to:', `/report/v5/${id}`);
        router.push(`/report/v5/${id}`);
      } else {
        console.log('No assessment ID or data available');
        throw new Error('No assessment data available');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert(`Failed to submit email. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  if (!hasAssessment) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Report Preview Header - Clear */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary">
            AI Worker Readiness Assessment
          </h1>
          <p className="text-xl text-text-secondary">
            Analysis complete for {assessmentData?.techStack?.length || 0} connected tools and{' '}
            {(assessmentData?.monthlyTickets || 0).toLocaleString()} monthly tickets
          </p>
        </div>

        {/* Email Gate Form */}
        <div className="bg-bg-card border border-border rounded-xl p-8 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            We've identified {opportunityCount} {opportunityCount === 1 ? 'way' : 'ways'} you can employ an AI Worker to deflect tickets immediately
          </h2>
          <p className="text-text-secondary mb-6 text-center">
            Enter your work email to unlock the complete list with personalized recommendations and ROI calculations.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email*"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-highlight transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="w-2 h-2 rounded-full bg-highlight"></span>
              {isSubmitting ? 'Unlocking...' : 'Unlock Full Assessment'}
              <span>→</span>
            </button>
          </form>

          <p className="text-xs text-text-tertiary mt-4 text-center">
            No sensitive data stored or shared. Responses anonymized for benchmarking.
          </p>
        </div>

        {/* Blurred Report Preview */}
        <div className="relative">
          {/* Blur Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary z-10 backdrop-blur-md"></div>
          
          {/* Preview Content */}
          <div className="opacity-50 pointer-events-none">
            <div className="bg-bg-card border border-border rounded-xl p-8 mb-6">
              <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
              <div className="space-y-4">
                <div className="h-24 bg-bg-secondary rounded-lg"></div>
                <div className="h-32 bg-bg-secondary rounded-lg"></div>
                <div className="h-24 bg-bg-secondary rounded-lg"></div>
              </div>
            </div>

            <div className="bg-bg-card border border-border rounded-xl p-8 mb-6">
              <h2 className="text-3xl font-bold mb-6">What You Can Automate Right Now</h2>
              <div className="space-y-6">
                <div className="h-64 bg-bg-secondary rounded-lg"></div>
                <div className="h-64 bg-bg-secondary rounded-lg"></div>
                <div className="h-64 bg-bg-secondary rounded-lg"></div>
              </div>
            </div>

            <div className="bg-bg-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Get Started Plan</h2>
              <div className="space-y-4">
                <div className="h-48 bg-bg-secondary rounded-lg"></div>
                <div className="h-48 bg-bg-secondary rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

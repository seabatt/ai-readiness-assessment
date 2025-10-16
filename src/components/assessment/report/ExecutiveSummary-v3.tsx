'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';
import { MatchedUseCase } from '@/lib/engines/use-case-matcher';

interface ExecutiveSummaryProps {
  roiResult: ROIResult;
  totalMonthlyTickets: number;
  assessmentData: {
    techStack: string[];
    additionalContext?: string;
  };
  matchedUseCases: MatchedUseCase[];
}

export default function ExecutiveSummary({ 
  roiResult, 
  totalMonthlyTickets,
  assessmentData,
  matchedUseCases
}: ExecutiveSummaryProps) {
  const [generatedInsight, setGeneratedInsight] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function generateInsight() {
      if (!assessmentData.additionalContext) {
        return;
      }

      setIsGenerating(true);

      try {
        // Extract top categories from ROI result
        const topCategories = roiResult.breakdown_by_category
          .sort((a: any, b: any) => b.hours_saved - a.hours_saved)
          .slice(0, 3)
          .map((cat: any) => cat.category);

        // Get top 3 use cases by hours saved
        const topUseCases = matchedUseCases
          .sort((a, b) => b.estimated_hours_saved - a.estimated_hours_saved)
          .slice(0, 3)
          .map(uc => ({
            name: uc.name,
            category: uc.category,
            estimatedHoursSaved: uc.estimated_hours_saved
          }));

        const response = await fetch('/api/generate-context-insight', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userContext: assessmentData.additionalContext,
            automatableTickets: roiResult.automatable_tickets,
            totalHoursSaved: roiResult.total_hours_saved,
            fteEquivalent: roiResult.fte_equivalent,
            topCategories,
            topUseCases,
            techStack: assessmentData.techStack
          })
        });

        if (response.ok) {
          const data = await response.json();
          setGeneratedInsight(data.insight);
        }
      } catch (error) {
        console.error('Failed to generate insight:', error);
      } finally {
        setIsGenerating(false);
      }
    }

    generateInsight();
  }, [assessmentData, roiResult, matchedUseCases]);
  
  const getReadinessRating = (automatablePct: number) => {
    if (automatablePct >= 40) return { label: 'High Readiness', color: 'text-accent-green' };
    if (automatablePct >= 25) return { label: 'Moderate Readiness', color: 'text-accent-blue' };
    if (automatablePct >= 15) return { label: 'Early Opportunity', color: 'text-accent-orange' };
    return { label: 'Foundation Building', color: 'text-text-secondary' };
  };

  const rating = getReadinessRating(roiResult.automatable_pct);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-2">
          Your IT Automation Readiness
        </h2>
        <p className="text-lg text-text-secondary">
          Based on your {assessmentData.techStack.length} selected tools and {totalMonthlyTickets.toLocaleString()} monthly tickets
        </p>
      </div>

      {/* Main Readiness Card */}
      <Card className="mb-8">
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold ${rating.color} mb-2`}>
            {roiResult.automatable_pct.toFixed(1)}%
          </div>
          <div className="text-xl text-text-secondary mb-4">
            of tickets can be automated immediately
          </div>
          <div className={`inline-block px-6 py-2 rounded-pill ${rating.color} bg-opacity-10 border border-current`}>
            {rating.label}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 pt-6 border-t border-brand-secondary/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green">
              {roiResult.automatable_tickets.toLocaleString()}
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Tickets Automatable/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-blue">
              {Math.round(roiResult.total_hours_saved).toLocaleString()} hrs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Time Saved/Month
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary">
              {roiResult.fte_equivalent.toFixed(1)} FTEs
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Capacity Freed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-orange">
              ${Math.round(roiResult.annual_value_usd / 1000).toLocaleString()}K
            </div>
            <div className="text-sm text-text-tertiary mt-1">
              Annual Value
            </div>
          </div>
        </div>
      </Card>

      {/* Context Insight (if provided) */}
      {assessmentData.additionalContext && (
        <Card className="mt-8 bg-accent-blue/5 border-accent-blue/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-accent-blue/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">
                Your Context Considered
              </h3>
              {isGenerating ? (
                <div className="flex items-center gap-2 text-sm text-text-tertiary">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-accent-blue border-t-transparent" />
                  Analyzing your context...
                </div>
              ) : generatedInsight ? (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {generatedInsight}
                </p>
              ) : (
                <p className="text-sm text-text-secondary leading-relaxed">
                  {assessmentData.additionalContext}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

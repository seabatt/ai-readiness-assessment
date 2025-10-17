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
            userContext: assessmentData.additionalContext || '',
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
          console.log('API response data:', data);
          setGeneratedInsight(data.insight);
        } else {
          console.error('API response not OK:', response.status);
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

      {/* Key Insights - Always Show */}
      <div className="mt-8">
        {isGenerating ? (
          <div className="flex items-center gap-2 text-text-tertiary">
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-accent-blue border-t-transparent" />
            Analyzing your data...
          </div>
        ) : generatedInsight ? (
          <>
            <p className="text-lg text-text-secondary mb-6">
              {generatedInsight}
            </p>
            <div className="text-center">
              <a 
                href="https://www.ai.work/book-a-demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-highlight"></span>
                Schedule a Complete Deep Dive
              </a>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

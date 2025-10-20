'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { ROIResult } from '@/types/types-v3';
import { MatchedUseCase } from '@/lib/engines/use-case-matcher';
import { formatLargeNumber } from '@/lib/utils/formatNumber';

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

  // Helper function to render text with bold formatting and bullets
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let bulletItems: string[] = [];

    lines.forEach((line, index) => {
      // Check if line is a bullet point
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        bulletItems.push(line.replace(/^[-•]\s*/, '').trim());
      } else {
        // If we have accumulated bullet items, render them first
        if (bulletItems.length > 0) {
          elements.push(
            <ul key={`bullets-${index}`} className="space-y-2 ml-6 my-4">
              {bulletItems.map((item, i) => (
                <li key={i} className="text-lg text-text-secondary list-disc">
                  {renderBoldText(item)}
                </li>
              ))}
            </ul>
          );
          bulletItems = [];
        }
        
        // Render regular text if not empty
        if (line.trim()) {
          elements.push(
            <span key={`line-${index}`}>
              {renderBoldText(line)}
              {index < lines.length - 1 && ' '}
            </span>
          );
        }
      }
    });

    // Render any remaining bullet items
    if (bulletItems.length > 0) {
      elements.push(
        <ul key="bullets-final" className="space-y-2 ml-6 my-4">
          {bulletItems.map((item, i) => (
            <li key={i} className="text-lg text-text-secondary list-disc">
              {renderBoldText(item)}
            </li>
          ))}
        </ul>
      );
    }

    return elements;
  };

  // Helper function to render bold text
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-text-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

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
            readinessScore: roiResult.automatable_pct,
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
    if (automatablePct >= 40) return { label: 'High Readiness', color: 'text-accent-green', bgColor: 'bg-accent-green/20' };
    if (automatablePct >= 25) return { label: 'Moderate Readiness', color: 'text-accent-blue', bgColor: 'bg-accent-blue/20' };
    if (automatablePct >= 15) return { label: 'Early Opportunity', color: 'text-accent-orange', bgColor: 'bg-accent-orange/20' };
    return { label: 'Foundation Building', color: 'text-text-secondary', bgColor: 'bg-text-secondary/20' };
  };

  const rating = getReadinessRating(roiResult.automatable_pct);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Main Readiness Card */}
      <Card className="mb-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <span className={`px-3 py-1 rounded-full ${rating.bgColor} ${rating.color} text-sm font-medium`}>
              {rating.label}
            </span>
          </div>
          <div className={`text-6xl font-bold ${rating.color} mb-2`}>
            {roiResult.automatable_pct.toFixed(1)}%
          </div>
          <div className="text-xl text-text-secondary">
            of tickets can be automated immediately
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
              {formatLargeNumber(roiResult.annual_value_usd, '$')}
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
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              Your IT Stack is {roiResult.automatable_pct.toFixed(0)}% Ready for AI Workers — Here's What That Means for Your Organization
            </h2>
            <div className="space-y-4 mb-6">
              {generatedInsight.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg text-text-secondary leading-relaxed">
                  {renderFormattedText(paragraph)}
                </p>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

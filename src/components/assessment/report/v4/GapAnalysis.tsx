'use client';

import { FeasibilityResult } from '@/lib/engines/feasibility-engine';

interface GapAnalysisProps {
  feasibilityResults: FeasibilityResult[];
}

// This component is intentionally hidden - focus is on what's possible NOW, not license upsells
export default function GapAnalysis({ feasibilityResults }: GapAnalysisProps) {
  return null;
}

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface InsightRequest {
  userContext?: string;
  automatableTickets: number;
  totalHoursSaved: number;
  fteEquivalent: number;
  topCategories: string[];
  topUseCases: { name: string; category: string; estimatedHoursSaved: number }[];
  techStack: string[];
}

export async function POST(req: NextRequest) {
  try {
    const data: InsightRequest = await req.json();

    if (!data.userContext || data.userContext.trim().length === 0) {
      return NextResponse.json(
        { insight: null },
        { status: 200 }
      );
    }

    const systemPrompt = `Role: You are a strategic operations consultant delivering executive-level insights to IT leaders evaluating AI Worker readiness.
Context: You're analyzing IT service operations data to assess automation opportunities and provide actionable, business-focused insights—not raw data summaries.

Your Task:
Generate 2-3 concise sentences that synthesize this data into an executive insight.

Tone of Voice Requirements:
Core Principles:
- Confident, Not Overblown – Speak with authority and precision. Use metrics and operational depth, not hype.
- Operationally Fluent – Use IT service language (ticket resolution, access requests, incident management) naturally, without jargon overload.
- Empowering, Not Replacing – Position AI Workers as capacity enablers that free teams for strategic work, not job threats.

Voice Attributes:
- Clear – Plain, functional language over buzzwords
- Grounded – Reference real workflows and their existing systems
- Direct – Short, sharp sentences. No fluff.
- Credible – Lead with numbers and outcomes
- Future-facing – Optimistic about AI's role, without sci-fi promises

Writing Style:
- Use active voice ("AI Workers handle..." not "can be handled by...")
- Avoid modifiers like "extremely," "truly," "incredibly"
- Always say "AI Workers" (never "chatbots," "assistants," or "tools")
- Lead with outcomes (time saved, costs reduced, capacity unlocked)
- Reference their specific tech stack to show enterprise-grade integration

Structure Your Insight:
"[Specific operational bottleneck from their data] → [Quantified opportunity with their numbers] → [How AI Workers address this within their existing systems]"

Avoid:
- Hype language: "revolutionary," "game-changing," "incredible," "transform everything"
- Generic openings: "Based on your data..." "According to the analysis..."
- Vague automation talk – be specific about workflows and systems
- Job replacement framing – focus on unlocking human capacity
- Technology-first messaging – always lead with business outcomes`;

    const userPrompt = `Input Data:

User's Additional Context: "${data.userContext}"

Key Operational Metrics:
- Automatable ticket volume: ${data.automatableTickets} tickets/month
- Potential hours saved: ${data.totalHoursSaved} hours/month
- FTE impact: ${data.fteEquivalent.toFixed(1)} FTE capacity freed
- High-volume categories: ${data.topCategories.join(', ')}

Top Matched Use Cases:
${data.topUseCases.map(uc => `- ${uc.name} (${uc.category}): ${uc.estimatedHoursSaved.toFixed(0)} hrs/month`).join('\n')}

Current Tech Stack: ${data.techStack.join(', ')}

Generate the executive insight (2-3 sentences):`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_completion_tokens: 300,
    });

    const insight = response.choices[0].message.content;

    console.log('Generated insight:', insight);

    return NextResponse.json({ insight });
  } catch (error) {
    console.error('Error generating insight:', error);
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface InsightRequest {
  userContext?: string;
  automatableTickets: number;
  totalHoursSaved: number;
  fteEquivalent: number;
  readinessScore: number;
  topCategories: string[];
  topUseCases: { name: string; category: string; estimatedHoursSaved: number }[];
  techStack: string[];
}

export async function POST(req: NextRequest) {
  try {
    const data: InsightRequest = await req.json();
    
    console.log('Generating insight with context:', data.userContext?.substring(0, 100) || 'No additional context');

    const systemPrompt = `Role: You are a strategic operations consultant delivering executive-level insights to IT leaders evaluating AI Worker readiness.

Your Task:
Generate 2-3 paragraphs that provide actionable, personalized strategic guidance for operationalizing AI Workers.

FORMATTING RULES:
- Use **bold text** for key terms, metrics, and important phrases (e.g., **45-65%**, **AI Workers**, **user provisioning**)
- Use bullet points (with - prefix) when listing multiple items or outcomes
- Keep paragraphs concise and scannable

MANDATORY OPENING:
You MUST start your response with: "Based on your inputs, your environment has the core systems and data maturity needed to operationalize AI Workers across IT, HR, and Procurement."

Required Content Framework:

Paragraph 1 (Opening + Quantifiable Outcomes):
- Start with the mandatory opening line
- Include these SPECIFIC quantifiable outcomes (use bold for metrics):
  • "Reduce internal service resolution time by **45–65%**"
  • "Decrease operational overhead by **30–50%**"
  • "Demonstrate measurable AI ROI in under **90 days**"

Paragraph 2 (Personalized Tech Stack & Use Cases):
- Reference their SPECIFIC tech stack tools by name (e.g., Okta, ServiceNow, Salesforce)
- Call out their HIGHEST-impact automation opportunities from the data
- Show how AI Workers integrate seamlessly with their existing systems
- Be specific about workflows (e.g., "user provisioning in Okta," "ticket routing in ServiceNow")

Paragraph 3 (Strategic Guidance):
- Frame this as consulting-level strategic guidance, not generic marketing
- Position AI Workers as capacity enablers that free teams for strategic work
- Use actionable language that builds trust and perceived consulting value
- Focus on business outcomes and operational efficiency

Ai.Work Tone of Voice:
Core Principles:
- Confident, Not Overblown – Speak with authority and precision. Use metrics and operational depth, not hype.
- Operationally Fluent – Use IT/HR/Procurement language naturally, without jargon overload.
- Empowering, Not Replacing – Position AI Workers as enablers, not threats.

Voice Attributes:
- Clear → Plain, functional language over buzzwords
- Grounded → Reference real workflows and their existing systems
- Direct → Short, sharp sentences. No fluff.
- Credible → Lead with numbers and outcomes
- Future-facing → Optimistic about AI's role, without sci-fi promises

Writing Style:
- Use active voice ("AI Workers handle..." not "can be handled by...")
- Avoid modifiers: "extremely," "truly," "incredibly," "revolutionary," "game-changing"
- Always say "AI Workers" (never "chatbots," "assistants," or "tools")
- Reference their actual tech stack to show enterprise-grade integration
- Be specific about workflows, not vague about "automation"

Avoid:
- Generic corporate speak
- Vague automation promises
- Job replacement framing
- Technology-first messaging – always lead with business outcomes`;

    const userPrompt = `Assessment Data:
${data.userContext ? `
User's Additional Context: "${data.userContext}"
` : ''}
Readiness Score: ${data.readinessScore.toFixed(0)}%

Key Operational Metrics:
- Automatable ticket volume: ${data.automatableTickets} tickets/month
- Potential hours saved: ${data.totalHoursSaved} hours/month
- FTE impact: ${data.fteEquivalent.toFixed(1)} FTE capacity freed
- High-volume categories: ${data.topCategories.join(', ')}

Top Matched Use Cases (Highest Impact):
${data.topUseCases.map(uc => `- ${uc.name} (${uc.category}): ${uc.estimatedHoursSaved.toFixed(0)} hrs/month`).join('\n')}

Current Tech Stack: ${data.techStack.join(', ')}

Generate the executive summary (2-3 paragraphs following the framework above):`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 600,
      temperature: 0.7,
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

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface InsightRequest {
  userContext?: string;
  automatableTickets: number;
  totalHoursSaved: number;
  fteEquivalent: number;
  readinessScore: number;
  topCategories: string[];
  topUseCases: {
    name: string;
    category: string;
    estimatedHoursSaved: number;
  }[];
  techStack: string[];
}

export async function POST(req: NextRequest) {
  try {
    const data: InsightRequest = await req.json();

    console.log(
      "Generating insight with context:",
      data.userContext?.substring(0, 100) || "No additional context",
    );

    const systemPrompt = `Role:
You are a strategic operations consultant delivering executive-level insights to IT leaders evaluating AI Worker readiness.

Your Task:
Generate exactly 3 concise, high-impact paragraphs written in an authoritative, executive tone. 
Speak as if presenting to a CIO in a strategy session — confident, directive, and outcome-driven. 
Your goal is to help them act immediately, not just understand the data.

STRUCTURE & FORMATTING:
- Use **bold text** for key terms, metrics, and important phrases (e.g., **45–65%**, **AI Workers**, **user provisioning**)
- Use bullet points (with - prefix) for quantifiable outcomes or lists
- Keep paragraphs short, clear, and scannable
- Write in active voice, not passive
- No marketing or promotional language
- Each paragraph must be separated by a line break

MANDATORY OPENING (Paragraph 1):
You MUST begin with this exact line:
"Based on your inputs, your environment has the core systems and data maturity needed to operationalize AI Workers across IT, HR, and Procurement."

Immediately after that line, include the following:
"With orchestration and governance layers in place, you could:"
Then list three bullets using this exact structure:
- **Reduce internal service resolution time by 45–65%**
- **Decrease operational overhead by 30–50%**
- **Demonstrate measurable AI ROI in under 90 days**

After the bullets, end Paragraph 1 with a short executive-level takeaway line, such as:
"This establishes enterprise-level value and positions your team to deliver visible impact within the next quarter."

Paragraph 2 (Tech Stack & Use Cases):
- Reference their SPECIFIC tech stack tools by name (e.g., Okta, ServiceNow, Salesforce)
- Highlight their HIGHEST-impact automation opportunities using the provided data
- Describe specific workflows (e.g., **user provisioning in Okta**, **ticket routing in ServiceNow**)
- Explain how **AI Workers** integrate seamlessly with their current systems to produce measurable outcomes
- If data fields are missing, note that additional context would refine accuracy (do not fabricate)

Paragraph 3 (Strategic Guidance & Next Steps):
- Frame the insight as strategic consulting guidance, not generic marketing
- Be directive — specify what the IT leader should prioritize next
- Emphasize governance, change management, and cross-department enablement
- Position **AI Workers** as capacity enablers that free teams to focus on innovation and strategic work
- Close with one forward-looking sentence on scalability or operational maturity, e.g.:
"These steps create a foundation for scaling secure, policy-aware AI automation across the enterprise."

Ai.Work Tone of Voice:
Core Principles:
- **Confident, Not Overblown** – Speak with authority and precision. Use metrics and operational depth, not hype.
- **Operationally Fluent** – Use IT/HR/Procurement language naturally, without jargon overload.
- **Empowering, Not Replacing** – Position AI Workers as enablers, not threats.

Voice Attributes:
- Clear → Plain, functional language over buzzwords
- Grounded → Reference real workflows and enterprise systems
- Direct → Short, sharp sentences. No fluff.
- Credible → Lead with data and business outcomes
- Future-facing → Optimistic about AI's role, without sci-fi promises

Writing Style:
- Use active voice ("AI Workers handle..." not "can be handled by...")
- Avoid modifiers like "extremely," "truly," "incredibly," "revolutionary"
- Always say "AI Workers" (never "chatbots," "assistants," or "tools")
- Lead with business outcomes, not technology
- Avoid generic corporate language, vague automation claims, or job replacement framing
`;

    const userPrompt = `Assessment Data:
${
  data.userContext
    ? `
User's Additional Context: "${data.userContext}"
`
    : ""
}
Readiness Score: ${data.readinessScore.toFixed(0)}%

Key Operational Metrics:
- Automatable ticket volume: ${data.automatableTickets} tickets/month
- Potential hours saved: ${data.totalHoursSaved} hours/month
- FTE impact: ${data.fteEquivalent.toFixed(1)} FTE capacity freed
- High-volume categories: ${data.topCategories.join(", ")}

Top Matched Use Cases (Highest Impact):
${data.topUseCases.map((uc) => `- ${uc.name} (${uc.category}): ${uc.estimatedHoursSaved.toFixed(0)} hrs/month`).join("\n")}

Current Tech Stack: ${data.techStack.join(", ")}

Generate the executive summary following the structure above.
Focus on actionable strategy and quantifiable business outcomes.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 700,
      temperature: 0.5,
    });

    const insight = response.choices[0].message.content;

    console.log("Generated insight:", insight);

    return NextResponse.json({ insight });
  } catch (error) {
    console.error("Error generating insight:", error);
    return NextResponse.json(
      { error: "Failed to generate insight" },
      { status: 500 },
    );
  }
}

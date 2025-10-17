# IT Readiness Assessment App

## Overview
This Next.js AI Work IT Automation Readiness Assessment tool helps IT teams evaluate their readiness for AI worker integration. It provides a comprehensive assessment covering tech stack evaluation and workflow analysis, generating detailed reports with specific, API-grounded recommendations and ROI calculations. The project aims to provide data-driven insights for IT leaders facing pressure to innovate and to provide a complete deployment blueprint.

## User Preferences
No specific user preferences documented yet.

## System Architecture

### UI/UX Decisions
The application uses the official Ai.Work brand system with a custom dark theme. Key elements include a specific color palette (primary background #141414, highlight #82D895, text colors #FBFAF9, #8A8784), standardized spacing, 200ms transitions, and a simplified loading screen design. The landing page uses conversational, user-focused messaging, and report narratives are structured to "hit harder" for IT leaders, focusing on algorithm analysis, concrete metrics, and immediate opportunities. Typography uses NB International Pro with multiple weights. All logos display with hover tooltips and green glow effects.

### Technical Implementations
-   **Framework & Styling**: Next.js 14.2 with TypeScript and Tailwind CSS.
-   **UI Libraries**: Framer Motion (animations), Recharts (data visualization), React Hook Form + Zod (form validation), @dnd-kit (drag and drop), Lucide React (icons).
-   **Assessment Flow**: A 3-step process including Tech Stack Selection, Volume & Service Profile (with categorized ticket distribution sliders), and optional Additional Context.
-   **Analysis Engines** (`src/lib/engines/`):
    -   **FeasibilityEngine**: Analyzes user tech stack against `tool-apis.json` to identify available APIs and use cases, normalizing tool names.
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers, calculating fit scores, estimating deflection, and prioritizing use cases.
    -   **ROICalculator**: Calculates precise ROI from matched use cases, including FTE equivalents and category-level breakdowns with confidence scores.
-   **Report Generation**: Generates V4 reports with high accuracy, including:
    -   **Executive Summary**: AI-generated strategic insights, readiness percentage, and dynamic headings. No CTA button in this section.
    -   **Opportunity Analysis**: "What You Can Automate Right Now" section categorizes good vs. poor candidates. "How to Identify Valuable Use Cases" subheading introduces the use case list with 2-column grid layout. Use case cards show category badges (green accent), required tools, and impact metrics. No fit scores or deployment timing badges displayed.
    -   **Deployment Plan**: Provides a comprehensive "Get Started Plan" with standard HTML tables for 3-column timeline (Phase, Activity, Key Participants - removed "What We Need to Collect" column), required assets (2 columns: Category, Description), and internal alignment for 7 stakeholder roles. Includes text-based CTA section after RequiredAssets with "Run the Full Discovery Assessment →" link to book-a-demo. All messaging is vendor-agnostic. Text sizing uses text-lg for consistency.
    -   **Expected Outcomes**: Details pilot metrics, before/after scenarios, and team capacity gains.
    -   **Call to Action**: CustomReportCTA with text-based section "Run the Full Discovery Assessment →" and description text, replacing the previous button. All text uses consistent sizing (text-lg text-text-secondary).
-   **LLM Integration**: Uses OpenAI GPT-4o for generating strategic "Key Insights" in the Executive Summary, analyzing ROI metrics, tech stack, and user context.
-   **Data Handling**: Fixed critical ROI calculation bug by implementing capacity tracking to prevent ticket double-counting. Standardized number formatting and filtered irrelevant categories.

### Feature Specifications
-   **ConnectedAppLogos component**: Displays 24px logos with hover tooltips and green glow effects.
-   **V4 Report**: The primary report experience, offering API-grounded analysis and specific recommendations with a reorganized section order for clearer user flow.
-   **Assessment Data**: Captures monthly tickets, ticket distribution, and additional context.
-   **Workflow Steps Styling**: Collapsible "How it Works" section with updated number styling.

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
-   **APIs**:
    -   OpenAI GPT-4o (for LLM-generated executive insights)
-   **Integrations**:
    -   External API configurations for various tools (e.g., Ivanti, GitHub, Microsoft Teams, SAP SuccessFactors, Google Workspace services) are referenced internally via `tool-apis.json` and `use-case-mappings.json`.
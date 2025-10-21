# IT Readiness Assessment App

## Overview
This Next.js AI Work IT Automation Readiness Assessment tool helps IT teams evaluate their readiness for AI worker integration. It provides a comprehensive assessment covering tech stack evaluation and workflow analysis, generating detailed reports with specific, API-grounded recommendations and ROI calculations. The project aims to provide data-driven insights for IT leaders facing pressure to innovate and to provide a complete deployment blueprint. Multiple report versions are available (V3, V4, V5) with V5 as the default experience.

## User Preferences
No specific user preferences documented yet.

## System Architecture

### UI/UX Decisions
The application uses the official Ai.Work brand system with a custom dark theme. Key elements include a specific color palette (primary background #141414, highlight #82D895, text colors #FBFAF9, #8A8784), standardized spacing, 200ms transitions, and a simplified loading screen design. The landing page features an email capture form (business email input) above the main CTA button, followed by "5 minutes • Instant results" timing text. The landing page uses conversational, user-focused messaging with a streamlined "What You'll Discover" section (py-12 spacing, text-2xl md:text-3xl heading, 6 items in 2 columns). All CTA buttons use consistent white styling (bg-white text-black px-8 py-4) with green highlight dot on left and ">" on right. Report narratives are structured to "hit harder" for IT leaders, focusing on algorithm analysis, concrete metrics, and immediate opportunities. Typography uses NB International Pro with multiple weights, with text-lg standardized for body paragraphs. All logos display with hover tooltips (green glow effects removed from CustomReportCTA). Numbers are formatted as X.XM or X.XK for readability (e.g., $2.9M instead of $2,909K).

### Technical Implementations
-   **Framework & Styling**: Next.js 14.2 with TypeScript and Tailwind CSS.
-   **UI Libraries**: Framer Motion (animations), Recharts (data visualization), React Hook Form + Zod (form validation), @dnd-kit (drag and drop), Lucide React (icons).
-   **HubSpot Integration**: Site-wide tracking script loaded in root layout (Portal ID: 145411173, region: eu1). HubSpot form (ID: 336ea270-b317-44e7-b3a8-132aae822d08) integrated into CustomReportCTA component within the "7-Day Ticket Listening Process" section. Custom dark theme styling applied to forms via src/styles/hubspot-form.css.
-   **Assessment Flow**: A 3-step process including Tech Stack Selection, Volume & Service Profile (with categorized ticket distribution sliders), and optional Additional Context.
-   **Analysis Engines** (`src/lib/engines/`):
    -   **FeasibilityEngine**: Analyzes user tech stack against `tool-apis.json` to identify available APIs and use cases, normalizing tool names.
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers, calculating fit scores, estimating deflection, and prioritizing use cases.
    -   **ROICalculator**: Calculates precise ROI from matched use cases, including FTE equivalents and category-level breakdowns with confidence scores.
-   **Report Generation**: 
    -   **V4 Reports**: Includes AI-generated strategic insights in Executive Summary, "How to Identify Valuable Use Cases" section, and CTA sections.
    -   **V5 Reports** (default): Streamlined data-focused version without LLM-generated insights. Includes:
        -   **Report Header**: Displays "AI Worker Readiness Blueprint" as the main title with a dynamic subheader that shows the number of connected tools and monthly tickets analyzed.
        -   **Executive Summary**: Clean metrics display with readiness percentage badge (color dynamically matches percentage color) and key statistics. No LLM-generated insights or CTA in this section.
        -   **Opportunity Analysis**: Begins directly with "What You Can Automate Right Now" heading and single-column full-width use case cards (grid grid-cols-1 gap-6). Cards feature tool logos prominently displayed in top right (48px with circular backgrounds and borders via "prominent" prop). Title (text-2xl), category badge, and rank number positioned on left. Enhanced metrics section uses text-3xl numbers with subtle bg-bg-primary/50 background and improved spacing. Description uses text-lg. Collapsible "How it works" section at bottom. No fit scores, deployment timing badges, or CTA sections displayed.
    -   **Deployment Plan**: Provides a comprehensive "Get Started Plan" with standard HTML tables including 3-column timeline with phases formatted as two lines (e.g., "Phase One" / bold "Integration Setup"), required assets section renamed to "What You Will Need to Collect" with 4 detailed categories (Rules, Data, Connections, Stakeholder Alignment), and internal alignment for 7 stakeholder roles. All messaging is vendor-agnostic. Text sizing uses text-lg for consistency.
    -   **Expected Outcomes**: Details pilot metrics, before/after scenarios, and team capacity gains.
    -   **Call to Action**: CustomReportCTA with white button "Run the Full Discovery Assessment >" with green dot, linking to book-a-demo, preceded by description text. Button matches app-wide styling (bg-white text-black px-8 py-4 rounded-lg, centered text with green highlight dot on left and ">" on right).
-   **LLM Integration**: V4 reports use OpenAI GPT-4o for generating strategic "Key Insights" in the Executive Summary, analyzing ROI metrics, tech stack, and user context. V5 reports (default) do not use LLM-generated content.
-   **Data Handling**: Fixed critical ROI calculation bug by implementing capacity tracking to prevent ticket double-counting. Standardized number formatting and filtered irrelevant categories.

### Feature Specifications
-   **ConnectedAppLogos component**: Displays logos with hover tooltips. Supports "prominent" mode with circular backgrounds, borders, and hover scale effects for emphasizing key integrations.
-   **V5 Report**: The primary/default report experience (as of October 2025), offering API-grounded analysis and specific recommendations with a reorganized section order for clearer user flow. Available at `/report/v5/new` route.
-   **V4 Report**: Previous report version, still available at `/report/v4/new` route. Currently identical to V5.
-   **Assessment Data**: Captures monthly tickets, ticket distribution, and additional context.
-   **Workflow Steps Styling**: Collapsible "How it Works" section with updated number styling and toggle arrow positioned left of text.

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
-   **APIs**:
    -   OpenAI GPT-4o (for LLM-generated executive insights)
-   **Integrations**:
    -   External API configurations for various tools (e.g., Ivanti, GitHub, Microsoft Teams, SAP SuccessFactors, Google Workspace services) are referenced internally via `tool-apis.json` and `use-case-mappings.json`.
# IT Readiness Assessment App

## Overview
This Next.js AI Work IT Automation Readiness Assessment tool helps IT teams evaluate their readiness for AI worker integration. It provides a comprehensive assessment covering tech stack evaluation and workflow analysis, generating detailed reports with specific, API-grounded recommendations and ROI calculations. The project aims to provide data-driven insights for IT leaders facing pressure to innovate.

## User Preferences
No specific user preferences documented yet.

## System Architecture

### UI/UX Decisions
The application uses the official Ai.Work brand system with a custom dark theme:
- **Color Palette**: Primary background #141414, highlight #82D895, text colors #FBFAF9 and #8A8784.
- **Card Backgrounds**: #1A1A1A and #41403E.
- **Spacing**: Standardized 80px section spacing, 32px/24px card padding, 1.6 line-height.
- **Transitions**: 200ms duration on all interactive elements using the highlight color.
- **Loading Screens**: Simplified, clean single-ring design with #82D895 highlight.
- **Landing Page**: Conversational, user-focused messaging addressing enterprise IT pressures.
- **Report Narrative**: Structured to "hit harder" for IT leaders, opening with algorithm analysis, concrete metrics, and immediate opportunities. It uses confident, operationally fluent, empowering, and credible language.

### Technical Implementations
- **Framework**: Next.js 14.2 with TypeScript.
- **Styling**: Tailwind CSS with a custom design system.
- **UI Libraries**: Framer Motion (animations), Recharts (data visualization), React Hook Form + Zod (form validation), @dnd-kit (drag and drop), Lucide React (icons).
- **Assessment Flow**: A simplified 3-step process:
    1.  Tech Stack Selection.
    2.  Volume & Service Profile (monthly tickets, 6 category distribution sliders with smart redistribution logic).
    3.  Additional Context (optional open-ended text area).
- **Analysis Engines** (`src/lib/engines/`):
    -   **FeasibilityEngine**: Analyzes user tech stack against `tool-apis.json` to identify ALL available APIs (license tier independent), enabled use cases (`use-case-mappings.json`), and prerequisites. Uses tool name normalization (hyphens/spaces → underscores) to match tool IDs with API configs.
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers, calculating fit scores (0-100) based on stack support, volume, TTR, and effort. Estimates deflection percentage and hours saved, prioritizing use cases by time-to-value.
    -   **ROICalculator**: Calculates precise ROI from matched use cases, summing automatable tickets and hours saved, converting to FTE equivalents, and providing category-level breakdowns with confidence scores.
- **Report Generation**: Generates V3 reports with high accuracy, including:
    -   **StackAnalysis**: Details available APIs, enabled AI Workers, opportunities, and prerequisites.
    -   **GapAnalysis**: Displays missing APIs and license upgrade paths (if applicable).
    -   **ROIBreakdown**: Category-level impact analysis with confidence scores and FTE calculations.
    -   **Narrative Structure**: Executive Summary, Opportunity Analysis (top 5 automations), Best Fit Use Cases (3-5 scenarios), Get-Started Roadmap (Crawl, Walk, Run phases), Expected Outcomes (pilot metrics, before/after, team capacity gains).

### Feature Specifications
-   **ConnectedAppLogos component**: Displays 24px logos with hover tooltips and green glow effects, integrated into reports.
-   **V3 Report**: The primary report experience, offering API-grounded analysis and specific recommendations.
-   **Assessment Data**: Captures monthly tickets, ticket distribution, and additional context.

### Recent Changes (October 16, 2025)
-   **LLM-Generated Executive Insights**: Integrated OpenAI GPT-4o to generate strategic "Key Insights" for every report (appears in Executive Summary). Uses corporate API key, analyzes ROI metrics + tech stack + user context to produce 2-3 executive-level sentences (24px, #8a8784, 1em line-height, -0.01em letter-spacing).
-   **Fixed Critical ROI Calculation Bug**: Resolved ticket double-counting issue where use cases were inflating totals beyond 100%. Implemented capacity tracking in UseCaseMatcher to ensure each ticket is only counted once, plus safety clamp in ROICalculator.
-   **UI Polish - Icons & Formatting**: Replaced all emojis with SVG icons across report sections. Standardized number formatting with commas (5,400 instead of 5400.0), whole numbers for hours/tickets, 1 decimal for FTE/percentages.
-   **Category Filtering**: Filtered out "Meetings & Collaboration Licenses" category from ROI Breakdown and Best Fit Use Cases sections to show only valid ticket categories.
-   **Home Page CTA Update**: Restructured "Start Assessment" button layout - button and "5 minutes • Instant results" text now separate elements (matching design spec).
-   **Custom Report CTA Styling**: Added outer glow effect (rgba(130, 216, 149, 0.3)) to "Get 100% Accurate Results" section.
-   **Removed License Tier Restrictions**: FeasibilityEngine now shows ALL available APIs for every tool regardless of license tier, providing complete visibility into automation capabilities.
-   **Comprehensive Tool Coverage**: Added API configurations for 18 previously missing tools (Ivanti, GitHub, JumpCloud, Freshservice, Microsoft Teams, Microsoft 365, Confluence, Monday.com, SAP SuccessFactors, HiBob, DocuSign, Linear, SharePoint, Google Drive, Google Docs, Google Sheets, Google Calendar, Gmail).
-   **Fixed Tool Name Normalization**: Updated all normalization points to use `/[\s-]+/g` regex pattern, correctly handling both hyphens and spaces in tool names for consistent API configuration matching.

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
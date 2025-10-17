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
- **Typography**: NB International Pro (company custom font) with multiple weights (Light 300, Regular 400, Book 450, Medium 500, Bold 700) and italic variants.
- **UI Libraries**: Framer Motion (animations), Recharts (data visualization), React Hook Form + Zod (form validation), @dnd-kit (drag and drop), Lucide React (icons).
- **Assessment Flow**: A simplified 3-step process:
    1.  Tech Stack Selection.
    2.  Volume & Service Profile (monthly tickets, 6 category distribution sliders with independent control - each slider adjusts without affecting others, total must equal 100% to proceed with validation error messages).
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

### Recent Changes (October 17, 2025)
-   **Executive Summary V4 Updates**:
    - **Dynamic Subheading**: Changed from "of tickets can be automated immediately" to "Your IT Stack is {score}% Ready for AI Workers — Here's What That Means for Your Organization" (uses actual readiness percentage)
    - **Enhanced AI Content Generation**: Rewrote AI prompt to generate 2-3 paragraphs (instead of sentences) with:
      - Mandatory opening: "Based on your inputs, your environment has the core systems and data maturity needed to operationalize AI Workers across IT, HR, and Procurement."
      - Specific quantifiable outcomes: 45-65% resolution time reduction, 30-50% overhead decrease, <90 day ROI
      - Personalized tech stack references and highest-impact automation opportunities
      - Strategic consulting-level guidance using Ai.Work tone of voice (confident, operationally fluent, empowering)
    - **API Enhancement**: Added readinessScore to API payload, increased max_tokens to 600 for longer content
-   **Report Header Update**: Changed subtitle from "Your assessment and get-started plan" to dynamic text: "Based on your X selected tools and X,XXX monthly tickets" - displays actual count of selected tools and formatted monthly ticket volume. H1 heading uses font-weight 400.
-   **Removed Redundant Executive Summary Heading**: Eliminated duplicate "Your IT Automation Readiness" heading and subtitle from Executive Summary section to avoid redundancy with main page header.
-   **Readiness Badge Repositioned**: Moved readiness level badge (High Readiness/Moderate Readiness/etc.) above the percentage number in Executive Summary. Reduced size to text-sm and updated styling to match other badges on page (bg-highlight/20 text-highlight rounded-full px-3 py-1).
-   **V4 Report Created & Reorganized**: 
    - Cloned V3 report to V4 for future modifications. All V4 components copied to `src/components/assessment/report/v4/` and page route created at `src/app/report/v4/[id]/page.tsx`. Report version displays "V4.0".
    - **Section Order**: Reorganized V4 report with new section order: Executive Summary (Hero) → How AI Can Fit into Your IT Stack (OpportunityAnalysis) → Your AI Worker Deployment Plan (BestFitUseCases) → ROI Breakdown → How to Get Started (GetStartedRoadmap) → What To Expect (ExpectedOutcomes) → Call to Action (CustomReportCTA).
    - **Removed Sections**: Eliminated "Your AI Worker Capabilities" (StackAnalysis) and "More Available Capabilities" (GapAnalysis) sections from V4.
-   **Workflow Steps Styling & Interaction (V4)**: 
    - **Collapsible "How it Works" Section**: Added expand/collapse functionality to workflow steps with clickable header and rotating chevron icon. Steps collapsed by default for cleaner initial view.
    - **Number Styling**: Updated workflow step numbers to "01", "02", "03" format with #8a8784 color, positioned above text with no background circle (matching brand design system).
-   **V4 Opportunity Analysis Updates**:
    - **Rank Number Styling**: Changed use case rank numbers from blue circles to "01", "02", "03" format with #8a8784 color, positioned above card heading with no background (matching brand design system).
    - **Section Heading**: Updated from "What You Can Automate Right Now" to "How AI Can Fit into Your IT Stack".
    - **Tool Logos**: Added ConnectedAppLogos component to display required tools for each use case with 24px logos, hover tooltips, and green glow effects. Tool logos positioned in top right of card, to the left of fit score. Removed "Uses:" label.
    - **Badge Repositioning**: Moved deploy badge (Deploy Week 1/Deploy Month 1-2/Deploy Month 3+) to top right of card, positioned to the left of tool logos.
    - **Section Removal**: Completely removed "More Available Capabilities" (GapAnalysis) section from V4 report.

### Recent Changes (October 16, 2025)
-   **LLM-Generated Executive Insights**: Integrated OpenAI GPT-4o to generate strategic "Key Insights" for every report (appears in Executive Summary). Uses corporate API key, analyzes ROI metrics + tech stack + user context to produce 2-3 executive-level sentences. Styled to match subtitle text (text-lg text-text-secondary). Removed "Key Insights" heading to streamline presentation. Includes "Schedule a Complete Deep Dive" CTA button below insights (white background with green dot indicator).
-   **Fixed Critical ROI Calculation Bug**: Resolved ticket double-counting issue where use cases were inflating totals beyond 100%. Implemented capacity tracking in UseCaseMatcher to ensure each ticket is only counted once, plus safety clamp in ROICalculator.
-   **UI Polish - Icons & Formatting**: Replaced all emojis with SVG icons across all report sections including Strategic Benefits (Continuous Learning, Employee Satisfaction, Operational Insights, Compliance & Audit, Scalable Operations, Reduced Context Switching). Standardized number formatting with commas (5,400 instead of 5400.0), whole numbers for hours/tickets, 1 decimal for FTE/percentages.
-   **Category Filtering**: Filtered out "Meetings & Collaboration Licenses" category from ROI Breakdown and Best Fit Use Cases sections to show only valid ticket categories.
-   **Home Page Design Updates**: 
    - Restructured "Start Assessment" button layout - button and "5 minutes • Instant results" text now separate elements, stacking vertically on mobile
    - Made header checkmark icon green (#82D895)
    - Hero heading responsive: text-4xl on mobile, text-6xl on desktop
    - Feature cards responsive layout: horizontal (icon left, text right) on mobile, vertical (icon top, text below) on desktop
    - Bottom CTA button includes green dot indicator
    - Added ai.work logo to all page headers (home, assessment, report)
    - Moved "Assessment tool based on real IT automation data" to preheader section above main header
-   **Report Section Styling Updates**:
    - Removed borders from "High-Impact Opportunities" boxes in Stack Analysis
    - Added green outer glow effect to "Cumulative Impact (First 2 Months)" section (matching "Get 100% Accurate Results" styling)
    - Updated all CTA buttons to white background with green dot indicator and linked to https://www.ai.work/book-a-demo:
      - "Schedule a Complete Deep Dive" (Executive Summary)
      - "Schedule Implementation Planning Call" (Get Started Roadmap)
      - "Request Custom Discovery Report" (Custom Report CTA)
-   **Custom Report CTA Styling**: Added outer glow effect (0 0 20px rgba(130, 216, 149, 0.3)) to "Get 100% Accurate Results" and "Cumulative Impact" sections.
-   **Removed License Tier Restrictions**: FeasibilityEngine now shows ALL available APIs for every tool regardless of license tier, providing complete visibility into automation capabilities.
-   **Comprehensive Tool Coverage**: Added API configurations for 18 previously missing tools (Ivanti, GitHub, JumpCloud, Freshservice, Microsoft Teams, Microsoft 365, Confluence, Monday.com, SAP SuccessFactors, HiBob, DocuSign, Linear, SharePoint, Google Drive, Google Docs, Google Sheets, Google Calendar, Gmail).
-   **Fixed Tool Name Normalization**: Updated all normalization points to use `/[\s-]+/g` regex pattern, correctly handling both hyphens and spaces in tool names for consistent API configuration matching.

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
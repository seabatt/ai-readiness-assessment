# AI Worker Readiness Assessment

## Overview
This Next.js tool provides a quick AI Worker Readiness Assessment helping IT teams identify immediate, low-hanging fruit automation opportunities. It analyzes tech stack and ticket distribution to surface specific AI Worker deployment opportunities with ROI projections. This assessment is designed to illustrate quick wins and immediate value—the next step for users is a deeper Data Discovery and Blueprint engagement. Report V5 is the active version; previous versions (V2-V4) are archived for reference.

## User Preferences
- Keep codebase clean and organized
- Archive deprecated code rather than deleting it for future reference
- Maintain clear documentation of changes and archive contents

## Recent Changes
**October 28, 2025 - Conservative ROI Calculation Methodology**
- Implemented cherry-picking factor (0.4-0.7) to model AI Workers automating EASIER tickets first
- Added automation_type classification: "full_automation" vs "assisted" for accurate projections
- Updated all automation rates to conservative 60-75% range based on real customer data
- Separated full automation and AI-assisted opportunities in report display
- Enhanced ROI calculations to track both automation types independently
- Validated against real reports: 25-35% deflection → 2-4 FTEs (depending on ticket mix)

**October 27, 2025 - Major Cleanup & Archive Organization**
- Created `/archive` directory structure for deprecated code and assets
- Moved report versions v1-v4 (pages and components) to `archive/reports/`
- Archived 10+ legacy standalone components (ScoreCircle, AIWorkerCard, etc.)
- Consolidated font files to `public/fonts/` (removed duplicate from `src/components/font/`)
- Archived 180+ development artifacts (screenshots, planning docs) to `archive/documentation/`
- Added comprehensive README files and VERSION_HISTORY.md throughout archive
- Updated tsconfig.json to exclude archive directory from TypeScript compilation
- Maintained clean separation: only v5 report components remain in active codebase
- Build verified: application compiles successfully with no broken imports

## System Architecture

### UI/UX Decisions
The application uses the official Ai.Work brand system with a custom dark theme. Key elements include a specific color palette (primary background #141414, highlight #82D895, text colors #FBFAF9, #8A8784), standardized spacing, 200ms transitions, and a simplified loading screen design. Typography uses NB International Pro font family (stored in `public/fonts/`) with multiple weights, with text-lg standardized for body paragraphs. The landing page features a direct "Get Your Assessment" CTA button (no email input on homepage), followed by "5 minutes • Instant results" timing text. Email capture occurs post-assessment via an email gate strategy for improved conversion. The email gate shows the number of identified opportunities with compelling copy: "We've identified X ways you can employ an AI Worker to deflect tickets immediately. Unlock the complete list." The landing page uses conversational, user-focused messaging with a streamlined "What You'll Discover" section (py-12 spacing, text-2xl md:text-3xl heading, 6 items in 2 columns). All CTA buttons use consistent white styling (bg-white text-black px-8 py-4) with green highlight dot on left and ">" on right. Assessment results are structured to "hit harder" for IT leaders, focusing on algorithm analysis, concrete metrics, and immediate opportunities. All logos display with hover tooltips (green glow effects removed from CustomReportCTA). Numbers are formatted as X.XM or X.XK for readability (e.g., $2.9M instead of $2,909K).

### Technical Implementations
-   **Framework & Styling**: Next.js 14.2 with TypeScript and Tailwind CSS.
-   **UI Libraries**: Framer Motion (animations), Recharts (data visualization), React Hook Form + Zod (form validation), @dnd-kit (drag and drop), Lucide React (icons).
-   **Database & Persistence**: PostgreSQL database (Neon-backed) with Drizzle ORM for storing assessment reports. Schema includes assessments table with UUID primary key, email field (optional text), JSONB fields for tech stack/ticket distribution/report data, integer for monthly tickets, optional text context, and timestamps. Service layer in `src/lib/services/assessmentService.ts` provides CRUD operations. API routes at `/api/assessments` (POST to create), `/api/assessments/[id]` (GET by ID), `/api/assessments/[id]/update-email` (PATCH to add email), and `/api/assessments/submit-email` (POST fallback) handle database interactions with proper error handling. WebSocket support requires `bufferutil` package for Neon serverless driver.
-   **HubSpot Integration**: Site-wide tracking script loaded in root layout (Portal ID: 145411173, region: eu1). HubSpot form (ID: 336ea270-b317-44e7-b3a8-132aae822d08) integrated into CustomReportCTA component within the "7-Day Ticket Listening Process" section. Custom dark theme styling applied to forms via src/styles/hubspot-form.css.
-   **Assessment Flow**: A 3-step process including Tech Stack Selection, Volume & Service Profile (with categorized ticket distribution sliders), and optional Additional Context. Upon completion, assessment is saved to PostgreSQL database during loading screen (without email), then user is redirected to email gate page (`/email-gate?id={assessmentId}`). After email submission, existing assessment record is updated with email via PATCH to `/api/assessments/[id]/update-email`, and user is redirected to full report page.
-   **Analysis Engines** (`src/lib/engines/`):
    -   **FeasibilityEngine**: Analyzes user tech stack against `tool-apis.json` to identify available APIs and use cases, normalizing tool names.
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers with conservative, real-world assumptions. Key features:
        - **Cherry-Picking Factor** (0.4-0.7): Models that AI Workers automate the EASIER tickets first. Example: If median TTR = 1.5hrs but AI automates tickets with 0.3hr TTR, cherry_picking_factor = 0.2. Applied as: adjustedBaseline = avg_ttr_hours × cherry_picking_factor.
        - **Automation Types**: Distinguishes "full_automation" (complete ticket deflection) from "assisted" (reduces TTR but doesn't eliminate it). Assisted cases use delta (baseline - post_auto_ttr) for hours saved.
        - **Conservative Automation Rates**: 60-75% based on real customer data (e.g., Okta app access 75%, Okta app issues 60%, hardware 50%).
        - **Capacity Tracking**: Prevents double-counting by tracking remaining ticket capacity per category as use cases consume volume.
        - **Approval Leakage**: Optional field (0-1) for portions requiring human approval, conservatively assumed to yield zero savings.
    -   **ROICalculator**: Calculates conservative, finance-friendly ROI from matched use cases. Key features:
        - **Budget FTE vs Capacity FTE**: Distinguishes between theoretical capacity freed (2000 hours/FTE) and realistic budget impact (captured hours / 1800 effective hours per FTE with 50% capture rate).
        - **Full vs Assisted Tracking**: Separately tracks full_automation_tickets/hours and assisted_tickets/hours for transparent reporting.
        - **Confidence Bands**: Provides Expected (confidence-weighted), Conservative (P70), and Very Conservative (P90) scenarios for hours saved to give honest forecasting ranges.
        - **Hours-weighted confidence**: Category-level confidence weighted by hours saved (not simple average) for more accurate rollups.
        - **Default parameters**: 50% capture rate and 1,800 effective hours per FTE account for ramp-up time, edge cases, and real-world adoption challenges.
        - **Validated against real data**: 25-35% deflection yields 2-4 FTEs depending on ticket mix (higher deflection ≠ proportionally higher FTE if tickets are low-TTR).
-   **Assessment Results Generation**: 
    -   **V4 Reports**: Includes AI-generated strategic insights in Executive Summary, "How to Identify Valuable Use Cases" section, and CTA sections.
    -   **V5 Reports** (default): Streamlined data-focused version without LLM-generated insights. Includes:
        -   **Report Header**: Displays "AI Worker Readiness Assessment" as the main title (text-4xl md:text-5xl font-bold) with a concise subheader showing "Analysis complete for X connected tools and Y monthly tickets" (text-xl text-text-secondary). Consistent styling with email gate page.
        -   **Executive Summary**: Clean metrics display with readiness percentage badge (color dynamically matches percentage color) and key statistics. Shows Budget FTE (conservative, finance-friendly) prominently with Capacity FTE as supplementary info. Displays breakdown of Full vs Assisted automation (tickets and hours) beneath main metrics. Includes Confidence Bands section showing Expected, Conservative (P70), and Very Conservative (P90) monthly time savings scenarios with explanatory text about Budget FTE calculation methodology (50% capture rate, 1,800 effective hours per FTE). No LLM-generated insights or CTA in this section.
        -   **Opportunity Analysis**: Two distinct sections for transparency: "Full Automation Opportunities" (complete ticket deflection) and "AI-Assisted Opportunities" (reduces TTR but requires some human involvement). Each section uses single-column full-width use case cards (grid grid-cols-1 gap-6). Cards feature tool logos prominently displayed in top right (48px with circular backgrounds and borders via "prominent" prop). Title (text-2xl), category badge, and rank number positioned on left. Enhanced metrics section uses text-3xl numbers with subtle bg-bg-primary/50 background and improved spacing. Description uses text-lg. Collapsible "How it works" section at bottom. No fit scores, deployment timing badges, or CTA sections displayed.
    -   **Deployment Plan**: Provides a comprehensive "Get Started Plan" with standard HTML tables including 3-column timeline with phases formatted as two lines (e.g., "Phase One" / bold "Integration Setup"), required assets section renamed to "What You Will Need to Collect" with 4 detailed categories (Rules, Data, Connections, Stakeholder Alignment), and internal alignment for 7 stakeholder roles. All messaging is vendor-agnostic. Text sizing uses text-lg for consistency.
    -   **Expected Outcomes**: Details pilot metrics, before/after scenarios, and team capacity gains.
    -   **Call to Action**: CustomReportCTA with white button "Run the Full Discovery Assessment >" with green dot, linking to book-a-demo, preceded by description text. This CTA promotes the deeper Data Discovery and Blueprint engagement that follows this initial assessment. Button matches app-wide styling (bg-white text-black px-8 py-4 rounded-lg, centered text with green highlight dot on left and ">" on right).
-   **LLM Integration**: V4 reports use OpenAI GPT-4o for generating strategic "Key Insights" in the Executive Summary, analyzing ROI metrics, tech stack, and user context. V5 reports (default) do not use LLM-generated content.
-   **Data Handling**: Fixed critical ROI calculation bug by implementing capacity tracking to prevent ticket double-counting. Standardized number formatting and filtered irrelevant categories.

### Feature Specifications
-   **ConnectedAppLogos component**: Displays logos with hover tooltips. Supports "prominent" mode with circular backgrounds, borders, and hover scale effects for emphasizing key integrations.
-   **V5 Assessment Results**: The active assessment results experience (as of October 2025), offering API-grounded analysis and specific recommendations with a reorganized section order for clearer user flow. Available at `/report/v5/[id]` route where `[id]` can be "new" (loads from sessionStorage) or a database UUID (loads from database). Share button copies current URL to clipboard for easy sharing of persisted assessments. **Previous versions (V2-V4) archived** in `/archive/reports/` for reference.
-   **Email Gate Strategy**: After users complete the 3-step assessment, they are shown an email gate page with the message "We've identified X ways you can employ an AI Worker to deflect tickets immediately" and a button to "Unlock Full Assessment". The assessment is already saved to the database (with full analysis generated) but without email, making it durable across page refreshes. Users must enter their work email to unlock access, which updates the existing database record. This post-assessment email capture improves conversion by ensuring users are invested before requesting contact information.
-   **Assessment Data**: Captures monthly tickets, ticket distribution, email, and additional context. Each completed assessment is persisted to PostgreSQL with a unique UUID for future retrieval and sharing with sales reps.
-   **Workflow Steps Styling**: Collapsible "How it Works" section with updated number styling and toggle arrow positioned left of text.
-   **Terminology**: This tool is called an "Assessment" (both the process and output). The deeper engagement that follows is the "Data Discovery and Blueprint" service.

## Project Structure

### Active Codebase
-   `/src/app/` - Next.js app router pages (assessment flow, email gate, report v5)
-   `/src/components/` - Reusable React components organized by feature area
-   `/src/lib/` - Core business logic (engines, services, utilities)
-   `/src/data/` - Static data files (AI workers, benchmarks, tools, use case mappings)
-   `/public/` - Static assets (fonts, images) served directly

### Archive
The `/archive` directory contains deprecated code and assets preserved for reference:
-   `/archive/reports/` - Previous report versions (v2, v3, v4) and legacy components
-   `/archive/fonts/` - Duplicate font files removed from `src/components/font/`
-   `/archive/documentation/` - Development artifacts, screenshots, planning documents (180+ files from October 2025 development)

See `/archive/README.md` and subdirectory READMEs for detailed documentation of archived content and restoration instructions.

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
-   **APIs**:
    -   OpenAI GPT-4o (for LLM-generated executive insights)
-   **Integrations**:
    -   External API configurations for various tools (e.g., Ivanti, GitHub, Microsoft Teams, SAP SuccessFactors, Google Workspace services) are referenced internally via `tool-apis.json` and `use-case-mappings.json`.
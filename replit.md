# AI Worker Readiness Assessment

## Overview
This Next.js tool provides a quick AI Worker Readiness Assessment for IT teams, identifying immediate automation opportunities. It analyzes tech stack and ticket distribution to surface specific AI Worker deployment opportunities with ROI projections. This assessment aims to illustrate quick wins and immediate value, leading to a deeper Data Discovery and Blueprint engagement.

## User Preferences
- Keep codebase clean and organized
- Archive deprecated code rather than deleting it for future reference
- Maintain clear documentation of changes and archive contents

## System Architecture

### UI/UX Decisions
The application uses the official Ai.Work brand system with a custom dark theme, specific color palette, standardized spacing, and 200ms transitions. Typography uses the NB International Pro font family. The landing page features a direct "Get Your Assessment" CTA, followed by an email capture post-assessment via an email gate strategy. Assessment results are structured to prioritize algorithm analysis, concrete metrics, and immediate opportunities for IT leaders. Numbers are formatted for readability (e.g., $2.9M).

### Technical Implementations
-   **Framework & Styling**: Next.js 14.2 with TypeScript and Tailwind CSS.
-   **UI Libraries**: Framer Motion, Recharts, React Hook Form + Zod, @dnd-kit, Lucide React.
-   **Database & Persistence**: PostgreSQL (Neon-backed) with Drizzle ORM for storing assessment reports (UUID, email, JSONB for data, timestamps). API routes handle CRUD operations.
-   **HubSpot Integration**: Site-wide tracking script and integrated form for email capture.
-   **Assessment Flow**: A 3-step process (Tech Stack, Volume & Service Profile, Additional Context). Assessment data is saved to the database, then an email gate prompts for email to unlock the full report.
-   **Analysis Engines** (`src/lib/engines/`):
    -   **FeasibilityEngine**: Matches user tech stack against available APIs and use cases.
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers, incorporating a cherry-picking factor, distinguishing full automation vs. assisted, using conservative automation rates (60-75%), and tracking capacity.
    -   **ROICalculator**: Calculates conservative, finance-friendly ROI, distinguishing Budget FTE vs. Capacity FTE, tracking full vs. assisted automation separately, and providing confidence bands (Expected, Conservative P70, Very Conservative P90) based on hours-weighted confidence. Default parameters include a 50% capture rate and 1,800 effective hours per FTE.
-   **Assessment Results Generation**: V5 reports (default) provide a streamlined, data-focused version without LLM-generated insights. It includes a header, an Executive Summary with readiness percentage, key statistics, and confidence bands, and an Opportunity Analysis section with separate "Full Automation Opportunities" and "AI-Assisted Opportunities" using single-column use case cards. A "Deployment Plan" and "Expected Outcomes" section are included, followed by a Call to Action.
-   **LLM Integration**: V4 reports used OpenAI GPT-4o for strategic insights; V5 reports do not.

### Feature Specifications
-   **ConnectedAppLogos component**: Displays logos with hover tooltips and "prominent" mode.
-   **V5 Assessment Results**: The active assessment results experience (as of October 2025), offering API-grounded analysis and specific recommendations via `/report/v5/[id]`.
-   **Email Gate Strategy**: Post-assessment, users encounter an email gate to unlock the full report, which updates their existing database record with their email.
-   **Assessment Data**: Captures monthly tickets, distribution, email, and context, persisted with a unique UUID.
-   **Terminology**: The tool is an "Assessment"; the follow-up is "Data Discovery and Blueprint."

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
-   **APIs**:
    -   OpenAI GPT-4o (used in V4 reports)
-   **Integrations**:
    -   External API configurations referenced internally via `tool-apis.json` and `use-case-mappings.json` (e.g., Ivanti, GitHub, Microsoft Teams, SAP SuccessFactors, Google Workspace).
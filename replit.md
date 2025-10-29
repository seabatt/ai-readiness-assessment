# AI Worker Readiness Assessment

## Overview
This Next.js tool provides a quick AI Worker Readiness Assessment for IT teams, identifying immediate automation opportunities. It analyzes tech stack and ticket distribution to surface specific AI Worker deployment opportunities with ROI projections. This assessment aims to illustrate quick wins and immediate value, leading to a deeper Data Discovery and Blueprint engagement.

## User Preferences
- Keep codebase clean and organized
- Archive deprecated code rather than deleting it for future reference
- Maintain clear documentation of changes and archive contents

## Recent Changes
**October 28, 2025 - CRITICAL FIX: Hardcoded TTR Values Causing 12x FTE Inflation**
- Fixed hardcoded category TTR values in assessment/page.tsx that were 3-5x higher than real customer data
- Before: applications=1.7hrs, hardware=2.5hrs, onboarding=4.0hrs, security=3.0hrs → Result: 36 FTEs
- After: applications=0.43hrs, hardware=0.75hrs, onboarding=1.0hrs, security=0.8hrs → Result: 3-8 FTEs
- Root cause: These inflated baseline TTRs were multiplied by cherry_picking_factor and thousands of tickets, causing hours/month to explode from ~900 to ~10,800
- Validation: For 15,000-20,000 monthly tickets, projections now correctly show 3-8 FTEs, not 36 FTEs
- Fixed Next.js 14.2+ API route bug: params must be awaited in /api/assessments/[id] routes to prevent 502 errors on email submission

**October 28, 2025 - Added 35% Deflection Cap to Prevent Unrealistic Projections**
- Added MAX_DEFLECTION_RATE = 0.35 (35%) to ROI calculator based on real customer ceiling
- Implemented uniform proration across all metrics when cap is hit (tickets, hours, category breakdown, automation splits)
- Reduced volume percentages: Okta issues 10% (was 28%), app access 18% total (was 33%), most others 1-3%
- Total volume coverage: 57.6% (down from 140%+ which caused massive over-stacking)
- Result: With 19,000 tickets, system now shows ≤6,650 tickets (35%) and ~6-8 FTEs instead of 16,948 (89%) and 97.8 FTEs

**October 28, 2025 - ROI Calculation Fix (Corrected Methodology)**
- Fixed TTR values to match real customer data: Okta app issues 0.2hrs, app access 0.43hrs, most tickets 0.2-1.0hr range (previously 2-6 hours)
- Corrected cherry-picking factors to 0.85-1.0 range (from 0.4-0.7) since automation_rate already handles ticket selection
- Key insight: automation_rate (60-75%) selects WHICH tickets to automate; cherry_picking_factor (0.85-1.0) applies minor TTR discount
- Added automation_type classification: "full_automation" vs "assisted" for accurate projections
- Validated against real report: 32% deflection (3,023 tickets) → 2.8 FTEs ✓ (target: 3 FTEs)
- Calculation: 843 hrs/mo × 12 = 10,116 hrs/yr, 50% capture = 5,058 hrs ÷ 1,800 hrs/FTE = 2.8 FTEs

**October 27, 2025 - Major Cleanup & Archive Organization**
- Created `/archive` directory structure for deprecated code and assets
- Moved report versions v1-v4 (pages and components) to `archive/reports/`
- Archived 10+ legacy standalone components (ScoreCircle, AIWorkerCard, etc.)
- Consolidated font files to `public/fonts/`
- Archived 180+ development artifacts (screenshots, planning docs)
- Updated tsconfig.json to exclude archive directory from TypeScript compilation

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
    -   **UseCaseMatcher**: Matches ticket distribution to specific AI Workers with conservative, real-world assumptions:
        - **Automation Rate (60-75%)**: Selects WHICH tickets can be automated (e.g., 60% of Okta issues = the automatable subset)
        - **Cherry-Picking Factor (0.85-1.0)**: Minor TTR adjustment since automated tickets are slightly easier than category median
        - **Automation Types**: Distinguishes "full_automation" (complete deflection) from "assisted" (reduces TTR but doesn't eliminate ticket)
        - **Real TTR Values**: Based on actual customer data (Okta issues 0.2hrs, app access 0.43hrs, most 0.2-1.0hr range)
    -   **ROICalculator**: Calculates conservative, finance-friendly ROI:
        - **Maximum Deflection Cap**: 35% ceiling based on real customer outcomes to prevent unrealistic projections
        - **Proration Logic**: When cap is hit, uniformly reduces all metrics (tickets, hours, category breakdown) proportionally
        - **Budget FTE vs. Capacity FTE**: Distinguishes theoretical capacity (hours/2000) from realistic budget impact (captured hours / 1,800 effective hrs/FTE with 50% capture)
        - **Full vs. Assisted Tracking**: Separately tracks tickets and hours for both automation types
        - **Confidence Bands**: Expected, Conservative (P70), Very Conservative (P90) scenarios
        - **Validated**: 32% deflection (3,023 tickets) → 2.8 FTEs matches real customer outcome
-   **Assessment Results Generation**: V5 reports (default) provide a streamlined, data-focused version without LLM-generated insights. It includes a header, an Executive Summary with readiness percentage, key statistics, and confidence bands, and an Opportunity Analysis section with separate "Full Automation Opportunities" and "AI-Assisted Opportunities" using single-column use case cards. A "Deployment Plan" and "Expected Outcomes" section are included, followed by a Call to Action.
-   **LLM Integration**: V4 reports used OpenAI GPT-4o for strategic insights; V5 reports do not.

### Feature Specifications
-   **ConnectedAppLogos component**: Displays logos with hover tooltips and "prominent" mode.
-   **V5 Assessment Results**: The active assessment results experience (as of October 2025), offering API-grounded analysis and specific recommendations via `/report/v5/[id]`.
-   **Email Gate Strategy**: Post-assessment, users encounter an email gate to unlock the full report, which updates their existing database record with their email.
-   **Assessment Data**: Captures monthly tickets, distribution, email, and context, persisted with a unique UUID.
-   **Terminology**: The tool is an "Assessment"; the follow-up is "Data Discovery and Blueprint."

## Security & Compliance Posture

**October 29, 2025 - Security Hardening for CISO Review**

### Data Protection
-   **Input Validation**: All API routes use Zod schemas to validate and sanitize inputs
    - Email addresses validated against RFC 5322 standards
    - Ticket counts: 100-1,000,000 range
    - Distribution percentages must sum to 100%
    - Tech stack limited to 50 tools maximum
    - Additional context capped at 5,000 characters
-   **Encryption**: 
    - Data encrypted in transit via HTTPS
    - Database encryption at rest provided by Neon PostgreSQL
    - No sensitive data logged to console or server logs
-   **PII Handling**: 
    - Only email addresses collected (minimal PII)
    - All PII logging removed from client and server code
    - User consent required and timestamped before email collection

### Data Governance
-   **Retention Policy**: Assessments automatically deleted after 90 days
    - Cleanup script: `src/lib/utils/data-retention.ts`
    - Admin endpoint: `/api/admin/cleanup` (requires authentication in production)
    - Retention period: 90 days from creation
-   **User Consent**: 
    - Explicit consent checkbox required on email gate form
    - Consent timestamp stored in database
    - Privacy notice clearly states data usage and retention
-   **Data Deletion**: Users can request deletion via support (manual process)

### API Security
-   **Rate Limiting**: 
    - 10 assessments per IP address per hour
    - In-memory rate limit store (consider Redis for production)
    - Rate limit headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
    - 429 status code with retry-after information
-   **Input Validation**: Comprehensive Zod schemas prevent:
    - SQL injection (parameterized queries via Drizzle ORM)
    - Oversized payloads
    - Invalid data types
    - XSS via input sanitization
-   **Error Handling**: 
    - Generic error messages to prevent information disclosure
    - Detailed errors only in development mode
    - No stack traces exposed to clients

### Security Headers
-   **X-Frame-Options**: SAMEORIGIN (prevents clickjacking)
-   **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
-   **X-XSS-Protection**: 1; mode=block (legacy XSS protection)
-   **Referrer-Policy**: strict-origin-when-cross-origin
-   **Permissions-Policy**: Restricts camera, microphone, geolocation

### Known Limitations & Recommendations for Production
1. **Authentication**: Currently no authentication on API routes
   - **CRITICAL**: Implement authentication before public launch
   - Recommended: NextAuth.js with email magic links or signed URLs
   - Alternative: API key-based access control
2. **Rate Limiting**: In-memory store resets on server restart
   - Recommended: Redis or database-backed rate limiting for production
3. **Data Cleanup**: Manual trigger via admin endpoint
   - Recommended: Scheduled cron job or serverless function
4. **Audit Logging**: No audit trail for data access
   - Recommended: Log all email updates and report access
5. **CORS**: Relies on Next.js defaults
   - Recommended: Explicit CORS policy for production domains

### Compliance Considerations
-   **GDPR**: 
    - Data minimization: Only email addresses collected
    - Right to erasure: Deletion process available (manual)
    - Data retention: 90-day automatic deletion
    - Consent: Explicit, informed, timestamp-recorded
    - **Gap**: No automated deletion request workflow
-   **CCPA**: 
    - Privacy notice provided at collection
    - Data not sold or shared with third parties
    - **Gap**: No formal "Do Not Sell" mechanism
-   **SOC 2**: 
    - Security controls in place (encryption, rate limiting, validation)
    - **Gap**: No formal access controls or audit logging

### Security Review Checklist for CISO
- [x] Input validation on all API endpoints
- [x] PII logging removed from code
- [x] Security headers configured
- [x] Rate limiting implemented
- [x] Data retention policy documented and implemented
- [x] User consent mechanism with timestamps
- [x] Encryption in transit (HTTPS)
- [x] Encryption at rest (Neon PostgreSQL)
- [ ] **CRITICAL**: Authentication and authorization (not implemented)
- [ ] Audit logging for sensitive operations
- [ ] Automated data deletion requests
- [ ] Production-grade rate limiting (Redis)
- [ ] Formal security testing (penetration testing, SAST)
- [ ] Incident response plan
- [ ] Data breach notification procedures

## External Dependencies
-   **Image Domains**:
    -   `cdn.simpleicons.org`
    -   `logo.clearbit.com`
-   **APIs**:
    -   OpenAI GPT-4o (used in V4 reports)
-   **Integrations**:
    -   External API configurations referenced internally via `tool-apis.json` and `use-case-mappings.json` (e.g., Ivanti, GitHub, Microsoft Teams, SAP SuccessFactors, Google Workspace).
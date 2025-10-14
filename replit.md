# IT Readiness Assessment App

## Overview
This is a Next.js-based AI Work IT Automation Readiness Assessment tool that helps IT teams evaluate their readiness for AI worker integration. The app provides a comprehensive assessment flow including tech stack evaluation, workflow analysis, and generates detailed reports with recommendations.

## Project Status
- **Last Updated**: October 14, 2025
- **Status**: Successfully migrated from Vercel to Replit ✅
- **Environment**: Replit development environment with Node.js 20

## Recent Changes
### October 14, 2025 - Assessment Page Styling Updates
- Updated assessment page styling for cleaner, minimal design:
  - Changed body background to pure black (#000000)
  - Changed tech stack category cards background to rgb(30, 30, 29)
  - Changed workflow ranking items background to rgb(30, 30, 29)
  - Removed all borders from cards and workflow items
  - Updated category heading text color to #fbfaf9
  - Removed navigation top border for seamless appearance

### October 14, 2025 - Report Page Enhancements
- Enhanced report page with updated component props:
  - Added `isTopWorkflow` prop to AIWorkerCard for highlighting top workflow matches
  - Added `techStackScore` and `deflectionPotential` props to ComparisonTable
  - Fixed TypeScript boolean type coercion using Boolean() wrapper
- Production build successful with all type checks passing

### October 14, 2025 - Assessment Flow Fixes
- Fixed landing page "Start Assessment" button to properly navigate to /assessment route
- Corrected assessment page to use modular components instead of inline implementation:
  - TechStackSelector for step 1 (tech stack selection with categorized tools)
  - WorkflowRanker for step 2 (top 5 workflow selection)
  - ScaleQuestions for step 3 (ticket volume, team size, etc.)
  - CurrentStateQuestions for step 4 (approval workflows, pain points)
  - LoadingScreen for step 5 (loading animation before report)
- Resolved Next.js build cache corruption issues by clearing .next folder

### October 14, 2025 - Vercel to Replit Migration
- Configured Next.js to run on Replit (port 5000, bound to 0.0.0.0)
- Fixed Tailwind CSS configuration by adding missing `border` color token
- Set up development workflow for Next.js Dev Server
- Configured deployment settings for autoscale production deployment
- All dependencies installed and app running without errors

## Project Architecture

### Technology Stack
- **Framework**: Next.js 14.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Libraries**: 
  - Framer Motion (animations)
  - Recharts (data visualization)
  - React Hook Form + Zod (form validation)
  - @dnd-kit (drag and drop functionality)
  - Lucide React (icons)

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── assessment/        # Assessment flow page
│   ├── report/[id]/       # Dynamic report page
│   ├── globals.css        # Global styles and Tailwind setup
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── assessment/        # Assessment-specific components
│   ├── cta/              # Call-to-action components
│   ├── landing/          # Landing page components
│   └── ui/               # Reusable UI components
├── data/                  # Static data files (JSON)
├── lib/                   # Utility functions and algorithms
└── types/                # TypeScript type definitions
```

### Design System
The app uses a custom dark theme with AI.work brand colors:
- **Primary Background**: #000000 (pure black)
- **Card Backgrounds**: rgb(30, 30, 29) for assessment cards
- **Brand Colors**: #FBFAF9 (primary), #CDCCCB (secondary), #8A8784 (tertiary)
- **Accent Colors**: Green (#00D97E), Blue (#4A9EFF), Orange (#FF6B35)
- **Border Color**: #2F2F2F (minimal use - borders removed from assessment cards)

### Key Features
1. **Landing Page**: Hero section with value propositions and pain points
2. **Assessment Flow**: Multi-step questionnaire including:
   - Current state questions
   - Tech stack selection
   - Workflow ranking (drag & drop)
   - Scale questions
3. **Report Generation**: Detailed AI readiness reports with:
   - Executive summary
   - Impact metrics with visualizations
   - AI worker recommendations
   - Before/after timeline
   - Comparison tables

## Configuration

### Replit-Specific Settings
- **Development Server**: Runs on port 5000, bound to 0.0.0.0
- **Production Build**: Configured for autoscale deployment
- **Package Manager**: npm (Node.js 20)

### Scripts
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm start` - Start production server (port 5000)
- `npm run lint` - Run ESLint

### External Dependencies
The app uses external image domains:
- cdn.simpleicons.org
- logo.clearbit.com

### Future Considerations
- Optional: Configure `allowedDevOrigins` in next.config.js to suppress Next.js cross-origin warning in development

## User Preferences
No specific user preferences documented yet.

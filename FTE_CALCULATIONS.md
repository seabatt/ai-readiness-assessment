# FTE Calculation Methodology

## Overview

This document explains how the AI Worker Readiness Assessment calculates Full-Time Equivalent (FTE) savings projections. These calculations are based on real customer data and are designed to be **conservative and defensible** for finance teams.

## What Are FTEs?

**FTE (Full-Time Equivalent)** represents the number of full-time employees whose work could be eliminated or reassigned through automation. We calculate two types:

1. **Capacity FTE** - Theoretical maximum based on total hours saved
2. **Budget FTE** - Realistic budget impact accounting for capture rate

**We display Budget FTE to users** because it's more conservative and finance-friendly.

## Data Sources

All calculation parameters are derived from **real customer data**, not theoretical estimates:

### Time to Resolve (TTR) Values

Category-level baselines are stored in `src/app/assessment/page.tsx`:

```typescript
applications: 0.43 hours    // Based on app access ticket analysis
hardware: 0.75 hours        // Based on hardware support tickets
onboarding: 1.0 hours       // Based on employee onboarding workflows
security: 0.8 hours         // Based on security/compliance tickets
```

Use case-specific TTRs are in `src/data/use-case-mappings.json`:

```json
{
  "typical_ttr_hours": 0.43,  // Median time for this specific ticket type
  "automation_rate": 0.75,     // 75% of these tickets can be automated
  "cherry_picking_factor": 0.9 // Automated tickets are 90% of median TTR
}
```

**Important:** TTR values must be based on **actual ticket data**, not estimates. Most IT tickets resolve in 0.2-1.0 hours, not 2-6 hours.

### Real Customer Validation

Our calculations are validated against a real customer outcome:
- **Input:** 9,500 monthly tickets
- **Deflection:** 3,023 tickets/month (32%)
- **Hours saved:** 843 hours/month
- **Projected FTEs:** 2.8 budget FTEs
- **Actual result:** 3 FTEs eliminated ✓

## The Math: Step-by-Step

### Step 1: Match Use Cases to Ticket Distribution

The `UseCaseMatcher` identifies which AI Workers can handle which tickets:

```typescript
// Example: Okta access requests
const monthlyVolume = 1,200 tickets
const automation_rate = 0.75  // 75% can be automated
const deflectable = 1,200 × 0.75 = 900 tickets/month
```

### Step 2: Calculate Hours Saved (Cherry-Picking Effect)

AI Workers automate the **easier tickets first**, not a random sample:

```typescript
// Category baseline TTR
const category_ttr = 0.43 hours

// Cherry-picking factor: automated tickets are easier
const cherry_picking_factor = 0.9

// Adjusted TTR for automated tickets
const adjusted_ttr = 0.43 × 0.9 = 0.387 hours

// Hours saved per month
const hours_saved = 900 tickets × 0.387 hours = 348.3 hours/month
```

**Key Insight:** `automation_rate` selects WHICH tickets (75%), `cherry_picking_factor` adjusts TTR (0.9x) because automated tickets are slightly easier.

### Step 3: Apply Maximum Deflection Cap

**Real-world ceiling:** No customer has exceeded 35% deflection rate.

```typescript
const MAX_DEFLECTION_RATE = 0.35  // 35% hard cap

// Example with 15,000 monthly tickets
const max_deflectable = 15,000 × 0.35 = 5,250 tickets

// If use cases suggest 6,000 tickets, prorate everything
if (raw_tickets > max_deflectable) {
  const proration = 5,250 / 6,000 = 0.875
  
  // Apply uniformly to ALL metrics
  final_tickets = 6,000 × 0.875 = 5,250
  final_hours = hours × 0.875
  category_breakdown = each × 0.875
  full_automation = full × 0.875
  assisted = assisted × 0.875
}
```

### Step 4: Calculate Confidence Bands

```typescript
// Weighted confidence based on hours (not ticket count)
const confidence = Σ(use_case.confidence × use_case.hours) / total_hours
// Typical range: 0.85-0.95

// Three scenarios
const expected_hours = total_hours × confidence
const p70_hours = total_hours × max(confidence - 0.10, 0.4)  // Conservative
const p90_hours = total_hours × max(confidence - 0.20, 0.3)  // Very conservative
```

### Step 5: Convert to FTEs

```typescript
// CAPACITY FTE (theoretical maximum)
const capacity_fte = (total_hours_saved × 12 months) / 2000 hours

// BUDGET FTE (realistic budget impact) - THIS IS WHAT WE DISPLAY
const capture_rate = 0.5  // 50% of saved time is realizable
const effective_hours_per_fte = 1800  // Actual productive hours/year

const annual_captured_hours = expected_hours × 12 × capture_rate
const budget_fte = annual_captured_hours / effective_hours_per_fte

// Annual value
const fully_loaded_cost = $100,000 per FTE
const annual_value = budget_fte × fully_loaded_cost
```

## Complete Example

**Scenario:** 18,000 monthly tickets with typical distribution

### Input
```
Monthly tickets: 18,000
Distribution:
  - Applications (24%): 4,320 tickets × 0.43 hrs = 1,858 hrs
  - Security (25%): 4,500 tickets × 0.8 hrs = 3,600 hrs
  - Hardware (18%): 3,240 tickets × 0.75 hrs = 2,430 hrs
  - Onboarding (10%): 1,800 tickets × 1.0 hrs = 1,800 hrs
  - Other (23%): varies
```

### Processing
```
1. Use Case Matcher finds automatable tickets:
   - Raw deflectable: ~7,200 tickets (before cap)
   - Hours without cap: ~2,400 hrs/month

2. Apply 35% deflection cap:
   - Max tickets: 18,000 × 0.35 = 6,300 tickets
   - Proration: 6,300 / 7,200 = 0.875
   - Final tickets: 6,300/month
   - Final hours: 2,400 × 0.875 = 2,100 hrs/month

3. Apply cherry-picking & confidence:
   - Expected hours: 2,100 × 0.90 = 1,890 hrs/month
   - P70 (conservative): 2,100 × 0.80 = 1,680 hrs/month

4. Calculate FTEs:
   - Annual captured: 1,890 × 12 × 0.5 = 11,340 hrs
   - Budget FTE: 11,340 / 1,800 = 6.3 FTEs
   - Annual value: 6.3 × $100K = $630,000
```

### ⚠️ WRONG (Old Broken Calculation)
```
Using old inflated TTR values:
  - Security: 4,500 × 3.0 hrs = 13,500 hrs (WRONG!)
  - Applications: 4,320 × 1.7 hrs = 7,344 hrs (WRONG!)
  - Total: ~10,800 hrs/month → 36 FTEs ❌
```

## Key Constraints & Safeguards

### 1. Maximum Deflection Cap (35%)
```typescript
// Enforced in: src/lib/engines/roi-calculator.ts
private readonly MAX_DEFLECTION_RATE = 0.35;

// No matter what, tickets ≤ total_monthly_tickets × 0.35
```

### 2. TTR Value Ranges
```typescript
// All TTR values must be in this range
const VALID_TTR_RANGE = [0.2, 1.5] hours

// Most should be 0.2-1.0 hours
// Only complex workflows (onboarding, offboarding) reach 1.0-1.5
```

### 3. Automation Rate Bounds
```typescript
// Realistic automation rates
const AUTOMATION_RATE_RANGE = [0.60, 0.75]

// 60-75% of tickets in a category can be automated
// Never 90-100% (unrealistic)
```

### 4. Cherry-Picking Factor
```typescript
// Automated tickets are slightly easier than median
const CHERRY_PICKING_RANGE = [0.85, 1.0]

// 0.9 is typical: automated tickets are 90% of median TTR
// Never below 0.85 (too aggressive)
```

### 5. Volume Percentage Stacking
```typescript
// Total typical_volume_pct across all use cases
const TOTAL_VOLUME_COVERAGE = ~0.60 (60% max)

// Individual use cases typically:
// - High-volume: 6-10% (Okta access, app requests)
// - Medium: 3-5% (group management, password resets)
// - Low: 1-2% (complex workflows)
```

## File Locations

### Configuration Files
- **Category TTRs**: `src/app/assessment/page.tsx` (lines 60-70)
- **Use Case Data**: `src/data/use-case-mappings.json`
- **Benchmarks**: `src/data/benchmarks.json`

### Calculation Engines
- **ROI Calculator**: `src/lib/engines/roi-calculator.ts`
- **Use Case Matcher**: `src/lib/engines/use-case-matcher.ts`
- **Feasibility Engine**: `src/lib/engines/feasibility-engine.ts`

### Display Components
- **Executive Summary**: `src/components/assessment/report/v5/ExecutiveSummary.tsx`
- **Opportunity Analysis**: `src/components/assessment/report/v5/OpportunityAnalysis.tsx`

## How to Validate Calculations

### 1. Sanity Check FTE Range
```typescript
// For typical IT organizations (10,000-30,000 tickets/month)
const EXPECTED_FTE_RANGE = [2, 12]

// If outside this range, investigate:
if (budget_fte < 2) {
  // Check: TTR values too low? Automation rates too conservative?
}
if (budget_fte > 12) {
  // Check: TTR values inflated? Cap not applied? Volume stacking?
}
```

### 2. Verify Deflection Percentage
```typescript
const deflection_pct = (automatable_tickets / total_tickets) × 100

// Should NEVER exceed 35%
assert(deflection_pct <= 35, "Deflection cap not applied!")

// Typical range: 25-35%
```

### 3. Check Hours per Ticket
```typescript
const avg_hours_per_ticket = total_hours_saved / automatable_tickets

// Should be in range [0.2, 1.0] for most scenarios
// If > 1.0, check for inflated TTR values
```

### 4. Validate Against Real Data
```typescript
// Known good scenario (real customer)
const validation = {
  input_tickets: 9500,
  deflected_tickets: 3023,
  monthly_hours: 843,
  budget_fte: 2.8
}

// Your calculation should match ±10%
```

## How to Update Data Safely

### Updating Category TTR Values

**Location:** `src/app/assessment/page.tsx`

```typescript
// ✅ CORRECT: Based on real ticket data
const categoryMapping = {
  applications: {key: 'app_access', ttr: 0.43},  // From 500+ tickets
  hardware: {key: 'hardware', ttr: 0.75},        // From 300+ tickets
}

// ❌ WRONG: Guesswork or theoretical
const categoryMapping = {
  applications: {key: 'app_access', ttr: 2.0},  // NO! Too high!
}
```

**Process:**
1. Export ticket data from ITSM system
2. Calculate median resolution time (not mean - median is more robust)
3. Filter out outliers (>2 hours typically indicates escalation)
4. Update TTR value
5. Run validation test (see below)

### Updating Use Case Data

**Location:** `src/data/use-case-mappings.json`

```json
{
  "typical_ttr_hours": 0.43,      // Median from real tickets
  "automation_rate": 0.75,         // Conservative estimate (60-75%)
  "cherry_picking_factor": 0.9,   // Typically 0.85-1.0
  "typical_volume_pct": 0.08,     // % of total tickets (sum ≤ 60%)
  "confidence": 0.95              // 0.7-0.95 based on API maturity
}
```

**Validation Checklist:**
- [ ] `typical_ttr_hours` is 0.2-1.5 hours
- [ ] `automation_rate` is 0.60-0.75
- [ ] `cherry_picking_factor` is 0.85-1.0
- [ ] `typical_volume_pct` is reasonable (most 0.01-0.10)
- [ ] Sum of all `typical_volume_pct` ≤ 0.60
- [ ] `confidence` is 0.70-0.95

### Testing Changes

After updating any calculation parameters:

```bash
# 1. Clear build cache
rm -rf .next

# 2. Rebuild
npm run build

# 3. Run dev server
npm run dev

# 4. Test with known scenarios
# Scenario 1: 15,000 tickets → expect 3-8 FTEs
# Scenario 2: 9,500 tickets → expect ~3 FTEs
# Scenario 3: 25,000 tickets → expect 8-12 FTEs

# 5. Verify deflection cap is hit
# With high ticket counts, should see exactly 35% deflection
```

## Common Issues & Fixes

### Issue: FTE Projections Too High (>20 FTEs)

**Symptoms:** Budget FTE shows 30-50 FTEs for normal ticket volumes

**Root Cause:** Inflated TTR values

**Fix:**
```typescript
// Check category TTRs in assessment/page.tsx
// Should be 0.43-1.0, NOT 1.7-4.0

// Before (WRONG):
hardware: {ttr: 2.5}  // ❌

// After (CORRECT):
hardware: {ttr: 0.75}  // ✓
```

### Issue: FTE Projections Too Low (<1 FTE)

**Symptoms:** Budget FTE shows 0.5 FTEs for 20,000 tickets/month

**Root Cause:** 
- TTR values too conservative
- Automation rates too low
- Not enough use cases matched

**Fix:**
1. Verify TTR values match real ticket data
2. Check automation_rate is 60-75%, not 30-40%
3. Ensure tech stack matching is working (check feasibility results)

### Issue: Deflection Exceeds 35%

**Symptoms:** More than 35% of tickets shown as automatable

**Root Cause:** Deflection cap not being applied

**Fix:**
```typescript
// Check roi-calculator.ts line 63
const maxDeflectableTickets = totalMonthlyTickets * this.MAX_DEFLECTION_RATE;

// Ensure this is 0.35, not higher
private readonly MAX_DEFLECTION_RATE = 0.35;
```

### Issue: Numbers Don't Match Real Customer Data

**Symptoms:** Projections significantly different from known outcomes

**Fix:**
1. Run validation scenario (9,500 tickets → 2.8 FTEs)
2. Check proration factor is being applied correctly
3. Verify confidence weighting isn't inflating/deflating results
4. Ensure capture_rate is 0.5 (50%)

## Formula Reference Card

### Quick Reference
```
Deflectable Tickets = min(
  Σ(category_volume × automation_rate),
  total_tickets × 0.35
)

Hours per Ticket = category_ttr × cherry_picking_factor

Total Hours = Σ(deflectable_tickets × hours_per_ticket)

Expected Hours = total_hours × weighted_confidence

Captured Hours = expected_hours × 12 months × 0.5 capture

Budget FTE = captured_hours / 1800 effective_hours

Annual Value = budget_fte × $100,000
```

## Change Log

**October 28, 2025** - Fixed critical bug where category TTR values were 3-5x too high
- Updated applications: 1.7 → 0.43 hrs
- Updated hardware: 2.5 → 0.75 hrs  
- Updated onboarding: 4.0 → 1.0 hrs
- Updated security: 3.0 → 0.8 hrs
- Result: FTE projections dropped from 36 to 3-8 (realistic range)

## Support

For questions or issues with FTE calculations:
1. Review this document
2. Check `replit.md` for recent changes
3. Validate against known customer data
4. Test with the validation scenarios above

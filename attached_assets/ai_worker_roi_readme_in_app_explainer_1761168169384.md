# How We Calculate Your ROI

This guide explains—in plain English—how the app turns your ticket data into **hours saved**, **FTE impact**, and **dollar value**. No engineering needed to follow along.

---

## 1) The Short Version
1) You tell us your **ticket volumes** and the **average hands‑on time** it takes a person to handle them.
2) Based on your **tech stack**, we identify **AI Workers** (use cases) that can either fully handle or greatly speed up those tickets.
3) We **avoid double‑counting** by only using the remaining tickets in each category as we add use cases.
4) We translate time saved into two views:
   - **Capacity FTE** (operational headroom)
   - **Budget FTE** (realistic financial impact)
5) We apply **confidence** and show **Expected / P70 / P90** ranges so you can choose how conservative you want to be.

---

## 2) What We Need From You
- **Total monthly tickets** (e.g., 1,000)
- **Ticket categories** with volumes and average hands‑on time per ticket (in hours). Examples:
  - App access changes
  - Within‑app actions
  - Distribution list updates
  - Hardware requests
  - Onboarding/offboarding

> Tip: Use **hands‑on time** (how long a person actually works on it), not wall‑clock time from “opened” to “closed.”

---

## 3) What We Add
- A library of **AI Workers** (prebuilt automations) mapped to common IT tasks
- For each worker:
  - **Automation rate** (what share of tickets it can handle or accelerate)
  - **Confidence** (how likely the results match real life)
  - Optional **micro‑touch time** (if humans still do a quick check/approval)

---

## 4) How Savings Are Calculated
For each matching worker:
- We determine how many tickets it can handle from the **remaining pool** in that category.
- We estimate **time saved per ticket**:
  - If the task is fully automated: the **full hands‑on time** is saved.
  - If it still needs a quick review/approval: we save the **difference** between the original time and the short micro‑touch (typically ~5 minutes).
- If a small share of tickets still require a person (approvals/exceptions), we reduce the savings for those.

We add up the hours across all workers to get **total hours saved per month**. If totals ever exceed your overall ticket count, we automatically **cap and scale** the result so it stays realistic.

---

## 5) Confidence & Ranges
Not every organization sees the same outcomes. Each worker has a **confidence score**. We weight savings by confidence and present:
- **Expected** (our best estimate)
- **P70** (conservative)
- **P90** (more conservative)

This gives you a range to share with stakeholders depending on your risk tolerance.

---

## 6) From Hours → FTE → Dollars
- **Capacity FTE** shows operational headroom (hours saved converted to an annualized FTE using 2,000 hours/FTE). It’s useful for planning workload and SLAs.
- **Budget FTE** reflects what typically turns into budget‑relevant capacity. We apply:
  - a **capture rate** (how much saved time becomes truly usable—default 50%), and
  - **effective hours per FTE** (realistic annual working hours—default 1,800).

We then multiply **Budget FTE** by your **fully loaded cost per FTE** (default $100,000) to estimate **annual dollar value**.

---

## 7) Example (Illustrative)
- 1,000 tickets/month
- Categories include app access, within‑app actions, and distribution lists
- AI Workers for password resets, in‑app actions, and DL changes
- Each worker draws from its category without double‑counting, and saves either full hands‑on time or the time minus a brief review.
- Result: monthly hours saved → **Capacity FTE** (operational) → **Budget FTE** (financial) → **annual $ value**

Exact numbers depend on your inputs and how conservative you set the sliders (confidence, micro‑touch time, capture rate).

---

## 8) Guardrails That Keep Results Honest
- **No double‑counting** within a category
- **Caps** to prevent saving more tickets than you have
- **Confidence‑weighted** outcomes
- **Conservative defaults** for micro‑touch and capture rate

---

## 9) FAQs
**Why two FTE numbers?**  
Capacity FTE describes operational headroom. Budget FTE is what usually translates into budget or hiring decisions.

**Why not just divide by 2,000 and be done?**  
Because saved minutes rarely convert 1:1 into money. Capture rate and effective hours reflect how teams actually work.

**Our tickets still need approvals—does that inflate savings?**  
No. If a worker still needs a quick human touch, we subtract that micro‑touch from the saved time.

**Where do the worker confidence scores come from?**  
From real‑world maturity of the automation and how well it fits your stack. We weight savings by those scores.

**Can we make it more conservative?**  
Yes. Increase the micro‑touch time, raise the share needing approval, lower the capture rate, or use the P70/P90 ranges in reporting.

---

*Last updated: {{TODAY}}*
# Legal AI Analyzer

AI-powered contract review for legal teams. Extract clauses, detect risk, and verify regulatory compliance across your entire contract portfolio.

## The Problem

Contract review is slow, manual, and error-prone. Legal teams spend days poring over dense documents, often missing high-risk clauses buried in boilerplate. A single overlooked indemnification or non-compete can cost millions. Manual compliance checks against shifting regulations like GDPR, CCPA, and FTC rules are unsustainable. Firms need AI that finds problems before lawyers do.

## Features

### AI Contract Review
Upload PDFs, DOCX, or plain text. The analyzer extracts every clause, categorizes it (termination, liability, indemnification, IP rights, non-compete, data privacy, and more), and surfaces exactly what needs attention.

### Risk Scoring
Every clause gets a 0-100 risk score with supporting analysis. High-risk provisions like overly broad non-competes, one-sided indemnification, or missing data processing terms are flagged with concrete recommendations.

### Compliance Checking
Automated checks against GDPR, CCPA, DTSA, UCC, FTC rules, and state employment laws. See which contracts pass, which fail, and which need manual review.

### Review Queue
Dashboard view of every contract in flight. Status dots, risk bars, and clause counts give your team instant visibility into what needs action.

### Risk Heatmap
See where risk concentrates across your portfolio. Which clause categories are consistently problematic? Where should your team focus negotiation efforts?

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run test       # Run test suite
npm run lint       # Lint check
npm run typecheck  # TypeScript check
```

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS**
- **Vitest** (testing)

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout with nav bar
    page.tsx        # Dashboard: stats, queue, clauses, heatmap, compliance, timeline
    globals.css     # Base styles
  components/
    ui.tsx          # Badge, Card, ProgressBar, StatusDot, StatCard
  types.ts          # Contract, Clause, RiskAssessment, ComplianceCheck, etc.
  demo-data.ts      # 8 contracts, 25 clauses, compliance data, timeline
tests/
  legal.test.ts     # 10 vitest tests
```

## Demo Data

The dashboard ships with realistic demo data:

- **8 contracts**: NDAs, SaaS, employment, vendor, partnership, licensing agreements
- **25 extracted clauses** with risk scores, issues, and recommendations
- **10 compliance checks** against GDPR, CCPA, FTC, DTSA, UCC, and state employment laws
- **21 timeline events** showing a full review workflow

## License

Private. All rights reserved.

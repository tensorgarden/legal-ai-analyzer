import type { Contract, Clause, RiskAssessment, ComplianceCheck, ReviewTimelineEvent } from "@/types";

// ─── 8 Contracts ─────────────────────────────────────────────────────────────────

export const contracts: Contract[] = [
  {
    id: "ctr-001",
    title: "Mutual Non-Disclosure Agreement \u2014 Acme Corp & Beta Inc",
    type: "nda",
    parties: [
      { name: "Acme Corp", role: "Disclosing Party" },
      { name: "Beta Inc", role: "Receiving Party" },
    ],
    uploadedAt: "2026-06-01T09:15:00Z",
    status: "completed",
    riskScore: 12,
    riskLevel: "low",
    clauseCount: 8,
    pageCount: 4,
    summary: "Standard mutual NDA with reciprocal confidentiality obligations and a 3-year term.",
  },
  {
    id: "ctr-002",
    title: "SaaS Master Services Agreement \u2014 CloudSync Inc & RetailMax",
    type: "saas",
    parties: [
      { name: "CloudSync Inc", role: "Provider" },
      { name: "RetailMax LLC", role: "Customer" },
    ],
    uploadedAt: "2026-06-02T14:30:00Z",
    status: "in-review",
    riskScore: 64,
    riskLevel: "medium",
    clauseCount: 24,
    pageCount: 18,
    summary: "Enterprise SaaS agreement with broad limitation of liability and weak data privacy provisions.",
  },
  {
    id: "ctr-003",
    title: "Employment Agreement \u2014 Jane Smith (CTO)",
    type: "employment",
    parties: [
      { name: "NovaTech Inc", role: "Employer" },
      { name: "Jane Smith", role: "Employee" },
    ],
    uploadedAt: "2026-06-03T11:00:00Z",
    status: "flagged",
    riskScore: 78,
    riskLevel: "high",
    clauseCount: 31,
    pageCount: 22,
    summary: "Executive employment contract with overly broad non-compete and ambiguous equity vesting.",
  },
  {
    id: "ctr-004",
    title: "Vendor Supply Agreement \u2014 GlobalParts Ltd",
    type: "vendor",
    parties: [
      { name: "NovaTech Inc", role: "Buyer" },
      { name: "GlobalParts Ltd", role: "Supplier" },
    ],
    uploadedAt: "2026-06-04T08:45:00Z",
    status: "draft",
    riskScore: 45,
    riskLevel: "medium",
    clauseCount: 19,
    pageCount: 14,
    summary: "Component supply agreement with unclear delivery penalties and one-sided indemnification.",
  },
  {
    id: "ctr-005",
    title: "Software Licensing Agreement \u2014 DevTool Pro",
    type: "licensing",
    parties: [
      { name: "DevTool Inc", role: "Licensor" },
      { name: "Acme Corp", role: "Licensee" },
    ],
    uploadedAt: "2026-06-05T10:20:00Z",
    status: "needs-attention",
    riskScore: 56,
    riskLevel: "medium",
    clauseCount: 16,
    pageCount: 11,
    summary: "Per-seat license with restrictive audit rights and automatic renewal tied to price increases.",
  },
  {
    id: "ctr-006",
    title: "Partnership Agreement \u2014 Joint Venture Alpha",
    type: "partnership",
    parties: [
      { name: "NovaTech Inc", role: "Partner A" },
      { name: "GreenEnergy Co", role: "Partner B" },
    ],
    uploadedAt: "2026-06-06T16:00:00Z",
    status: "in-review",
    riskScore: 37,
    riskLevel: "low",
    clauseCount: 27,
    pageCount: 20,
    summary: "Clean energy joint venture with well-balanced governance and clear profit-sharing tiers.",
  },
  {
    id: "ctr-007",
    title: "Customer NDA \u2014 FinServe Corp",
    type: "nda",
    parties: [
      { name: "FinServe Corp", role: "Disclosing Party" },
      { name: "CloudSync Inc", role: "Receiving Party" },
    ],
    uploadedAt: "2026-06-07T13:10:00Z",
    status: "completed",
    riskScore: 8,
    riskLevel: "low",
    clauseCount: 6,
    pageCount: 3,
    summary: "One-way NDA from customer to vendor. Clean terms, low risk.",
  },
  {
    id: "ctr-008",
    title: "Employment Agreement \u2014 Marcus Rivera (Sales Director)",
    type: "employment",
    parties: [
      { name: "Acme Corp", role: "Employer" },
      { name: "Marcus Rivera", role: "Employee" },
    ],
    uploadedAt: "2026-06-08T09:30:00Z",
    status: "in-review",
    riskScore: 59,
    riskLevel: "medium",
    clauseCount: 28,
    pageCount: 19,
    summary: "Sales director contract with aggressive commission clawback and non-solicitation clauses.",
  },
];

// ─── 25 Extracted Clauses ────────────────────────────────────────────────────────

export const clauses: Clause[] = [
  // NDA (ctr-001)
  {
    id: "cl-001", contractId: "ctr-001", category: "confidentiality", title: "Definition of Confidential Information",
    text: "Confidential Information means any non-public information disclosed by either party, whether oral, written, or electronic...",
    riskScore: 5, riskLevel: "low", issues: [], recommendations: [], position: { start: 120, end: 340 },
  },
  {
    id: "cl-002", contractId: "ctr-001", category: "termination", title: "Term and Termination",
    text: "This Agreement shall remain in effect for three (3) years from the Effective Date...",
    riskScore: 8, riskLevel: "low", issues: ["3-year term may be longer than industry standard for some jurisdictions"],
    recommendations: ["Confirm 3-year term is acceptable for both parties"], position: { start: 500, end: 680 },
  },
  {
    id: "cl-003", contractId: "ctr-001", category: "governing-law", title: "Governing Law",
    text: "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware...",
    riskScore: 3, riskLevel: "low", issues: [], recommendations: [], position: { start: 800, end: 920 },
  },

  // SaaS (ctr-002)
  {
    id: "cl-004", contractId: "ctr-002", category: "liability", title: "Limitation of Liability",
    text: "Provider's total liability shall not exceed the fees paid in the 3 months preceding the claim...",
    riskScore: 72, riskLevel: "high",
    issues: ["Cap is disproportionately low for an enterprise deal", "Carve-outs for gross negligence are missing"],
    recommendations: ["Negotiate cap to 12 months fees or $1M minimum", "Add carve-outs for gross negligence and willful misconduct"],
    evidenceAnchors: [
      { label: "MSA §9.2 Limitation of Liability", source: "contract section 9.2", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z" },
      { label: "Enterprise SaaS fallback cap playbook", source: "internal review playbook: liability caps", referenceType: "playbook", verifiedAt: "2026-06-10T12:00:00Z" },
    ],
    position: { start: 450, end: 720 },
  },
  {
    id: "cl-005", contractId: "ctr-002", category: "indemnification", title: "IP Indemnification",
    text: "Provider shall indemnify Customer against third-party claims alleging that the Service infringes any IP rights...",
    riskScore: 58, riskLevel: "medium",
    issues: ["Indemnification is limited to 'final judgments' only \u2014 excludes settlements"],
    recommendations: ["Extend to cover court-approved settlements", "Add a mutual indemnification provision"],
    position: { start: 900, end: 1140 },
  },
  {
    id: "cl-006", contractId: "ctr-002", category: "data-privacy", title: "Data Processing Terms",
    text: "Provider may process Customer Data for the purposes of providing and improving the Service...",
    riskScore: 81, riskLevel: "high",
    issues: ["'Improving the Service' grants overly broad data usage rights", "No DPA referenced", "No mention of GDPR/CCPA compliance"],
    recommendations: ["Remove 'improving the Service' or limit to aggregated anonymized data", "Attach a compliant Data Processing Addendum"],
    evidenceAnchors: [
      { label: "MSA §5.4 Data Processing", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z" },
      { label: "GDPR Article 28 processor terms", source: "GDPR Article 28", referenceType: "statute", verifiedAt: "2026-06-10T12:00:00Z" },
    ],
    position: { start: 1300, end: 1560 },
  },
  {
    id: "cl-007", contractId: "ctr-002", category: "termination", title: "Termination for Convenience",
    text: "Either party may terminate this Agreement with 30 days written notice...",
    riskScore: 22, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 1700, end: 1820 },
  },
  {
    id: "cl-008", contractId: "ctr-002", category: "payment", title: "Fees and Payment Terms",
    text: "Customer shall pay all invoiced amounts within 15 days of receipt. Late payments accrue 1.5% monthly interest...",
    riskScore: 48, riskLevel: "medium",
    issues: ["15-day payment window is aggressive", "1.5% monthly interest (18% APR) is above market"],
    recommendations: ["Negotiate to Net 30 terms", "Cap late fee at 1% monthly or state max legal rate"],
    position: { start: 1900, end: 2080 },
  },

  // Employment (ctr-003)
  {
    id: "cl-009", contractId: "ctr-003", category: "non-compete", title: "Non-Competition Covenant",
    text: "Employee agrees not to engage in any business competitive with the Company for 24 months post-termination in North America...",
    riskScore: 88, riskLevel: "high",
    issues: ["24-month non-compete is likely unenforceable in CA, OK, ND", "Geographic scope is unreasonably broad", "No consideration for post-employment restriction"],
    recommendations: ["Reduce to 6-12 months", "Limit to regions where employee actually operated", "Add garden leave or severance consideration"],
    evidenceAnchors: [
      { label: "Employment Agreement §12 Non-Competition", source: "contract section 12", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z" },
      { label: "State non-compete enforceability matrix", source: "employment compliance playbook", referenceType: "playbook", verifiedAt: "2026-06-10T12:00:00Z" },
    ],
    position: { start: 600, end: 880 },
  },
  {
    id: "cl-010", contractId: "ctr-003", category: "ip-rights", title: "IP Assignment",
    text: "Employee assigns all right, title, and interest in any inventions conceived during employment...",
    riskScore: 45, riskLevel: "medium",
    issues: ["Does not exclude inventions developed on employee's own time with own equipment"],
    recommendations: ["Add carve-out per California Labor Code 2870 or equivalent"],
    position: { start: 1000, end: 1220 },
  },
  {
    id: "cl-011", contractId: "ctr-003", category: "payment", title: "Equity Vesting Schedule",
    text: "Options shall vest over 4 years with a 1-year cliff, subject to Board discretion...",
    riskScore: 65, riskLevel: "medium",
    issues: ["'Board discretion' introduces ambiguity and risk of forfeiture", "No acceleration provisions on change of control"],
    recommendations: ["Define vesting as automatic unless cause termination", "Add single-trigger or double-trigger acceleration"],
    position: { start: 1400, end: 1600 },
  },
  {
    id: "cl-012", contractId: "ctr-003", category: "termination", title: "Termination Provisions",
    text: "Company may terminate employment at any time, with or without cause, upon 2 weeks notice...",
    riskScore: 32, riskLevel: "low",
    issues: ["At-will employment is standard but 2 weeks notice is minimal for C-suite"],
    recommendations: ["Negotiate 30-60 day notice or equivalent severance"],
    position: { start: 1800, end: 1960 },
  },

  // Vendor (ctr-004)
  {
    id: "cl-013", contractId: "ctr-004", category: "indemnification", title: "Unilateral Indemnification",
    text: "Supplier shall indemnify and hold harmless Buyer from any and all claims arising from...",
    riskScore: 70, riskLevel: "high",
    issues: ["Purely unilateral \u2014 Buyer has no reciprocal obligations", "Scope includes 'any and all claims' with no caps"],
    recommendations: ["Negotiate mutual indemnification", "Add reasonable caps and exclusions for Buyer's own negligence"],
    evidenceAnchors: [
      { label: "Vendor Agreement §7 Indemnification", source: "contract section 7", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z" },
      { label: "UCC remedies and risk allocation checklist", source: "commercial contracts playbook", referenceType: "playbook", verifiedAt: "2026-06-10T12:00:00Z" },
    ],
    position: { start: 400, end: 640 },
  },
  {
    id: "cl-014", contractId: "ctr-004", category: "termination", title: "Delivery Penalties",
    text: "Late deliveries incur a penalty of 5% of order value per day exceeding the delivery window...",
    riskScore: 60, riskLevel: "medium",
    issues: ["5% per day is punitive and may be unenforceable", "No grace period or force majeure exception"],
    recommendations: ["Cap penalties at 10-15% total", "Add 2-business-day grace period", "Cross-reference force majeure clause"],
    position: { start: 800, end: 1000 },
  },
  {
    id: "cl-015", contractId: "ctr-004", category: "force-majeure", title: "Force Majeure",
    text: "Neither party shall be liable for delays caused by circumstances beyond their reasonable control...",
    riskScore: 10, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 1200, end: 1380 },
  },

  // Licensing (ctr-005)
  {
    id: "cl-016", contractId: "ctr-005", category: "assignment", title: "Audit Rights",
    text: "Licensor may audit Licensee's usage records at any time with 48 hours notice, at Licensee's expense if underpayment exceeds 3%...",
    riskScore: 68, riskLevel: "medium",
    issues: ["'At any time' is overly broad", "Audit at Licensee's expense creates perverse incentive", "48 hours notice is insufficient"],
    recommendations: ["Limit audits to once per year", "Audit cost borne by Licensor unless underpayment exceeds 5%", "Require 30 days notice"],
    position: { start: 300, end: 540 },
  },
  {
    id: "cl-017", contractId: "ctr-005", category: "termination", title: "Auto-Renewal with Price Increase",
    text: "This Agreement renews automatically for successive 1-year terms. Licensor may adjust pricing upon renewal with 15 days notice...",
    riskScore: 55, riskLevel: "medium",
    issues: ["15-day notice for price changes is too short for budget planning", "Auto-renewal without opt-out window creates lock-in"],
    recommendations: ["Require 60-90 day notice for price changes", "Add 30-day opt-out window before renewal"],
    position: { start: 700, end: 920 },
  },
  {
    id: "cl-018", contractId: "ctr-005", category: "liability", title: "Warranty Disclaimer",
    text: "The software is provided 'AS IS' without warranty of any kind...",
    riskScore: 35, riskLevel: "low",
    issues: ["Standard for software but should include a performance warranty"],
    recommendations: ["Negotiate limited warranty that software performs in accordance with documentation"],
    position: { start: 1100, end: 1250 },
  },

  // Partnership (ctr-006)
  {
    id: "cl-019", contractId: "ctr-006", category: "governing-law", title: "Governance Structure",
    text: "The JV shall be governed by a Board of 4 directors, 2 appointed by each Partner...",
    riskScore: 18, riskLevel: "low", issues: ["Potential deadlock with even number of directors"],
    recommendations: ["Add a tie-breaking mechanism or rotating chair"], position: { start: 200, end: 420 },
  },
  {
    id: "cl-020", contractId: "ctr-006", category: "payment", title: "Profit Distribution",
    text: "Net profits shall be distributed quarterly: 60% to Partner A, 40% to Partner B until Partner B's capital contribution is recovered...",
    riskScore: 20, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 600, end: 820 },
  },
  {
    id: "cl-021", contractId: "ctr-006", category: "dispute-resolution", title: "Dispute Resolution",
    text: "Any dispute shall first be submitted to mediation, and if unresolved within 60 days, to binding arbitration under AAA rules...",
    riskScore: 12, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 1000, end: 1200 },
  },

  // FinServe NDA (ctr-007)
  {
    id: "cl-022", contractId: "ctr-007", category: "confidentiality", title: "Confidentiality Obligations",
    text: "Receiving Party shall use reasonable care to protect Confidential Information...",
    riskScore: 5, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 100, end: 280 },
  },
  {
    id: "cl-023", contractId: "ctr-007", category: "termination", title: "Survival of Obligations",
    text: "Confidentiality obligations survive termination for 5 years...",
    riskScore: 6, riskLevel: "low", issues: [], recommendations: [],
    position: { start: 400, end: 540 },
  },

  // Marcus Rivera Employment (ctr-008)
  {
    id: "cl-024", contractId: "ctr-008", category: "payment", title: "Commission Clawback Provision",
    text: "Commissions paid on sales where the customer cancels within 12 months shall be fully recoverable by the Company...",
    riskScore: 75, riskLevel: "high",
    issues: ["12-month clawback period is excessive", "Full recovery disregards work performed", "No distinction between voluntary and involuntary churn"],
    recommendations: ["Reduce clawback to 3-6 months", "Pro-rate recovery based on time elapsed", "Exclude involuntary churn (e.g., customer bankruptcy)"],
    evidenceAnchors: [
      { label: "Employment Agreement §6.3 Commission Clawback", source: "contract section 6.3", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z" },
      { label: "State wage deduction review checklist", source: "employment compensation playbook", referenceType: "playbook", verifiedAt: "2026-06-10T12:00:00Z" },
    ],
    position: { start: 400, end: 640 },
  },
  {
    id: "cl-025", contractId: "ctr-008", category: "non-compete", title: "Non-Solicitation of Customers",
    text: "Employee shall not solicit any Company customer or prospective customer for 18 months post-termination...",
    riskScore: 62, riskLevel: "medium",
    issues: ["'Prospective customer' is vague and overly broad", "18 months is at the high end for non-solicitation"],
    recommendations: ["Define prospective customer as those in active pipeline at termination date", "Reduce to 12 months"],
    position: { start: 800, end: 1040 },
  },
];

// ─── Risk Assessment Summary ──────────────────────────────────────────────────────

export const riskAssessment: RiskAssessment = {
  overallScore: 31,
  clauseCount: 25,
  highRiskCount: 6,
  mediumRiskCount: 9,
  lowRiskCount: 10,
  topRisks: [
    { category: "non-compete", score: 88, summary: "24-month non-compete likely unenforceable in multiple states" },
    { category: "data-privacy", score: 81, summary: "Broad data usage rights without DPA or GDPR/CCPA reference" },
    { category: "payment", score: 75, summary: "12-month commission clawback with full recovery" },
    { category: "liability", score: 72, summary: "Liability cap at 3 months fees, too low for enterprise" },
    { category: "indemnification", score: 70, summary: "Unilateral indemnification with unlimited scope" },
  ],
  riskHeatmap: [
    { category: "termination", count: 6, avgScore: 18 },
    { category: "liability", count: 2, avgScore: 54 },
    { category: "indemnification", count: 2, avgScore: 64 },
    { category: "confidentiality", count: 2, avgScore: 5 },
    { category: "payment", count: 4, avgScore: 52 },
    { category: "ip-rights", count: 1, avgScore: 45 },
    { category: "non-compete", count: 2, avgScore: 75 },
    { category: "governing-law", count: 2, avgScore: 11 },
    { category: "dispute-resolution", count: 1, avgScore: 12 },
    { category: "data-privacy", count: 1, avgScore: 81 },
    { category: "force-majeure", count: 1, avgScore: 10 },
    { category: "assignment", count: 1, avgScore: 68 },
  ],
};

// ─── Compliance Checks ───────────────────────────────────────────────────────────

export const complianceChecks: ComplianceCheck[] = [
  {
    id: "cmp-001", contractId: "ctr-002", regulation: "GDPR Article 28", framework: "GDPR",
    status: "fail", details: "No Data Processing Agreement. Data usage for 'improving the Service' violates purpose limitation.",
    lastChecked: "2026-06-03T10:00:00Z",
    evidenceAnchors: [
      { label: "MSA §5.4 Data Processing terms", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-03T10:00:00Z" },
      { label: "GDPR Article 28(3) processor obligations", source: "GDPR Article 28", referenceType: "statute", verifiedAt: "2026-06-03T10:00:00Z" },
    ],
  },
  {
    id: "cmp-002", contractId: "ctr-002", regulation: "CCPA Section 1798.100", framework: "CCPA",
    status: "review-required", details: "Data processing terms lack disclosure of categories of personal information collected.",
    lastChecked: "2026-06-03T10:00:00Z",
    evidenceAnchors: [
      { label: "MSA §5.4 Data Processing terms", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-03T10:00:00Z" },
      { label: "CCPA §1798.100(a) notice at collection", source: "CCPA Section 1798.100", referenceType: "statute", verifiedAt: "2026-06-03T10:00:00Z" },
    ],
  },
  {
    id: "cmp-003", contractId: "ctr-003", regulation: "California Labor Code 2870", framework: "CA Employment",
    status: "fail", details: "IP assignment clause does not exclude employee inventions developed independently.",
    lastChecked: "2026-06-04T09:00:00Z",
    evidenceAnchors: [
      { label: "Employment Agreement §10 IP Assignment", source: "contract section 10", referenceType: "contract-section", verifiedAt: "2026-06-04T09:00:00Z" },
      { label: "CA Labor Code §2870 invention exclusion", source: "California Labor Code 2870", referenceType: "statute", verifiedAt: "2026-06-04T09:00:00Z" },
    ],
  },
  {
    id: "cmp-004", contractId: "ctr-003", regulation: "FTC Non-Compete Rule (2024)", framework: "FTC",
    status: "fail", details: "Broad 24-month non-compete conflicts with FTC rule prohibiting most non-competes.",
    lastChecked: "2026-06-04T09:00:00Z",
    evidenceAnchors: [
      { label: "Employment Agreement §12 Non-Competition", source: "contract section 12", referenceType: "contract-section", verifiedAt: "2026-06-04T09:00:00Z" },
      { label: "FTC Non-Compete Clause Rule 16 CFR Part 910", source: "16 CFR Part 910", referenceType: "statute", verifiedAt: "2026-06-04T09:00:00Z" },
    ],
  },
  {
    id: "cmp-005", contractId: "ctr-001", regulation: "Trade Secrets Act (DTSA)", framework: "DTSA",
    status: "pass", details: "NDA adequately defines confidential information and reasonable protection measures.",
    lastChecked: "2026-06-02T11:00:00Z",
  },
  {
    id: "cmp-006", contractId: "ctr-004", regulation: "UCC Section 2-718", framework: "UCC",
    status: "review-required", details: "5% daily penalty may be deemed unreasonable liquidated damages under UCC.",
    lastChecked: "2026-06-05T14:00:00Z",
    evidenceAnchors: [
      { label: "Vendor Agreement §4 Delivery Penalties", source: "contract section 4", referenceType: "contract-section", verifiedAt: "2026-06-05T14:00:00Z" },
      { label: "UCC §2-718(1) liquidated damages reasonableness", source: "UCC Section 2-718", referenceType: "statute", verifiedAt: "2026-06-05T14:00:00Z" },
    ],
  },
  {
    id: "cmp-007", contractId: "ctr-005", regulation: "State Audit Laws", framework: "Software Audit",
    status: "review-required", details: "Unrestricted audit rights with short notice raise procedural fairness concerns.",
    lastChecked: "2026-06-06T12:00:00Z",
    evidenceAnchors: [
      { label: "License Agreement §3 Audit Rights", source: "contract section 3", referenceType: "contract-section", verifiedAt: "2026-06-06T12:00:00Z" },
      { label: "Software audit reasonableness playbook", source: "internal review playbook: audit rights", referenceType: "playbook", verifiedAt: "2026-06-06T12:00:00Z" },
    ],
  },
  {
    id: "cmp-008", contractId: "ctr-006", regulation: "Delaware LLC Act", framework: "DE Corporate",
    status: "pass", details: "JV governance structure complies with Delaware LLC Act requirements.",
    lastChecked: "2026-06-07T15:00:00Z",
  },
  {
    id: "cmp-009", contractId: "ctr-008", regulation: "State Wage Laws", framework: "Employment",
    status: "review-required", details: "Commission clawback may violate state wage protection statutes in some jurisdictions.",
    lastChecked: "2026-06-09T08:00:00Z",
    evidenceAnchors: [
      { label: "Employment Agreement §6.3 Commission Clawback", source: "contract section 6.3", referenceType: "contract-section", verifiedAt: "2026-06-09T08:00:00Z" },
      { label: "State wage deduction review checklist", source: "employment compensation playbook", referenceType: "playbook", verifiedAt: "2026-06-09T08:00:00Z" },
    ],
  },
  {
    id: "cmp-010", contractId: "ctr-007", regulation: "Trade Secrets Act (DTSA)", framework: "DTSA",
    status: "pass", details: "One-way NDA meets DTSA reasonable measures standard.",
    lastChecked: "2026-06-08T10:00:00Z",
  },
];

// ─── Review Timeline ──────────────────────────────────────────────────────────────

export const reviewTimeline: ReviewTimelineEvent[] = [
  {
    id: "evt-001", contractId: "ctr-001", timestamp: "2026-06-01T09:15:00Z",
    actor: "Sarah Chen", action: "Uploaded contract", detail: "Mutual NDA \u2014 Acme & Beta",
    type: "upload",
  },
  {
    id: "evt-002", contractId: "ctr-001", timestamp: "2026-06-01T09:16:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "8 clauses extracted, 1 low-priority recommendation",
    type: "analysis",
  },
  {
    id: "evt-003", contractId: "ctr-001", timestamp: "2026-06-01T14:20:00Z",
    actor: "Sarah Chen", action: "Approved", detail: "No material issues found",
    type: "approval",
  },
  {
    id: "evt-004", contractId: "ctr-002", timestamp: "2026-06-02T14:30:00Z",
    actor: "Marcus Rivera", action: "Uploaded contract", detail: "SaaS MSA \u2014 CloudSync & RetailMax",
    type: "upload",
  },
  {
    id: "evt-005", contractId: "ctr-002", timestamp: "2026-06-02T14:31:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "24 clauses extracted, 4 high-risk findings",
    type: "analysis",
  },
  {
    id: "evt-006", contractId: "ctr-002", timestamp: "2026-06-03T10:05:00Z",
    actor: "David Park", action: "Flagged data privacy clause", detail: "GDPR Article 28 compliance failure",
    type: "flag",
  },
  {
    id: "evt-007", contractId: "ctr-003", timestamp: "2026-06-03T11:00:00Z",
    actor: "HR Admin", action: "Uploaded contract", detail: "Employment Agreement \u2014 Jane Smith (CTO)",
    type: "upload",
  },
  {
    id: "evt-008", contractId: "ctr-003", timestamp: "2026-06-03T11:02:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "31 clauses extracted, non-compete flagged as critical risk",
    type: "analysis",
  },
  {
    id: "evt-009", contractId: "ctr-003", timestamp: "2026-06-04T09:15:00Z",
    actor: "Sarah Chen", action: "Escalated non-compete clause", detail: "Likely unenforceable under FTC rule and CA law",
    type: "flag",
  },
  {
    id: "evt-010", contractId: "ctr-004", timestamp: "2026-06-04T08:45:00Z",
    actor: "David Park", action: "Uploaded contract", detail: "Vendor Agreement \u2014 GlobalParts",
    type: "upload",
  },
  {
    id: "evt-011", contractId: "ctr-004", timestamp: "2026-06-04T08:47:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "19 clauses extracted, unilateral indemnification identified",
    type: "analysis",
  },
  {
    id: "evt-012", contractId: "ctr-005", timestamp: "2026-06-05T10:20:00Z",
    actor: "Marcus Rivera", action: "Uploaded contract", detail: "DevTool Pro Licensing Agreement",
    type: "upload",
  },
  {
    id: "evt-013", contractId: "ctr-005", timestamp: "2026-06-05T10:22:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "16 clauses extracted, audit rights flagged",
    type: "analysis",
  },
  {
    id: "evt-014", contractId: "ctr-006", timestamp: "2026-06-06T16:00:00Z",
    actor: "Sarah Chen", action: "Uploaded contract", detail: "JV Alpha Partnership Agreement",
    type: "upload",
  },
  {
    id: "evt-015", contractId: "ctr-006", timestamp: "2026-06-06T16:02:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "27 clauses extracted, well-balanced contract",
    type: "analysis",
  },
  {
    id: "evt-016", contractId: "ctr-007", timestamp: "2026-06-07T13:10:00Z",
    actor: "David Park", action: "Uploaded contract", detail: "FinServe Corp NDA",
    type: "upload",
  },
  {
    id: "evt-017", contractId: "ctr-007", timestamp: "2026-06-07T13:11:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "6 clauses extracted, clean review",
    type: "analysis",
  },
  {
    id: "evt-018", contractId: "ctr-007", timestamp: "2026-06-08T10:00:00Z",
    actor: "David Park", action: "Approved", detail: "Standard NDA, no issues",
    type: "approval",
  },
  {
    id: "evt-019", contractId: "ctr-008", timestamp: "2026-06-08T09:30:00Z",
    actor: "HR Admin", action: "Uploaded contract", detail: "Employment Agreement \u2014 Marcus Rivera",
    type: "upload",
  },
  {
    id: "evt-020", contractId: "ctr-008", timestamp: "2026-06-08T09:32:00Z",
    actor: "Legal AI", action: "Completed analysis", detail: "28 clauses extracted, commission clawback flagged",
    type: "analysis",
  },
  {
    id: "evt-021", contractId: "ctr-008", timestamp: "2026-06-09T08:00:00Z",
    actor: "Sarah Chen", action: "Flagged clawback provision", detail: "Potential state wage law violation",
    type: "flag",
  },
];

// ─── Aggregated Metrics ───────────────────────────────────────────────────────────

export const heroMetrics = {
  contractsReviewed: 8,
  highRiskClauses: 5,
  complianceScore: 73, // percentage of passes
  avgReviewTimeMinutes: 4.2,
};

export const reviewQueue = contracts.filter((c) => c.status !== "completed");

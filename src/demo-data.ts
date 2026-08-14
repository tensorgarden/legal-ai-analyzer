import type {
  Contract,
  Clause,
  RiskAssessment,
  ComplianceCheck,
  ReviewTimelineEvent,
  PrivilegeHandlingReview,
  FilingReadinessReview,
  WorkProductReadinessReview,
  PlaybookRule,
  PlaybookCheck,
  DraftingIntegrityCheck,
} from "@/types";

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
      { label: "MSA §9.2 Limitation of Liability", source: "contract section 9.2", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "contract-text-match", sourceLocator: "MSA §9.2, p. 11", supportingExcerpt: "Provider's total liability shall not exceed the fees paid in the three months preceding the claim." },
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
      { label: "MSA §5.4 Data Processing", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "contract-text-match", sourceLocator: "MSA §5.4, p. 7", supportingExcerpt: "Provider may process Customer Data for providing and improving the Service without an attached Data Processing Addendum." },
      { label: "GDPR Article 28 processor terms", source: "GDPR Article 28", referenceType: "statute", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "David Park", sourceLocator: "GDPR Art. 28(3)(a)-(h)", supportingExcerpt: "Processor terms must bind the processor to documented instructions and Article 28 safeguards.", citationVerification: { exists: true, alignment: "supports-claim", authorityStrength: "binding", sourceTextStatus: "paraphrase-verified", sourceTextNote: "Human reviewer matched this summary to the cited statutory subsection; it is presented as a paraphrase, not a quotation.", treatmentStatus: "good-law", treatmentSource: "EUR-Lex consolidated regulation status", jurisdiction: "European Union", targetForum: "European Union cross-border processing review", jurisdictionFit: "controlling", freshnessStatus: "current", refreshDueAt: "2026-09-08T12:00:00Z", refreshReason: "Quarterly source-of-record check for consolidated EU processor obligations.", checkedAt: "2026-06-10T12:00:00Z", checkedBy: "David Park" } },
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
      { label: "Employment Agreement §12 Non-Competition", source: "contract section 12", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "contract-text-match", sourceLocator: "Employment Agreement §12, p. 16", supportingExcerpt: "Employee agrees not to engage in any business competitive with the Company for 24 months post-termination in North America." },
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
      { label: "Vendor Agreement §7 Indemnification", source: "contract section 7", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "contract-text-match", sourceLocator: "Vendor Agreement §7, p. 9", supportingExcerpt: "Supplier shall indemnify and hold harmless Buyer from any and all claims arising from the supplied components." },
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
      { label: "Employment Agreement §6.3 Commission Clawback", source: "contract section 6.3", referenceType: "contract-section", verifiedAt: "2026-06-10T12:00:00Z", verificationMethod: "contract-text-match", sourceLocator: "Employment Agreement §6.3, p. 8", supportingExcerpt: "Commissions paid on sales where the customer cancels within 12 months shall be fully recoverable by the Company." },
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
    confidenceScore: 0.68,
    confidenceRationale: "Source text shows a DPA gap, but counsel must confirm GDPR processor-term applicability before remediation language is used.",
    humanReviewGate: {
      required: true,
      reviewerRole: "privacy-counsel",
      assignedTo: "Maya Gupta",
      dueAt: "2026-06-03T18:00:00Z",
      escalationReason: "Qualified privacy counsel must confirm the DPA gap before the system suggests contract language or client-facing advice.",
    },
    evidenceAnchors: [
      { label: "MSA §5.4 Data Processing terms", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-03T10:00:00Z" },
      { label: "GDPR Article 28(3) processor obligations", source: "GDPR Article 28", referenceType: "statute", verifiedAt: "2026-06-03T10:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "David Park", sourceLocator: "GDPR Art. 28(3)(a)-(h)", supportingExcerpt: "Processor obligations require documented instructions, confidentiality, security, subprocessor, and audit terms.", citationVerification: { exists: true, alignment: "supports-claim", authorityStrength: "binding", sourceTextStatus: "paraphrase-verified", sourceTextNote: "Human reviewer matched this summary to the cited statutory subsection; it is presented as a paraphrase, not a quotation.", treatmentStatus: "good-law", treatmentSource: "EUR-Lex consolidated regulation status", jurisdiction: "European Union", targetForum: "European Union cross-border processing review", jurisdictionFit: "controlling", freshnessStatus: "current", refreshDueAt: "2026-09-01T10:00:00Z", refreshReason: "Quarterly source-of-record check before external GDPR remediation is used.", checkedAt: "2026-06-03T10:00:00Z", checkedBy: "David Park" } },
    ],
  },
  {
    id: "cmp-002", contractId: "ctr-002", regulation: "CCPA Section 1798.100", framework: "CCPA",
    status: "review-required", details: "Data processing terms lack disclosure of categories of personal information collected.",
    lastChecked: "2026-06-03T10:00:00Z",
    confidenceScore: 0.72,
    confidenceRationale: "Notice-at-collection risk is grounded in the data clause, but jurisdiction and personal-information categories still need review.",
    humanReviewGate: {
      required: true,
      reviewerRole: "privacy-counsel",
      assignedTo: "Maya Gupta",
      dueAt: "2026-06-04T18:00:00Z",
      escalationReason: "Counsel review is required to confirm notice-at-collection exposure before the AI summary is used in negotiations.",
    },
    evidenceAnchors: [
      { label: "MSA §5.4 Data Processing terms", source: "contract section 5.4", referenceType: "contract-section", verifiedAt: "2026-06-03T10:00:00Z" },
      { label: "CCPA §1798.100(a) notice at collection", source: "CCPA Section 1798.100", referenceType: "statute", verifiedAt: "2026-06-03T10:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "David Park", sourceLocator: "Cal. Civ. Code §1798.100(a)-(b)", supportingExcerpt: "Notice at collection must identify categories of personal information and purposes before collection.", citationVerification: { exists: true, alignment: "supports-claim", authorityStrength: "binding", sourceTextStatus: "paraphrase-verified", sourceTextNote: "Human reviewer matched this summary to the cited statutory subsection; it is presented as a paraphrase, not a quotation.", treatmentStatus: "good-law", treatmentSource: "California Legislative Information", jurisdiction: "California", targetForum: "California consumer privacy review", jurisdictionFit: "controlling", freshnessStatus: "current", refreshDueAt: "2026-09-01T10:00:00Z", refreshReason: "Quarterly legislative-source check before California privacy guidance is used.", checkedAt: "2026-06-03T10:00:00Z", checkedBy: "David Park" } },
    ],
  },
  {
    id: "cmp-003", contractId: "ctr-003", regulation: "California Labor Code 2870", framework: "CA Employment",
    status: "fail", details: "IP assignment clause does not exclude employee inventions developed independently.",
    lastChecked: "2026-06-04T09:00:00Z",
    confidenceScore: 0.74,
    confidenceRationale: "The invention-assignment issue is source-grounded, while state-law carve-out language requires employment counsel validation.",
    humanReviewGate: {
      required: true,
      reviewerRole: "employment-counsel",
      assignedTo: "Sarah Chen",
      dueAt: "2026-06-04T17:00:00Z",
      escalationReason: "Employment counsel must verify state-law carve-out language before remediation recommendations are sent to HR.",
    },
    evidenceAnchors: [
      { label: "Employment Agreement §10 IP Assignment", source: "contract section 10", referenceType: "contract-section", verifiedAt: "2026-06-04T09:00:00Z" },
      { label: "CA Labor Code §2870 invention exclusion", source: "California Labor Code 2870", referenceType: "statute", verifiedAt: "2026-06-04T09:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "Sarah Chen", sourceLocator: "Cal. Lab. Code §2870(a)", supportingExcerpt: "Employee invention assignments must exclude inventions developed entirely on personal time without employer resources.", citationVerification: { exists: true, alignment: "supports-claim", authorityStrength: "binding", sourceTextStatus: "paraphrase-verified", sourceTextNote: "Human reviewer matched this summary to the cited statutory subsection; it is presented as a paraphrase, not a quotation.", treatmentStatus: "good-law", treatmentSource: "California Legislative Information", jurisdiction: "California", targetForum: "California employment review", jurisdictionFit: "controlling", freshnessStatus: "current", refreshDueAt: "2026-09-02T09:00:00Z", refreshReason: "Quarterly legislative-source check before employment advice is used.", checkedAt: "2026-06-04T09:00:00Z", checkedBy: "Sarah Chen" } },
    ],
  },
  {
    id: "cmp-004", contractId: "ctr-003", regulation: "FTC Non-Compete Rule (2024)", framework: "FTC",
    status: "fail", details: "Broad 24-month non-compete conflicts with FTC rule prohibiting most non-competes.",
    lastChecked: "2026-06-04T09:00:00Z",
    confidenceScore: 0.61,
    confidenceRationale: "FTC non-compete authority status is unsettled, so the model flags a low-confidence conclusion for manual legal verification.",
    humanReviewGate: {
      required: true,
      reviewerRole: "employment-counsel",
      assignedTo: "Sarah Chen",
      dueAt: "2026-06-04T17:00:00Z",
      escalationReason: "Current enforceability is unsettled enough that counsel must validate authority status before external reliance.",
    },
    evidenceAnchors: [
      { label: "Employment Agreement §12 Non-Competition", source: "contract section 12", referenceType: "contract-section", verifiedAt: "2026-06-04T09:00:00Z" },
      { label: "FTC Non-Compete Clause Rule 16 CFR Part 910", source: "16 CFR Part 910", referenceType: "statute", verifiedAt: "2026-06-04T09:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "Sarah Chen", sourceLocator: "16 CFR Part 910 §910.2", supportingExcerpt: "Non-compete clauses require current-status legal review before counsel relies on the rule as authority.", citationVerification: { exists: true, alignment: "needs-counsel-review", authorityStrength: "unsettled", sourceTextStatus: "source-mismatch", sourceTextNote: "Draft wording does not appear verbatim in the cited rule; keep it out of quoted form and require counsel to replace it with verified source text.", treatmentStatus: "status-pending", treatmentSource: "Federal Register and current federal litigation docket review", jurisdiction: "United States", targetForum: "United States employment review", jurisdictionFit: "pending-forum-analysis", freshnessStatus: "event-watch", refreshDueAt: "2026-06-11T09:00:00Z", refreshReason: "Weekly federal docket review while rule enforceability remains unsettled.", checkedAt: "2026-06-04T09:00:00Z", checkedBy: "Sarah Chen" } },
    ],
  },
  {
    id: "cmp-005", contractId: "ctr-001", regulation: "Trade Secrets Act (DTSA)", framework: "DTSA",
    status: "pass", details: "NDA adequately defines confidential information and reasonable protection measures.",
    lastChecked: "2026-06-02T11:00:00Z",
    confidenceScore: 0.94,
    confidenceRationale: "Contract language and DTSA playbook criteria align cleanly with low-risk confidentiality obligations and no open authority dispute.",
  },
  {
    id: "cmp-006", contractId: "ctr-004", regulation: "UCC Section 2-718", framework: "UCC",
    status: "review-required", details: "5% daily penalty may be deemed unreasonable liquidated damages under UCC.",
    lastChecked: "2026-06-05T14:00:00Z",
    confidenceScore: 0.7,
    confidenceRationale: "Penalty math is visible in the contract, but UCC reasonableness depends on anticipated harm and proof facts counsel must review.",
    humanReviewGate: {
      required: true,
      reviewerRole: "commercial-counsel",
      assignedTo: "David Park",
      dueAt: "2026-06-05T21:00:00Z",
      escalationReason: "Commercial counsel must compare anticipated harm and proof difficulty before accepting the AI liquidated-damages risk label.",
    },
    evidenceAnchors: [
      { label: "Vendor Agreement §4 Delivery Penalties", source: "contract section 4", referenceType: "contract-section", verifiedAt: "2026-06-05T14:00:00Z" },
      { label: "UCC §2-718(1) liquidated damages reasonableness", source: "UCC Section 2-718", referenceType: "statute", verifiedAt: "2026-06-05T14:00:00Z", verificationMethod: "manual-source-check", verifiedBy: "David Park", sourceLocator: "UCC §2-718(1)", supportingExcerpt: "Liquidated damages must be reasonable in light of anticipated or actual harm and difficulties of proof.", citationVerification: { exists: true, alignment: "needs-counsel-review", authorityStrength: "persuasive", sourceTextStatus: "paraphrase-verified", sourceTextNote: "Human reviewer matched this summary to the cited model-code subsection; it is presented as a paraphrase, not a quotation.", treatmentStatus: "good-law", treatmentSource: "UCC official text and adopting-jurisdiction citator", jurisdiction: "UCC adopting jurisdiction", targetForum: "Unspecified UCC-adopting state", jurisdictionFit: "pending-forum-analysis", freshnessStatus: "refresh-due", refreshDueAt: "2026-06-19T14:00:00Z", refreshReason: "Refresh once the adopting state and target forum are confirmed.", checkedAt: "2026-06-05T14:00:00Z", checkedBy: "David Park" } },
    ],
  },
  {
    id: "cmp-007", contractId: "ctr-005", regulation: "State Audit Laws", framework: "Software Audit",
    status: "review-required", details: "Unrestricted audit rights with short notice raise procedural fairness concerns.",
    lastChecked: "2026-06-06T12:00:00Z",
    confidenceScore: 0.78,
    confidenceRationale: "Audit-rights language is clear, though procedural fairness depends on playbook thresholds and negotiation context.",
    humanReviewGate: {
      required: true,
      reviewerRole: "commercial-counsel",
      assignedTo: "David Park",
      dueAt: "2026-06-06T20:00:00Z",
      escalationReason: "A commercial attorney must approve the audit-rights fallback before the platform recommends negotiation language.",
    },
    evidenceAnchors: [
      { label: "License Agreement §3 Audit Rights", source: "contract section 3", referenceType: "contract-section", verifiedAt: "2026-06-06T12:00:00Z" },
      { label: "Software audit reasonableness playbook", source: "internal review playbook: audit rights", referenceType: "playbook", verifiedAt: "2026-06-06T12:00:00Z" },
    ],
  },
  {
    id: "cmp-008", contractId: "ctr-006", regulation: "Delaware LLC Act", framework: "DE Corporate",
    status: "pass", details: "JV governance structure complies with Delaware LLC Act requirements.",
    lastChecked: "2026-06-07T15:00:00Z",
    confidenceScore: 0.92,
    confidenceRationale: "Governance terms map cleanly to the Delaware LLC review checklist with balanced board controls and no unresolved flags.",
  },
  {
    id: "cmp-009", contractId: "ctr-008", regulation: "State Wage Laws", framework: "Employment",
    status: "review-required", details: "Commission clawback may violate state wage protection statutes in some jurisdictions.",
    lastChecked: "2026-06-09T08:00:00Z",
    confidenceScore: 0.69,
    confidenceRationale: "Commission clawback facts are contract-grounded, but state wage deduction exposure varies by jurisdiction and requires counsel.",
    humanReviewGate: {
      required: true,
      reviewerRole: "employment-counsel",
      assignedTo: "Sarah Chen",
      dueAt: "2026-06-09T17:00:00Z",
      escalationReason: "Employment counsel must validate wage-deduction exposure before sales compensation guidance is finalized.",
    },
    evidenceAnchors: [
      { label: "Employment Agreement §6.3 Commission Clawback", source: "contract section 6.3", referenceType: "contract-section", verifiedAt: "2026-06-09T08:00:00Z" },
      { label: "State wage deduction review checklist", source: "employment compensation playbook", referenceType: "playbook", verifiedAt: "2026-06-09T08:00:00Z" },
    ],
  },
  {
    id: "cmp-010", contractId: "ctr-007", regulation: "Trade Secrets Act (DTSA)", framework: "DTSA",
    status: "pass", details: "One-way NDA meets DTSA reasonable measures standard.",
    lastChecked: "2026-06-08T10:00:00Z",
    confidenceScore: 0.95,
    confidenceRationale: "NDA text matches DTSA reasonable-measures criteria with straightforward confidential-information handling and no authority conflict.",
  },
];

// ─── External-Use Filing Readiness ────────────────────────────────────────────────

export const filingReadinessReviews: FilingReadinessReview[] = [
  {
    id: "frr-001",
    contractId: "ctr-002",
    intendedUse: "court-filing",
    targetCourt: "U.S. District Court for the Eastern District of Texas, Tyler Division",
    courtAIDisclosureStatus: "required-complete",
    courtAIDisclosureSource: "E.D. Tex. Local Rule AT-3(m) and the assigned judge's April 9, 2025 standing order; the signed AI-use certificate records the tool, use, and human verification.",
    courtAIDisclosureCheckedAt: "2026-06-10T16:15:00Z",
    status: "ready",
    citationsVerified: true,
    sourceTextVerified: true,
    independentLegalJudgmentConfirmed: true,
    reviewedBy: "Maya Gupta",
    reviewedAt: "2026-06-10T16:30:00Z",
    reviewNote: "Counsel independently checked each cited authority, source-text characterization, and filing conclusion before approving external use.",
  },
  {
    id: "frr-002",
    contractId: "ctr-003",
    intendedUse: "court-filing",
    targetCourt: "U.S. District Court, venue and assigned judge pending",
    courtAIDisclosureStatus: "pending-local-rule-check",
    courtAIDisclosureSource: "Venue and assigned-judge requirements remain unconfirmed; local rules and standing orders must be checked before the AI-assisted filing can be released.",
    courtAIDisclosureCheckedAt: null,
    status: "blocked",
    citationsVerified: true,
    sourceTextVerified: false,
    independentLegalJudgmentConfirmed: false,
    reviewedBy: null,
    reviewedAt: null,
    reviewNote: "Blocked because the FTC authority contains a source-text mismatch and unsettled treatment; counsel must replace the wording and re-evaluate the filing conclusion.",
  },
];

// ─── Privilege and AI Data-Handling Reviews ───────────────────────────────────────

export const privilegeHandlingReviews: PrivilegeHandlingReview[] = [
  {
    id: "phr-001",
    contractId: "ctr-002",
    sensitivity: "confidential",
    requestedEnvironment: "enterprise-private",
    decision: "approved-private",
    providerTrainingOptOut: true,
    retentionDays: 0,
    counselDirected: true,
    clientConsentStatus: "risk-reviewed-not-required",
    clientConsentRecordedAt: null,
    clientConsentBasis: "Counsel documented that separate consent was not required because this enterprise-private workspace does not train on, retain, or expose matter data outside the assigned review team.",
    reviewedBy: "Maya Gupta",
    reviewedAt: "2026-06-03T09:30:00Z",
    handlingNote: "Approved for the private legal workspace after confirming zero retention, no provider training, and counsel-directed review scope.",
  },
  {
    id: "phr-002",
    contractId: "ctr-003",
    sensitivity: "potentially-privileged",
    requestedEnvironment: "local-sandbox",
    decision: "counsel-review-required",
    providerTrainingOptOut: true,
    retentionDays: 0,
    counselDirected: true,
    clientConsentStatus: "specific-consent-documented",
    clientConsentRecordedAt: "2026-06-04T08:15:00Z",
    clientConsentBasis: "The client authorized processing of draft employment terms in the named local sandbox after a matter-specific explanation of disclosure risks, safeguards, and contract-review benefits.",
    reviewedBy: "Sarah Chen",
    reviewedAt: "2026-06-04T08:30:00Z",
    handlingNote: "Restricted to a local sandbox while employment counsel confirms privilege treatment and directs the permitted analysis workflow.",
  },
  {
    id: "phr-003",
    contractId: "ctr-005",
    sensitivity: "confidential",
    requestedEnvironment: "public-ai",
    decision: "blocked-public-tool",
    providerTrainingOptOut: false,
    retentionDays: null,
    counselDirected: false,
    clientConsentStatus: "missing",
    clientConsentRecordedAt: null,
    clientConsentBasis: "No matter-specific client discussion covers the public tool's disclosure, training, or retention risks, so processing remains blocked pending a safer environment.",
    reviewedBy: "David Park",
    reviewedAt: "2026-06-06T11:30:00Z",
    handlingNote: "Blocked because the requested public tool did not provide acceptable training or retention controls; reroute to the approved private workspace.",
  },
];

// ─── Work Product and Discoverability Readiness ─────────────────────────────────

export const workProductReadinessReviews: WorkProductReadinessReview[] = [
  {
    id: "wpr-001",
    contractId: "ctr-002",
    anticipationStatus: "anticipation-documented",
    preparedAtCounselDirection: true,
    counselDirectionSource: "Maya Gupta directed the AI-assisted review on 2026-06-02 in anticipation of the RetailMax dispute; her direction memo scopes the permitted analysis workflow.",
    protectiveOrderTermsStatus: "closed-tool-required-and-honored",
    protectiveOrderTermsNote: "The draft protective order bars open-loop AI uploads, and the review ran only in the zero-retention enterprise-private workspace, so no open tool received matter data.",
    aiProcessingEnvironment: "enterprise-private",
    status: "work-product-asserted",
    reviewedBy: "Maya Gupta",
    reviewedAt: "2026-06-03T10:15:00Z",
    readinessNote: "Counsel confirmed the review materials were prepared at her direction in anticipation of litigation and stayed inside a closed environment, so work-product protection is asserted over the AI review record.",
  },
  {
    id: "wpr-002",
    contractId: "ctr-004",
    anticipationStatus: "anticipation-documented",
    preparedAtCounselDirection: false,
    counselDirectionSource: "Procurement ran the AI review on its own initiative before engaging counsel; no attorney directed or supervised the analysis workflow.",
    protectiveOrderTermsStatus: "no-restriction-confirmed",
    protectiveOrderTermsNote: "No protective order is in place for the GlobalParts dispute, but the absence of counsel direction leaves the AI review record exposed under the by-or-at-the-behest-of-counsel standard.",
    aiProcessingEnvironment: "enterprise-private",
    status: "potentially-discoverable",
    reviewedBy: "David Park",
    reviewedAt: "2026-06-05T15:10:00Z",
    readinessNote: "Because the review was not prepared by or at the behest of counsel, work-product protection cannot be asserted; treat prompts and outputs as potentially discoverable and route future analysis through counsel direction.",
  },
  {
    id: "wpr-003",
    contractId: "ctr-005",
    anticipationStatus: "pending-counsel-assessment",
    preparedAtCounselDirection: true,
    counselDirectionSource: "Counsel direction is documented for the DevTool Pro audit dispute, but litigation counsel has not yet assessed whether the review materials qualify as work product.",
    protectiveOrderTermsStatus: "pending-protective-order-check",
    protectiveOrderTermsNote: "The parties are still negotiating AI terms in the protective order; until closed-tool terms are confirmed, the AI processing environment remains unresolved for discovery purposes.",
    aiProcessingEnvironment: "local-sandbox",
    status: "counsel-review-required",
    reviewedBy: null,
    reviewedAt: null,
    readinessNote: "Held for litigation counsel: confirm anticipation status and protective-order AI terms before anyone relies on work-product protection for this review record.",
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

// ─── Playbook Rules and Enforcement ──────────────────────────────────────────────

export const playbookRules: PlaybookRule[] = [
  {
    id: "rule-001",
    category: "data-privacy",
    rule: "Every SaaS agreement must include a Data Processing Addendum or equivalent GDPR-compliant processor terms referencing Article 28.",
    severity: "critical",
    expectedPattern: "DPA attachment or GDPR Article 28 processor terms",
    remediationGuidance: "Attach a mutually executed DPA before signing. At minimum, insert language binding the provider to documented processing instructions and Article 28 safeguards.",
  },
  {
    id: "rule-002",
    category: "liability",
    rule: "Liability caps must be at least 12 months of fees or $1M (whichever is higher) for enterprise agreements, with carve-outs for gross negligence and willful misconduct.",
    severity: "critical",
    expectedPattern: "Cap ≥ 12 months fees or $1M, plus carve-outs",
    remediationGuidance: "Negotiate the cap to 12 months fees or $1M. Add explicit carve-outs for gross negligence, willful misconduct, and IP infringement.",
  },
  {
    id: "rule-003",
    category: "indemnification",
    rule: "Indemnification must be mutual unless the contract structure makes unilateral indemnification commercially standard for the supplier side.",
    severity: "important",
    expectedPattern: "Mutual indemnification or documented rationale for unilateral",
    remediationGuidance: "Propose mutual indemnification language. If the supplier refuses, document the commercial rationale and escalate for business approval.",
  },
  {
    id: "rule-004",
    category: "non-compete",
    rule: "Non-compete restrictions must not exceed 12 months post-termination and must be limited to the employee's actual geographic operating region.",
    severity: "critical",
    expectedPattern: "≤ 12 months, geographically scoped to operating region",
    remediationGuidance: "Reduce term to 6-12 months. Narrow geographic scope to regions where the employee operated. Add garden leave or severance consideration.",
  },
  {
    id: "rule-005",
    category: "termination",
    rule: "Auto-renewal clauses must include at least 30 days' opt-out notice and 60 days' notice for material price changes.",
    severity: "important",
    expectedPattern: "≥ 30 days opt-out, ≥ 60 days price-change notice",
    remediationGuidance: "Add a 30-day opt-out window before renewal. Require 60-90 days written notice for any price increase exceeding 5%.",
  },
  {
    id: "rule-006",
    category: "confidentiality",
    rule: "NDA confidentiality terms must survive termination for at least 3 years or the maximum period permitted by applicable law for trade secrets.",
    severity: "important",
    expectedPattern: "Survival period ≥ 3 years, trade secrets perpetual",
    remediationGuidance: "Ensure survival clause covers at least 3 years post-termination. Trade secret obligations should survive indefinitely while the information remains a trade secret.",
  },
  {
    id: "rule-007",
    category: "payment",
    rule: "Commission clawback periods must not exceed 6 months and must pro-rate recovery based on time elapsed, excluding involuntary churn.",
    severity: "critical",
    expectedPattern: "≤ 6 months clawback, pro-rated, excludes involuntary churn",
    remediationGuidance: "Reduce clawback to 3-6 months. Pro-rate recovery. Exclude involuntary churn such as customer bankruptcy or force majeure cancellations.",
  },
  {
    id: "rule-008",
    category: "assignment",
    rule: "Audit rights must be limited to once per year with at least 30 days' notice, and audit costs borne by the requesting party unless underpayment exceeds 5%.",
    severity: "important",
    expectedPattern: "≤ 1 audit/year, ≥ 30 days notice, cost-shifting threshold ≥ 5%",
    remediationGuidance: "Limit audits to once per year. Require 30 days notice. Shift audit costs to the licensee only if underpayment exceeds 5%.",
  },
];

export const playbookChecks: PlaybookCheck[] = [
  {
    id: "pbc-001",
    ruleId: "rule-001",
    contractId: "ctr-002",
    status: "fail",
    evidence: "MSA §5.4 grants 'improving the Service' data rights with no DPA or Article 28 processor terms attached.",
    checkedAt: "2026-06-03T10:00:00Z",
    checkedBy: "Maya Gupta",
  },
  {
    id: "pbc-002",
    ruleId: "rule-002",
    contractId: "ctr-002",
    status: "fail",
    evidence: "MSA §9.2 caps liability at 3 months fees with no carve-outs for gross negligence or willful misconduct.",
    checkedAt: "2026-06-03T10:05:00Z",
    checkedBy: "Maya Gupta",
  },
  {
    id: "pbc-003",
    ruleId: "rule-003",
    contractId: "ctr-004",
    status: "fail",
    evidence: "Vendor Agreement §7 contains unilateral indemnification from supplier only, with no caps and no buyer reciprocity.",
    checkedAt: "2026-06-05T14:00:00Z",
    checkedBy: "David Park",
  },
  {
    id: "pbc-004",
    ruleId: "rule-004",
    contractId: "ctr-003",
    status: "fail",
    evidence: "Employment Agreement §12 imposes a 24-month non-compete covering all of North America with no severance consideration.",
    checkedAt: "2026-06-04T09:00:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "pbc-005",
    ruleId: "rule-005",
    contractId: "ctr-005",
    status: "fail",
    evidence: "License Agreement auto-renews with only 15 days' price-change notice and no opt-out window before renewal.",
    checkedAt: "2026-06-06T12:00:00Z",
    checkedBy: "David Park",
  },
  {
    id: "pbc-006",
    ruleId: "rule-006",
    contractId: "ctr-001",
    status: "pass",
    evidence: "NDA §8 provides a 3-year term and survival language aligned with the firm's standard confidentiality duration.",
    checkedAt: "2026-06-01T14:20:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "pbc-007",
    ruleId: "rule-007",
    contractId: "ctr-008",
    status: "fail",
    evidence: "Employment Agreement §6.3 permits full clawback for 12 months with no pro-ration and no involuntary-churn exclusion.",
    checkedAt: "2026-06-09T08:00:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "pbc-008",
    ruleId: "rule-008",
    contractId: "ctr-005",
    status: "fail",
    evidence: "License Agreement §3 allows audit 'at any time' with 48 hours notice and shifts costs when underpayment exceeds only 3%.",
    checkedAt: "2026-06-06T12:15:00Z",
    checkedBy: "David Park",
  },
  {
    id: "pbc-009",
    ruleId: "rule-003",
    contractId: "ctr-001",
    status: "pass",
    evidence: "Mutual NDA contains reciprocal confidentiality obligations with balanced terms across both parties.",
    checkedAt: "2026-06-01T14:25:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "pbc-010",
    ruleId: "rule-006",
    contractId: "ctr-007",
    status: "pass",
    evidence: "FinServe NDA §6 provides 5-year post-termination survival, exceeding the firm's 3-year minimum standard.",
    checkedAt: "2026-06-08T10:00:00Z",
    checkedBy: "David Park",
  },
];

// ─── Drafting Integrity Checks ─────────────────────────────────────────────────────

export const draftingIntegrityChecks: DraftingIntegrityCheck[] = [
  {
    id: "dic-001",
    contractId: "ctr-001",
    checkType: "cross-reference",
    finding:
      "Notice clause §7.2 requires delivery pursuant to Section 9.2, but the agreement contains only eight sections and no Section 9.2 exists anywhere in the executed text.",
    targetLocator: "§7.2 → Section 9.2",
    status: "fail",
    evidenceAnchors: [
      {
        label: "Dangling notice cross-reference",
        source: "ctr-001 §7.2",
        referenceType: "contract-section",
        verifiedAt: "2026-06-01T09:42:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "Sarah Chen",
        sourceLocator: "§7.2",
        supportingExcerpt:
          "All notices required or permitted under this Agreement shall be given in writing and delivered pursuant to Section 9.2 of this Agreement. Any notice not delivered in accordance with Section 9.2 shall be deemed ineffective.",
      },
    ],
    recommendedAction:
      "Re-point the notice provision to the existing notices section (§7) or insert the missing Section 9.2 before execution.",
    checkedAt: "2026-06-01T09:42:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "dic-002",
    contractId: "ctr-002",
    checkType: "defined-term",
    finding:
      "Capitalized term Service Level Credits appears in §5.2 and §11.3, but no definition exists anywhere in the agreement, leaving the credit calculation open to dispute.",
    targetLocator: "§5.2, §11.3",
    status: "fail",
    evidenceAnchors: [
      {
        label: "Undefined capitalized term usage",
        source: "ctr-002 §5.2",
        referenceType: "contract-section",
        verifiedAt: "2026-06-02T15:00:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "Maya Gupta",
        sourceLocator: "§5.2, p. 6",
        supportingExcerpt:
          "In the event Provider fails to meet the Availability SLA in any calendar month, Customer shall receive Service Level Credits calculated in accordance with Section 11.3.",
      },
    ],
    recommendedAction:
      "Add a definition of Service Level Credits specifying the credit rate, cap, and calculation base, and confirm §11.3 references that definition.",
    checkedAt: "2026-06-02T15:00:00Z",
    checkedBy: "Maya Gupta",
  },
  {
    id: "dic-003",
    contractId: "ctr-003",
    checkType: "defined-term",
    finding:
      "Accelerated Vesting is defined in §4.1 but the term is never used elsewhere in the agreement, suggesting a deleted provision or a stale definition left from an earlier draft.",
    targetLocator: "§4.1",
    status: "review-required",
    evidenceAnchors: [
      {
        label: "Stale defined term",
        source: "ctr-003 §4.1",
        referenceType: "contract-section",
        verifiedAt: "2026-06-03T11:30:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "Sarah Chen",
        sourceLocator: "§4.1",
        supportingExcerpt:
          "Accelerated Vesting shall mean the immediate vesting of all unvested equity awards upon a Qualifying Termination or a Change of Control event, as such terms are defined in the Plan.",
      },
    ],
    recommendedAction:
      "Confirm with the drafter whether an acceleration provision was intentionally removed; if so, strike the unused definition from §4.1.",
    checkedAt: "2026-06-03T11:30:00Z",
    checkedBy: "Sarah Chen",
  },
  {
    id: "dic-004",
    contractId: "ctr-004",
    checkType: "defined-term",
    finding:
      "Specifications is defined twice, in §1.1 and §9.3, with materially different wording, leaving it ambiguous which definition controls for acceptance testing and remedies.",
    targetLocator: "§1.1 vs §9.3",
    status: "review-required",
    evidenceAnchors: [
      {
        label: "First conflicting definition",
        source: "ctr-004 §1.1",
        referenceType: "contract-section",
        verifiedAt: "2026-06-04T09:10:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "David Park",
        sourceLocator: "§1.1",
        supportingExcerpt:
          "Specifications means the technical specifications, drawings, and performance criteria set forth in Exhibit A to this Agreement, as amended from time to time by written agreement.",
      },
      {
        label: "Second conflicting definition",
        source: "ctr-004 §9.3",
        referenceType: "contract-section",
        verifiedAt: "2026-06-04T09:10:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "David Park",
        sourceLocator: "§9.3",
        supportingExcerpt:
          "Specifications shall mean the manufacturing tolerances and quality requirements identified in Schedule 2, which shall prevail in the event of any inconsistency with Exhibit A.",
      },
    ],
    recommendedAction:
      "Consolidate the two definitions into a single §1.1 definition and delete the §9.3 restatement, or add an express precedence clause.",
    checkedAt: "2026-06-04T09:10:00Z",
    checkedBy: "David Park",
  },
  {
    id: "dic-005",
    contractId: "ctr-005",
    checkType: "cross-reference",
    finding:
      "All internal cross-references resolve to existing sections and exhibits. §2.3 correctly points to Exhibit A, which is attached, and no reference targets a deleted or renumbered section.",
    targetLocator: "§2.3 → Exhibit A",
    status: "pass",
    evidenceAnchors: [
      {
        label: "Resolved exhibit cross-reference",
        source: "ctr-005 §2.3",
        referenceType: "contract-section",
        verifiedAt: "2026-06-05T10:45:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "David Park",
        sourceLocator: "§2.3",
        supportingExcerpt:
          "Customer shall pay the license fees for each Authorized Seat in accordance with the fee schedule set forth in Exhibit A, which is incorporated into this Agreement by reference.",
      },
    ],
    recommendedAction:
      "No action required; cross-references were verified against the executed text and all targets resolve.",
    checkedAt: "2026-06-05T10:45:00Z",
    checkedBy: "David Park",
  },
  {
    id: "dic-006",
    contractId: "ctr-007",
    checkType: "defined-term",
    finding:
      "All capitalized defined terms are defined once in the definitions section and used at least once, with no duplicate, conflicting, or unused definitions detected.",
    targetLocator: "§1 definitions",
    status: "pass",
    evidenceAnchors: [
      {
        label: "Consistent definitions sweep",
        source: "ctr-007 §1",
        referenceType: "contract-section",
        verifiedAt: "2026-06-08T10:20:00Z",
        verificationMethod: "contract-text-match",
        verifiedBy: "David Park",
        sourceLocator: "§1",
        supportingExcerpt:
          "For purposes of this Agreement, Confidential Information shall have the meaning set forth in Section 1 and shall be used consistently throughout this Agreement.",
      },
    ],
    recommendedAction:
      "No action required; defined terms were checked against the definitions section with no gaps, duplicates, or conflicts.",
    checkedAt: "2026-06-08T10:20:00Z",
    checkedBy: "David Park",
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

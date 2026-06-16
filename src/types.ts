// Types for Legal AI Analyzer

export type ReviewStatus = "draft" | "in-review" | "completed" | "flagged" | "needs-attention";

export type RiskLevel = "high" | "medium" | "low";

export type ContractType = "nda" | "saas" | "employment" | "vendor" | "partnership" | "licensing";

export type ClauseCategory =
  | "termination"
  | "liability"
  | "indemnification"
  | "confidentiality"
  | "payment"
  | "ip-rights"
  | "non-compete"
  | "governing-law"
  | "dispute-resolution"
  | "data-privacy"
  | "force-majeure"
  | "assignment";

export interface EvidenceAnchor {
  label: string;
  source: string;
  referenceType: "contract-section" | "statute" | "case-law" | "playbook";
  verifiedAt: string;
}

export interface Clause {
  id: string;
  contractId: string;
  category: ClauseCategory;
  title: string;
  text: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  issues: string[];
  recommendations: string[];
  evidenceAnchors?: EvidenceAnchor[];
  position: { start: number; end: number };
}

export interface RiskAssessment {
  overallScore: number; // 0-100
  clauseCount: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  topRisks: { category: ClauseCategory; score: number; summary: string }[];
  riskHeatmap: { category: ClauseCategory; count: number; avgScore: number }[];
}

export interface ComplianceCheck {
  id: string;
  contractId: string;
  regulation: string;
  framework: string;
  status: "pass" | "fail" | "review-required";
  details: string;
  lastChecked: string;
  evidenceAnchors?: EvidenceAnchor[];
}

export interface Contract {
  id: string;
  title: string;
  type: ContractType;
  parties: { name: string; role: string }[];
  uploadedAt: string;
  status: ReviewStatus;
  riskScore: number;
  riskLevel: RiskLevel;
  clauseCount: number;
  pageCount: number;
  summary: string;
}

export interface LegalDocument {
  id: string;
  contractId: string;
  name: string;
  uploadedAt: string;
  fileType: "pdf" | "docx" | "txt";
  fileSize: number; // bytes
}

export interface ReviewTimelineEvent {
  id: string;
  contractId: string;
  timestamp: string;
  actor: string;
  action: string;
  detail: string;
  type: "upload" | "analysis" | "review" | "approval" | "flag" | "resolution";
}

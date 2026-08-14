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

export type CitationAlignment = "supports-claim" | "needs-counsel-review" | "does-not-support";

export type AuthorityStrength = "binding" | "persuasive" | "unsettled";

export type JurisdictionFit =
  | "controlling"
  | "persuasive-only"
  | "forum-mismatch"
  | "pending-forum-analysis";

export type AuthorityTreatmentStatus =
  | "good-law"
  | "negative-treatment"
  | "superseded"
  | "status-pending";

export type AuthorityFreshnessStatus = "current" | "refresh-due" | "event-watch";

export type SourceTextVerificationStatus =
  | "exact-quote-verified"
  | "paraphrase-verified"
  | "source-mismatch";

export interface CitationVerification {
  exists: boolean;
  alignment: CitationAlignment;
  authorityStrength: AuthorityStrength;
  sourceTextStatus: SourceTextVerificationStatus;
  sourceTextNote: string;
  treatmentStatus: AuthorityTreatmentStatus;
  treatmentSource: string;
  jurisdiction: string;
  targetForum: string;
  jurisdictionFit: JurisdictionFit;
  freshnessStatus: AuthorityFreshnessStatus;
  refreshDueAt: string;
  refreshReason: string;
  checkedAt: string;
  checkedBy: string;
}

export interface EvidenceAnchor {
  label: string;
  source: string;
  referenceType: "contract-section" | "statute" | "case-law" | "playbook";
  verifiedAt: string;
  verificationMethod?: "contract-text-match" | "manual-source-check" | "playbook-approved";
  verifiedBy?: string;
  sourceLocator?: string;
  supportingExcerpt?: string;
  citationVerification?: CitationVerification;
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

export interface HumanReviewGate {
  required: boolean;
  reviewerRole: "privacy-counsel" | "employment-counsel" | "commercial-counsel" | "legal-ops";
  assignedTo: string;
  dueAt: string;
  escalationReason: string;
}

export type PrivilegeSensitivity = "confidential" | "potentially-privileged";

export type AIProcessingEnvironment = "enterprise-private" | "local-sandbox" | "public-ai";

export type AIProcessingDecision =
  | "approved-private"
  | "counsel-review-required"
  | "blocked-public-tool";

export type ClientConsentStatus =
  | "specific-consent-documented"
  | "risk-reviewed-not-required"
  | "missing";

export interface PrivilegeHandlingReview {
  id: string;
  contractId: string;
  sensitivity: PrivilegeSensitivity;
  requestedEnvironment: AIProcessingEnvironment;
  decision: AIProcessingDecision;
  providerTrainingOptOut: boolean;
  retentionDays: number | null;
  counselDirected: boolean;
  clientConsentStatus: ClientConsentStatus;
  clientConsentRecordedAt: string | null;
  clientConsentBasis: string;
  reviewedBy: string;
  reviewedAt: string;
  handlingNote: string;
}

export type FilingReadinessStatus = "ready" | "blocked" | "counsel-review";

export type CourtAIDisclosureStatus =
  | "required-complete"
  | "not-required-confirmed"
  | "pending-local-rule-check";

export interface FilingReadinessReview {
  id: string;
  contractId: string;
  intendedUse: "court-filing" | "client-advice";
  targetCourt: string;
  courtAIDisclosureStatus: CourtAIDisclosureStatus;
  courtAIDisclosureSource: string;
  courtAIDisclosureCheckedAt: string | null;
  status: FilingReadinessStatus;
  citationsVerified: boolean;
  sourceTextVerified: boolean;
  independentLegalJudgmentConfirmed: boolean;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewNote: string;
}

export type LitigationAnticipationStatus =
  | "anticipation-documented"
  | "not-litigation-context"
  | "pending-counsel-assessment";

export type ProtectiveOrderAITermsStatus =
  | "closed-tool-required-and-honored"
  | "no-restriction-confirmed"
  | "pending-protective-order-check";

export type WorkProductReadinessStatus =
  | "work-product-asserted"
  | "potentially-discoverable"
  | "counsel-review-required";

export interface WorkProductReadinessReview {
  id: string;
  contractId: string;
  anticipationStatus: LitigationAnticipationStatus;
  preparedAtCounselDirection: boolean;
  counselDirectionSource: string;
  protectiveOrderTermsStatus: ProtectiveOrderAITermsStatus;
  protectiveOrderTermsNote: string;
  aiProcessingEnvironment: AIProcessingEnvironment;
  status: WorkProductReadinessStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  readinessNote: string;
}

export interface ComplianceCheck {
  id: string;
  contractId: string;
  regulation: string;
  framework: string;
  status: "pass" | "fail" | "review-required";
  details: string;
  lastChecked: string;
  confidenceScore: number; // 0-1, lower scores require targeted human review
  confidenceRationale: string;
  evidenceAnchors?: EvidenceAnchor[];
  humanReviewGate?: HumanReviewGate;
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

export interface PlaybookRule {
  id: string;
  category: ClauseCategory;
  rule: string;
  severity: "critical" | "important" | "advisory";
  expectedPattern: string;
  remediationGuidance: string;
}

export interface PlaybookCheck {
  id: string;
  ruleId: string;
  contractId: string;
  status: "pass" | "fail" | "partial";
  evidence: string;
  checkedAt: string;
  checkedBy: string;
}
export type DraftingIntegrityCheckType = "defined-term" | "cross-reference";

export type DraftingIntegrityStatus = "pass" | "fail" | "review-required";

export interface DraftingIntegrityCheck {
  id: string;
  contractId: string;
  checkType: DraftingIntegrityCheckType;
  finding: string;
  targetLocator: string;
  status: DraftingIntegrityStatus;
  evidenceAnchors: EvidenceAnchor[];
  recommendedAction: string;
  checkedAt: string;
  checkedBy: string;
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

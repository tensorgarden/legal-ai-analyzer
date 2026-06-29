import { describe, it, expect } from "vitest";
import { contracts, clauses, riskAssessment, complianceChecks, reviewTimeline, heroMetrics } from "@/demo-data";
import type { Contract, Clause, RiskAssessment, ComplianceCheck, ReviewTimelineEvent } from "@/types";

describe("contracts data", () => {
  it("has exactly 8 contracts", () => {
    expect(contracts).toHaveLength(8);
  });

  it("every contract has a valid type", () => {
    const validTypes = ["nda", "saas", "employment", "vendor", "partnership", "licensing"];
    contracts.forEach((c: Contract) => {
      expect(validTypes).toContain(c.type);
    });
  });

  it("every contract has at least one party", () => {
    contracts.forEach((c: Contract) => {
      expect(c.parties.length).toBeGreaterThanOrEqual(1);
      c.parties.forEach((p) => {
        expect(p.name).toBeTruthy();
        expect(p.role).toBeTruthy();
      });
    });
  });

  it("risk scores are within 0-100 range", () => {
    contracts.forEach((c: Contract) => {
      expect(c.riskScore).toBeGreaterThanOrEqual(0);
      expect(c.riskScore).toBeLessThanOrEqual(100);
    });
  });
});

describe("clauses data", () => {
  it("has exactly 25 clauses", () => {
    expect(clauses).toHaveLength(25);
  });

  it("every clause has a valid risk level", () => {
    const validLevels = ["high", "medium", "low"];
    clauses.forEach((cl: Clause) => {
      expect(validLevels).toContain(cl.riskLevel);
    });
  });

  it("high-risk clauses have riskScore >= 60", () => {
    const highRisk = clauses.filter((cl: Clause) => cl.riskLevel === "high");
    highRisk.forEach((cl) => {
      expect(cl.riskScore).toBeGreaterThanOrEqual(60);
    });
    expect(highRisk.length).toBeGreaterThan(0);
  });

  it("anchors every high-risk finding to verified evidence", () => {
    const highRisk = clauses.filter((cl: Clause) => cl.riskLevel === "high");
    highRisk.forEach((cl) => {
      expect(cl.evidenceAnchors?.length).toBeGreaterThanOrEqual(2);
      cl.evidenceAnchors?.forEach((anchor) => {
        expect(anchor.label).toBeTruthy();
        expect(anchor.source).toBeTruthy();
        expect(["contract-section", "statute", "case-law", "playbook"]).toContain(anchor.referenceType);
        expect(Date.parse(anchor.verifiedAt)).not.toBeNaN();
      });
    });
  });
});

describe("evidence verification", () => {
  const anchors = [
    ...clauses.flatMap((cl: Clause) => cl.evidenceAnchors ?? []),
    ...complianceChecks.flatMap((cc: ComplianceCheck) => cc.evidenceAnchors ?? []),
  ];

  it("requires manual verification for legal authorities that could hallucinate", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verifier = anchor.verifiedBy ?? "";
      expect(anchor.verificationMethod).toBe("manual-source-check");
      expect(verifier.trim().length).toBeGreaterThan(2);
      expect(verifier).not.toMatch(/legal ai/i);
      expect(Date.parse(anchor.verifiedAt)).not.toBeNaN();
    });
  });

  it("pinpoints legal authority anchors to source text for human citation checks", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      expect(anchor.sourceLocator?.trim().length).toBeGreaterThan(6);
      expect(anchor.supportingExcerpt?.trim().length).toBeGreaterThan(40);
      expect(anchor.supportingExcerpt).not.toMatch(/placeholder|lorem|tbd/i);
    });
  });
});

describe("riskAssessment", () => {
  it("clause counts add up correctly", () => {
    const r: RiskAssessment = riskAssessment;
    expect(r.highRiskCount + r.mediumRiskCount + r.lowRiskCount).toBe(r.clauseCount);
  });

  it("risk heatmap covers 12 categories", () => {
    expect(riskAssessment.riskHeatmap).toHaveLength(12);
  });
});

describe("compliance data", () => {
  it("has 10 compliance checks", () => {
    expect(complianceChecks).toHaveLength(10);
  });

  it("has at least one fail status", () => {
    const fails = complianceChecks.filter((cc: ComplianceCheck) => cc.status === "fail");
    expect(fails.length).toBeGreaterThanOrEqual(1);
  });

  it("failed and review-required checks cite verified evidence", () => {
    const nonPassing = complianceChecks.filter(
      (cc: ComplianceCheck) => cc.status === "fail" || cc.status === "review-required",
    );
    expect(nonPassing.length).toBeGreaterThanOrEqual(1);
    nonPassing.forEach((cc) => {
      expect(cc.evidenceAnchors?.length).toBeGreaterThanOrEqual(1);
      cc.evidenceAnchors?.forEach((anchor) => {
        expect(anchor.label).toBeTruthy();
        expect(anchor.source).toBeTruthy();
        expect(["contract-section", "statute", "case-law", "playbook"]).toContain(anchor.referenceType);
        expect(Date.parse(anchor.verifiedAt)).not.toBeNaN();
      });
    });
  });

  it("uses confidence scoring to target human review for uncertain legal conclusions", () => {
    complianceChecks.forEach((cc: ComplianceCheck) => {
      expect(cc.confidenceScore).toBeGreaterThanOrEqual(0);
      expect(cc.confidenceScore).toBeLessThanOrEqual(1);
      expect(cc.confidenceRationale.trim().length).toBeGreaterThan(50);
    });

    const lowConfidence = complianceChecks.filter((cc: ComplianceCheck) => cc.confidenceScore < 0.85);
    expect(lowConfidence.length).toBeGreaterThan(0);
    lowConfidence.forEach((cc) => {
      expect(["fail", "review-required"]).toContain(cc.status);
      expect(cc.humanReviewGate?.required).toBe(true);
      expect(cc.confidenceRationale).toMatch(/source|jurisdiction|authority|playbook|facts|review/i);
    });
  });

  it("routes non-passing compliance checks through qualified human review", () => {
    const nonPassing = complianceChecks.filter(
      (cc: ComplianceCheck) => cc.status === "fail" || cc.status === "review-required",
    );
    const validReviewerRoles = ["privacy-counsel", "employment-counsel", "commercial-counsel", "legal-ops"];

    expect(nonPassing.length).toBeGreaterThanOrEqual(1);
    nonPassing.forEach((cc) => {
      const gate = cc.humanReviewGate;

      expect(gate?.required).toBe(true);
      expect(validReviewerRoles).toContain(gate?.reviewerRole);
      expect(gate?.assignedTo.trim().length).toBeGreaterThan(2);
      expect(gate?.assignedTo).not.toMatch(/legal ai|model|automation/i);
      expect(Date.parse(gate?.dueAt ?? "")).not.toBeNaN();
      expect(gate?.escalationReason.trim().length).toBeGreaterThan(60);
    });
  });
});

describe("reviewTimeline", () => {
  it("has at least 20 events", () => {
    expect(reviewTimeline.length).toBeGreaterThanOrEqual(20);
  });

  it("events have valid types", () => {
    const validTypes = ["upload", "analysis", "review", "approval", "flag", "resolution"];
    reviewTimeline.forEach((evt: ReviewTimelineEvent) => {
      expect(validTypes).toContain(evt.type);
    });
  });
});

describe("heroMetrics", () => {
  it("metrics are consistent with data", () => {
    expect(heroMetrics.contractsReviewed).toBe(contracts.length);
    const highRiskClauses = clauses.filter((cl: Clause) => cl.riskLevel === "high");
    expect(heroMetrics.highRiskClauses).toBe(highRiskClauses.length);
  });
});

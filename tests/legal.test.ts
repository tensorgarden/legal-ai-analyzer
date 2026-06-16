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

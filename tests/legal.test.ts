import { describe, it, expect } from "vitest";
import {
  contracts,
  clauses,
  riskAssessment,
  complianceChecks,
  privilegeHandlingReviews,
  filingReadinessReviews,
  reviewTimeline,
  heroMetrics,
} from "@/demo-data";
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

  it("links high-risk contract-section anchors to exact source text snippets", () => {
    const highRisk = clauses.filter((cl: Clause) => cl.riskLevel === "high");
    const contractAnchors = highRisk.flatMap((cl: Clause) =>
      (cl.evidenceAnchors ?? [])
        .filter((anchor) => anchor.referenceType === "contract-section")
        .map((anchor) => ({ anchor, clauseText: cl.text.toLowerCase() })),
    );

    expect(contractAnchors).toHaveLength(highRisk.length);
    contractAnchors.forEach(({ anchor, clauseText }) => {
      const locator = anchor.sourceLocator ?? "";
      const excerpt = anchor.supportingExcerpt ?? "";
      const excerptTerms = excerpt.toLowerCase().match(/[a-z]{5,}/g) ?? [];

      expect(anchor.verificationMethod).toBe("contract-text-match");
      expect(locator.trim()).toMatch(/§|section|clause|page|p\./i);
      expect(excerpt.trim().length).toBeGreaterThan(60);
      expect(excerpt).not.toMatch(/placeholder|lorem|tbd/i);
      expect(excerptTerms.some((term) => clauseText.includes(term))).toBe(true);
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

  it("records source-text verification for every legal authority", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const validSourceTextStatuses = [
      "exact-quote-verified",
      "paraphrase-verified",
      "source-mismatch",
    ];

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;

      expect(validSourceTextStatuses).toContain(verification?.sourceTextStatus);
      expect(verification?.sourceTextNote.trim().length).toBeGreaterThan(80);
    });
  });

  it("blocks source-text mismatches from supporting reliance", () => {
    const mismatchedAuthorities = anchors.filter(
      (anchor) => anchor.citationVerification?.sourceTextStatus === "source-mismatch",
    );

    expect(mismatchedAuthorities.length).toBeGreaterThan(0);
    mismatchedAuthorities.forEach((anchor) => {
      expect(anchor.citationVerification?.alignment).toBe("needs-counsel-review");
      expect(anchor.citationVerification?.sourceTextNote).toMatch(
        /does not appear verbatim|replace.*verified source text/i,
      );
    });
  });

  it("checks citation existence, claim alignment, and authority strength before reliance", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const validAlignments = ["supports-claim", "needs-counsel-review"];
    const validAuthorityStrengths = ["binding", "persuasive", "unsettled"];

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;

      expect(verification?.exists).toBe(true);
      expect(validAlignments).toContain(verification?.alignment);
      expect(validAuthorityStrengths).toContain(verification?.authorityStrength);
      expect(verification?.jurisdiction.trim().length).toBeGreaterThan(2);
      expect(Date.parse(verification?.checkedAt ?? "")).not.toBeNaN();
      expect(verification?.checkedBy).toBe(anchor.verifiedBy);
      expect(verification?.checkedBy).not.toMatch(/legal ai|model|automation/i);
    });

    const unsettledAuthorities = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.authorityStrength === "unsettled",
    );
    expect(unsettledAuthorities.length).toBeGreaterThan(0);
    unsettledAuthorities.forEach((anchor) => {
      expect(anchor.citationVerification?.alignment).toBe("needs-counsel-review");
    });
  });

  it("records a current-law treatment check for every legal authority", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const validTreatmentStatuses = [
      "good-law",
      "negative-treatment",
      "superseded",
      "status-pending",
    ];

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;

      expect(validTreatmentStatuses).toContain(verification?.treatmentStatus);
      expect(verification?.treatmentSource.trim().length).toBeGreaterThan(15);
      expect(verification?.treatmentSource).toMatch(
        /official|legislative|federal|citator|regulation|docket/i,
      );
    });
  });

  it("records forum applicability before treating authority as controlling", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const validJurisdictionFits = [
      "controlling",
      "persuasive-only",
      "forum-mismatch",
      "pending-forum-analysis",
    ];

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;

      expect(verification?.targetForum.trim().length).toBeGreaterThan(10);
      expect(validJurisdictionFits).toContain(verification?.jurisdictionFit);
    });

    const nonControlling = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.jurisdictionFit !== "controlling",
    );
    expect(nonControlling.length).toBeGreaterThan(0);
    nonControlling.forEach((anchor) => {
      expect(anchor.citationVerification?.alignment).toBe("needs-counsel-review");
    });

    const controlling = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.jurisdictionFit === "controlling",
    );
    expect(controlling.length).toBeGreaterThan(0);
    controlling.forEach((anchor) => {
      expect(anchor.citationVerification?.authorityStrength).toBe("binding");
    });
  });

  it("records a bounded refresh window for every legal authority", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const validFreshnessStatuses = ["current", "refresh-due", "event-watch"];
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    expect(legalAuthorities.length).toBeGreaterThan(0);
    legalAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;
      const checkedAt = Date.parse(verification?.checkedAt ?? "");
      const refreshDueAt = Date.parse(verification?.refreshDueAt ?? "");
      const reviewWindowDays = (refreshDueAt - checkedAt) / millisecondsPerDay;

      expect(validFreshnessStatuses).toContain(verification?.freshnessStatus);
      expect(refreshDueAt).toBeGreaterThan(checkedAt);
      expect(reviewWindowDays).toBeLessThanOrEqual(92);
      expect(verification?.refreshReason.trim().length).toBeGreaterThan(40);
    });
  });

  it("blocks due or event-watched authority from supporting reliance", () => {
    const legalAuthorities = anchors.filter(
      (anchor) => anchor.referenceType === "statute" || anchor.referenceType === "case-law",
    );
    const currentAuthorities = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.freshnessStatus === "current",
    );
    const nonCurrentAuthorities = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.freshnessStatus !== "current",
    );

    expect(currentAuthorities.length).toBeGreaterThan(0);
    expect(nonCurrentAuthorities.length).toBeGreaterThan(0);
    nonCurrentAuthorities.forEach((anchor) => {
      expect(anchor.citationVerification?.alignment).toBe("needs-counsel-review");
    });

    const unsettledAuthorities = legalAuthorities.filter(
      (anchor) => anchor.citationVerification?.authorityStrength === "unsettled",
    );
    expect(unsettledAuthorities.length).toBeGreaterThan(0);
    unsettledAuthorities.forEach((anchor) => {
      const verification = anchor.citationVerification;
      const reviewWindowDays =
        (Date.parse(verification?.refreshDueAt ?? "") -
          Date.parse(verification?.checkedAt ?? "")) /
        (24 * 60 * 60 * 1000);

      expect(verification?.freshnessStatus).toBe("event-watch");
      expect(reviewWindowDays).toBeLessThanOrEqual(14);
    });
  });

  it("prevents unresolved or negatively treated authority from supporting reliance", () => {
    const unresolvedAuthorities = anchors.filter((anchor) => {
      const status = anchor.citationVerification?.treatmentStatus;
      return status && status !== "good-law";
    });

    expect(unresolvedAuthorities.length).toBeGreaterThan(0);
    unresolvedAuthorities.forEach((anchor) => {
      expect(anchor.citationVerification?.alignment).toBe("needs-counsel-review");
    });
  });
});

describe("external-use filing readiness", () => {
  it("requires complete human verification before a court filing is ready", () => {
    const courtFilings = filingReadinessReviews.filter((review) => review.intendedUse === "court-filing");
    const readyFilings = courtFilings.filter((review) => review.status === "ready");

    expect(courtFilings.length).toBeGreaterThanOrEqual(2);
    expect(readyFilings.length).toBeGreaterThan(0);
    readyFilings.forEach((review) => {
      expect(review.citationsVerified).toBe(true);
      expect(review.sourceTextVerified).toBe(true);
      expect(review.independentLegalJudgmentConfirmed).toBe(true);
      expect(review.courtAIDisclosureStatus).not.toBe("pending-local-rule-check");
      expect(Date.parse(review.courtAIDisclosureCheckedAt ?? "")).not.toBeNaN();
      expect(review.reviewedBy?.trim().length).toBeGreaterThan(2);
      expect(Date.parse(review.reviewedAt ?? "")).not.toBeNaN();
    });
  });

  it("requires a forum-specific AI disclosure check before filing readiness", () => {
    const courtFilings = filingReadinessReviews.filter((review) => review.intendedUse === "court-filing");
    const completedDisclosureChecks = courtFilings.filter(
      (review) => review.courtAIDisclosureStatus === "required-complete",
    );
    const pendingDisclosureChecks = courtFilings.filter(
      (review) => review.courtAIDisclosureStatus === "pending-local-rule-check",
    );
    const validDisclosureStatuses = [
      "required-complete",
      "not-required-confirmed",
      "pending-local-rule-check",
    ];

    expect(completedDisclosureChecks.length).toBeGreaterThan(0);
    expect(pendingDisclosureChecks.length).toBeGreaterThan(0);
    courtFilings.forEach((review) => {
      expect(review.targetCourt.trim().length).toBeGreaterThan(20);
      expect(validDisclosureStatuses).toContain(review.courtAIDisclosureStatus);
      expect(review.courtAIDisclosureSource.trim().length).toBeGreaterThan(80);

      if (review.courtAIDisclosureStatus === "pending-local-rule-check") {
        expect(review.status).not.toBe("ready");
        expect(review.courtAIDisclosureCheckedAt).toBeNull();
        expect(review.courtAIDisclosureSource).toMatch(/local rules|standing orders|assigned-judge/i);
      } else {
        expect(Date.parse(review.courtAIDisclosureCheckedAt ?? "")).not.toBeNaN();
      }

      if (review.courtAIDisclosureStatus === "required-complete") {
        expect(review.courtAIDisclosureSource).toMatch(/certificate|certification/i);
      }
    });
  });

  it("blocks filing use when cited authority has unresolved verification risks", () => {
    const unresolvedContractIds = new Set(
      complianceChecks
        .filter((check) =>
          check.evidenceAnchors?.some((anchor) => {
            const verification = anchor.citationVerification;
            return Boolean(
              verification &&
                (verification.sourceTextStatus === "source-mismatch" ||
                  verification.alignment !== "supports-claim" ||
                  verification.treatmentStatus !== "good-law" ||
                  verification.jurisdictionFit !== "controlling" ||
                  verification.freshnessStatus !== "current"),
            );
          }),
        )
        .map((check) => check.contractId),
    );
    const affectedFilingReviews = filingReadinessReviews.filter(
      (review) => review.intendedUse === "court-filing" && unresolvedContractIds.has(review.contractId),
    );

    expect(unresolvedContractIds.size).toBeGreaterThan(0);
    expect(affectedFilingReviews.length).toBeGreaterThan(0);
    affectedFilingReviews.forEach((review) => {
      expect(review.status).toBe("blocked");
      expect(review.reviewNote).toMatch(/blocked|must replace|re-evaluate/i);
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

describe("privilege and AI data handling", () => {
  it("records accountable pre-processing reviews for known contracts", () => {
    const knownContractIds = new Set(contracts.map((contract) => contract.id));
    const reviewedContractIds = privilegeHandlingReviews.map((review) => review.contractId);

    expect(privilegeHandlingReviews.length).toBeGreaterThanOrEqual(3);
    expect(new Set(reviewedContractIds).size).toBe(reviewedContractIds.length);
    privilegeHandlingReviews.forEach((review) => {
      expect(knownContractIds.has(review.contractId)).toBe(true);
      expect(review.reviewedBy.trim().length).toBeGreaterThan(2);
      expect(review.reviewedBy).not.toMatch(/legal ai|model|automation/i);
      expect(Date.parse(review.reviewedAt)).not.toBeNaN();
      expect(review.handlingNote.trim().length).toBeGreaterThan(80);
    });
  });

  it("records matter-specific client-consent decisions before AI processing", () => {
    const validConsentStatuses = [
      "specific-consent-documented",
      "risk-reviewed-not-required",
      "missing",
    ];
    const documentedConsent = privilegeHandlingReviews.filter(
      (review) => review.clientConsentStatus === "specific-consent-documented",
    );
    const missingConsent = privilegeHandlingReviews.filter(
      (review) => review.clientConsentStatus === "missing",
    );

    expect(documentedConsent.length).toBeGreaterThan(0);
    expect(missingConsent.length).toBeGreaterThan(0);
    privilegeHandlingReviews.forEach((review) => {
      expect(validConsentStatuses).toContain(review.clientConsentStatus);
      expect(review.clientConsentBasis.trim().length).toBeGreaterThan(100);

      if (review.clientConsentStatus === "specific-consent-documented") {
        expect(Date.parse(review.clientConsentRecordedAt ?? "")).not.toBeNaN();
        expect(review.clientConsentBasis).toMatch(/client|matter|contract/i);
        expect(review.clientConsentBasis).toMatch(/risk|disclosure/i);
        expect(review.clientConsentBasis).toMatch(/benefit|review/i);
      }

      if (review.clientConsentStatus === "risk-reviewed-not-required") {
        expect(review.requestedEnvironment).not.toBe("public-ai");
        expect(review.providerTrainingOptOut).toBe(true);
        expect(review.retentionDays ?? 31).toBeLessThanOrEqual(30);
      }

      if (review.clientConsentStatus === "missing") {
        expect(review.clientConsentRecordedAt).toBeNull();
        expect(review.decision).not.toBe("approved-private");
      }
    });
  });

  it("keeps potentially privileged material private and counsel-directed", () => {
    const potentiallyPrivileged = privilegeHandlingReviews.filter(
      (review) => review.sensitivity === "potentially-privileged",
    );

    expect(potentiallyPrivileged.length).toBeGreaterThan(0);
    potentiallyPrivileged.forEach((review) => {
      expect(review.requestedEnvironment).not.toBe("public-ai");
      expect(review.providerTrainingOptOut).toBe(true);
      expect(review.counselDirected).toBe(true);
      expect(["approved-private", "counsel-review-required"]).toContain(review.decision);
    });
  });

  it("blocks public AI tools when confidentiality controls are inadequate", () => {
    const publicToolRequests = privilegeHandlingReviews.filter(
      (review) => review.requestedEnvironment === "public-ai",
    );

    expect(publicToolRequests.length).toBeGreaterThan(0);
    publicToolRequests.forEach((review) => {
      expect(review.decision).toBe("blocked-public-tool");
      expect(review.handlingNote).toMatch(/blocked|reroute|private workspace/i);
    });
  });

  it("approves private processing only with training and retention safeguards", () => {
    const approved = privilegeHandlingReviews.filter(
      (review) => review.decision === "approved-private",
    );

    expect(approved.length).toBeGreaterThan(0);
    approved.forEach((review) => {
      expect(["enterprise-private", "local-sandbox"]).toContain(review.requestedEnvironment);
      expect(review.providerTrainingOptOut).toBe(true);
      expect(review.retentionDays ?? -1).toBeGreaterThanOrEqual(0);
      expect(review.retentionDays ?? 31).toBeLessThanOrEqual(30);
      expect(review.counselDirected).toBe(true);
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

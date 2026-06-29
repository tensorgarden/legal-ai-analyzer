import { Badge, Card, ProgressBar, StatusDot, StatCard } from "@/components/ui";
import {
  heroMetrics,
  contracts,
  reviewQueue,
  clauses,
  riskAssessment,
  complianceChecks,
  reviewTimeline,
} from "@/demo-data";

const riskVariant = (level: string) => {
  if (level === "high") return "high";
  if (level === "medium") return "medium";
  return "low";
};

const complianceStatusVariant = (status: string) => {
  if (status === "pass") return "success";
  if (status === "fail") return "high";
  return "warning";
};

const confidenceVariant = (score: number): "success" | "info" | "warning" => {
  if (score >= 0.9) return "success";
  if (score >= 0.75) return "info";
  return "warning";
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ─── Hero Stats ─────────────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Overview</h2>
        <p className="mb-5 text-sm text-gray-500">Contract review pipeline at a glance</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Contracts Reviewed"
            value={heroMetrics.contractsReviewed}
            trend={{ direction: "up", value: "3 this week" }}
          />
          <StatCard
            label="High-Risk Clauses"
            value={heroMetrics.highRiskClauses}
            trend={{ direction: "down", value: "from 9 last month" }}
          />
          <StatCard
            label="Compliance Score"
            value={`${heroMetrics.complianceScore}%`}
            trend={{ direction: "up", value: "+5% improvement" }}
          />
          <StatCard
            label="Avg Review Time"
            value={`${heroMetrics.avgReviewTimeMinutes}m`}
            trend={{ direction: "down", value: "down from 8.1m" }}
          />
        </div>
      </section>

      {/* ─── Review Queue ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Review Queue</h2>
        <p className="mb-5 text-sm text-gray-500">
          Contracts awaiting review or action
        </p>
        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3">Contract</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Risk Score</th>
                  <th className="px-5 py-3">Clauses</th>
                  <th className="px-5 py-3">Uploaded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviewQueue.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-5 py-3.5 font-medium text-ink">{c.title}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="info">{c.type.toUpperCase()}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusDot status={c.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={c.riskScore} variant={riskVariant(c.riskLevel)} className="w-20" />
                        <span className="text-xs font-semibold tabular-nums text-gray-700">{c.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{c.clauseCount}</td>
                    <td className="px-5 py-3.5 text-gray-500">
                      {new Date(c.uploadedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ─── Clause Extraction Table ─────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Extracted Clauses</h2>
        <p className="mb-5 text-sm text-gray-500">
          AI-extracted clauses with risk scores and recommendations
        </p>
        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3">Clause</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Risk</th>
                  <th className="px-5 py-3">Issues</th>
                  <th className="px-5 py-3">Contract</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clauses
                  .filter((cl) => cl.riskLevel !== "low" || cl.issues.length > 0)
                  .slice(0, 12)
                  .map((cl) => {
                    const contract = contracts.find((c) => c.id === cl.contractId);
                    return (
                      <tr key={cl.id} className="transition-colors hover:bg-gray-50">
                        <td className="px-5 py-3.5 font-medium text-ink">{cl.title}</td>
                        <td className="px-5 py-3.5">
                          <Badge variant="neutral">{cl.category.replace("-", " ")}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant={riskVariant(cl.riskLevel)}>{cl.riskScore}</Badge>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs">
                          {cl.issues.length > 0 ? (
                            <ul className="list-inside list-disc space-y-0.5 text-xs text-gray-600">
                              {cl.issues.slice(0, 2).map((issue, i) => (
                                <li key={i}>{issue}</li>
                              ))}
                              {cl.issues.length > 2 && (
                                <li className="text-accent">+{cl.issues.length - 2} more</li>
                              )}
                            </ul>
                          ) : (
                            <span className="text-xs text-gray-400">No issues</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-gray-500">
                          {contract?.title.split("\u2014")[1]?.trim() ?? contract?.title ?? ""}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ─── Risk Heatmap ────────────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Risk Heatmap</h2>
        <p className="mb-5 text-sm text-gray-500">Average risk by clause category across all contracts</p>
        <Card>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {riskAssessment.riskHeatmap
              .sort((a, b) => b.avgScore - a.avgScore)
              .map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                >
                  <div className="mb-1 text-xs font-medium capitalize text-gray-500">
                    {item.category.replace("-", " ")}
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold tabular-nums text-ink">
                      {Math.round(item.avgScore)}
                    </span>
                    <span className="text-xs text-gray-400">{item.count} clauses</span>
                  </div>
                  <ProgressBar
                    value={item.avgScore}
                    variant={item.avgScore >= 60 ? "high" : item.avgScore >= 30 ? "medium" : "low"}
                    className="mt-2"
                  />
                </div>
              ))}
          </div>
        </Card>
      </section>

      {/* ─── Compliance Checklist ────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Compliance Checklist</h2>
        <p className="mb-5 text-sm text-gray-500">
          Regulatory checks across your contract portfolio
        </p>
        <Card className="overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-3">Regulation</th>
                  <th className="px-5 py-3">Framework</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Details</th>
                  <th className="px-5 py-3">Confidence</th>
                  <th className="px-5 py-3">Last Checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {complianceChecks.map((cc) => (
                    <tr key={cc.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-5 py-3.5 font-medium text-ink">{cc.regulation}</td>
                      <td className="px-5 py-3.5">
                        <Badge variant="info">{cc.framework}</Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant={complianceStatusVariant(cc.status)}>
                          {cc.status === "review-required" ? "review" : cc.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 max-w-md text-xs text-gray-600">{cc.details}</td>
                      <td className="px-5 py-3.5 max-w-xs text-xs text-gray-600">
                        <div className="flex flex-col gap-1">
                          <Badge variant={confidenceVariant(cc.confidenceScore)}>
                            {Math.round(cc.confidenceScore * 100)}% confidence
                          </Badge>
                          <span className="line-clamp-2 text-gray-500">{cc.confidenceRationale}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">
                        {new Date(cc.lastChecked).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ─── Review Timeline ─────────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-1 text-2xl font-bold tracking-tight text-ink">Review Timeline</h2>
        <p className="mb-5 text-sm text-gray-500">Recent activity across all contracts</p>
        <Card>
          <div className="space-y-0">
            {reviewTimeline.slice(0, 12).map((evt) => (
              <div
                key={evt.id}
                className="flex items-start gap-4 border-b border-gray-100 py-3 last:border-b-0"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {evt.actor[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-ink">{evt.actor}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(evt.timestamp).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{evt.action}</span> &mdash; {evt.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

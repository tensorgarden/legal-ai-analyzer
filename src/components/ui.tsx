// UI primitives for the Legal AI Analyzer dashboard

import clsx from "clsx";

// ─── Badge ──────────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode;
  variant?: "high" | "medium" | "low" | "neutral" | "success" | "warning" | "info";
  className?: string;
}

const badgeVariants: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-green-100 text-green-800 border-green-200",
  neutral: "bg-gray-100 text-gray-700 border-gray-200",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  warning: "bg-orange-100 text-orange-800 border-orange-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Card({ children, className, as: Component = "div" }: CardProps) {
  return (
    <Component
      className={clsx(
        "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </Component>
  );
}

// ─── ProgressBar ────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "high" | "medium" | "low";
  className?: string;
}

const progressColors: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

export function ProgressBar({ value, max = 100, variant = "medium", className }: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}>
      <div
        className={clsx("h-full rounded-full transition-all duration-500", progressColors[variant])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── StatusDot ──────────────────────────────────────────────────────────────────

type Status = "draft" | "in-review" | "completed" | "flagged" | "needs-attention";

const statusMap: Record<Status, { color: string; label: string }> = {
  draft: { color: "bg-gray-400", label: "Draft" },
  "in-review": { color: "bg-blue-500", label: "In Review" },
  completed: { color: "bg-emerald-500", label: "Completed" },
  flagged: { color: "bg-red-500", label: "Flagged" },
  "needs-attention": { color: "bg-amber-500", label: "Needs Attention" },
};

interface StatusDotProps {
  status: Status;
  className?: string;
}

export function StatusDot({ status, className }: StatusDotProps) {
  const s = statusMap[status] ?? statusMap.draft;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-sm font-medium", className)}>
      <span className={clsx("inline-block h-2.5 w-2.5 rounded-full", s.color)} />
      {s.label}
    </span>
  );
}

// ─── StatCard ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: { direction: "up" | "down"; value: string };
  className?: string;
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <Card className={clsx("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-3xl font-bold tracking-tight text-ink">{value}</span>
      {trend && (
        <span
          className={clsx(
            "text-xs font-medium",
            trend.direction === "up" ? "text-emerald-600" : "text-red-600",
          )}
        >
          {trend.direction === "up" ? "\u2191" : "\u2193"} {trend.value}
        </span>
      )}
    </Card>
  );
}

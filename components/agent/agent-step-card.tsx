// ============================================================
// Agent Step Card
// ============================================================
// Displays a single workflow step with status, progress, and details.
// Shows error + retry button for failed steps.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import type { AgentStep } from "@/lib/agent/types";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Circle,
  SkipForward,
  RotateCcw,
} from "lucide-react";

interface AgentStepCardProps {
  step: AgentStep;
  index: number;
  onRetry?: (stepId: string) => void;
}

const statusConfig = {
  pending: {
    icon: Circle,
    color: "text-[var(--color-text-muted)]",
    bg: "bg-transparent",
    border: "border-[var(--color-border)]",
  },
  running: {
    icon: Loader2,
    color: "text-[var(--color-accent-ios-blue)]",
    bg: "bg-[var(--color-accent-ios-blue)]/5",
    border: "border-[var(--color-accent-ios-blue)]/20",
  },
  succeeded: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
  },
  failed: {
    icon: XCircle,
    color: "text-rose-500",
    bg: "bg-rose-500/5",
    border: "border-rose-500/20",
  },
  skipped: {
    icon: SkipForward,
    color: "text-[var(--color-text-muted)]",
    bg: "bg-[var(--color-surface)]",
    border: "border-[var(--color-border)]",
  },
};

export function AgentStepCard({ step, index, onRetry }: AgentStepCardProps) {
  const config = statusConfig[step.status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative flex gap-3 p-3 rounded-xl border transition-all duration-300",
        config.border,
        config.bg
      )}
    >
      {/* Step number + icon */}
      <div className="flex flex-col items-center gap-1 pt-0.5">
        <div
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium",
            step.status === "succeeded"
              ? "bg-emerald-500/10 text-emerald-600"
              : step.status === "failed"
              ? "bg-rose-500/10 text-rose-600"
              : step.status === "running"
              ? "bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]"
              : "bg-[var(--color-surface)] text-[var(--color-text-muted)]"
          )}
        >
          {index + 1}
        </div>
        <Icon
          className={cn(
            "w-4 h-4",
            config.color,
            step.status === "running" && "animate-spin"
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
            {step.name}
          </h4>
          {step.requiresApproval && !step.approved && step.status !== "succeeded" && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-600">
              需确认
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
          {step.description}
        </p>

        {/* Input/Output summary */}
        {step.inputSummary && (
          <p className="text-[11px] text-[var(--color-text-muted)] mt-1.5 font-mono">
            输入: {step.inputSummary}
          </p>
        )}
        {step.outputSummary && (
          <p className="text-[11px] text-emerald-600/80 mt-1 font-mono">
            输出: {step.outputSummary}
          </p>
        )}

        {/* Error */}
        {step.error && (
          <div className="mt-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/10">
            <p className="text-xs text-rose-600">{step.error}</p>
            {onRetry && (
              <button
                onClick={() => onRetry(step.id)}
                className="mt-1.5 flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                重试
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

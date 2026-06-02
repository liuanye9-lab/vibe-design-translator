// ============================================================
// Agent Progress Bar
// ============================================================
// Clean, minimal progress indicator with percentage.
// Uses subtle animation for running state.
// ============================================================

"use client";

import { cn } from "@/lib/utils";

interface AgentProgressBarProps {
  progress: number;
  status: "idle" | "running" | "waiting_for_user" | "succeeded" | "failed" | "cancelled";
  className?: string;
}

export function AgentProgressBar({ progress, status, className }: AgentProgressBarProps) {
  const getBarColor = () => {
    switch (status) {
      case "succeeded":
        return "bg-emerald-500";
      case "failed":
        return "bg-rose-500";
      case "cancelled":
        return "bg-[var(--color-text-muted)]";
      case "waiting_for_user":
        return "bg-amber-500";
      case "running":
        return "bg-[var(--color-accent-ios-blue)]";
      default:
        return "bg-[var(--color-border)]";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">
          {status === "running" ? "执行中..." :
           status === "waiting_for_user" ? "等待确认" :
           status === "succeeded" ? "已完成" :
           status === "failed" ? "已失败" :
           status === "cancelled" ? "已取消" : "就绪"}
        </span>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">
          {progress}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--color-surface)] overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            getBarColor(),
            status === "running" && "animate-pulse"
          )}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  );
}

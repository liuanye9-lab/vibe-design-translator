// ============================================================
// Agent Run Panel
// ============================================================
// The main panel showing a complete agent workflow run.
// Combines progress bar, timeline, tool traces, and event log.
//
// Design: Liquid Glass aesthetic, clean hierarchy, restrained.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import type { AgentRun } from "@/lib/agent/types";
import { AgentProgressBar } from "./agent-progress-bar";
import { WorkflowTimeline } from "./workflow-timeline";
import { ToolCallTrace } from "./tool-call-trace";
import { AgentEventLog } from "./agent-event-log";
import { X, Minimize2 } from "lucide-react";

interface AgentRunPanelProps {
  run: AgentRun;
  onClose?: () => void;
  onMinimize?: () => void;
  onRetryStep?: (stepId: string) => void;
  compact?: boolean;
}

const runTypeLabels: Record<string, string> = {
  design_translation: "设计翻译",
  page_diagnosis: "页面诊断",
  refactor_prompt: "重构 Prompt",
  project_export: "项目导出",
};

export function AgentRunPanel({
  run,
  onClose,
  onMinimize,
  onRetryStep,
  compact = false,
}: AgentRunPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)]",
        "bg-[var(--color-surface)]/80 backdrop-blur-xl",
        "shadow-sm overflow-hidden",
        compact ? "max-w-md" : "max-w-2xl w-full"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]">
            {runTypeLabels[run.type] || run.type}
          </span>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
            {run.title}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pt-3">
        <AgentProgressBar progress={run.progress} status={run.status} />
      </div>

      {/* Content */}
      <div className={cn("p-4 space-y-3", compact && "max-h-80 overflow-y-auto")}>
        {/* Steps Timeline */}
        <WorkflowTimeline steps={run.steps} onRetryStep={onRetryStep} />

        {/* Tool Call Trace */}
        {!compact && <ToolCallTrace events={run.events} />}

        {/* Event Log */}
        {!compact && <AgentEventLog events={run.events} />}
      </div>

      {/* Footer */}
      {run.error && (
        <div className="px-4 py-3 border-t border-rose-500/20 bg-rose-500/5">
          <p className="text-xs text-rose-600">{run.error}</p>
        </div>
      )}
    </div>
  );
}

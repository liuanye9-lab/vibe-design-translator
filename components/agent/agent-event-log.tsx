// ============================================================
// Agent Event Log
// ============================================================
// Append-only event log, collapsed by default.
// Shows full audit trail of the workflow.
// ============================================================

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AgentEvent } from "@/lib/agent/types";
import { ChevronDown, ChevronRight, ScrollText } from "lucide-react";

interface AgentEventLogProps {
  events: AgentEvent[];
}

const eventColorMap: Record<string, string> = {
  run_started: "text-[var(--color-accent-ios-blue)]",
  step_started: "text-[var(--color-text-secondary)]",
  tool_called: "text-violet-500",
  step_succeeded: "text-emerald-500",
  step_failed: "text-rose-500",
  fallback_used: "text-amber-500",
  user_approval_required: "text-amber-500",
  user_approved: "text-emerald-500",
  run_succeeded: "text-emerald-500",
  run_failed: "text-rose-500",
  run_cancelled: "text-[var(--color-text-muted)]",
};

export function AgentEventLog({ events }: AgentEventLogProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (events.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <ScrollText className="w-3.5 h-3.5" />
        <span className="font-medium">事件日志 ({events.length})</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 ml-auto" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 ml-auto" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-1 max-h-60 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-2 py-1 text-xs"
            >
              <span className="text-[var(--color-text-muted)] font-mono shrink-0 w-16">
                {new Date(event.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
              <span
                className={cn(
                  "font-mono shrink-0 w-28 truncate",
                  eventColorMap[event.type] || "text-[var(--color-text-muted)]"
                )}
              >
                {event.type}
              </span>
              <span className="text-[var(--color-text-secondary)]">
                {event.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

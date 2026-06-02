// ============================================================
// Tool Call Trace
// ============================================================
// Shows which skills were called during the workflow.
// Compact, collapsible view.
// ============================================================

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AgentEvent } from "@/lib/agent/types";
import { ChevronDown, ChevronRight, Wrench } from "lucide-react";

interface ToolCallTraceProps {
  events: AgentEvent[];
}

export function ToolCallTrace({ events }: ToolCallTraceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toolCalls = events.filter((e) => e.type === "tool_called");

  if (toolCalls.length === 0) return null;

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
      >
        <Wrench className="w-3.5 h-3.5" />
        <span className="font-medium">工具调用 ({toolCalls.length})</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 ml-auto" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 ml-auto" />
        )}
      </button>

      {isExpanded && (
        <div className="px-3 pb-3 space-y-1.5">
          {toolCalls.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-2 text-xs font-mono"
            >
              <span className="text-[var(--color-text-muted)] shrink-0">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <span className="text-[var(--color-accent-ios-blue)]">
                {event.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

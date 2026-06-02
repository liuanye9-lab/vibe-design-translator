// ============================================================
// Workflow Timeline
// ============================================================
// Vertical timeline showing all steps in a workflow run.
// Clean, minimal design with Liquid Glass aesthetic.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import type { AgentStep } from "@/lib/agent/types";
import { AgentStepCard } from "./agent-step-card";

interface WorkflowTimelineProps {
  steps: AgentStep[];
  onRetryStep?: (stepId: string) => void;
}

export function WorkflowTimeline({ steps, onRetryStep }: WorkflowTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[26px] top-8 bottom-8 w-px bg-[var(--color-border)]" />

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <AgentStepCard
              step={step}
              index={index}
              onRetry={onRetryStep}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

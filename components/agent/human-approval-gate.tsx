// ============================================================
// Human Approval Gate
// ============================================================
// Shown when a step requires user confirmation.
// Inspired by Claude Code's human approval pattern.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { LiquidButton } from "@/components/ui/liquid-button";
import { ShieldCheck } from "lucide-react";

interface HumanApprovalGateProps {
  message: string;
  onApprove: () => void;
  onReject?: () => void;
  isProcessing?: boolean;
}

export function HumanApprovalGate({
  message,
  onApprove,
  onReject,
  isProcessing = false,
}: HumanApprovalGateProps) {
  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
            需要确认
          </h4>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            {message}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <LiquidButton
              onClick={onApprove}
              disabled={isProcessing}
              size="sm"
            >
              {isProcessing ? "处理中..." : "确认继续"}
            </LiquidButton>
            {onReject && (
              <button
                onClick={onReject}
                disabled={isProcessing}
                className="px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                跳过
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

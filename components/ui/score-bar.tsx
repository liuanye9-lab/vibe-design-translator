// ============================================================
// Vibe Design Translator - Score Bar Component
// ============================================================

"use client";

import { cn, getScoreBgColor } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScoreBarProps {
  label: string;
  value: number;
  description?: string;
  showValue?: boolean;
  className?: string;
}

export function ScoreBar({
  label,
  value,
  description,
  showValue = true,
  className,
}: ScoreBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  const bgColor = getScoreBgColor(clampedValue);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </span>
        {showValue && (
          <span className="text-sm font-semibold text-[var(--color-text-secondary)]">
            {clampedValue}
          </span>
        )}
      </div>
      <div className="h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn("h-full rounded-full", bgColor)}
        />
      </div>
      {description && (
        <p className="text-xs text-[var(--color-text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}
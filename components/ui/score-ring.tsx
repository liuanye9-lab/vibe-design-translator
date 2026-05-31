// ============================================================
// Vibe Design Translator - Score Ring Component
// ============================================================

"use client";

import { cn, getScoreColor } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScoreRingProps {
  value: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

export function ScoreRing({
  value,
  size = "md",
  label,
  className,
}: ScoreRingProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeColor = getScoreColor(clampedValue);

  // Size configurations
  const sizes = {
    sm: { diameter: 80, stroke: 6, fontSize: "text-lg" },
    md: { diameter: 120, stroke: 8, fontSize: "text-3xl" },
    lg: { diameter: 160, stroke: 10, fontSize: "text-4xl" },
  };

  const config = sizes[size];
  const radius = (config.diameter - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-[var(--color-surface)]"
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={strokeColor}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-semibold", config.fontSize, strokeColor)}>
          {clampedValue}
        </span>
        {label && (
          <span className="text-xs text-[var(--color-text-secondary)]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
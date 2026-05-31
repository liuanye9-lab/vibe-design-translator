// ============================================================
// Vibe Design Translator - Empty State Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { LiquidButton } from "./liquid-button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-8",
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-3xl bg-[var(--color-surface)] flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-[var(--color-text-secondary)]" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--color-text-secondary)] max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && (
        <LiquidButton variant="secondary" onClick={action.onClick}>
          {action.label}
        </LiquidButton>
      )}
    </div>
  );
}
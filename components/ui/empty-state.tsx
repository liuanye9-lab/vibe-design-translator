// ============================================================
// Vibe Design Translator - Empty State Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { LiquidButton } from "./liquid-button";

interface EmptyStateActionConfig {
  label: string;
  onClick: () => void;
}

type EmptyStateAction = ReactNode | EmptyStateActionConfig;

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

function isActionConfig(action: EmptyStateAction | undefined): action is EmptyStateActionConfig {
  return typeof action === "object" && action !== null && "label" in action && "onClick" in action;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const renderedAction = isActionConfig(action) ? (
    <LiquidButton variant="secondary" onClick={action.onClick}>
      {action.label}
    </LiquidButton>
  ) : (
    action
  );

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
      {renderedAction}
    </div>
  );
}

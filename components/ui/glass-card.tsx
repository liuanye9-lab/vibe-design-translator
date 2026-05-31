// ============================================================
// Vibe Design Translator - Glass Card Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "strong" | "interactive";
  className?: string;
}

export function GlassCard({
  children,
  variant = "default",
  className,
  ...props
}: GlassCardProps) {
  const variantClasses = {
    default: "glass-card",
    strong: "glass-card-strong",
    interactive: "glass-card-interactive cursor-pointer",
  };

  return (
    <div
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ============================================================
// Sub-components for common patterns
// ============================================================

interface GlassCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return (
    <div className={cn("p-6 border-b border-[var(--color-border)]", className)}>
      {children}
    </div>
  );
}

interface GlassCardContentProps {
  children: ReactNode;
  className?: string;
}

export function GlassCardContent({ children, className }: GlassCardContentProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

interface GlassCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function GlassCardFooter({ children, className }: GlassCardFooterProps) {
  return (
    <div className={cn("p-6 border-t border-[var(--color-border)]", className)}>
      {children}
    </div>
  );
}
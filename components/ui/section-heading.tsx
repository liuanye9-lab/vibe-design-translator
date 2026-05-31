// ============================================================
// Vibe Design Translator - Section Heading Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-12", alignClasses[align], className)}>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-4">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-medium uppercase tracking-widest",
        "text-[var(--color-accent-mist-blue)] mb-4",
        className
      )}
    >
      {children}
    </span>
  );
}
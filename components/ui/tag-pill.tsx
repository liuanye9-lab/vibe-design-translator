// ============================================================
// Vibe Design Translator - Tag Pill Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TagPillProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TagPill({
  children,
  active = false,
  onClick,
  className,
}: TagPillProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "tag cursor-pointer",
        active && "tag-active",
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TagGroupProps {
  children: ReactNode;
  className?: string;
}

export function TagGroup({ children, className }: TagGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {children}
    </div>
  );
}
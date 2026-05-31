// ============================================================
// Vibe Design Translator - Page Container Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
}

export function PageContainer({
  children,
  className,
  maxWidth = "xl",
  padding = "md",
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-6",
    md: "px-6 py-8",
    lg: "px-8 py-12",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================================
// Page Wrapper with Top Offset
// ============================================================

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  withTopNav?: boolean;
}

export function PageWrapper({
  children,
  className,
  withTopNav = true,
}: PageWrapperProps) {
  return (
    <main
      className={cn(
        "min-h-screen",
        withTopNav && "pt-20", // Offset for fixed top nav
        className
      )}
    >
      {children}
    </main>
  );
}
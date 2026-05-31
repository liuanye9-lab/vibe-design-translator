// ============================================================
// Vibe Design Translator - App Shell Component
// ============================================================

"use client";

import { ReactNode } from "react";
import { LiquidBackground } from "./liquid-background";
import { TopNav } from "./top-nav";

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
  showBackButton?: boolean;
  backHref?: string;
  title?: string;
}

export function AppShell({
  children,
  showNav = true,
  showBackButton = false,
  backHref,
  title,
}: AppShellProps) {
  return (
    <>
      <LiquidBackground />
      {showNav && (
        <TopNav
          showBackButton={showBackButton}
          backHref={backHref}
          title={title}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
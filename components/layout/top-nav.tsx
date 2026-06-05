// ============================================================
// Vibe Design Translator - Top Navigation Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDesignStore } from "@/store/use-design-store";
import { Sparkles, History, Settings, BookOpen, ArrowLeft, Folder, Workflow } from "lucide-react";
import { useI18n } from "@/lib/i18n/use-i18n";
import { LanguageToggle } from "./language-toggle";

const navItemsKeys = [
  "nav_home",
  "nav_workspace",
  "nav_agent_runs",
  "nav_patterns",
  "nav_settings",
] as const;

const navItemHrefs = ["/", "/workspace", "/agent-runs", "/patterns", "/settings"];
const navItemIcons = [Sparkles, Folder, Workflow, BookOpen, Settings];

interface TopNavProps {
  className?: string;
  showBackButton?: boolean;
  backHref?: string;
  title?: string;
}

export function TopNav({
  className,
  showBackButton = false,
  backHref = "/",
  title,
}: TopNavProps) {
  const pathname = usePathname();
  const history = useDesignStore((state) => state.history);
  const { t } = useI18n();

  const navItems = navItemsKeys.map((key, i) => ({
    href: navItemHrefs[i],
    label: t(key),
    icon: navItemIcons[i],
  }));

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "bg-[var(--color-surface)]/80 backdrop-blur-xl",
        "border-b border-[var(--color-border)]",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back button or Logo */}
          <div className="flex items-center gap-4">
            {showBackButton ? (
              <Link
                href={backHref}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl",
                  "text-sm font-medium text-[var(--color-text-secondary)]",
                  "hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]",
                  "transition-colors duration-200"
                )}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav_back")}</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--color-accent-ios-blue)] to-[var(--color-accent-soft-violet)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-[var(--color-text-primary)] hidden sm:inline">
                  {t("nav_brand")}
                </span>
              </Link>
            )}

            {title && (
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {title}
              </span>
            )}
          </div>

          {/* Center: Navigation items (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl",
                    "text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: History indicator + Language toggle */}
          <div className="flex items-center gap-4">
            {history.length > 0 && (
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[var(--color-text-secondary)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {history.length}
                </span>
              </div>
            )}

            {/* Language toggle */}
            <LanguageToggle />

            {/* Mobile menu button */}
            <button
              className={cn(
                "md:hidden p-2 rounded-xl",
                "text-[var(--color-text-secondary)]",
                "hover:bg-[var(--color-surface)]",
                "transition-colors duration-200"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

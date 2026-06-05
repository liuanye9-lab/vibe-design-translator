// ============================================================
// Vibe Design Translator - Language Toggle Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/use-i18n";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, toggleLocale } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "px-3 py-1.5 rounded-lg",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "text-xs font-medium",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-surface-hover)]",
        "transition-all duration-200",
        "select-none",
        className
      )}
      title={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {locale === "zh" ? (
        <span>
          <span className="font-semibold text-[var(--color-text-primary)]">中文</span>
          <span className="mx-1 text-[var(--color-text-muted)]">|</span>
          <span>EN</span>
        </span>
      ) : (
        <span>
          <span>ZH</span>
          <span className="mx-1 text-[var(--color-text-muted)]">|</span>
          <span className="font-semibold text-[var(--color-text-primary)]">English</span>
        </span>
      )}
    </button>
  );
}

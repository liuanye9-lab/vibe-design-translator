// ============================================================
// Vibe Design Translator - Language Toggle Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/use-i18n";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg",
          "text-xs font-medium transition-all duration-200",
          "text-[var(--color-text-secondary)]",
          "hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]",
          "border border-[var(--color-border)] hover:border-[var(--color-accent-ios-blue)]"
        )}
        title={locale === "zh" ? "Switch to English" : "切换为中文"}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{locale === "zh" ? "EN" : "中文"}</span>
      </button>
    </div>
  );
}

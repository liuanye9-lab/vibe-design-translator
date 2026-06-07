// ============================================================
// Vibe Design Translator - History Panel Component
// ============================================================

"use client";

import { HistoryEventType, HistoryItem } from "@/lib/types";
import { useDesignStore } from "@/store/use-design-store";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { EmptyState } from "@/components/ui/empty-state";
import { LiquidButton } from "@/components/ui/liquid-button";
import { cn, getRelativeTime } from "@/lib/utils";
import { TranslationKey } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/use-i18n";
import { History, Trash2, Lightbulb, Palette, Copy, Stethoscope, FileDown, FolderPlus, FilePenLine, LucideIcon } from "lucide-react";

const historyTypeIcons: Record<HistoryEventType, LucideIcon> = {
  brief_created: Lightbulb,
  direction_selected: Palette,
  prompt_copied: Copy,
  diagnosis_performed: Stethoscope,
  pack_exported: FileDown,
  project_created: FolderPlus,
  project_updated: FilePenLine,
};

const historyTypeLabelKeys: Record<HistoryEventType, TranslationKey> = {
  brief_created: "history.brief_created",
  direction_selected: "history.direction_selected",
  prompt_copied: "history.prompt_copied",
  diagnosis_performed: "history.diagnosis_performed",
  pack_exported: "history.pack_exported",
  project_created: "history.project_created",
  project_updated: "history.project_updated",
};

const historyTypeColors: Record<HistoryEventType, string> = {
  brief_created: "text-amber-500",
  direction_selected: "text-blue-500",
  prompt_copied: "text-green-500",
  diagnosis_performed: "text-purple-500",
  pack_exported: "text-cyan-500",
  project_created: "text-emerald-500",
  project_updated: "text-indigo-500",
};

interface HistoryPanelProps {
  className?: string;
}

export function HistoryPanel({ className }: HistoryPanelProps) {
  const { history, clearHistory } = useDesignStore();
  const { t } = useI18n();

  return (
    <GlassCard className={cn("", className)}>
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {t("history.title")}
            </h3>
          </div>
          {history.length > 0 && (
            <LiquidButton
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t("history.clear")}
            </LiquidButton>
          )}
        </div>
      </div>

      <GlassCardContent className="max-h-[400px] overflow-y-auto">
        {history.length === 0 ? (
          <EmptyState
            icon={History}
            title={t("history.empty")}
            description={t("history.empty.desc")}
          />
        ) : (
          <div className="space-y-3">
            {history.map((item) => {
              const Icon = historyTypeIcons[item.type];
              const colorClass = historyTypeColors[item.type];

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)] transition-colors"
                >
                  <div className={cn("mt-0.5", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t(historyTypeLabelKeys[item.type])}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {getRelativeTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
}

// ============================================================
// Vibe Design Translator - History Panel Component
// ============================================================

"use client";

import { HistoryItem } from "@/lib/types";
import { useDesignStore } from "@/store/use-design-store";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { EmptyState } from "@/components/ui/empty-state";
import { LiquidButton } from "@/components/ui/liquid-button";
import { cn, getRelativeTime } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/use-i18n";
import { History, Trash2, Lightbulb, Palette, Copy, Stethoscope, FileDown } from "lucide-react";

const historyTypeIcons = {
  brief_created: Lightbulb,
  direction_selected: Palette,
  prompt_copied: Copy,
  diagnosis_performed: Stethoscope,
  pack_exported: FileDown,
};

const historyTypeLabels = {
  zh: {
    brief_created: "已创建简报",
    direction_selected: "已选择方向",
    prompt_copied: "已复制提示词",
    diagnosis_performed: "已完成诊断",
    pack_exported: "已导出执行包",
  },
  en: {
    brief_created: "Brief Created",
    direction_selected: "Direction Selected",
    prompt_copied: "Prompt Copied",
    diagnosis_performed: "Diagnosis Performed",
    pack_exported: "Pack Exported",
  },
};

const historyTypeColors = {
  brief_created: "text-amber-500",
  direction_selected: "text-blue-500",
  prompt_copied: "text-green-500",
  diagnosis_performed: "text-purple-500",
  pack_exported: "text-cyan-500",
};

interface HistoryPanelProps {
  className?: string;
}

export function HistoryPanel({ className }: HistoryPanelProps) {
  const { history, clearHistory } = useDesignStore();
  const { locale } = useI18n();
  const labels = locale === "zh"
    ? {
        title: "历史记录",
        clear: "清空",
        emptyTitle: "暂无历史记录",
        emptyDescription: "你的操作记录会显示在这里",
      }
    : {
        title: "History",
        clear: "Clear",
        emptyTitle: "No history yet",
        emptyDescription: "Your activity will appear here",
      };

  return (
    <GlassCard className={cn("", className)}>
      <div className="p-6 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {labels.title}
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
              {labels.clear}
            </LiquidButton>
          )}
        </div>
      </div>

      <GlassCardContent className="max-h-[400px] overflow-y-auto">
        {history.length === 0 ? (
          <EmptyState
            icon={History}
            title={labels.emptyTitle}
            description={labels.emptyDescription}
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
                      {historyTypeLabels[locale][item.type]}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {getRelativeTime(item.timestamp, locale)}
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

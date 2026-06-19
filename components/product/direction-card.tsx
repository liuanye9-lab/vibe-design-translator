// ============================================================
// Vibe Design Translator - Direction Card Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { DesignDirection } from "@/lib/types";
import type { DirectionRecommendation } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { Check, Sparkles, WandSparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/use-i18n";
import { getDirectionPreviewTitle } from "@/lib/design-direction-i18n";
import { getPatternDisplayNameById } from "@/lib/design-pattern-i18n";
import { VisualDirectionPreview } from "@/components/visuals/visual-direction-preview";

interface DirectionCardProps {
  direction: DesignDirection;
  isSelected: boolean;
  recommendation?: DirectionRecommendation;
  onSelect: () => void;
  className?: string;
}

export function DirectionCard({
  direction,
  isSelected,
  recommendation,
  onSelect,
  className,
}: DirectionCardProps) {
  const { t, tVar, locale } = useI18n();
  const score = recommendation?.score ?? 0;
  const confidenceLabel = locale === "zh"
    ? recommendation?.confidence === "high"
      ? "高置信"
      : recommendation?.confidence === "medium"
      ? "中置信"
      : "低置信"
    : recommendation?.confidence === "high"
    ? "High confidence"
    : recommendation?.confidence === "medium"
    ? "Medium confidence"
    : "Low confidence";

  return (
    <GlassCard
      variant="interactive"
      className={cn(
        "p-6 cursor-pointer relative overflow-hidden",
        isSelected && "ring-2 ring-[var(--color-accent-ios-blue)]",
        className
      )}
      onClick={onSelect}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--color-accent-ios-blue)] flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Direction name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-ios-blue)] to-[var(--color-accent-soft-violet)] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
          {direction.name}
        </h3>
      </div>

      {recommendation && (
        <div className="mb-4 rounded-xl border border-[var(--color-border)] bg-white/55 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-ios-blue)]">
              <WandSparkles className="h-3.5 w-3.5" />
              {locale === "zh" ? "Agent 推荐" : "Agent pick"}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {confidenceLabel} · {score}/100
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
            {recommendation.reason}
          </p>
          {recommendation.materialPatternIds && recommendation.materialPatternIds.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {recommendation.materialPatternIds.slice(0, 4).map((patternId) => (
                <span
                  key={patternId}
                  className="rounded-md bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-secondary)]"
                >
                  {getPatternDisplayNameById(patternId, locale)}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
        {direction.description}
      </p>

      {/* Visual Preview */}
      <div className="mb-6">
        <VisualDirectionPreview
          directionId={direction.id}
          locale={locale}
          title={getDirectionPreviewTitle(locale)}
          className="border border-[var(--color-border)]"
        />
      </div>

      {/* Suitable for */}
      <div className="mb-4">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)] mb-2 block">
          {t("direction_card_best")}
        </span>
        <div className="flex flex-wrap gap-2">
          {direction.suitableFor.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-2 py-1 rounded-lg bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Color system preview */}
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)] mb-2 block">
          {t("direction_card_color")}
        </span>
        <div className="flex gap-2">
          {direction.colorSystem.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-lg border border-[var(--color-border)]"
              style={{
                backgroundColor: color.startsWith("#") ? color : undefined,
                background: !color.startsWith("#") ? `linear-gradient(135deg, ${color})` : undefined,
              }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Psychological effect */}
      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
        <span className="text-xs font-medium text-[var(--color-accent-mist-blue)]">
          {tVar("direction_card_psych", { effect: direction.psychologicalEffect })}
        </span>
      </div>
    </GlassCard>
  );
}

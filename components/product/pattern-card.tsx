// ============================================================
// Vibe Design Translator - Pattern Card Component
// ============================================================

"use client";

import { DesignPattern } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";
import { Lightbulb, Layout, Palette, Type, MousePointer } from "lucide-react";
import { DesignPatternPreview } from "@/components/visuals/design-pattern-preview";
import { useI18n } from "@/lib/i18n/use-i18n";
import { getMaterialAssetsByPatternIds, getMaterialSourceById } from "@/lib/material-library";
import {
  getPatternCategoryLabel,
  getPatternLabels,
} from "@/lib/design-pattern-i18n";

interface PatternCardProps {
  pattern: DesignPattern;
  animatedPreview?: boolean;
  onSelect: () => void;
  className?: string;
}

const categoryIcons = {
  Layout: Layout,
  Color: Palette,
  Typography: Type,
  Interaction: MousePointer,
};

const categoryColors = {
  Layout: "from-blue-500 to-cyan-500",
  Color: "from-purple-500 to-pink-500",
  Typography: "from-orange-500 to-amber-500",
  Interaction: "from-green-500 to-emerald-500",
};

export function PatternCard({ pattern, animatedPreview = true, onSelect, className }: PatternCardProps) {
  const { locale } = useI18n();
  const labels = getPatternLabels(locale);
  const material = getMaterialAssetsByPatternIds([pattern.id])[0];
  const source = material ? getMaterialSourceById(material.sourceId) : undefined;
  const Icon = categoryIcons[pattern.category as keyof typeof categoryIcons] || Lightbulb;
  const colorClass = categoryColors[pattern.category as keyof typeof categoryColors] || "from-gray-500 to-gray-600";

  return (
    <GlassCard
      variant="interactive"
      className={cn("p-6 cursor-pointer", className)}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br", colorClass, "flex items-center justify-center")}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
          {getPatternCategoryLabel(pattern.category, locale)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {pattern.name}
      </h3>

      {/* Suitable for */}
      <div className="mb-4">
        <p className="text-xs text-[var(--color-text-secondary)] mb-2">
          {labels.bestFor}
        </p>
        <div className="flex flex-wrap gap-1">
          {pattern.suitableFor.slice(0, 2).map((item) => (
            <span
              key={item}
              className="text-xs px-2 py-0.5 rounded bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {material && (
        <div className="mb-4 rounded-xl border border-[var(--color-border)] bg-white/55 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-[var(--color-text-primary)]">
              {material.title}
            </p>
            <span className="shrink-0 rounded-md bg-[var(--color-accent-ios-blue)]/10 px-1.5 py-0.5 text-[10px] text-[var(--color-accent-ios-blue)]">
              {material.mediaKind === "animated-gif"
                ? locale === "zh" ? "动图" : "GIF"
                : material.mediaKind === "video"
                ? locale === "zh" ? "视频" : "Video"
                : material.mediaKind === "css-motion"
                ? locale === "zh" ? "动效" : "Motion"
                : locale === "zh" ? "素材" : "Asset"}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-5 text-[var(--color-text-secondary)]">
            {material.motionSpec}
          </p>
          {source && (
            <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">
              {locale === "zh" ? "参考信号" : "Signal"} · {source.name} / {source.signal}
            </p>
          )}
        </div>
      )}

      {/* Visual traits preview */}
      <div className="space-y-2 mb-4">
        <p className="text-xs text-[var(--color-text-secondary)]">
          {labels.visualTraits}
        </p>
        <div className="space-y-1">
          {pattern.visualTraits.slice(0, 2).map((trait, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent-mist-blue)] mt-1.5 flex-shrink-0" />
              <span className="text-xs text-[var(--color-text-secondary)] line-clamp-1">
                {trait}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Preview */}
      <DesignPatternPreview
        patternId={pattern.id}
        animated={animatedPreview}
        title={animatedPreview ? labels.motionPreview : labels.preview}
        className="border border-[var(--color-border)]"
      />
    </GlassCard>
  );
}

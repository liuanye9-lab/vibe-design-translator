"use client";

import { DesignDirection } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface DirectionMoodboardTriptychProps {
  direction: DesignDirection;
  className?: string;
}

export function DirectionMoodboardTriptych({ direction, className }: DirectionMoodboardTriptychProps) {
  const colors = direction.colorSystem.slice(0, 4);
  const sections = direction.bestPageSections?.slice(0, 3) ?? direction.layoutAdvice.slice(0, 3);

  return (
    <GlassCard className={cn("overflow-hidden p-0", className)}>
      <div className="grid md:grid-cols-3">
        <div className="min-h-[180px] border-b border-[var(--color-border)] bg-white/55 p-5 md:border-b-0 md:border-r">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Color
          </p>
          <div className="flex h-24 overflow-hidden rounded-2xl border border-white/80 shadow-sm">
            {colors.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="flex-1"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            {direction.visualKeywords.slice(0, 3).join(" / ")}
          </p>
        </div>

        <div className="min-h-[180px] border-b border-[var(--color-border)] bg-white/40 p-5 md:border-b-0 md:border-r">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Type + Layout
          </p>
          <div className="space-y-3">
            <div className="h-4 w-2/3 rounded-full bg-[var(--color-text-primary)]/80" />
            <div className="h-3 w-full rounded-full bg-[var(--color-text-primary)]/20" />
            <div className="h-3 w-4/5 rounded-full bg-[var(--color-text-primary)]/20" />
            <div className="grid grid-cols-3 gap-2 pt-3">
              <div className="h-14 rounded-xl bg-[var(--color-surface)]" />
              <div className="h-14 rounded-xl bg-[var(--color-surface)]" />
              <div className="h-14 rounded-xl bg-[var(--color-surface)]" />
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
            {direction.typography}
          </p>
        </div>

        <div className="min-h-[180px] bg-white/55 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            适合场景
          </p>
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section}
                className="rounded-xl border border-[var(--color-border)] bg-white/65 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
              >
                {section}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

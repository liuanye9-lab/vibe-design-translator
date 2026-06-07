"use client";

import { DiagnosisReport } from "@/lib/types";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/glass-card";
import { ArrowRight } from "lucide-react";

interface BeforeAfterDiffRailProps {
  items: NonNullable<DiagnosisReport["beforeAfter"]>;
}

export function BeforeAfterDiffRail({ items }: BeforeAfterDiffRailProps) {
  if (!items.length) return null;

  return (
    <GlassCard>
      <GlassCardHeader>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          修复前后对照
        </h3>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="grid gap-4">
          {items.map((item, index) => (
            <div
              key={`${item.zoneId ?? "zone"}-${index}`}
              className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch"
            >
              <div className="rounded-xl border border-amber-200/70 bg-amber-50/70 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Before
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {item.before}
                </p>
              </div>
              <div className="flex items-center justify-center text-[var(--color-text-tertiary)]">
                <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
              </div>
              <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  After
                </p>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {item.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}

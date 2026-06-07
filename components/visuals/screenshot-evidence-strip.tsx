"use client";

import Image from "next/image";
import { DiagnosisReport, ScreenshotAsset } from "@/lib/types";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface ScreenshotEvidenceStripProps {
  screenshotAsset?: ScreenshotAsset | null;
  focusZones?: DiagnosisReport["focusZones"];
}

const severityClass = {
  low: "border-sky-400 bg-sky-400/10 text-sky-700",
  medium: "border-amber-400 bg-amber-400/10 text-amber-700",
  high: "border-red-500 bg-red-500/10 text-red-700",
};

export function ScreenshotEvidenceStrip({ screenshotAsset, focusZones = [] }: ScreenshotEvidenceStripProps) {
  if (!screenshotAsset && !focusZones.length) return null;

  return (
    <GlassCard>
      <GlassCardHeader>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          视觉证据
        </h3>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white/70">
            {screenshotAsset?.dataUrl ? (
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={screenshotAsset.dataUrl}
                  alt={screenshotAsset.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
                {focusZones.map((zone) => zone.bbox ? (
                  <div
                    key={zone.id}
                    className={cn(
                      "absolute rounded-lg border-2 shadow-sm",
                      severityClass[zone.severity]
                    )}
                    style={{
                      left: `${zone.bbox.x * 100}%`,
                      top: `${zone.bbox.y * 100}%`,
                      width: `${zone.bbox.w * 100}%`,
                      height: `${zone.bbox.h * 100}%`,
                    }}
                    title={zone.title}
                  />
                ) : null)}
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center px-6 text-center text-sm text-[var(--color-text-secondary)]">
                Focus zones are available, but no screenshot was attached to this run.
              </div>
            )}
          </div>

          <div className="space-y-3">
            {focusZones.map((zone) => (
              <div
                key={zone.id}
                className="rounded-xl border border-[var(--color-border)] bg-white/60 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {zone.title}
                  </p>
                  <span className={cn(
                    "rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                    severityClass[zone.severity]
                  )}>
                    {zone.severity}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {zone.evidence}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
}

// ============================================================
// Vibe Design Translator - Diagnosis Report Component
// ============================================================

"use client";

import { DiagnosisReport, ScreenshotAsset, ToolType } from "@/lib/types";
import { TOOL_LABELS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/use-i18n";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { ScoreRing } from "@/components/ui/score-ring";
import { ScoreBar } from "@/components/ui/score-bar";
import { CopyButton } from "@/components/ui/copy-button";
import { LiquidButton } from "@/components/ui/liquid-button";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { BeforeAfterDiffRail } from "@/components/visuals/before-after-diff-rail";
import { ScreenshotEvidenceStrip } from "@/components/visuals/screenshot-evidence-strip";

interface DiagnosisReportViewProps {
  report: DiagnosisReport;
  selectedTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onStartNew?: () => void;
  screenshotAsset?: ScreenshotAsset | null;
  className?: string;
}

export function DiagnosisReportView({
  report,
  selectedTool,
  onToolChange,
  onStartNew,
  screenshotAsset,
  className,
}: DiagnosisReportViewProps) {
  const router = useRouter();
  const { t } = useI18n();
  const scoreLabel = report.overallScore >= 70
    ? t("score.good")
    : report.overallScore >= 50
    ? t("score.medium")
    : t("score.low");
  const refactorPrompt = report.refactorPrompts[selectedTool];

  const scoreCategories = [
    { key: "aiTemplateFeeling", label: "AI 模板感" },
    { key: "visualHierarchy", label: "视觉层级" },
    { key: "colorControl", label: "颜色控制" },
    { key: "typographySystem", label: "字体系统" },
    { key: "spacingSystem", label: "间距系统" },
    { key: "interactionRestraint", label: "交互克制" },
    { key: "conversionClarity", label: "转化清晰度" },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Overall Score */}
      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing value={report.overallScore} size="lg" label={t("diagnosis.report.overall")} />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
              {scoreLabel} - {report.overallScore}/100
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              {report.overallScore >= 70
                ? t("score.good.desc")
                : report.overallScore >= 50
                ? t("score.medium.desc")
                : t("score.low.desc")}
            </p>
          </div>
        </div>
      </GlassCard>

      <ScreenshotEvidenceStrip
        screenshotAsset={screenshotAsset}
        focusZones={report.focusZones}
      />

      <BeforeAfterDiffRail items={report.beforeAfter ?? []} />

      {/* Score Breakdown */}
      <GlassCard>
        <GlassCardHeader>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t("diagnosis.report.breakdown")}
          </h3>
        </GlassCardHeader>
        <GlassCardContent className="space-y-6">
          {scoreCategories.map((category) => (
            <ScoreBar
              key={category.key}
              label={category.label}
              value={report.scores[category.key as keyof typeof report.scores]}
              description={`${report.scores[category.key as keyof typeof report.scores]}/100`}
            />
          ))}
        </GlassCardContent>
      </GlassCard>

      {/* Findings */}
      <GlassCard>
        <GlassCardHeader className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t("diagnosis.report.findings")}
          </h3>
        </GlassCardHeader>
        <GlassCardContent>
          <ul className="space-y-3">
            {report.findings.map((finding, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">⚠️</span>
                <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {finding}
                </span>
              </li>
            ))}
          </ul>
        </GlassCardContent>
      </GlassCard>

      {/* Recommended Fixes */}
      <GlassCard>
        <GlassCardHeader className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t("diagnosis.report.fixes")}
          </h3>
        </GlassCardHeader>
        <GlassCardContent>
          <ul className="space-y-3">
            {report.fixes.map((fix, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {fix}
                </span>
              </li>
            ))}
          </ul>
        </GlassCardContent>
      </GlassCard>

      {/* Refactor Prompt */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {t("diagnosis.report.prompt", { tool: TOOL_LABELS[selectedTool] })}
            </h3>
            <CopyButton value={refactorPrompt} />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {(["claude-code", "codex", "gemini", "workbuddy"] as ToolType[]).map((tool) => (
              <button
                key={tool}
                onClick={() => onToolChange(tool)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-colors",
                  tool === selectedTool
                    ? "bg-[var(--color-accent-ios-blue)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
                )}
              >
                {TOOL_LABELS[tool]}
              </button>
            ))}
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <pre className="whitespace-pre-wrap text-sm text-[var(--color-text-secondary)] leading-relaxed font-mono bg-[var(--color-surface)] p-4 rounded-xl overflow-x-auto max-h-[500px] overflow-y-auto">
            {refactorPrompt}
          </pre>
        </GlassCardContent>
      </GlassCard>

      {/* Actions */}
      <div className="flex gap-4">
        {onStartNew && (
          <LiquidButton variant="secondary" onClick={onStartNew} className="flex-1">
            {t("diagnosis.report.another")}
          </LiquidButton>
        )}
        <LiquidButton onClick={() => router.push("/")} className="flex-1">
          {t("diagnosis.report.startFresh")}
          <ArrowRight className="w-4 h-4 ml-2" />
        </LiquidButton>
      </div>
    </div>
  );
}

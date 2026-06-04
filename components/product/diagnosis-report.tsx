// ============================================================
// Vibe Design Translator - Diagnosis Report Component
// ============================================================

"use client";

import { DiagnosisReport, ToolType } from "@/lib/types";
import { TOOL_LABELS } from "@/lib/constants";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { ScoreRing } from "@/components/ui/score-ring";
import { ScoreBar } from "@/components/ui/score-bar";
import { CopyButton } from "@/components/ui/copy-button";
import { LiquidButton } from "@/components/ui/liquid-button";
import { getScoreLabel, cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { DiagnosisBeforeAfter } from "@/components/visuals/diagnosis-before-after";

interface DiagnosisReportViewProps {
  report: DiagnosisReport;
  selectedTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onStartNew?: () => void;
  className?: string;
  apiMeta?: {
    provider: string;
    fallback: boolean;
    tokensUsed?: number;
    estimatedCost?: string;
  } | null;
}

export function DiagnosisReportView({
  report,
  selectedTool,
  onToolChange,
  onStartNew,
  className,
  apiMeta,
}: DiagnosisReportViewProps) {
  const router = useRouter();
  const scoreLabel = getScoreLabel(report.overallScore);
  const refactorPrompt = report.refactorPrompts[selectedTool];

  const scoreCategories = [
    { key: "aiTemplateFeeling", label: "AI Template Feeling" },
    { key: "visualHierarchy", label: "Visual Hierarchy" },
    { key: "colorControl", label: "Color Control" },
    { key: "typographySystem", label: "Typography System" },
    { key: "spacingSystem", label: "Spacing System" },
    { key: "interactionRestraint", label: "Interaction Restraint" },
    { key: "conversionClarity", label: "Conversion Clarity" },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Overall Score */}
      <GlassCard className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing value={report.overallScore} size="lg" label="Overall" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
              {scoreLabel} - {report.overallScore}/100
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              {report.overallScore >= 70
                ? "Your page has a solid foundation with some room for improvement."
                : report.overallScore >= 50
                ? "Your page shows signs of generic design. Consider the fixes below."
                : "Your page likely looks like an AI-generated template. Urgent redesign recommended."}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* API Metadata - Usage & Cost Tracking */}
      {apiMeta && (
        <GlassCard className="p-5">
          <div className="flex flex-wrap gap-6 text-xs">
            <div>
              <span className="text-[var(--color-text-muted)] block">Provider</span>
              <span className="font-semibold text-[var(--color-text-primary)] capitalize">
                {apiMeta.provider === "mock" ? "Mock (Local)" : apiMeta.provider}
              </span>
            </div>
            {apiMeta.fallback && (
              <div>
                <span className="text-[var(--color-text-muted)] block">Mode</span>
                <span className="text-amber-600 font-medium">Fallback to Mock</span>
              </div>
            )}
            {apiMeta.tokensUsed !== undefined && apiMeta.tokensUsed > 0 && (
              <div>
                <span className="text-[var(--color-text-muted)] block">Tokens Used</span>
                <span className="font-mono text-[var(--color-text-primary)]">{apiMeta.tokensUsed.toLocaleString()}</span>
              </div>
            )}
            {apiMeta.estimatedCost && apiMeta.estimatedCost !== "$0.00" && (
              <div>
                <span className="text-[var(--color-text-muted)] block">Est. Cost</span>
                <span className="font-mono text-[var(--color-text-primary)]">{apiMeta.estimatedCost}</span>
              </div>
            )}
          </div>
        </GlassCard>
      )}

      {/* Score Breakdown */}
      <GlassCard>
        <GlassCardHeader>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Score Breakdown
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
            Key Findings
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
            Recommended Fixes
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

      {/* Before/After Visualization */}
      <GlassCard>
        <GlassCardHeader>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Before / After 可视化
          </h3>
        </GlassCardHeader>
        <GlassCardContent>
          <DiagnosisBeforeAfter
            findings={report.findings}
            fixes={report.fixes}
          />
        </GlassCardContent>
      </GlassCard>

      {/* Refactor Prompt */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Refactor Prompt for {TOOL_LABELS[selectedTool]}
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
            Diagnose Another Page
          </LiquidButton>
        )}
        <LiquidButton onClick={() => router.push("/")} className="flex-1">
          Start Fresh
          <ArrowRight className="w-4 h-4 ml-2" />
        </LiquidButton>
      </div>
    </div>
  );
}
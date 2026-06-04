// ============================================================
// Vibe Design Translator - Evaluation Result Card
// ============================================================
// Displays quality evaluation results with dimension breakdown.

"use client";

import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Shield,
  Target,
  Zap,
  Wrench,
  Eye,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";

// Evaluation result type (mirrors lib/evaluators/types.ts)
interface EvaluationDimensions {
  completeness: number;
  specificity: number;
  executability: number;
  toolFit: number;
  antiAILook: number;
  riskControl: number;
}

interface EvaluationResult {
  id: string;
  targetType: "execution_pack" | "diagnosis_report" | "tool_prompt";
  targetId?: string;
  score: number;
  passed: boolean;
  dimensions: EvaluationDimensions;
  issues: string[];
  suggestions: string[];
  createdAt: string;
}

interface EvaluationResultCardProps {
  evaluation: EvaluationResult;
  className?: string;
}

const DIMENSION_CONFIG: Record<
  keyof EvaluationDimensions,
  { label: string; icon: typeof CheckCircle2; color: string }
> = {
  completeness: {
    label: "完整性",
    icon: Shield,
    color: "text-[var(--color-accent-ios-blue)]",
  },
  specificity: {
    label: "具体性",
    icon: Target,
    color: "text-[var(--color-accent-soft-violet)]",
  },
  executability: {
    label: "可执行性",
    icon: Zap,
    color: "text-[var(--color-accent-muted-cyan)]",
  },
  toolFit: {
    label: "工具适配",
    icon: Wrench,
    color: "text-[var(--color-accent-mist-blue)]",
  },
  antiAILook: {
    label: "反 AI 感",
    icon: Eye,
    color: "text-[var(--color-accent-silver)]",
  },
  riskControl: {
    label: "风险控制",
    icon: AlertCircle,
    color: "text-[var(--color-accent-ios-blue)]",
  },
};

const TARGET_TYPE_LABELS: Record<string, string> = {
  execution_pack: "Execution Pack",
  diagnosis_report: "诊断报告",
  tool_prompt: "工具 Prompt",
};

function ScoreRing({ score, passed }: { score: number; passed: boolean }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={passed ? "var(--color-accent-ios-blue)" : "var(--color-status-error)"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "text-sm font-semibold",
            passed
              ? "text-[var(--color-accent-ios-blue)]"
              : "text-[var(--color-status-error)]"
          )}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

function DimensionBar({
  label,
  score,
  icon: Icon,
  color,
}: {
  label: string;
  score: number;
  icon: typeof CheckCircle2;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", color)} />
      <span className="text-xs text-[var(--color-text-secondary)] w-16 flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            score >= 70
              ? "bg-[var(--color-accent-ios-blue)]"
              : score >= 50
                ? "bg-yellow-400"
                : "bg-[var(--color-status-error)]"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">
        {score}
      </span>
    </div>
  );
}

export function EvaluationResultCard({
  evaluation,
  className,
}: EvaluationResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { score, passed, dimensions, issues, suggestions } = evaluation;

  return (
    <GlassCard className={cn("p-5", className)}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <ScoreRing score={score} passed={passed} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {passed ? (
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[var(--color-status-error)]" />
            )}
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {passed ? "质量评估通过" : "质量评估未通过"}
            </h4>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {TARGET_TYPE_LABELS[evaluation.targetType] || evaluation.targetType}
            {" — "}
            {score}/100
            {!passed && "（需要 70 分以上才能通过）"}
          </p>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className="space-y-2 mb-4">
        {(
          Object.entries(dimensions) as Array<[keyof EvaluationDimensions, number]>
        ).map(([key, value]) => {
          const config = DIMENSION_CONFIG[key];
          if (!config) return null;
          return (
            <DimensionBar
              key={key}
              label={config.label}
              score={value}
              icon={config.icon}
              color={config.color}
            />
          );
        })}
      </div>

      {/* Issues (always visible if any) */}
      {issues.length > 0 && (
        <div className="mb-3">
          <h5 className="text-xs font-medium text-[var(--color-status-error)] mb-1.5">
            问题 ({issues.length})
          </h5>
          <ul className="space-y-1">
            {issues.slice(0, isExpanded ? undefined : 2).map((issue, i) => (
              <li
                key={i}
                className="text-xs text-[var(--color-text-secondary)] flex items-start gap-1.5"
              >
                <span className="text-[var(--color-status-error)] mt-0.5">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions (collapsible) */}
      {suggestions.length > 0 && (
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-xs text-[var(--color-accent-ios-blue)] hover:underline mb-1.5"
          >
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
            改进建议 ({suggestions.length})
          </button>
          {isExpanded && (
            <ul className="space-y-1 mt-1">
              {suggestions.map((suggestion, i) => (
                <li
                  key={i}
                  className="text-xs text-[var(--color-text-secondary)] flex items-start gap-1.5"
                >
                  <span className="text-[var(--color-accent-ios-blue)] mt-0.5">→</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </GlassCard>
  );
}

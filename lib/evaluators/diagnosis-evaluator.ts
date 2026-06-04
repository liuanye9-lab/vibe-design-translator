// ============================================================
// Vibe Design Translator - Diagnosis Evaluator
// ============================================================
// Rule-based quality evaluation for Diagnosis Reports.

import type { DiagnosisReport } from "@/lib/types";
import type { EvaluationResult, EvaluationDimensions } from "./types";
import { EVALUATION_PASS_THRESHOLD } from "./types";

/**
 * Evaluate the quality of a Diagnosis Report.
 * Returns a score (0-100) with dimension breakdown and issues.
 */
export function evaluateDiagnosisReport(
  report: DiagnosisReport,
  reportId?: string
): EvaluationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Dimension 1: Completeness (0-100)
  let completeness = 100;

  if (!report.scores) {
    completeness -= 30;
    issues.push("缺少维度评分数据");
  } else {
    const expectedScores = [
      "aiTemplateFeeling",
      "visualHierarchy",
      "colorControl",
      "typographySystem",
      "spacingSystem",
      "interactionRestraint",
      "conversionClarity",
    ];
    for (const key of expectedScores) {
      if (!(key in report.scores)) {
        completeness -= 5;
        issues.push(`缺少评分维度: ${key}`);
      }
    }
  }

  if (!report.findings || report.findings.length === 0) {
    completeness -= 20;
    issues.push("缺少诊断发现 (findings)");
  } else if (report.findings.length < 2) {
    completeness -= 10;
    suggestions.push("诊断发现过少，建议至少列出 2-3 个问题");
  }

  if (!report.fixes || report.fixes.length === 0) {
    completeness -= 15;
    issues.push("缺少修复建议 (fixes)");
  }

  if (!report.overallScore && report.overallScore !== 0) {
    completeness -= 10;
    issues.push("缺少总评分");
  }

  completeness = Math.max(0, Math.min(100, completeness));

  // Dimension 2: Specificity (0-100)
  let specificity = 100;

  if (report.findings) {
    const vagueFindings = report.findings.filter(
      (f) => f.length < 10 || /^(有问题|需要改进|不太好|一般)$/i.test(f.trim())
    );
    if (vagueFindings.length > 0) {
      specificity -= vagueFindings.length * 15;
      suggestions.push("部分诊断发现过于笼统，请补充具体描述");
    }
  }

  if (report.detailedFindings && report.detailedFindings.length > 0) {
    // Bonus for detailed findings
    const hasSeverity = report.detailedFindings.some((f) => f.severity);
    if (!hasSeverity) {
      specificity -= 10;
      suggestions.push("详细发现缺少严重程度标注");
    }
  } else {
    specificity -= 15;
    suggestions.push("建议添加详细发现 (detailedFindings) 以提高诊断深度");
  }

  specificity = Math.max(0, Math.min(100, specificity));

  // Dimension 3: Executability (0-100)
  let executability = 100;

  if (!report.refactorPrompts || Object.keys(report.refactorPrompts).length === 0) {
    executability -= 30;
    issues.push("缺少重构 Prompt");
  } else {
    // Check if prompts are substantial
    for (const [tool, prompt] of Object.entries(report.refactorPrompts)) {
      if (typeof prompt === "string" && prompt.length < 50) {
        executability -= 10;
        suggestions.push(`${tool} 重构 Prompt 过短，无法有效指导重构`);
      }
    }
  }

  if (!report.repairStrategy) {
    executability -= 15;
    suggestions.push("建议添加修复策略 (repairStrategy)");
  }

  executability = Math.max(0, Math.min(100, executability));

  // Dimension 4: Tool Fit (0-100)
  let toolFit = 80; // Default: diagnosis reports are tool-agnostic

  if (report.refactorPrompts) {
    const toolCount = Object.keys(report.refactorPrompts).length;
    if (toolCount >= 3) {
      toolFit = 95;
    } else if (toolCount >= 2) {
      toolFit = 85;
    } else if (toolCount === 1) {
      toolFit = 70;
      suggestions.push("建议为更多工具生成重构 Prompt");
    }
  }

  // Dimension 5: Anti-AI-Look (0-100)
  let antiAILook = 100;

  if (report.scores) {
    // Check if anti-AI-look score is reasonable
    if (report.scores.aiTemplateFeeling < 30) {
      antiAILook -= 10;
      suggestions.push("AI 模板感评分过低，诊断可能过于严格");
    }

    // Check if findings address AI-look issues
    const aiLookKeywords = ["模板", "AI", "通用", "批量", "同质化", "廉价"];
    const hasAILookFinding = report.findings?.some((f) =>
      aiLookKeywords.some((kw) => f.includes(kw))
    );
    if (!hasAILookFinding && report.scores.aiTemplateFeeling < 60) {
      antiAILook -= 15;
      suggestions.push("AI 模板感评分较低但缺少相关诊断发现");
    }
  }

  antiAILook = Math.max(0, Math.min(100, antiAILook));

  // Dimension 6: Risk Control (0-100)
  let riskControl = 100;

  if (report.confidence === "low") {
    riskControl -= 20;
    suggestions.push("诊断置信度较低，建议上传更清晰的截图或补充页面描述");
  }

  if (!report.screenshotAnalyzed) {
    riskControl -= 10;
    suggestions.push("未分析截图，诊断准确性可能受影响");
  }

  riskControl = Math.max(0, Math.min(100, riskControl));

  // Calculate overall score
  const dimensions: EvaluationDimensions = {
    completeness,
    specificity,
    executability,
    toolFit,
    antiAILook,
    riskControl,
  };

  const score = Math.round(
    completeness * 0.25 +
    specificity * 0.15 +
    executability * 0.2 +
    toolFit * 0.1 +
    antiAILook * 0.15 +
    riskControl * 0.15
  );

  return {
    id: `eval-diag-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    targetType: "diagnosis_report",
    targetId: reportId,
    score: Math.max(0, Math.min(100, score)),
    passed: score >= EVALUATION_PASS_THRESHOLD,
    dimensions,
    issues,
    suggestions,
    createdAt: new Date().toISOString(),
  };
}

// ============================================================
// Vibe Design Translator - Prompt Quality Evaluator
// ============================================================
// Rule-based quality evaluation for tool-specific prompts.

import type { ToolType } from "@/lib/types";
import type { EvaluationResult, EvaluationDimensions } from "./types";
import { EVALUATION_PASS_THRESHOLD } from "./types";

/**
 * Evaluate the quality of a tool-specific prompt.
 * Returns a score (0-100) with dimension breakdown and issues.
 */
export function evaluatePromptQuality(
  prompt: string,
  targetTool: ToolType,
  promptId?: string
): EvaluationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Dimension 1: Completeness (0-100)
  let completeness = 100;

  if (!prompt || prompt.trim().length === 0) {
    return {
      id: `eval-prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      targetType: "tool_prompt",
      targetId: promptId,
      score: 0,
      passed: false,
      dimensions: {
        completeness: 0,
        specificity: 0,
        executability: 0,
        toolFit: 0,
        antiAILook: 0,
        riskControl: 0,
      },
      issues: ["Prompt 为空"],
      suggestions: ["请生成有效的 Prompt"],
      createdAt: new Date().toISOString(),
    };
  }

  // Check minimum length
  if (prompt.length < 100) {
    completeness -= 30;
    issues.push("Prompt 过短，无法提供有效指导");
  } else if (prompt.length < 300) {
    completeness -= 10;
    suggestions.push("Prompt 内容偏少，建议补充更多细节");
  }

  // Check for key sections
  const hasTaskDescription =
    prompt.includes("任务") || prompt.includes("Task") || prompt.includes("task") ||
    prompt.includes("目标") || prompt.includes("Goal") || prompt.includes("重构") ||
    prompt.includes("refactor") || prompt.includes("Refactor");

  if (!hasTaskDescription) {
    completeness -= 15;
    issues.push("缺少明确的任务描述");
  }

  // Check for acceptance criteria or checklist
  const hasCriteria =
    prompt.includes("验收") || prompt.includes("Acceptance") || prompt.includes("acceptance") ||
    prompt.includes("检查") || prompt.includes("Checklist") || prompt.includes("checklist") ||
    prompt.includes("[ ]") || prompt.includes("- [");

  if (!hasCriteria) {
    completeness -= 10;
    suggestions.push("建议添加验收标准或检查清单");
  }

  completeness = Math.max(0, Math.min(100, completeness));

  // Dimension 2: Specificity (0-100)
  let specificity = 100;

  // Check for specific design parameters
  const designParams = [
    "px", "rem", "em", "色", "color", "font", "字", "间距", "spacing",
    "margin", "padding", "border", "radius", "opacity", "shadow",
    "渐变", "gradient", "动画", "animation", "transition",
  ];
  const paramCount = designParams.filter((p) =>
    prompt.toLowerCase().includes(p.toLowerCase())
  ).length;

  if (paramCount < 2) {
    specificity -= 20;
    suggestions.push("Prompt 缺少具体的设计参数（如尺寸、颜色、间距等）");
  }

  // Check for file/component references
  const hasFileRefs =
    prompt.includes(".tsx") || prompt.includes(".ts") || prompt.includes(".css") ||
    prompt.includes(".jsx") || prompt.includes("component") || prompt.includes("组件") ||
    prompt.includes("文件") || prompt.includes("file");

  if (!hasFileRefs) {
    specificity -= 10;
    suggestions.push("建议指定具体的文件或组件");
  }

  specificity = Math.max(0, Math.min(100, specificity));

  // Dimension 3: Executability (0-100)
  let executability = 100;

  // Check for step-by-step instructions
  const hasSteps =
    prompt.includes("步骤") || prompt.includes("Step") || prompt.includes("step") ||
    prompt.includes("阶段") || prompt.includes("Phase") || prompt.includes("phase") ||
    /^\d+\.\s/m.test(prompt) || /^###\s/m.test(prompt);

  if (!hasSteps) {
    executability -= 20;
    suggestions.push("建议将指令拆分为清晰的步骤");
  }

  // Check for verification/build commands
  const hasBuild =
    prompt.includes("build") || prompt.includes("Build") || prompt.includes("构建") ||
    prompt.includes("tsc") || prompt.includes("lint") || prompt.includes("验证") ||
    prompt.includes("verify") || prompt.includes("test");

  if (!hasBuild) {
    executability -= 15;
    suggestions.push("建议添加构建验证步骤");
  }

  executability = Math.max(0, Math.min(100, executability));

  // Dimension 4: Tool Fit (0-100)
  let toolFit = 70; // Default

  const toolPatterns: Record<ToolType, { keywords: string[]; weight: number }> = {
    codex: {
      keywords: ["进度", "%", "百分比", "progress", "Progress", "[  ]", "步骤", "验收"],
      weight: 15,
    },
    "claude-code": {
      keywords: ["Plan", "plan", "Implement", "Verify", "Read", "读", "代码库", "阶段"],
      weight: 15,
    },
    gemini: {
      keywords: ["终端", "terminal", "构建", "build", "依赖", "depend", "检查", "check"],
      weight: 15,
    },
    workbuddy: {
      keywords: ["任务", "执行", "验证", "完成", "检查", "确认"],
      weight: 15,
    },
  };

  const pattern = toolPatterns[targetTool];
  if (pattern) {
    const matchCount = pattern.keywords.filter((kw) =>
      prompt.toLowerCase().includes(kw.toLowerCase())
    ).length;
    toolFit = 50 + Math.min(50, matchCount * pattern.weight);
  }

  if (toolFit < 70) {
    suggestions.push(`Prompt 缺少 ${targetTool} 特有的指令模式`);
  }

  toolFit = Math.max(0, Math.min(100, toolFit));

  // Dimension 5: Anti-AI-Look (0-100)
  let antiAILook = 100;

  const antiAIChecks = [
    "模板", "template", "通用", "generic", "批量", "同质化",
    "品牌", "brand", "个性", "独特", "unique",
  ];
  const antiAICount = antiAIChecks.filter((kw) =>
    prompt.toLowerCase().includes(kw.toLowerCase())
  ).length;

  if (antiAICount < 2) {
    antiAILook -= 20;
    suggestions.push("Prompt 未强调避免 AI 模板感，请添加相关约束");
  }

  antiAILook = Math.max(0, Math.min(100, antiAILook));

  // Dimension 6: Risk Control (0-100)
  let riskControl = 100;

  // Check for accessibility mentions
  const hasA11y =
    prompt.includes("accessibility") || prompt.includes("无障碍") || prompt.includes("a11y") ||
    prompt.includes("contrast") || prompt.includes("对比度") || prompt.includes("focus") ||
    prompt.includes("焦点") || prompt.includes("aria");

  if (!hasA11y) {
    riskControl -= 10;
    suggestions.push("建议在 Prompt 中提及无障碍要求");
  }

  // Check for responsive mentions
  const hasResponsive =
    prompt.includes("responsive") || prompt.includes("响应式") || prompt.includes("mobile") ||
    prompt.includes("移动端") || prompt.includes("断点") || prompt.includes("breakpoint");

  if (!hasResponsive) {
    riskControl -= 10;
    suggestions.push("建议在 Prompt 中提及响应式要求");
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
    completeness * 0.2 +
    specificity * 0.2 +
    executability * 0.25 +
    toolFit * 0.15 +
    antiAILook * 0.1 +
    riskControl * 0.1
  );

  return {
    id: `eval-prompt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    targetType: "tool_prompt",
    targetId: promptId,
    score: Math.max(0, Math.min(100, score)),
    passed: score >= EVALUATION_PASS_THRESHOLD,
    dimensions,
    issues,
    suggestions,
    createdAt: new Date().toISOString(),
  };
}

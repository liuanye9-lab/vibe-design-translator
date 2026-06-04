// ============================================================
// Vibe Design Translator - Execution Pack Evaluator
// ============================================================
// Rule-based quality evaluation for Design Execution Packs.
// Checks completeness, specificity, executability, and anti-AI-look.

import type { DesignExecutionPack } from "@/lib/types";
import type { EvaluationResult, EvaluationDimensions } from "./types";
import { EVALUATION_PASS_THRESHOLD } from "./types";

/**
 * Evaluate the quality of a Design Execution Pack.
 * Returns a score (0-100) with dimension breakdown and issues.
 */
export function evaluateExecutionPack(
  pack: DesignExecutionPack,
  packId?: string
): EvaluationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Dimension 1: Completeness (0-100)
  let completeness = 100;
  const requiredFields: Array<{ key: keyof DesignExecutionPack; label: string }> = [
    { key: "strategy", label: "设计策略" },
    { key: "pageStructure", label: "页面结构" },
    { key: "visualSystem", label: "视觉系统" },
    { key: "interactionSystem", label: "交互系统" },
    { key: "acceptanceCriteria", label: "验收标准" },
    { key: "antiAILookChecklist", label: "反 AI 感检查清单" },
    { key: "prompts", label: "工具 Prompt" },
  ];

  for (const field of requiredFields) {
    const value = pack[field.key];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      completeness -= 14;
      issues.push(`缺少必要字段: ${field.label}`);
    } else if (Array.isArray(value) && value.length < 2) {
      completeness -= 5;
      suggestions.push(`${field.label} 内容过少，建议补充至少 3 条`);
    }
  }

  // Check optional but important fields
  if (!pack.contentTone || pack.contentTone.length === 0) {
    completeness -= 3;
    suggestions.push("建议添加内容调性建议 (contentTone)");
  }
  if (!pack.componentRules || pack.componentRules.length === 0) {
    completeness -= 3;
    suggestions.push("建议添加组件规则 (componentRules)");
  }
  if (!pack.responsiveRules || pack.responsiveRules.length === 0) {
    completeness -= 3;
    suggestions.push("建议添加响应式规则 (responsiveRules)");
  }

  completeness = Math.max(0, Math.min(100, completeness));

  // Dimension 2: Specificity (0-100)
  let specificity = 100;
  const allTextItems = [
    ...(pack.strategy || []),
    ...(pack.pageStructure || []),
    ...(pack.visualSystem || []),
    ...(pack.interactionSystem || []),
    ...(pack.acceptanceCriteria || []),
  ];

  const vaguePatterns = [
    /^(好的|不错|可以|适当|合理|应该|需要)$/i,
    /^(提升|优化|改进|改善)(一下|一些)?$/i,
    /^(使用|采用)(合适的|合理的|适当的)/i,
  ];

  let vagueCount = 0;
  for (const item of allTextItems) {
    if (item.length < 8) {
      vagueCount++;
    }
    for (const pattern of vaguePatterns) {
      if (pattern.test(item.trim())) {
        vagueCount++;
        break;
      }
    }
  }

  if (allTextItems.length > 0) {
    const vagueRatio = vagueCount / allTextItems.length;
    specificity = Math.round(100 * (1 - vagueRatio * 1.5));
  }

  if (vagueCount > 0) {
    suggestions.push(`发现 ${vagueCount} 条过于笼统的建议，请补充具体参数和规则`);
  }
  specificity = Math.max(0, Math.min(100, specificity));

  // Dimension 3: Executability (0-100)
  let executability = 100;
  const hasAcceptanceCriteria = pack.acceptanceCriteria && pack.acceptanceCriteria.length >= 3;
  const hasPrompts = pack.prompts && Object.keys(pack.prompts).length > 0;
  const hasAntiChecklist = pack.antiAILookChecklist && pack.antiAILookChecklist.length >= 3;

  if (!hasAcceptanceCriteria) {
    executability -= 25;
    issues.push("验收标准不足，至少需要 3 条可检查的标准");
  }
  if (!hasPrompts) {
    executability -= 30;
    issues.push("缺少工具专用 Prompt");
  }
  if (!hasAntiChecklist) {
    executability -= 15;
    issues.push("缺少反 AI 感检查清单");
  }

  // Check if prompts are substantial
  if (pack.prompts) {
    for (const [tool, prompt] of Object.entries(pack.prompts)) {
      if (typeof prompt === "string" && prompt.length < 100) {
        executability -= 5;
        suggestions.push(`${tool} Prompt 过短，请补充详细的执行指令`);
      }
    }
  }

  executability = Math.max(0, Math.min(100, executability));

  // Dimension 4: Tool Fit (0-100)
  let toolFit = 100;
  if (pack.prompts) {
    const toolChecks: Array<{ tool: string; keywords: string[] }> = [
      { tool: "codex", keywords: ["进度", "%", "步骤", "验收"] },
      { tool: "claude-code", keywords: ["Plan", "Implement", "Verify", "阶段"] },
      { tool: "gemini", keywords: ["终端", "构建", "依赖", "检查"] },
      { tool: "workbuddy", keywords: ["任务", "执行", "验证"] },
    ];

    for (const check of toolChecks) {
      const prompt = pack.prompts[check.tool as keyof typeof pack.prompts];
      if (typeof prompt === "string" && prompt.length > 50) {
        const hasKeyword = check.keywords.some((kw) =>
          prompt.toLowerCase().includes(kw.toLowerCase())
        );
        if (!hasKeyword) {
          toolFit -= 10;
          suggestions.push(`${check.tool} Prompt 缺少工具特有的指令模式`);
        }
      }
    }
  }

  toolFit = Math.max(0, Math.min(100, toolFit));

  // Dimension 5: Anti-AI-Look (0-100)
  let antiAILook = 100;
  const hasAntiChecklistItems = pack.antiAILookChecklist && pack.antiAILookChecklist.length >= 5;

  if (!hasAntiChecklistItems) {
    antiAILook -= 30;
    issues.push("反 AI 感检查清单不足 5 条");
  }

  // Check for generic/bland visual system descriptions
  if (pack.visualSystem) {
    const genericTerms = ["渐变", "阴影", "圆角", "模糊"];
    const specificTerms = ["色阶", "色温", "对比度", "饱和度", "字重", "行高", "字间距"];
    const hasSpecific = pack.visualSystem.some((item) =>
      specificTerms.some((term) => item.includes(term))
    );
    if (!hasSpecific) {
      antiAILook -= 15;
      suggestions.push("视觉系统缺少具体的设计参数（如色阶、字重、行高等）");
    }
  }

  antiAILook = Math.max(0, Math.min(100, antiAILook));

  // Dimension 6: Risk Control (0-100)
  let riskControl = 100;
  const hasStrategy = pack.strategy && pack.strategy.length >= 2;

  if (!hasStrategy) {
    riskControl -= 20;
    suggestions.push("建议添加至少 2 条设计策略要点");
  }

  // Check for responsive rules
  if (!pack.responsiveRules || pack.responsiveRules.length === 0) {
    riskControl -= 15;
    suggestions.push("缺少响应式规则，可能导致移动端体验问题");
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
    specificity * 0.15 +
    executability * 0.25 +
    toolFit * 0.15 +
    antiAILook * 0.15 +
    riskControl * 0.1
  );

  return {
    id: `eval-pack-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    targetType: "execution_pack",
    targetId: packId,
    score: Math.max(0, Math.min(100, score)),
    passed: score >= EVALUATION_PASS_THRESHOLD,
    dimensions,
    issues,
    suggestions,
    createdAt: new Date().toISOString(),
  };
}

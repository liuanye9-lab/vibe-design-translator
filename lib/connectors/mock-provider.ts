// ============================================================
// Vibe Design Translator - Mock Provider
// ============================================================

import {
  DesignBrief,
  DesignDirection,
  DesignExecutionPack,
  DiagnosisInput,
  DiagnosisReport,
  ScreenshotAsset,
  Locale,
} from "@/lib/types";
import { VisionDiagnosisProvider, VisionDiagnosisProviderConfig } from "./vision-provider";
import { DesignAIProvider } from "./ai-provider";
import { DESIGN_DIRECTIONS } from "@/lib/design-directions";
import { generateMockDiagnosisReport } from "@/lib/diagnosis";
import { generateExecutionPack } from "@/lib/prompt-templates";

function localizeDiagnosisReport(report: DiagnosisReport, locale: Locale): DiagnosisReport {
  if (locale !== "zh") return report;

  const findings = [
    "页面存在明显模板化痕迹，缺少针对产品自身的视觉判断。",
    "主标题、说明文案和 CTA 的层级不够清晰，用户难以快速抓住重点。",
    "颜色系统更像通用调色板，缺少品牌化的主次关系。",
    "字体大小、字重和行高没有形成稳定节奏。",
    "动效和 hover 状态容易抢注意力，需要更克制。",
    "转化路径不够直接，主行动按钮的视觉权重偏弱。",
  ];

  const fixes = [
    "建立 1 个主色、1 个辅助色和 5-7 级中性色阶，避免随机配色。",
    "把主标题、核心价值和主 CTA 放在首屏最强层级中。",
    "减少重复卡片布局，加入更有产品特征的区块结构。",
    "定义 3-4 级字体层级，并固定标题、正文、说明文字的字重规则。",
    "把动画控制在 150-300ms，优先使用透明度和位移，不使用夸张缩放。",
    "在 CTA 附近补充信任证据，例如客户、结果、保证或关键指标。",
  ];

  const prompt = `请重构这个页面，让它减少 AI 模板感并提升转化清晰度。

## 当前评分
${report.overallScore}/100

## 主要问题
${findings.map((finding) => `- ${finding}`).join("\n")}

## 必须完成的修复
${fixes.map((fix) => `- ${fix}`).join("\n")}

## 执行要求
- 保留现有功能和响应式行为。
- 先审计颜色、字体、间距、CTA 和动效，再逐步修改。
- 所有视觉改动都要服务于产品目标，不要增加装饰性发光、蓝紫渐变或通用模板卡片。
- 完成后运行 lint/build，并检查移动端是否有文本溢出或元素重叠。`;

  return {
    ...report,
    findings,
    fixes,
    refactorPrompts: {
      codex: prompt,
      "claude-code": prompt,
      gemini: prompt,
      workbuddy: prompt,
    },
    detailedFindings: [
      { category: "模板感", issue: "页面缺少产品专属视觉判断", severity: "critical" },
      { category: "视觉层级", issue: "主信息和 CTA 没有形成明确阅读路径", severity: "critical" },
      { category: "颜色系统", issue: "色彩关系偏通用，缺少品牌主次", severity: "warning" },
      { category: "字体系统", issue: "字号、字重、行高节奏不稳定", severity: "warning" },
      { category: "转化路径", issue: "CTA 权重和信任证据不足", severity: "critical" },
    ],
    repairStrategy: {
      layout: ["重排首屏信息层级", "减少模板化等宽卡片", "用留白区分内容章节"],
      color: ["建立品牌色阶", "限制强调色数量", "提高 CTA 与背景的对比"],
      typography: ["定义 3-4 级字体层级", "固定标题和正文的字重规则", "统一正文行高"],
      interaction: ["缩短动效时长", "减少夸张 hover 效果", "尊重 prefers-reduced-motion"],
      conversion: ["强化首屏 CTA", "在 CTA 周边放置信任证据", "让价值主张到行动路径更直接"],
    },
    beforeState: "当前页面层级和风格偏通用，容易被看成 AI 模板。",
    afterState: "修复后页面应更有品牌判断、信息层级更清晰、转化路径更直接。",
    beforeAfter: [
      {
        zoneId: "hero",
        before: "首屏主标题、说明文字和 CTA 的层级接近，视觉落点不稳定。",
        after: "把主价值放大为唯一阅读入口，CTA 与信任证据形成同一行动区域。",
      },
      {
        zoneId: "visual-system",
        before: "卡片、渐变和强调色都在竞争注意力，缺少品牌化节奏。",
        after: "减少装饰层，建立主色、辅助色和中性色阶的明确权重。",
      },
      {
        zoneId: "conversion",
        before: "用户看到信息后还需要自己判断下一步，转化路径偏弱。",
        after: "在关键段落末尾重复主行动，并用结果证据支撑点击理由。",
      },
    ],
    focusZones: [
      {
        id: "hero",
        title: "首屏价值层级",
        severity: "high",
        evidence: "主标题、说明文案和 CTA 缺少明确主次，首屏读完后行动意图不够强。",
        bbox: { x: 0.08, y: 0.08, w: 0.84, h: 0.28 },
      },
      {
        id: "cards",
        title: "模板化卡片密度",
        severity: "medium",
        evidence: "多个等权重卡片让页面更像通用生成模板，产品特征被稀释。",
        bbox: { x: 0.12, y: 0.42, w: 0.76, h: 0.28 },
      },
      {
        id: "cta",
        title: "转化行动区",
        severity: "high",
        evidence: "CTA 周边缺少信任证据和结果承诺，点击理由不够具体。",
        bbox: { x: 0.2, y: 0.76, w: 0.6, h: 0.16 },
      },
    ],
  };
}

// ============================================================
// Mock Design AI Provider
// ============================================================

const mockDesignAIProvider: DesignAIProvider = {
  config: {
    type: "mock",
    name: "Mock Provider",
    description: "Local rule-based design generation (no API required)",
    isEnabled: true,
    apiKeyConfigured: true, // No API key needed for mock
  },

  async generateDirections(input: DesignBrief): Promise<DesignDirection[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Return all directions (in real implementation, would filter based on brief)
    return DESIGN_DIRECTIONS;
  },

  async generateExecutionPack(
    brief: DesignBrief,
    direction: DesignDirection,
    locale: Locale = "zh"
  ): Promise<DesignExecutionPack> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Use local generator
    return generateExecutionPack(brief, direction, locale);
  },

  async generateRefactorPrompt(
    report: {
      overallScore: number;
      scores: Record<string, number>;
      findings: string[];
      fixes: string[];
    },
    tool: "codex" | "claude-code" | "gemini" | "workbuddy",
    locale: Locale = "zh"
  ): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Return a basic refactor prompt based on findings
    const prompt = locale === "zh" ? `请根据以下诊断结果重构页面：

## 当前评分：${report.overallScore}/100

## 发现的问题：
${report.findings.map((f) => `- ${f}`).join("\n")}

## 必须修复：
${report.fixes.map((f) => `- ${f}`).join("\n")}

## 任务
在保持现有功能的前提下，系统性完成这些修复。` : `Refactor this page based on the following findings:

## Current Score: ${report.overallScore}/100

## Issues Found:
${report.findings.map((f) => `- ${f}`).join("\n")}

## Required Fixes:
${report.fixes.map((f) => `- ${f}`).join("\n")}

## Task
Apply the fixes systematically while maintaining existing functionality.`;

    return prompt;
  },
};

// ============================================================
// Mock Vision Diagnosis Provider
// ============================================================

class MockVisionDiagnosisProvider implements VisionDiagnosisProvider {
  config: VisionDiagnosisProviderConfig = {
    type: "mock",
    name: "Mock Vision Diagnosis",
    description: "Rule-based diagnosis without real AI vision analysis",
    isEnabled: true,
    apiKeyConfigured: true, // No API key needed for mock
    supportsVision: false, // Mock doesn't support real vision
  };

  async diagnose(input: DiagnosisInput): Promise<DiagnosisReport> {
    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));
    
    // Extract screenshot info if provided
    let screenshotAnalyzed = false;
    let screenshotName: string | undefined;
    
    if (input.screenshotAsset) {
      screenshotAnalyzed = true;
      screenshotName = input.screenshotAsset.name;
    }
    
    // Generate report using local mock logic
    let report = generateMockDiagnosisReport(
      input.pageType,
      input.pageDescription,
      input.primaryPainPoint
    );
    
    // Enhance report with screenshot info
    report.screenshotAnalyzed = screenshotAnalyzed;
    report.screenshotName = screenshotName;
    report.locale = input.locale || "zh";
    
    // Add mock confidence level
    report.confidence = "medium";
    report.beforeState = `Current page appears to have ${input.primaryPainPoint.toLowerCase()}`;
    report.afterState = "After applying fixes, the page should achieve a more polished, original design";

    report = localizeDiagnosisReport(report, input.locale || "zh");
    
    return report;
  }

  isReady(): boolean {
    return true; // Mock is always ready
  }
}

const mockVisionProvider = new MockVisionDiagnosisProvider();

// ============================================================
// Exports
// ============================================================

export const mockDesignAI = mockDesignAIProvider;
export const mockVisionDiagnosis = mockVisionProvider;

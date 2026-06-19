// ============================================================
// Vibe Design Translator - Agnes Provider
// ============================================================
// OpenAI-compatible API integration.
// API: https://apihub.agnes-ai.com/v1
// Text model: agnes-2.0-flash
// Vision model: agnes-image-2.0-flash

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import type {
  DesignBrief,
  DesignExecutionPack,
  DiagnosisReport,
  ScreenshotAsset,
} from "@/lib/types";

type AgnesContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string } }
    >;

interface AgnesMessage {
  role: "system" | "user" | "assistant";
  content: AgnesContent;
}

const AGNES_API_BASE = process.env.AGNES_API_BASE || "https://apihub.agnes-ai.com/v1";
const AGNES_API_KEY = process.env.AGNES_API_KEY || "";
const AGNES_TEXT_MODEL = process.env.AGNES_TEXT_MODEL || "agnes-2.0-flash";
const AGNES_IMAGE_MODEL = process.env.AGNES_IMAGE_MODEL || "agnes-image-2.0-flash";

function extractJSON<T>(content: string): T {
  const jsonMatch = content.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  const raw = jsonMatch ? jsonMatch[0] : content;
  return JSON.parse(raw) as T;
}

function extractJSONArray<T>(content: string): T[] {
  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  const start = cleaned.indexOf("[");
  let raw = start >= 0 ? cleaned.slice(start) : cleaned;
  const end = raw.lastIndexOf("]");
  if (end >= 0) {
    raw = raw.slice(0, end + 1);
  } else if (raw.startsWith("[")) {
    raw = `${raw}]`;
  }

  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed as T[] : [parsed as T];
}

function extractLooseJSONArray<T>(content: string): T[] {
  try {
    return extractJSONArray<T>(content);
  } catch {
    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const objectMatches = cleaned.match(/\{[^{}]*\}/g);
    if (!objectMatches?.length) {
      throw new Error("No JSON objects found");
    }
    return objectMatches.map((item) => JSON.parse(item) as T);
  }
}

export class AgnesProvider implements AIProvider, VisionProvider {
  constructor() {
    if (!AGNES_API_KEY) {
      console.warn("Agnes API key not configured - provider will not function");
    }
  }

  private async chatCompletion(
    messages: AgnesMessage[],
    options?: { model?: string; temperature?: number; max_tokens?: number }
  ): Promise<string> {
    if (!AGNES_API_KEY) {
      throw new Error("AGNES_API_KEY not configured");
    }

    const response = await fetch(`${AGNES_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGNES_API_KEY}`,
      },
      body: JSON.stringify({
        model: options?.model || AGNES_TEXT_MODEL,
        messages,
        temperature: options?.temperature ?? 0.4,
        max_tokens: options?.max_tokens ?? 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Agnes API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }

  async generateDirections(
    brief: DesignBrief
  ): Promise<Array<{
    id: string;
    score: number;
    reason?: string;
    keySignals?: string[];
    materialPatternIds?: string[];
  }>> {
    const systemPrompt = `你是设计方向推荐引擎。
根据用户的设计简报，从以下方向中推荐最合适的前端设计方向。你必须像真实产品设计 agent 一样，结合产品类别、目标用户、业务目标、第一印象、受众和内容密度进行判断。

可选方向：
- calm-professional：企业、SaaS、金融、专业服务
- soft-intelligent：AI、开发者工具、教育、效率工具
- experimental-premium：创意机构、作品集、高端品牌、前沿产品

可选素材模式 ID：
- p1 有意留白
- p2 非对称网格
- p3 卡片堆叠
- p4 双色层级
- p5 色块章节
- p6 柔和渐变蒙层
- p7 字号对比
- p8 混合字体系
- p9 磁吸交互
- p10 滚动揭示编排
- p11 手势导航
- p12 微反馈循环

只返回 JSON 数组，不要 markdown。按推荐优先级排序，分数为 0-100：
[{"id":"soft-intelligent","score":88,"reason":"一句具体推荐理由","keySignals":["信号1","信号2"],"materialPatternIds":["p1","p6","p12"]}]`;

    const userPrompt = `产品：${brief.productName}
类别：${brief.productCategory}
目标用户：${brief.targetUsers}
页面目标：${brief.pageGoal}
第一印象：${brief.firstImpression || "未指定"}
业务优先级：${brief.businessPriority || "未指定"}
受众：${brief.audience || "未指定"}
视觉强度：${brief.visualIntensity}
内容密度：${brief.contentDensity}
希望避免：${brief.avoidedFeeling?.join("、") || "未指定"}`;

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.2 }
    );

    try {
      return extractLooseJSONArray<{
        id: string;
        score: number;
        reason?: string;
        keySignals?: string[];
        materialPatternIds?: string[];
      }>(content);
    } catch {
      console.error("Failed to parse Agnes directions response:", content);
      return [
        { id: "soft-intelligent", score: 75 },
        { id: "calm-professional", score: 65 },
        { id: "experimental-premium", score: 45 },
      ];
    }
  }

  async generateExecutionPack(
    brief: DesignBrief,
    directionId: string
  ): Promise<DesignExecutionPack> {
    const systemPrompt = `你是资深前端产品设计架构师。
基于用户 brief 和设计方向生成 Design Execution Pack。

返回严格 JSON 对象，字段包括：
- strategy: string[]
- pageStructure: string[]
- visualSystem: string[]
- interactionSystem: string[]
- acceptanceCriteria: string[]
- antiAILookChecklist: string[]
- contentTone: string[]
- componentRules: string[]
- responsiveRules: string[]
- prompts: object，包含 codex、claude-code、gemini、workbuddy 四个 key

要求：
- 除 prompts 内面向具体工具的长提示词外，所有数组内容必须使用中文
- 不要输出 i18n key、占位 key 或 pack_xxx 之类内部字段名作为正文
- 页面结构里的模块名也用中文，例如“首屏区”“输入区”“预览区”，不要写 Hero Section / Input Zone
- 只返回 JSON，不要 markdown。`;

    const userPrompt = `产品：${brief.productName}
类别：${brief.productCategory}
目标用户：${brief.targetUsers}
页面目标：${brief.pageGoal}
选定方向：${directionId}
视觉强度：${brief.visualIntensity}
内容密度：${brief.contentDensity}
主 CTA：${brief.mainCTA}`;

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.45, max_tokens: 8192 }
    );

    try {
      const parsed = extractJSON<Partial<DesignExecutionPack>>(content);
      const prompts = parsed.prompts || {
        codex: `为 ${brief.productName} 实现 ${directionId} 设计方向。\n\n${(parsed.strategy || []).join("\n")}`,
        "claude-code": `# ${brief.productName} Design Implementation\n\nDirection: ${directionId}\n\n${(parsed.visualSystem || []).map((item) => `- ${item}`).join("\n")}`,
        gemini: `生成 ${brief.productName} 页面，采用 ${directionId} 设计方向。\n${(parsed.visualSystem || []).slice(0, 4).join("\n")}`,
        workbuddy: `为 ${brief.productName} 实现 ${directionId} 设计方向。\n\n策略：\n${(parsed.strategy || []).map((item) => `- ${item}`).join("\n")}`,
      };

      return {
        strategy: parsed.strategy || [],
        pageStructure: parsed.pageStructure || [],
        visualSystem: parsed.visualSystem || [],
        interactionSystem: parsed.interactionSystem || [],
        acceptanceCriteria: parsed.acceptanceCriteria || [],
        antiAILookChecklist: parsed.antiAILookChecklist || [],
        contentTone: parsed.contentTone,
        componentRules: parsed.componentRules,
        responsiveRules: parsed.responsiveRules,
        prompts,
        productName: brief.productName,
        productCategory: brief.productCategory,
        selectedDirection: directionId,
        generatedAt: new Date().toISOString(),
      };
    } catch {
      console.error("Failed to parse Agnes execution pack response:", content);
      throw new Error("Failed to generate execution pack");
    }
  }

  async generateRefactorPrompt(
    diagnosisFindings: string[],
    targetTool: string
  ): Promise<string> {
    const systemPrompt = `你是 UI 重构提示词生成器。
根据诊断问题，为指定 AI 编程工具生成可执行的重构 prompt。
输出中文，包含目标、修改范围、视觉约束、验收标准和验证步骤。`;

    const userPrompt = `目标工具：${targetTool}

诊断问题：
${diagnosisFindings.map((finding, index) => `${index + 1}. ${finding}`).join("\n")}`;

    return this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.35 }
    );
  }

  async diagnoseScreenshot(
    screenshot: ScreenshotAsset | null,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport> {
    const systemPrompt = `你是资深 UI/UX 设计诊断专家。
请诊断页面是否有 AI 模板感，并返回严格 JSON：
{
  "overallScore": 0-100,
  "scores": {
    "aiTemplateFeeling": 0-100,
    "visualHierarchy": 0-100,
    "colorControl": 0-100,
    "typographySystem": 0-100,
    "spacingSystem": 0-100,
    "interactionRestraint": 0-100,
    "conversionClarity": 0-100
  },
  "findings": ["问题"],
  "fixes": ["修复建议"],
  "beforeAfter": [{"before":"修复前","after":"修复后"}]
}
只返回 JSON，不要 markdown。`;

    const userText = `页面类型：${pageType || "unknown"}
主要痛点：${painPoints || "未指定"}
${screenshot ? "已提供截图，请结合截图进行视觉诊断。" : "未提供截图，请基于文本描述进行诊断。"}`;

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: screenshot
            ? [
                { type: "text", text: userText },
                { type: "image_url", image_url: { url: screenshot.dataUrl } },
              ]
            : userText,
        },
      ],
      {
        model: screenshot ? AGNES_IMAGE_MODEL : AGNES_TEXT_MODEL,
        temperature: 0.25,
        max_tokens: 4096,
      }
    );

    try {
      const parsed = extractJSON<Partial<DiagnosisReport>>(content);
      const findings = parsed.findings || [];
      const fixes = parsed.fixes || [];
      return {
        overallScore: parsed.overallScore || 50,
        scores: parsed.scores || {
          aiTemplateFeeling: 50,
          visualHierarchy: 50,
          colorControl: 50,
          typographySystem: 50,
          spacingSystem: 50,
          interactionRestraint: 50,
          conversionClarity: 50,
        },
        findings,
        fixes,
        refactorPrompts: {
          codex: `修复以下 UI 问题：\n${findings.map((finding) => `- ${finding}`).join("\n")}\n\n建议：\n${fixes.map((fix) => `- ${fix}`).join("\n")}`,
          "claude-code": `# UI Refactor Task\n\n## Findings\n${findings.map((finding) => `- ${finding}`).join("\n")}\n\n## Fixes\n${fixes.map((fix) => `- ${fix}`).join("\n")}`,
          gemini: `重构 UI，解决以下问题：\n${findings.slice(0, 4).join("\n")}`,
          workbuddy: `修复以下 UI 问题：\n${findings.map((finding) => `- ${finding}`).join("\n")}`,
        },
        screenshotAnalyzed: Boolean(screenshot),
        confidence: screenshot ? "high" : "medium",
        beforeAfter: parsed.beforeAfter,
      };
    } catch {
      console.error("Failed to parse Agnes diagnosis response:", content);
      throw new Error("Failed to generate diagnosis report");
    }
  }
}

export const agnesProvider = new AgnesProvider();

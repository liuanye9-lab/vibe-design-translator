// ============================================================
// Vibe Design Translator - Gemini Provider
// ============================================================
// Real implementation using Google Gemini API (gemini-1.5-flash)
// Requires: GEMINI_API_KEY environment variable

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import type { DesignBrief, DesignExecutionPack, DiagnosisReport, ScreenshotAsset } from "@/lib/types";

// Gemini API response types
interface GeminiContent {
  parts: Array<{
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string;
    };
  }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export class GeminiProvider implements AIProvider, VisionProvider {
  private apiKey: string;
  private visionModel: string;
  private textModel: string;
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
    this.visionModel = process.env.GEMINI_VISION_MODEL || "gemini-1.5-flash";
    this.textModel = process.env.GEMINI_TEXT_MODEL || "gemini-1.5-flash";

    if (!this.apiKey) {
      console.warn("GEMINI_API_KEY not configured - provider will not function");
    }
  }

  // Helper: Call Gemini API
  private async callGemini(
    model: string,
    contents: GeminiContent[],
    generationConfig?: {
      temperature?: number;
      maxOutputTokens?: number;
      responseMimeType?: string;
    }
  ): Promise<GeminiResponse> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    const url = `${this.baseUrl}/${model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: generationConfig?.temperature ?? 0.7,
          maxOutputTokens: generationConfig?.maxOutputTokens ?? 8192,
          responseMimeType: generationConfig?.responseMimeType ?? "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Gemini API returned no candidates");
    }

    return data as GeminiResponse;
  }

  // Helper: Extract JSON from response text
  private extractJSON(text: string): unknown {
    // Try to parse directly
    try {
      return JSON.parse(text);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }
      // Try to find JSON object/array in text
      const objectMatch = text.match(/(\{[\s\S]*\})/);
      if (objectMatch) {
        return JSON.parse(objectMatch[1]);
      }
      throw new Error("Could not extract JSON from response");
    }
  }

  // Helper: Extract base64 and mimeType from dataUrl
  private parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      throw new Error("Invalid dataUrl format");
    }
    return {
      mimeType: match[1],
      data: match[2],
    };
  }

  // Helper: Check image size (max 4MB for inline data)
  private validateImageSize(base64Data: string): void {
    const sizeInBytes = (base64Data.length * 3) / 4;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB > 4) {
      throw new Error(`Image size (${sizeInMB.toFixed(1)}MB) exceeds 4MB limit for inline data`);
    }
  }

  async generateDirections(brief: DesignBrief): Promise<Array<{ id: string; score: number }>> {
    const prompt = `你是一位资深 UI/UX 设计顾问，专注于 AI 产品的视觉设计。

用户提供了以下产品信息：
- 产品名称：${brief.productName}
- 产品类别：${brief.productCategory}
- 目标用户：${brief.targetUsers}
- 页面目标：${brief.pageGoal}
- 期望感受：${brief.desiredFeeling?.join(", ") || "未指定"}
- 避免感受：${brief.avoidedFeeling?.join(", ") || "未指定"}
- 主要 CTA：${brief.mainCTA || "未指定"}
- 视觉强度：${brief.visualIntensity || "balanced"}
- 内容密度：${brief.contentDensity || "standard"}

请根据以上信息，为这个产品推荐 3 个设计方向，并给出每个方向的适配度评分（0-1）。

可用的设计方向：
1. calm-professional - 冷静、可信、专业，适合 B2B、企业 AI、数据工具
2. soft-intelligent - 温和、聪明、亲和，适合教育 AI、效率工具、轻量 SaaS
3. experimental-premium - 高端、前沿、探索，适合 AI Agent、开发者工具、前沿产品

返回 JSON 数组，每个元素包含：
- id: 方向 ID（calm-professional, soft-intelligent, experimental-premium）
- score: 适配度评分（0-1）

只返回 JSON，不要其他文字。`;

    const response = await this.callGemini(this.textModel, [
      { parts: [{ text: prompt }] },
    ]);

    const text = response.candidates[0].content.parts[0].text;
    const result = this.extractJSON(text) as Array<{ id: string; score: number }>;

    // Validate and normalize
    return result
      .filter((r) => ["calm-professional", "soft-intelligent", "experimental-premium"].includes(r.id))
      .map((r) => ({
        id: r.id,
        score: Math.max(0, Math.min(1, Number(r.score) || 0.5)),
      }))
      .sort((a, b) => b.score - a.score);
  }

  async generateExecutionPack(brief: DesignBrief, directionId: string): Promise<DesignExecutionPack> {
    const prompt = `你是一位资深前端设计架构师和 AI 产品设计专家。

用户选择了设计方向 "${directionId}"，产品信息如下：
- 产品名称：${brief.productName}
- 产品类别：${brief.productCategory}
- 目标用户：${brief.targetUsers}
- 页面目标：${brief.pageGoal}
- 期望感受：${brief.desiredFeeling?.join(", ") || "未指定"}
- 主要 CTA：${brief.mainCTA || "未指定"}
- 视觉强度：${brief.visualIntensity || "balanced"}
- 内容密度：${brief.contentDensity || "standard"}
- 输出工具：${brief.outputTool || "claude-code"}

请生成完整的 Design Execution Pack，包含：

1. strategy: 设计策略要点（3-5 条）
2. pageStructure: 页面结构建议（5-8 条）
3. visualSystem: 视觉系统（色彩、字体、间距、圆角等，5-8 条）
4. interactionSystem: 交互系统（动效、状态、反馈等，3-5 条）
5. acceptanceCriteria: 验收标准（5-8 条）
6. antiAILookChecklist: 避免 AI 感检查清单（5-8 条）
7. contentTone: 内容调性建议（3-5 条）
8. componentRules: 组件规则（3-5 条）
9. responsiveRules: 响应式规则（3-5 条）
10. prompts: 针对不同工具的 Prompt
    - codex: Codex 版本（包含百分比进度）
    - claude-code: Claude Code 版本（Plan → Implement → Verify）
    - gemini: Gemini 版本（终端检查、依赖检查、构建验证）
    - workbuddy: WorkBuddy 版本（中文工程任务说明）

返回严格 JSON，包含以上所有字段。所有内容使用中文（工具名和代码相关术语可以保留英文）。`;

    const response = await this.callGemini(this.textModel, [
      { parts: [{ text: prompt }] },
    ]);

    const text = response.candidates[0].content.parts[0].text;
    const result = this.extractJSON(text) as DesignExecutionPack;

    // Add metadata
    return {
      ...result,
      productName: brief.productName,
      productCategory: brief.productCategory,
      selectedDirection: directionId,
      generatedAt: new Date().toISOString(),
    };
  }

  async generateRefactorPrompt(diagnosisFindings: string[], targetTool: string): Promise<string> {
    const toolName = targetTool || "claude-code";

    const prompt = `你是一位资深前端工程师和 AI 代码生成专家。

根据以下诊断发现，生成一个用于 ${toolName} 的重构 Prompt：

诊断发现：
${diagnosisFindings.map((f, i) => `${i + 1}. ${f}`).join("\n")}

请根据目标工具 ${toolName} 的特点，生成专业的重构指令：

- 如果是 codex：包含文件修改计划、进度百分比、验收标准
- 如果是 claude-code：包含先读代码库、列问题、制定计划、分阶段实现
- 如果是 gemini：包含终端检查、依赖检查、构建验证
- 如果是 workbuddy：使用中文工程任务说明

要求：
1. 指令清晰、可执行
2. 包含具体的代码修改建议
3. 包含验收标准
4. 避免泛泛而谈

直接返回 Prompt 文本，不要 JSON 包裹。`;

    const response = await this.callGemini(this.textModel, [
      { parts: [{ text: prompt }] },
    ], {
      responseMimeType: "text/plain",
    });

    return response.candidates[0].content.parts[0].text;
  }

  async diagnoseScreenshot(
    screenshot: ScreenshotAsset | null,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport> {
    // Build system prompt
    const systemPrompt = `你是资深 UI 设计审计师、AI 生成页面诊断专家、前端产品设计顾问。

你的任务：
分析用户上传的页面截图，判断它是否存在 AI 生成感、模板感、廉价感、视觉层级混乱、色彩不克制、字体系统不清晰、间距失衡、交互过度、转化路径不明确等问题。

必须基于截图和用户描述进行判断。

输入信息：
- pageType: ${pageType || "未指定"}
- painPoints: ${painPoints || "未指定"}

输出必须是严格 JSON，不要 markdown，不要解释性自然语言。

JSON schema：
{
  "overallScore": number,
  "scores": {
    "aiTemplateFeeling": number,
    "visualHierarchy": number,
    "colorControl": number,
    "typographySystem": number,
    "spacingSystem": number,
    "interactionRestraint": number,
    "conversionClarity": number
  },
  "findings": string[],
  "fixes": string[],
  "detailedFindings": [
    {
      "category": string,
      "issue": string,
      "severity": "critical" | "warning" | "info"
    }
  ],
  "repairStrategy": {
    "layout": string[],
    "color": string[],
    "typography": string[],
    "interaction": string[],
    "conversion": string[]
  },
  "confidence": "low" | "medium" | "high",
  "beforeAfter": [
    {
      "before": "问题描述",
      "after": "改进描述"
    }
  ]
}

评分含义：
- aiTemplateFeeling 分数越高，说明越不像 AI 模板。
- 其他分数越高，说明质量越好。

禁止：
- 不要声称看到截图里不存在的品牌或具体文字。
- 不要建议复制 Apple / Linear / Stripe / Vercel。
- 不要输出 markdown。
- 不要返回多余字段。`;

    // Build content parts
    const parts: GeminiContent["parts"] = [];

    // Add image if available
    if (screenshot?.dataUrl) {
      const { mimeType, data } = this.parseDataUrl(screenshot.dataUrl);
      this.validateImageSize(data);
      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: systemPrompt + (screenshot ? "\n\n请分析这张截图并返回诊断报告。" : "\n\n没有截图，请基于页面类型和痛点描述进行分析。"),
    });

    // Call Gemini Vision API
    const response = await this.callGemini(
      this.visionModel,
      [{ parts }],
      {
        temperature: 0.3, // Lower temperature for more consistent analysis
        responseMimeType: "application/json",
      }
    );

    const text = response.candidates[0].content.parts[0].text;
    const result = this.extractJSON(text) as DiagnosisReport;

    // Validate and normalize scores
    const normalizedScores = {
      aiTemplateFeeling: Math.max(0, Math.min(100, Number(result.scores?.aiTemplateFeeling) || 50)),
      visualHierarchy: Math.max(0, Math.min(100, Number(result.scores?.visualHierarchy) || 50)),
      colorControl: Math.max(0, Math.min(100, Number(result.scores?.colorControl) || 50)),
      typographySystem: Math.max(0, Math.min(100, Number(result.scores?.typographySystem) || 50)),
      spacingSystem: Math.max(0, Math.min(100, Number(result.scores?.spacingSystem) || 50)),
      interactionRestraint: Math.max(0, Math.min(100, Number(result.scores?.interactionRestraint) || 50)),
      conversionClarity: Math.max(0, Math.min(100, Number(result.scores?.conversionClarity) || 50)),
    };

    // Calculate overall score as weighted average
    const overallScore = Math.round(
      (normalizedScores.aiTemplateFeeling * 0.2 +
        normalizedScores.visualHierarchy * 0.15 +
        normalizedScores.colorControl * 0.15 +
        normalizedScores.typographySystem * 0.1 +
        normalizedScores.spacingSystem * 0.1 +
        normalizedScores.interactionRestraint * 0.15 +
        normalizedScores.conversionClarity * 0.15)
    );

    return {
      overallScore: Math.max(0, Math.min(100, Number(result.overallScore) || overallScore)),
      scores: normalizedScores,
      findings: Array.isArray(result.findings) ? result.findings : [],
      fixes: Array.isArray(result.fixes) ? result.fixes : [],
      refactorPrompts: {} as Record<string, string>, // Will be generated separately
      detailedFindings: Array.isArray(result.detailedFindings) ? result.detailedFindings : [],
      repairStrategy: result.repairStrategy || {},
      beforeAfter: Array.isArray(result.beforeAfter) ? result.beforeAfter : [],
      screenshotAnalyzed: !!screenshot,
      confidence: result.confidence || (screenshot ? "medium" : "low"),
    };
  }
}

export const geminiProvider = new GeminiProvider();

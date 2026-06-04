// ============================================================
// Vibe Design Translator - Mimo Provider
// ============================================================
// Xiaomi Mimo AI API integration (OpenAI-compatible)
// API: https://token-plan-cn.xiaomimimo.com/v1
// Model: mimo-v2.5-pro

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import type {
  DesignBrief,
  DesignExecutionPack,
  DiagnosisReport,
  ScreenshotAsset,
} from "@/lib/types";

const MIMO_API_BASE = process.env.MIMO_API_BASE || "https://token-plan-cn.xiaomimimo.com/v1";
const MIMO_API_KEY = process.env.MIMO_API_KEY || "";
const MIMO_MODEL = process.env.MIMO_MODEL || "mimo-v2.5-pro";

export class MimoProvider implements AIProvider, VisionProvider {
  constructor() {
    if (!MIMO_API_KEY) {
      console.warn("Mimo API key not configured - provider will not function");
    }
  }

  private async chatCompletion(
    messages: Array<{ role: string; content: string }>,
    options?: { temperature?: number; max_tokens?: number }
  ): Promise<string> {
    if (!MIMO_API_KEY) {
      throw new Error("MIMO_API_KEY not configured");
    }

    const response = await fetch(`${MIMO_API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MIMO_API_KEY}`,
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 4096,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Mimo API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "";
  }

  async generateDirections(
    brief: DesignBrief
  ): Promise<Array<{ id: string; score: number }>> {
    const systemPrompt = `You are a design direction recommendation engine.
Based on the user's design brief, recommend the best design direction(s).
Return a JSON array of objects with "id" and "score" (0-100) fields.

Available directions:
- "calm-professional": Enterprise, SaaS, Finance
- "soft-intelligent": Tech, Healthcare, Education
- "experimental-premium": Creative, Fashion, Luxury

Return ONLY valid JSON array, no markdown.`;

    const userPrompt = `Product: ${brief.productName}
Category: ${brief.productCategory}
Target Users: ${brief.targetUsers}
Page Goal: ${brief.pageGoal}
First Impression: ${brief.firstImpression || "professional"}
Business Priority: ${brief.businessPriority || "conversion"}
Audience: ${brief.audience || "general"}`;

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.3 }
    );

    try {
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch {
      console.error("Failed to parse Mimo response:", content);
      return [
        { id: "calm-professional", score: 70 },
        { id: "soft-intelligent", score: 60 },
        { id: "experimental-premium", score: 40 },
      ];
    }
  }

  async generateExecutionPack(
    brief: DesignBrief,
    directionId: string
  ): Promise<DesignExecutionPack> {
    const systemPrompt = `You are a design execution pack generator.
Based on the user's design brief and selected direction, generate a complete design execution pack.

Return a JSON object with these fields:
- strategy: string[] (design strategy points)
- pageStructure: string[] (page sections)
- visualSystem: string[] (visual design rules)
- interactionSystem: string[] (interaction rules)
- acceptanceCriteria: string[] (acceptance criteria)
- antiAILookChecklist: string[] (anti-AI-look checks)
- prompts: object with keys "codex", "claude-code", "gemini", "workbuddy" containing tool-specific prompts

Return ONLY valid JSON, no markdown.`;

    const userPrompt = `Product: ${brief.productName}
Category: ${brief.productCategory}
Target Users: ${brief.targetUsers}
Page Goal: ${brief.pageGoal}
Selected Direction: ${directionId}
Visual Intensity: ${brief.visualIntensity}
Content Density: ${brief.contentDensity}
Main CTA: ${brief.mainCTA}`;

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.5 }
    );

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Generate prompts if not provided by AI
        const prompts = parsed.prompts || {
          codex: `Implement the following design for ${brief.productName}:\n\nDirection: ${directionId}\n\n${(parsed.strategy || []).join("\n")}`,
          "claude-code": `# Design Implementation for ${brief.productName}\n\n## Direction: ${directionId}\n\n## Strategy\n${(parsed.strategy || []).map((s: string) => `- ${s}`).join("\n")}\n\n## Visual System\n${(parsed.visualSystem || []).map((v: string) => `- ${v}`).join("\n")}`,
          gemini: `Generate a ${brief.productName} page with ${directionId} design direction.\n\nKey rules:\n${(parsed.visualSystem || []).slice(0, 3).join("\n")}`,
          workbuddy: `为 ${brief.productName} 实现 ${directionId} 设计方向\n\n策略要点：\n${(parsed.strategy || []).map((s: string) => `- ${s}`).join("\n")}`,
        };
        
        return {
          strategy: parsed.strategy || [],
          pageStructure: parsed.pageStructure || [],
          visualSystem: parsed.visualSystem || [],
          interactionSystem: parsed.interactionSystem || [],
          acceptanceCriteria: parsed.acceptanceCriteria || [],
          antiAILookChecklist: parsed.antiAILookChecklist || [],
          prompts,
          productName: brief.productName,
          productCategory: brief.productCategory,
          selectedDirection: directionId,
          generatedAt: new Date().toISOString(),
        };
      }
      throw new Error("No JSON found in response");
    } catch {
      console.error("Failed to parse Mimo execution pack response:", content);
      throw new Error("Failed to generate execution pack");
    }
  }

  async generateRefactorPrompt(
    diagnosisFindings: string[],
    targetTool: string
  ): Promise<string> {
    const systemPrompt = `You are a refactor prompt generator.
Based on the diagnosis findings, generate a tool-specific refactor prompt.
Target tool: ${targetTool}

Generate a detailed, actionable refactor prompt that addresses the issues found.`;

    const userPrompt = `Diagnosis Findings:
${diagnosisFindings.map((f, i) => `${i + 1}. ${f}`).join("\n")}

Generate a refactor prompt for ${targetTool} that fixes these issues.`;

    return this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.5 }
    );
  }

  async diagnoseScreenshot(
    screenshot: ScreenshotAsset | null,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport> {
    const systemPrompt = `You are a UI/UX design diagnosis expert.
Analyze the page description and provide a detailed diagnosis report.

Note: Mimo API does not support image input. Analysis is based on text description only.

Return a JSON object with:
- overallScore: number (0-100)
- scores: {
    aiTemplateFeeling: number (0-100),
    visualHierarchy: number (0-100),
    colorControl: number (0-100),
    typographySystem: number (0-100),
    spacingSystem: number (0-100),
    interactionRestraint: number (0-100),
    conversionClarity: number (0-100)
  }
- findings: string[] (issues found)
- fixes: string[] (suggested fixes)

Return ONLY valid JSON, no markdown.`;

    let userPrompt = `Page Type: ${pageType || "unknown"}`;
    if (painPoints) {
      userPrompt += `\nPain Points: ${painPoints}`;
    }
    if (screenshot) {
      userPrompt += `\nNote: Screenshot was provided but cannot be analyzed via text-only API. Analysis is based on the text description above.`;
    }

    const content = await this.chatCompletion(
      [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      { temperature: 0.3 }
    );

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Generate refactor prompts
        const findings = parsed.findings || [];
        const fixes = parsed.fixes || [];
        const refactorPrompts = {
          codex: `Fix the following UI issues:\n${findings.map((f: string) => `- ${f}`).join("\n")}\n\nSuggested fixes:\n${fixes.map((f: string) => `- ${f}`).join("\n")}`,
          "claude-code": `# UI Refactoring Task\n\n## Issues Found\n${findings.map((f: string) => `- ${f}`).join("\n")}\n\n## Suggested Fixes\n${fixes.map((f: string) => `- ${f}`).join("\n")}`,
          gemini: `Refactor the UI to fix these issues:\n${findings.slice(0, 3).join("\n")}`,
          workbuddy: `修复以下 UI 问题：\n${findings.map((f: string) => `- ${f}`).join("\n")}\n\n建议修复：\n${fixes.map((f: string) => `- ${f}`).join("\n")}`,
        };
        
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
          refactorPrompts,
          screenshotAnalyzed: false, // Mimo cannot analyze images
          confidence: "low", // Lower confidence for text-only analysis
        };
      }
      throw new Error("No JSON found in response");
    } catch {
      console.error("Failed to parse Mimo diagnosis response:", content);
      throw new Error("Failed to generate diagnosis report");
    }
  }
}

export const mimoProvider = new MimoProvider();

import { DesignAIProvider } from "./ai-provider";
import { VisionDiagnosisProvider, VisionDiagnosisProviderConfig } from "./vision-provider";
import { DesignBrief, DesignDirection, DesignExecutionPack, DiagnosisInput, DiagnosisReport, Locale } from "@/lib/types";
import { extractJsonObject, validateDiagnosisReport, validateExecutionPack } from "@/lib/llm/schemas";
import { diagnosisPrompt, executionPackPrompt, refactorPromptPrompt } from "@/lib/llm/provider-prompts";
import { setProviderUsage } from "@/lib/llm/provider-runtime";
import { normalizeProviderError, requireApiKey } from "./provider-utils";

const provider = "gemini" as const;

async function geminiGenerate(parts: Array<Record<string, unknown>>, jsonMode = false): Promise<string> {
  const apiKey = requireApiKey(provider);
  const model = process.env.GEMINI_MODEL || "gemini-1.5-pro";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: jsonMode ? { responseMimeType: "application/json" } : undefined,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw normalizeProviderError(provider, response.status, data?.error?.message || "Gemini request failed");
  }
  setProviderUsage(provider, {
    promptTokens: data?.usageMetadata?.promptTokenCount,
    candidateTokens: data?.usageMetadata?.candidatesTokenCount,
    totalTokens: data?.usageMetadata?.totalTokenCount,
    estimated: false,
  });
  return data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("") || "";
}

export const geminiProvider: DesignAIProvider = {
  config: {
    type: provider,
    name: "Google Gemini",
    description: "Gemini text, vision, and structured JSON output.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY),
    implementationStatus: "ready",
  },

  async generateDirections(): Promise<DesignDirection[]> {
    throw new Error("Gemini direction generation is not used in this workflow.");
  },

  async generateExecutionPack(brief: DesignBrief, direction: DesignDirection, locale: Locale = "zh"): Promise<DesignExecutionPack> {
    const text = await geminiGenerate([{ text: executionPackPrompt(brief, direction, locale) }], true);
    return validateExecutionPack(extractJsonObject(text), locale);
  },

  async generateRefactorPrompt(report, tool, locale: Locale = "zh"): Promise<string> {
    return geminiGenerate([{ text: refactorPromptPrompt(report, tool, locale) }], false);
  },
};

class GeminiVisionProvider implements VisionDiagnosisProvider {
  config: VisionDiagnosisProviderConfig = {
    type: provider,
    name: "Gemini Vision",
    description: "Gemini screenshot diagnosis with inline image data.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY),
    supportsVision: true,
    implementationStatus: "ready",
  };

  async diagnose(input: DiagnosisInput): Promise<DiagnosisReport> {
    const locale = input.locale || "zh";
    const parts: Array<Record<string, unknown>> = [{ text: diagnosisPrompt(input, locale) }];
    if (input.screenshotAsset?.dataUrl) {
      const [, payload = ""] = input.screenshotAsset.dataUrl.split(",");
      parts.push({
        inlineData: {
          mimeType: input.screenshotAsset.type || "image/png",
          data: payload,
        },
      });
    }
    const text = await geminiGenerate(parts, true);
    return validateDiagnosisReport(extractJsonObject(text), locale);
  }

  isReady(): boolean {
    return this.config.apiKeyConfigured;
  }
}

export const geminiVisionProvider = new GeminiVisionProvider();

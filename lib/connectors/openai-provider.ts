import { DesignAIProvider } from "./ai-provider";
import { VisionDiagnosisProvider, VisionDiagnosisProviderConfig } from "./vision-provider";
import { DesignBrief, DesignDirection, DesignExecutionPack, DiagnosisInput, DiagnosisReport, Locale } from "@/lib/types";
import { extractJsonObject, validateDiagnosisReport, validateExecutionPack } from "@/lib/llm/schemas";
import { diagnosisPrompt, executionPackPrompt, refactorPromptPrompt } from "@/lib/llm/provider-prompts";
import { setProviderUsage } from "@/lib/llm/provider-runtime";
import { normalizeProviderError, requireApiKey } from "./provider-utils";

const provider = "openai" as const;

async function openAIText(prompt: string, jsonMode = false): Promise<string> {
  const apiKey = requireApiKey(provider);
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: jsonMode ? { type: "json_object" } : undefined,
      messages: [
        { role: "system", content: "You are a senior product design and frontend refactoring agent." },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw normalizeProviderError(provider, response.status, data?.error?.message || "OpenAI request failed");
  }

  setProviderUsage(provider, {
    promptTokens: data?.usage?.prompt_tokens,
    candidateTokens: data?.usage?.completion_tokens,
    totalTokens: data?.usage?.total_tokens,
    estimated: false,
  });

  return data?.choices?.[0]?.message?.content || "";
}

async function openAIVision(input: DiagnosisInput, locale: Locale): Promise<string> {
  const apiKey = requireApiKey(provider);
  const imagePart = input.screenshotAsset
    ? [{ type: "image_url", image_url: { url: input.screenshotAsset.dataUrl } }]
    : [];
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_VISION_MODEL || process.env.OPENAI_MODEL || "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a senior UI design critic. Return JSON only." },
        {
          role: "user",
          content: [
            { type: "text", text: diagnosisPrompt(input, locale) },
            ...imagePart,
          ],
        },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw normalizeProviderError(provider, response.status, data?.error?.message || "OpenAI vision request failed");
  }
  setProviderUsage(provider, {
    promptTokens: data?.usage?.prompt_tokens,
    candidateTokens: data?.usage?.completion_tokens,
    totalTokens: data?.usage?.total_tokens,
    estimated: false,
  });
  return data?.choices?.[0]?.message?.content || "";
}

export const openAIProvider: DesignAIProvider = {
  config: {
    type: provider,
    name: "OpenAI",
    description: "OpenAI text, vision, and JSON output through Chat Completions.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY),
    implementationStatus: "ready",
  },

  async generateDirections(): Promise<DesignDirection[]> {
    throw new Error("OpenAI direction generation is not used in this workflow.");
  },

  async generateExecutionPack(brief: DesignBrief, direction: DesignDirection, locale: Locale = "zh"): Promise<DesignExecutionPack> {
    const text = await openAIText(executionPackPrompt(brief, direction, locale), true);
    return validateExecutionPack(extractJsonObject(text), locale);
  },

  async generateRefactorPrompt(report, tool, locale: Locale = "zh"): Promise<string> {
    return openAIText(refactorPromptPrompt(report, tool, locale), false);
  },
};

class OpenAIVisionProvider implements VisionDiagnosisProvider {
  config: VisionDiagnosisProviderConfig = {
    type: provider,
    name: "OpenAI Vision",
    description: "OpenAI screenshot diagnosis through a vision-capable model.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY),
    supportsVision: true,
    implementationStatus: "ready",
  };

  async diagnose(input: DiagnosisInput): Promise<DiagnosisReport> {
    const locale = input.locale || "zh";
    const text = await openAIVision(input, locale);
    return validateDiagnosisReport(extractJsonObject(text), locale);
  }

  isReady(): boolean {
    return this.config.apiKeyConfigured;
  }
}

export const openAIVisionProvider = new OpenAIVisionProvider();

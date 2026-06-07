import { DesignAIProvider } from "./ai-provider";
import { VisionDiagnosisProvider, VisionDiagnosisProviderConfig } from "./vision-provider";
import { DesignBrief, DesignDirection, DesignExecutionPack, DiagnosisInput, DiagnosisReport, Locale } from "@/lib/types";
import { extractJsonObject, validateDiagnosisReport, validateExecutionPack } from "@/lib/llm/schemas";
import { diagnosisPrompt, executionPackPrompt, refactorPromptPrompt } from "@/lib/llm/provider-prompts";
import { setProviderUsage } from "@/lib/llm/provider-runtime";
import { normalizeProviderError, requireApiKey } from "./provider-utils";

const provider = "claude" as const;

async function claudeMessage(content: unknown, jsonMode = false): Promise<string> {
  const apiKey = requireApiKey(provider);
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-latest",
      max_tokens: 4000,
      system: jsonMode
        ? "You are a senior product design agent. Return only valid JSON."
        : "You are a senior product design and frontend refactoring agent.",
      messages: [{ role: "user", content }],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw normalizeProviderError(provider, response.status, data?.error?.message || "Claude request failed");
  }

  setProviderUsage(provider, {
    promptTokens: data?.usage?.input_tokens,
    candidateTokens: data?.usage?.output_tokens,
    totalTokens: data?.usage?.input_tokens && data?.usage?.output_tokens
      ? data.usage.input_tokens + data.usage.output_tokens
      : undefined,
    estimated: false,
  });

  return data?.content?.map((part: { type: string; text?: string }) => part.type === "text" ? part.text || "" : "").join("") || "";
}

export const claudeProvider: DesignAIProvider = {
  config: {
    type: provider,
    name: "Anthropic Claude",
    description: "Claude text generation and JSON output through Messages API.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY),
    implementationStatus: "ready",
  },

  async generateDirections(): Promise<DesignDirection[]> {
    throw new Error("Claude direction generation is not used in this workflow.");
  },

  async generateExecutionPack(brief: DesignBrief, direction: DesignDirection, locale: Locale = "zh"): Promise<DesignExecutionPack> {
    const text = await claudeMessage(executionPackPrompt(brief, direction, locale), true);
    return validateExecutionPack(extractJsonObject(text), locale);
  },

  async generateRefactorPrompt(report, tool, locale: Locale = "zh"): Promise<string> {
    return claudeMessage(refactorPromptPrompt(report, tool, locale), false);
  },
};

class ClaudeVisionProvider implements VisionDiagnosisProvider {
  config: VisionDiagnosisProviderConfig = {
    type: provider,
    name: "Claude Vision",
    description: "Claude screenshot diagnosis when an Anthropic key is configured.",
    isEnabled: true,
    apiKeyConfigured: !!(process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY),
    supportsVision: true,
    implementationStatus: "ready",
  };

  async diagnose(input: DiagnosisInput): Promise<DiagnosisReport> {
    const locale = input.locale || "zh";
    const content: Array<Record<string, unknown>> = [{ type: "text", text: diagnosisPrompt(input, locale) }];
    if (input.screenshotAsset?.dataUrl) {
      const [, payload = ""] = input.screenshotAsset.dataUrl.split(",");
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: input.screenshotAsset.type || "image/png",
          data: payload,
        },
      });
    }
    const text = await claudeMessage(content, true);
    return validateDiagnosisReport(extractJsonObject(text), locale);
  }

  isReady(): boolean {
    return this.config.apiKeyConfigured;
  }
}

export const claudeVisionProvider = new ClaudeVisionProvider();

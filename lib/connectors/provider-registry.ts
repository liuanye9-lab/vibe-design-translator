// ============================================================
// Vibe Design Translator - Provider Registry
// ============================================================
// Factory functions for selecting and returning AI providers
// based on environment configuration.

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import { mockProvider } from "./mock-provider";
import { openaiProvider } from "./openai-provider";
import { claudeProvider } from "./claude-provider";
import { geminiProvider } from "./gemini-provider";
import { mimoProvider } from "./mimo-provider";

const DESIGN_AI_PROVIDER = process.env.NEXT_PUBLIC_AI_PROVIDER || "mock";
const ENABLE_REAL_AI = process.env.NEXT_PUBLIC_ENABLE_REAL_AI === "true";

export function getDesignAIProvider(): AIProvider {
  if (!ENABLE_REAL_AI) {
    return mockProvider;
  }

  switch (DESIGN_AI_PROVIDER) {
    case "openai":
      return openaiProvider;
    case "claude":
      return claudeProvider;
    case "gemini":
      return geminiProvider;
    case "mimo":
      return mimoProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

export function getVisionDiagnosisProvider(): VisionProvider {
  if (!ENABLE_REAL_AI) {
    return mockProvider;
  }

  switch (DESIGN_AI_PROVIDER) {
    case "openai":
      return openaiProvider;
    case "gemini":
      return geminiProvider;
    case "mimo":
      return mimoProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

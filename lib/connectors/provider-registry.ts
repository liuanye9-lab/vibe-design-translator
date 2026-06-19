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
import { agnesProvider } from "./agnes-provider";

export function getDesignAIProvider(): AIProvider {
  // Read env at call time to avoid module-level evaluation issues
  const provider = process.env.AI_PROVIDER || "mock";
  const enableRealAI = process.env.ENABLE_REAL_AI === "true";
  
  if (!enableRealAI) {
    return mockProvider;
  }

  switch (provider) {
    case "openai":
      return openaiProvider;
    case "claude":
      return claudeProvider;
    case "gemini":
      return geminiProvider;
    case "mimo":
      return mimoProvider;
    case "agnes":
      return agnesProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

export function getVisionDiagnosisProvider(): VisionProvider {
  // Read env at call time to avoid module-level evaluation issues
  const provider = process.env.AI_PROVIDER || "mock";
  const enableRealAI = process.env.ENABLE_REAL_AI === "true";
  const enableVisionDiagnosis = process.env.ENABLE_VISION_DIAGNOSIS === "true";
  
  if (!enableRealAI || !enableVisionDiagnosis) {
    return mockProvider;
  }

  switch (provider) {
    case "openai":
      return openaiProvider;
    case "gemini":
      return geminiProvider;
    case "mimo":
      return mimoProvider;
    case "agnes":
      return agnesProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

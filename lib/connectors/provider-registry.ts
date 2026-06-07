// ============================================================
// Vibe Design Translator - Provider Registry
// ============================================================

import { DesignAIProvider } from "./ai-provider";
import { VisionDiagnosisProvider } from "./vision-provider";
import { mockDesignAI, mockVisionDiagnosis } from "./mock-provider";
import { openAIProvider, openAIVisionProvider } from "./openai-provider";
import { claudeProvider, claudeVisionProvider } from "./claude-provider";
import { geminiProvider, geminiVisionProvider } from "./gemini-provider";
import { AIProviderType } from "@/lib/types";
import {
  getProviderCapabilities,
  getProviderStatus,
  getRealAIEnabled,
  ProviderCapability,
  ProviderStatus,
} from "./provider-capabilities";

export type { ProviderCapability, ProviderStatus };

/**
 * Get the provider that will actually be used after capability checks.
 */
export function getCurrentProviderType(): AIProviderType {
  return getProviderStatus().providerUsed;
}

/**
 * Get Design AI Provider
 * Returns the appropriate provider based on environment configuration
 */
export function getDesignAIProvider(): DesignAIProvider {
  const providerType = getCurrentProviderType();
  
  switch (providerType) {
    case "openai":
      return openAIProvider;
    case "claude":
      return claudeProvider;
    case "gemini":
      return geminiProvider;
    case "mimo":
    case "mock":
    default:
      return mockDesignAI;
  }
}

/**
 * Get Vision Diagnosis Provider
 * Returns the appropriate vision provider based on environment configuration
 */
export function getVisionDiagnosisProvider(): VisionDiagnosisProvider {
  const providerType = getCurrentProviderType();
  
  switch (providerType) {
    case "claude":
      return claudeVisionProvider;
    case "gemini":
      return geminiVisionProvider;
    case "openai":
      return openAIVisionProvider;
    case "mimo":
    case "mock":
    default:
      return mockVisionDiagnosis;
  }
}

/**
 * Check if real AI is enabled
 */
export function isRealAIEnabled(): boolean {
  return getRealAIEnabled() && getCurrentProviderType() !== "mock";
}

/**
 * Get provider info for UI display
 */
export function getProviderInfo() {
  const status = getProviderStatus();
  const current = getProviderCapabilities().find(
    (capability) => capability.providerId === status.providerUsed
  );
  
  return {
    current,
    configuredProvider: status.configuredProvider,
    providerType: status.providerUsed,
    fallbackProvider: status.fallbackProvider,
    isEnabled: status.isRealAIEnabled && status.fallbackProvider === null,
    capabilities: status.capabilities,
  };
}

export { getProviderStatus };

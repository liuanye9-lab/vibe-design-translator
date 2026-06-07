// ============================================================
// Vibe Design Translator - Provider Capabilities
// ============================================================

import { AIProviderType } from "@/lib/types";

export type ProviderFallbackMode = "none" | "mock";

export type ProviderImplementationStatus = "ready" | "placeholder";

export interface ProviderCapability {
  providerId: AIProviderType;
  name: string;
  description: string;
  available: boolean;
  apiKeyConfigured: boolean;
  supportsText: boolean;
  supportsVision: boolean;
  supportsStructuredOutput: boolean;
  fallbackMode: ProviderFallbackMode;
  implementationStatus: ProviderImplementationStatus;
  unavailabilityReason?: string;
}

export interface ProviderStatus {
  configuredProvider: AIProviderType;
  providerUsed: AIProviderType;
  fallbackProvider: AIProviderType | null;
  isRealAIEnabled: boolean;
  capabilities: ProviderCapability[];
}

interface ProviderEnv {
  [key: string]: string | undefined;
}

const providerIds: AIProviderType[] = ["mock", "openai", "claude", "gemini", "mimo"];

export function normalizeProviderId(value: string | undefined): AIProviderType {
  if (value === "openai" || value === "claude" || value === "gemini" || value === "mimo") {
    return value;
  }

  return "mock";
}

export function getConfiguredProvider(env: ProviderEnv = process.env): AIProviderType {
  return normalizeProviderId(env.AI_PROVIDER ?? env.NEXT_PUBLIC_AI_PROVIDER);
}

export function getRealAIEnabled(env: ProviderEnv = process.env): boolean {
  return env.ENABLE_REAL_AI === "true" || env.NEXT_PUBLIC_ENABLE_REAL_AI === "true";
}

function hasProviderKey(providerId: AIProviderType, env: ProviderEnv): boolean {
  switch (providerId) {
    case "openai":
      return !!(env.OPENAI_API_KEY || env.NEXT_PUBLIC_OPENAI_API_KEY);
    case "claude":
      return !!(env.ANTHROPIC_API_KEY || env.NEXT_PUBLIC_ANTHROPIC_API_KEY);
    case "gemini":
      return !!(env.GEMINI_API_KEY || env.NEXT_PUBLIC_GEMINI_API_KEY);
    case "mimo":
      return false;
    case "mock":
    default:
      return true;
  }
}

function getProviderMetadata(providerId: AIProviderType) {
  const metadata: Record<
    AIProviderType,
    Pick<ProviderCapability, "name" | "description" | "supportsText" | "supportsVision" | "supportsStructuredOutput" | "implementationStatus">
  > = {
    mock: {
      name: "Mock Provider",
      description: "Local rule-based generation with no external API call.",
      supportsText: true,
      supportsVision: false,
      supportsStructuredOutput: true,
      implementationStatus: "ready",
    },
    openai: {
      name: "OpenAI",
      description: "Real text, vision, and JSON-mode generation through the OpenAI API.",
      supportsText: true,
      supportsVision: true,
      supportsStructuredOutput: true,
      implementationStatus: "ready",
    },
    claude: {
      name: "Anthropic Claude",
      description: "Real text, vision, and structured JSON generation through Anthropic Messages.",
      supportsText: true,
      supportsVision: true,
      supportsStructuredOutput: true,
      implementationStatus: "ready",
    },
    gemini: {
      name: "Google Gemini",
      description: "Real text, vision, and structured JSON generation through Gemini.",
      supportsText: true,
      supportsVision: true,
      supportsStructuredOutput: true,
      implementationStatus: "ready",
    },
    mimo: {
      name: "Mimo",
      description: "Mimo connector is not present in this repository yet.",
      supportsText: false,
      supportsVision: false,
      supportsStructuredOutput: false,
      implementationStatus: "placeholder",
    },
  };

  return metadata[providerId];
}

function getUnavailabilityReason(
  providerId: AIProviderType,
  apiKeyConfigured: boolean,
  implementationStatus: ProviderImplementationStatus
): string | undefined {
  if (providerId === "mock") return undefined;

  if (providerId === "mimo") {
    return "Mimo connector is not implemented in this repository.";
  }

  if (implementationStatus === "placeholder") {
    return apiKeyConfigured
      ? "API key is present, but this provider implementation still throws placeholder errors."
      : "API key is missing and this provider implementation still throws placeholder errors.";
  }

  if (!apiKeyConfigured) {
    return "API key is missing.";
  }

  return undefined;
}

export function getProviderCapabilities(env: ProviderEnv = process.env): ProviderCapability[] {
  return providerIds.map((providerId) => {
    const metadata = getProviderMetadata(providerId);
    const apiKeyConfigured = hasProviderKey(providerId, env);
    const available = providerId === "mock" || (apiKeyConfigured && metadata.implementationStatus === "ready");

    return {
      providerId,
      ...metadata,
      available,
      apiKeyConfigured,
      fallbackMode: available ? "none" : "mock",
      unavailabilityReason: getUnavailabilityReason(
        providerId,
        apiKeyConfigured,
        metadata.implementationStatus
      ),
    };
  });
}

export function getProviderCapability(
  providerId: AIProviderType,
  env: ProviderEnv = process.env
): ProviderCapability {
  return getProviderCapabilities(env).find((capability) => capability.providerId === providerId)
    ?? getProviderCapabilities(env)[0];
}

export function getProviderStatus(env: ProviderEnv = process.env): ProviderStatus {
  const configuredProvider = getConfiguredProvider(env);
  const isRealAIEnabled = getRealAIEnabled(env);
  const capabilities = getProviderCapabilities(env);
  const configuredCapability = capabilities.find(
    (capability) => capability.providerId === configuredProvider
  );

  const providerUsed =
    isRealAIEnabled && configuredCapability?.available ? configuredProvider : "mock";

  return {
    configuredProvider,
    providerUsed,
    fallbackProvider: providerUsed === configuredProvider ? null : "mock",
    isRealAIEnabled,
    capabilities,
  };
}

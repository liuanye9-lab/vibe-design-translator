import { AIProviderType } from "@/lib/types";
import { ProviderError } from "@/lib/llm/types";

export function serverApiKey(provider: AIProviderType): string | undefined {
  switch (provider) {
    case "openai":
      return process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    case "claude":
      return process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    case "gemini":
      return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    default:
      return undefined;
  }
}

export function normalizeProviderError(provider: AIProviderType, status: number, message: string): ProviderError {
  return {
    code: status === 401 || status === 403 ? "AUTH_FAILED" : "PROVIDER_REQUEST_FAILED",
    message,
    provider,
    retryable: status === 429 || status >= 500,
    rawStatus: status,
  };
}

export function toProviderError(error: unknown, provider: AIProviderType): ProviderError {
  if (
    typeof error === "object"
    && error !== null
    && "code" in error
    && "message" in error
    && "provider" in error
  ) {
    return error as ProviderError;
  }

  return {
    code: "PROVIDER_RUNTIME_ERROR",
    message: error instanceof Error ? error.message : "Provider request failed",
    provider,
    retryable: false,
  };
}

export function requireApiKey(provider: AIProviderType): string {
  const key = serverApiKey(provider);
  if (!key) {
    throw new Error(`${provider} API key is not configured`);
  }
  return key;
}

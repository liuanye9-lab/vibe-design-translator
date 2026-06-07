import { AIProviderType } from "@/lib/types";

export interface TokenUsage {
  promptTokens?: number;
  candidateTokens?: number;
  totalTokens?: number;
  estimated?: boolean;
}

export interface ProviderError {
  code: string;
  message: string;
  provider: AIProviderType;
  retryable: boolean;
  rawStatus?: number;
}

export interface RefactorPromptResponse {
  prompt: string;
  locale: "zh" | "en";
}

export interface RouteMeta {
  locale: "zh" | "en";
  configuredProvider: AIProviderType;
  providerUsed: AIProviderType;
  fallbackProvider: AIProviderType | null;
  usage?: TokenUsage;
  error?: ProviderError;
}

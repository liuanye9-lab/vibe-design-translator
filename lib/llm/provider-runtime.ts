import { AIProviderType } from "@/lib/types";
import { TokenUsage } from "./types";

const usageByProvider = new Map<AIProviderType, TokenUsage>();

export function setProviderUsage(provider: AIProviderType, usage: TokenUsage | undefined) {
  if (usage) {
    usageByProvider.set(provider, usage);
  }
}

export function getProviderUsage(provider: AIProviderType): TokenUsage | undefined {
  return usageByProvider.get(provider);
}

export function estimateUsage(input: unknown, output: unknown): TokenUsage {
  const promptTokens = Math.ceil(JSON.stringify(input).length / 4);
  const candidateTokens = Math.ceil(JSON.stringify(output).length / 4);
  return {
    promptTokens,
    candidateTokens,
    totalTokens: promptTokens + candidateTokens,
    estimated: true,
  };
}

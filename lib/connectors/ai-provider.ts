// ============================================================
// Vibe Design Translator - AI Provider Base Interface
// ============================================================

import {
  DesignBrief,
  DesignDirection,
  DesignExecutionPack,
  AIProviderType,
  Locale,
} from "@/lib/types";

/**
 * Design AI Provider Interface
 * 
 * This defines the contract for all AI providers that can
 * generate design directions and execution packs.
 */
export interface DesignAIProviderConfig {
  type: AIProviderType;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKeyConfigured: boolean;
  implementationStatus?: "ready" | "placeholder";
}

/**
 * Design Direction Provider
 * Generates design direction recommendations based on brief
 */
export interface DesignDirectionProvider {
  /**
   * Generate design direction recommendations
   */
  generateDirections(input: DesignBrief): Promise<DesignDirection[]>;
}

/**
 * Design Execution Pack Provider
 * Generates execution packs based on brief and direction
 */
export interface DesignExecutionPackProvider {
  /**
   * Generate design execution pack
   */
  generateExecutionPack(
    brief: DesignBrief,
    direction: DesignDirection,
    locale?: Locale
  ): Promise<DesignExecutionPack>;
}

/**
 * Refactor Prompt Provider
 * Generates tool-specific refactor prompts
 */
export interface RefactorPromptProvider {
  /**
   * Generate refactor prompt for a specific tool
   */
  generateRefactorPrompt(
    report: {
      overallScore: number;
      scores: Record<string, number>;
      findings: string[];
      fixes: string[];
    },
    tool: "codex" | "claude-code" | "gemini" | "workbuddy",
    locale?: Locale
  ): Promise<string>;
}

/**
 * Combined Design AI Provider
 */
export interface DesignAIProvider
  extends DesignDirectionProvider,
    DesignExecutionPackProvider,
    RefactorPromptProvider {
  config: DesignAIProviderConfig;
}

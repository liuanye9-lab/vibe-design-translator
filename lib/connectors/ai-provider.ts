// ============================================================
// Vibe Design Translator - AI Provider Interface
// ============================================================
// Abstraction layer for AI-based prompt generation.
// All design AI providers must implement this interface.

import type { DesignBrief, DesignExecutionPack } from "@/lib/types";

export interface AIProvider {
  /**
   * Generate design direction recommendations based on brief.
   * Returns a list of direction IDs with scores.
   */
  generateDirections(brief: DesignBrief): Promise<Array<{
    id: string;
    score: number;
    reason?: string;
    keySignals?: string[];
    materialPatternIds?: string[];
  }>>;

  /**
   * Generate full execution pack for a selected direction.
   */
  generateExecutionPack(
    brief: DesignBrief,
    directionId: string
  ): Promise<DesignExecutionPack>;

  /**
   * Generate refactor prompt based on diagnosis findings.
   */
  generateRefactorPrompt(
    diagnosisFindings: string[],
    targetTool: string
  ): Promise<string>;
}

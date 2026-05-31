// ============================================================
// Vibe Design Translator - Mock Provider
// ============================================================
// Default provider implementation using local mock logic.
// Falls back to existing local generators from lib/.

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import type { DesignBrief, DesignExecutionPack, DiagnosisReport, ScreenshotAsset } from "@/lib/types";
import { getRecommendedDirection } from "@/lib/utils";
import { generateExecutionPack } from "@/lib/prompt-templates";
import { generateMockDiagnosisReport } from "@/lib/diagnosis";

export class MockProvider implements AIProvider, VisionProvider {
  async generateDirections(brief: DesignBrief): Promise<Array<{ id: string; score: number }>> {
    // Use local recommendation engine
    const context = {
      productCategory: brief.productCategory,
      audience: brief.audience || brief.targetUsers,
      businessPriority: brief.businessPriority,
      firstImpression: brief.firstImpression,
      visualReference: brief.visualReferenceTolerance,
    };

    const direction = getRecommendedDirection(context);
    
    // Return mock scored directions
    const directions = [
      { id: "calm-professional", score: direction === "calm-professional" ? 0.92 : 0.65 },
      { id: "soft-intelligent", score: direction === "soft-intelligent" ? 0.88 : 0.58 },
      { id: "experimental-premium", score: direction === "experimental-premium" ? 0.85 : 0.52 },
    ];

    return directions.sort((a, b) => b.score - a.score);
  }

  async generateExecutionPack(brief: DesignBrief, directionId: string): Promise<DesignExecutionPack> {
    // Use local execution pack generator
    return generateExecutionPack(directionId, brief);
  }

  async generateRefactorPrompt(diagnosisFindings: string[], targetTool: string): Promise<string> {
    const toolName = targetTool || "claude-code";
    return `## Refactor Prompt for ${toolName}

Based on the following diagnosis findings:
${diagnosisFindings.map(f => `- ${f}`).join("\n")}

Please refactor the page to address these issues. Focus on:
1. Removing AI-generated look (generic gradients, centered layouts)
2. Improving visual hierarchy and spacing
3. Adding personality through subtle design choices
4. Ensuring responsive behavior

Generate the complete refactored code.`;
  }

  async diagnoseScreenshot(
    screenshot: ScreenshotAsset,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport> {
    // Use local mock diagnosis with page type and pain points
    const report = generateMockDiagnosisReport(pageType, painPoints);
    
    // Enhance with screenshot analysis metadata
    return {
      ...report,
      screenshotAnalyzed: true,
      confidence: "medium",
    };
  }
}

// Singleton instance
export const mockProvider = new MockProvider();

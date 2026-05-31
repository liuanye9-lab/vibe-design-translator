// ============================================================
// Vibe Design Translator - Gemini Provider (Placeholder)
// ============================================================
// TODO: Implement with Google Gemini API (gemini-2.0-flash / gemini-pro-vision)
// Requires: GOOGLE_API_KEY environment variable

import type { AIProvider } from "./ai-provider";
import type { VisionProvider } from "./vision-provider";
import type { DesignBrief, DesignExecutionPack, DiagnosisReport, ScreenshotAsset } from "@/lib/types";

export class GeminiProvider implements AIProvider, VisionProvider {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || "";
    if (!this.apiKey) {
      console.warn("Google API key not configured - provider will not function");
    }
  }

  async generateDirections(brief: DesignBrief): Promise<Array<{ id: string; score: number }>> {
    // TODO: Call Gemini API with system prompt for design direction generation
    throw new Error("Gemini provider not implemented yet. Set GOOGLE_API_KEY and implement generateDirections().");
  }

  async generateExecutionPack(brief: DesignBrief, directionId: string): Promise<DesignExecutionPack> {
    // TODO: Call Gemini API to generate execution pack
    throw new Error("Gemini provider not implemented yet. Set GOOGLE_API_KEY and implement generateExecutionPack().");
  }

  async generateRefactorPrompt(diagnosisFindings: string[], targetTool: string): Promise<string> {
    // TODO: Call Gemini API to generate refactor prompt
    throw new Error("Gemini provider not implemented yet. Set GOOGLE_API_KEY and implement generateRefactorPrompt().");
  }

  async diagnoseScreenshot(
    screenshot: ScreenshotAsset | null,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport> {
    if (!screenshot) {
      throw new Error("Gemini vision diagnosis requires a screenshot. Text-only diagnosis not supported yet.");
    }
    // TODO: Use Gemini vision capabilities to analyze screenshot
    throw new Error("Gemini vision diagnosis not implemented yet. Set GOOGLE_API_KEY and implement diagnoseScreenshot().");
  }
}

export const geminiProvider = new GeminiProvider();

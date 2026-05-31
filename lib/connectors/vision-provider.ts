// ============================================================
// Vibe Design Translator - Vision Diagnosis Provider
// ============================================================
// Abstraction layer for screenshot-based diagnosis using AI vision.

import type { DiagnosisReport, ScreenshotAsset } from "@/lib/types";

export interface VisionProvider {
  /**
   * Diagnose a screenshot and return an analysis report.
   * @param screenshot The uploaded screenshot asset, or null for text-only diagnosis
   * @param pageType Type of page (e.g., "landing", "product", "pricing")
   * @param painPoints User-described pain points
   */
  diagnoseScreenshot(
    screenshot: ScreenshotAsset | null,
    pageType?: string,
    painPoints?: string
  ): Promise<DiagnosisReport>;
}

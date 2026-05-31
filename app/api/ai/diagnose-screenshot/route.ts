// ============================================================
// Vibe Design Translator - Diagnose Screenshot API Route
// ============================================================
// POST /api/ai/diagnose-screenshot
//
// Server-side screenshot diagnosis using AI Vision providers.
// API keys stay on server (never expose to client).
// Falls back to mock provider when real AI is unavailable.
//
// Request body:
// {
//   screenshot: { dataUrl, name, size, mimeType },
//   pageType?: string,
//   painPoints?: string
// }
//
// Response:
// { success: true, data: DiagnosisReport, meta: { provider, fallback, tokensUsed, estimatedCost } }
// { success: false, error: { code, message } }

import { NextRequest, NextResponse } from "next/server";
import { getVisionDiagnosisProvider } from "@/lib/connectors/provider-registry";
import { mockProvider } from "@/lib/connectors/mock-provider";
import type { ScreenshotAsset, DiagnosisReport } from "@/lib/types";

// Unified API response types
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: {
    provider: string;
    fallback: boolean;
    tokensUsed?: number;
    estimatedCost?: string;
  };
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const pageType = body.pageType as string | undefined;
    const painPoints = body.painPoints as string | undefined;
    const screenshotData = body.screenshot as ScreenshotAsset | undefined;

    // Screenshot is optional - can diagnose based on text description alone
    let screenshot: ScreenshotAsset | null = null;
    if (screenshotData?.dataUrl) {
      screenshot = {
        id: screenshotData.id || `ss_${Date.now()}`,
        name: screenshotData.name || "screenshot.png",
        size: screenshotData.size || 0,
        mimeType: screenshotData.mimeType || "image/png",
        dataUrl: screenshotData.dataUrl,
        uploadedAt: new Date().toISOString(),
      };
    }

    // Get configured vision provider
    const provider = getVisionDiagnosisProvider();
    const configuredProvider = process.env.NEXT_PUBLIC_AI_PROVIDER || "mock";
    const enableRealAI = process.env.NEXT_PUBLIC_ENABLE_REAL_AI === "true";

    let report: DiagnosisReport;
    let fallback = false;
    let tokensUsed = 0;
    let estimatedCost = "$0.00";

    try {
      // Attempt real AI diagnosis if enabled
      if (enableRealAI && configuredProvider !== "mock") {
        report = await provider.diagnoseScreenshot(screenshot, pageType, painPoints);

        // Estimate tokens (rough: ~2000 input tokens for prompt + ~500 for image)
        tokensUsed = screenshot ? 2500 : 2000;
        // Rough cost estimation: ~$0.01 per 1K tokens for vision models
        estimatedCost = `$${(tokensUsed / 1000 * 0.01).toFixed(3)}`;
      } else {
        // Fallback to mock provider
        fallback = true;
        report = await mockProvider.diagnoseScreenshot(screenshot, pageType, painPoints);
      }
    } catch (aiError) {
      // Graceful fallback to mock when AI fails
      console.error("AI provider failed, falling back to mock:", aiError);
      fallback = true;
      report = await mockProvider.diagnoseScreenshot(screenshot, pageType, painPoints);
    }

    return NextResponse.json<ApiSuccess<DiagnosisReport>>({
      success: true,
      data: report,
      meta: {
        provider: configuredProvider,
        fallback,
        tokensUsed,
        estimatedCost,
      },
    });
  } catch (error) {
    console.error("Diagnosis API error:", error);

    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to process diagnosis request",
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

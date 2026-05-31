// ============================================================
// Vibe Design Translator - Generate Refactor Prompt API Route
// ============================================================
// POST /api/ai/generate-refactor-prompt
//
// Server-side refactor prompt generation using AI providers.
// API keys stay on server (never expose to client).
// Falls back to mock provider when real AI is unavailable.
//
// Request body:
// {
//   diagnosisFindings: string[],
//   targetTool: string
// }
//
// Response:
// { success: true, data: string, meta: { provider, fallback, tokensUsed, estimatedCost } }
// { success: false, error: { code, message } }

import { NextRequest, NextResponse } from "next/server";
import { getDesignAIProvider } from "@/lib/connectors/provider-registry";
import { mockProvider } from "@/lib/connectors/mock-provider";

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

    // Validate required fields
    if (!body.diagnosisFindings || !Array.isArray(body.diagnosisFindings)) {
      return NextResponse.json<ApiError>(
        {
          success: false,
          error: {
            code: "MISSING_FINDINGS",
            message: "diagnosisFindings array is required",
          },
        },
        { status: 400 }
      );
    }

    const diagnosisFindings: string[] = body.diagnosisFindings;
    const targetTool: string = body.targetTool || "claude-code";

    // Get configured AI provider
    const provider = getDesignAIProvider();
    const configuredProvider = process.env.NEXT_PUBLIC_AI_PROVIDER || "mock";
    const enableRealAI = process.env.NEXT_PUBLIC_ENABLE_REAL_AI === "true";

    let prompt: string;
    let fallback = false;
    let tokensUsed = 0;
    let estimatedCost = "$0.00";

    try {
      // Attempt real AI generation if enabled
      if (enableRealAI && configuredProvider !== "mock") {
        prompt = await provider.generateRefactorPrompt(diagnosisFindings, targetTool);

        // Estimate tokens (rough: ~1000 input + ~500 output)
        tokensUsed = 1500;
        estimatedCost = `$${(tokensUsed / 1000 * 0.01).toFixed(3)}`;
      } else {
        fallback = true;
        prompt = await mockProvider.generateRefactorPrompt(diagnosisFindings, targetTool);
      }
    } catch (aiError) {
      // Graceful fallback to mock when AI fails
      console.error("AI provider failed, falling back to mock:", aiError);
      fallback = true;
      prompt = await mockProvider.generateRefactorPrompt(diagnosisFindings, targetTool);
    }

    return NextResponse.json<ApiSuccess<string>>({
      success: true,
      data: prompt,
      meta: {
        provider: configuredProvider,
        fallback,
        tokensUsed,
        estimatedCost,
      },
    });
  } catch (error) {
    console.error("Refactor prompt API error:", error);

    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to generate refactor prompt",
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

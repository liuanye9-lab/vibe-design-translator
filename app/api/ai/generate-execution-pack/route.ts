// ============================================================
// Vibe Design Translator - Generate Execution Pack API Route
// ============================================================
// POST /api/ai/generate-execution-pack
//
// Server-side execution pack generation using AI providers.
// API keys stay on server (never expose to client).
// Falls back to mock provider when real AI is unavailable.
//
// Request body:
// {
//   brief: DesignBrief,
//   directionId: string
// }
//
// Response:
// { success: true, data: DesignExecutionPack, meta: { provider, fallback, tokensUsed, estimatedCost } }
// { success: false, error: { code, message } }

import { NextRequest, NextResponse } from "next/server";
import { getDesignAIProvider } from "@/lib/connectors/provider-registry";
import { mockProvider } from "@/lib/connectors/mock-provider";
import type { DesignBrief, DesignExecutionPack } from "@/lib/types";

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
    if (!body.brief || !body.directionId) {
      return NextResponse.json<ApiError>(
        {
          success: false,
          error: {
            code: "MISSING_PARAMS",
            message: "brief and directionId are required",
          },
        },
        { status: 400 }
      );
    }

    const brief: DesignBrief = body.brief;
    const directionId: string = body.directionId;

    // Get configured AI provider
    // getDesignAIProvider() already handles env vars and returns mock if not enabled
    const provider = getDesignAIProvider();
    const configuredProvider = process.env.AI_PROVIDER || "mock";
    const isRealAI = configuredProvider !== "mock" && process.env.ENABLE_REAL_AI === "true";

    let pack: DesignExecutionPack;
    let fallback = false;
    let tokensUsed = 0;
    let estimatedCost = "$0.00";

    try {
      // Attempt AI generation
      pack = await provider.generateExecutionPack(brief, directionId);

      // Check if we're using mock
      if (!isRealAI) {
        fallback = true;
      } else {
        // Estimate tokens for real AI calls
        tokensUsed = 5000;
        estimatedCost = `$${(tokensUsed / 1000 * 0.01).toFixed(3)}`;
      }
    } catch (aiError) {
      // Graceful fallback to mock when AI fails
      console.error("AI provider failed, falling back to mock:", aiError);
      fallback = true;
      pack = await mockProvider.generateExecutionPack(brief, directionId);
    }

    return NextResponse.json<ApiSuccess<DesignExecutionPack>>({
      success: true,
      data: pack,
      meta: {
        provider: configuredProvider,
        fallback,
        tokensUsed,
        estimatedCost,
      },
    });
  } catch (error) {
    console.error("Execution pack API error:", error);

    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to generate execution pack",
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

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
    const provider = getDesignAIProvider();
    const configuredProvider = process.env.NEXT_PUBLIC_AI_PROVIDER || "mock";
    const enableRealAI = process.env.NEXT_PUBLIC_ENABLE_REAL_AI === "true";

    let pack: DesignExecutionPack;
    let fallback = false;
    let tokensUsed = 0;
    let estimatedCost = "$0.00";

    try {
      // Attempt real AI generation if enabled
      if (enableRealAI && configuredProvider !== "mock") {
        pack = await provider.generateExecutionPack(brief, directionId);

        // Estimate tokens (rough: ~3000 input + ~2000 output for full pack)
        tokensUsed = 5000;
        estimatedCost = `$${(tokensUsed / 1000 * 0.01).toFixed(3)}`;
      } else {
        fallback = true;
        pack = await mockProvider.generateExecutionPack(brief, directionId);
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

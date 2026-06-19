// ============================================================
// Vibe Design Translator - Direction Recommendation API
// ============================================================
// POST /api/ai/recommend-directions
//
// Uses the configured server-side AI provider for direction planning.
// Falls back to the local recommendation engine when provider calls fail.

import { NextRequest, NextResponse } from "next/server";
import { getDesignAIProvider } from "@/lib/connectors/provider-registry";
import { mockProvider } from "@/lib/connectors/mock-provider";
import { DESIGN_DIRECTIONS } from "@/lib/design-directions";
import type { DesignBrief, DirectionAgentResult, DirectionRecommendation } from "@/lib/types";

type ProviderDirection = {
  id: string;
  score: number;
  reason?: string;
  keySignals?: string[];
  materialPatternIds?: string[];
};

interface ApiSuccess {
  success: true;
  data: DirectionAgentResult;
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

const validDirectionIds = new Set(DESIGN_DIRECTIONS.map((direction) => direction.id));

function toConfidence(score: number): "high" | "medium" | "low" {
  if (score >= 80) return "high";
  if (score >= 62) return "medium";
  return "low";
}

function normalizeScore(score: number): number {
  if (score <= 1) return Math.round(score * 100);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function defaultReason(directionId: string, brief: DesignBrief): string {
  const product = brief.productName || brief.productCategory || "当前产品";
  if (directionId === "calm-professional") {
    return `${product} 需要先建立信任和清晰转化，冷静专业型更适合承载企业级信息层级`;
  }
  if (directionId === "experimental-premium") {
    return `${product} 需要更强识别度和记忆点，实验高级型能拉开视觉差异`;
  }
  return `${product} 需要兼顾智能感和亲近感，柔和智能型更容易把复杂能力讲清楚`;
}

function fallbackPatterns(directionId: string): string[] {
  if (directionId === "calm-professional") return ["p1", "p4", "p7", "p12"];
  if (directionId === "experimental-premium") return ["p2", "p5", "p8", "p10"];
  return ["p1", "p6", "p9", "p12"];
}

function normalizeRecommendations(items: ProviderDirection[], brief: DesignBrief): DirectionRecommendation[] {
  const seen = new Set<string>();
  return items
    .filter((item) => validDirectionIds.has(item.id) && !seen.has(item.id))
    .map((item) => {
      seen.add(item.id);
      const score = normalizeScore(item.score);
      return {
        directionId: item.id,
        score,
        reason: item.reason || defaultReason(item.id, brief),
        confidence: toConfidence(score),
        keySignals: item.keySignals?.slice(0, 4) || [
          brief.productCategory,
          brief.businessPriority,
          brief.firstImpression,
        ].filter(Boolean) as string[],
        materialPatternIds: item.materialPatternIds?.slice(0, 4) || fallbackPatterns(item.id),
      };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}

function buildSummary(recommendations: DirectionRecommendation[], provider: string, fallback: boolean): string {
  const top = recommendations[0];
  const source = fallback ? "本地规则兜底" : `${provider} 智能分析`;
  return top
    ? `${source}推荐 ${top.directionId}，置信度 ${top.score || 0}/100`
    : `${source}暂未得到稳定推荐`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.brief) {
      return NextResponse.json<ApiError>(
        {
          success: false,
          error: {
            code: "MISSING_BRIEF",
            message: "brief is required",
          },
        },
        { status: 400 }
      );
    }

    const brief: DesignBrief = body.brief;
    const configuredProvider = process.env.AI_PROVIDER || "mock";
    const isRealAI = configuredProvider !== "mock" && process.env.ENABLE_REAL_AI === "true";
    const provider = getDesignAIProvider();

    let fallback = !isRealAI;
    let rawRecommendations: ProviderDirection[];

    try {
      rawRecommendations = await provider.generateDirections(brief);
    } catch (error) {
      console.error("Direction provider failed, falling back to local rules:", error);
      fallback = true;
      rawRecommendations = await mockProvider.generateDirections(brief);
    }

    const recommendations = normalizeRecommendations(rawRecommendations, brief);
    const providerName = fallback ? "mock" : configuredProvider;

    return NextResponse.json<ApiSuccess>({
      success: true,
      data: {
        summary: buildSummary(recommendations, providerName, fallback),
        recommendations,
        provider: providerName,
        fallback,
      },
    });
  } catch (error) {
    console.error("Direction recommendation API error:", error);
    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to recommend directions",
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    );
  }
}

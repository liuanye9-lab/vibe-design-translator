// ============================================================
// Skill: Direction Planner
// ============================================================
// Input:  DesignBrief
// Output: Recommended directionId + recommendation reason
//
// Uses existing direction recommendation logic from utils.ts.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DesignBrief, DirectionRecommendation } from "@/lib/types";
import { calculateDirectionScores, getRecommendedDirection } from "@/lib/utils";

export const directionPlannerSkill: AgentSkill<DesignBrief, DirectionRecommendation[]> = {
  id: "direction-planner",
  name: "推荐视觉方向",
  description: "基于 Design Brief 推荐最适合的视觉方向",

  async run(input: DesignBrief, _context: AgentContext): Promise<DirectionRecommendation[]> {
    const context = {
      productCategory: input.productCategory,
      targetUsers: input.targetUsers,
      businessPriority: input.businessPriority,
      audience: input.audience,
      firstImpression: input.firstImpression,
      visualReference: input.visualReferenceTolerance,
    };

    const scores = calculateDirectionScores(context);
    const recommended = getRecommendedDirection(context);

    // Build recommendations sorted by score
    const recommendations: DirectionRecommendation[] = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([directionId, score]) => ({
        directionId,
        reason: directionId === recommended
          ? `根据您的 Brief 分析，该方向最适合您的产品定位和目标用户`
          : `得分 ${score}，可作为备选方案`,
        confidence: (score >= 5 ? "high" : score >= 3 ? "medium" : "low") as "high" | "medium" | "low",
      }));

    return recommendations;
  },
};

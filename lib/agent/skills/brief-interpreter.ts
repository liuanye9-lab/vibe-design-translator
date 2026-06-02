// ============================================================
// Skill: Brief Interpreter
// ============================================================
// Input:  DesignBrief
// Output: Structured design intent summary
//
// Wraps existing local logic — no new model calls in Phase 5.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DesignBrief } from "@/lib/types";

export interface BriefInterpretation {
  productName: string;
  productCategory: string;
  targetUsers: string;
  pageGoal: string;
  emotionalIntent: string;
  businessPriority: string;
  audience: string;
  visualDirection: string;
  riskFactors: string[];
  summary: string;
}

export const briefInterpreterSkill: AgentSkill<DesignBrief, BriefInterpretation> = {
  id: "brief-interpreter",
  name: "理解设计 Brief",
  description: "解析用户的 Design Brief，提取结构化设计意图摘要",

  async run(input: DesignBrief, _context: AgentContext): Promise<BriefInterpretation> {
    const emotionalIntent = input.desiredFeeling.length > 0
      ? input.desiredFeeling.join(", ")
      : input.firstImpression || "professional";

    const businessPriority = input.businessPriority || "conversion";

    const audience = input.audience || input.targetUsers;

    const riskFactors: string[] = [];
    if (input.avoidedFeeling.length > 0) {
      riskFactors.push(`避免: ${input.avoidedFeeling.join(", ")}`);
    }
    if (input.avoidedAISmell && input.avoidedAISmell.length > 0) {
      riskFactors.push(`反 AI 味: ${input.avoidedAISmell.join(", ")}`);
    }
    if (input.visualIntensity === "expressive") {
      riskFactors.push("高视觉强度需注意过度装饰风险");
    }

    const summary = [
      `${input.productName} 是一个 ${input.productCategory} 产品，`,
      `目标用户是 ${audience}。`,
      `页面核心目标: ${input.pageGoal}。`,
      `期望情感: ${emotionalIntent}。`,
      `商业优先级: ${businessPriority}。`,
      `主要 CTA: "${input.mainCTA}"。`,
    ].join("");

    return {
      productName: input.productName,
      productCategory: input.productCategory,
      targetUsers: input.targetUsers,
      pageGoal: input.pageGoal,
      emotionalIntent,
      businessPriority,
      audience,
      visualDirection: input.visualIntensity,
      riskFactors,
      summary,
    };
  },
};

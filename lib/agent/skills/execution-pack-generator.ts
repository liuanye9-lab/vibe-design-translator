// ============================================================
// Skill: Execution Pack Generator
// ============================================================
// Input:  DesignBrief + DesignDirection
// Output: DesignExecutionPack
//
// Wraps existing generateExecutionPack from prompt-templates.ts.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DesignBrief, DesignExecutionPack, DesignDirection } from "@/lib/types";
import { generateExecutionPack } from "@/lib/prompt-templates";
import { getDirectionById } from "@/lib/design-directions";

export interface PackGeneratorInput {
  brief: DesignBrief;
  directionId: string;
}

export const executionPackGeneratorSkill: AgentSkill<PackGeneratorInput, DesignExecutionPack> = {
  id: "execution-pack-generator",
  name: "生成 Design Execution Pack",
  description: "基于 Brief 和选定方向生成完整的设计执行包",

  async run(input: PackGeneratorInput, _context: AgentContext): Promise<DesignExecutionPack> {
    const direction = getDirectionById(input.directionId);
    if (!direction) {
      throw new Error(`Direction not found: ${input.directionId}`);
    }

    return generateExecutionPack(input.brief, direction);
  },
};

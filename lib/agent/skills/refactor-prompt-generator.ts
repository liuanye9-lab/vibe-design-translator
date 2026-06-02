// ============================================================
// Skill: Refactor Prompt Generator
// ============================================================
// Input:  DiagnosisReport + ToolType
// Output: Refactor prompt string
//
// Uses existing generateRefactorPrompts from diagnosis.ts.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DiagnosisReport, ToolType } from "@/lib/types";
import { generateRefactorPrompts } from "@/lib/diagnosis";

export interface RefactorPromptInput {
  report: DiagnosisReport;
  tool: ToolType;
}

export const refactorPromptGeneratorSkill: AgentSkill<RefactorPromptInput, string> = {
  id: "refactor-prompt-generator",
  name: "生成重构 Prompt",
  description: "基于诊断报告生成工具专用的重构 Prompt",

  async run(input: RefactorPromptInput, _context: AgentContext): Promise<string> {
    const prompts = generateRefactorPrompts(input.report);
    const prompt = prompts[input.tool];
    if (!prompt) {
      throw new Error(`No refactor prompt found for tool: ${input.tool}`);
    }
    return prompt;
  },
};

// ============================================================
// Skill: Prompt Compiler
// ============================================================
// Input:  DesignExecutionPack + ToolType
// Output: Tool-specific prompt string
//
// Extracts the appropriate prompt from the execution pack.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DesignExecutionPack, ToolType } from "@/lib/types";

export interface PromptCompilerInput {
  pack: DesignExecutionPack;
  tool: ToolType;
}

export const promptCompilerSkill: AgentSkill<PromptCompilerInput, string> = {
  id: "prompt-compiler",
  name: "编译工具专用 Prompt",
  description: "从 Execution Pack 中提取目标工具的专用 Prompt",

  async run(input: PromptCompilerInput, _context: AgentContext): Promise<string> {
    const prompt = input.pack.prompts[input.tool];
    if (!prompt) {
      throw new Error(`No prompt found for tool: ${input.tool}`);
    }
    return prompt;
  },
};

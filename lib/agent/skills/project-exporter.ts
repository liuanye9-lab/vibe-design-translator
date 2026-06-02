// ============================================================
// Skill: Project Exporter
// ============================================================
// Input:  projectId (string)
// Output: Markdown export string
//
// Uses existing exportProjectAsMarkdown from the store.
// Note: This skill needs the store instance passed via context
// or accessed directly. For Phase 5, we'll accept the markdown
// as input to keep the skill pure.
// ============================================================

import { AgentSkill, AgentContext } from "../types";

export interface ProjectExporterInput {
  projectName: string;
  markdown: string;
}

export interface ProjectExporterOutput {
  format: "markdown";
  content: string;
  fileName: string;
}

export const projectExporterSkill: AgentSkill<ProjectExporterInput, ProjectExporterOutput> = {
  id: "project-exporter",
  name: "导出项目",
  description: "将项目数据导出为 Markdown 格式",

  async run(input: ProjectExporterInput, _context: AgentContext): Promise<ProjectExporterOutput> {
    return {
      format: "markdown",
      content: input.markdown,
      fileName: `${input.projectName.replace(/\s+/g, "-").toLowerCase()}.md`,
    };
  },
};

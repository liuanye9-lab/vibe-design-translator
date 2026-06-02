// ============================================================
// Vibe Design Translator - Agent Skill Registry
// ============================================================
//
// Inspired by OpenClaw's composable skill pattern.
// Central registry for all agent skills — single source of truth.
//
// Usage:
//   const skill = skillRegistry.get("brief-interpreter");
//   const result = await skill.run(input, context);
// ============================================================

import { AnyAgentSkill } from "./types";
import { briefInterpreterSkill } from "./skills/brief-interpreter";
import { directionPlannerSkill } from "./skills/direction-planner";
import { executionPackGeneratorSkill } from "./skills/execution-pack-generator";
import { promptCompilerSkill } from "./skills/prompt-compiler";
import { visionDiagnosisSkill } from "./skills/vision-diagnosis";
import { refactorPromptGeneratorSkill } from "./skills/refactor-prompt-generator";
import { projectExporterSkill } from "./skills/project-exporter";

// ============================================================
// Registry
// ============================================================

class SkillRegistry {
  private skills = new Map<string, AnyAgentSkill>();

  constructor() {
    // Register all built-in skills
    this.register(briefInterpreterSkill);
    this.register(directionPlannerSkill);
    this.register(executionPackGeneratorSkill);
    this.register(promptCompilerSkill);
    this.register(visionDiagnosisSkill);
    this.register(refactorPromptGeneratorSkill);
    this.register(projectExporterSkill);
  }

  register(skill: AnyAgentSkill): void {
    this.skills.set(skill.id, skill);
  }

  get(id: string): AnyAgentSkill | undefined {
    return this.skills.get(id);
  }

  has(id: string): boolean {
    return this.skills.has(id);
  }

  getAll(): AnyAgentSkill[] {
    return Array.from(this.skills.values());
  }

  getIds(): string[] {
    return Array.from(this.skills.keys());
  }
}

/** Singleton skill registry — use this everywhere */
export const skillRegistry = new SkillRegistry();

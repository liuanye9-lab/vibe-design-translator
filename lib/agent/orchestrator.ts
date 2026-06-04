// ============================================================
// Vibe Design Translator - Workflow Orchestrator
// ============================================================
//
// Design principles:
// - OpenClaw Gateway: unified control over tasks, tools, events
// - Claude Code: Plan → Execute → Verify pattern
// - Hermes: strong execution chains, transparent process,
//   auditable steps, failure-resilient continuation
//
// All workflows run client-side in Phase 5.
// No background queues — synchronous step execution.
// ============================================================

import {
  AgentRun,
  AgentRunType,
  AgentRunStatus,
  AgentStep,
  AgentStepStatus,
  AgentEvent,
  AgentContext,
  AgentStepTemplate,
} from "./types";
import { skillRegistry } from "./skill-registry";
import { generateId } from "@/lib/utils";
import {
  DesignBrief,
  DiagnosisInput,
  DiagnosisReport,
  ToolType,
} from "@/lib/types";
import { evaluateExecutionPack } from "@/lib/evaluators/execution-pack-evaluator";
import { evaluateDiagnosisReport } from "@/lib/evaluators/diagnosis-evaluator";
import { evaluatePromptQuality } from "@/lib/evaluators/prompt-quality-evaluator";
import type { EvaluationResult } from "@/lib/evaluators/types";

// ============================================================
// ID Generation
// ============================================================

function createRunId(): string {
  return `run-${generateId()}`;
}

function createEventId(): string {
  return `evt-${generateId()}`;
}

// ============================================================
// Event Factory
// ============================================================

function createEvent(
  type: AgentEvent["type"],
  message: string,
  stepId?: string,
  metadata?: Record<string, unknown>
): AgentEvent {
  return {
    id: createEventId(),
    type,
    message,
    stepId,
    timestamp: new Date().toISOString(),
    metadata,
  };
}

// ============================================================
// Step Factory
// ============================================================

function createStepsFromTemplates(templates: AgentStepTemplate[]): AgentStep[] {
  return templates.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    skillId: t.skillId,
    status: "pending" as AgentStepStatus,
    progress: 0,
    requiresApproval: t.requiresApproval,
    approved: false,
  }));
}

// ============================================================
// Progress Calculation
// ============================================================

function calculateProgress(steps: AgentStep[]): number {
  if (steps.length === 0) return 0;
  const completedSteps = steps.filter(
    (s) => s.status === "succeeded" || s.status === "skipped"
  ).length;
  return Math.round((completedSteps / steps.length) * 100);
}

// ============================================================
// Run Factory
// ============================================================

function createAgentRun(
  type: AgentRunType,
  title: string,
  stepTemplates: AgentStepTemplate[],
  projectId?: string | null
): AgentRun {
  const now = new Date().toISOString();
  return {
    id: createRunId(),
    projectId: projectId ?? null,
    type,
    title,
    status: "idle",
    progress: 0,
    steps: createStepsFromTemplates(stepTemplates),
    events: [],
    createdAt: now,
    updatedAt: now,
  };
}

// ============================================================
// Callbacks (injected by UI layer)
// ============================================================

export interface OrchestratorCallbacks {
  onRunUpdate: (run: AgentRun) => void;
  onEvent: (runId: string, event: AgentEvent) => void;
  onStepUpdate: (runId: string, step: AgentStep) => void;
}

// ============================================================
// Step Executor
// ============================================================

async function executeStep(
  run: AgentRun,
  step: AgentStep,
  input: unknown,
  context: AgentContext,
  callbacks: OrchestratorCallbacks
): Promise<unknown> {
  // Update step status to running
  step.status = "running";
  step.progress = 0;
  step.startedAt = new Date().toISOString();
  callbacks.onStepUpdate(run.id, { ...step });
  callbacks.onEvent(run.id, createEvent("step_started", `开始执行: ${step.name}`, step.id));

  // Check if skill exists
  if (!step.skillId) {
    // No skill — just mark as succeeded (manual step)
    step.status = "succeeded";
    step.progress = 100;
    step.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step });
    callbacks.onEvent(run.id, createEvent("step_succeeded", `完成: ${step.name}`, step.id));
    return null;
  }

  const skill = skillRegistry.get(step.skillId);
  if (!skill) {
    throw new Error(`Skill not found: ${step.skillId}`);
  }

  // Emit tool_called event
  callbacks.onEvent(run.id, createEvent("tool_called", `调用技能: ${skill.name}`, step.id, { skillId: skill.id }));

  try {
    // Execute skill
    step.progress = 50;
    callbacks.onStepUpdate(run.id, { ...step });

    const result = await skill.run(input, context);

    // Mark step as succeeded
    step.status = "succeeded";
    step.progress = 100;
    step.outputSummary = typeof result === "string" ? result.slice(0, 200) : JSON.stringify(result).slice(0, 200);
    step.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step });
    callbacks.onEvent(run.id, createEvent("step_succeeded", `完成: ${step.name}`, step.id));

    return result;
  } catch (error) {
    // Mark step as failed
    step.status = "failed";
    step.error = error instanceof Error ? error.message : String(error);
    step.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step });
    callbacks.onEvent(run.id, createEvent("step_failed", `失败: ${step.name} — ${step.error}`, step.id));

    throw error;
  }
}

// ============================================================
// Workflow: Design Translation
// ============================================================

const DESIGN_TRANSLATION_STEPS: AgentStepTemplate[] = [
  {
    id: "dt-interpret-brief",
    name: "理解设计 Brief",
    description: "解析用户的 Design Brief，提取结构化设计意图",
    skillId: "brief-interpreter",
  },
  {
    id: "dt-recommend-direction",
    name: "推荐视觉方向",
    description: "基于 Brief 推荐最适合的视觉方向",
    skillId: "direction-planner",
  },
  {
    id: "dt-select-direction",
    name: "选择视觉方向",
    description: "等待用户确认推荐的视觉方向",
    requiresApproval: true,
  },
  {
    id: "dt-generate-pack",
    name: "生成 Execution Pack",
    description: "基于 Brief 和选定方向生成完整设计执行包",
    skillId: "execution-pack-generator",
  },
  {
    id: "dt-compile-prompt",
    name: "编译工具专用 Prompt",
    description: "从 Execution Pack 中提取目标工具的 Prompt",
    skillId: "prompt-compiler",
  },
  {
    id: "dt-evaluate",
    name: "质量评估",
    description: "评估 Execution Pack 和 Prompt 的质量",
  },
  {
    id: "dt-save-to-project",
    name: "保存到项目",
    description: "将生成结果保存到当前项目",
  },
];

export async function runDesignTranslationWorkflow(
  brief: DesignBrief,
  context: AgentContext,
  callbacks: OrchestratorCallbacks,
  onNeedDirectionSelection?: (recommendations: unknown[]) => Promise<string>
): Promise<AgentRun> {
  const run = createAgentRun(
    "design_translation",
    `设计翻译: ${brief.productName}`,
    DESIGN_TRANSLATION_STEPS,
    context.projectId
  );

  run.status = "running";
  run.events.push(createEvent("run_started", `开始设计翻译工作流: ${brief.productName}`));
  callbacks.onRunUpdate({ ...run });

  try {
    // Step 1: Interpret Brief
    const step1 = run.steps[0];
    step1.inputSummary = `产品: ${brief.productName}, 类别: ${brief.productCategory}`;
    const interpretation = await executeStep(run, step1, brief, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 2: Recommend Direction
    const step2 = run.steps[1];
    step2.inputSummary = `基于 Brief 分析推荐方向`;
    const recommendations = await executeStep(run, step2, brief, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 3: User selects direction (approval gate)
    const step3 = run.steps[2];
    step3.status = "running";
    step3.startedAt = new Date().toISOString();
    run.status = "waiting_for_user";
    callbacks.onRunUpdate({ ...run });
    callbacks.onEvent(run.id, createEvent("user_approval_required", "请选择推荐的视觉方向", step3.id));

    let selectedDirectionId: string;
    if (onNeedDirectionSelection) {
      selectedDirectionId = await onNeedDirectionSelection(recommendations as unknown[]);
    } else {
      // Auto-select first recommendation
      const recs = recommendations as Array<{ directionId: string }>;
      selectedDirectionId = recs[0]?.directionId || "calm-professional";
    }

    step3.status = "succeeded";
    step3.progress = 100;
    step3.outputSummary = `选定方向: ${selectedDirectionId}`;
    step3.approved = true;
    step3.finishedAt = new Date().toISOString();
    run.status = "running";
    callbacks.onStepUpdate(run.id, { ...step3 });
    callbacks.onEvent(run.id, createEvent("user_approved", `用户选择了方向: ${selectedDirectionId}`, step3.id));
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 4: Generate Execution Pack
    const step4 = run.steps[3];
    step4.inputSummary = `Brief + Direction: ${selectedDirectionId}`;
    const pack = await executeStep(run, step4, { brief, directionId: selectedDirectionId }, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 5: Compile Prompt
    const step5 = run.steps[4];
    step5.inputSummary = `Pack + Tool: ${brief.outputTool}`;
    const prompt = await executeStep(run, step5, { pack, tool: brief.outputTool }, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 6: Evaluate quality
    const step6 = run.steps[5];
    step6.status = "running";
    step6.startedAt = new Date().toISOString();
    step6.inputSummary = "评估 Execution Pack 和 Prompt 质量";
    callbacks.onStepUpdate(run.id, { ...step6 });

    const packEval = evaluateExecutionPack(pack as import("@/lib/types").DesignExecutionPack);
    const promptEval = typeof prompt === "string"
      ? evaluatePromptQuality(prompt, brief.outputTool as ToolType)
      : null;

    step6.status = "succeeded";
    step6.progress = 100;
    step6.outputSummary = `Pack: ${packEval.score}/100${promptEval ? `, Prompt: ${promptEval.score}/100` : ""}`;
    step6.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step6 });
    callbacks.onEvent(run.id, createEvent("step_succeeded", `质量评估完成: Pack ${packEval.score}/100`, step6.id));
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 7: Save to project
    const step7 = run.steps[6];
    step7.status = "running";
    step7.startedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step7 });

    run.result = {
      interpretation,
      recommendations,
      selectedDirectionId,
      pack,
      prompt,
      evaluation: {
        pack: packEval,
        prompt: promptEval,
      },
    };
    step7.status = "succeeded";
    step7.progress = 100;
    step7.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step7 });

    // Complete
    run.status = "succeeded";
    run.progress = 100;
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_succeeded", "设计翻译工作流完成"));
    callbacks.onRunUpdate({ ...run });

    return run;
  } catch (error) {
    run.status = "failed";
    run.error = error instanceof Error ? error.message : String(error);
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_failed", `工作流失败: ${run.error}`));
    callbacks.onRunUpdate({ ...run });
    return run;
  }
}

// ============================================================
// Workflow: Page Diagnosis
// ============================================================

const DIAGNOSIS_STEPS: AgentStepTemplate[] = [
  {
    id: "diag-read-input",
    name: "读取诊断输入",
    description: "读取页面描述和截图信息",
  },
  {
    id: "diag-vision",
    name: "视觉诊断",
    description: "调用 Vision Diagnosis Provider 分析页面",
    skillId: "vision-diagnosis",
  },
  {
    id: "diag-analyze",
    name: "分析诊断结果",
    description: "生成评分和问题列表",
  },
  {
    id: "diag-generate-prompt",
    name: "生成重构 Prompt",
    description: "基于诊断结果编译工具专用重构 Prompt",
    skillId: "refactor-prompt-generator",
  },
  {
    id: "diag-evaluate",
    name: "质量评估",
    description: "评估诊断报告和重构 Prompt 的质量",
  },
  {
    id: "diag-save",
    name: "保存诊断报告",
    description: "将诊断报告保存到当前项目",
  },
];

export async function runDiagnosisWorkflow(
  input: DiagnosisInput,
  tool: ToolType,
  context: AgentContext,
  callbacks: OrchestratorCallbacks
): Promise<AgentRun> {
  const run = createAgentRun(
    "page_diagnosis",
    `页面诊断: ${input.pageType}`,
    DIAGNOSIS_STEPS,
    context.projectId
  );

  run.status = "running";
  run.events.push(createEvent("run_started", "开始页面诊断工作流"));
  callbacks.onRunUpdate({ ...run });

  try {
    // Step 1: Read input
    const step1 = run.steps[0];
    step1.inputSummary = `页面类型: ${input.pageType}, 痛点: ${input.primaryPainPoint}`;
    step1.status = "running";
    step1.startedAt = new Date().toISOString();
    step1.status = "succeeded";
    step1.progress = 100;
    step1.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step1 });
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 2: Vision Diagnosis
    const step2 = run.steps[1];
    step2.inputSummary = `诊断输入: ${input.pageType}`;
    const report = await executeStep(run, step2, input, context, callbacks) as DiagnosisReport;
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 3: Analyze results
    const step3 = run.steps[2];
    step3.status = "running";
    step3.startedAt = new Date().toISOString();
    step3.outputSummary = `总分: ${report.overallScore}/100, 发现 ${report.findings.length} 个问题`;
    step3.status = "succeeded";
    step3.progress = 100;
    step3.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step3 });
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 4: Generate refactor prompt
    const step4 = run.steps[3];
    step4.inputSummary = `诊断报告 + Tool: ${tool}`;
    const refactorPrompt = await executeStep(run, step4, { report, tool }, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 5: Evaluate quality
    const step5 = run.steps[4];
    step5.status = "running";
    step5.startedAt = new Date().toISOString();
    step5.inputSummary = "评估诊断报告和重构 Prompt 质量";
    callbacks.onStepUpdate(run.id, { ...step5 });

    const diagEval = evaluateDiagnosisReport(report);
    const refactorPromptEval = typeof refactorPrompt === "string"
      ? evaluatePromptQuality(refactorPrompt, tool)
      : null;

    step5.status = "succeeded";
    step5.progress = 100;
    step5.outputSummary = `诊断: ${diagEval.score}/100${refactorPromptEval ? `, Prompt: ${refactorPromptEval.score}/100` : ""}`;
    step5.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step5 });
    callbacks.onEvent(run.id, createEvent("step_succeeded", `质量评估完成: 诊断 ${diagEval.score}/100`, step5.id));
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 6: Save
    const step6 = run.steps[5];
    step6.status = "running";
    step6.startedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step6 });

    run.result = {
      report,
      refactorPrompt,
      evaluation: {
        diagnosis: diagEval,
        prompt: refactorPromptEval,
      },
    };
    step6.status = "succeeded";
    step6.progress = 100;
    step6.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step6 });

    // Complete
    run.status = "succeeded";
    run.progress = 100;
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_succeeded", "页面诊断工作流完成"));
    callbacks.onRunUpdate({ ...run });

    return run;
  } catch (error) {
    run.status = "failed";
    run.error = error instanceof Error ? error.message : String(error);
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_failed", `工作流失败: ${run.error}`));
    callbacks.onRunUpdate({ ...run });
    return run;
  }
}

// ============================================================
// Workflow: Refactor Prompt
// ============================================================

const REFACTOR_STEPS: AgentStepTemplate[] = [
  {
    id: "ref-read-report",
    name: "读取诊断报告",
    description: "读取诊断报告数据",
  },
  {
    id: "ref-select-tool",
    name: "选择目标工具",
    description: "确定重构 Prompt 的目标 AI 工具",
  },
  {
    id: "ref-generate-prompt",
    name: "生成重构 Prompt",
    description: "生成工具专用的重构 Prompt",
    skillId: "refactor-prompt-generator",
  },
  {
    id: "ref-evaluate",
    name: "质量评估",
    description: "评估生成的 Prompt 质量",
  },
  {
    id: "ref-save",
    name: "保存 Prompt",
    description: "将 Prompt 导出保存到项目",
  },
];

export async function runRefactorWorkflow(
  report: DiagnosisReport,
  tool: ToolType,
  context: AgentContext,
  callbacks: OrchestratorCallbacks
): Promise<AgentRun> {
  const run = createAgentRun(
    "refactor_prompt",
    `重构 Prompt: ${tool}`,
    REFACTOR_STEPS,
    context.projectId
  );

  run.status = "running";
  run.events.push(createEvent("run_started", "开始重构 Prompt 工作流"));
  callbacks.onRunUpdate({ ...run });

  try {
    // Step 1: Read report
    const step1 = run.steps[0];
    step1.inputSummary = `诊断总分: ${report.overallScore}/100`;
    step1.status = "running";
    step1.startedAt = new Date().toISOString();
    step1.status = "succeeded";
    step1.progress = 100;
    step1.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step1 });
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 2: Select tool
    const step2 = run.steps[1];
    step2.inputSummary = `目标工具: ${tool}`;
    step2.status = "running";
    step2.startedAt = new Date().toISOString();
    step2.status = "succeeded";
    step2.progress = 100;
    step2.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step2 });
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 3: Generate prompt
    const step3 = run.steps[2];
    step3.inputSummary = `诊断报告 + Tool: ${tool}`;
    const prompt = await executeStep(run, step3, { report, tool }, context, callbacks);
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 4: Evaluate quality
    const step4 = run.steps[3];
    step4.status = "running";
    step4.startedAt = new Date().toISOString();
    step4.inputSummary = "评估 Prompt 质量";
    callbacks.onStepUpdate(run.id, { ...step4 });

    const promptEval = typeof prompt === "string"
      ? evaluatePromptQuality(prompt, tool)
      : null;

    step4.status = "succeeded";
    step4.progress = 100;
    step4.outputSummary = promptEval ? `Prompt: ${promptEval.score}/100` : "跳过评估";
    step4.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step4 });
    callbacks.onEvent(run.id, createEvent("step_succeeded", `质量评估完成: ${promptEval?.score || 0}/100`, step4.id));
    run.progress = calculateProgress(run.steps);
    callbacks.onRunUpdate({ ...run });

    // Step 5: Save
    const step5 = run.steps[4];
    step5.status = "running";
    step5.startedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step5 });

    run.result = {
      prompt,
      evaluation: {
        prompt: promptEval,
      },
    };
    step5.status = "succeeded";
    step5.progress = 100;
    step5.finishedAt = new Date().toISOString();
    callbacks.onStepUpdate(run.id, { ...step5 });

    // Complete
    run.status = "succeeded";
    run.progress = 100;
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_succeeded", "重构 Prompt 工作流完成"));
    callbacks.onRunUpdate({ ...run });

    return run;
  } catch (error) {
    run.status = "failed";
    run.error = error instanceof Error ? error.message : String(error);
    run.updatedAt = new Date().toISOString();
    run.events.push(createEvent("run_failed", `工作流失败: ${run.error}`));
    callbacks.onRunUpdate({ ...run });
    return run;
  }
}

// ============================================================
// Cancel & Retry
// ============================================================

export function cancelAgentRun(
  run: AgentRun,
  callbacks: OrchestratorCallbacks
): AgentRun {
  run.status = "cancelled";
  run.updatedAt = new Date().toISOString();
  run.events.push(createEvent("run_cancelled", "工作流已取消"));
  callbacks.onRunUpdate({ ...run });
  return run;
}

export async function retryFailedStep(
  run: AgentRun,
  stepId: string,
  input: unknown,
  context: AgentContext,
  callbacks: OrchestratorCallbacks
): Promise<AgentRun> {
  const step = run.steps.find((s) => s.id === stepId);
  if (!step || step.status !== "failed") {
    return run;
  }

  // Reset step
  step.status = "pending";
  step.error = undefined;
  step.progress = 0;
  callbacks.onStepUpdate(run.id, { ...step });

  // Re-run step
  run.status = "running";
  callbacks.onRunUpdate({ ...run });

  try {
    await executeStep(run, step, input, context, callbacks);
    run.progress = calculateProgress(run.steps);

    // Check if all steps are done
    const allDone = run.steps.every(
      (s) => s.status === "succeeded" || s.status === "skipped"
    );
    if (allDone) {
      run.status = "succeeded";
      run.progress = 100;
      run.events.push(createEvent("run_succeeded", "工作流完成（重试成功）"));
    }

    run.updatedAt = new Date().toISOString();
    callbacks.onRunUpdate({ ...run });
    return run;
  } catch {
    run.updatedAt = new Date().toISOString();
    callbacks.onRunUpdate({ ...run });
    return run;
  }
}

// ============================================================
// Vibe Design Translator - Agent Workflow Type System
// ============================================================
//
// Design principles inspired by:
// - OpenClaw: Gateway pattern, composable skills, workspace context
// - Claude Code: Plan → Execute → Verify, tool call trace, human approval
// - Hermes-class agents: strong execution chains, transparent process,
//   auditable steps, failure-resilient continuation
//
// All types are pure data contracts — no runtime logic here.
// ============================================================

// ============================================================
// Agent Run
// ============================================================

/** What kind of workflow the agent is executing */
export type AgentRunType =
  | "design_translation"
  | "page_diagnosis"
  | "refactor_prompt"
  | "project_export";

/** Lifecycle status of an entire agent run */
export type AgentRunStatus =
  | "idle"
  | "running"
  | "waiting_for_user"
  | "succeeded"
  | "failed"
  | "cancelled";

/** Status of an individual step within a run */
export type AgentStepStatus =
  | "pending"
  | "running"
  | "succeeded"
  | "failed"
  | "skipped";

// ============================================================
// Agent Events (append-only audit log)
// ============================================================

/** All possible event types emitted during an agent run */
export type AgentEventType =
  | "run_started"
  | "step_started"
  | "tool_called"
  | "step_succeeded"
  | "step_failed"
  | "fallback_used"
  | "user_approval_required"
  | "user_approved"
  | "run_succeeded"
  | "run_failed"
  | "run_cancelled";

/** A single immutable event in the agent timeline */
export interface AgentEvent {
  id: string;
  type: AgentEventType;
  message: string;
  stepId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ============================================================
// Agent Step
// ============================================================

/** One atomic unit of work inside an agent run */
export interface AgentStep {
  id: string;
  name: string;
  description: string;
  /** Which skill handles this step (references AgentSkill.id) */
  skillId?: string;
  status: AgentStepStatus;
  /** 0-100 progress for this individual step */
  progress: number;
  /** Human-readable summary of what went into this step */
  inputSummary?: string;
  /** Human-readable summary of what came out */
  outputSummary?: string;
  /** Error message if status === 'failed' */
  error?: string;
  /** Whether this step requires explicit user confirmation before executing */
  requiresApproval?: boolean;
  /** Whether user has approved this step */
  approved?: boolean;
  startedAt?: string;
  finishedAt?: string;
}

// ============================================================
// Agent Run (top-level container)
// ============================================================

/** A complete agent workflow run — the core data object */
export interface AgentRun {
  id: string;
  projectId?: string | null;
  type: AgentRunType;
  title: string;
  status: AgentRunStatus;
  /** 0-100 overall progress across all steps */
  progress: number;
  steps: AgentStep[];
  /** Append-only event log for full auditability */
  events: AgentEvent[];
  /** Final output of the workflow (type depends on run.type) */
  result?: unknown;
  /** Error message if status === 'failed' */
  error?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Agent Context (passed to every skill)
// ============================================================

/** Runtime context available to skills during execution */
export interface AgentContext {
  projectId?: string | null;
  provider: "mock" | "openai" | "claude" | "gemini" | "mimo" | "agnes";
  isRealAIEnabled: boolean;
  userConfirmed?: boolean;
}

// ============================================================
// Agent Skill (composable capability module)
// ============================================================

/**
 * A typed skill interface — the building block of all agent workflows.
 * Inspired by OpenClaw's composable skill pattern.
 *
 * Each skill:
 * - Has a unique id, name, and description
 * - Takes typed Input and produces typed Output
 * - Receives AgentContext for provider/project awareness
 * - Returns a Promise for async compatibility (API calls, etc.)
 */
export interface AgentSkill<Input, Output> {
  id: string;
  name: string;
  description: string;
  run(input: Input, context: AgentContext): Promise<Output>;
}

// ============================================================
// Convenience type for untyped skill references
// ============================================================

/** A skill with erased generics for registry storage */
export type AnyAgentSkill = AgentSkill<unknown, unknown>;

// ============================================================
// Workflow step definition (template for creating runs)
// ============================================================

/** Template for defining a workflow step before it becomes an AgentStep */
export interface AgentStepTemplate {
  id: string;
  name: string;
  description: string;
  skillId?: string;
  requiresApproval?: boolean;
}

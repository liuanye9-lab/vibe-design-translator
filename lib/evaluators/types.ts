// ============================================================
// Vibe Design Translator - Evaluator Types
// ============================================================

/** Evaluation result from any evaluator */
export interface EvaluationResult {
  id: string;
  targetType: "execution_pack" | "diagnosis_report" | "tool_prompt";
  targetId?: string;
  score: number;
  passed: boolean;
  dimensions: EvaluationDimensions;
  issues: string[];
  suggestions: string[];
  createdAt: string;
}

/** Six evaluation dimensions */
export interface EvaluationDimensions {
  completeness: number;
  specificity: number;
  executability: number;
  toolFit: number;
  antiAILook: number;
  riskControl: number;
}

/** Threshold for passing evaluation */
export const EVALUATION_PASS_THRESHOLD = 70;

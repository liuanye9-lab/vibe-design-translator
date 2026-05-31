// ============================================================
// Vibe Design Translator - Type System
// ============================================================

// Tool Types
export type ToolType =
  | "codex"
  | "claude-code"
  | "gemini"
  | "workbuddy";

// User Mode
export type UserMode =
  | "has-idea"
  | "no-idea"
  | "diagnose";

// Visual Intensity
export type VisualIntensity =
  | "minimal"
  | "balanced"
  | "expressive";

// Content Density
export type ContentDensity =
  | "light"
  | "standard"
  | "dense";

// ============================================================
// Design Brief
// ============================================================

export interface DesignBrief {
  productName: string;
  productCategory: string;
  targetUsers: string;
  pageGoal: string;
  desiredFeeling: string[];
  avoidedFeeling: string[];
  mainCTA: string;
  visualIntensity: VisualIntensity;
  contentDensity: ContentDensity;
  outputTool: ToolType;
}

export interface DesignBriefInput {
  productName?: string;
  productCategory?: string;
  targetUsers?: string;
  pageGoal?: string;
  desiredFeeling?: string[];
  avoidedFeeling?: string[];
  mainCTA?: string;
  visualIntensity?: VisualIntensity;
  contentDensity?: ContentDensity;
  outputTool?: ToolType;
}

// ============================================================
// Design Pattern
// ============================================================

export interface DesignPattern {
  id: string;
  name: string;
  category: string;
  suitableFor: string[];
  visualTraits: string[];
  layoutAdvice: string[];
  interactionAdvice: string[];
  promptFragment: string;
  avoid: string[];
  legalNote: string;
}

// ============================================================
// Design Direction
// ============================================================

export interface DesignDirection {
  id: string;
  name: string;
  description: string;
  suitableFor: string[];
  psychologicalEffect: string;
  visualKeywords: string[];
  colorSystem: string[];
  typography: string;
  layoutAdvice: string[];
  interactionAdvice: string[];
  risks: string;
}

// ============================================================
// Design Execution Pack
// ============================================================

export interface DesignExecutionPack {
  strategy: string[];
  pageStructure: string[];
  visualSystem: string[];
  interactionSystem: string[];
  acceptanceCriteria: string[];
  antiAILookChecklist: string[];
  prompts: Record<ToolType, string>;
}

// ============================================================
// Diagnosis System
// ============================================================

export interface DiagnosisScores {
  aiTemplateFeeling: number;
  visualHierarchy: number;
  colorControl: number;
  typographySystem: number;
  spacingSystem: number;
  interactionRestraint: number;
  conversionClarity: number;
}

export interface DiagnosisReport {
  overallScore: number;
  scores: DiagnosisScores;
  findings: string[];
  fixes: string[];
  refactorPrompts: Record<ToolType, string>;
}

export interface DiagnosisInput {
  pageType: string;
  pageDescription: string;
  primaryPainPoint: string;
  screenshotUrl?: string; // Placeholder for future screenshot upload
}

// ============================================================
// History
// ============================================================

export type HistoryEventType =
  | "brief_created"
  | "direction_selected"
  | "prompt_copied"
  | "diagnosis_performed";

export interface HistoryItem {
  id: string;
  timestamp: string;
  type: HistoryEventType;
  data: unknown;
}

// ============================================================
// App State
// ============================================================

export interface AppState {
  currentMode: UserMode | null;
  brief: DesignBrief | null;
  selectedDirectionId: string | null;
  selectedTool: ToolType;
  diagnosisReport: DiagnosisReport | null;
  history: HistoryItem[];
}
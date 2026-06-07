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

export type Locale = "zh" | "en";

// ============================================================
// Design Brief
// ============================================================

// Enhanced brief with design decision questions
export interface DesignBrief {
  // Basic Info
  productName: string;
  productCategory: string;
  targetUsers: string;
  pageGoal: string;

  // Legacy fields
  desiredFeeling: string[];
  avoidedFeeling: string[];
  mainCTA: string;
  visualIntensity: VisualIntensity;
  contentDensity: ContentDensity;
  outputTool: ToolType;

  // Enhanced Design Decision Fields
  firstImpression?: string;
  businessPriority?: string;
  visualReference?: string;
  avoidedAISmell?: string[];
  audience?: string;
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
  firstImpression?: string;
  businessPriority?: string;
  visualReference?: string;
  avoidedAISmell?: string[];
  audience?: string;
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
  // Enhanced fields
  whyWorksFor?: string[];
  riskIfOverused?: string;
  bestPageSections?: string[];
  notSuitableFor?: string[];
  recommendedFor?: string[];
}

export interface DirectionRecommendation {
  directionId: string;
  reason: string;
  confidence: "high" | "medium" | "low";
}

// ============================================================
// Design Execution Pack
// ============================================================

export interface DesignExecutionPack {
  // Basic structure
  strategy: string[];
  pageStructure: string[];
  visualSystem: string[];
  interactionSystem: string[];
  acceptanceCriteria: string[];
  antiAILookChecklist: string[];
  prompts: Record<ToolType, string>;

  // Enhanced structure
  contentTone?: string[];
  componentRules?: string[];
  responsiveRules?: string[];

  // Metadata
  productName?: string;
  productCategory?: string;
  selectedDirection?: string;
  generatedAt?: string;
  locale?: Locale;
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

export interface DiagnosisFinding {
  category: string;
  issue: string;
  severity: "critical" | "warning" | "info";
}

export interface DiagnosisFix {
  category: string;
  fix: string;
  priority: "high" | "medium" | "low";
}

export interface DiagnosisReport {
  overallScore: number;
  scores: DiagnosisScores;
  findings: string[];
  fixes: string[];
  refactorPrompts: Record<ToolType, string>;

  // Enhanced fields
  detailedFindings?: DiagnosisFinding[];
  repairStrategy?: {
    layout?: string[];
    color?: string[];
    typography?: string[];
    interaction?: string[];
    conversion?: string[];
  };
  pageType?: string;
  primaryPainPoint?: string;

  // Screenshot analysis
  screenshotAnalyzed?: boolean;
  screenshotName?: string;

  // Before/After
  beforeState?: string;
  afterState?: string;
  beforeAfter?: Array<{
    zoneId?: string;
    before: string;
    after: string;
  }>;
  focusZones?: Array<{
    id: string;
    title: string;
    severity: "low" | "medium" | "high";
    evidence: string;
    bbox?: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  }>;

  // Confidence level
  confidence?: "low" | "medium" | "high";
  locale?: Locale;
}

export interface DiagnosisInput {
  pageType: string;
  pageDescription: string;
  primaryPainPoint: string;
  screenshotAsset?: ScreenshotAsset | null;
  locale?: Locale;
}

// ============================================================
// History
// ============================================================

export type HistoryEventType =
  | "brief_created"
  | "direction_selected"
  | "prompt_copied"
  | "diagnosis_performed"
  | "pack_exported"
  | "project_created"
  | "project_updated";

export interface HistoryItem {
  id: string;
  timestamp: string;
  type: HistoryEventType;
  data: unknown;
}

// ============================================================
// Screenshot Asset
// ============================================================

export interface ScreenshotAsset {
  id: string;
  name: string;
  dataUrl: string;
  size: number;
  type: string;
  createdAt: string;
}

// ============================================================
// Project Workspace
// ============================================================

export interface PromptExport {
  id: string;
  tool: ToolType;
  prompt: string;
  createdAt: string;
}

export interface DesignProject {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  brief?: DesignBrief;
  selectedDirectionId?: string | null;
  executionPack?: DesignExecutionPack;
  diagnosisReports: DiagnosisReport[];
  promptExports: PromptExport[];
  screenshots: ScreenshotAsset[];
}

// ============================================================
// AI Provider Types
// ============================================================

export type AIProviderType = "mock" | "openai" | "claude" | "gemini" | "mimo";

export interface DesignAIProvider {
  type: AIProviderType;
  name: string;
  isEnabled: boolean;
  generateDirections?: (input: DesignBrief) => Promise<DesignDirection[]>;
  generateExecutionPack?: (
    brief: DesignBrief,
    direction: DesignDirection
  ) => Promise<DesignExecutionPack>;
}

export interface VisionDiagnosisProvider {
  type: AIProviderType;
  name: string;
  isEnabled: boolean;
  diagnoseScreenshot?: (input: DiagnosisInput) => Promise<DiagnosisReport>;
}

// ============================================================
// App State
// ============================================================

export interface AppState {
  locale: Locale;
  currentMode: UserMode | null;
  brief: DesignBrief | null;
  selectedDirectionId: string | null;
  selectedTool: ToolType;
  diagnosisReport: DiagnosisReport | null;
  history: HistoryItem[];

  // Project Workspace
  projects: DesignProject[];
  currentProjectId: string | null;
}

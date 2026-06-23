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
  visualReferenceTolerance?: string;
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

export type MaterialSourceKind =
  | "interaction-flow"
  | "product-ui"
  | "website-inspiration"
  | "template"
  | "color-system";

export type MaterialMediaKind =
  | "css-motion"
  | "animated-gif"
  | "video"
  | "static-image"
  | "reference-link";

export type MaterialCategory =
  | "motion"
  | "color"
  | "ui"
  | "layout"
  | "typography";

export interface MaterialSource {
  id: string;
  name: string;
  href: string;
  kind: MaterialSourceKind;
  signal: string;
  note: string;
}

export interface MaterialAsset {
  id: string;
  patternId: string;
  title: string;
  category?: MaterialCategory;
  sourceId: string;
  mediaKind: MaterialMediaKind;
  motionSpec: string;
  useWhen: string[];
  avoidWhen: string[];
  designSignals: string[];
  frontendNotes: string[];
  tags: string[];
  directionFit: string[];
  recommendationAngle?: string;
  qualityScore?: number;
  examples?: string[];
  implementationRules?: string[];
  pitfalls?: string[];
  recommendedFor?: string[];
  previewKind?: "flow" | "phones" | "particles" | "hero" | "portfolio" | "palette";
  iconText?: string;
}

export interface MaterialCategoryPlaybook {
  id: MaterialCategory;
  label: string;
  role: string;
  cases: string[];
  useWhen: string[];
  avoidWhen: string[];
  frontendRules: string[];
  evaluationChecklist: string[];
}

export interface MaterialAgentBlueprintRow {
  rank: string;
  title: string;
  tags: string[];
  reason: string;
  difficulty: number;
  result: string;
  color: "blue" | "green" | "orange";
}

export interface MaterialAgentResult {
  reply: string;
  summaryItems: string[];
  recommendedCardIds: string[];
  blueprintRows: MaterialAgentBlueprintRow[];
  focusTabs: MaterialCategory[];
  provider: string;
  fallback: boolean;
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
  score?: number;
  keySignals?: string[];
  materialPatternIds?: string[];
  materialEvidence?: string[];
  motionDirection?: string[];
  frontendBlueprint?: string[];
  questionsToResolve?: string[];
}

export interface DirectionAgentResult {
  summary: string;
  recommendations: DirectionRecommendation[];
  provider: string;
  fallback: boolean;
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
  id?: string;
  category: string;
  issue?: string;
  description?: string;
  recommendation?: string;
  severity: "critical" | "warning" | "info" | "high" | "medium" | "low";
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

  // Enhanced fields (Phase 2)
  detailedFindings?: DiagnosisFinding[];
  repairStrategy?: {
    layout?: string[];
    color?: string[];
    typography?: string[];
    interaction?: string[];
    conversion?: string[];
  } | Record<string, string>;
  pageType?: string;
  primaryPainPoint?: string;

  // Phase 3 fields
  screenshotAnalyzed?: boolean;
  confidence?: "low" | "medium" | "high";

  // Phase 5: Before/After comparison
  beforeAfter?: Array<{
    before: string;
    after: string;
  }>;
}

export interface DiagnosisInput {
  pageType: string;
  pageDescription: string;
  primaryPainPoint: string;
  screenshotUrl?: string;
}

// ============================================================
// History
// ============================================================

export type HistoryEventType =
  | "brief_created"
  | "direction_selected"
  | "prompt_copied"
  | "diagnosis_performed"
  | "pack_exported";

export interface HistoryItem {
  id: string;
  timestamp: string;
  type: HistoryEventType;
  data: unknown;
}

// ============================================================
// Project Workspace (Phase 3)
// ============================================================

export interface ScreenshotAsset {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface PromptExport {
  id: string;
  tool: ToolType;
  content: string;
  exportedAt: string;
}

export interface DiagnosisReportEnhanced extends DiagnosisReport {
  screenshotAnalyzed: boolean;
  screenshotAssetId?: string;
  detailedFindings: Array<{
    id: string;
    category: string;
    severity: "low" | "medium" | "high";
    description: string;
    recommendation: string;
  }>;
  repairStrategy: Record<string, string>;
  confidence: "low" | "medium" | "high";
}

export interface DesignProject {
  id: string;
  name: string;
  category: string; // "landing" | "product" | "marketing" | "dashboard" | "other"
  brief: DesignBrief | null;
  selectedDirectionId: string | null;
  diagnosisReports: DiagnosisReportEnhanced[];
  promptExports: PromptExport[];
  screenshots: ScreenshotAsset[];
  createdAt: string;
  updatedAt: string;
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

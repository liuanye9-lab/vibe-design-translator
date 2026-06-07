import { AIProviderType, DesignBrief, DesignExecutionPack, DiagnosisReport, Locale, ScreenshotAsset, ToolType } from "@/lib/types";

export type ArtifactType = "diagnosis" | "pack" | "prompt" | "evaluation" | "screenshot";

export interface EvaluationArtifact {
  overallScore: number;
  previousScore?: number;
  delta?: number;
  passed: boolean;
  notes: string[];
}

export interface WorkflowRunArtifact {
  id: string;
  runId: string;
  agentStepId: string;
  type: ArtifactType;
  title: string;
  content?: string;
  url?: string;
  createdAt: string;
  providerUsed?: AIProviderType;
  locale?: Locale;
  evaluation?: EvaluationArtifact;
}

export interface WorkflowRunRecord {
  id: string;
  title: string;
  taskMeta: {
    productName?: string;
    pageType?: string;
    providerUsed: AIProviderType;
    locale: Locale;
    targetTool?: ToolType;
  };
  artifacts: WorkflowRunArtifact[];
  evaluation: EvaluationArtifact;
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosisRunInput {
  report: DiagnosisReport;
  form: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  };
  screenshotAsset?: ScreenshotAsset | null;
  providerUsed: AIProviderType;
  locale: Locale;
  targetTool: ToolType;
}

export interface PackRunInput {
  brief: DesignBrief;
  pack: DesignExecutionPack;
  directionName: string;
  providerUsed: AIProviderType;
  locale: Locale;
  targetTool: ToolType;
}

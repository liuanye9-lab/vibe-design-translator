// ============================================================
// Vibe Design Translator - Vision Diagnosis Provider Interface
// ============================================================

import { DiagnosisInput, DiagnosisReport, AIProviderType } from "@/lib/types";

/**
 * Vision Diagnosis Provider Interface
 * 
 * This defines the contract for all AI providers that can
 * analyze screenshots and generate diagnosis reports.
 */
export interface VisionDiagnosisProviderConfig {
  type: AIProviderType;
  name: string;
  description: string;
  isEnabled: boolean;
  apiKeyConfigured: boolean;
  supportsVision: boolean;
  implementationStatus?: "ready" | "placeholder";
}

/**
 * Vision Diagnosis Provider
 * Analyzes screenshots and generates diagnosis reports
 */
export interface VisionDiagnosisProvider {
  config: VisionDiagnosisProviderConfig;
  
  /**
   * Diagnose a page based on screenshot and description
   */
  diagnose(input: DiagnosisInput): Promise<DiagnosisReport>;
  
  /**
   * Check if the provider is ready to diagnose
   */
  isReady(): boolean;
}

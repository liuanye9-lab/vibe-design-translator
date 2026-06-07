import { DesignBrief, DesignDirection, DiagnosisInput, Locale, ToolType } from "@/lib/types";

export function executionPackPrompt(brief: DesignBrief, direction: DesignDirection, locale: Locale): string {
  return `Return ONLY valid JSON for a design execution pack. Locale: ${locale}.

Required JSON keys:
strategy, pageStructure, visualSystem, interactionSystem, acceptanceCriteria, antiAILookChecklist, prompts, contentTone, componentRules, responsiveRules, productName, productCategory, selectedDirection.

prompts must include keys: codex, claude-code, gemini, workbuddy.

Brief:
${JSON.stringify(brief, null, 2)}

Direction:
${JSON.stringify(direction, null, 2)}`;
}

export function refactorPromptPrompt(
  report: { overallScore: number; scores: Record<string, number>; findings: string[]; fixes: string[] },
  tool: ToolType,
  locale: Locale
): string {
  return `Write one executable refactor prompt for ${tool}. Locale: ${locale}.
Return plain text only, not JSON.

Diagnosis:
${JSON.stringify(report, null, 2)}`;
}

export function diagnosisPrompt(input: DiagnosisInput, locale: Locale): string {
  return `Return ONLY valid JSON for a design diagnosis report. Locale: ${locale}.

Required JSON keys:
overallScore, scores, findings, fixes, beforeAfter, focusZones, confidence, screenshotAnalyzed, refactorPrompts.

scores keys:
aiTemplateFeeling, visualHierarchy, colorControl, typographySystem, spacingSystem, interactionRestraint, conversionClarity.

refactorPrompts keys:
codex, claude-code, gemini, workbuddy.

Input:
${JSON.stringify(
  {
    pageType: input.pageType,
    pageDescription: input.pageDescription,
    primaryPainPoint: input.primaryPainPoint,
    hasScreenshot: Boolean(input.screenshotAsset),
  },
  null,
  2
)}`;
}

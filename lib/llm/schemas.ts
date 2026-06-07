import { DesignExecutionPack, DiagnosisReport, Locale, ToolType } from "@/lib/types";

const tools: ToolType[] = ["codex", "claude-code", "gemini", "workbuddy"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function extractJsonObject(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found in provider response");
    return JSON.parse(match[0]);
  }
}

export function validateExecutionPack(value: unknown, locale: Locale): DesignExecutionPack {
  if (!isRecord(value)) {
    throw new Error("Execution pack must be an object");
  }

  const promptsValue = isRecord(value.prompts) ? value.prompts : {};
  const prompts = tools.reduce((acc, tool) => {
    acc[tool] = typeof promptsValue[tool] === "string" ? promptsValue[tool] : "";
    return acc;
  }, {} as Record<ToolType, string>);

  return {
    strategy: stringArray(value.strategy),
    pageStructure: stringArray(value.pageStructure),
    visualSystem: stringArray(value.visualSystem),
    interactionSystem: stringArray(value.interactionSystem),
    acceptanceCriteria: stringArray(value.acceptanceCriteria),
    antiAILookChecklist: stringArray(value.antiAILookChecklist),
    prompts,
    contentTone: stringArray(value.contentTone),
    componentRules: stringArray(value.componentRules),
    responsiveRules: stringArray(value.responsiveRules),
    productName: typeof value.productName === "string" ? value.productName : undefined,
    productCategory: typeof value.productCategory === "string" ? value.productCategory : undefined,
    selectedDirection: typeof value.selectedDirection === "string" ? value.selectedDirection : undefined,
    generatedAt: typeof value.generatedAt === "string" ? value.generatedAt : new Date().toISOString(),
    locale,
  };
}

export function validateDiagnosisReport(value: unknown, locale: Locale): DiagnosisReport {
  if (!isRecord(value)) {
    throw new Error("Diagnosis report must be an object");
  }

  const scores = isRecord(value.scores) ? value.scores : {};
  const normalizedScores = {
    aiTemplateFeeling: Number(scores.aiTemplateFeeling ?? 50),
    visualHierarchy: Number(scores.visualHierarchy ?? 50),
    colorControl: Number(scores.colorControl ?? 50),
    typographySystem: Number(scores.typographySystem ?? 50),
    spacingSystem: Number(scores.spacingSystem ?? 50),
    interactionRestraint: Number(scores.interactionRestraint ?? 50),
    conversionClarity: Number(scores.conversionClarity ?? 50),
  };

  return {
    overallScore: Number(value.overallScore ?? 50),
    scores: normalizedScores,
    findings: stringArray(value.findings),
    fixes: stringArray(value.fixes),
    refactorPrompts: isRecord(value.refactorPrompts)
      ? tools.reduce((acc, tool) => {
          acc[tool] = typeof value.refactorPrompts === "object" && value.refactorPrompts && typeof (value.refactorPrompts as Record<string, unknown>)[tool] === "string"
            ? (value.refactorPrompts as Record<ToolType, string>)[tool]
            : "";
          return acc;
        }, {} as Record<ToolType, string>)
      : { codex: "", "claude-code": "", gemini: "", workbuddy: "" },
    beforeAfter: Array.isArray(value.beforeAfter)
      ? value.beforeAfter.filter(isRecord).map((item) => ({
          zoneId: typeof item.zoneId === "string" ? item.zoneId : undefined,
          before: typeof item.before === "string" ? item.before : "",
          after: typeof item.after === "string" ? item.after : "",
        }))
      : [],
    focusZones: Array.isArray(value.focusZones)
      ? value.focusZones.filter(isRecord).map((item, index) => ({
          id: typeof item.id === "string" ? item.id : `zone-${index + 1}`,
          title: typeof item.title === "string" ? item.title : `Zone ${index + 1}`,
          severity: item.severity === "high" || item.severity === "medium" || item.severity === "low" ? item.severity : "medium",
          evidence: typeof item.evidence === "string" ? item.evidence : "",
          bbox: isRecord(item.bbox)
            ? {
                x: Number(item.bbox.x ?? 0),
                y: Number(item.bbox.y ?? 0),
                w: Number(item.bbox.w ?? 0.2),
                h: Number(item.bbox.h ?? 0.2),
              }
            : undefined,
        }))
      : [],
    confidence: value.confidence === "high" || value.confidence === "medium" || value.confidence === "low" ? value.confidence : "medium",
    screenshotAnalyzed: Boolean(value.screenshotAnalyzed),
    locale,
  };
}

// ============================================================
// Skill: Vision Diagnosis
// ============================================================
// Input:  DiagnosisInput
// Output: DiagnosisReport
//
// Calls /api/ai/diagnose-screenshot first, falls back to mock.
// ============================================================

import { AgentSkill, AgentContext } from "../types";
import { DiagnosisInput, DiagnosisReport } from "@/lib/types";
import { generateMockDiagnosisReport } from "@/lib/diagnosis";

export const visionDiagnosisSkill: AgentSkill<DiagnosisInput, DiagnosisReport> = {
  id: "vision-diagnosis",
  name: "视觉诊断",
  description: "分析页面截图或描述，生成 AI 味诊断报告",

  async run(input: DiagnosisInput, context: AgentContext): Promise<DiagnosisReport> {
    // Try real AI first if enabled
    if (context.isRealAIEnabled && context.provider !== "mock") {
      try {
        const response = await fetch("/api/ai/diagnose-screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            return data.data as DiagnosisReport;
          }
        }
      } catch {
        // Fall through to mock
      }
    }

    // Fallback to mock diagnosis
    return generateMockDiagnosisReport(input.pageType, input.primaryPainPoint);
  },
};

// ============================================================
// Vibe Design Translator - Diagnosis Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { DiagnosisForm } from "@/components/product/diagnosis-form";
import { DiagnosisReportView } from "@/components/product/diagnosis-report";
import ScreenshotUploader from "@/components/product/screenshot-uploader";
import { useDesignStore } from "@/store/use-design-store";
import { DiagnosisReport, ScreenshotAsset } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";
import { GlassCard } from "@/components/ui/glass-card";
import { Image as ImageIcon, AlertTriangle, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentRunPanel, EvaluationResultCard } from "@/components/agent";
import { runDiagnosisWorkflow } from "@/lib/agent/orchestrator";
import type { AgentRun } from "@/lib/agent/types";
import type { EvaluationResult } from "@/lib/evaluators/types";

// API response types
interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: {
    provider: string;
    fallback: boolean;
    tokensUsed?: number;
    estimatedCost?: string;
  };
}

interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

export default function DiagnosisPage() {
  const router = useRouter();
  const { t } = useI18n();
  const {
    diagnosisReport,
    setDiagnosisReport,
    selectedTool,
    setSelectedTool,
    addHistory,
    isHydrated,
    hydrateFromStorage,
    currentProjectId,
    saveCurrentBriefToProject,
    addDiagnosisToProject,
    createAgentRun,
    updateAgentRun,
    addAgentEvent,
    updateAgentStep,
  } = useDesignStore();

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DiagnosisReport | null>(diagnosisReport);
  const [screenshot, setScreenshot] = useState<ScreenshotAsset | null>(null);
  const [formData, setFormData] = useState<{
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiMeta, setApiMeta] = useState<{
    provider: string;
    fallback: boolean;
    tokensUsed?: number;
    estimatedCost?: string;
  } | null>(null);

  // Agent workflow state
  const [useAgentMode, setUseAgentMode] = useState(false);
  const [agentRun, setAgentRun] = useState<AgentRun | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  // Agent workflow submit handler
  const handleAgentSubmit = async (data: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  }) => {
    setIsLoading(true);
    setFormData(data);
    setError(null);
    setAgentRun(null);

    try {
      const context = {
        projectId: currentProjectId,
        provider: "mock" as const,
        isRealAIEnabled: false,
      };

      const callbacks = {
        onRunUpdate: (run: AgentRun) => {
          setAgentRun({ ...run });
          updateAgentRun(run.id, run);
        },
        onEvent: (runId: string, event: import("@/lib/agent/types").AgentEvent) => {
          addAgentEvent(runId, event);
        },
        onStepUpdate: (runId: string, step: import("@/lib/agent/types").AgentStep) => {
          updateAgentStep(runId, step.id, step);
        },
      };

      const input = {
        pageType: data.pageType,
        pageDescription: data.pageDescription,
        primaryPainPoint: data.primaryPainPoint,
      };

      const run = await runDiagnosisWorkflow(input, selectedTool, context, callbacks);
      setAgentRun(run);
      createAgentRun(run);

      // Extract report from run result
      if (run.result && typeof run.result === "object" && "report" in run.result) {
        const resultObj = run.result as { report: DiagnosisReport; evaluation?: { diagnosis?: EvaluationResult } };
        const diagReport = resultObj.report;
        setReport(diagReport);
        setDiagnosisReport(diagReport);
        addHistory({ type: "diagnosis_performed", data });
        if (currentProjectId) {
          addDiagnosisToProject(diagReport as Parameters<typeof addDiagnosisToProject>[0]);
        }
        // Extract evaluation result
        if (resultObj.evaluation?.diagnosis) {
          setEvaluationResult(resultObj.evaluation.diagnosis);
        }
      }
    } catch (err) {
      console.error("Agent diagnosis error:", err);
      setError(err instanceof Error ? err.message : "Agent 工作流执行失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  }) => {
    // Route to agent mode if enabled
    if (useAgentMode) {
      return handleAgentSubmit(data);
    }

    setIsLoading(true);
    setFormData(data);
    setError(null);
    setApiMeta(null);

    try {
      // Call server-side API route
      const response = await fetch("/api/ai/diagnose-screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenshot: screenshot || undefined,
          pageType: data.pageType,
          painPoints: data.primaryPainPoint,
        }),
      });

      const result: ApiSuccess<DiagnosisReport> | ApiError = await response.json();

      if (!response.ok || !result.success) {
        const errorResult = result as ApiError;
        throw new Error(errorResult.error?.message || t("diagnosis_error_fail"));
      }

      const apiResult = result as ApiSuccess<DiagnosisReport>;
      const apiReport = apiResult.data;

      // Store API metadata for display
      if (apiResult.meta) {
        setApiMeta(apiResult.meta);
      }

      setReport(apiReport);
      setDiagnosisReport(apiReport);

      addHistory({ type: "diagnosis_performed", data });

      // Save to project if current project exists
      if (currentProjectId) {
        addDiagnosisToProject(apiReport as any);
      }
    } catch (err) {
      console.error("Diagnosis error:", err);
      setError(err instanceof Error ? err.message : t("diagnosis_error_unknown"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    setReport(null);
    setDiagnosisReport(null);
    setScreenshot(null);
    setFormData(null);
    setEvaluationResult(null);
    setAgentRun(null);
  };

  return (
    <AppShell showBackButton={!report} backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              {t("diagnosis_tag")}
            </SectionLabel>

            <SectionHeading subtitle={t("diagnosis_subtitle")}>
              {t("diagnosis_title")}
            </SectionHeading>
          </div>

          {!report ? (
            <div className="space-y-6">
              {/* Agent Mode Toggle */}
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-ios-blue)]/10 flex items-center justify-center">
                      <Workflow className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
                        Agent 工作流模式
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        使用 Agent 自动拆解诊断步骤，可视化执行过程
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUseAgentMode(!useAgentMode)}
                    className={cn(
                      "relative w-11 h-6 rounded-full transition-colors duration-200",
                      useAgentMode
                        ? "bg-[var(--color-accent-ios-blue)]"
                        : "bg-[var(--color-border)]"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                        useAgentMode ? "translate-x-5.5 left-0.5" : "left-0.5"
                      )}
                    />
                  </button>
                </div>
              </GlassCard>

              {/* Agent Run Panel */}
              {agentRun && useAgentMode && (
                <AgentRunPanel
                  run={agentRun}
                  onClose={() => setAgentRun(null)}
                />
              )}

              {/* Error State */}
              {error && (
                <GlassCard className="p-5 border-[var(--color-status-error)] border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-status-error)] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-status-error)] mb-1">
                        {t("diagnosis_fail_title")}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                        {error}
                      </p>
                      <button
                        onClick={() => setError(null)}
                        className="text-xs text-[var(--color-accent-ios-blue)] hover:underline"
                      >
                        {t("diagnosis_retry")}
                      </button>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Screenshot Upload Section */}
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                  {t("diagnosis_upload_title")}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                  {t("diagnosis_upload_desc")}
                </p>
                <div className="flex items-start gap-3">
                  <ImageIcon className="w-4 h-4 text-[var(--color-text-muted)] mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <ScreenshotUploader
                      value={screenshot}
                      onChange={setScreenshot}
                    />
                  </div>
                </div>
              </GlassCard>

              <DiagnosisForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />

              {!currentProjectId && (
                <div className="text-center text-xs text-[var(--color-text-muted)]">
                  {t("diagnosis_tip")}
                  <button
                    onClick={() => router.push("/workspace")}
                    className="ml-1 text-[var(--color-accent-ios-blue)] hover:underline"
                  >
                    {t("diagnosis_go_workspace")}
                  </button>
                  {t("diagnosis_tip_suffix")}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Evaluation Result (from Agent workflow) */}
              {evaluationResult && (
                <div className="mb-6">
                  <EvaluationResultCard evaluation={evaluationResult} />
                </div>
              )}

              <DiagnosisReportView
                report={report}
                selectedTool={selectedTool}
                onToolChange={setSelectedTool}
                onStartNew={handleStartNew}
                apiMeta={apiMeta}
              />
            </>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
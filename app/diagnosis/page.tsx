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
import { GlassCard } from "@/components/ui/glass-card";
import { Image as ImageIcon, AlertTriangle } from "lucide-react";

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

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  const handleSubmit = async (data: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  }) => {
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
        throw new Error(errorResult.error?.message || "Diagnosis request failed");
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
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    setReport(null);
    setDiagnosisReport(null);
    setScreenshot(null);
    setFormData(null);
  };

  return (
    <AppShell showBackButton={!report} backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              Diagnosis Tool
            </SectionLabel>

            <SectionHeading subtitle="Identify issues with your current page and get actionable refactor prompts.">
              Design Diagnosis
            </SectionHeading>
          </div>

          {!report ? (
            <div className="space-y-6">
              {/* Error State */}
              {error && (
                <GlassCard className="p-5 border-[var(--color-status-error)] border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-status-error)] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-status-error)] mb-1">
                        诊断失败
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                        {error}
                      </p>
                      <button
                        onClick={() => setError(null)}
                        className="text-xs text-[var(--color-accent-ios-blue)] hover:underline"
                      >
                        返回重试
                      </button>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Screenshot Upload Section */}
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                  上传截图（可选）
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mb-4">
                  上传你的页面截图，帮助诊断系统更好地分析问题（当前为本地预览，未上传到云端）
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
                  提示：此诊断结果不会自动保存。
                  <button
                    onClick={() => router.push("/workspace")}
                    className="ml-1 text-[var(--color-accent-ios-blue)] hover:underline"
                  >
                    前往工作台创建项目
                  </button>
                  ，以便保存诊断记录。
                </div>
              )}
            </div>
          ) : (
            <DiagnosisReportView
              report={report}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
              onStartNew={handleStartNew}
              apiMeta={apiMeta}
            />
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

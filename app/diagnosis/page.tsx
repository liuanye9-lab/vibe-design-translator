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
import { ScreenshotUploader } from "@/components/product/screenshot-uploader";
import { useDesignStore } from "@/store/use-design-store";
import { generateMockDiagnosisReport } from "@/lib/diagnosis";
import { DiagnosisReport, ScreenshotAsset } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { Image as ImageIcon } from "lucide-react";

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

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    // Generate diagnosis with page type and pain point context
    const mockReport = generateMockDiagnosisReport(data.pageType, data.primaryPainPoint);

    // Enhance with screenshot analysis metadata if screenshot was uploaded
    const enhancedReport: DiagnosisReport = {
      ...mockReport,
      screenshotAnalyzed: !!screenshot,
      confidence: screenshot ? "medium" : (mockReport.confidence as "low" | "medium" | "high" | undefined) ?? "low",
    };

    setReport(enhancedReport);
    setDiagnosisReport(enhancedReport);

    addHistory({ type: "diagnosis_performed", data });

    // Save to project if current project exists
    if (currentProjectId) {
      addDiagnosisToProject(enhancedReport as any);
    }

    setIsLoading(false);
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
            />
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

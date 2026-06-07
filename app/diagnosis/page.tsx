// ============================================================
// Vibe Design Translator - Diagnosis Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Camera } from "lucide-react";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { DiagnosisForm } from "@/components/product/diagnosis-form";
import { DiagnosisReportView } from "@/components/product/diagnosis-report";
import { ScreenshotUploader } from "@/components/product/screenshot-uploader";
import { useDesignStore } from "@/store/use-design-store";
import { useI18n } from "@/lib/i18n/use-i18n";
import { AIProviderType, DiagnosisReport, ScreenshotAsset } from "@/lib/types";
import { artifactStorage } from "@/lib/artifacts/storage";
import { cn } from "@/lib/utils";

export default function DiagnosisPage() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const {
    diagnosisReport,
    setDiagnosisReport,
    selectedTool,
    setSelectedTool,
    addHistory,
    isHydrated,
    hydrateFromStorage,
    currentProjectId,
    addDiagnosisToProject,
  } = useDesignStore();

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DiagnosisReport | null>(diagnosisReport);
  const [screenshotAsset, setScreenshotAsset] = useState<ScreenshotAsset | null>(null);

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

    try {
      const response = await fetch("/api/ai/diagnose-screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageType: data.pageType,
          pageDescription: data.pageDescription,
          primaryPainPoint: data.primaryPainPoint,
          screenshotAsset,
          locale,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error?.message || "Diagnosis failed");
      }

      const mockReport = payload.data as DiagnosisReport;
      const providerUsed = (payload.meta?.providerUsed || "mock") as AIProviderType;
      const run = artifactStorage.createRunFromDiagnosis({
        report: mockReport,
        form: data,
        screenshotAsset,
        providerUsed,
        locale,
        targetTool: selectedTool,
      });
      artifactStorage.saveRun(run);

      setReport(mockReport);
      setDiagnosisReport(mockReport);
      addHistory({ type: "diagnosis_performed", data: { ...data, hasScreenshot: !!screenshotAsset, runId: run.id } });

      // Save to project if one is open
      if (currentProjectId) {
        addDiagnosisToProject(mockReport);
      }
    } catch (error) {
      console.error("Diagnosis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    setReport(null);
    setScreenshotAsset(null);
    setDiagnosisReport(null);
  };

  return (
    <AppShell showBackButton={!report} backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              {t("diagnosis.kicker")}
            </SectionLabel>

            <SectionHeading subtitle={t("diagnosis.subtitle")}>
              {t("diagnosis.title")}
            </SectionHeading>
          </div>

          {!report ? (
            <div className="space-y-8">
              {/* Screenshot Upload Section */}
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center shadow-sm">
                    <Camera className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{t("diagnosis.screenshot.title")}</h3>
                    <p className="text-xs text-gray-500">{t("diagnosis.screenshot.desc")}</p>
                  </div>
                </div>

                <ScreenshotUploader
                  value={screenshotAsset}
                  onChange={setScreenshotAsset}
                  disabled={isLoading}
                />

                {/* Mock notice */}
                <div className={cn(
                  "mt-4 px-4 py-3 rounded-xl border transition-all duration-300",
                  "bg-amber-50/50 border-amber-200/50"
                )}>
                  <p className="text-xs text-amber-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {t("diagnosis.mockNotice")}
                    </span>
                  </p>
                </div>
              </GlassCard>

              {/* Diagnosis Form */}
              <DiagnosisForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <DiagnosisReportView
              report={report}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
              onStartNew={handleStartNew}
              screenshotAsset={screenshotAsset}
            />
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

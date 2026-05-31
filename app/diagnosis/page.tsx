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
import { useDesignStore } from "@/store/use-design-store";
import { generateMockDiagnosisReport } from "@/lib/diagnosis";
import { DiagnosisReport } from "@/lib/types";

export default function DiagnosisPage() {
  const router = useRouter();
  const { diagnosisReport, setDiagnosisReport, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DiagnosisReport | null>(diagnosisReport);

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

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

    const mockReport = generateMockDiagnosisReport();
    setReport(mockReport);
    setDiagnosisReport(mockReport);
    addHistory({ type: "diagnosis_performed", data });
    setIsLoading(false);
  };

  const handleStartNew = () => {
    setReport(null);
    setDiagnosisReport(null);
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
            <DiagnosisForm onSubmit={handleSubmit} isLoading={isLoading} />
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
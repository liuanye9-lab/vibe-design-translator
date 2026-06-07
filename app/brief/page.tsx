// ============================================================
// Vibe Design Translator - Brief Page
// ============================================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Folder } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { BriefForm } from "@/components/product/brief-form";
import { useDesignStore } from "@/store/use-design-store";
import { useI18n } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";

export default function BriefPage() {
  const router = useRouter();
  const { t } = useI18n();
  const {
    currentMode,
    isHydrated,
    hydrateFromStorage,
    currentProjectId,
    projects,
  } = useDesignStore();

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  // If no mode selected, redirect to home
  useEffect(() => {
    if (isHydrated && !currentMode) {
      router.push("/");
    }
  }, [isHydrated, currentMode, router]);

  if (!isHydrated || !currentMode) {
    return (
      <AppShell>
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              {t("common.loading")}
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const currentProject = projects.find((p) => p.id === currentProjectId);

  return (
    <AppShell showBackButton backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("brief.page.back")}</span>
            </Link>

            <SectionLabel>
              {t("brief.page.step")}
            </SectionLabel>

            <SectionHeading subtitle={currentMode === "no-idea" ? t("brief.page.subtitle.noIdea") : t("brief.page.subtitle.hasIdea")}>
              {currentMode === "no-idea" ? t("brief.page.title.noIdea") : t("brief.page.title.hasIdea")}
            </SectionHeading>
          </div>

          {/* Project indicator */}
          {currentProject && (
            <div className={cn(
              "mb-6 px-4 py-3 rounded-xl",
              "bg-blue-50/50 border border-blue-100/50",
              "flex items-center gap-3"
            )}>
              <Folder className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-blue-600 font-medium">{t("brief.page.project")}</p>
                <p className="text-sm text-gray-700">{currentProject.name}</p>
              </div>
              <Link
                href="/workspace"
                className="ml-auto text-xs text-blue-600 hover:text-blue-700 underline"
              >
                {t("brief.page.changeProject")}
              </Link>
            </div>
          )}

          <BriefForm mode={currentMode} />
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

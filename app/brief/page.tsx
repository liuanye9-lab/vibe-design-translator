// ============================================================
// Vibe Design Translator - Brief Page
// ============================================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { BriefForm } from "@/components/product/brief-form";
import { useDesignStore } from "@/store/use-design-store";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function BriefPage() {
  const router = useRouter();
  const { currentMode, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t } = useI18n();

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
              {t("brief_loading")}
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

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
              <span>{t("brief_back")}</span>
            </Link>

            <SectionLabel>
              {t("brief_step_label")}
            </SectionLabel>

            <SectionHeading subtitle={t("brief_subtitle")}>
              {t("brief_title")}
            </SectionHeading>
          </div>

          <BriefForm mode={currentMode === "diagnose" ? "has-idea" : currentMode} />
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
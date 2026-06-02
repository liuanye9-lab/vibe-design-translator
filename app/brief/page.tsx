// ============================================================
// Vibe Design Translator - Brief Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { BriefForm } from "@/components/product/brief-form";
import { GlassCard } from "@/components/ui/glass-card";
import { useDesignStore } from "@/store/use-design-store";
import { ArrowLeft, Workflow } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";

export default function BriefPage() {
  const router = useRouter();
  const { currentMode, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t } = useI18n();
  const [useAgentMode, setUseAgentMode] = useState(false);

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

          {/* Agent Mode Toggle */}
          <GlassCard className="p-4 mb-6">
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
                    提交后自动启动设计翻译工作流，可视化每一步执行
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

          <BriefForm
            mode={currentMode === "diagnose" ? "has-idea" : currentMode}
            useAgentMode={useAgentMode}
          />
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
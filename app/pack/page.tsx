// ============================================================
// Vibe Design Translator - Pack Page (Execution Pack Preview)
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { ExecutionPackSection } from "@/components/product/execution-pack-section";
import { PromptOutput } from "@/components/product/prompt-output";
import { LiquidButton } from "@/components/ui/liquid-button";
import { useDesignStore } from "@/store/use-design-store";
import { generateExecutionPack } from "@/lib/prompt-templates";
import { getDirectionById } from "@/lib/design-directions";
import { localizeDirection } from "@/lib/design-direction-i18n";
import { DesignExecutionPack } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function PackPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t, locale } = useI18n();
  const [pack, setPack] = useState<DesignExecutionPack | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    hydrateFromStorage();
    setIsLoaded(true);
  }, [hydrateFromStorage]);

  // Generate pack when data is available
  useEffect(() => {
    if (isHydrated && isLoaded && brief && selectedDirectionId) {
      const direction = getDirectionById(selectedDirectionId);
      if (direction) {
        const executionPack = generateExecutionPack(brief, direction);
        setPack(executionPack);
      }
    }
  }, [isHydrated, isLoaded, brief, selectedDirectionId]);

  // If no brief or direction, redirect
  useEffect(() => {
    if (isHydrated && isLoaded && (!brief || !selectedDirectionId)) {
      router.push("/brief");
    }
  }, [isHydrated, isLoaded, brief, selectedDirectionId, router]);

  if (!isLoaded || !isHydrated || !brief || !selectedDirectionId || !pack) {
    return (
      <AppShell showBackButton backHref="/directions">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              {t("pack_loading")}
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const direction = getDirectionById(selectedDirectionId)!;
  const displayDirection = localizeDirection(direction, locale);

  const handleCopied = () => {
    addHistory({ type: "prompt_copied", data: { tool: selectedTool } });
  };

  return (
    <AppShell showBackButton backHref="/directions" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <Link
              href="/directions"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("nav_back")}</span>
            </Link>

            <SectionLabel>
              {t("pack_step_label")}
            </SectionLabel>

            <SectionHeading subtitle={t("pack_subtitle")}>
              {t("pack_title")}
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief.productName}</span>
              {" — "}
              <span className="text-[var(--color-accent-ios-blue)]">{displayDirection.name}</span>
              {" "}{t("pack_direction_suffix")}
            </p>
          </div>

          {/* Execution pack sections */}
          <ExecutionPackSection pack={pack} className="mb-12" />

          {/* Prompt output */}
          <PromptOutput
            prompts={pack.prompts}
            currentTool={selectedTool}
            onToolChange={setSelectedTool}
            onCopied={handleCopied}
            className="mb-12"
          />

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <LiquidButton
              variant="secondary"
              onClick={() => router.push("/compiler")}
            >
              {t("pack_view_all_prompts")}
            </LiquidButton>
            <LiquidButton onClick={() => router.push("/")}>
              {t("pack_start_new")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

// ============================================================
// Vibe Design Translator - Compiler Page (Multi-tool Prompt View)
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { PromptOutput } from "@/components/product/prompt-output";
import { useDesignStore } from "@/store/use-design-store";
import { generateExecutionPack } from "@/lib/prompt-templates";
import { getDirectionById } from "@/lib/design-directions";
import { localizeDirection } from "@/lib/design-direction-i18n";
import { DesignExecutionPack } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function CompilerPage() {
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
    if (isHydrated && brief && selectedDirectionId) {
      const direction = getDirectionById(selectedDirectionId);
      if (direction) {
        const executionPack = generateExecutionPack(brief, direction);
        setPack(executionPack);
      }
    }
  }, [isHydrated, brief, selectedDirectionId]);

  // If no pack data, show message
  if (!isLoaded || !isHydrated || !pack) {
    return (
      <AppShell showBackButton backHref="/">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-[var(--color-text-secondary)] mb-4">
                {t("compiler_no_brief")}
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-[var(--color-accent-ios-blue)] text-white rounded-xl"
              >
                {t("compiler_go_home")}
              </button>
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const direction = getDirectionById(selectedDirectionId!)!;
  const displayDirection = localizeDirection(direction, locale);

  const handleCopied = () => {
    addHistory({ type: "prompt_copied", data: { tool: selectedTool } });
  };

  return (
    <AppShell showBackButton backHref="/pack" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              {t("compiler_step_label")}
            </SectionLabel>

            <SectionHeading subtitle={t("compiler_subtitle").replace("{product}", brief?.productName ?? "").replace("{direction}", displayDirection.name)}>
              {t("compiler_title")}
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief?.productName}</span>
              {" — "}
              <span className="text-[var(--color-accent-ios-blue)]">{displayDirection.name}</span>
              {" "}{t("pack_direction_suffix")}
            </p>
          </div>

          {/* Prompt output */}
          <PromptOutput
            prompts={pack.prompts}
            currentTool={selectedTool}
            onToolChange={setSelectedTool}
            onCopied={handleCopied}
          />
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

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
import { generateExecutionPack as generateLocalExecutionPack } from "@/lib/prompt-templates";
import { getDirectionById } from "@/lib/design-directions";
import { localizeDirection } from "@/lib/design-direction-i18n";
import { DesignExecutionPack } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function CompilerPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t, locale } = useI18n();
  const [pack, setPack] = useState<DesignExecutionPack | null>(null);
  const [packSource, setPackSource] = useState<"api" | "local" | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    hydrateFromStorage();
    setIsLoaded(true);
  }, [hydrateFromStorage]);

  // Generate pack when data is available
  useEffect(() => {
    let cancelled = false;

    if (isHydrated && brief && selectedDirectionId) {
      const direction = getDirectionById(selectedDirectionId);
      if (direction) {
        setPack(null);
        setPackSource(null);
        fetch("/api/ai/generate-execution-pack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brief, directionId: selectedDirectionId }),
        })
          .then(async (response) => {
            const json = await response.json();
            if (!response.ok || !json.success) {
              throw new Error(json.error?.message || "Failed to generate execution pack");
            }
            return {
              pack: json.data as DesignExecutionPack,
              source: json.meta?.fallback ? "local" as const : "api" as const,
            };
          })
          .then(({ pack: executionPack, source }) => {
            if (cancelled) return;
            setPack(executionPack);
            setPackSource(source);
          })
          .catch((error) => {
            console.error("Execution pack API failed, using local fallback:", error);
            if (cancelled) return;
            setPack(generateLocalExecutionPack(brief, direction));
            setPackSource("local");
          });
      }
    }

    return () => {
      cancelled = true;
    };
  }, [isHydrated, brief, selectedDirectionId]);

  if (!isLoaded || !isHydrated || (brief && selectedDirectionId && !pack)) {
    return (
      <AppShell showBackButton backHref="/pack">
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

  if (!brief || !selectedDirectionId || !pack) {
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
              {packSource && (
                <span className="ml-2 rounded-md bg-white/70 px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
                  {packSource === "api" ? "API" : locale === "zh" ? "本地兜底" : "Local fallback"}
                </span>
              )}
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

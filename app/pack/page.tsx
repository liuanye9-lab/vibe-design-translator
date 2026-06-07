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
import { useI18n } from "@/lib/i18n/use-i18n";
import { getDirectionById } from "@/lib/design-directions";
import { AIProviderType, DesignExecutionPack } from "@/lib/types";
import { artifactStorage } from "@/lib/artifacts/storage";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Languages, Server } from "lucide-react";
import Link from "next/link";

export default function PackPage() {
  const router = useRouter();
  const { t, locale } = useI18n();
  const { brief, selectedDirectionId, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const [pack, setPack] = useState<DesignExecutionPack | null>(null);
  const [providerUsed, setProviderUsed] = useState<AIProviderType>("mock");
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
    setIsLoaded(true);
  }, [isHydrated, hydrateFromStorage]);

  // Generate pack when data is available
  useEffect(() => {
    if (isHydrated && isLoaded && brief && selectedDirectionId) {
      const direction = getDirectionById(selectedDirectionId);
      if (direction) {
        let isCancelled = false;

        const generatePack = async () => {
          setGenerationError(null);
          try {
            const response = await fetch("/api/ai/generate-execution-pack", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ brief, directionId: selectedDirectionId, locale }),
            });
            const payload = await response.json();
            if (!response.ok) {
              throw new Error(payload?.error?.message || "Failed to generate execution pack");
            }
            if (isCancelled) return;

            const executionPack = payload.data as DesignExecutionPack;
            const usedProvider = (payload.meta?.providerUsed || "mock") as AIProviderType;
            setPack(executionPack);
            setProviderUsed(usedProvider);

            const run = artifactStorage.createRunFromPack({
              brief,
              pack: executionPack,
              directionName: direction.name,
              providerUsed: usedProvider,
              locale,
              targetTool: selectedTool,
            });
            artifactStorage.saveRun(run);
            addHistory({ type: "pack_exported", data: { runId: run.id, providerUsed: usedProvider } });
          } catch (error) {
            if (!isCancelled) {
              setGenerationError(error instanceof Error ? error.message : "Failed to generate execution pack");
            }
          }
        };

        generatePack();

        return () => {
          isCancelled = true;
        };
      }
    }
  }, [isHydrated, isLoaded, brief, selectedDirectionId, locale, selectedTool, addHistory]);

  // If no brief or direction, redirect
  useEffect(() => {
    if (isHydrated && isLoaded && (!brief || !selectedDirectionId)) {
      router.push("/brief");
    }
  }, [isHydrated, isLoaded, brief, selectedDirectionId, router]);

  if (!isHydrated || !brief || !selectedDirectionId || !pack) {
    return (
      <AppShell showBackButton backHref="/directions">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              {generationError || t("pack.loading")}
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const direction = getDirectionById(selectedDirectionId)!;
  const evaluationScore = pack.acceptanceCriteria.length >= 5 ? 82 : 68;
  const summaryCards = [
    {
      icon: FileText,
      label: "Execution Pack",
      value: `${pack.acceptanceCriteria.length} criteria`,
    },
    {
      icon: Server,
      label: "Provider",
      value: providerUsed,
    },
    {
      icon: Languages,
      label: "Locale",
      value: pack.locale || locale,
    },
    {
      icon: CheckCircle2,
      label: "Evaluation",
      value: `${evaluationScore}/100`,
    },
  ];

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
              <span>{t("pack.back")}</span>
            </Link>

            <SectionLabel>
              {t("pack.step")}
            </SectionLabel>

            <SectionHeading subtitle={t("pack.subtitle")}>
              {t("pack.title")}
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief.productName}</span>
              {" — "}
              <span className="text-[var(--color-accent-ios-blue)]">{direction.name}</span>
              {` ${t("pack.directionSuffix")}`}
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-4"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface)]">
                    <Icon className="h-4 w-4 text-[var(--color-accent-ios-blue)]" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {card.value}
                  </p>
                </div>
              );
            })}
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
              {t("pack.viewAll")}
            </LiquidButton>
            <LiquidButton onClick={() => router.push("/")}>
              {t("pack.startNew")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

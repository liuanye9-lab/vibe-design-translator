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
import { DesignExecutionPack } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PackPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const [pack, setPack] = useState<DesignExecutionPack | null>(null);
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

  if (!isHydrated || !brief || !selectedDirectionId || !pack) {
    return (
      <AppShell showBackButton backHref="/directions">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              Generating your execution pack...
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const direction = getDirectionById(selectedDirectionId)!;

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
              <span>Back to directions</span>
            </Link>

            <SectionLabel>
              Step 3 of 3
            </SectionLabel>

            <SectionHeading subtitle="Review your execution pack and copy the prompt for your preferred tool.">
              Your Design Execution Pack
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief.productName}</span>
              {" — "}
              <span className="text-[var(--color-accent-ios-blue)]">{direction.name}</span>
              {" direction"}
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
              View All Prompts
            </LiquidButton>
            <LiquidButton onClick={() => router.push("/")}>
              Start New
              <ArrowRight className="w-4 h-4 ml-2" />
            </LiquidButton>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
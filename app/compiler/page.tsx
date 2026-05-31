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
import { DesignExecutionPack } from "@/lib/types";

export default function CompilerPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, selectedTool, setSelectedTool, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const [pack, setPack] = useState<DesignExecutionPack | null>(null);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

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
  if (!isHydrated || !pack) {
    return (
      <AppShell showBackButton backHref="/">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <p className="text-[var(--color-text-secondary)] mb-4">
                No design brief found. Start from the home page.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-[var(--color-accent-ios-blue)] text-white rounded-xl"
              >
                Go to Home
              </button>
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const direction = getDirectionById(selectedDirectionId!)!;

  const handleCopied = () => {
    addHistory({ type: "prompt_copied", data: { tool: selectedTool } });
  };

  return (
    <AppShell showBackButton backHref="/pack" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              Prompt Compiler
            </SectionLabel>

            <SectionHeading subtitle={`View and copy prompts for ${brief?.productName} in ${direction.name} direction.`}>
              Tool-Specific Prompts
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief?.productName}</span>
              {" — "}
              <span className="text-[var(--color-accent-ios-blue)]">{direction.name}</span>
              {" direction"}
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
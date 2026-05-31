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

export default function BriefPage() {
  const router = useRouter();
  const { currentMode, isHydrated, hydrateFromStorage } = useDesignStore();

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
              Loading...
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
              <span>Back to home</span>
            </Link>

            <SectionLabel>
              Step 1 of 3
            </SectionLabel>

            <SectionHeading subtitle="Tell us about your product and design goals. The more detail you provide, the better the design direction we can suggest.">
              Design Brief
            </SectionHeading>
          </div>

          <BriefForm mode={currentMode} />
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
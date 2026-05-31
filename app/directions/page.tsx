// ============================================================
// Vibe Design Translator - Directions Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { DirectionCard } from "@/components/product/direction-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { useDesignStore } from "@/store/use-design-store";
import { DESIGN_DIRECTIONS, getDirectionById } from "@/lib/design-directions";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function DirectionsPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, setSelectedDirection, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
    setIsLoaded(true);
  }, [isHydrated, hydrateFromStorage]);

  // If no brief, redirect to brief page
  useEffect(() => {
    if (isHydrated && isLoaded && !brief) {
      router.push("/brief");
    }
  }, [isHydrated, isLoaded, brief, router]);

  if (!isHydrated || !brief) {
    return (
      <AppShell showBackButton backHref="/brief">
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              {t("common_loading")}
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const handleSelectDirection = (directionId: string) => {
    setSelectedDirection(directionId);
  };

  const handleContinue = () => {
    if (selectedDirectionId) {
      const direction = getDirectionById(selectedDirectionId);
      if (direction) {
        addHistory({ type: "direction_selected", data: { directionId: selectedDirectionId, directionName: direction.name } });
      }
      router.push("/pack");
    }
  };

  return (
    <AppShell showBackButton backHref="/brief" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("nav_back")}</span>
            </Link>

            <SectionLabel>
              {t("direction_step_label")}
            </SectionLabel>

            <SectionHeading subtitle={t("direction_subtitle")}>
              {t("direction_title")}
            </SectionHeading>
          </div>

          {/* Product summary */}
          <div className="mb-8 p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text-primary)]">{brief.productName}</span>
              {" — "}
              {brief.productCategory}
            </p>
          </div>

          {/* Direction cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {DESIGN_DIRECTIONS.map((direction) => (
              <DirectionCard
                key={direction.id}
                direction={direction}
                isSelected={selectedDirectionId === direction.id}
                onSelect={() => handleSelectDirection(direction.id)}
              />
            ))}
          </div>

          {/* Continue button */}
          <div className="flex justify-center">
            <LiquidButton
              onClick={handleContinue}
              disabled={!selectedDirectionId}
              size="lg"
              className="min-w-[200px]"
            >
              <span>{t("direction_generate_pack")}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </LiquidButton>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
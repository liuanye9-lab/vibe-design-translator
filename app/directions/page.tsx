// ============================================================
// Vibe Design Translator - Directions Page
// ============================================================

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { DirectionCard } from "@/components/product/direction-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { useDesignStore } from "@/store/use-design-store";
import { DESIGN_DIRECTIONS, getDirectionById } from "@/lib/design-directions";
import { localizeDirection, localizeDirections } from "@/lib/design-direction-i18n";
import type { DirectionAgentResult } from "@/lib/types";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function DirectionsPage() {
  const router = useRouter();
  const { brief, selectedDirectionId, setSelectedDirection, addHistory, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t, locale } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);
  const [agentResult, setAgentResult] = useState<DirectionAgentResult | null>(null);
  const [agentStatus, setAgentStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const directions = localizeDirections(DESIGN_DIRECTIONS, locale);
  const recommendationByDirectionId = useMemo(() => {
    const map = new Map<string, DirectionAgentResult["recommendations"][number]>();
    agentResult?.recommendations.forEach((recommendation) => {
      map.set(recommendation.directionId, recommendation);
    });
    return map;
  }, [agentResult]);
  useEffect(() => {
    hydrateFromStorage();
    setIsLoaded(true);
  }, [hydrateFromStorage]);

  // If no brief, redirect to brief page
  useEffect(() => {
    if (isHydrated && isLoaded && !brief) {
      router.push("/brief");
    }
  }, [isHydrated, isLoaded, brief, router]);

  useEffect(() => {
    if (!isHydrated || !brief) return;

    const controller = new AbortController();
    setAgentStatus("loading");

    fetch("/api/ai/recommend-directions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brief }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const json = await response.json();
        if (!response.ok || !json.success) {
          throw new Error(json.error?.message || "Failed to recommend directions");
        }
        return json.data as DirectionAgentResult;
      })
      .then((data) => {
        setAgentResult(data);
        setAgentStatus("ready");
        const topRecommendation = data.recommendations[0];
        if (!selectedDirectionId && topRecommendation) {
          setSelectedDirection(topRecommendation.directionId);
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Direction recommendation failed:", error);
        setAgentStatus("error");
      });

    return () => controller.abort();
  }, [brief, isHydrated, selectedDirectionId, setSelectedDirection]);

  if (!isLoaded || !isHydrated || !brief) {
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
        const displayDirection = localizeDirection(direction, locale);
        addHistory({ type: "direction_selected", data: { directionId: selectedDirectionId, directionName: displayDirection.name } });
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

          <div className="mb-8 rounded-2xl border border-[var(--color-border)] bg-white/65 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  <Sparkles className="h-4 w-4 text-[var(--color-accent-ios-blue)]" />
                  {locale === "zh" ? "智能方向 Agent" : "Direction Agent"}
                </div>
                <p className="max-w-3xl text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {agentStatus === "loading"
                    ? locale === "zh"
                      ? "正在根据你的想法调用真实模型分析方向..."
                      : "Calling the configured model to analyze your brief..."
                    : agentResult?.summary ||
                      (locale === "zh"
                        ? "根据 brief 生成推荐方向，并映射到素材库模式"
                        : "Recommends directions and maps them to material patterns")}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
                {agentStatus === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>
                  {agentResult
                    ? agentResult.fallback
                      ? locale === "zh"
                        ? "本地兜底"
                        : "Local fallback"
                      : `API · ${agentResult.provider}`
                    : agentStatus === "error"
                    ? locale === "zh"
                      ? "推荐失败"
                      : "Recommendation failed"
                    : locale === "zh"
                    ? "分析中"
                    : "Analyzing"}
                </span>
              </div>
            </div>
          </div>

          {/* Direction cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {directions.map((direction) => (
              <DirectionCard
                key={direction.id}
                direction={direction}
                isSelected={selectedDirectionId === direction.id}
                recommendation={recommendationByDirectionId.get(direction.id)}
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

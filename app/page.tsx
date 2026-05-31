// ============================================================
// Vibe Design Translator - Home Page
// ============================================================

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { ModeSelector } from "@/components/product/mode-selector";
import { useDesignStore } from "@/store/use-design-store";
import { UserMode } from "@/lib/types";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/use-i18n";

export default function HomePage() {
  const router = useRouter();
  const { currentMode, setMode, isHydrated, hydrateFromStorage } = useDesignStore();
  const { t } = useI18n();

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  const handleSelectMode = (mode: UserMode) => {
    setMode(mode);
    if (mode === "diagnose") {
      router.push("/diagnosis");
    } else {
      router.push("/brief");
    }
  };

  const tools = [t("tool_codex"), t("tool_claude_code"), t("tool_gemini"), t("tool_workbuddy")];

  const steps = [
    {
      step: "01",
      title: t("home_step1_title"),
      description: t("home_step1_desc"),
    },
    {
      step: "02",
      title: t("home_step2_title"),
      description: t("home_step2_desc"),
    },
    {
      step: "03",
      title: t("home_step3_title"),
      description: t("home_step3_desc"),
    },
  ];

  return (
    <AppShell showNav={false}>
      <PageWrapper withTopNav={false}>
        <PageContainer className="min-h-screen flex flex-col justify-center py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-6">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {t("home_badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-6">
              {t("home_title_1")}
              <br />
              <span className="gradient-text">{t("home_title_2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
              {t("home_description")}
            </p>

            <p className="text-sm text-[var(--color-text-secondary)]">
              {t("home_subtitle")}
            </p>
          </div>

          {/* Mode Selection */}
          <ModeSelector currentMode={currentMode} onSelectMode={handleSelectMode} />

          {/* How it works */}
          <div className="mt-20">
            <SectionHeading align="center" subtitle={t("home_how_label")}>
              {t("home_how_title")}
            </SectionHeading>

            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((item) => (
                <GlassCard key={item.step} className="p-6">
                  <span className="text-4xl font-bold text-[var(--color-accent-mist-blue)] mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Tools Supported */}
          <div className="mt-20 text-center">
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              {t("home_supports")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-xl bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              {t("home_footer")}
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link
                href="/patterns"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home_footer_patterns")}
              </Link>
              <Link
                href="/settings"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home_footer_settings")}
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home_footer_pricing")}
              </Link>
            </div>
          </footer>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

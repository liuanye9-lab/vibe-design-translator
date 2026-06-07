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
import { useI18n } from "@/lib/i18n/use-i18n";
import { UserMode } from "@/lib/types";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const { currentMode, setMode, isHydrated, hydrateFromStorage } = useDesignStore();
  const { locale, setLocale, t } = useI18n();

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

  return (
    <AppShell showNav={false}>
      <PageWrapper withTopNav={false}>
        <PageContainer className="min-h-screen flex flex-col justify-center py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6 flex justify-center">
              <button
                onClick={() => setLocale(locale === "zh" ? "en" : "zh")}
                className="rounded-full border border-[var(--color-border)] bg-white/60 px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] backdrop-blur hover:bg-[var(--color-surface)]"
              >
                {locale === "zh" ? t("language.en") : t("language.zh")}
              </button>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-6">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {t("home.kicker")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-6">
              {t("home.titleA")}
              <br />
              <span className="gradient-text">{t("home.titleB")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
              {t("home.subtitle")}
            </p>

            <p className="text-sm text-[var(--color-text-secondary)]">
              {t("home.privacy")}
            </p>
          </div>

          {/* Mode Selection */}
          <ModeSelector currentMode={currentMode} onSelectMode={handleSelectMode} />

          {/* How it works */}
          <div className="mt-20">
            <SectionHeading align="center" subtitle={t("home.howSubtitle")}>
              {t("home.howTitle")}
            </SectionHeading>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: t("home.step1.title"),
                  description: t("home.step1.desc"),
                },
                {
                  step: "02",
                  title: t("home.step2.title"),
                  description: t("home.step2.desc"),
                },
                {
                  step: "03",
                  title: t("home.step3.title"),
                  description: t("home.step3.desc"),
                },
              ].map((item) => (
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
              {t("home.supports")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Codex", "Claude Code", "Gemini", "WorkBuddy"].map((tool) => (
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
              {t("home.footer")}
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link
                href="/patterns"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home.footer.patterns")}
              </Link>
              <Link
                href="/settings"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home.footer.settings")}
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {t("home.footer.pricing")}
              </Link>
            </div>
          </footer>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

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

export default function HomePage() {
  const router = useRouter();
  const { currentMode, setMode, isHydrated, hydrateFromStorage } = useDesignStore();

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-6">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Design Decision SaaS for AI Coding
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-6">
              Translate your vibe into
              <br />
              <span className="gradient-text">executable prompts</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-4">
              Stop fighting with AI to get the design you want. Describe your vision, get curated directions, and generate tool-specific prompts for Codex, Claude Code, Gemini, and WorkBuddy.
            </p>

            <p className="text-sm text-[var(--color-text-secondary)]">
              No sign-up required. No AI API connected. No data stored externally.
            </p>
          </div>

          {/* Mode Selection */}
          <ModeSelector currentMode={currentMode} onSelectMode={handleSelectMode} />

          {/* How it works */}
          <div className="mt-20">
            <SectionHeading align="center" subtitle="How it works">
              Three paths to better design
            </SectionHeading>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Describe your vision",
                  description: "Tell us what you want—or what you want to avoid. We'll translate vague feelings into concrete design specs.",
                },
                {
                  step: "02",
                  title: "Choose a direction",
                  description: "Pick from curated design directions that match your goals. Each comes with a complete execution strategy.",
                },
                {
                  step: "03",
                  title: "Get actionable prompts",
                  description: "Generate tool-specific prompts with acceptance criteria, anti-AI-look checklists, and step-by-step guidance.",
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
              Supports prompts for
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
              Vibe Design Translator — Phase 1 MVP. Engineering foundation, not production ready.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link
                href="/patterns"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Design Patterns
              </Link>
              <Link
                href="/settings"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Settings
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Pricing
              </Link>
            </div>
          </footer>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
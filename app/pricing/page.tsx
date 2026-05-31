// ============================================================
// Vibe Design Translator - Pricing Page
// ============================================================

"use client";

import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { useI18n } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    id: "free",
    nameKey: "pricing_free",
    descKey: "pricing_free_desc",
    price: "$0",
    periodKey: "pricing_free_period",
    features: [
      "Basic direction generator",
      "3 prompt exports / month",
      "Pattern library preview",
      "Community support",
    ],
    notIncluded: [
      "Unlimited prompt exports",
      "Diagnosis reports",
      "Tool-specific prompts",
      "Saved projects",
    ],
    isPopular: false,
  },
  {
    id: "pro",
    nameKey: "pricing_pro",
    descKey: "pricing_pro_desc",
    price: "$19",
    periodKey: "pricing_pro_period",
    features: [
      "Unlimited prompt exports",
      "Diagnosis reports",
      "Tool-specific prompts (Codex, Claude, Gemini, WorkBuddy)",
      "Saved projects (10 max)",
      "Bilingual output (Chinese + English)",
      "Priority support",
    ],
    notIncluded: [
      "Shared design memory",
      "Private pattern library",
      "Brand rules",
      "Team features",
    ],
    isPopular: true,
  },
  {
    id: "team",
    nameKey: "pricing_team",
    descKey: "pricing_team_desc",
    price: "$49",
    periodKey: "pricing_team_period",
    features: [
      "Everything in Pro",
      "Shared design memory",
      "Private pattern library",
      "Brand rules management",
      "Batch diagnosis (10 pages/month)",
      "API / MCP access (coming soon)",
      "Dedicated support",
    ],
    notIncluded: [],
    isPopular: false,
  },
];

export default function PricingPage() {
  const { t } = useI18n();
  
  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="text-center mb-12">
            <SectionLabel>
              {t("pricing_tag")}
            </SectionLabel>

            <SectionHeading subtitle={t("pricing_subtitle")}>
              {t("pricing_title")}
            </SectionHeading>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <GlassCard
                key={plan.id}
                variant={plan.isPopular ? "strong" : "default"}
                className={cn(
                  "p-6 relative",
                  plan.isPopular && "ring-2 ring-[var(--color-accent-ios-blue)]"
                )}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-accent-ios-blue)] text-white text-xs font-medium">
                      <Zap className="w-3 h-3" />
                      {t("pricing_popular")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                    {t(plan.nameKey)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {t(plan.descKey)}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                    {plan.price}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    {" "}{t(plan.periodKey)}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--color-text-primary)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 opacity-50">
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <LiquidButton
                  variant={plan.isPopular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {plan.id === "free" ? t("pricing_btn_free") : t("pricing_btn_paid")}
                </LiquidButton>
              </GlassCard>
            ))}
          </div>

          {/* FAQ / Note */}
          <GlassCard className="p-6 bg-[var(--color-surface)]">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                {t("pricing_note_label")}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {t("pricing_note_desc")}
              </p>
            </div>
          </GlassCard>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
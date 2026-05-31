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
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Get started with basic design direction generation.",
    price: "$0",
    period: "forever",
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
    name: "Pro",
    description: "For individuals who want full access to design decision tools.",
    price: "$19",
    period: "/ month",
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
    name: "Team",
    description: "For teams that need shared design memory and brand consistency.",
    price: "$49",
    period: "/ month per seat",
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
  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="text-center mb-12">
            <SectionLabel>
              Pricing
            </SectionLabel>

            <SectionHeading subtitle="Choose the plan that fits your design workflow. All plans include localStorage persistence.">
              Simple, transparent pricing
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
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--color-text-primary)]">
                    {plan.price}
                  </span>
                  <span className="text-[var(--color-text-secondary)]">
                    {" "}{plan.period}
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
                  {plan.id === "free" ? "Get Started" : "Coming Soon"}
                </LiquidButton>
              </GlassCard>
            ))}
          </div>

          {/* FAQ / Note */}
          <GlassCard className="p-6 bg-[var(--color-surface)]">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                Phase 1 MVP - No real payment integration yet
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                This is an engineering prototype. Real pricing and payment will be added in Phase 5.
                For now, all features are available for free during the testing period.
              </p>
            </div>
          </GlassCard>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
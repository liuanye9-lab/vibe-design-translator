// ============================================================
// Vibe Design Translator - Brief Form Component
// ============================================================

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
  FIRST_IMPRESSION_OPTIONS,
  BUSINESS_PRIORITY_OPTIONS,
  VISUAL_REFERENCE_OPTIONS,
  AVOIDED_AI_SMELL_OPTIONS,
  AUDIENCE_OPTIONS,
  DESIRED_FEELING_OPTIONS,
  AVOIDED_FEELING_OPTIONS,
} from "@/lib/constants";
import { DesignBrief, ToolType } from "@/lib/types";
import { useDesignStore } from "@/store/use-design-store";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Sparkles, CheckCircle2, ChevronDown } from "lucide-react";

interface BriefFormProps {
  mode?: "has-idea" | "no-idea";
}

export function BriefForm({ mode = "has-idea" }: BriefFormProps) {
  const router = useRouter();
  const { t, locale } = useI18n();
  const { setBrief, updateBrief, brief, selectedTool } = useDesignStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [productName, setProductName] = useState(
    brief?.productName ?? t("brief_form_product_default")
  );
  const [productCategory, setProductCategory] = useState(brief?.productCategory ?? "");
  const [targetUsers, setTargetUsers] = useState(brief?.targetUsers ?? "");
  const [firstImpression, setFirstImpression] = useState(brief?.firstImpression ?? "");
  const [businessPriority, setBusinessPriority] = useState(brief?.businessPriority ?? "");
  const [visualReference, setVisualReference] = useState(brief?.visualReferenceTolerance ?? "");
  const [avoidedAISmell, setAvoidedAISmell] = useState<string[]>(
    brief?.avoidedAISmell ?? []
  );
  const [audience, setAudience] = useState(brief?.audience ?? "");
  const [pageGoal, setPageGoal] = useState(brief?.pageGoal ?? "");
  const [desiredFeeling, setDesiredFeeling] = useState<string[]>(
    brief?.desiredFeeling ?? []
  );
  const [avoidedFeeling, setAvoidedFeeling] = useState<string[]>(
    brief?.avoidedFeeling ?? []
  );
  const [mainCTA, setMainCTA] = useState(brief?.mainCTA ?? "");
  const [visualIntensity, setVisualIntensity] = useState(
    brief?.visualIntensity ?? "balanced"
  );
  const [contentDensity, setContentDensity] = useState(brief?.contentDensity ?? "standard");
  const [tool, setTool] = useState<ToolType>(selectedTool);

  // Build translated category options
  const categoryOptions = [
    { value: "saas", label: t("cat_saas") },
    { value: "mobile", label: t("cat_mobile") },
    { value: "ecommerce", label: t("cat_ecommerce") },
    { value: "portfolio", label: t("cat_portfolio") },
    { value: "blog", label: t("cat_blog") },
    { value: "marketing", label: t("cat_marketing") },
    { value: "dashboard", label: t("cat_dashboard") },
    { value: "docs", label: t("cat_docs") },
    { value: "event", label: t("cat_event") },
    { value: "other", label: t("cat_other") },
  ];

  const handleSave = useCallback(() => {
    const draft: DesignBrief = {
      productName,
      productCategory,
      targetUsers,
      firstImpression,
      businessPriority,
      visualReferenceTolerance: visualReference,
      avoidedAISmell,
      audience,
      pageGoal,
      desiredFeeling,
      avoidedFeeling,
      mainCTA,
      visualIntensity: visualIntensity as "minimal" | "balanced" | "expressive",
      contentDensity: contentDensity as "light" | "standard" | "dense",
      outputTool: tool,
    };
    return draft;
  }, [
    productName, productCategory, targetUsers, firstImpression,
    businessPriority, visualReference, avoidedAISmell, audience,
    pageGoal, desiredFeeling, avoidedFeeling, mainCTA,
    visualIntensity, contentDensity, tool,
  ]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const draft = handleSave();

    // Persist to store
    if (brief) {
      updateBrief(draft);
    } else {
      setBrief(draft);
    }

    // Navigate to directions
    setTimeout(() => {
      router.push("/directions");
      setIsSubmitting(false);
    }, 300);
  };

  const toggleStringArray = (
    current: string[],
    value: string
  ): string[] => {
    return current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
  };

  // ---------- Render helpers ----------

  const renderPillGroup = (
    items: { value: string; label: string; description: string }[],
    selected: string | string[],
    onChange: (v: string) => void,
    multi = false
  ) => {
    const isSelected = (v: string) =>
      multi ? (selected as string[]).includes(v) : selected === v;

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = isSelected(item.value);
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onChange(item.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                "text-sm transition-all duration-200",
                active
                  ? "bg-[var(--color-accent-ios-blue)] text-white shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-ios-blue)]"
              )}
            >
              {active && <CheckCircle2 className="w-4 h-4" />}
              <div className="text-left">
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <span className="block text-xs opacity-70 mt-0.5">
                    {item.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Hero section of the form */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-4">
          <Sparkles className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {mode === "no-idea"
              ? t("brief_form_badge_1")
              : t("brief_form_badge_2")}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text-primary)] mb-2">
          {t("brief_form_heading")}
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          {t("brief_form_desc1")}
        </p>
      </div>

      {/* Product Name */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_product_label")}
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder={t("brief_form_product_placeholder")}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
            "border border-[var(--color-border)]",
            "text-sm text-[var(--color-text-primary)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent",
            "placeholder:text-[var(--color-text-tertiary)]"
          )}
        />
      </GlassCard>

      {/* Product Category */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_category_label")}
        </label>
        <div className="relative">
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
              "border border-[var(--color-border)] appearance-none",
              "text-sm text-[var(--color-text-primary)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent",
              "placeholder:text-[var(--color-text-tertiary)]"
            )}
          >
            <option value="">{t("brief_form_category_placeholder")}</option>
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none" />
        </div>
      </GlassCard>

      {/* Target Users */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_users_label")}
        </label>
        <textarea
          value={targetUsers}
          onChange={(e) => setTargetUsers(e.target.value)}
          placeholder={t("brief_form_users_placeholder")}
          rows={2}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
            "border border-[var(--color-border)]",
            "text-sm text-[var(--color-text-primary)] resize-none",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent",
            "placeholder:text-[var(--color-text-tertiary)]"
          )}
        />
      </GlassCard>

      {/* First Impression */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_impression_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_impression_helper")}
        </p>
        {renderPillGroup(
          FIRST_IMPRESSION_OPTIONS.map((fi) => ({
            ...fi,
            label: t(`fi_${fi.value}`),
            description: t(`fi_${fi.value}_desc`),
          })),
          firstImpression,
          setFirstImpression
        )}
      </GlassCard>

      {/* Business Priority */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_priority_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_priority_helper")}
        </p>
        {renderPillGroup(
          BUSINESS_PRIORITY_OPTIONS.map((bp) => ({
            ...bp,
            label: t(`bp_${bp.value}`),
            description: t(`bp_${bp.value}_desc`),
          })),
          businessPriority,
          setBusinessPriority
        )}
      </GlassCard>

      {/* Visual Reference */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_visual_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_visual_helper")}
        </p>
        {renderPillGroup(
          VISUAL_REFERENCE_OPTIONS.map((vr) => ({
            ...vr,
            label: t(`vr_${vr.value}`),
            description: t(`vr_${vr.value}_desc`),
          })),
          visualReference,
          setVisualReference
        )}
      </GlassCard>

      {/* AI Problems to Avoid */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_avoid_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_avoid_helper")}
        </p>
        {renderPillGroup(
          AVOIDED_AI_SMELL_OPTIONS.map((p) => ({
            ...p,
            label: t(`ai_${p.value}`),
            description: t(`ai_${p.value}_desc`),
          })),
          avoidedAISmell,
          (v) => setAvoidedAISmell(toggleStringArray(avoidedAISmell, v)),
          true
        )}
      </GlassCard>

      {/* Audience */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_audience_label")}
        </label>
        {renderPillGroup(
          AUDIENCE_OPTIONS.map((a) => ({
            ...a,
            label: t(`aud_${a.value}`),
            description: t(`aud_${a.value}_desc`),
          })),
          audience,
          setAudience
        )}
      </GlassCard>

      {/* Page Goal */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_goal_label")}
        </label>
        <textarea
          value={pageGoal}
          onChange={(e) => setPageGoal(e.target.value)}
          placeholder={t("brief_form_goal_placeholder")}
          rows={3}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
            "border border-[var(--color-border)]",
            "text-sm text-[var(--color-text-primary)] resize-none",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent",
            "placeholder:text-[var(--color-text-tertiary)]"
          )}
        />
      </GlassCard>

      {/* Desired Feelings */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_feeling_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_feeling_helper")}
        </p>
        {renderPillGroup(
          DESIRED_FEELING_OPTIONS.map((f) => ({
            value: f,
            label: t(`feel_${f.toLowerCase()}`),
            description: "",
          })),
          desiredFeeling,
          (v) => setDesiredFeeling(toggleStringArray(desiredFeeling, v)),
          true
        )}
      </GlassCard>

      {/* Feelings to Avoid */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
          {t("brief_form_avoid_feeling_label")}
        </label>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {t("brief_form_avoid_feeling_helper")}
        </p>
        {renderPillGroup(
          AVOIDED_FEELING_OPTIONS.map((f) => ({
            value: f,
            label: t(`avoid_${f.toLowerCase()}`),
            description: "",
          })),
          avoidedFeeling,
          (v) => setAvoidedFeeling(toggleStringArray(avoidedFeeling, v)),
          true
        )}
      </GlassCard>

      {/* CTA */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_cta_label")}
        </label>
        <input
          type="text"
          value={mainCTA}
          onChange={(e) => setMainCTA(e.target.value)}
          placeholder={t("brief_form_cta_placeholder")}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
            "border border-[var(--color-border)]",
            "text-sm text-[var(--color-text-primary)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent",
            "placeholder:text-[var(--color-text-tertiary)]"
          )}
        />
      </GlassCard>

      {/* Visual Intensity */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          {t("brief_form_intensity_label")}
        </label>
        <div className="flex gap-2">
          {(["minimal", "balanced", "expressive"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setVisualIntensity(level)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                visualIntensity === level
                  ? "bg-[var(--color-accent-ios-blue)] text-white shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-ios-blue)]"
              )}
            >
              {t(`intensity_${level}`)}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Content Density */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          {t("brief_form_density_label")}
        </label>
        <div className="flex gap-2">
          {(["light", "standard", "dense"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setContentDensity(level)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                contentDensity === level
                  ? "bg-[var(--color-accent-ios-blue)] text-white shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent-ios-blue)]"
              )}
            >
              {t(`density_${level}`)}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Output Tool */}
      <GlassCard className="p-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          {t("brief_form_tool_label")}
        </label>
        <div className="relative">
          <select
            value={tool}
            onChange={(e) => setTool(e.target.value as ToolType)}
            className={cn(
              "w-full px-4 py-3 rounded-xl bg-[var(--color-surface)]",
              "border border-[var(--color-border)] appearance-none",
              "text-sm text-[var(--color-text-primary)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)] focus:border-transparent"
            )}
          >
            <option value="codex">{t("tool_codex")}</option>
            <option value="claude-code">{t("tool_claude_code")}</option>
            <option value="gemini">{t("tool_gemini")}</option>
            <option value="workbuddy">{t("tool_workbuddy")}</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none" />
        </div>
      </GlassCard>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <LiquidButton onClick={handleSubmit} isLoading={isSubmitting}>
          {t("brief_form_submit")}
        </LiquidButton>
      </div>
    </div>
  );
}

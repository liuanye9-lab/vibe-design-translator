// ============================================================
// Vibe Design Translator - Brief Form Component
// ============================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignBrief, UserMode, VisualIntensity, ContentDensity, ToolType } from "@/lib/types";
import { useDesignStore } from "@/store/use-design-store";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { SectionLabel, SectionHeading } from "@/components/ui/section-heading";
import { useI18n } from "@/lib/i18n/use-i18n";
import {
  PRODUCT_CATEGORIES,
  DESIRED_FEELING_OPTIONS,
  AVOIDED_FEELING_OPTIONS,
  FIRST_IMPRESSION_OPTIONS,
  BUSINESS_PRIORITY_OPTIONS,
  VISUAL_REFERENCE_OPTIONS,
  AVOIDED_AI_SMELL_OPTIONS,
  AUDIENCE_OPTIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";

interface BriefFormProps {
  mode: UserMode;
}

export function BriefForm({ mode }: BriefFormProps) {
  const router = useRouter();
  const { updateBrief, setMode, addHistory } = useDesignStore();
  const { locale, t, optionLabel, optionDescription } = useI18n();

  // Form state
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [pageGoal, setPageGoal] = useState("");
  const [desiredFeeling, setDesiredFeeling] = useState<string[]>([]);
  const [avoidedFeeling, setAvoidedFeeling] = useState<string[]>([]);
  const [mainCTA, setMainCTA] = useState("");
  const [visualIntensity, setVisualIntensity] = useState<VisualIntensity>("balanced");
  const [contentDensity, setContentDensity] = useState<ContentDensity>("standard");
  const [outputTool, setOutputTool] = useState<ToolType>("claude-code");

  // Enhanced fields for has-idea mode
  const [firstImpression, setFirstImpression] = useState<string>("");
  const [businessPriority, setBusinessPriority] = useState<string>("");
  const [visualReference, setVisualReference] = useState<string>("");
  const [avoidedAISmell, setAvoidedAISmell] = useState<string[]>([]);
  const [audience, setAudience] = useState<string>("");

  // Light mode (no-idea) just needs basic info
  const isLightMode = mode === "no-idea";

  const handleToggleFeeling = (feeling: string, currentList: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentList.includes(feeling)) {
      setter(currentList.filter((f) => f !== feeling));
    } else {
      setter([...currentList, feeling]);
    }
  };

  const handleToggleAISmell = (smell: string) => {
    if (avoidedAISmell.includes(smell)) {
      setAvoidedAISmell(avoidedAISmell.filter((s) => s !== smell));
    } else {
      setAvoidedAISmell([...avoidedAISmell, smell]);
    }
  };

  const handleSubmit = () => {
    const brief: DesignBrief = {
      productName: productName || "My Product",
      productCategory: productCategory || PRODUCT_CATEGORIES[0],
      targetUsers: targetUsers || (locale === "zh" ? "通用用户" : "General users"),
      pageGoal: pageGoal || (locale === "zh" ? "建立认知并推动转化" : "Create awareness and drive conversions"),
      desiredFeeling: desiredFeeling.length > 0 ? desiredFeeling : ["Professional", "Trustworthy"],
      avoidedFeeling: avoidedFeeling.length > 0 ? avoidedFeeling : ["Generic AI", "Template-like"],
      mainCTA: mainCTA || (locale === "zh" ? "开始使用" : "Get Started"),
      visualIntensity,
      contentDensity,
      outputTool,
      // Enhanced fields
      firstImpression: isLightMode ? undefined : firstImpression || undefined,
      businessPriority: isLightMode ? undefined : businessPriority || undefined,
      visualReference: isLightMode ? undefined : visualReference || undefined,
      avoidedAISmell: isLightMode ? undefined : avoidedAISmell.length > 0 ? avoidedAISmell : undefined,
      audience: isLightMode ? undefined : audience || undefined,
    };

    setMode(mode);
    updateBrief(brief);
    addHistory({ type: "brief_created", data: brief });

    router.push("/directions");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] mb-4">
          <Sparkles className="w-4 h-4 text-[var(--color-accent-ios-blue)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {isLightMode ? t("brief.quick") : t("brief.workshop")}
          </span>
        </div>
        <SectionHeading align="center">
          {isLightMode ? t("brief.title.light") : t("brief.title.full")}
        </SectionHeading>
        <p className="text-[var(--color-text-secondary)] mt-2">
          {isLightMode
            ? t("brief.subtitle.light")
            : t("brief.subtitle.full")}
        </p>
      </div>

      <GlassCard className="p-8">
        <div className="space-y-8">
          {/* Product Name */}
          <div>
            <SectionLabel>
              <span className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                {t("brief.product.label")}
              </span>
            </SectionLabel>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder={t("brief.product.placeholder")}
              className="input"
            />
          </div>

          {/* Product Category */}
          <div>
            <SectionLabel>{t("brief.category")}</SectionLabel>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="select"
            >
              <option value="">{t("brief.category.placeholder")}</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{optionLabel(cat)}</option>
              ))}
            </select>
          </div>

          {/* Target Users */}
          <div>
            <SectionLabel>{t("brief.targetUsers")}</SectionLabel>
            <input
              type="text"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              placeholder={t("brief.targetUsers.placeholder")}
              className="input"
            />
          </div>

          {/* Enhanced Design Questions - has-idea mode only */}
          {!isLightMode && (
            <>
              {/* First Impression */}
              <div>
                <SectionLabel>
                  {t("brief.firstImpression")}
                </SectionLabel>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {t("brief.firstImpression.desc")}
                </p>
                <div className="space-y-3">
                  {FIRST_IMPRESSION_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFirstImpression(option.value)}
                      className={cn(
                        "w-full p-4 rounded-2xl text-left transition-all duration-200",
                        "border border-[var(--color-border)]",
                        firstImpression === option.value
                          ? "bg-[var(--color-accent-ios-blue)]/10 border-[var(--color-accent-ios-blue)]"
                          : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {optionLabel(option.value)}
                        </span>
                        {firstImpression === option.value && (
                          <span className="text-[var(--color-accent-ios-blue)] text-sm">{t("brief.selected")}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {optionDescription(option.value, option.description)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Priority */}
              <div>
                <SectionLabel>{t("brief.businessPriority")}</SectionLabel>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {t("brief.businessPriority.desc")}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {BUSINESS_PRIORITY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setBusinessPriority(option.value)}
                      className={cn(
                        "p-4 rounded-2xl text-left transition-all duration-200",
                        "border border-[var(--color-border)]",
                        businessPriority === option.value
                          ? "bg-[var(--color-accent-ios-blue)]/10 border-[var(--color-accent-ios-blue)]"
                          : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {optionLabel(option.value)}
                        </span>
                        {businessPriority === option.value && (
                          <span className="text-[var(--color-accent-ios-blue)] text-sm">{t("brief.selected")}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {optionDescription(option.value, option.description)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Reference */}
              <div>
                <SectionLabel>
                  {t("brief.visualReference")}
                </SectionLabel>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {t("brief.visualReference.desc")}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {VISUAL_REFERENCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setVisualReference(option.value)}
                      className={cn(
                        "p-4 rounded-2xl text-left transition-all duration-200",
                        "border border-[var(--color-border)]",
                        visualReference === option.value
                          ? "bg-[var(--color-accent-ios-blue)]/10 border-[var(--color-accent-ios-blue)]"
                          : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {optionLabel(option.value)}
                        </span>
                        {visualReference === option.value && (
                          <span className="text-[var(--color-accent-ios-blue)] text-sm">{t("brief.selected")}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {optionDescription(option.value, option.description)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Avoided AI Smell */}
              <div>
                <SectionLabel>{t("brief.avoidAISmell")}</SectionLabel>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {t("brief.avoidAISmell.desc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {AVOIDED_AI_SMELL_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleToggleAISmell(option.value)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm transition-all duration-200",
                        avoidedAISmell.includes(option.value)
                          ? "bg-[var(--color-accent-ios-blue)] text-white"
                          : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      )}
                    >
                      {optionLabel(option.value)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience */}
              <div>
                <SectionLabel>{t("brief.audience")}</SectionLabel>
                <div className="grid grid-cols-1 gap-3">
                  {AUDIENCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setAudience(option.value)}
                      className={cn(
                        "p-4 rounded-2xl text-left transition-all duration-200",
                        "border border-[var(--color-border)]",
                        audience === option.value
                          ? "bg-[var(--color-accent-ios-blue)]/10 border-[var(--color-accent-ios-blue)]"
                          : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {optionLabel(option.value)}
                        </span>
                        {audience === option.value && (
                          <span className="text-[var(--color-accent-ios-blue)] text-sm">{t("brief.selected")}</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {optionDescription(option.value, option.description)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Goal */}
              <div>
                <SectionLabel>{t("brief.pageGoal")}</SectionLabel>
                <textarea
                  value={pageGoal}
                  onChange={(e) => setPageGoal(e.target.value)}
                  placeholder={t("brief.pageGoal.placeholder")}
                  className="textarea"
                />
              </div>

              {/* Desired Feeling */}
              <div>
                <SectionLabel>{t("brief.desiredFeeling")}</SectionLabel>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {t("brief.desiredFeeling.desc")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {DESIRED_FEELING_OPTIONS.map((feeling) => (
                    <button
                      key={feeling}
                      onClick={() => handleToggleFeeling(feeling, desiredFeeling, setDesiredFeeling)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm transition-all duration-200",
                        desiredFeeling.includes(feeling)
                          ? "bg-[var(--color-accent-ios-blue)] text-white"
                          : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      )}
                    >
                      {optionLabel(feeling)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avoided Feeling */}
              <div>
                <SectionLabel>{t("brief.avoidedFeeling")}</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {AVOIDED_FEELING_OPTIONS.map((feeling) => (
                    <button
                      key={feeling}
                      onClick={() => handleToggleFeeling(feeling, avoidedFeeling, setAvoidedFeeling)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm transition-all duration-200",
                        avoidedFeeling.includes(feeling)
                          ? "bg-rose-500/80 text-white"
                          : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      )}
                    >
                      {optionLabel(feeling)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main CTA */}
              <div>
                <SectionLabel>{t("brief.mainCTA")}</SectionLabel>
                <input
                  type="text"
                  value={mainCTA}
                  onChange={(e) => setMainCTA(e.target.value)}
                  placeholder={t("brief.mainCTA.placeholder")}
                  className="input"
                />
              </div>
            </>
          )}

          {/* Visual Intensity */}
          <div>
            <SectionLabel>{t("brief.visualIntensity")}</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {(["minimal", "balanced", "expressive"] as VisualIntensity[]).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => setVisualIntensity(intensity)}
                  className={cn(
                    "p-4 rounded-2xl text-center transition-all duration-200",
                    visualIntensity === intensity
                      ? "bg-[var(--color-accent-ios-blue)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)] border border-[var(--color-border)]"
                  )}
                >
                  <span className="block font-medium">{optionLabel(intensity)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Density */}
          <div>
            <SectionLabel>{t("brief.contentDensity")}</SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {(["light", "standard", "dense"] as ContentDensity[]).map((density) => (
                <button
                  key={density}
                  onClick={() => setContentDensity(density)}
                  className={cn(
                    "p-4 rounded-2xl text-center transition-all duration-200",
                    contentDensity === density
                      ? "bg-[var(--color-accent-ios-blue)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)] border border-[var(--color-border)]"
                  )}
                >
                  <span className="block font-medium">{optionLabel(density)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Output Tool */}
          <div>
            <SectionLabel>{t("brief.outputTool")}</SectionLabel>
            <select
              value={outputTool}
              onChange={(e) => setOutputTool(e.target.value as ToolType)}
              className="select"
            >
              <option value="codex">Codex</option>
              <option value="claude-code">Claude Code</option>
              <option value="gemini">Gemini</option>
              <option value="workbuddy">WorkBuddy</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <LiquidButton
              onClick={handleSubmit}
              className="w-full"
              size="lg"
            >
              <span>{isLightMode ? t("brief.submit.light") : t("brief.submit.full")}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </LiquidButton>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

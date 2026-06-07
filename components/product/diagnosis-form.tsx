// ============================================================
// Vibe Design Translator - Diagnosis Form Component
// ============================================================

"use client";

import { useState } from "react";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { SectionLabel } from "@/components/ui/section-heading";
import { PAGE_TYPE_OPTIONS, PAIN_POINT_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/use-i18n";
import { cn } from "@/lib/utils";
import { TagGroup, TagPill } from "@/components/ui/tag-pill";
import { Upload, ArrowRight } from "lucide-react";

interface DiagnosisFormProps {
  onSubmit: (data: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  }) => void;
  isLoading: boolean;
}

export function DiagnosisForm({ onSubmit, isLoading }: DiagnosisFormProps) {
  const { t, optionLabel } = useI18n();
  const [pageType, setPageType] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [primaryPainPoint, setPrimaryPainPoint] = useState<string[]>([]);

  const handleTogglePainPoint = (painPoint: string) => {
    if (primaryPainPoint.includes(painPoint)) {
      setPrimaryPainPoint(primaryPainPoint.filter((p) => p !== painPoint));
    } else {
      setPrimaryPainPoint([...primaryPainPoint, painPoint]);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      pageType,
      pageDescription,
      primaryPainPoint: primaryPainPoint.join(", "),
    });
  };

  return (
    <GlassCard className="p-8">
      <div className="space-y-8">
        {/* Page Type */}
        <div>
          <SectionLabel>{t("diagnosis.form.pageType")}</SectionLabel>
          <select
            value={pageType}
            onChange={(e) => setPageType(e.target.value)}
            className="select"
          >
            <option value="">{t("diagnosis.form.pageType.placeholder")}</option>
            {PAGE_TYPE_OPTIONS.map((pageTypeOption) => (
              <option key={pageTypeOption} value={pageTypeOption}>
                {optionLabel(pageTypeOption)}
              </option>
            ))}
          </select>
        </div>

        {/* Page Description */}
        <div>
          <SectionLabel>{t("diagnosis.form.description")}</SectionLabel>
          <textarea
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            placeholder={t("diagnosis.form.description.placeholder")}
            className="textarea"
          />
        </div>

        {/* Primary Pain Points */}
        <div>
          <SectionLabel>{t("diagnosis.form.painPoints")}</SectionLabel>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            {t("diagnosis.form.painPoints.desc")}
          </p>
          <TagGroup>
            {PAIN_POINT_OPTIONS.map((painPoint) => (
              <TagPill
                key={painPoint}
                active={primaryPainPoint.includes(painPoint)}
                onClick={() => handleTogglePainPoint(painPoint)}
              >
                {optionLabel(painPoint)}
              </TagPill>
            ))}
          </TagGroup>
        </div>

        {/* Screenshot Upload (Placeholder) */}
        <div>
          <SectionLabel>{t("diagnosis.screenshot.title")}</SectionLabel>
          <div
            className={cn(
              "border-2 border-dashed border-[var(--color-border)] rounded-2xl p-8",
              "flex flex-col items-center justify-center gap-3",
              "text-[var(--color-text-secondary)]",
              "cursor-pointer hover:border-[var(--color-accent-mist-blue)] transition-colors"
            )}
          >
            <Upload className="w-8 h-8" />
            <span className="text-sm">{t("diagnosis.screenshot.desc")}</span>
          </div>
        </div>

        {/* Submit Button */}
        <LiquidButton
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          <span>{isLoading ? t("diagnosis.form.loading") : t("diagnosis.form.submit")}</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </LiquidButton>
      </div>
    </GlassCard>
  );
}

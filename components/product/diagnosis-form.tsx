// ============================================================
// Vibe Design Translator - Diagnosis Form Component
// ============================================================

"use client";

import { useState } from "react";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { SectionLabel } from "@/components/ui/section-heading";
import { PAIN_POINT_OPTIONS, PAGE_TYPE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TagGroup, TagPill } from "@/components/ui/tag-pill";
import { Upload, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/use-i18n";

interface DiagnosisFormProps {
  onSubmit: (data: {
    pageType: string;
    pageDescription: string;
    primaryPainPoint: string;
  }) => void;
  isLoading: boolean;
}

export function DiagnosisForm({ onSubmit, isLoading }: DiagnosisFormProps) {
  const [pageType, setPageType] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [primaryPainPoint, setPrimaryPainPoint] = useState<string[]>([]);
  const { t } = useI18n();

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
          <SectionLabel>{t("diagnosis_form_page_type")}</SectionLabel>
          <select
            value={pageType}
            onChange={(e) => setPageType(e.target.value)}
            className="select"
          >
            <option value="">{t("diagnosis_form_page_type_placeholder")}</option>
            {PAGE_TYPE_OPTIONS.map((pt) => (
              <option key={pt.value} value={pt.value}>{t(pt.tKey)}</option>
            ))}
          </select>
        </div>

        {/* Page Description */}
        <div>
          <SectionLabel>{t("diagnosis_form_desc_label")}</SectionLabel>
          <textarea
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            placeholder={t("diagnosis_form_desc_placeholder")}
            className="textarea"
          />
        </div>

        {/* Primary Pain Points */}
        <div>
          <SectionLabel>{t("diagnosis_form_pain_label")}</SectionLabel>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            {t("diagnosis_form_pain_helper")}
          </p>
          <TagGroup>
            {PAIN_POINT_OPTIONS.map((painPoint) => (
              <TagPill
                key={painPoint.value}
                active={primaryPainPoint.includes(painPoint.value)}
                onClick={() => handleTogglePainPoint(painPoint.value)}
              >
                {t(painPoint.tKey)}
              </TagPill>
            ))}
          </TagGroup>
        </div>

        {/* Submit Button */}
        <LiquidButton
          onClick={handleSubmit}
          className="w-full"
          size="lg"
          isLoading={isLoading}
        >
          <span>{isLoading ? t("diagnosis_form_submit_loading") : t("diagnosis_form_submit")}</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </LiquidButton>
      </div>
    </GlassCard>
  );
}
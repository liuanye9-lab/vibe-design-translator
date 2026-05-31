// ============================================================
// Vibe Design Translator - Diagnosis Form Component
// ============================================================

"use client";

import { useState } from "react";
import { GlassCard, GlassCardContent } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { SectionLabel } from "@/components/ui/section-heading";
import { PAIN_POINT_OPTIONS } from "@/lib/constants";
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
          <SectionLabel>Page Type</SectionLabel>
          <select
            value={pageType}
            onChange={(e) => setPageType(e.target.value)}
            className="select"
          >
            <option value="">Select page type</option>
            <option value="landing-page">Landing Page</option>
            <option value="product-page">Product Page</option>
            <option value="pricing-page">Pricing Page</option>
            <option value="about-page">About Page</option>
            <option value="contact-page">Contact Page</option>
            <option value="blog-post">Blog Post</option>
            <option value="dashboard">Dashboard</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Page Description */}
        <div>
          <SectionLabel>Page Description</SectionLabel>
          <textarea
            value={pageDescription}
            onChange={(e) => setPageDescription(e.target.value)}
            placeholder="Describe your current page. What is it for? What does it contain?"
            className="textarea"
          />
        </div>

        {/* Primary Pain Points */}
        <div>
          <SectionLabel>Primary Pain Points</SectionLabel>
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            Select all that apply
          </p>
          <TagGroup>
            {PAIN_POINT_OPTIONS.map((painPoint) => (
              <TagPill
                key={painPoint}
                active={primaryPainPoint.includes(painPoint)}
                onClick={() => handleTogglePainPoint(painPoint)}
              >
                {painPoint}
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
          <span>{isLoading ? "Analyzing..." : "Run Diagnosis"}</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </LiquidButton>
      </div>
    </GlassCard>
  );
}
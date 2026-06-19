// ============================================================
// Vibe Design Translator - Patterns Page
// ============================================================

"use client";

import { useState, useMemo } from "react";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { PatternCard } from "@/components/product/pattern-card";
import { PatternDetailDrawer } from "@/components/product/pattern-detail-drawer";
import { GlassCard } from "@/components/ui/glass-card";
import { TagGroup, TagPill } from "@/components/ui/tag-pill";
import { DESIGN_PATTERNS, PATTERN_CATEGORIES, PatternCategory } from "@/lib/design-patterns";
import { MATERIAL_ASSETS, MATERIAL_SOURCES } from "@/lib/material-library";
import {
  getPatternCategoryLabel,
  localizePatterns,
} from "@/lib/design-pattern-i18n";
import { DesignPattern } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";
import { AlertTriangle, Pause, Play, Search } from "lucide-react";

export default function PatternsPage() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory>("All");
  const [selectedSourceId, setSelectedSourceId] = useState<string>("All");
  const [selectedMediaKind, setSelectedMediaKind] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);
  const [animatedPreview, setAnimatedPreview] = useState(true);

  const filteredPatterns = useMemo(() => {
    let patterns = localizePatterns(DESIGN_PATTERNS, locale);

    if (selectedCategory !== "All") {
      patterns = patterns.filter((p) => p.category === selectedCategory);
    }

    if (selectedSourceId !== "All") {
      const patternIds = new Set(
        MATERIAL_ASSETS
          .filter((asset) => asset.sourceId === selectedSourceId)
          .map((asset) => asset.patternId)
      );
      patterns = patterns.filter((pattern) => patternIds.has(pattern.id));
    }

    if (selectedMediaKind !== "All") {
      const patternIds = new Set(
        MATERIAL_ASSETS
          .filter((asset) => asset.mediaKind === selectedMediaKind)
          .map((asset) => asset.patternId)
      );
      patterns = patterns.filter((pattern) => patternIds.has(pattern.id));
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      patterns = patterns.filter((pattern) => {
        const material = MATERIAL_ASSETS.find((asset) => asset.patternId === pattern.id);
        const searchable = [
          pattern.name,
          getPatternCategoryLabel(pattern.category, locale),
          ...pattern.suitableFor,
          ...pattern.visualTraits,
          material?.title,
          material?.motionSpec,
          ...(material?.tags || []),
          ...(material?.designSignals || []),
        ].join(" ").toLowerCase();

        return searchable.includes(query);
      });
    }

    return patterns;
  }, [locale, searchQuery, selectedCategory, selectedMediaKind, selectedSourceId]);

  const mediaFilters = [
    { id: "All", label: locale === "zh" ? "全部媒介" : "All media" },
    { id: "css-motion", label: locale === "zh" ? "CSS 动效" : "CSS motion" },
    { id: "animated-gif", label: locale === "zh" ? "动图思路" : "GIF ideas" },
    { id: "video", label: locale === "zh" ? "视频/录屏" : "Video" },
    { id: "static-image", label: locale === "zh" ? "静态图片" : "Static" },
    { id: "reference-link", label: locale === "zh" ? "参考链接" : "Link" },
  ];

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              {t("patterns_tag")}
            </SectionLabel>

            <SectionHeading subtitle={t("patterns_subtitle")}>
              {t("patterns_title")}
            </SectionHeading>
          </div>

          {/* Search and filter */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("patterns_search")}
                  className="input pl-12"
                />
              </div>
              <button
                type="button"
                onClick={() => setAnimatedPreview((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/70 px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-white"
              >
                {animatedPreview ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {animatedPreview
                  ? locale === "zh"
                    ? "动效预览"
                    : "Motion preview"
                  : locale === "zh"
                  ? "静态预览"
                  : "Static preview"}
              </button>
            </div>

            {/* Category filter */}
            <TagGroup>
              {PATTERN_CATEGORIES.map((category) => (
                <TagPill
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getPatternCategoryLabel(category, locale)}
                </TagPill>
              ))}
            </TagGroup>

            <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-white/55 p-4">
              <div>
                <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
                  {locale === "zh" ? "按素材来源筛选" : "Filter by source"}
                </p>
                <TagGroup>
                  <TagPill
                    active={selectedSourceId === "All"}
                    onClick={() => setSelectedSourceId("All")}
                  >
                    {locale === "zh" ? "全部来源" : "All sources"}
                  </TagPill>
                  {MATERIAL_SOURCES.map((source) => (
                    <TagPill
                      key={source.id}
                      active={selectedSourceId === source.id}
                      onClick={() => setSelectedSourceId(source.id)}
                    >
                      {source.name}
                    </TagPill>
                  ))}
                </TagGroup>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
                  {locale === "zh" ? "按素材媒介筛选" : "Filter by media"}
                </p>
                <TagGroup>
                  {mediaFilters.map((filter) => (
                    <TagPill
                      key={filter.id}
                      active={selectedMediaKind === filter.id}
                      onClick={() => setSelectedMediaKind(filter.id)}
                    >
                      {filter.label}
                    </TagPill>
                  ))}
                </TagGroup>
              </div>
            </div>
          </div>

          {/* Patterns grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                animatedPreview={animatedPreview}
                onSelect={() => setSelectedPattern(pattern)}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredPatterns.length === 0 && (
            <GlassCard className="p-8 text-center">
              <p className="text-[var(--color-text-secondary)]">
                {t("patterns_empty")}
              </p>
            </GlassCard>
          )}

          {/* Disclaimer */}
          <GlassCard className="p-6 mt-8 bg-[var(--color-surface)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--color-accent-mist-blue)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  {t("patterns_disclaimer_title")}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {t("patterns_disclaimer_desc")}
                </p>
              </div>
            </div>
          </GlassCard>
        </PageContainer>
      </PageWrapper>

      {/* Pattern detail drawer */}
      <PatternDetailDrawer
        pattern={selectedPattern}
        isOpen={!!selectedPattern}
        onClose={() => setSelectedPattern(null)}
      />
    </AppShell>
  );
}

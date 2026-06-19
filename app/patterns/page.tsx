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
import {
  getPatternCategoryLabel,
  localizePatterns,
} from "@/lib/design-pattern-i18n";
import { DesignPattern } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";
import { Search, AlertTriangle } from "lucide-react";

export default function PatternsPage() {
  const { t, locale } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);

  const filteredPatterns = useMemo(() => {
    let patterns = localizePatterns(DESIGN_PATTERNS, locale);

    if (selectedCategory !== "All") {
      patterns = patterns.filter((p) => p.category === selectedCategory);
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      patterns = patterns.filter((pattern) => {
        const searchable = [
          pattern.name,
          getPatternCategoryLabel(pattern.category, locale),
          ...pattern.suitableFor,
          ...pattern.visualTraits,
        ].join(" ").toLowerCase();

        return searchable.includes(query);
      });
    }

    return patterns;
  }, [locale, selectedCategory, searchQuery]);

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
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("patterns_search")}
                className="input pl-12"
              />
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
          </div>

          {/* Patterns grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
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

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
import { DESIGN_PATTERNS, PATTERN_CATEGORIES, PatternCategory, searchPatterns } from "@/lib/design-patterns";
import { DesignPattern } from "@/lib/types";
import { Search, AlertTriangle } from "lucide-react";

export default function PatternsPage() {
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);

  const filteredPatterns = useMemo(() => {
    let patterns = DESIGN_PATTERNS;

    // Filter by category
    if (selectedCategory !== "All") {
      patterns = patterns.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      patterns = searchPatterns(searchQuery).filter(
        (p) => selectedCategory === "All" || p.category === selectedCategory
      );
    }

    return patterns;
  }, [selectedCategory, searchQuery]);

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              Design Patterns Library
            </SectionLabel>

            <SectionHeading subtitle="12 original design patterns with abstract signals and implementation guidance. No third-party assets.">
              Pattern Library
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
                placeholder="Search patterns..."
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
                  {category}
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
                No patterns found matching your search.
              </p>
            </GlassCard>
          )}

          {/* Disclaimer */}
          <GlassCard className="p-6 mt-8 bg-[var(--color-surface)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[var(--color-accent-mist-blue)] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                  Design Pattern Disclaimer
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  This library contains abstract design signals and original implementation guidance only. No third-party screenshots, logos, or trademarked materials are stored or referenced. All patterns are designed to help you avoid generic AI-generated UI while maintaining originality.
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
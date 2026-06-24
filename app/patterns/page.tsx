// ============================================================
// Vibe Design Translator - Material Library Index
// ============================================================

"use client";

import { ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell, PageContainer, PageWrapper } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { TagGroup, TagPill } from "@/components/ui/tag-pill";
import {
  MATERIAL_ASSETS,
  MATERIAL_CATEGORIES,
  MATERIAL_CATEGORY_PLAYBOOKS,
  MATERIAL_SOURCES,
} from "@/lib/material-library";
import type { MaterialAsset, MaterialCategory } from "@/lib/types";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Filter,
  Search,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

type CategoryFilter = "all" | MaterialCategory;
type SourceFilter = "all" | string;
type MediaFilter = "all" | MaterialAsset["mediaKind"];

const mediaFilters: Array<{ id: MediaFilter; label: string }> = [
  { id: "all", label: "全部媒介" },
  { id: "css-motion", label: "CSS 动效" },
  { id: "animated-gif", label: "动图/动效思路" },
  { id: "video", label: "视频/录屏" },
  { id: "static-image", label: "静态图像" },
  { id: "reference-link", label: "参考链接" },
];

const qualityFilters = [
  { id: "all", label: "全部质量" },
  { id: "90", label: "90+ 高价值" },
  { id: "85", label: "85+ 可迁移" },
] as const;

export default function PatternsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sourceId, setSourceId] = useState<SourceFilter>("all");
  const [mediaKind, setMediaKind] = useState<MediaFilter>("all");
  const [quality, setQuality] = useState<(typeof qualityFilters)[number]["id"]>("all");

  const filteredAssets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return MATERIAL_ASSETS.filter((asset) => {
      if (category !== "all" && asset.category !== category) return false;
      if (sourceId !== "all" && asset.sourceId !== sourceId) return false;
      if (mediaKind !== "all" && asset.mediaKind !== mediaKind) return false;
      if (quality !== "all" && (asset.qualityScore || 80) < Number(quality)) return false;

      if (!normalizedQuery) return true;

      const source = MATERIAL_SOURCES.find((item) => item.id === asset.sourceId);
      const searchable = [
        asset.title,
        asset.motionSpec,
        asset.recommendationAngle,
        asset.category,
        asset.mediaKind,
        source?.name,
        source?.signal,
        ...asset.useWhen,
        ...asset.avoidWhen,
        ...asset.designSignals,
        ...asset.frontendNotes,
        ...(asset.implementationRules || []),
        ...(asset.pitfalls || []),
        ...(asset.examples || []),
        ...asset.tags,
        ...asset.directionFit,
      ].join(" ").toLowerCase();

      return searchable.includes(normalizedQuery);
    }).sort((a, b) => (b.qualityScore || 80) - (a.qualityScore || 80));
  }, [category, mediaKind, quality, query, sourceId]);

  const categoryStats = useMemo(() => {
    return MATERIAL_CATEGORIES.filter((item) => item.id !== "all").map((item) => ({
      ...item,
      count: MATERIAL_ASSETS.filter((asset) => asset.category === item.id).length,
    }));
  }, []);

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <section className="mb-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--color-accent-ios-blue)]">
                Frontend Material Library
              </p>
              <h1 className="text-3xl font-black leading-tight text-[var(--color-text-primary)]">
                前端设计素材库
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-secondary)]">
                这里沉淀动效、配色、UI、布局、字体等可迁移素材。每个条目都包含来源、适用场景、避坑边界和前端实现规则，Agent 会基于这些素材生成推荐和 Blueprint。
              </p>
            </div>
            <GlassCard className="grid grid-cols-3 gap-3 p-4">
              <LibraryMetric label="素材条目" value={String(MATERIAL_ASSETS.length)} />
              <LibraryMetric label="素材来源" value={String(MATERIAL_SOURCES.length)} />
              <LibraryMetric label="设计分类" value="5" />
            </GlassCard>
          </section>

          <section className="mb-6 grid gap-3 md:grid-cols-5">
            {categoryStats.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id as MaterialCategory)}
                className={`rounded-2xl border p-4 text-left transition-colors ${
                  category === item.id
                    ? "border-[var(--color-accent-ios-blue)] bg-white"
                    : "border-[var(--color-border)] bg-white/65 hover:bg-white"
                }`}
              >
                <p className="text-xs font-bold text-[var(--color-accent-ios-blue)]">{item.count} 条</p>
                <h2 className="mt-1 font-black text-[var(--color-text-primary)]">{item.label}</h2>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </button>
            ))}
          </section>

          <GlassCard className="mb-8 p-4">
            <div className="mb-4 flex items-center gap-2 text-sm font-black text-[var(--color-text-primary)]">
              <Filter className="h-4 w-4 text-[var(--color-accent-ios-blue)]" />
              素材检索与筛选
            </div>

            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索 GSAP、字体、配色 token、Agent 工作台、首屏动效..."
                  className="input pl-12"
                />
              </div>
              <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-ios-blue)] px-4 py-3 text-sm font-black text-white">
                让 Agent 推荐
                <Sparkles className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              <FilterGroup label="分类">
                {MATERIAL_CATEGORIES.map((item) => (
                  <TagPill
                    key={item.id}
                    active={category === item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </TagPill>
                ))}
              </FilterGroup>

              <FilterGroup label="来源">
                <TagPill active={sourceId === "all"} onClick={() => setSourceId("all")}>全部来源</TagPill>
                {MATERIAL_SOURCES.map((source) => (
                  <TagPill key={source.id} active={sourceId === source.id} onClick={() => setSourceId(source.id)}>
                    {source.name}
                  </TagPill>
                ))}
              </FilterGroup>

              <FilterGroup label="媒介">
                {mediaFilters.map((filter) => (
                  <TagPill key={filter.id} active={mediaKind === filter.id} onClick={() => setMediaKind(filter.id)}>
                    {filter.label}
                  </TagPill>
                ))}
              </FilterGroup>

              <FilterGroup label="质量">
                {qualityFilters.map((filter) => (
                  <TagPill key={filter.id} active={quality === filter.id} onClick={() => setQuality(filter.id)}>
                    {filter.label}
                  </TagPill>
                ))}
              </FilterGroup>
            </div>
          </GlassCard>

          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-[var(--color-text-secondary)]">
              当前匹配 <span className="text-[var(--color-text-primary)]">{filteredAssets.length}</span> 个素材
            </p>
            <Link href="/inspiration" className="inline-flex items-center gap-2 text-sm font-black text-[var(--color-accent-ios-blue)]">
              查看设计框架
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {filteredAssets.length === 0 ? (
            <GlassCard className="p-10 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">没有找到匹配素材，试试放宽分类、来源或质量筛选。</p>
            </GlassCard>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredAssets.map((asset) => (
                <MaterialIndexCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}

          <section className="mt-10 grid gap-5 lg:grid-cols-5">
            {MATERIAL_CATEGORY_PLAYBOOKS.map((playbook) => (
              <GlassCard key={playbook.id} className="p-4">
                <BookOpen className="mb-3 h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                <h2 className="font-black text-[var(--color-text-primary)]">{playbook.label}</h2>
                <p className="mt-2 text-xs leading-5 text-[var(--color-text-secondary)]">{playbook.role}</p>
              </GlassCard>
            ))}
          </section>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

function LibraryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-4">
      <p className="text-xs font-bold text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-2 text-3xl font-black text-[var(--color-text-primary)]">{value}</p>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-[var(--color-text-secondary)]">{label}</p>
      <TagGroup>{children}</TagGroup>
    </div>
  );
}

function MaterialIndexCard({ asset }: { asset: MaterialAsset }) {
  const source = MATERIAL_SOURCES.find((item) => item.id === asset.sourceId);
  const detailHref = `/materials/${asset.id}`;

  return (
    <GlassCard className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black text-[var(--color-accent-ios-blue)]">{source?.name || asset.sourceId}</p>
          <h2 className="mt-1 text-lg font-black leading-snug text-[var(--color-text-primary)]">{asset.title}</h2>
        </div>
        <span className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs font-black text-[var(--color-text-secondary)]">
          {asset.qualityScore || 80}
        </span>
      </div>

      <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
        {asset.recommendationAngle || asset.motionSpec}
      </p>

      <div className="mt-4 grid gap-2 text-xs leading-5 text-[var(--color-text-secondary)]">
        <div className="rounded-xl bg-white/60 p-3">
          <p className="mb-1 font-black text-[var(--color-text-primary)]">适用</p>
          {asset.useWhen.slice(0, 2).join("、")}
        </div>
        <div className="rounded-xl bg-rose-50/70 p-3">
          <p className="mb-1 flex items-center gap-1 font-black text-rose-600">
            <ShieldAlert className="h-3.5 w-3.5" />
            避坑
          </p>
          {(asset.pitfalls?.length ? asset.pitfalls : asset.avoidWhen).slice(0, 2).join("、")}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {[asset.category, asset.mediaKind, ...asset.tags].filter(Boolean).slice(0, 5).map((tag) => (
          <span key={tag} className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs font-bold text-[var(--color-text-secondary)]">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-5">
        <Link href={detailHref} className="inline-flex items-center gap-2 text-sm font-black text-[var(--color-accent-ios-blue)]">
          查看详情
          <ArrowRight className="h-4 w-4" />
        </Link>
        {source && (
          <Link href={source.href} target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)]">
            来源
            <ExternalLink className="h-4 w-4" />
          </Link>
        )}
      </div>
    </GlassCard>
  );
}

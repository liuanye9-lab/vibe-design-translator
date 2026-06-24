"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell, PageContainer, PageWrapper } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { MATERIAL_ASSETS, getMaterialSourceById } from "@/lib/material-library";
import type { MaterialAsset } from "@/lib/types";
import { Bookmark, ExternalLink, FolderOpen, Trash2 } from "lucide-react";

const favoriteStorageKey = "vibe_material_favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(favoriteStorageKey);
      setFavoriteIds(saved ? JSON.parse(saved) : []);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  const favoriteAssets = useMemo(() => {
    const idSet = new Set(favoriteIds);
    return MATERIAL_ASSETS.filter((asset) => idSet.has(asset.id));
  }, [favoriteIds]);

  function removeFavorite(id: string) {
    const next = favoriteIds.filter((item) => item !== id);
    setFavoriteIds(next);
    window.localStorage.setItem(favoriteStorageKey, JSON.stringify(next));
  }

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-ios-blue)]">
                Favorites
              </p>
              <h1 className="text-3xl font-black text-[var(--color-text-primary)]">我的素材收藏</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
                这里保存主页和素材库中标记过的设计素材，方便你把灵感沉淀成项目可复用的前端方向。
              </p>
            </div>
            <Link href="/patterns" className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-bold text-[var(--color-text-primary)]">
              <FolderOpen className="h-4 w-4" />
              继续浏览素材库
            </Link>
          </div>

          {favoriteAssets.length === 0 ? (
            <GlassCard className="p-10 text-center">
              <Bookmark className="mx-auto mb-4 h-10 w-10 text-[var(--color-text-muted)]" />
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">还没有收藏素材</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">
                回到首页或素材库，点击素材卡片右上角的收藏按钮，这里会立刻同步显示。
              </p>
              <Link href="/" className="mt-5 inline-flex rounded-xl bg-[var(--color-accent-ios-blue)] px-4 py-2 text-sm font-bold text-white">
                打开 Agent 推荐页
              </Link>
            </GlassCard>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {favoriteAssets.map((asset) => (
                <FavoriteCard key={asset.id} asset={asset} onRemove={() => removeFavorite(asset.id)} />
              ))}
            </div>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

function FavoriteCard({ asset, onRemove }: { asset: MaterialAsset; onRemove: () => void }) {
  const source = getMaterialSourceById(asset.sourceId);
  const href = source?.href || "/patterns";

  return (
    <GlassCard className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-[var(--color-accent-ios-blue)]">{source?.name || asset.sourceId}</p>
          <h2 className="mt-1 text-lg font-black text-[var(--color-text-primary)]">{asset.title}</h2>
        </div>
        <button type="button" onClick={onRemove} className="rounded-lg p-2 text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-500" aria-label="移除收藏">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <p className="flex-1 text-sm leading-6 text-[var(--color-text-secondary)]">
        {asset.recommendationAngle || asset.motionSpec}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[asset.category, ...asset.tags].filter(Boolean).slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs font-bold text-[var(--color-text-secondary)]">
            {tag}
          </span>
        ))}
      </div>
      <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent-ios-blue)]">
        打开来源
        <ExternalLink className="h-4 w-4" />
      </Link>
    </GlassCard>
  );
}

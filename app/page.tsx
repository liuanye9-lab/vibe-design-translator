// ============================================================
// Vibe Design Translator - Agent Material Workbench
// ============================================================

"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Folder,
  Grid2X2,
  History,
  Image as ImageIcon,
  LayoutGrid,
  Lightbulb,
  List,
  Palette,
  Paperclip,
  Play,
  Send,
  Settings,
  Sparkles,
  Star,
  Type,
  WandSparkles,
} from "lucide-react";
import {
  MATERIAL_ASSETS,
  MATERIAL_SOURCES,
  getMaterialSourceById,
  searchMaterialAssets,
} from "@/lib/material-library";
import type { MaterialAgentBlueprintRow, MaterialAgentResult, MaterialAsset, MaterialCategory } from "@/lib/types";

type MaterialTab = "recommend" | MaterialCategory;
type NavItem = "recommend" | "library" | "projects" | "favorites" | "inspiration" | "settings";
type ViewMode = "grid" | "list";
type PreviewKind = "flow" | "phones" | "particles" | "hero" | "portfolio" | "palette";
type SourceFilter = "all" | string;
type MediaFilter = "all" | MaterialAsset["mediaKind"];

type ChatMessage = {
  role: "user" | "agent";
  text: string;
  time: string;
};

const seedPrompt =
  "我正在做一个 AI 助手产品的官网，想要科技感、专业、同时要有亲和力，可以帮我推荐一些动效、配色和布局参考吗？希望首屏要有记忆点。";

const navItems: Array<{ id: NavItem; label: string; href: string; icon: typeof Sparkles }> = [
  { id: "recommend", label: "推荐", href: "/", icon: Sparkles },
  { id: "library", label: "素材库", href: "/patterns", icon: Folder },
  { id: "projects", label: "项目", href: "/workspace", icon: LayoutGrid },
  { id: "favorites", label: "收藏", href: "/favorites", icon: Star },
  { id: "inspiration", label: "灵感", href: "/inspiration", icon: Lightbulb },
  { id: "settings", label: "设置", href: "/settings", icon: Settings },
];

const tabs: Array<{ id: MaterialTab; label: string }> = [
  { id: "recommend", label: "素材推荐" },
  { id: "motion", label: "动效" },
  { id: "color", label: "配色" },
  { id: "typography", label: "字体" },
  { id: "layout", label: "布局" },
];

const quickNeeds = [
  { title: "动效设计", desc: "需要微交互和动效建议", icon: WandSparkles, tone: "blue" },
  { title: "视觉色彩搭配", desc: "科技感配色方案推荐", icon: Palette, tone: "sky" },
  { title: "UI 设计", desc: "界面组件与风格参考", icon: LayoutGrid, tone: "orange" },
  { title: "布局排版", desc: "信息层级与版式建议", icon: Grid2X2, tone: "green" },
  { title: "字体选择", desc: "中英文字体搭配建议", icon: Type, tone: "pink" },
];

const mediaFilters: Array<{ id: MediaFilter; label: string }> = [
  { id: "all", label: "全部媒介" },
  { id: "css-motion", label: "CSS 动效" },
  { id: "animated-gif", label: "动图思路" },
  { id: "video", label: "视频/录屏" },
  { id: "static-image", label: "静态图片" },
  { id: "reference-link", label: "参考链接" },
];

const sceneFilters = [
  { id: "all", label: "全部场景", query: "" },
  { id: "hero", label: "首屏/英雄区", query: "首屏 hero Hero 官网" },
  { id: "ai", label: "AI 产品", query: "AI Agent 智能" },
  { id: "dashboard", label: "工作台", query: "工作台 dashboard 控制台" },
  { id: "brand", label: "品牌官网", query: "品牌 官网 作品集" },
] as const;

const favoriteStorageKey = "vibe_material_favorites";

const defaultBlueprintRows: MaterialAgentBlueprintRow[] = [
  {
    rank: "1",
    title: "Hero 区粒子动效 + 渐变背景",
    tags: ["动效设计", "首屏"],
    reason: "快速建立科技感与产品差异化，增强冲击力与记忆点。",
    difficulty: 4,
    result: "提升品牌记忆度 +35%",
    color: "blue",
  },
  {
    rank: "2",
    title: "科技蓝柔和配色方案",
    tags: ["配色", "品牌调性"],
    reason: "平衡科技感与亲和力，降低用户心理距离，提升信任感。",
    difficulty: 3,
    result: "提升用户信任度 +28%",
    color: "green",
  },
  {
    rank: "3",
    title: "卡片式信息层级布局",
    tags: ["布局排版", "信息架构"],
    reason: "清晰的信息层级，帮助用户快速理解产品价值与功能。",
    difficulty: 3,
    result: "提升信息理解速率 +40%",
    color: "orange",
  },
];

export default function HomePage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<MaterialTab>("recommend");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [sceneFilter, setSceneFilter] = useState<(typeof sceneFilters)[number]["id"]>("all");
  const [query, setQuery] = useState(seedPrompt);
  const [isThinking, setIsThinking] = useState(false);
  const [agentStatus, setAgentStatus] = useState("Agnes AI 已连接素材库");
  const [quickNeedOffset, setQuickNeedOffset] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recommendedIds, setRecommendedIds] = useState<string[]>(
    searchMaterialAssets(seedPrompt).slice(0, 6).map((asset) => asset.id)
  );
  const [summaryItems, setSummaryItems] = useState([
    "动态粒子与流线：营造 AI 感与未来感",
    "柔和渐变配色：科技感 + 亲和感，降低冷感",
    "卡片式信息层级：提升专业感与可读性",
    "微交互反馈：增强产品可信度与趣味性",
  ]);
  const [blueprintRows, setBlueprintRows] = useState<MaterialAgentBlueprintRow[]>(defaultBlueprintRows);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "user", text: seedPrompt, time: "10:21" },
    {
      role: "agent",
      text: "好的，已理解你的需求：AI 助手官网、科技感、专业且亲和，首屏记忆点突出。为你推荐以下设计方向与素材参考，涵盖动效、配色、布局与实现要点。",
      time: "10:21",
    },
  ]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(favoriteStorageKey);
      setFavoriteIds(saved ? JSON.parse(saved) : []);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  const visibleCards = useMemo(() => {
    const recommended = recommendedIds
      .map((id) => MATERIAL_ASSETS.find((asset) => asset.id === id))
      .filter((asset): asset is MaterialAsset => Boolean(asset));
    const base = activeTab === "recommend"
      ? (recommended.length ? recommended : MATERIAL_ASSETS)
      : MATERIAL_ASSETS.filter((asset) => asset.category === activeTab);
    const scene = sceneFilters.find((item) => item.id === sceneFilter);
    const sceneQuery = scene?.query.toLowerCase() || "";

    return base
      .filter((asset) => sourceFilter === "all" || asset.sourceId === sourceFilter)
      .filter((asset) => mediaFilter === "all" || asset.mediaKind === mediaFilter)
      .filter((asset) => {
        if (!sceneQuery) return true;
        const searchable = [
          asset.title,
          asset.motionSpec,
          asset.recommendationAngle,
          ...asset.useWhen,
          ...asset.tags,
          ...asset.designSignals,
        ].join(" ").toLowerCase();
        return sceneQuery.split(" ").some((word) => word && searchable.includes(word));
      })
      .slice(0, 9);
  }, [activeTab, mediaFilter, recommendedIds, sceneFilter, sourceFilter]);

  const displayedQuickNeeds = useMemo(() => {
    return quickNeeds.map((_, index) => quickNeeds[(index + quickNeedOffset) % quickNeeds.length]);
  }, [quickNeedOffset]);

  function toggleFavorite(assetId: string) {
    setFavoriteIds((current) => {
      const next = current.includes(assetId)
        ? current.filter((id) => id !== assetId)
        : [assetId, ...current];
      window.localStorage.setItem(favoriteStorageKey, JSON.stringify(next));
      setAgentStatus(next.includes(assetId) ? "已加入收藏，可在收藏页查看" : "已从收藏中移除");
      return next;
    });
  }

  function handleFilePick(file?: File) {
    if (!file) return;
    setAgentStatus(`已选择「${file.name}」，下一步可接入素材解析与 Agent 分析`);
  }

  function enhancePrompt() {
    const enhanced = `${query.trim() || seedPrompt}\n\n请从动效、配色 token、UI 组件、布局排版、字体选择、适用场景、避坑和前端实现规则七个维度推荐素材，并给出可执行 Blueprint。`;
    setQuery(enhanced.slice(0, 1000));
    setAgentStatus("已增强需求描述，发送后 Agnes 会按完整维度推荐");
  }

  function exportBlueprint() {
    const payload = {
      exportedAt: new Date().toISOString(),
      query,
      summaryItems,
      recommendedCardIds: recommendedIds,
      blueprintRows,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `vibe-blueprint-${Date.now()}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = query.trim();
    if (!next || isThinking) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: next, time: "10:21" },
    ]);
    setIsThinking(true);
    setAgentStatus("Agnes 正在检索素材库并生成 Blueprint...");
    setActiveTab("recommend");

    try {
      const response = await fetch("/api/ai/material-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: next }),
      });
      const payload = await response.json() as { success: boolean; data?: MaterialAgentResult; error?: { message?: string } };
      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error?.message || "Agnes 返回异常");
      }
      const data = payload.data;

      setMessages((current) => [
        ...current,
        { role: "agent", text: data.reply, time: "10:21" },
      ]);
      setRecommendedIds(data.recommendedCardIds);
      setSummaryItems(data.summaryItems);
      setBlueprintRows(data.blueprintRows);
      setAgentStatus(data.fallback ? "Agnes 暂不可用，已使用本地素材库兜底" : "Agnes 已生成动态推荐");
    } catch (error) {
      const fallbackAssets = searchMaterialAssets(next).slice(0, 6);
      setMessages((current) => [
        ...current,
        {
          role: "agent",
          text: `Agnes 请求没有成功，我先用本地素材库给出可执行推荐：${fallbackAssets.slice(0, 3).map((asset) => asset.title).join("、")}。`,
          time: "10:21",
        },
      ]);
      setRecommendedIds(fallbackAssets.map((asset) => asset.id));
      setSummaryItems(fallbackAssets.slice(0, 4).map((asset) => `${asset.title}：${asset.recommendationAngle || asset.motionSpec}`));
      setBlueprintRows(defaultBlueprintRows);
      setAgentStatus(error instanceof Error ? `Agnes 调用失败：${error.message}` : "Agnes 调用失败，已使用本地兜底");
    } finally {
      setIsThinking(false);
    }
  }

  return (
    <main className="design-agent-app">
      <TopBar />

      <div className={sideCollapsed ? "design-agent-body side-collapsed-layout" : "design-agent-body"}>
        <aside className={sideCollapsed ? "agent-side-nav agent-side-nav-collapsed" : "agent-side-nav"} aria-label="主导航">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={active ? "side-nav-item side-nav-item-active" : "side-nav-item"}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            className="side-collapse"
            type="button"
            aria-label={sideCollapsed ? "展开侧栏" : "收起侧栏"}
            onClick={() => setSideCollapsed((value) => !value)}
          >
            {sideCollapsed ? "»" : "«"}
          </button>
        </aside>

        <section className="agent-chat-workspace" aria-label="AI 设计推荐 Agent">
          <header className="agent-profile">
            <div className="brand-avatar">V</div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1>AI 设计推荐 Agent</h1>
                <span className="online-pill">在线</span>
              </div>
              <p>{agentStatus}</p>
            </div>
          </header>

          <div className="chat-stream">
            {messages.map((message, index) => (
              <ChatBubble key={`${message.role}-${index}-${message.text}`} message={message} />
            ))}

            <div className="agent-summary-card">
              <p className="summary-title">设计方向总结</p>
              {summaryItems.map((item) => (
                <div key={item} className="summary-row">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item}</span>
                </div>
              ))}
              {isThinking && (
                <div className="summary-row">
                  <Sparkles className="h-4 w-4" />
                  <span>Agnes 正在结合素材库生成动态推荐...</span>
                </div>
              )}
            </div>
          </div>

          <section className="quick-need-section">
            <div className="quick-need-title">
              <span>你也可以试试这些需求</span>
              <button type="button" onClick={() => setQuickNeedOffset((value) => value + 1)}>换一批</button>
            </div>
            <div className="quick-need-grid">
              {displayedQuickNeeds.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    className="quick-need-card"
                    onClick={() => setQuery(`${item.title}：${item.desc}`)}
                  >
                    <span className={`quick-need-icon quick-need-${item.tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.desc}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <form className="agent-composer" onSubmit={handleSubmit}>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={1000}
              placeholder="描述你的设计需求，Agent 会为你推荐最佳素材..."
            />
            <div className="composer-footer">
              <span>{query.length}/1000</span>
              <div className="composer-actions">
                <input
                  id="material-file-input"
                  type="file"
                  className="sr-only"
                  onChange={(event) => handleFilePick(event.target.files?.[0])}
                />
                <button type="button" aria-label="添加附件" onClick={() => document.getElementById("material-file-input")?.click()}><Paperclip className="h-4 w-4" /></button>
                <input
                  id="material-image-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => handleFilePick(event.target.files?.[0])}
                />
                <button type="button" aria-label="添加图片" onClick={() => document.getElementById("material-image-input")?.click()}><ImageIcon className="h-4 w-4" /></button>
                <button type="button" aria-label="智能增强" onClick={enhancePrompt}><Sparkles className="h-4 w-4" /></button>
                <button type="submit" className="send-button" aria-label="发送需求" disabled={isThinking}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          <p className="agent-footnote">由 Agnes AI 提供技术支持 · 内容生成可能存在误差，请结合实际需求判断</p>
        </section>

        <section className="material-workspace" aria-label="素材推荐工作台">
          <div className="workspace-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "workspace-tab workspace-tab-active" : "workspace-tab"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="filter-row">
            <label className="filter-select-shell">
              <span>来源</span>
              <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
                <option value="all">全部来源</option>
                {MATERIAL_SOURCES.map((source) => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4" />
            </label>
            <label className="filter-select-shell">
              <span>媒介</span>
              <select value={mediaFilter} onChange={(event) => setMediaFilter(event.target.value as MediaFilter)}>
                {mediaFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>{filter.label}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4" />
            </label>
            <label className="filter-select-shell">
              <span>场景</span>
              <select value={sceneFilter} onChange={(event) => setSceneFilter(event.target.value as (typeof sceneFilters)[number]["id"])}>
                {sceneFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>{filter.label}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4" />
            </label>
            <Link href="/patterns" className="filter-button">
              <Settings className="h-4 w-4" />
              高级筛选
            </Link>
            <div className="view-toggle">
              <button
                type="button"
                className={viewMode === "grid" ? "view-toggle-active" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 className="h-4 w-4" />
                网格
              </button>
              <button
                type="button"
                className={viewMode === "list" ? "view-toggle-active" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                列表
              </button>
            </div>
          </div>

          <div className={viewMode === "grid" ? "material-grid" : "material-list"}>
            {visibleCards.map((card) => (
              <MaterialCardView
                key={card.id}
                card={card}
                isFavorite={favoriteIds.includes(card.id)}
                onToggleFavorite={() => toggleFavorite(card.id)}
              />
            ))}
          </div>

          {visibleCards.length === 0 && (
            <div className="material-empty-state">
              当前筛选没有匹配素材，试试切换来源、媒介或场景
            </div>
          )}

          <BlueprintTable rows={blueprintRows} onExport={exportBlueprint} />
        </section>
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <header className="agent-topbar">
      <div className="topbar-brand">
        <div className="topbar-logo">V</div>
        <strong>Vibe Design Translator</strong>
        <span>AI 设计素材推荐专家</span>
      </div>

      <nav className="topbar-actions" aria-label="顶部操作">
        <Link href="/patterns"><Grid2X2 className="h-4 w-4" />素材库</Link>
        <Link href="/workspace"><History className="h-4 w-4" />历史记录</Link>
        <Link href="/favorites"><Star className="h-4 w-4" />收藏</Link>
        <Link href="/" className="smart-mode"><Sparkles className="h-4 w-4" />智能推荐模式<span /></Link>
        <Link href="/settings" className="icon-only" aria-label="通知"><Bell className="h-4 w-4" /></Link>
        <div className="user-avatar" aria-label="用户头像" />
      </nav>
    </header>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="chat-bubble-row chat-bubble-user">
        <span className="chat-time">{message.time}</span>
        <div className="chat-bubble">{message.text}</div>
      </div>
    );
  }

  return (
    <div className="chat-bubble-row chat-bubble-agent">
      <div className="mini-avatar">V</div>
      <div>
        <div className="agent-message-meta">
          <strong>Vibe Agent</strong>
          <span>{message.time}</span>
        </div>
        <div className="chat-bubble">{message.text}</div>
      </div>
    </div>
  );
}

function getPreviewKind(asset: MaterialAsset): PreviewKind {
  if (asset.previewKind) return asset.previewKind;
  if (asset.sourceId === "pageflows") return "flow";
  if (asset.sourceId === "mobbin") return "phones";
  if (asset.sourceId === "huemint" || asset.category === "color") return "palette";
  if (asset.sourceId === "awwwards") return "portfolio";
  if (asset.category === "motion") return "particles";
  return "hero";
}

function getIconText(asset: MaterialAsset) {
  if (asset.iconText) return asset.iconText;
  const source = getMaterialSourceById(asset.sourceId);
  if (source?.name === "v0 Templates") return "v0";
  return (source?.name || asset.sourceId).slice(0, 1).toUpperCase();
}

function MaterialCardView({
  card,
  isFavorite,
  onToggleFavorite,
}: {
  card: MaterialAsset;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const source = getMaterialSourceById(card.sourceId);
  const detailHref = `/materials/${card.id}`;
  const sourceHref = source?.href || "/patterns";
  const note = card.recommendationAngle || card.motionSpec;

  return (
    <article className="material-card">
      <div className="material-card-head">
        <div className="source-line">
          <span className="source-icon">{getIconText(card)}</span>
          <strong>{source?.name || card.sourceId}</strong>
          <em>{source?.signal || card.mediaKind}</em>
        </div>
        <button
          type="button"
          className={isFavorite ? "bookmark-button bookmark-button-active" : "bookmark-button"}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "取消收藏" : "收藏素材"}
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
      <Link href={detailHref} className="material-title">
        {card.title}
      </Link>
      <div className="material-tags">
        {[...(card.tags || []), ...(card.category ? [card.category] : [])].slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <Preview kind={getPreviewKind(card)} />
      <p className="material-note">参考要点：{note}</p>
      <div className="material-card-actions">
        <Link href={detailHref}>查看详情</Link>
        <Link href={sourceHref} target={sourceHref.startsWith("http") ? "_blank" : undefined}>打开来源</Link>
      </div>
    </article>
  );
}

function Preview({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "flow":
      return (
        <div className="preview-box flow-preview">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flow-node">
              <span />
              <b />
            </div>
          ))}
        </div>
      );
    case "phones":
      return (
        <div className="preview-box phones-preview">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className={item % 2 ? "phone light" : "phone dark"}>
              <span />
              <b />
              <i />
            </div>
          ))}
        </div>
      );
    case "particles":
      return (
        <div className="preview-box particle-preview">
          <span className="preview-play-indicator" aria-hidden="true"><Play className="h-5 w-5 fill-white" /></span>
          {Array.from({ length: 28 }).map((_, index) => <span key={index} style={{ "--i": index } as CSSProperties} />)}
        </div>
      );
    case "hero":
      return (
        <div className="preview-box hero-preview">
          <div>
            <span />
            <b />
            <i />
          </div>
          <section />
        </div>
      );
    case "portfolio":
      return (
        <div className="preview-box portfolio-preview">
          <div>Human<br />Unlimited</div>
          <div><span /></div>
          <div>BUILDING<br />DIGITAL<br />PRODUCTS</div>
        </div>
      );
    case "palette":
      return (
        <div className="preview-box palette-preview">
          {["#1769ff", "#a855f7", "#22c7d7", "#65d94a", "#ff7a1a", "#e8edf3"].map((color) => (
            <span key={color} style={{ background: color }} />
          ))}
        </div>
      );
  }
}

function BlueprintTable({ rows, onExport }: { rows: MaterialAgentBlueprintRow[]; onExport: () => void }) {
  return (
    <section className="blueprint-panel">
      <div className="blueprint-title">
        <h2>执行蓝图（Blueprint）</h2>
        <Clock3 className="h-4 w-4" />
      </div>
      <div className="blueprint-table">
        <div className="blueprint-row blueprint-header">
          <span>优先级</span>
          <span>推荐内容</span>
          <span>推荐理由</span>
          <span>实现难度</span>
          <span>预期效果</span>
        </div>
        {rows.map((row) => (
          <div key={row.rank} className="blueprint-row">
            <span className={`rank rank-${row.color}`}>{row.rank}</span>
            <span>
              <strong>{row.title}</strong>
              <small>{row.tags.join(" · ")}</small>
            </span>
            <span>{row.reason}</span>
            <span className="difficulty">
              {Array.from({ length: 5 }).map((_, index) => (
                <i key={index} className={index < row.difficulty ? `dot dot-${row.color}` : "dot"} />
              ))}
            </span>
            <span className="result-text">{row.result}</span>
          </div>
        ))}
      </div>
      <div className="blueprint-actions">
        <Link href="/pack">查看完整执行方案 →</Link>
        <button type="button" onClick={onExport}><Download className="h-4 w-4" />导出方案</button>
      </div>
    </section>
  );
}

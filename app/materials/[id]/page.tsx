import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell, PageContainer, PageWrapper } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import {
  MATERIAL_ASSETS,
  getMaterialCategoryPlaybook,
  getMaterialSourceById,
} from "@/lib/material-library";
import type { MaterialAsset } from "@/lib/types";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";

interface MaterialDetailPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return MATERIAL_ASSETS.map((asset) => ({ id: asset.id }));
}

export function generateMetadata({ params }: MaterialDetailPageProps) {
  const asset = MATERIAL_ASSETS.find((item) => item.id === params.id);
  if (!asset) return { title: "素材详情" };
  return {
    title: `${asset.title} - Vibe Design Translator`,
    description: asset.recommendationAngle || asset.motionSpec,
  };
}

export default function MaterialDetailPage({ params }: MaterialDetailPageProps) {
  const asset = MATERIAL_ASSETS.find((item) => item.id === params.id);
  if (!asset) notFound();

  const source = getMaterialSourceById(asset.sourceId);
  const playbook = asset.category ? getMaterialCategoryPlaybook(asset.category) : undefined;

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
              <ArrowLeft className="h-4 w-4" />
              返回 Agent 推荐页
            </Link>
          </div>

          <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[var(--color-accent-ios-blue)]/10 px-3 py-1 text-xs font-black text-[var(--color-accent-ios-blue)]">
                  {asset.category || "material"}
                </span>
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-bold text-[var(--color-text-secondary)]">
                  {source?.name || asset.sourceId}
                </span>
                <span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-bold text-[var(--color-text-secondary)]">
                  {asset.mediaKind}
                </span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-[var(--color-text-primary)]">
                {asset.title}
              </h1>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">
                {asset.recommendationAngle || asset.motionSpec}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Metric label="质量评分" value={`${asset.qualityScore || 80}`} />
                <Metric label="模式 ID" value={asset.patternId} />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-[var(--color-text-primary)]">
                <ExternalLink className="h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                来源与迁移边界
              </h2>
              <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                {source?.note || "该素材已进入本地知识库，可作为 Agent 推荐和 Blueprint 生成上下文。"}
              </p>
              {source && (
                <Link href={source.href} target="_blank" className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm font-bold text-[var(--color-text-primary)]">
                  打开原始来源
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </GlassCard>
          </section>

          <section className="mb-8 grid gap-5 lg:grid-cols-3">
            <DetailPanel icon={CheckCircle2} title="适用场景" items={asset.useWhen} />
            <DetailPanel icon={ShieldAlert} title="避坑边界" items={asset.pitfalls?.length ? asset.pitfalls : asset.avoidWhen} tone="danger" />
            <DetailPanel icon={Sparkles} title="设计信号" items={asset.designSignals} />
          </section>

          <section className="mb-8 grid gap-5 lg:grid-cols-2">
            <DetailPanel icon={Wrench} title="前端实现规则" items={asset.implementationRules?.length ? asset.implementationRules : asset.frontendNotes} />
            <DetailPanel icon={Lightbulb} title="可迁移案例" items={asset.examples?.length ? asset.examples : asset.frontendNotes} />
          </section>

          {playbook && (
            <GlassCard className="p-6">
              <h2 className="text-xl font-black text-[var(--color-text-primary)]">
                {playbook.label} Playbook
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{playbook.role}</p>
              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <DetailList title="常见案例" items={playbook.cases} />
                <DetailList title="前端规则" items={playbook.frontendRules} />
                <DetailList title="验收清单" items={playbook.evaluationChecklist} />
              </div>
            </GlassCard>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/70 p-4">
      <p className="text-xs font-bold text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 text-2xl font-black text-[var(--color-text-primary)]">{value}</p>
    </div>
  );
}

function DetailPanel({
  icon: Icon,
  title,
  items,
  tone = "default",
}: {
  icon: typeof CheckCircle2;
  title: string;
  items: string[];
  tone?: "default" | "danger";
}) {
  return (
    <GlassCard className="p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-[var(--color-text-primary)]">
        <Icon className={tone === "danger" ? "h-5 w-5 text-rose-500" : "h-5 w-5 text-[var(--color-accent-ios-blue)]"} />
        {title}
      </h2>
      <ul className="space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/60 px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-black text-[var(--color-text-primary)]">{title}</h3>
      <ul className="space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {items.map((item) => (
          <li key={item}>· {item}</li>
        ))}
      </ul>
    </div>
  );
}

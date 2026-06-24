import Link from "next/link";
import { AppShell, PageContainer, PageWrapper } from "@/components/layout";
import { GlassCard } from "@/components/ui/glass-card";
import { MATERIAL_CATEGORY_PLAYBOOKS, MATERIAL_SOURCES } from "@/lib/material-library";
import { DESIGN_FRAMEWORKS } from "@/lib/design-knowledge";
import { ArrowRight, BookOpen, ExternalLink, Layers3, Sparkles } from "lucide-react";

export default function InspirationPage() {
  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent-ios-blue)]">
                Inspiration System
              </p>
              <h1 className="text-3xl font-black text-[var(--color-text-primary)]">前端设计灵感框架</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
                这里不是普通灵感墙，而是把 Pageflows、Mobbin、Awwwards、GSAP、Motion、Material Design、Apple HIG 等来源拆成可迁移到前端项目里的思维框架。
              </p>
            </div>
            <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent-ios-blue)] px-4 py-2 text-sm font-bold text-white">
              让 Agent 推荐素材
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>

          <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DESIGN_FRAMEWORKS.map((framework) => (
              <GlassCard key={framework.id} className="flex h-full flex-col p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[var(--color-accent-ios-blue)]">
                  <Layers3 className="h-4 w-4" />
                  {framework.category}
                </div>
                <h2 className="text-lg font-black text-[var(--color-text-primary)]">{framework.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">{framework.coreIdea}</p>
                <div className="mt-4 space-y-3 text-sm text-[var(--color-text-secondary)]">
                  <div>
                    <p className="mb-1 font-bold text-[var(--color-text-primary)]">思维模型</p>
                    <ul className="space-y-1">
                      {framework.thinkingModel.slice(0, 3).map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-1 font-bold text-[var(--color-text-primary)]">前端迁移规则</p>
                    <ul className="space-y-1">
                      {framework.frontendImplementation.slice(0, 3).map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ))}
          </section>

          <section className="mb-8 grid gap-4 lg:grid-cols-5">
            {MATERIAL_CATEGORY_PLAYBOOKS.map((playbook) => (
              <GlassCard key={playbook.id} className="p-4">
                <BookOpen className="mb-3 h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                <h2 className="font-black text-[var(--color-text-primary)]">{playbook.label}</h2>
                <p className="mt-2 text-xs leading-5 text-[var(--color-text-secondary)]">{playbook.role}</p>
              </GlassCard>
            ))}
          </section>

          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-[var(--color-text-primary)]">已接入素材来源</h2>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  每个来源都被转成 Agent 可检索的 source、framework 和 material asset。
                </p>
              </div>
              <Link href="/patterns" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-accent-ios-blue)]">
                查看素材库
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {MATERIAL_SOURCES.map((source) => (
                <Link key={source.id} href={source.href} target="_blank" className="rounded-xl border border-[var(--color-border)] bg-white/70 p-4 transition-colors hover:bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-[var(--color-text-primary)]">{source.name}</p>
                      <p className="mt-1 text-xs font-bold text-[var(--color-accent-ios-blue)]">{source.signal}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-[var(--color-text-muted)]" />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--color-text-secondary)]">{source.note}</p>
                </Link>
              ))}
            </div>
          </GlassCard>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

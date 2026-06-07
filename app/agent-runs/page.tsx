// ============================================================
// Vibe Design Translator - Agent Runs Page
// ============================================================

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout";
import { PageContainer, PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { LiquidButton } from "@/components/ui/liquid-button";
import { artifactStorage } from "@/lib/artifacts/storage";
import { WorkflowRunRecord } from "@/lib/artifacts/types";
import { cn } from "@/lib/utils";
import { BarChart3, FileText, Play, RotateCcw, Trash2 } from "lucide-react";

export default function AgentRunsPage() {
  const router = useRouter();
  const [runs, setRuns] = useState<WorkflowRunRecord[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

  useEffect(() => {
    const nextRuns = artifactStorage.listRuns();
    setRuns(nextRuns);
    setSelectedRunId(nextRuns[0]?.id ?? null);
  }, []);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedRunId) ?? runs[0] ?? null,
    [runs, selectedRunId]
  );
  const previousRun = runs.find((run) => run.id !== selectedRun?.id);
  const delta = selectedRun && previousRun
    ? selectedRun.evaluation.overallScore - previousRun.evaluation.overallScore
    : undefined;

  const clearRuns = () => {
    artifactStorage.clearRuns();
    setRuns([]);
    setSelectedRunId(null);
  };

  const rerun = () => {
    if (!selectedRun) return;
    router.push(selectedRun.taskMeta.pageType ? "/diagnosis" : "/brief");
  };

  return (
    <AppShell showBackButton backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>Agent Runs</SectionLabel>
            <SectionHeading subtitle="查看诊断、执行包、Prompt 与评分证据，支持重新运行和最近两次结果对比。">
              Run 记录
            </SectionHeading>
          </div>

          {!runs.length ? (
            <div className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-8 text-center">
              <p className="text-sm text-[var(--color-text-secondary)]">
                暂无 run。完成一次诊断或执行包生成后，这里会保存结构化 artifact。
              </p>
              <LiquidButton className="mt-6" onClick={() => router.push("/")}>
                开始任务
              </LiquidButton>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    最近记录
                  </p>
                  <button
                    onClick={clearRuns}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-[var(--color-text-tertiary)] hover:bg-white/70"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    清空
                  </button>
                </div>
                {runs.map((run) => (
                  <button
                    key={run.id}
                    onClick={() => setSelectedRunId(run.id)}
                    className={cn(
                      "w-full rounded-2xl border p-4 text-left transition-colors",
                      selectedRun?.id === run.id
                        ? "border-[var(--color-accent-ios-blue)] bg-white/80"
                        : "border-[var(--color-border)] bg-white/55 hover:bg-white/75"
                    )}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {run.title}
                      </p>
                      <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
                        {run.evaluation.overallScore}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {run.taskMeta.providerUsed} · {run.taskMeta.locale} · {new Date(run.updatedAt).toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>

              {selectedRun && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-5">
                      <BarChart3 className="mb-3 h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                      <p className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Evaluation
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                        {selectedRun.evaluation.overallScore}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-5">
                      <FileText className="mb-3 h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                      <p className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Artifacts
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                        {selectedRun.artifacts.length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-5">
                      <RotateCcw className="mb-3 h-5 w-5 text-[var(--color-accent-ios-blue)]" />
                      <p className="text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Delta
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                        {delta === undefined ? "N/A" : `${delta > 0 ? "+" : ""}${delta}`}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[var(--color-border)] bg-white/65 p-5">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                          {selectedRun.title}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {selectedRun.taskMeta.productName ?? selectedRun.taskMeta.pageType} · {selectedRun.taskMeta.targetTool}
                        </p>
                      </div>
                      <LiquidButton onClick={rerun} size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        重新运行
                      </LiquidButton>
                    </div>

                    <div className="space-y-3">
                      {selectedRun.artifacts.map((artifact) => (
                        <div
                          key={artifact.id}
                          className="rounded-xl border border-[var(--color-border)] bg-white/70 p-4"
                        >
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                              {artifact.title}
                            </p>
                            <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
                              {artifact.type}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-tertiary)]">
                            {artifact.agentStepId} · {new Date(artifact.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

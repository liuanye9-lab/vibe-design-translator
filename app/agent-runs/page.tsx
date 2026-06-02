// ============================================================
// Vibe Design Translator - Agent Runs Page
// ============================================================
// Displays all agent workflow runs with status, progress, and details.
// Supports viewing run details and clearing history.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { AppShell, PageWrapper, PageContainer } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { AgentRunPanel } from "@/components/agent";
import { AgentProgressBar } from "@/components/agent/agent-progress-bar";
import { useDesignStore } from "@/store/use-design-store";
import { cn, getRelativeTime } from "@/lib/utils";
import type { AgentRun } from "@/lib/agent/types";
import { Trash2, Eye, Workflow } from "lucide-react";

const runTypeLabels: Record<string, string> = {
  design_translation: "设计翻译",
  page_diagnosis: "页面诊断",
  refactor_prompt: "重构 Prompt",
  project_export: "项目导出",
};

export default function AgentRunsPage() {
  const {
    agentRuns,
    clearAgentRuns,
    isHydrated,
    hydrateFromStorage,
    updateAgentRun,
    updateAgentStep,
  } = useDesignStore();

  const [selectedRun, setSelectedRun] = useState<AgentRun | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
    setIsLoaded(true);
  }, [isHydrated, hydrateFromStorage]);

  if (!isHydrated || !isLoaded) {
    return (
      <AppShell showNav>
        <PageWrapper>
          <PageContainer className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse text-[var(--color-text-secondary)]">
              加载中...
            </div>
          </PageContainer>
        </PageWrapper>
      </AppShell>
    );
  }

  const handleRetryStep = (stepId: string) => {
    if (!selectedRun) return;
    // In Phase 5, we just update the step status to allow re-execution
    // The actual retry logic would be handled by the orchestrator
    updateAgentStep(selectedRun.id, stepId, {
      status: "pending",
      error: undefined,
      progress: 0,
    });
  };

  const handleClearAll = () => {
    if (window.confirm("确定要清空所有 Agent 工作流历史吗？")) {
      clearAgentRuns();
      setSelectedRun(null);
    }
  };

  return (
    <AppShell showNav>
      <PageWrapper>
        <PageContainer className="py-12">
          {/* Header */}
          <div className="mb-8">
            <SectionLabel>Agent 工作流</SectionLabel>
            <SectionHeading subtitle="查看所有 Agent 工作流执行记录、步骤状态和产出结果">
              工作流历史
            </SectionHeading>
          </div>

          {/* Actions */}
          {agentRuns.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <LiquidButton
                variant="secondary"
                size="sm"
                onClick={handleClearAll}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                清空历史
              </LiquidButton>
              <span className="text-xs text-[var(--color-text-muted)]">
                共 {agentRuns.length} 条记录
              </span>
            </div>
          )}

          {/* Content */}
          {agentRuns.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-surface)] flex items-center justify-center mx-auto mb-4">
                <Workflow className="w-6 h-6 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                暂无工作流记录
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto">
                在 Brief、Diagnosis 或 Pack 页面启动 Agent 工作流后，执行记录将显示在这里
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Run List */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                  工作流列表
                </h3>
                {agentRuns.map((run) => (
                  <button
                    key={run.id}
                    onClick={() => setSelectedRun(run)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl border transition-all duration-200",
                      selectedRun?.id === run.id
                        ? "border-[var(--color-accent-ios-blue)]/30 bg-[var(--color-accent-ios-blue)]/5"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]/50 hover:border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                        {runTypeLabels[run.type] || run.type}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        {getRelativeTime(run.createdAt)}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2 truncate">
                      {run.title}
                    </h4>
                    <AgentProgressBar
                      progress={run.progress}
                      status={run.status}
                    />
                  </button>
                ))}
              </div>

              {/* Run Detail */}
              <div className="lg:col-span-2">
                {selectedRun ? (
                  <AgentRunPanel
                    run={selectedRun}
                    onRetryStep={handleRetryStep}
                  />
                ) : (
                  <GlassCard className="p-12 text-center">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-5 h-5 text-[var(--color-text-muted)]" />
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      选择左侧的工作流查看详情
                    </p>
                  </GlassCard>
                )}
              </div>
            </div>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

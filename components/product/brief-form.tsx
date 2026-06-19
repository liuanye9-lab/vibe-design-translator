// ============================================================
// Vibe Design Translator - Conversational Brief Component
// ============================================================

"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  Library,
  MessageSquareText,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { AgentRunPanel } from "@/components/agent";
import { LiquidButton } from "@/components/ui/liquid-button";
import { DesignBrief, ToolType } from "@/lib/types";
import { runDesignTranslationWorkflow } from "@/lib/agent/orchestrator";
import { MATERIAL_SOURCES } from "@/lib/material-library";
import { useDesignStore } from "@/store/use-design-store";
import { cn } from "@/lib/utils";
import type { AgentRun } from "@/lib/agent/types";

interface BriefFormProps {
  mode?: "has-idea" | "no-idea";
  useAgentMode?: boolean;
}

type BriefStepId =
  | "product"
  | "audience"
  | "goal"
  | "taste"
  | "avoid"
  | "conversion"
  | "references"
  | "output";

interface BriefStep {
  id: BriefStepId;
  eyebrow: string;
  prompt: string;
  placeholder: string;
}

const briefSteps: BriefStep[] = [
  {
    id: "product",
    eyebrow: "产品定位",
    prompt: "先告诉我这个项目是什么：产品名、类型、现在处在什么阶段",
    placeholder: "例如：一个给独立开发者用的 AI 落地页生成器，偏 SaaS 工具，MVP 阶段",
  },
  {
    id: "audience",
    eyebrow: "用户场景",
    prompt: "谁会用它？他们打开页面时最想确认什么",
    placeholder: "例如：创业者和设计师，想快速判断这个工具是否能生成不像模板的页面",
  },
  {
    id: "goal",
    eyebrow: "页面目标",
    prompt: "这个页面要推动用户做什么？不用选，直接说你希望用户下一步怎么行动",
    placeholder: "例如：先看案例，再上传截图或输入 brief，最后复制给 Codex 的执行 prompt",
  },
  {
    id: "taste",
    eyebrow: "审美方向",
    prompt: "你希望第一眼像什么，不像什么？可以用品牌、网站、情绪或一句话描述",
    placeholder: "例如：像 Mobbin 的清晰、v0 的可执行、Awwwards 的高级，但不要花哨炫技",
  },
  {
    id: "avoid",
    eyebrow: "反 AI 味",
    prompt: "哪些 AI 味、模板味、廉价感是一定要避开的",
    placeholder: "例如：紫蓝渐变、空洞 hero、圆角卡片堆叠、过度阴影、没有真实素材感",
  },
  {
    id: "conversion",
    eyebrow: "业务优先级",
    prompt: "这次最重要的是信任、转化、记忆点、信息效率，还是别的？顺便写主 CTA",
    placeholder: "例如：信息效率第一，转化第二；主 CTA 是“生成设计执行包”",
  },
  {
    id: "references",
    eyebrow: "素材参考",
    prompt: "有没有想参考的素材库、页面流、配色或 app 案例？也可以粘贴 URL",
    placeholder: "例如：Pageflows 看流程，Mobbin 看移动端，Huemint 找品牌配色",
  },
  {
    id: "output",
    eyebrow: "输出偏好",
    prompt: "最后说一下输出给哪个工具，以及视觉强度和内容密度的大概感觉",
    placeholder: "例如：给 Codex，用克制但不无聊的视觉，内容密度中等偏高",
  },
];

function parseList(value: string): string[] {
  return value
    .split(/[,，、;；\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function inferTool(value: string, fallback: ToolType): ToolType {
  const lower = value.toLowerCase();
  if (lower.includes("claude")) return "claude-code";
  if (lower.includes("gemini")) return "gemini";
  if (lower.includes("workbuddy")) return "workbuddy";
  if (lower.includes("codex") || lower.includes("gpt")) return "codex";
  return fallback;
}

function inferVisualIntensity(value: string): DesignBrief["visualIntensity"] {
  if (/克制|极简|轻|干净|minimal/i.test(value)) return "minimal";
  if (/大胆|强|实验|冲击|expressive/i.test(value)) return "expressive";
  return "balanced";
}

function inferContentDensity(value: string): DesignBrief["contentDensity"] {
  if (/密|多|高|信息量|dense/i.test(value)) return "dense";
  if (/轻|少|留白|light/i.test(value)) return "light";
  return "standard";
}

export function BriefForm({ mode = "has-idea", useAgentMode = false }: BriefFormProps) {
  const router = useRouter();
  const {
    setBrief,
    updateBrief,
    brief,
    selectedTool,
    currentProjectId,
    createAgentRun,
    updateAgentRun,
    addAgentEvent,
    updateAgentStep,
  } = useDesignStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agentRun, setAgentRun] = useState<AgentRun | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<Record<BriefStepId, string>>({
    product: brief?.productName
      ? `${brief.productName}，${brief.productCategory}`
      : "",
    audience: brief?.targetUsers ?? "",
    goal: brief?.pageGoal ?? "",
    taste: [
      brief?.firstImpression,
      brief?.desiredFeeling?.join("，"),
    ].filter(Boolean).join("；"),
    avoid: [
      brief?.avoidedAISmell?.join("，"),
      brief?.avoidedFeeling?.join("，"),
    ].filter(Boolean).join("；"),
    conversion: [
      brief?.businessPriority,
      brief?.mainCTA,
    ].filter(Boolean).join("；"),
    references: brief?.visualReferenceTolerance ?? "",
    output: `${brief?.outputTool ?? selectedTool}，${brief?.visualIntensity ?? "balanced"}，${brief?.contentDensity ?? "standard"}`,
  });

  const activeStep = briefSteps[activeIndex];
  const completedCount = briefSteps
    .slice(0, activeIndex + 1)
    .filter((step) => Boolean(answers[step.id])).length;
  const progress = Math.round((completedCount / briefSteps.length) * 100);
  const isLastStep = activeIndex === briefSteps.length - 1;

  const draft = useMemo<DesignBrief>(() => {
    const productAnswer = answers.product || "";
    const productParts = productAnswer.split(/[，,]/).map((part) => part.trim()).filter(Boolean);
    const tasteList = parseList(answers.taste || "");
    const avoidList = parseList(answers.avoid || "");
    const conversionParts = (answers.conversion || "").split(/[；;]/).map((part) => part.trim()).filter(Boolean);

    return {
      productName: productParts[0] || brief?.productName || "未命名项目",
      productCategory: productParts.slice(1).join("，") || brief?.productCategory || "other",
      targetUsers: answers.audience || brief?.targetUsers || "",
      pageGoal: answers.goal || brief?.pageGoal || "",
      desiredFeeling: tasteList.length ? tasteList : brief?.desiredFeeling || [],
      avoidedFeeling: avoidList.length ? avoidList : brief?.avoidedFeeling || [],
      mainCTA: conversionParts.find((part) => /cta|按钮|行动|生成|开始|上传|复制/i.test(part)) || brief?.mainCTA || "",
      visualIntensity: inferVisualIntensity(answers.output || ""),
      contentDensity: inferContentDensity(answers.output || ""),
      outputTool: inferTool(answers.output || "", selectedTool),
      firstImpression: answers.taste || brief?.firstImpression,
      businessPriority: conversionParts[0] || answers.conversion || brief?.businessPriority,
      visualReferenceTolerance: answers.references || brief?.visualReferenceTolerance,
      avoidedAISmell: avoidList.length ? avoidList : brief?.avoidedAISmell,
      audience: answers.audience || brief?.audience,
    };
  }, [answers, brief, selectedTool]);

  const submitDraft = useCallback(async () => {
    setIsSubmitting(true);

    if (brief) {
      updateBrief(draft);
    } else {
      setBrief(draft);
    }

    if (useAgentMode) {
      try {
        const context = {
          projectId: currentProjectId,
          provider: "mock" as const,
          isRealAIEnabled: false,
        };

        const callbacks = {
          onRunUpdate: (run: AgentRun) => {
            setAgentRun({ ...run });
            updateAgentRun(run.id, run);
          },
          onEvent: (runId: string, event: import("@/lib/agent/types").AgentEvent) => {
            addAgentEvent(runId, event);
          },
          onStepUpdate: (runId: string, step: import("@/lib/agent/types").AgentStep) => {
            updateAgentStep(runId, step.id, step);
          },
        };

        const run = await runDesignTranslationWorkflow(draft, context, callbacks);
        setAgentRun(run);
        createAgentRun(run);

        if (run.status === "succeeded") {
          setTimeout(() => router.push("/directions"), 500);
        }
      } catch (err) {
        console.error("Agent workflow error:", err);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setTimeout(() => {
      router.push("/directions");
      setIsSubmitting(false);
    }, 250);
  }, [
    addAgentEvent,
    brief,
    createAgentRun,
    currentProjectId,
    draft,
    router,
    setBrief,
    updateAgentRun,
    updateAgentStep,
    updateBrief,
    useAgentMode,
  ]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setAnswers((current) => ({
      ...current,
      [activeStep.id]: trimmed,
    }));
    setInputValue("");

    if (isLastStep) {
      await submitDraft();
      return;
    }

    setActiveIndex((index) => Math.min(index + 1, briefSteps.length - 1));
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSend();
    }
  };

  const jumpToStep = (index: number) => {
    setActiveIndex(index);
    setInputValue(answers[briefSteps[index].id] || "");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-sm">
        <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-ios-blue)] text-white">
                <MessageSquareText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  设计 Brief 对话窗口
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {mode === "no-idea" ? "从模糊想法开始聊" : "把你的审美和目标说清楚"}
                </p>
              </div>
            </div>
            <div className="min-w-[160px]">
              <div className="mb-1 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
                <span>{completedCount}/{briefSteps.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full bg-[var(--color-accent-ios-blue)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid min-h-[620px] md:grid-cols-[180px_minmax(0,1fr)]">
          <nav className="border-b border-[var(--color-border)] bg-[var(--color-surface)] p-3 md:border-b-0 md:border-r">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {briefSteps.map((step, index) => {
                const isActive = index === activeIndex;
                const isDone = Boolean(answers[step.id]);
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => jumpToStep(index)}
                    className={cn(
                      "flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors",
                      isActive
                        ? "bg-[var(--color-accent-ios-blue)] text-white"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-current" />
                    )}
                    <span className="truncate">{step.eyebrow}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="flex min-h-[560px] flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 md:px-6">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="max-w-[760px] rounded-2xl rounded-tl-sm bg-[var(--color-surface)] px-4 py-3 text-sm leading-6 text-[var(--color-text-primary)]">
                  不用选选项，直接像和设计顾问沟通一样说。每轮回答都会被整理进执行 Brief，最后生成方向推荐。
                </div>
              </div>

              {briefSteps.map((step, index) => {
                const answer = answers[step.id];
                if (index > activeIndex) return null;

                return (
                  <div key={step.id} className="space-y-3">
                    {index === activeIndex && (
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="max-w-[760px] rounded-2xl rounded-tl-sm bg-[var(--color-surface)] px-4 py-3">
                          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                            {step.eyebrow}
                          </p>
                          <p className="text-sm leading-6 text-[var(--color-text-primary)]">
                            {step.prompt}
                          </p>
                        </div>
                      </div>
                    )}

                    {answer && (
                      <div className="flex justify-end gap-3">
                        <div className="max-w-[760px] rounded-2xl rounded-tr-sm bg-[var(--color-accent-ios-blue)] px-4 py-3 text-sm leading-6 text-white">
                          {answer}
                        </div>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                          <UserRound className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex gap-3">
                <textarea
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={activeStep.placeholder}
                  rows={3}
                  className={cn(
                    "min-h-[88px] flex-1 resize-none rounded-xl border border-[var(--color-border)]",
                    "bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-primary)]",
                    "placeholder:text-[var(--color-text-tertiary)]",
                    "focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)]"
                  )}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isSubmitting}
                  className={cn(
                    "flex h-[88px] w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                    inputValue.trim() && !isSubmitting
                      ? "bg-[var(--color-accent-ios-blue)] text-white"
                      : "bg-[var(--color-border)] text-[var(--color-text-muted)]"
                  )}
                  aria-label="发送回答"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Enter 发送，Shift + Enter 换行
                </p>
                <LiquidButton onClick={submitDraft} isLoading={isSubmitting}>
                  <span>{useAgentMode ? "启动 Agent 工作流" : "生成方向推荐"}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>

        {useAgentMode && agentRun && (
          <div className="border-t border-[var(--color-border)] p-4">
            <AgentRunPanel run={agentRun} onClose={() => setAgentRun(null)} />
          </div>
        )}
      </section>

      <aside className="space-y-4">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]">
              <Library className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                素材雷达
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                从流程、模板、案例、配色四类找参考
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MATERIAL_SOURCES.map((source) => (
              <a
                key={source.name}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition-colors hover:border-[var(--color-accent-ios-blue)]"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {source.name}
                    </p>
                    <p className="text-[11px] text-[var(--color-accent-ios-blue)]">
                      {source.signal}
                    </p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-accent-ios-blue)]" />
                </div>
                <p className="text-xs leading-5 text-[var(--color-text-secondary)]">
                  {source.note}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            当前 Brief 摘要
          </p>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-[var(--color-text-muted)]">项目</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">{draft.productName}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--color-text-muted)]">用户</dt>
              <dd className="mt-1 line-clamp-2 text-[var(--color-text-primary)]">
                {draft.targetUsers || "还没描述"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--color-text-muted)]">输出</dt>
              <dd className="mt-1 text-[var(--color-text-primary)]">
                {draft.outputTool} / {draft.visualIntensity} / {draft.contentDensity}
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

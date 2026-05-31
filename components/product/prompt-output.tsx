// ============================================================
// Vibe Design Translator - Prompt Output Component
// ============================================================

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ToolType } from "@/lib/types";
import { TOOL_LABELS } from "@/lib/constants";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { CopyButton } from "@/components/ui/copy-button";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Terminal, Code, Sparkles, Wand2 } from "lucide-react";

interface PromptOutputProps {
  prompts: Record<ToolType, string>;
  currentTool: ToolType;
  onToolChange: (tool: ToolType) => void;
  onCopied?: () => void;
  className?: string;
}

const toolIcons = {
  codex: Terminal,
  "claude-code": Code,
  gemini: Sparkles,
  workbuddy: Wand2,
};

const toolColors = {
  codex: "from-blue-500 to-cyan-500",
  "claude-code": "from-orange-500 to-red-500",
  gemini: "from-purple-500 to-pink-500",
  workbuddy: "from-green-500 to-emerald-500",
};

export function PromptOutput({
  prompts,
  currentTool,
  onToolChange,
  onCopied,
  className,
}: PromptOutputProps) {
  const currentPrompt = prompts[currentTool];
  const Icon = toolIcons[currentTool];

  return (
    <GlassCard className={cn("", className)}>
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br", toolColors[currentTool], "flex items-center justify-center")}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {TOOL_LABELS[currentTool]} Prompt
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Copy and use in {TOOL_LABELS[currentTool]}
              </p>
            </div>
          </div>
          <CopyButton value={currentPrompt} onCopied={onCopied} />
        </div>

        {/* Tool selector tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {(Object.keys(toolIcons) as ToolType[]).map((tool) => {
            const ToolIcon = toolIcons[tool];
            const isActive = tool === currentTool;

            return (
              <button
                key={tool}
                onClick={() => onToolChange(tool)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
                  isActive
                    ? "bg-[var(--color-accent-ios-blue)] text-white"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)]"
                )}
              >
                <ToolIcon className="w-4 h-4" />
                <span>{TOOL_LABELS[tool]}</span>
              </button>
            );
          })}
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <pre className="whitespace-pre-wrap text-sm text-[var(--color-text-secondary)] leading-relaxed font-mono bg-[var(--color-surface)] p-4 rounded-xl overflow-x-auto max-h-[600px] overflow-y-auto">
          {currentPrompt}
        </pre>
      </GlassCardContent>
    </GlassCard>
  );
}
// ============================================================
// Vibe Design Translator - Tool Selector Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ToolType } from "@/lib/types";
import { TOOL_LABELS } from "@/lib/constants";
import { Terminal, Code, Sparkles, Wand2 } from "lucide-react";

interface ToolSelectorProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  className?: string;
}

const toolIcons = {
  codex: Terminal,
  "claude-code": Code,
  gemini: Sparkles,
  workbuddy: Wand2,
};

const toolColors = {
  codex: "text-blue-500",
  "claude-code": "text-orange-500",
  gemini: "text-purple-500",
  workbuddy: "text-green-500",
};

export function ToolSelector({ selectedTool, onSelectTool, className }: ToolSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {(Object.keys(toolIcons) as ToolType[]).map((tool) => {
        const Icon = toolIcons[tool];
        const isSelected = tool === selectedTool;

        return (
          <button
            key={tool}
            onClick={() => onSelectTool(tool)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
              isSelected
                ? "bg-[var(--color-text-primary)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-strong)]"
            )}
          >
            <Icon className={cn("w-4 h-4", !isSelected && toolColors[tool])} />
            <span>{TOOL_LABELS[tool]}</span>
          </button>
        );
      })}
    </div>
  );
}
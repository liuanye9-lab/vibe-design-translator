// ============================================================
// Vibe Design Translator - Execution Pack Section Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { CopyButton } from "@/components/ui/copy-button";
import { CheckCircle, AlertTriangle, Target, Layout, Eye, Zap, Shield, Terminal } from "lucide-react";

interface ExecutionPackSectionProps {
  pack: {
    strategy: string[];
    pageStructure: string[];
    visualSystem: string[];
    interactionSystem: string[];
    acceptanceCriteria: string[];
    antiAILookChecklist: string[];
  };
  className?: string;
}

const sectionIcons = {
  strategy: Target,
  pageStructure: Layout,
  visualSystem: Eye,
  interactionSystem: Zap,
  acceptanceCriteria: CheckCircle,
  antiAILookChecklist: Shield,
};

const sectionTitles = {
  strategy: "Design Strategy",
  pageStructure: "Page Structure",
  visualSystem: "Visual System",
  interactionSystem: "Interaction System",
  acceptanceCriteria: "Acceptance Criteria",
  antiAILookChecklist: "Anti-AI-Look Checklist",
};

export function ExecutionPackSection({ pack, className }: ExecutionPackSectionProps) {
  const sections = [
    { key: "strategy" as const, items: pack.strategy },
    { key: "pageStructure" as const, items: pack.pageStructure },
    { key: "visualSystem" as const, items: pack.visualSystem },
    { key: "interactionSystem" as const, items: pack.interactionSystem },
    { key: "acceptanceCriteria" as const, items: pack.acceptanceCriteria },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {sections.map((section) => {
        const Icon = sectionIcons[section.key];
        return (
          <GlassCard key={section.key}>
            <GlassCardHeader className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-[var(--color-accent-ios-blue)]" />
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {sectionTitles[section.key]}
              </h3>
            </GlassCardHeader>
            <GlassCardContent>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-mist-blue)] mt-2 flex-shrink-0" />
                    <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCardContent>
          </GlassCard>
        );
      })}

      {/* Anti-AI-Look Checklist */}
      <GlassCard className="border-[var(--color-accent-soft-violet)]/30">
        <GlassCardHeader className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--color-accent-soft-violet)]" />
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Anti-AI-Look Checklist
          </h3>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            {pack.antiAILookChecklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[var(--color-accent-soft-violet)] mt-0.5">⚠️</span>
                <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
"use client";

import { cn } from "@/lib/utils";
import { UserMode } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Lightbulb, Compass, Stethoscope } from "lucide-react";
import { useI18n } from "@/lib/i18n/use-i18n";

interface ModeSelectorProps {
  currentMode: UserMode | null;
  onSelectMode: (mode: UserMode) => void;
}

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  const { t } = useI18n();

  const modes = [
    {
      id: "has-idea" as UserMode,
      title: t("mode_has_idea"),
      description: t("mode_has_idea_desc"),
      icon: Lightbulb,
    },
    {
      id: "no-idea" as UserMode,
      title: t("mode_no_idea"),
      description: t("mode_no_idea_desc"),
      icon: Compass,
    },
    {
      id: "diagnose" as UserMode,
      title: t("mode_diagnose"),
      description: t("mode_diagnose_desc"),
      icon: Stethoscope,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = currentMode === mode.id;

        return (
          <GlassCard
            key={mode.id}
            variant="interactive"
            className={cn(
              "p-6 text-left",
              isSelected && "ring-2 ring-[var(--color-accent-ios-blue)]"
            )}
            onClick={() => onSelectMode(mode.id)}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
                "transition-colors duration-300",
                isSelected
                  ? "bg-[var(--color-accent-ios-blue)] text-white"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {mode.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {mode.description}
            </p>
          </GlassCard>
        );
      })}
    </div>
  );
}

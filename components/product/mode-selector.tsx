// ============================================================
// Vibe Design Translator - Mode Selector Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { UserMode } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { TranslationKey } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/use-i18n";
import { Lightbulb, Compass, Stethoscope } from "lucide-react";

interface ModeSelectorProps {
  currentMode: UserMode | null;
  onSelectMode: (mode: UserMode) => void;
}

const modes = [
  {
    id: "has-idea" as UserMode,
    titleKey: "mode.hasIdea.title",
    descriptionKey: "mode.hasIdea.desc",
    icon: Lightbulb,
  },
  {
    id: "no-idea" as UserMode,
    titleKey: "mode.noIdea.title",
    descriptionKey: "mode.noIdea.desc",
    icon: Compass,
  },
  {
    id: "diagnose" as UserMode,
    titleKey: "mode.diagnose.title",
    descriptionKey: "mode.diagnose.desc",
    icon: Stethoscope,
  },
] satisfies Array<{
  id: UserMode;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  icon: typeof Lightbulb;
}>;

export function ModeSelector({ currentMode, onSelectMode }: ModeSelectorProps) {
  const { t } = useI18n();

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
              {t(mode.titleKey)}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {t(mode.descriptionKey)}
            </p>
          </GlassCard>
        );
      })}
    </div>
  );
}

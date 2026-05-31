// ============================================================
// Vibe Design Translator - Pattern Detail Drawer Component
// ============================================================

"use client";

import { useEffect } from "react";
import { DesignPattern } from "@/lib/types";
import { GlassCard } from "@/components/ui/glass-card";
import { CopyButton } from "@/components/ui/copy-button";
import { LiquidButton } from "@/components/ui/liquid-button";
import { cn } from "@/lib/utils";
import { X, Lightbulb, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PatternDetailDrawerProps {
  pattern: DesignPattern | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PatternDetailDrawer({
  pattern,
  isOpen,
  onClose,
}: PatternDetailDrawerProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!pattern) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[var(--color-bg)] z-50 overflow-y-auto shadow-2xl"
          >
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-medium px-3 py-1 rounded-lg bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                  {pattern.category}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-[var(--color-surface)] transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                {pattern.name}
              </h2>

              {/* Suitable for */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Suitable for
                </h3>
                <div className="flex flex-wrap gap-2">
                  {pattern.suitableFor.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-[var(--color-surface)] text-sm text-[var(--color-text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Traits */}
              <GlassCard className="p-6 mb-6">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Visual Traits
                </h3>
                <ul className="space-y-2">
                  {pattern.visualTraits.map((trait, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-ios-blue)] mt-2 flex-shrink-0" />
                      <span className="text-[var(--color-text-primary)] text-sm">
                        {trait}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Layout Advice */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Layout Advice
                </h3>
                <ul className="space-y-2">
                  {pattern.layoutAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-mist-blue)] mt-2 flex-shrink-0" />
                      <span className="text-[var(--color-text-primary)] text-sm">
                        {advice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interaction Advice */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Interaction Advice
                </h3>
                <ul className="space-y-2">
                  {pattern.interactionAdvice.map((advice, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-soft-violet)] mt-2 flex-shrink-0" />
                      <span className="text-[var(--color-text-primary)] text-sm">
                        {advice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prompt Fragment */}
              <GlassCard className="p-6 mb-6 bg-[var(--color-surface)]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
                    Prompt Fragment
                  </h3>
                  <CopyButton value={pattern.promptFragment} label="Copy" />
                </div>
                <p className="text-[var(--color-text-primary)] text-sm leading-relaxed">
                  {pattern.promptFragment}
                </p>
              </GlassCard>

              {/* What to Avoid */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  What to Avoid
                </h3>
                <ul className="space-y-2">
                  {pattern.avoid.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-rose-500 mt-0.5">✗</span>
                      <span className="text-[var(--color-text-primary)] text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Note */}
              <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--color-accent-mist-blue)] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {pattern.legalNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
// ============================================================
// Vibe Design Translator - Settings Page
// ============================================================

"use client";

import { useEffect } from "react";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { HistoryPanel } from "@/components/product/history-panel";
import { LiquidButton } from "@/components/ui/liquid-button";
import { ToolSelector } from "@/components/product/tool-selector";
import { useDesignStore } from "@/store/use-design-store";
import { TOOL_LABELS } from "@/lib/constants";
import { getDirectionById } from "@/lib/design-directions";
import { ToolType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trash2, Download, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const {
    brief,
    selectedDirectionId,
    selectedTool,
    setSelectedTool,
    clearAllData,
    clearHistory,
    isHydrated,
    hydrateFromStorage,
  } = useDesignStore();

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  const direction = selectedDirectionId ? getDirectionById(selectedDirectionId) : null;

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      clearAllData();
    }
  };

  const handleExportData = () => {
    const data = {
      brief,
      selectedDirectionId,
      selectedTool,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vibe-translator-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          <div className="mb-8">
            <SectionLabel>
              Settings & Data
            </SectionLabel>

            <SectionHeading subtitle="Manage your saved data, history, and preferences.">
              Settings
            </SectionHeading>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Current State */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Current State
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  {/* Brief */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Design Brief
                    </span>
                    {brief ? (
                      <div className="mt-2 p-3 rounded-xl bg-[var(--color-surface)]">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {brief.productName}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          {brief.productCategory}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        No brief saved
                      </p>
                    )}
                  </div>

                  {/* Direction */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Selected Direction
                    </span>
                    {direction ? (
                      <div className="mt-2 p-3 rounded-xl bg-[var(--color-surface)]">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {direction.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        No direction selected
                      </p>
                    )}
                  </div>

                  {/* Tool */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      Preferred Tool
                    </span>
                    <div className="mt-2">
                      <ToolSelector
                        selectedTool={selectedTool}
                        onSelectTool={setSelectedTool}
                      />
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* History */}
              <HistoryPanel />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Data Management */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Data Management
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  <LiquidButton
                    variant="secondary"
                    onClick={handleExportData}
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Data as JSON
                  </LiquidButton>

                  <LiquidButton
                    variant="secondary"
                    onClick={clearHistory}
                    className="w-full justify-start"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear History Only
                  </LiquidButton>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <LiquidButton
                      variant="ghost"
                      onClick={handleClearAllData}
                      className="w-full justify-start text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All Data
                    </LiquidButton>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Info */}
              <GlassCard className="bg-[var(--color-surface)]">
                <GlassCardContent>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[var(--color-accent-mist-blue)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                        About Data Storage
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        All data is stored locally in your browser using localStorage. No data is sent to any external server. Clearing your browser data will remove all saved information.
                      </p>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Tech Info */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    Technical Info
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Storage
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      localStorage (browser)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      AI API
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      Not connected (Phase 1)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Database
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      None (Phase 1)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      Phase
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      MVP Engineering
                    </span>
                  </div>
                </GlassCardContent>
              </GlassCard>
            </div>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}
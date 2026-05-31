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
import { useI18n } from "@/lib/i18n/use-i18n";
import { useDesignStore } from "@/store/use-design-store";
import { TOOL_LABELS } from "@/lib/constants";
import { getDirectionById } from "@/lib/design-directions";
import { ToolType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Trash2, Download, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { t } = useI18n();
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
    if (confirm(t("settings_confirm_clear"))) {
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
              {t("settings_tag")}
            </SectionLabel>

            <SectionHeading subtitle={t("settings_subtitle")}>
              {t("settings_title")}
            </SectionHeading>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Current State */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("settings_state_title")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  {/* Brief */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings_brief_label")}
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
                        {t("settings_brief_empty")}
                      </p>
                    )}
                  </div>

                  {/* Direction */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings_direction_label")}
                    </span>
                    {direction ? (
                      <div className="mt-2 p-3 rounded-xl bg-[var(--color-surface)]">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {direction.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {t("settings_direction_empty")}
                      </p>
                    )}
                  </div>

                  {/* Tool */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings_tool_label")}
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
                    {t("settings_data_title")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  <LiquidButton
                    variant="secondary"
                    onClick={handleExportData}
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("settings_export")}
                  </LiquidButton>

                  <LiquidButton
                    variant="secondary"
                    onClick={clearHistory}
                    className="w-full justify-start"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("settings_clear_history")}
                  </LiquidButton>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <LiquidButton
                      variant="ghost"
                      onClick={handleClearAllData}
                      className="w-full justify-start text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t("settings_clear_all")}
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
                        {t("settings_about_title")}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {t("settings_about_desc")}
                      </p>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Tech Info */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("settings_tech_title")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings_tech_storage")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings_tech_storage_val")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings_tech_api")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings_tech_api_val")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings_tech_db")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings_tech_db_val")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings_tech_phase")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings_tech_phase_val")}
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
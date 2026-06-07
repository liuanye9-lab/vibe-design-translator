// ============================================================
// Vibe Design Translator - Settings Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/glass-card";
import { HistoryPanel } from "@/components/product/history-panel";
import { LiquidButton } from "@/components/ui/liquid-button";
import { ToolSelector } from "@/components/product/tool-selector";
import { useDesignStore } from "@/store/use-design-store";
import { getDirectionById } from "@/lib/design-directions";
import { useI18n } from "@/lib/i18n/use-i18n";
import { AlertTriangle, CheckCircle2, CircleOff, Download, RefreshCw, Server, ShieldAlert, Trash2 } from "lucide-react";
import type { ProviderCapability, ProviderStatus } from "@/lib/connectors/provider-capabilities";

function CapabilityBadge({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        enabled
          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
          : "bg-gray-100 text-gray-500 border border-gray-200",
      ].join(" ")}
    >
      {enabled ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleOff className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

function ProviderRow({
  capability,
  isConfigured,
  isUsed,
}: {
  capability: ProviderCapability;
  isConfigured: boolean;
  isUsed: boolean;
}) {
  const { t } = useI18n();
  const statusLabel = capability.available ? t("settings.provider.ready") : t("settings.provider.disabled");
  const providerDescriptions: Record<string, string> = {
    mock: t("settings.provider.mock.desc"),
    openai: t("settings.provider.openai.desc"),
    claude: t("settings.provider.claude.desc"),
    gemini: t("settings.provider.gemini.desc"),
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/45 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-medium text-[var(--color-text-primary)]">{capability.name}</h4>
            <span
              className={[
                "rounded-full px-2 py-0.5 text-xs font-medium",
                capability.available
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700",
              ].join(" ")}
            >
              {statusLabel}
            </span>
            {isConfigured && (
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                {t("settings.provider.configuredBadge")}
              </span>
            )}
            {isUsed && (
              <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
                {t("settings.provider.inUseBadge")}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {providerDescriptions[capability.providerId] ?? capability.description}
          </p>
          {capability.unavailabilityReason && (
            <p className="mt-2 text-xs text-amber-700">
              {capability.unavailabilityReason}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <CapabilityBadge enabled={capability.apiKeyConfigured} label={t("settings.provider.key")} />
          <CapabilityBadge enabled={capability.supportsText} label={t("settings.provider.text")} />
          <CapabilityBadge enabled={capability.supportsVision} label={t("settings.provider.vision")} />
          <CapabilityBadge enabled={capability.supportsStructuredOutput} label={t("settings.provider.schema")} />
        </div>
      </div>
    </div>
  );
}

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
  const [providerStatus, setProviderStatus] = useState<ProviderStatus | null>(null);
  const [providerStatusError, setProviderStatusError] = useState<string | null>(null);
  const [isProviderStatusLoading, setIsProviderStatusLoading] = useState(true);

  // Hydrate store from localStorage on mount
  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  useEffect(() => {
    let isMounted = true;

    async function loadProviderStatus() {
      setIsProviderStatusLoading(true);
      setProviderStatusError(null);

      try {
        const response = await fetch("/api/ai/provider-status", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Provider status request failed with ${response.status}`);
        }

        const data = (await response.json()) as ProviderStatus;
        if (isMounted) {
          setProviderStatus(data);
        }
      } catch (error) {
        if (isMounted) {
          setProviderStatusError(error instanceof Error ? error.message : "Unable to load provider status");
        }
      } finally {
        if (isMounted) {
          setIsProviderStatusLoading(false);
        }
      }
    }

    loadProviderStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const direction = selectedDirectionId ? getDirectionById(selectedDirectionId) : null;
  const activeProvider = providerStatus?.capabilities.find(
    (capability) => capability.providerId === providerStatus.providerUsed
  );

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
              {t("settings.kicker")}
            </SectionLabel>

            <SectionHeading subtitle={t("settings.subtitle")}>
              {t("settings.title")}
            </SectionHeading>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-6">
              {/* Current State */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("settings.current")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  {/* Brief */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings.brief")}
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
                        {t("settings.noBrief")}
                      </p>
                    )}
                  </div>

                  {/* Direction */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings.direction")}
                    </span>
                    {direction ? (
                      <div className="mt-2 p-3 rounded-xl bg-[var(--color-surface)]">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {direction.name}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                        {t("settings.noDirection")}
                      </p>
                    )}
                  </div>

                  {/* Tool */}
                  <div>
                    <span className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">
                      {t("settings.preferredTool")}
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
              {/* Provider Status */}
              <GlassCard>
                <GlassCardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                        {t("settings.provider.title")}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                        {t("settings.provider.desc")}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-white/60">
                      {isProviderStatusLoading ? (
                        <RefreshCw className="h-5 w-5 animate-spin text-[var(--color-text-secondary)]" />
                      ) : (
                        <Server className="h-5 w-5 text-[var(--color-accent-mist-blue)]" />
                      )}
                    </div>
                  </div>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  {providerStatusError ? (
                    <div className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4">
                      <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                      <div>
                        <p className="text-sm font-medium text-rose-700">Provider status unavailable</p>
                        <p className="mt-1 text-sm text-rose-600">{providerStatusError}</p>
                      </div>
                    </div>
                  ) : providerStatus ? (
                    <>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-[var(--color-surface)] p-3">
                          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            {t("settings.provider.configured")}
                          </p>
                          <p className="mt-1 font-medium text-[var(--color-text-primary)]">
                            {providerStatus.configuredProvider}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[var(--color-surface)] p-3">
                          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            {t("settings.provider.inUse")}
                          </p>
                          <p className="mt-1 font-medium text-[var(--color-text-primary)]">
                            {activeProvider?.name ?? providerStatus.providerUsed}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[var(--color-surface)] p-3">
                          <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                            {t("settings.provider.fallback")}
                          </p>
                          <p className="mt-1 font-medium text-[var(--color-text-primary)]">
                            {providerStatus.fallbackProvider ?? "none"}
                          </p>
                        </div>
                      </div>

                      {!providerStatus.isRealAIEnabled && (
                        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
                          {t("settings.provider.realDisabled")}
                        </div>
                      )}

                      <div className="space-y-3">
                        {providerStatus.capabilities.map((capability) => (
                          <ProviderRow
                            key={capability.providerId}
                            capability={capability}
                            isConfigured={capability.providerId === providerStatus.configuredProvider}
                            isUsed={capability.providerId === providerStatus.providerUsed}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-[var(--color-text-secondary)]">{t("settings.loading")}</p>
                  )}
                </GlassCardContent>
              </GlassCard>

              {/* Data Management */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("settings.data")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-4">
                  <LiquidButton
                    variant="secondary"
                    onClick={handleExportData}
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t("settings.export")}
                  </LiquidButton>

                  <LiquidButton
                    variant="secondary"
                    onClick={clearHistory}
                    className="w-full justify-start"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("settings.clearHistory")}
                  </LiquidButton>

                  <div className="pt-4 border-t border-[var(--color-border)]">
                    <LiquidButton
                      variant="ghost"
                      onClick={handleClearAllData}
                      className="w-full justify-start text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t("settings.clearAll")}
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
                        {t("settings.storage.title")}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        {t("settings.storage.desc")}
                      </p>
                    </div>
                  </div>
                </GlassCardContent>
              </GlassCard>

              {/* Tech Info */}
              <GlassCard>
                <GlassCardHeader>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t("settings.tech")}
                  </h3>
                </GlassCardHeader>
                <GlassCardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings.storage")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings.localStorage")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings.aiApi")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {activeProvider
                        ? `${activeProvider.name}${providerStatus?.fallbackProvider ? " via fallback" : ""}`
                        : t("settings.loading")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings.database")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings.none")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {t("settings.phase")}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {t("settings.phaseValue")}
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

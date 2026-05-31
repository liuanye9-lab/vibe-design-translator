// ============================================================
// Vibe Design Translator - Project Workspace Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell, PageContainer, PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { EmptyState } from "@/components/ui/empty-state";
import { useDesignStore } from "@/store/use-design-store";
import { useI18n } from "@/lib/i18n/use-i18n";
import type { DesignProject } from "@/lib/types";
import {
  Folder,
  Plus,
  Pencil,
  Trash2,
  Copy,
  Download,
  FileJson,
  FileText,
} from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  landing: "workspace_cat_landing",
  product: "workspace_cat_product",
  marketing: "workspace_cat_marketing",
  dashboard: "workspace_cat_dashboard",
  other: "workspace_cat_other",
};

export default function WorkspacePage() {
  const router = useRouter();
  const { t, tVar } = useI18n();
  const {
    projects,
    currentProjectId,
    isHydrated,
    hydrateFromStorage,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    setCurrentProject,
    exportProjectAsJson,
    exportProjectAsMarkdown,
  } = useDesignStore();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectCategory, setNewProjectCategory] = useState("landing");

  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  const handleCreate = () => {
    if (!newProjectName.trim()) return;
    const id = createProject(newProjectName.trim(), newProjectCategory);
    setShowCreateModal(false);
    setNewProjectName("");
    setNewProjectCategory("landing");
  };

  const handleRename = (project: DesignProject) => {
    setEditingId(project.id);
    setEditName(project.name);
  };

  const handleRenameSave = (id: string) => {
    if (editName.trim()) {
      updateProject(id, { name: editName.trim() });
    }
    setEditingId(null);
    setEditName("");
  };

  const handleDuplicate = (id: string) => {
    duplicateProject(id);
  };

  const handleDelete = (id: string) => {
    if (confirm(t("workspace_delete_confirm"))) {
      deleteProject(id);
    }
  };

  const handleSelect = (id: string) => {
    setCurrentProject(id);
    router.push("/brief");
  };

  const handleExportJson = (id: string, name: string) => {
    const json = exportProjectAsJson(id);
    if (json) {
      downloadFile(`${name}.json`, json, "application/json");
    }
  };

  const handleExportMarkdown = (id: string, name: string) => {
    const md = exportProjectAsMarkdown(id);
    if (md) {
      downloadFile(`${name}.md`, md, "text/markdown");
    }
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell showBackButton backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <SectionLabel>{t("workspace_tag")}</SectionLabel>
              <SectionHeading subtitle={t("workspace_subtitle")}>
                {t("workspace_title")}
              </SectionHeading>
            </div>
            <LiquidButton
              variant="primary"
              size="md"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              {t("workspace_new")}
            </LiquidButton>
          </div>

          {/* Create Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
              <GlassCard className="w-full max-w-md p-6">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                  {t("workspace_new_title")}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      {t("workspace_name_label")}
                    </label>
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder={t("workspace_name_placeholder")}
                      className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-white/80 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)]/30 focus:border-[var(--color-accent-ios-blue)] transition-all"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">
                      {t("workspace_type_label")}
                    </label>
                    <select
                      value={newProjectCategory}
                      onChange={(e) => setNewProjectCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-white/80 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)]/30 focus:border-[var(--color-accent-ios-blue)] transition-all"
                    >
                      {Object.entries(CATEGORY_LABELS).map(([key, tKey]) => (
                        <option key={key} value={key}>
                          {t(tKey)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <LiquidButton
                      variant="secondary"
                      size="md"
                      className="flex-1"
                      onClick={() => {
                        setShowCreateModal(false);
                        setNewProjectName("");
                      }}
                    >
                      取消
                    </LiquidButton>
                    <LiquidButton
                      variant="primary"
                      size="md"
                      className="flex-1"
                      onClick={handleCreate}
                    >
                      {t("workspace_create")}
                    </LiquidButton>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Project List */}
          {projects.length === 0 ? (
            <EmptyState
              icon={Folder}
              title={t("workspace_empty_title")}
              description={t("workspace_empty_desc")}
              action={{
                label: t("workspace_empty_action"),
                onClick: () => setShowCreateModal(true),
              }}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const isCurrent = project.id === currentProjectId;
                const isEditing = editingId === project.id;
                const diagnosisCount = project.diagnosisReports.length;
                const promptCount = project.promptExports.length;

                return (
                  <GlassCard
                    key={project.id}
                    className={`group relative p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      isCurrent ? "ring-2 ring-[var(--color-accent-ios-blue)]/40" : ""
                    }`}
                    onClick={() => !isEditing && handleSelect(project.id)}
                  >
                    {/* Status indicator */}
                    {isCurrent && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--color-accent-ios-blue)]/10 text-[var(--color-accent-ios-blue)]">
                          {t("workspace_current")}
                        </span>
                      </div>
                    )}

                    {/* Project Name */}
                    {isEditing ? (
                      <div className="mb-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 rounded-lg border border-[var(--color-border)] bg-white/80 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)]/30"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleRenameSave(project.id);
                            if (e.key === "Escape") setEditingId(null);
                          }}
                          onBlur={() => handleRenameSave(project.id)}
                        />
                      </div>
                    ) : (
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1 truncate">
                        {project.name}
                      </h3>
                    )}

                    {/* Category */}
                    <p className="text-xs text-[var(--color-text-secondary)] mb-3">
                      {CATEGORY_LABELS[project.category] || project.category}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mb-4">
                      {diagnosisCount > 0 && (
                        <span>{tVar("workspace_diagnose_count", { n: diagnosisCount })}</span>
                      )}
                      {promptCount > 0 && (
                        <span>{tVar("workspace_export_count", { n: promptCount })}</span>
                      )}
                      <span>
                        {new Date(project.updatedAt).toLocaleDateString("zh-CN")}
                      </span>
                    </div>

                    {/* Actions */}
                    <div
                      className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleRename(project)}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
                        title={t("workspace_rename")}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(project.id)}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
                        title={t("workspace_duplicate")}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleExportJson(project.id, project.name)}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
                        title={t("workspace_export_json")}
                      >
                        <FileJson className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleExportMarkdown(project.id, project.name)}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors"
                        title={t("workspace_export_md")}
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[var(--color-text-secondary)] hover:text-red-500 transition-colors ml-auto"
                        title={t("workspace_delete")}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

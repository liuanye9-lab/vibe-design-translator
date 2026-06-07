// ============================================================
// Vibe Design Translator - Workspace Page
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Folder, MoreVertical, Pencil, Copy, Trash2, Download, FileJson, FileText, Calendar, Stethoscope, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/layout";
import { PageContainer } from "@/components/layout";
import { PageWrapper } from "@/components/layout";
import { SectionHeading, SectionLabel } from "@/components/ui/section-heading";
import { GlassCard } from "@/components/ui/glass-card";
import { EmptyState } from "@/components/ui/empty-state";
import { useDesignStore } from "@/store/use-design-store";
import { DesignProject } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface ProjectCardProps {
  project: DesignProject;
  isActive: boolean;
  onSelect: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onExportJson: () => void;
  onExportMarkdown: () => void;
}

function ProjectCard({
  project,
  isActive,
  onSelect,
  onRename,
  onDuplicate,
  onDelete,
  onExportJson,
  onExportMarkdown,
}: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative rounded-2xl p-5 cursor-pointer transition-all duration-300",
        "bg-white/60 backdrop-blur-xl border",
        isActive
          ? "border-blue-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
          : "border-white/80 hover:border-white hover:-translate-y-0.5 hover:bg-white/70 shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              isActive ? "bg-blue-50" : "bg-gray-50"
            )}
          >
            <Folder
              className={cn(
                "w-5 h-5",
                isActive ? "text-blue-500" : "text-gray-400"
              )}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
              {project.name}
            </h3>
            <p className="text-xs text-gray-400">
              {formatDate(project.updatedAt)}
            </p>
          </div>
        </div>

        {/* Menu button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className={cn(
            "p-2 rounded-lg transition-all duration-200",
            "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          )}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div
            className={cn(
              "absolute right-4 top-14 z-20",
              "w-48 py-1.5 rounded-xl",
              "bg-white/95 backdrop-blur-xl",
              "border border-white/80",
              "shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                onRename();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Rename
            </button>
            <button
              onClick={() => {
                onDuplicate();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>
            <div className="h-px bg-gray-100 my-1.5" />
            <button
              onClick={() => {
                onExportJson();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FileJson className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={() => {
                onExportMarkdown();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Export Markdown
            </button>
            <div className="h-px bg-gray-100 my-1.5" />
            <button
              onClick={() => {
                onDelete();
                setShowMenu(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {project.brief && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Brief</span>
          </div>
        )}
        {project.diagnosisReports.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{project.diagnosisReports.length} diagnosis</span>
          </div>
        )}
        {project.executionPack && (
          <div className="px-2 py-0.5 rounded-full bg-green-50 text-xs text-green-600">
            Pack ready
          </div>
        )}
      </div>

      {/* Category */}
      {project.brief?.productCategory && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            {project.brief.productCategory}
          </span>
        </div>
      )}
    </div>
  );
}

export default function WorkspacePage() {
  const router = useRouter();
  const {
    projects,
    currentProjectId,
    createProject,
    deleteProject,
    duplicateProject,
    updateProject,
    setCurrentProject,
    exportProjectAsJson,
    exportProjectAsMarkdown,
    isHydrated,
    hydrateFromStorage,
  } = useDesignStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [renamingProject, setRenamingProject] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    if (!isHydrated) {
      hydrateFromStorage();
    }
  }, [isHydrated, hydrateFromStorage]);

  const handleCreate = () => {
    if (newProjectName.trim()) {
      const id = createProject(newProjectName.trim());
      setNewProjectName("");
      setIsCreating(false);
      // Navigate to brief page with new project
      router.push("/brief");
    }
  };

  const handleRename = (id: string) => {
    setRenamingProject(id);
    const project = projects.find((p) => p.id === id);
    setRenameValue(project?.name || "");
  };

  const handleRenameSubmit = () => {
    if (renamingProject && renameValue.trim()) {
      updateProject(renamingProject, { name: renameValue.trim() });
    }
    setRenamingProject(null);
    setRenameValue("");
  };

  const handleSelect = (id: string) => {
    setCurrentProject(id);
    router.push("/brief");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateProject(id);
  };

  const handleExportJson = (id: string) => {
    const json = exportProjectAsJson(id);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = (id: string) => {
    const markdown = exportProjectAsMarkdown(id);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-${id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell showBackButton backHref="/" showNav={true}>
      <PageWrapper>
        <PageContainer className="py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionLabel>Project Workspace</SectionLabel>
              <SectionHeading subtitle="Manage your design translation projects">
                Workspace
              </SectionHeading>
            </div>
            
            <button
              onClick={() => setIsCreating(true)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                "bg-gray-900 text-white text-sm font-medium",
                "hover:bg-gray-800 transition-all duration-200",
                "shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              )}
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>

          {/* Create Project Form */}
          {isCreating && (
            <GlassCard className="p-6 mb-6">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project name..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                    if (e.key === "Escape") setIsCreating(false);
                  }}
                  className={cn(
                    "flex-1 px-4 py-2.5 rounded-xl text-sm",
                    "bg-white/60 border border-white/80",
                    "placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  )}
                />
                <button
                  onClick={handleCreate}
                  disabled={!newProjectName.trim()}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium",
                    "bg-gray-900 text-white",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "hover:bg-gray-800 transition-all duration-200"
                  )}
                >
                  Create
                </button>
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </GlassCard>
          )}

          {/* Project Grid */}
          {projects.length === 0 ? (
            <EmptyState
              icon={Folder}
              title="No projects yet"
              description="Create your first design translation project to get started."
              action={
                <button
                  onClick={() => setIsCreating(true)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl",
                    "bg-gray-900 text-white text-sm font-medium",
                    "hover:bg-gray-800 transition-all duration-200"
                  )}
                >
                  <Plus className="w-4 h-4" />
                  Create Project
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="relative">
                  {renamingProject === project.id ? (
                    <GlassCard className="p-5">
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRenameSubmit();
                          if (e.key === "Escape") setRenamingProject(null);
                        }}
                        onBlur={handleRenameSubmit}
                        className={cn(
                          "w-full px-3 py-2 rounded-lg text-sm mb-2",
                          "bg-white/60 border border-white/80",
                          "focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        )}
                      />
                      <button
                        onClick={handleRenameSubmit}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Press Enter to save
                      </button>
                    </GlassCard>
                  ) : (
                    <ProjectCard
                      project={project}
                      isActive={currentProjectId === project.id}
                      onSelect={() => handleSelect(project.id)}
                      onRename={() => handleRename(project.id)}
                      onDuplicate={() => handleDuplicate(project.id)}
                      onDelete={() => handleDelete(project.id)}
                      onExportJson={() => handleExportJson(project.id)}
                      onExportMarkdown={() => handleExportMarkdown(project.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Projects are stored locally in your browser. Use Export to backup your work.
            </p>
          </div>
        </PageContainer>
      </PageWrapper>
    </AppShell>
  );
}

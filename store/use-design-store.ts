// ============================================================
// Vibe Design Translator - Zustand Store
// ============================================================

import { create } from "zustand";
import {
  UserMode,
  ToolType,
  DesignBrief,
  DiagnosisReport,
  HistoryItem,
  DesignProject,
  PromptExport,
  DesignExecutionPack,
  ScreenshotAsset,
  Locale,
} from "@/lib/types";
import { storage, historyStorage } from "@/lib/storage";

// ============================================================
// Store Interface
// ============================================================

interface DesignStore {
  // State
  currentMode: UserMode | null;
  locale: Locale;
  brief: DesignBrief | null;
  selectedDirectionId: string | null;
  selectedTool: ToolType;
  diagnosisReport: DiagnosisReport | null;
  history: HistoryItem[];
  isHydrated: boolean;

  // Project Workspace
  projects: DesignProject[];
  currentProjectId: string | null;

  // Actions - Core
  setLocale: (locale: Locale) => void;
  setMode: (mode: UserMode | null) => void;
  updateBrief: (partial: Partial<DesignBrief>) => void;
  setBrief: (brief: DesignBrief) => void;
  resetBrief: () => void;
  setSelectedDirection: (id: string | null) => void;
  setSelectedTool: (tool: ToolType) => void;
  setDiagnosisReport: (report: DiagnosisReport | null) => void;
  addHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
  clearHistory: () => void;
  clearAllData: () => void;
  hydrateFromStorage: () => void;

  // Actions - Project Workspace
  createProject: (name?: string) => string;
  updateProject: (id: string, patch: Partial<DesignProject>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => string;
  setCurrentProject: (id: string | null) => void;
  saveCurrentBriefToProject: () => void;
  saveExecutionPackToProject: (pack: DesignExecutionPack) => void;
  addDiagnosisToProject: (report: DiagnosisReport) => void;
  addPromptExportToProject: (exportItem: PromptExport) => void;
  addScreenshotToProject: (screenshot: ScreenshotAsset) => void;
  removeScreenshotFromProject: (projectId: string, screenshotId: string) => void;
  exportProjectAsJson: (id: string) => string;
  exportProjectAsMarkdown: (id: string) => string;
  getCurrentProject: () => DesignProject | null;
}

// ============================================================
// Helper Functions
// ============================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createEmptyProject(name?: string): DesignProject {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: name || `Project ${new Date().toLocaleDateString()}`,
    createdAt: now,
    updatedAt: now,
    diagnosisReports: [],
    promptExports: [],
    screenshots: [],
  };
}

// ============================================================
// Store Implementation
// ============================================================

export const useDesignStore = create<DesignStore>((set, get) => ({
  // Initial state
  currentMode: null,
  locale: "zh",
  brief: null,
  selectedDirectionId: null,
  selectedTool: "claude-code",
  diagnosisReport: null,
  history: [],
  isHydrated: false,

  // Project Workspace
  projects: [],
  currentProjectId: null,

  // ============ Core Actions ============

  setLocale: (locale) => {
    set({ locale });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_locale", locale);
    }
  },

  setMode: (mode) => {
    set({ currentMode: mode });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_mode", mode);
    }
  },

  updateBrief: (partial) => {
    const current = get().brief;
    const updated = current ? { ...current, ...partial } : partial as DesignBrief;
    set({ brief: updated });
    if (typeof window !== "undefined" && updated) {
      storage.set("vibe_translator_brief", updated);
    }
  },

  setBrief: (brief) => {
    set({ brief });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_brief", brief);
    }
  },

  resetBrief: () => {
    set({ brief: null, selectedDirectionId: null });
    if (typeof window !== "undefined") {
      storage.remove("vibe_translator_brief");
      storage.remove("vibe_translator_direction");
    }
  },

  setSelectedDirection: (id) => {
    set({ selectedDirectionId: id });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_direction", id);
    }
  },

  setSelectedTool: (tool) => {
    set({ selectedTool: tool });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_tool", tool);
    }
  },

  setDiagnosisReport: (report) => {
    set({ diagnosisReport: report });
    if (typeof window !== "undefined" && report) {
      storage.set("vibe_translator_diagnosis", report);
    }
  },

  addHistory: (item) => {
    const historyItem: HistoryItem = {
      ...item,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    const history = get().history;
    const updated = [historyItem, ...history].slice(0, 50); // Keep last 50 items
    set({ history: updated });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_history", updated);
    }
  },

  clearHistory: () => {
    set({ history: [] });
    if (typeof window !== "undefined") {
      storage.remove("vibe_translator_history");
    }
  },

  clearAllData: () => {
    set({
      currentMode: null,
      locale: "zh",
      brief: null,
      selectedDirectionId: null,
      selectedTool: "claude-code",
      diagnosisReport: null,
      history: [],
      projects: [],
      currentProjectId: null,
    });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_mode", null);
      storage.set("vibe_translator_locale", "zh");
      storage.remove("vibe_translator_brief");
      storage.remove("vibe_translator_direction");
      storage.remove("vibe_translator_diagnosis");
      storage.remove("vibe_translator_history");
      storage.remove("vibe_translator_projects");
      storage.remove("vibe_translator_current_project");
    }
  },

  hydrateFromStorage: () => {
    if (typeof window === "undefined") return;

    try {
      const mode = storage.get<UserMode | null>("vibe_translator_mode");
      const locale = storage.get<Locale>("vibe_translator_locale") || "zh";
      const brief = storage.get<DesignBrief | null>("vibe_translator_brief");
      const directionId = storage.get<string | null>("vibe_translator_direction");
      const tool = storage.get<ToolType>("vibe_translator_tool");
      const diagnosis = storage.get<DiagnosisReport | null>("vibe_translator_diagnosis");
      const history = storage.get<HistoryItem[]>("vibe_translator_history") || [];

      // Hydrate project workspace
      const projects = storage.get<DesignProject[]>("vibe_translator_projects") || [];
      const currentProjectId = storage.get<string | null>("vibe_translator_current_project");

      set({
        currentMode: mode,
        locale,
        brief,
        selectedDirectionId: directionId,
        selectedTool: tool || "claude-code",
        diagnosisReport: diagnosis,
        history,
        projects,
        currentProjectId,
        isHydrated: true,
      });
    } catch (error) {
      console.error("Failed to hydrate from storage:", error);
      set({ isHydrated: true });
    }
  },

  // ============ Project Workspace Actions ============

  createProject: (name) => {
    const newProject = createEmptyProject(name);
    const projects = get().projects;
    const updated = [newProject, ...projects];

    set({
      projects: updated,
      currentProjectId: newProject.id
    });

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", updated);
      storage.set("vibe_translator_current_project", newProject.id);
    }

    get().addHistory({ type: "project_created", data: { projectId: newProject.id, name: newProject.name } });

    return newProject.id;
  },

  updateProject: (id, patch) => {
    const projects = get().projects;
    const updated = projects.map((p) =>
      p.id === id
        ? { ...p, ...patch, updatedAt: new Date().toISOString() }
        : p
    );

    set({ projects: updated });

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", updated);
    }

    get().addHistory({ type: "project_updated", data: { projectId: id } });
  },

  deleteProject: (id) => {
    const projects = get().projects;
    const updated = projects.filter((p) => p.id !== id);
    const currentProjectId = get().currentProjectId;

    set({
      projects: updated,
      currentProjectId: currentProjectId === id ? null : currentProjectId
    });

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", updated);
      if (currentProjectId === id) {
        storage.remove("vibe_translator_current_project");
      }
    }
  },

  duplicateProject: (id) => {
    const projects = get().projects;
    const source = projects.find((p) => p.id === id);

    if (!source) return "";

    const now = new Date().toISOString();
    const newProject: DesignProject = {
      ...source,
      id: generateId(),
      name: `${source.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    };

    const updated = [newProject, ...projects];
    set({ projects: updated });

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", updated);
    }

    return newProject.id;
  },

  setCurrentProject: (id) => {
    set({ currentProjectId: id });

    if (typeof window !== "undefined") {
      if (id) {
        storage.set("vibe_translator_current_project", id);
      } else {
        storage.remove("vibe_translator_current_project");
      }
    }

    // Load project data into store
    if (id) {
      const project = get().projects.find((p) => p.id === id);
      if (project) {
        set({
          brief: project.brief || null,
          selectedDirectionId: project.selectedDirectionId || null,
        });
      }
    }
  },

  saveCurrentBriefToProject: () => {
    const { currentProjectId, brief, selectedDirectionId } = get();
    if (!currentProjectId || !brief) return;

    get().updateProject(currentProjectId, {
      brief,
      selectedDirectionId,
    });
  },

  saveExecutionPackToProject: (pack) => {
    const { currentProjectId } = get();
    if (!currentProjectId) return;

    get().updateProject(currentProjectId, { executionPack: pack });
  },

  addDiagnosisToProject: (report) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    const project = projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    const updatedReports = [...project.diagnosisReports, report];
    get().updateProject(currentProjectId, { diagnosisReports: updatedReports });
  },

  addPromptExportToProject: (exportItem) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    const project = projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    const updatedExports = [...project.promptExports, exportItem];
    get().updateProject(currentProjectId, { promptExports: updatedExports });
  },

  addScreenshotToProject: (screenshot) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    const project = projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    const updatedScreenshots = [...project.screenshots, screenshot];
    get().updateProject(currentProjectId, { screenshots: updatedScreenshots });
  },

  removeScreenshotFromProject: (projectId, screenshotId) => {
    const projects = get().projects;
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const updatedScreenshots = project.screenshots.filter((s) => s.id !== screenshotId);
    get().updateProject(projectId, { screenshots: updatedScreenshots });
  },

  exportProjectAsJson: (id) => {
    const projects = get().projects;
    const project = projects.find((p) => p.id === id);
    if (!project) return "{}";

    return JSON.stringify(project, null, 2);
  },

  exportProjectAsMarkdown: (id) => {
    const projects = get().projects;
    const project = projects.find((p) => p.id === id);
    if (!project) return "";

    const lines: string[] = [
      `# ${project.name}`,
      "",
      `> ${project.description || "Design translation project"}`,
      "",
      `**Created**: ${new Date(project.createdAt).toLocaleDateString()}`,
      `**Updated**: ${new Date(project.updatedAt).toLocaleDateString()}`,
      "",
      "---",
      "",
    ];

    if (project.brief) {
      lines.push("## Design Brief", "");
      lines.push(`| Field | Value |`, "");
      lines.push(`| --- | --- |`);
      lines.push(`| Product | ${project.brief.productName} |`);
      lines.push(`| Category | ${project.brief.productCategory} |`);
      lines.push(`| Target Users | ${project.brief.targetUsers} |`);
      lines.push(`| Page Goal | ${project.brief.pageGoal} |`);
      if (project.brief.firstImpression) {
        lines.push(`| First Impression | ${project.brief.firstImpression} |`);
      }
      if (project.brief.businessPriority) {
        lines.push(`| Business Priority | ${project.brief.businessPriority} |`);
      }
      lines.push("", "");
    }

    if (project.executionPack) {
      lines.push("## Execution Pack", "");
      if (project.executionPack.strategy?.length) {
        lines.push("### Strategy", "");
        project.executionPack.strategy.forEach((s) => lines.push(`- ${s}`));
        lines.push("");
      }
      if (project.executionPack.antiAILookChecklist?.length) {
        lines.push("### Anti-AI-Look Checklist", "");
        project.executionPack.antiAILookChecklist.forEach((c) => lines.push(`- ${c}`));
        lines.push("");
      }
    }

    if (project.diagnosisReports.length > 0) {
      lines.push("## Diagnosis Reports", "");
      project.diagnosisReports.forEach((report, i) => {
        lines.push(`### Report ${i + 1}`, "");
        lines.push(`**Overall Score**: ${report.overallScore}/100`, "");
        if (report.findings?.length) {
          lines.push("**Findings**:", "");
          report.findings.forEach((f) => lines.push(`- ${f}`));
          lines.push("");
        }
      });
    }

    return lines.join("\n");
  },

  getCurrentProject: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return null;
    return projects.find((p) => p.id === currentProjectId) || null;
  },
}));

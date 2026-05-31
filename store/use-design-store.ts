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
  DiagnosisReportEnhanced,
  PromptExport,
  ScreenshotAsset,
} from "@/lib/types";
import { storage, historyStorage } from "@/lib/storage";

// ============================================================
// Store Interface
// ============================================================

interface DesignStore {
  // State
  currentMode: UserMode | null;
  brief: DesignBrief | null;
  selectedDirectionId: string | null;
  selectedTool: ToolType;
  diagnosisReport: DiagnosisReport | null;
  history: HistoryItem[];
  isHydrated: boolean;

  // Phase 3: Project Workspace State
  projects: DesignProject[];
  currentProjectId: string | null;

  // Actions
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

  // Phase 3: Project Management Actions
  createProject: (name: string, category: string) => string;
  updateProject: (id: string, partial: Partial<DesignProject>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => string;
  setCurrentProject: (id: string | null) => void;
  saveCurrentBriefToProject: () => void;
  addDiagnosisToProject: (report: DiagnosisReportEnhanced) => void;
  addPromptExportToProject: (exportItem: PromptExport) => void;
  exportProjectAsJson: (id: string) => string | null;
  exportProjectAsMarkdown: (id: string) => string | null;
}

// ============================================================
// Store Implementation
// ============================================================

export const useDesignStore = create<DesignStore>((set, get) => ({
  // Initial state
  currentMode: null,
  brief: null,
  selectedDirectionId: null,
  selectedTool: "claude-code",
  diagnosisReport: null,
  history: [],
  isHydrated: false,

  // Phase 3: Project Workspace State
  projects: [],
  currentProjectId: null,

  // Actions
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
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    const history = get().history;
    const updated = [historyItem, ...history].slice(0, 50);
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
      const brief = storage.get<DesignBrief | null>("vibe_translator_brief");
      const directionId = storage.get<string | null>("vibe_translator_direction");
      const tool = storage.get<ToolType>("vibe_translator_tool");
      const diagnosis = storage.get<DiagnosisReport | null>("vibe_translator_diagnosis");
      const history = storage.get<HistoryItem[]>("vibe_translator_history") || [];
      const projects = storage.get<DesignProject[]>("vibe_translator_projects") || [];
      const currentProjectId = storage.get<string | null>("vibe_translator_current_project");

      set({
        currentMode: mode,
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

  // Phase 3: Project Management Actions

  createProject: (name: string, category: string) => {
    const project: DesignProject = {
      id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      category,
      brief: get().brief,
      selectedDirectionId: get().selectedDirectionId,
      diagnosisReports: [],
      promptExports: [],
      screenshots: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      projects: [project, ...state.projects],
      currentProjectId: project.id,
    }));

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", get().projects);
      storage.set("vibe_translator_current_project", project.id);
    }

    return project.id;
  },

  updateProject: (id: string, partial: Partial<DesignProject>) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...partial, updatedAt: new Date().toISOString() } : p
      ),
    }));
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", get().projects);
    }
  },

  deleteProject: (id: string) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
    }));
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", get().projects);
      if (get().currentProjectId === null) {
        storage.remove("vibe_translator_current_project");
      }
    }
  },

  duplicateProject: (id: string) => {
    const source = get().projects.find((p) => p.id === id);
    if (!source) return id;

    const duplicated: DesignProject = {
      ...source,
      id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: `${source.name} (副本)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      projects: [duplicated, ...state.projects],
    }));

    if (typeof window !== "undefined") {
      storage.set("vibe_translator_projects", get().projects);
    }

    return duplicated.id;
  },

  setCurrentProject: (id: string | null) => {
    set({ currentProjectId: id });
    if (typeof window !== "undefined") {
      if (id) {
        storage.set("vibe_translator_current_project", id);
      } else {
        storage.remove("vibe_translator_current_project");
      }
    }
  },

  saveCurrentBriefToProject: () => {
    const { currentProjectId, brief } = get();
    if (!currentProjectId || !brief) return;

    get().updateProject(currentProjectId, { brief });
  },

  addDiagnosisToProject: (report: DiagnosisReportEnhanced) => {
    const { currentProjectId } = get();
    if (!currentProjectId) return;

    const project = get().projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    get().updateProject(currentProjectId, {
      diagnosisReports: [...project.diagnosisReports, report],
      screenshots: report.screenshotAssetId
        ? [...project.screenshots] // screenshot already stored in asset
        : project.screenshots,
    });
  },

  addPromptExportToProject: (exportItem: PromptExport) => {
    const { currentProjectId } = get();
    if (!currentProjectId) return;

    const project = get().projects.find((p) => p.id === currentProjectId);
    if (!project) return;

    get().updateProject(currentProjectId, {
      promptExports: [...project.promptExports, exportItem],
    });
  },

  exportProjectAsJson: (id: string) => {
    const project = get().projects.find((p) => p.id === id);
    if (!project) return null;

    const json = JSON.stringify(project, null, 2);
    return json;
  },

  exportProjectAsMarkdown: (id: string) => {
    const project = get().projects.find((p) => p.id === id);
    if (!project) return null;

    const brief = project.brief;
    const diagnoses = project.diagnosisReports;
    const directions = project.selectedDirectionId
      ? `- **Selected Direction:** \`${project.selectedDirectionId}\``
      : "- **Selected Direction:** None";

    let md = `# ${project.name}\n\n`;
    md += `**Category:** ${project.category}\n`;
    md += `**Created:** ${new Date(project.createdAt).toLocaleDateString()}\n`;
    md += `**Updated:** ${new Date(project.updatedAt).toLocaleDateString()}\n\n`;

    if (brief) {
      md += `## Design Brief\n\n`;
      md += `- **Product:** ${brief.productName}\n`;
      md += `- **Category:** ${brief.productCategory}\n`;
      md += `- **Target Users:** ${brief.targetUsers}\n`;
      md += `- **Page Goal:** ${brief.pageGoal}\n`;
      md += `- **Main CTA:** ${brief.mainCTA}\n`;
      if (brief.firstImpression) md += `- **First Impression:** ${brief.firstImpression}\n`;
      if (brief.businessPriority) md += `- **Business Priority:** ${brief.businessPriority}\n`;
      if (brief.audience) md += `- **Audience:** ${brief.audience}\n`;
      md += `\n`;
    }

    md += `${directions}\n\n`;

    if (diagnoses.length > 0) {
      md += `## Diagnosis Reports\n\n`;
      diagnoses.forEach((d, i) => {
        md += `### Report ${i + 1}\n`;
        md += `- **Overall Score:** ${d.overallScore}/100\n`;
        md += `- **Confidence:** ${d.confidence || "N/A"}\n`;
        md += `- **Findings:** ${d.findings.join("; ")}\n\n`;
      });
    }

    if (project.promptExports.length > 0) {
      md += `## Prompt Exports\n\n`;
      project.promptExports.forEach((exp, i) => {
        md += `### Export ${i + 1} (${exp.tool})\n`;
        md += `\`\`\`\n${exp.content}\n\`\`\`\n\n`;
      });
    }

    return md;
  },
}));

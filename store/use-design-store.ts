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
      brief: null,
      selectedDirectionId: null,
      selectedTool: "claude-code",
      diagnosisReport: null,
      history: [],
    });
    if (typeof window !== "undefined") {
      storage.set("vibe_translator_mode", null);
      storage.remove("vibe_translator_brief");
      storage.remove("vibe_translator_direction");
      storage.remove("vibe_translator_diagnosis");
      storage.remove("vibe_translator_history");
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

      set({
        currentMode: mode,
        brief,
        selectedDirectionId: directionId,
        selectedTool: tool || "claude-code",
        diagnosisReport: diagnosis,
        history,
        isHydrated: true,
      });
    } catch (error) {
      console.error("Failed to hydrate from storage:", error);
      set({ isHydrated: true });
    }
  },
}));
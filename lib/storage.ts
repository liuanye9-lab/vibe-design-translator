// ============================================================
// Vibe Design Translator - Storage Utilities
// ============================================================

import { DesignBrief, HistoryItem, DiagnosisReport } from "./types";

// Helper functions for localStorage (client-side only)
export const storage = {
  // Get value from localStorage
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Failed to get ${key} from localStorage:`, error);
      return null;
    }
  },

  // Set value in localStorage
  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set ${key} to localStorage:`, error);
    }
  },

  // Remove value from localStorage
  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error);
    }
  },

  // Clear all related storage
  clearAll(): void {
    if (typeof window === "undefined") return;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("vibe_translator_")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error("Failed to clear storage:", error);
    }
  },
};

// ========================================
// Type-specific storage helpers
// ========================================

export const briefStorage = {
  get(): DesignBrief | null {
    return storage.get<DesignBrief>("vibe_translator_brief");
  },

  save(brief: DesignBrief): void {
    storage.set("vibe_translator_brief", brief);
  },

  clear(): void {
    storage.remove("vibe_translator_brief");
  },
};

export const historyStorage = {
  get(): HistoryItem[] {
    return storage.get<HistoryItem[]>("vibe_translator_history") || [];
  },

  add(item: HistoryItem): void {
    const history = historyStorage.get();
    history.unshift({ ...item });
    storage.set("vibe_translator_history", history);
  },

  clear(): void {
    storage.remove("vibe_translator_history");
  },
};

export const diagnosisStorage = {
  get(): DiagnosisReport | null {
    return storage.get<DiagnosisReport>("vibe_translator_diagnosis");
  },

  save(report: DiagnosisReport): void {
    storage.set("vibe_translator_diagnosis", report);
  },

  clear(): void {
    storage.remove("vibe_translator_diagnosis");
  },
};
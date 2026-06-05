// ============================================================
// Vibe Design Translator - i18n Type Definitions
// ============================================================

export type Locale = "zh" | "en";

export interface OptionItem {
  value: string;
  labelKey: string;
  descriptionKey?: string;
}

export interface LocalizedOptionItem {
  value: string;
  label: {
    zh: string;
    en: string;
  };
  description?: {
    zh: string;
    en: string;
  };
}

export interface I18nDictionary {
  nav: Record<string, string>;
  common: Record<string, string>;
  home: Record<string, string>;
  brief: Record<string, string>;
  directions: Record<string, string>;
  pack: Record<string, string>;
  compiler: Record<string, string>;
  diagnosis: Record<string, string>;
  patterns: Record<string, string>;
  workspace: Record<string, string>;
  pricing: Record<string, string>;
  settings: Record<string, string>;
  agent: Record<string, string>;
  prompts: Record<string, string>;
  options: Record<string, {
    label: string;
    description?: string;
  }>;
}

export type DictionarySection = keyof I18nDictionary;

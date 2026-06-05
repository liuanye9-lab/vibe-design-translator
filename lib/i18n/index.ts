// ============================================================
// Vibe Design Translator - i18n Module Index
// ============================================================

export type { Locale, I18nDictionary, DictionarySection, OptionItem, LocalizedOptionItem } from "./types";
export { zh } from "./zh";
export { en } from "./en";
export { looksLikeI18nKey, safeText, getOptionLabel, getOptionDescription, formatTemplate } from "./safe-text";

import { zh } from "./zh";
import { en } from "./en";
import type { Locale, I18nDictionary, DictionarySection } from "./types";

/**
 * Get dictionary for a given locale
 */
export function getDictionary(locale: Locale): I18nDictionary {
  return locale === "en" ? en : zh;
}

/**
 * Get a translation string from dictionary
 * @param dict - The full dictionary
 * @param section - The section key (e.g., 'nav', 'home', 'brief')
 * @param key - The key within the section
 * @param fallback - Optional fallback string
 */
export function t(
  dict: I18nDictionary,
  section: DictionarySection,
  key: string,
  fallback?: string
): string {
  const sectionDict = dict[section];
  if (!sectionDict) return fallback || `${section}.${key}`;

  // Handle options section specially
  if (section === "options") {
    const options = sectionDict as Record<string, { label: string; description?: string }>;
    const option = options[key];
    if (option) return option.label;
    return fallback || key;
  }

  const value = (sectionDict as Record<string, string>)[key];
  if (value === undefined) return fallback || `${section}.${key}`;
  return value;
}

/**
 * Get an option's label and description
 */
export function getOption(
  dict: I18nDictionary,
  key: string
): { label: string; description?: string } {
  const options = dict.options;
  const option = options[key];
  if (!option) {
    return { label: key };
  }
  return option;
}

/**
 * Format a template with variables
 */
export function tVar(
  dict: I18nDictionary,
  section: DictionarySection,
  key: string,
  vars: Record<string, string | number>
): string {
  let template = t(dict, section, key);
  for (const [k, v] of Object.entries(vars)) {
    template = template.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  }
  return template;
}

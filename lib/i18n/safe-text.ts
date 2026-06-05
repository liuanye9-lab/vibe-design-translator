// ============================================================
// Vibe Design Translator - Safe Text Utilities
// ============================================================
// Prevents i18n keys from leaking into the UI
// ============================================================

/**
 * Check if a string looks like an i18n key that should not be displayed
 * Matches patterns like: fi_xxx, bp_xxx, vr_xxx, ai_xxx, aud_xxx, etc.
 */
export function looksLikeI18nKey(value: string): boolean {
  // Match common i18n key patterns
  const keyPatterns = [
    /^[a-z]{2,}_[a-z0-9-]+(_desc|_label|_title)?$/, // fi_xxx, bp_xxx, etc.
    /^(fi|bp|vr|ai|aud|cat|feel|avoid|pain|pt|dir|wc|tool|pattern|intensity|density)_/, // prefixed keys
    /_desc$/,
    /_label$/,
    /_title$/,
  ];

  return keyPatterns.some((pattern) => pattern.test(value));
}

/**
 * Safely render text, falling back to a default if the value looks like an i18n key
 * or is undefined/null
 */
export function safeText(
  value: string | undefined | null,
  fallback: string = ""
): string {
  if (!value) return fallback;
  if (looksLikeI18nKey(value)) return fallback;
  return value;
}

/**
 * Get option label from dictionary, with fallback
 */
export function getOptionLabel(
  options: Record<string, { label: string; description?: string }> | undefined,
  key: string,
  fallback?: string
): string {
  if (!options) return fallback || key;
  const option = options[key];
  if (!option) return fallback || key;
  return option.label || fallback || key;
}

/**
 * Get option description from dictionary, with fallback
 */
export function getOptionDescription(
  options: Record<string, { label: string; description?: string }> | undefined,
  key: string,
  fallback?: string
): string {
  if (!options) return fallback || "";
  const option = options[key];
  if (!option) return fallback || "";
  return option.description || fallback || "";
}

/**
 * Format a template string with variables
 * Replaces {key} patterns with provided values
 */
export function formatTemplate(
  template: string,
  vars: Record<string, string | number>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
  }
  return result;
}

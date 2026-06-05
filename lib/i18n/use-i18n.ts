// ============================================================
// Vibe Design Translator - i18n Hook
// ============================================================
// v2: Backward compatible — t("flat_key") still works.
//     Locale now comes from Zustand store (global).
//     New structured access: ts(section, key), getOpt(key)
// ============================================================

import { useCallback, useMemo } from "react";
import { useDesignStore } from "@/store/use-design-store";
import { Locale, t as translate, tVar as translateVar } from "./translations";
import {
  getDictionary,
  t as tsFn,
  tVar as tVarFn,
  getOption,
  formatTemplate,
} from "./index";
import type { I18nDictionary, DictionarySection } from "./types";

export function useI18n() {
  const locale = useDesignStore((state) => state.locale);
  const setLocale = useDesignStore((state) => state.setLocale);
  const toggleLocale = useDesignStore((state) => state.toggleLocale);

  const dict = useMemo(() => getDictionary(locale), [locale]);

  // Backward-compatible flat key translation
  // Usage: t("home_badge") => "面向 AI 编程的设计决策 SaaS"
  const t = useCallback(
    (key: string): string => translate(key, locale),
    [locale]
  );

  // Backward-compatible variable substitution
  // Usage: tVar("workspace_diagnose_count", { n: 3 })
  const tVar = useCallback(
    (key: string, vars: Record<string, string | number>): string =>
      translateVar(key, locale, vars),
    [locale]
  );

  // New structured section+key translation
  // Usage: ts("nav", "home") => "首页"
  const ts = useCallback(
    (section: DictionarySection, key: string, fallback?: string): string => {
      return tsFn(dict, section, key, fallback);
    },
    [dict]
  );

  // New structured variable substitution
  const tsVar = useCallback(
    (section: DictionarySection, key: string, vars: Record<string, string | number>): string => {
      return tVarFn(dict, section, key, vars);
    },
    [dict]
  );

  // Get option label and description
  // Usage: getOpt("fi_professional-reliable") => { label: "专业可靠", description: "..." }
  const getOpt = useCallback(
    (key: string) => {
      return getOption(dict, key);
    },
    [dict]
  );

  // Format template
  const fmt = useCallback(
    (template: string, vars: Record<string, string | number>) => {
      return formatTemplate(template, vars);
    },
    []
  );

  return {
    locale,
    setLocale,
    toggleLocale,
    dict,
    // Backward compatible API
    t,
    tVar,
    // New structured API
    ts,
    tsVar,
    getOpt,
    fmt,
  };
}

// Re-export types for convenience
export type { Locale, I18nDictionary, DictionarySection };

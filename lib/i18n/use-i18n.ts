// ============================================================
// Vibe Design Translator - i18n Hook
// ============================================================
// Consumes locale from Zustand store, exposes t() and locale.
// Zero dependency on next-intl — lightweight and client-only.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import { Locale, t as translate, tVar as translateVar } from "./translations";

const STORAGE_KEY = "vibe_translator_locale";

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>("zh");

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (stored === "zh" || stored === "en")) {
        setLocaleState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string): string => translate(key, locale),
    [locale]
  );

  const tVar = useCallback(
    (key: string, vars: Record<string, string | number>): string =>
      translateVar(key, locale, vars),
    [locale]
  );

  return { locale, setLocale, t, tVar };
}

"use client";

import { useDesignStore } from "@/store/use-design-store";
import { optionDescription, optionLabel, translate, TranslationKey } from ".";

export function useI18n() {
  const locale = useDesignStore((state) => state.locale);
  const setLocale = useDesignStore((state) => state.setLocale);

  return {
    locale,
    setLocale,
    t: (key: TranslationKey, values?: Record<string, string | number>) =>
      translate(locale, key, values),
    optionLabel: (value: string) => optionLabel(locale, value),
    optionDescription: (value: string, fallback?: string) =>
      optionDescription(locale, value, fallback),
  };
}

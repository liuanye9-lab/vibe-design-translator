import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "lib/i18n/index.ts",
  "lib/i18n/zh.ts",
  "lib/i18n/en.ts",
  "lib/i18n/use-i18n.ts",
  "lib/i18n/translations.ts",
  "app/api/ai/generate-execution-pack/route.ts",
  "app/api/ai/generate-refactor-prompt/route.ts",
  "app/api/ai/diagnose-screenshot/route.ts",
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

const requiredSnippets = [
  ["store/use-design-store.ts", "locale: Locale"],
  ["store/use-design-store.ts", "setLocale"],
  ["store/use-design-store.ts", "vibe_translator_locale"],
  ["app/api/ai/generate-execution-pack/route.ts", "normalizeLocale"],
  ["app/api/ai/generate-refactor-prompt/route.ts", "normalizeLocale"],
  ["app/api/ai/diagnose-screenshot/route.ts", "normalizeLocale"],
  ["lib/i18n/translations.ts", "Backward-compatibility layer"],
];

const missingSnippets = requiredSnippets.filter(([file, snippet]) => {
  const fullPath = path.join(root, file);
  return !fs.existsSync(fullPath) || !fs.readFileSync(fullPath, "utf8").includes(snippet);
});

if (missing.length || missingSnippets.length) {
  console.error("i18n check failed.");
  for (const file of missing) {
    console.error(`Missing required file: ${file}`);
  }
  for (const [file, snippet] of missingSnippets) {
    console.error(`Missing snippet in ${file}: ${snippet}`);
  }
  process.exit(1);
}

console.log("i18n check passed.");

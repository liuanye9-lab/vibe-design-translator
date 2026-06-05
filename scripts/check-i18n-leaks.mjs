#!/usr/bin/env node
// ============================================================
// Vibe Design Translator - i18n Leak Checker
// ============================================================
// Checks for i18n keys that might leak into the UI
// Run: node scripts/check-i18n-leaks.mjs
// ============================================================

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

// Patterns that indicate i18n keys leaking into UI
const LEAK_PATTERNS = [
  { pattern: /\bfi_[a-z0-9-]+/, desc: "First Impression key" },
  { pattern: /\bbp_[a-z0-9-]+/, desc: "Business Priority key" },
  { pattern: /\bvr_[a-z0-9-]+/, desc: "Visual Reference key" },
  { pattern: /\bai_[a-z0-9-]+/, desc: "AI Smell key" },
  { pattern: /\baud_[a-z0-9-]+/, desc: "Audience key" },
  { pattern: /\bcat_[a-z0-9-]+/, desc: "Category key" },
  { pattern: /\bfeel_[a-z0-9-]+/, desc: "Feeling key" },
  { pattern: /\bavoid_[a-z0-9-]+/, desc: "Avoid key" },
  { pattern: /\bpain_[a-z0-9-]+/, desc: "Pain Point key" },
  { pattern: /\bpt_[a-z0-9-]+/, desc: "Page Type key" },
  { pattern: /\bdir_[a-z0-9-]+/, desc: "Direction key" },
  { pattern: /\bwc_[a-z0-9-]+/, desc: "Workspace Category key" },
  { pattern: /_desc["'\s,)]/, desc: "Description suffix" },
  { pattern: /_label["'\s,)]/, desc: "Label suffix" },
  { pattern: /_title["'\s,)]/, desc: "Title suffix" },
];

// Whitelist: strings that look like keys but are OK
const WHITELIST = [
  "ai-provider",
  "ai-model",
  "ai-saas",
  "ai-generated",
  "ai-look",
  "ai-template",
  "ai_smell", // in dictionary keys, not UI
  "ai_gradient", // in dictionary keys
  "ai_glow",
  "ai_centered",
  "ai_icons",
  "ai_copy",
  "ai_no_product",
  "ai_no-visual-rhythm",
  "ai_weak-cta",
  "ai_glass-overuse",
  "ai_vague-copy",
  "ai_icon-overload",
  "ai_centered-everything",
  "ai_meaningless-glow",
  "ai_blue-purple-gradient",
];

// Patterns that indicate the key is being used in t() function (not leaking)
const T_FUNCTION_PATTERNS = [
  /t\(["']/, // t("key") or t('key')
  /tVar\(["']/, // tVar("key")
  /ts\(["']/, // ts("section", "key")
  /getOpt\(["']/, // getOpt("key")
  /label:\s*t\(/, // label: t("key")
  /description:\s*t\(/, // description: t("key")
  /title:\s*t\(/, // title: t("key")
  /subtitle:\s*t\(/, // subtitle: t("key")
  /descKey:/, // descKey: "key"
  /tKey:/, // tKey: "key"
  /labelKey:/, // labelKey: "key"
];

// Directories to check
const CHECK_DIRS = ["app", "components", "lib"];

// File extensions to check
const CHECK_EXTS = [".tsx", ".ts", ".jsx", ".js"];

// Directories to skip
const SKIP_DIRS = ["node_modules", ".next", "i18n", "visuals", "scripts"];

function walkDir(dir, callback) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(file)) {
        walkDir(filePath, callback);
      }
    } else if (CHECK_EXTS.includes(extname(file))) {
      callback(filePath);
    }
  }
}

function checkFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    for (const { pattern, desc } of LEAK_PATTERNS) {
      const matches = line.match(new RegExp(pattern, "g"));
      if (matches) {
        for (const match of matches) {
          // Skip whitelisted strings
          if (WHITELIST.some((w) => line.includes(w))) continue;

          // Skip if in a comment
          if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;

          // Skip if in import/export
          if (line.includes("import ") || line.includes("export ")) continue;

          // Skip if in type definition
          if (line.includes("interface ") || line.includes("type ")) continue;

          // Skip if used in t() function (not leaking to UI)
          if (T_FUNCTION_PATTERNS.some((p) => p.test(line))) continue;

          // Skip if in constants.ts (dictionary keys definition)
          if (filePath.includes("constants.ts") || filePath.includes("lib/i18n/")) continue;

          issues.push({
            file: filePath,
            line: lineNum,
            match,
            desc,
            context: line.trim().substring(0, 80),
          });
        }
      }
    }
  }

  return issues;
}

// Main
console.log("🔍 Checking for i18n key leaks in UI...\n");

let totalIssues = 0;

for (const dir of CHECK_DIRS) {
  try {
    walkDir(dir, (filePath) => {
      const issues = checkFile(filePath);
      if (issues.length > 0) {
        console.log(`\n📄 ${filePath}`);
        for (const issue of issues) {
          console.log(`  Line ${issue.line}: ${issue.desc} - "${issue.match}"`);
          console.log(`    ${issue.context}`);
          totalIssues++;
        }
      }
    });
  } catch (e) {
    // Directory might not exist
  }
}

console.log("\n" + "=".repeat(50));
if (totalIssues === 0) {
  console.log("✅ No i18n key leaks found!");
  process.exit(0);
} else {
  console.log(`⚠️  Found ${totalIssues} potential i18n key leak(s).`);
  console.log("\nNote: Some matches might be false positives.");
  console.log("Review each case to determine if it's a real leak.");
  process.exit(1);
}

#!/usr/bin/env node
// ============================================================
// Vibe Design Translator - Bilingual Mix Checker
// ============================================================
// Checks for mixed Chinese/English in dictionaries and prompts
// Run: node scripts/check-bilingual-mix.mjs
// ============================================================

import { readFileSync } from "fs";

// Technical terms that are OK in both languages
const TECH_WHITELIST = [
  "AI",
  "Prompt",
  "Agent",
  "API",
  "Codex",
  "Claude Code",
  "Gemini",
  "WorkBuddy",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "React",
  "Vue",
  "CSS",
  "HTML",
  "JavaScript",
  "SaaS",
  "B2B",
  "CTA",
  "JSON",
  "Markdown",
  "localStorage",
  "WCAG",
  "ARIA",
  "SVG",
  "UI",
  "UX",
  "MVP",
  "Phase",
  "OK",
  "FAQ",
];

// Chinese characters pattern
const CHINESE_PATTERN = /[\u4e00-\u9fff]/;

// English sentence pattern (more than 3 consecutive English words)
const ENGLISH_SENTENCE_PATTERN = /\b[A-Za-z]+(?:\s+[A-Za-z]+){3,}\b/;

function checkDictionary(filePath, lang) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const issues = [];

    // Simple check: look for strings that seem wrong for the language
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNum = i + 1;

      // Skip comments, imports, exports
      if (line.startsWith("//") || line.startsWith("*") || line.startsWith("import") || line.startsWith("export")) continue;

      // Check for string values
      const stringMatch = line.match(/"([^"]+)"/);
      if (!stringMatch) continue;

      const value = stringMatch[1];

      // Skip technical terms
      if (TECH_WHITELIST.some((t) => value.includes(t))) continue;

      // Skip very short strings
      if (value.length < 3) continue;

      if (lang === "zh") {
        // Chinese dictionary should not have full English sentences
        if (ENGLISH_SENTENCE_PATTERN.test(value) && !CHINESE_PATTERN.test(value)) {
          issues.push({
            file: filePath,
            line: lineNum,
            value: value.substring(0, 60),
            desc: "English sentence in Chinese dictionary",
          });
        }
      } else if (lang === "en") {
        // English dictionary should not have Chinese sentences
        if (CHINESE_PATTERN.test(value)) {
          issues.push({
            file: filePath,
            line: lineNum,
            value: value.substring(0, 60),
            desc: "Chinese text in English dictionary",
          });
        }
      }
    }

    return issues;
  } catch (e) {
    return [];
  }
}

function checkPromptTemplates(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    const issues = [];

    // Check for mixed language in prompt generation functions
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Skip comments
      if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;

      // Check for template literals with mixed language
      const hasChinese = CHINESE_PATTERN.test(line);
      const hasEnglishSentence = ENGLISH_SENTENCE_PATTERN.test(line);

      // Skip technical terms
      const cleanLine = line.replace(/["'`]/g, " ");
      const isTechOnly = TECH_WHITELIST.some((t) => cleanLine.includes(t));

      if (hasChinese && hasEnglishSentence && !isTechOnly) {
        // This might be a mixed language line in a template
        // Only flag if it looks like a full sentence mix
        const chineseChars = (line.match(/[\u4e00-\u9fff]/g) || []).length;
        const englishWords = (line.match(/\b[A-Za-z]{3,}\b/g) || []).length;

        if (chineseChars > 3 && englishWords > 3) {
          issues.push({
            file: filePath,
            line: lineNum,
            desc: "Possible mixed language in template",
            context: line.trim().substring(0, 80),
          });
        }
      }
    }

    return issues;
  } catch (e) {
    return [];
  }
}

// Main
console.log("🌐 Checking for bilingual mixing issues...\n");

let totalIssues = 0;

// Check Chinese dictionary
console.log("📖 Checking Chinese dictionary (lib/i18n/zh.ts)...");
const zhIssues = checkDictionary("lib/i18n/zh.ts", "zh");
if (zhIssues.length > 0) {
  for (const issue of zhIssues) {
    console.log(`  ⚠️  Line ${issue.line}: ${issue.desc}`);
    console.log(`     "${issue.value}"`);
    totalIssues++;
  }
} else {
  console.log("  ✅ OK");
}

// Check English dictionary
console.log("\n📖 Checking English dictionary (lib/i18n/en.ts)...");
const enIssues = checkDictionary("lib/i18n/en.ts", "en");
if (enIssues.length > 0) {
  for (const issue of enIssues) {
    console.log(`  ⚠️  Line ${issue.line}: ${issue.desc}`);
    console.log(`     "${issue.value}"`);
    totalIssues++;
  }
} else {
  console.log("  ✅ OK");
}

// Check prompt templates
console.log("\n📝 Checking prompt templates (lib/prompt-templates.ts)...");
const promptIssues = checkPromptTemplates("lib/prompt-templates.ts");
if (promptIssues.length > 0) {
  for (const issue of promptIssues) {
    console.log(`  ⚠️  Line ${issue.line}: ${issue.desc}`);
    console.log(`     ${issue.context}`);
    totalIssues++;
  }
} else {
  console.log("  ✅ OK");
}

console.log("\n" + "=".repeat(50));
if (totalIssues === 0) {
  console.log("✅ No bilingual mixing issues found!");
  process.exit(0);
} else {
  console.log(`⚠️  Found ${totalIssues} potential bilingual mixing issue(s).`);
  console.log("\nNote: Some matches might be false positives (technical terms).");
  console.log("Review each case to determine if it's a real issue.");
  process.exit(1);
}

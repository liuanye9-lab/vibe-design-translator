// ============================================================
// Vibe Design Translator - Diagnosis Mock Logic
// ============================================================

import { DiagnosisReport, DiagnosisScores, ToolType } from "./types";
import { generateAntiAILookChecklist } from "./prompt-templates";

// ============================================================
// Mock Diagnosis Report Generator
// ============================================================

/**
 * Generate a mock diagnosis report with realistic scores and findings
 */
export function generateMockDiagnosisReport(): DiagnosisReport {
  // Generate random but realistic scores
  const scores: DiagnosisScores = {
    aiTemplateFeeling: Math.floor(Math.random() * 30) + 40, // 40-70
    visualHierarchy: Math.floor(Math.random() * 35) + 45, // 45-80
    colorControl: Math.floor(Math.random() * 30) + 50, // 50-80
    typographySystem: Math.floor(Math.random() * 40) + 45, // 45-85
    spacingSystem: Math.floor(Math.random() * 25) + 55, // 55-80
    interactionRestraint: Math.floor(Math.random() * 35) + 40, // 40-75
    conversionClarity: Math.floor(Math.random() * 30) + 50, // 50-80
  };

  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    scores.aiTemplateFeeling * 0.25 +
    scores.visualHierarchy * 0.15 +
    scores.colorControl * 0.15 +
    scores.typographySystem * 0.15 +
    scores.spacingSystem * 0.1 +
    scores.interactionRestraint * 0.1 +
    scores.conversionClarity * 0.1
  );

  // Generate findings based on low scores
  const findings: string[] = [];
  const fixes: string[] = [];

  if (scores.aiTemplateFeeling < 55) {
    findings.push("Page exhibits multiple signs of AI-generated template aesthetics");
    findings.push("Colors appear to be from a generic palette with no brand consideration");
    findings.push("Layout follows standard SaaS template patterns too closely");
    fixes.push("Introduce custom color palette with brand-specific variations");
    fixes.push("Add unique layout elements that break template patterns");
    fixes.push("Consider asymmetric layouts or unconventional section ordering");
  }

  if (scores.visualHierarchy < 60) {
    findings.push("Visual hierarchy is unclear—competing for attention everywhere");
    findings.push("Primary CTA lacks sufficient visual weight to stand out");
    findings.push("Section headings don't create clear reading order");
    fixes.push("Increase size contrast between heading levels (3:1 minimum ratio)");
    fixes.push("Make primary CTA visually dominant with size, color, and position");
    fixes.push("Use whitespace to separate content groups into clear chapters");
  }

  if (scores.colorControl < 60) {
    findings.push("Color palette appears randomly assembled without system thinking");
    findings.push("Multiple accent colors create visual noise and confusion");
    findings.push("Background colors lack intentional contrast relationships");
    fixes.push("Reduce to 1-2 accent colors maximum, use for interactive elements only");
    fixes.push("Create a color scale (5-7 shades) for each hue");
    fixes.push("Test color combinations for harmony using systematic approach");
  }

  if (scores.typographySystem < 65) {
    findings.push("Typography lacks consistent scale or rhythm");
    findings.push("Font weights appear randomly mixed without hierarchy purpose");
    findings.push("Line-height inconsistency affects readability");
    fixes.push("Define explicit type scale with 3-4 levels maximum");
    fixes.push("Establish consistent weight usage (e.g., headings: semibold, body: regular)");
    fixes.push("Set body line-height to 1.5-1.7 for optimal readability");
  }

  if (scores.spacingSystem < 60) {
    findings.push("Spacing is uniform throughout, lacking intentional rhythm");
    findings.push("Section padding doesn't reflect content importance");
    findings.push("Component margins inconsistent");
    fixes.push("Create spacing scale (8px base unit)");
    fixes.push("Use larger padding for hero/sections, smaller for components");
    fixes.push("Vary spacing to create visual interest while maintaining consistency");
  }

  if (scores.interactionRestraint < 55) {
    findings.push("Excessive animations competing for attention");
    findings.push("Hover effects too dramatic, causing visual instability");
    findings.push("Scroll animations feel gratuitous rather than informative");
    fixes.push("Reduce animation duration to 150-300ms maximum");
    fixes.push("Use subtle transforms (opacity, translateY) over scale/rotate");
    fixes.push("Respect prefers-reduced-motion for accessibility");
  }

  if (scores.conversionClarity < 65) {
    findings.push("Primary CTA buried or insufficiently prominent");
    findings.push("Trust indicators missing or in wrong positions");
    findings.push("User journey to conversion unclear");
    fixes.push("Ensure CTA appears above fold with high visual weight");
    fixes.push("Add trust signals (logos, testimonials, guarantees) near CTAs");
    fixes.push("Create clear visual path from value prop to conversion");
  }

  // Add general findings if overall score is low
  if (overallScore < 55) {
    findings.push("Page needs comprehensive redesign to avoid generic AI look");
    findings.push("Brand personality is largely absent from current implementation");
  }

  return {
    overallScore,
    scores,
    findings: Array.from(new Set(findings)), // Remove duplicates
    fixes: Array.from(new Set(fixes)), // Remove duplicates
    refactorPrompts: generateRefactorPrompts({ overallScore, scores, findings, fixes, refactorPrompts: {} } as DiagnosisReport),
  };
}

// ============================================================
// Refactor Prompt Generator
// ============================================================

/**
 * Generate tool-specific refactor prompts based on diagnosis
 */
export function generateRefactorPrompts(
  report: DiagnosisReport
): Record<ToolType, string> {
  const scoreSummary = `Overall Score: ${report.overallScore}/100
AI Template Feeling: ${report.scores.aiTemplateFeeling}/100
Visual Hierarchy: ${report.scores.visualHierarchy}/100
Color Control: ${report.scores.colorControl}/100
Typography System: ${report.scores.typographySystem}/100
Spacing System: ${report.scores.spacingSystem}/100
Interaction Restraint: ${report.scores.interactionRestraint}/100
Conversion Clarity: ${report.scores.conversionClarity}/100`;

  return {
    codex: `You are refactoring a landing page that scored ${report.overallScore}/100 on design quality.

## Current Issues
${report.findings.map((f) => `- ${f}`).join("\n")}

## Required Fixes
${report.fixes.map((f) => `- ${f}`).join("\n")}

## Score Analysis
${scoreSummary}

## Task
Apply the fixes systematically while maintaining existing functionality. Follow this sequence:

[  ] 0% - Audit: Document all current design tokens, colors, typography
[  ] 20% - Color: Implement proper color system with brand-specific palette
[  ] 40% - Typography: Establish type scale with clear hierarchy
[  ] 60% - Layout: Apply spacing system and improve visual hierarchy
[  ] 80% - Interactions: Refine animations for subtlety and purpose
[  ] 100% - Polish: Final review against Anti-AI-Look checklist

## Anti-AI-Look Checklist
${generateAntiAILookChecklist().map((r) => `- ${r}`).join("\n")}

## Acceptance
- All CTAs remain functional
- Responsive behavior preserved
- Accessibility maintained (contrast, focus states)
- Performance not degraded`,

    "claude-code": `# Landing Page Refactor Task

## Context
Current page scored ${report.overallScore}/100. Multiple design issues identified that make it look like a generic AI-generated template.

## Issues Found
${report.findings.map((f) => `### ${f}`).join("\n\n")}

## Required Changes
${report.fixes.map((f) => `### ${f}`).join("\n\n")}

## Current Scores
${scoreSummary}

---

## Implementation Plan

### Step 1: Analyze Current State
- Document existing colors, fonts, spacing
- Identify all UI components and their states
- Map current user flow and conversion path

### Step 2: Design System Overhaul
1. **Color System**: Replace generic palette with intentional brand colors
   - Primary: Select single hue with 5-7 shade scale
   - Secondary: One complementary accent
   - Neutral: Warm or cool grays (not pure black/white)

2. **Typography**: Establish clear hierarchy
   - Display: 48-72px, semibold/bold
   - Heading: 24-32px, semibold
   - Body: 16-18px, regular
   - Line-height: 1.5-1.7 for body

3. **Spacing**: Create 8px-based scale
   - xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 48px, 2xl: 64px

4. **Components**: Refine interactions
   - Reduce animation to 150-250ms
   - Use opacity/translateY over scale/rotate
   - Ensure focus states visible

### Step 3: Layout Improvements
- Increase spacing between sections
- Add visual hierarchy through size and weight
- Position CTA strategically
- Add trust indicators near conversion points

### Step 4: Anti-AI-Look Verification
${generateAntiAILookChecklist().map((r) => `- [ ] ${r}`).join("\n")}

---

**Remember**: Refactor for human-crafted feel. Every design decision should have clear purpose. Avoid template-like patterns.`,

    gemini: `# Landing Page Redesign

**Problem**: Current page looks AI-generated and scores ${report.overallScore}/100.

**Key Issues**:
${report.findings.map((f, i) => `${i + 1}. ${f}`).join("\n")}

**Required Improvements**:
${report.fixes.map((f, i) => `${i + 1}. ${f}`).join("\n")}

---

## Terminal Workflow

\`\`\`bash
# Step 1: Audit current state
# Document colors, fonts, spacing, component states

# Step 2: Install design system
npm install tailwindcss
npx tailwindcss init

# Step 3: Configure design tokens
# Update tailwind.config.js with custom colors, fonts, spacing

# Step 4: Refactor components
# Apply fixes systematically

# Step 5: Type check
npx tsc --noEmit

# Step 6: Build
npm run build
\`\`\`

## Design Tokens to Implement

\`\`\`css
:root {
  /* Replace these with intentional brand colors */
  --primary: #YOUR_COLOR;
  --secondary: #YOUR_ACCENT;
  --neutral-50: #FAFAFA;
  --neutral-900: #1A1A1A;

  /* Spacing scale */
  --space-unit: 8px;
}
\`\`\`

## Anti-AI-Look Rules
${generateAntiAILookChecklist().map((r) => `- ${r}`).join("\n")}

## Quality Gates
- [ ] Score improved to 70+
- [ ] No template-like patterns visible
- [ ] All interactions functional
- [ ] Responsive preserved
- [ ] Accessibility compliant`,

    workbuddy: `# 页面重构任务

## 当前问题（得分：${report.overallScore}/100）
${report.findings.map((f) => `- ${f}`).join("\n")}

## 需要修复
${report.fixes.map((f) => `- ${f}`).join("\n")}

## 设计评分
${scoreSummary}

---

## 重构流程

### 1. 设计系统重建
**色彩系统**：
- 替换为有意图的色彩搭配
- 建立 5-7 级色阶
- 确保主次关系清晰

**字体排版**：
- 建立明确的类型层级
- Display: 48-72px, 粗体
- 正文: 16-18px, 常规
- 行高: 1.5-1.7

**间距系统**：
- 8px 基础单位
- 建立间距比例：4/8/16/24/48/64/96

### 2. 布局优化
- 增加区块间距
- 通过大小和粗细建立视觉层次
- 战略性地放置 CTA
- 在转化点附近添加信任标识

### 3. 交互精炼
- 减少动画到 150-250ms
- 使用 opacity/translateY 而非 scale/rotate
- 确保焦点状态可见
- 尊重 prefers-reduced-motion

### 4. 反 AI 痕迹检查
${generateAntiAILookChecklist().map((r) => `- [ ] ${r}`).join("\n")}

---

**重要提醒**：目标是让人感觉是精心手工设计的，不是批量生成的。`,
  };
}

// ============================================================
// Score Interpretation
// ============================================================

export interface ScoreInterpretation {
  label: string;
  color: string;
  advice: string;
}

export function interpretScore(score: number): ScoreInterpretation {
  if (score >= 80) {
    return {
      label: "Excellent",
      color: "text-green-600",
      advice: "Strong design with minimal issues.",
    };
  }
  if (score >= 65) {
    return {
      label: "Good",
      color: "text-accent-iosBlue",
      advice: "Solid foundation with room for improvement.",
    };
  }
  if (score >= 50) {
    return {
      label: "Needs Work",
      color: "text-yellow-600",
      advice: "Several issues affecting user experience.",
    };
  }
  return {
    label: "Critical",
    color: "text-rose-500",
    advice: "Urgent redesign needed to avoid generic AI look.",
  };
}
// ============================================================
// Vibe Design Translator - Diagnosis Mock Logic
// ============================================================

import { DiagnosisReport, DiagnosisScores, ToolType, DiagnosisFinding, DiagnosisFix } from "./types";
import { generateAntiAILookChecklist } from "./prompt-templates";

// ============================================================
// Mock Diagnosis Report Generator
// ============================================================

/**
 * Generate a mock diagnosis report based on user input
 */
export function generateMockDiagnosisReport(
  pageType?: string,
  primaryPainPoint?: string
): DiagnosisReport {
  // Generate scores based on pain point
  const scores = generateScoresBasedOnPainPoint(primaryPainPoint);

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

  // Generate findings and fixes based on scores
  const { findings, fixes, detailedFindings, repairStrategy } = generateFindingsAndFixes(scores, pageType, primaryPainPoint);

  const report: DiagnosisReport = {
    overallScore,
    scores,
    findings,
    fixes,
    refactorPrompts: generateRefactorPrompts({ 
      overallScore, 
      scores, 
      findings, 
      fixes,
      pageType,
      primaryPainPoint,
    }),
    detailedFindings,
    repairStrategy,
    pageType,
    primaryPainPoint,
  };

  return report;
}

/**
 * Generate scores based on the primary pain point
 */
function generateScoresBasedOnPainPoint(painPoint?: string): DiagnosisScores {
  // Base scores
  const baseScores = {
    aiTemplateFeeling: 55,
    visualHierarchy: 60,
    colorControl: 62,
    typographySystem: 65,
    spacingSystem: 68,
    interactionRestraint: 58,
    conversionClarity: 60,
  };

  // Adjust scores based on pain point
  switch (painPoint) {
    case "Looks like AI-generated template":
      return {
        ...baseScores,
        aiTemplateFeeling: Math.floor(Math.random() * 15) + 35,
        visualHierarchy: Math.floor(Math.random() * 20) + 40,
        colorControl: Math.floor(Math.random() * 20) + 45,
      };
    case "No clear visual hierarchy":
      return {
        ...baseScores,
        visualHierarchy: Math.floor(Math.random() * 20) + 35,
        typographySystem: Math.floor(Math.random() * 15) + 50,
      };
    case "Colors feel random or messy":
      return {
        ...baseScores,
        colorControl: Math.floor(Math.random() * 20) + 35,
        visualHierarchy: Math.floor(Math.random() * 15) + 50,
      };
    case "Typography inconsistent":
      return {
        ...baseScores,
        typographySystem: Math.floor(Math.random() * 20) + 35,
        spacingSystem: Math.floor(Math.random() * 15) + 50,
      };
    case "Spacing feels off":
      return {
        ...baseScores,
        spacingSystem: Math.floor(Math.random() * 20) + 35,
        visualHierarchy: Math.floor(Math.random() * 15) + 50,
      };
    case "Too many animations":
      return {
        ...baseScores,
        interactionRestraint: Math.floor(Math.random() * 20) + 30,
      };
    case "Unclear CTA or conversion path":
      return {
        ...baseScores,
        conversionClarity: Math.floor(Math.random() * 20) + 35,
        visualHierarchy: Math.floor(Math.random() * 15) + 50,
      };
    case "Missing brand personality":
      return {
        ...baseScores,
        aiTemplateFeeling: Math.floor(Math.random() * 15) + 40,
        colorControl: Math.floor(Math.random() * 15) + 50,
        typographySystem: Math.floor(Math.random() * 15) + 50,
      };
    default:
      return {
        aiTemplateFeeling: Math.floor(Math.random() * 30) + 40,
        visualHierarchy: Math.floor(Math.random() * 35) + 45,
        colorControl: Math.floor(Math.random() * 30) + 50,
        typographySystem: Math.floor(Math.random() * 40) + 45,
        spacingSystem: Math.floor(Math.random() * 25) + 55,
        interactionRestraint: Math.floor(Math.random() * 35) + 40,
        conversionClarity: Math.floor(Math.random() * 30) + 50,
      };
  }
}

/**
 * Generate findings, fixes, and detailed repair strategy
 */
function generateFindingsAndFixes(
  scores: DiagnosisScores,
  pageType?: string,
  primaryPainPoint?: string
): {
  findings: string[];
  fixes: string[];
  detailedFindings: DiagnosisFinding[];
  repairStrategy: {
    layout: string[];
    color: string[];
    typography: string[];
    interaction: string[];
    conversion: string[];
  };
} {
  const findings: string[] = [];
  const fixes: string[] = [];
  const detailedFindings: DiagnosisFinding[] = [];
  const repairStrategy = {
    layout: [] as string[],
    color: [] as string[],
    typography: [] as string[],
    interaction: [] as string[],
    conversion: [] as string[],
  };

  // AI Template Feeling
  if (scores.aiTemplateFeeling < 60) {
    findings.push("Page exhibits multiple signs of AI-generated template aesthetics");
    findings.push("Colors appear to be from a generic palette with no brand consideration");
    findings.push("Layout follows standard SaaS template patterns too closely");
    fixes.push("Introduce custom color palette with brand-specific variations");
    fixes.push("Add unique layout elements that break template patterns");
    fixes.push("Consider asymmetric layouts or unconventional section ordering");

    detailedFindings.push({
      id: "finding-ai-template",
      category: "AI Template",
      issue: "Generic SaaS aesthetic detected",
      severity: "critical",
    });

    repairStrategy.color.push("Create brand-specific color palette with unique variations");
    repairStrategy.layout.push("Break template patterns with custom section ordering");
  }

  // Visual Hierarchy
  if (scores.visualHierarchy < 65) {
    findings.push("Visual hierarchy is unclear—competing for attention everywhere");
    findings.push("Primary CTA lacks sufficient visual weight to stand out");
    findings.push("Section headings don't create clear reading order");
    fixes.push("Increase size contrast between heading levels (3:1 minimum ratio)");
    fixes.push("Make primary CTA visually dominant with size, color, and position");
    fixes.push("Use whitespace to separate content groups into clear chapters");

    detailedFindings.push({
      id: "finding-visual-hierarchy",
      category: "Visual Hierarchy",
      issue: "Competing elements and unclear CTAs",
      severity: "critical",
    });

    repairStrategy.layout.push("Establish clear 3:1 heading ratio");
    repairStrategy.conversion.push("Dominant CTA placement with visual weight");
  }

  // Color Control
  if (scores.colorControl < 65) {
    findings.push("Color palette appears randomly assembled without system thinking");
    findings.push("Multiple accent colors create visual noise and confusion");
    findings.push("Background colors lack intentional contrast relationships");
    fixes.push("Reduce to 1-2 accent colors maximum, use for interactive elements only");
    fixes.push("Create a color scale (5-7 shades) for each hue");
    fixes.push("Test color combinations for harmony using systematic approach");

    detailedFindings.push({
      id: "finding-color",
      category: "Color System",
      issue: "Random palette without brand identity",
      severity: "warning",
    });

    repairStrategy.color.push("Limit to 1-2 accent colors for interactions");
    repairStrategy.color.push("Build 5-7 shade color scale per hue");
  }

  // Typography System
  if (scores.typographySystem < 70) {
    findings.push("Typography lacks consistent scale or rhythm");
    findings.push("Font weights appear randomly mixed without hierarchy purpose");
    findings.push("Line-height inconsistency affects readability");
    fixes.push("Define explicit type scale with 3-4 levels maximum");
    fixes.push("Establish consistent weight usage (e.g., headings: semibold, body: regular)");
    fixes.push("Set body line-height to 1.5-1.7 for optimal readability");

    detailedFindings.push({
      id: "finding-typography",
      category: "Typography",
      issue: "Inconsistent type scale and weight usage",
      severity: "warning",
    });

    repairStrategy.typography.push("Define 3-4 level type scale");
    repairStrategy.typography.push("Consistent weight hierarchy");
    repairStrategy.typography.push("1.5-1.7 line-height for body");
  }

  // Spacing System
  if (scores.spacingSystem < 65) {
    findings.push("Spacing is uniform throughout, lacking intentional rhythm");
    findings.push("Section padding doesn't reflect content importance");
    findings.push("Component margins inconsistent");
    fixes.push("Create spacing scale (8px base unit)");
    fixes.push("Use larger padding for hero/sections, smaller for components");
    fixes.push("Vary spacing to create visual interest while maintaining consistency");

    detailedFindings.push({
      id: "finding-spacing",
      category: "Spacing",
      issue: "Uniform spacing without rhythm",
      severity: "warning",
    });

    repairStrategy.layout.push("8px-based spacing scale");
    repairStrategy.layout.push("Hero sections: larger padding");
  }

  // Interaction Restraint
  if (scores.interactionRestraint < 60) {
    findings.push("Excessive animations competing for attention");
    findings.push("Hover effects too dramatic, causing visual instability");
    findings.push("Scroll animations feel gratuitous rather than informative");
    fixes.push("Reduce animation duration to 150-300ms maximum");
    fixes.push("Use subtle transforms (opacity, translateY) over scale/rotate");
    fixes.push("Respect prefers-reduced-motion for accessibility");

    detailedFindings.push({
      id: "finding-interaction",
      category: "Interactions",
      issue: "Excessive and distracting animations",
      severity: "warning",
    });

    repairStrategy.interaction.push("150-300ms animation maximum");
    repairStrategy.interaction.push("Opacity/translateY over scale/rotate");
  }

  // Conversion Clarity
  if (scores.conversionClarity < 65) {
    findings.push("Primary CTA buried or insufficiently prominent");
    findings.push("Trust indicators missing or in wrong positions");
    findings.push("User journey to conversion unclear");
    fixes.push("Ensure CTA appears above fold with high visual weight");
    fixes.push("Add trust signals (logos, testimonials, guarantees) near CTAs");
    fixes.push("Create clear visual path from value prop to conversion");

    detailedFindings.push({
      id: "finding-conversion",
      category: "Conversion",
      issue: "Unclear CTA and conversion path",
      severity: "critical",
    });

    repairStrategy.conversion.push("Above-fold CTA with visual dominance");
    repairStrategy.conversion.push("Trust signals adjacent to CTAs");
  }

  // Add page-type-specific findings
  if (pageType) {
    const pageTypeFindings: Record<string, string[]> = {
      "landing-page": [
        "Hero section lacks clear value proposition hierarchy",
        "Above-fold content competing for attention",
        "Missing social proof or trust indicators",
      ],
      "product-page": [
        "Product benefits not clearly differentiated",
        "Feature descriptions too technical for target users",
        "Lack of visual product demonstration",
      ],
      "pricing-page": [
        "Pricing tiers not visually differentiated enough",
        "Recommended plan not sufficiently emphasized",
        "Missing comparison table or feature breakdown",
      ],
      "dashboard": [
        "Information density too high, lacks visual breathing room",
        "Key metrics not visually prominent enough",
        "Navigation unclear for complex data views",
      ],
    };

    if (pageTypeFindings[pageType]) {
      findings.push(...pageTypeFindings[pageType]);
    }
  }

  // Add pain-point-specific findings
  if (primaryPainPoint) {
    const painPointKeywords = primaryPainPoint.toLowerCase();
    if (painPointKeywords.includes("color") || painPointKeywords.includes("色彩")) {
      findings.push("Color system lacks intentional brand alignment");
      fixes.push("Define brand-aligned color palette with clear primary/secondary roles");
    }
    if (painPointKeywords.includes("layout") || painPointKeywords.includes("布局")) {
      findings.push("Layout structure follows generic template patterns");
      fixes.push("Introduce asymmetric or unconventional layout elements");
    }
    if (painPointKeywords.includes("font") || painPointKeywords.includes("typography") || painPointKeywords.includes("字体")) {
      findings.push("Typography hierarchy doesn't guide reading flow effectively");
      fixes.push("Establish 3-level type scale with clear size and weight differences");
    }
    if (painPointKeywords.includes("spacing") || painPointKeywords.includes("间距")) {
      findings.push("Spacing feels uniform rather than intentional");
      fixes.push("Use varied spacing to create rhythm and visual interest");
    }
  }

  return {
    findings: Array.from(new Set(findings)),
    fixes: Array.from(new Set(fixes)),
    detailedFindings,
    repairStrategy,
  };
}

// ============================================================
// Refactor Prompt Generator
// ============================================================

/**
 * Generate tool-specific refactor prompts based on diagnosis
 */
export function generateRefactorPrompts(
  report: Partial<DiagnosisReport>
): Record<ToolType, string> {
  const overallScore = report.overallScore || 50;
  const scores = report.scores || {
    aiTemplateFeeling: 50,
    visualHierarchy: 50,
    colorControl: 50,
    typographySystem: 50,
    spacingSystem: 50,
    interactionRestraint: 50,
    conversionClarity: 50,
  };
  const findings = report.findings || [];
  const fixes = report.fixes || [];

  const scoreSummary = `Overall Score: ${overallScore}/100
AI Template Feeling: ${scores.aiTemplateFeeling}/100
Visual Hierarchy: ${scores.visualHierarchy}/100
Color Control: ${scores.colorControl}/100
Typography System: ${scores.typographySystem}/100
Spacing System: ${scores.spacingSystem}/100
Interaction Restraint: ${scores.interactionRestraint}/100
Conversion Clarity: ${scores.conversionClarity}/100`;

  return {
    codex: `You are refactoring a landing page that scored ${overallScore}/100 on design quality.

## Current Issues
${findings.map((f) => `- ${f}`).join("\n")}

## Required Fixes
${fixes.map((f) => `- ${f}`).join("\n")}

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
Current page scored ${overallScore}/100. Multiple design issues identified that make it look like a generic AI-generated template.

## Issues Found
${findings.map((f) => `### ${f}`).join("\n\n")}

## Required Changes
${fixes.map((f) => `### ${f}`).join("\n\n")}

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

**Problem**: Current page looks AI-generated and scores ${overallScore}/100.

**Key Issues**:
${findings.map((f, i) => `${i + 1}. ${f}`).join("\n")}

**Required Improvements**:
${fixes.map((f, i) => `${i + 1}. ${f}`).join("\n")}

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

## 当前问题（得分：${overallScore}/100）
${findings.map((f) => `- ${f}`).join("\n")}

## 需要修复
${fixes.map((f) => `- ${f}`).join("\n")}

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

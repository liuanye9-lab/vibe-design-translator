// ============================================================
// Vibe Design Translator - Prompt Templates
// ============================================================
//
// Generates tool-specific prompts for:
// - Codex
// - Claude Code
// - Gemini
// - WorkBuddy
//
// ============================================================

import {
  DesignBrief,
  DesignDirection,
  DesignExecutionPack,
  ToolType,
} from "./types";
import { TOOL_LABELS } from "./constants";

// ============================================================
// Main Generator Function
// ============================================================

/**
 * Generate complete execution pack with all tool-specific prompts
 */
export function generateExecutionPack(
  brief: DesignBrief,
  direction: DesignDirection
): DesignExecutionPack {
  const pack: DesignExecutionPack = {
    strategy: generateStrategy(brief, direction),
    pageStructure: generatePageStructure(brief, direction),
    visualSystem: generateVisualSystem(brief, direction),
    interactionSystem: generateInteractionSystem(brief, direction),
    acceptanceCriteria: generateAcceptanceCriteria(brief, direction),
    antiAILookChecklist: generateAntiAILookChecklist(),
    prompts: {
      codex: generateCodexPrompt(brief, direction),
      "claude-code": generateClaudeCodePrompt(brief, direction),
      gemini: generateGeminiPrompt(brief, direction),
      workbuddy: generateWorkbuddyPrompt(brief, direction),
    },
    // Enhanced fields
    contentTone: generateContentTone(brief, direction),
    componentRules: generateComponentRules(brief, direction),
    responsiveRules: generateResponsiveRules(brief, direction),
    // Metadata
    productName: brief.productName,
    productCategory: brief.productCategory,
    selectedDirection: direction.name,
    generatedAt: new Date().toISOString(),
  };

  return pack;
}

// ============================================================
// Strategy Generation
// ============================================================

function generateStrategy(
  brief: DesignBrief,
  direction: DesignDirection
): string[] {
  return [
    `Establish ${direction.name} aesthetic through restrained color usage and generous whitespace`,
    `Prioritize clarity and readability over decoration`,
    `Use ${brief.visualIntensity} visual intensity to balance presence and professionalism`,
    `Implement ${brief.contentDensity} content density for optimal information hierarchy`,
    `Create clear user journey from landing to primary CTA ("${brief.mainCTA}")`,
    `Avoid generic AI-generated patterns; embrace ${direction.psychologicalEffect.toLowerCase()} feel`,
    `Design mobile-first with progressive enhancement for larger screens`,
    // Enhanced strategy
    `Use ${brief.firstImpression?.replace(/-/g, " ") || "professional"} as the emotional anchor`,
    `Prioritize ${brief.businessPriority?.replace(/-/g, " ") || "conversion"} as the primary business goal`,
    `Target ${brief.audience?.replace(/-/g, " ") || "general users"} with tailored messaging`,
  ];
}

// ============================================================
// Page Structure Generation
// ============================================================

function generatePageStructure(
  brief: DesignBrief,
  direction: DesignDirection
): string[] {
  const structures: string[] = [
    "Hero Section: Clear value proposition with primary CTA",
    "Social Proof: Logos, testimonials, or metrics to build trust",
    "Features/Benefits: Address pain points with visual clarity",
  ];

  if (brief.pageGoal.toLowerCase().includes("convert")) {
    structures.push(
      "Conversion Zone: Strategic CTA placement with trust indicators",
      "FAQ Section: Address objections before final CTA"
    );
  }

  if (brief.targetUsers.toLowerCase().includes("developer")) {
    structures.push("Technical Details: Code snippets, API info, or documentation links");
  }

  structures.push(
    "Footer: Contact, links, legal, secondary navigation",
    `Ensure ${brief.productCategory} context is reflected in section ordering`
  );

  return structures;
}

// ============================================================
// Visual System Generation
// ============================================================

function generateVisualSystem(
  brief: DesignBrief,
  direction: DesignDirection
): string[] {
  return [
    `Color System: ${direction.colorSystem.slice(0, 4).join(", ")}`,
    `Typography: ${direction.typography.split(".")[0]}`,
    `Spacing: 8px base unit, with ${brief.visualIntensity === "expressive" ? "generous" : brief.visualIntensity === "minimal" ? "tight" : "moderate"} section padding`,
    `Border Radius: ${brief.visualIntensity === "minimal" ? "0-4px" : brief.visualIntensity === "expressive" ? "16-24px" : "8-12px"} for interactive elements`,
    `Shadows: Subtle, depth without drama (0 4px 20px rgba(0,0,0,0.05))`,
    `Max Width: ${brief.contentDensity === "dense" ? "1400px" : brief.contentDensity === "light" ? "1000px" : "1200px"}`,
  ];
}

// ============================================================
// Interaction System Generation
// ============================================================

function generateInteractionSystem(
  brief: DesignBrief,
  direction: DesignDirection
): string[] {
  const baseInteractions = [
    "All interactive elements have visible focus states",
    "Hover states are subtle but discoverable",
    "Loading states show progress or skeleton",
    "Transitions use ease-out, 200-300ms duration",
  ];

  if (direction.id === "calm-professional") {
    return [
      ...baseInteractions,
      "Minimal animation—function over form",
      "No playful bounces or overshoots",
      "Understated micro-interactions",
    ];
  }

  if (direction.id === "soft-intelligent") {
    return [
      ...baseInteractions,
      "Smooth spring physics on interactive elements",
      "Subtle hover lift (translateY -2px)",
      "Gradual scroll-reveal animations",
      "AI-appropriate but not distracting",
    ];
  }

  // experimental-premium
  return [
    ...baseInteractions,
    "Consider custom cursor or magnetic effects on key CTAs",
    "Parallax depth on scroll",
    "Unexpected micro-interactions that delight",
    "Gesture-based navigation where appropriate",
  ];
}

// ============================================================
// Content Tone Generation
// ============================================================

function generateContentTone(
  _brief: DesignBrief,
  direction: DesignDirection
): string[] {
  const toneBase = [
    "Use specific, concrete language over generic buzzwords",
    "Write for scannability: short paragraphs, clear headings",
    "Lead with value proposition, support with evidence",
  ];

  if (direction.id === "calm-professional") {
    return [
      ...toneBase,
      "Professional and authoritative tone",
      "Data-driven claims with specific metrics",
      "Clear, direct communication without unnecessary flair",
    ];
  }

  if (direction.id === "soft-intelligent") {
    return [
      ...toneBase,
      "Friendly but sophisticated voice",
      "Explain complex concepts in accessible language",
      "Balancing technical credibility with human warmth",
    ];
  }

  return [
    ...toneBase,
    "Confident and distinctive brand voice",
    "Editorial quality in all copywriting",
    "Memorable phrases that stick with users",
  ];
}

// ============================================================
// Component Rules Generation
// ============================================================

function generateComponentRules(
  brief: DesignBrief,
  direction: DesignDirection
): string[] {
  const baseRules = [
    "All buttons must have distinct default, hover, active, disabled states",
    "Cards should have consistent internal padding (16-24px)",
    "Forms need clear labels, validation states, and error messages",
    "Icons: consistent size, style, and stroke width",
  ];

  if (direction.id === "calm-professional") {
    return [
      ...baseRules,
      "Keep component styling uniform across the page",
      "Use subtle borders instead of heavy shadows",
      "Prioritize readability over visual decoration",
    ];
  }

  if (direction.id === "soft-intelligent") {
    return [
      ...baseRules,
      "Allow subtle elevation variation between components",
      "Use soft corners (rounded-2xl) for interactive elements",
      "Consider subtle gradient backgrounds on key sections",
    ];
  }

  return [
    ...baseRules,
    "Allow creative variation in component styling",
    "Consider custom illustrations or decorative elements",
    "Typography can break grid for visual impact",
  ];
}

// ============================================================
// Responsive Rules Generation
// ============================================================

function generateResponsiveRules(
  brief: DesignBrief,
  _direction: DesignDirection
): string[] {
  return [
    "Mobile-first approach: design for 375px first, enhance for larger",
    `Content density: ${brief.contentDensity === "light" ? "Reduce content on mobile, focus on single CTA" : brief.contentDensity === "dense" ? "Stack content vertically, maintain information richness" : "Balance content visibility with readability"}`,
    "Touch targets minimum 44x44px on mobile",
    "Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)",
    "Typography scales down 10-15% on mobile",
    "Navigation: hamburger menu on mobile, full nav on desktop",
    "Images: responsive with appropriate srcset for retina displays",
  ];
}

// ============================================================
// Acceptance Criteria Generation
// ============================================================

function generateAcceptanceCriteria(
  brief: DesignBrief,
  _direction: DesignDirection
): string[] {
  return [
    "Page loads in <3s on 3G connection",
    "Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1",
    "All CTAs are functional and lead to expected destinations",
    "Responsive breakpoints: 375px, 768px, 1024px, 1440px",
    "Color contrast meets WCAG AA (4.5:1 for normal text)",
    `Primary CTA ("${brief.mainCTA}") is prominently visible above fold`,
    "Mobile tap targets minimum 44x44px",
    "No layout shift during font loading (font-display: swap)",
    "All images have alt text",
    "Keyboard navigation works throughout",
  ];
}

// ============================================================
// Anti-AI-Look Checklist
// ============================================================

export function generateAntiAILookChecklist(): string[] {
  return [
    "Does the page look like a generic SaaS template? → Add unique brand elements",
    "Are all colors from a single palette or random? → Ensure deliberate color choices",
    "Is every section perfectly centered? → Consider asymmetric layouts",
    "Are icons all from the same library? → Mix styles or use custom SVGs",
    "Is spacing uniform throughout? → Vary spacing intentionally",
    "Do all cards have identical styling? → Add variation within consistency",
    "Is there excessive glass/blur effects? → Use restraint",
    "Are there generic stock photos? → Use original photography or illustrations",
    "Does typography lack hierarchy? → Create clear type scale",
    "Are gradients used arbitrarily? → Ensure gradient purpose is clear",
    "Is there a gradient text logo? → Prefer solid colors",
    "Do buttons all have the same hover effect? → Vary interaction patterns",
    "Are shadows all the same? → Create elevation hierarchy",
  ];
}

// ============================================================
// Markdown Export
// ============================================================

/**
 * Generate Markdown export of the execution pack
 */
export function generateMarkdownExport(pack: DesignExecutionPack, brief: DesignBrief): string {
  return `# Design Execution Pack

## Product Context

- **Product**: ${brief.productName}
- **Category**: ${brief.productCategory}
- **Target Users**: ${brief.targetUsers}
- **Page Goal**: ${brief.pageGoal}
- **Primary CTA**: ${brief.mainCTA}

## Selected Direction

**${pack.selectedDirection}**

## Design Strategy

${pack.strategy.map((s) => `- ${s}`).join("\n")}

## Page Structure

${pack.pageStructure.map((s) => `- ${s}`).join("\n")}

## Visual System

${pack.visualSystem.map((s) => `- ${s}`).join("\n")}

## Interaction System

${pack.interactionSystem.map((s) => `- ${s}`).join("\n")}

## Content Tone

${pack.contentTone?.map((t) => `- ${t}`).join("\n") || ""}

## Component Rules

${pack.componentRules?.map((r) => `- ${r}`).join("\n") || ""}

## Responsive Rules

${pack.responsiveRules?.map((r) => `- ${r}`).join("\n") || ""}

## Acceptance Criteria

${pack.acceptanceCriteria.map((c) => `- ${c}`).join("\n")}

## Anti-AI-Look Checklist

${pack.antiAILookChecklist.map((c) => `- ${c}`).join("\n")}

---

*Generated by Vibe Design Translator on ${new Date().toLocaleDateString()}*
`;
}

// ============================================================
// Tool-Specific Prompts
// ============================================================

function generateCodexPrompt(
  brief: DesignBrief,
  direction: DesignDirection
): string {
  return `You are building a ${brief.productName} ${brief.productCategory} landing page.

## Page Goal
${brief.pageGoal}

## Target Users
${brief.targetUsers}

## Desired Feeling
Create pages that feel: ${brief.desiredFeeling.join(", ")}
Avoid: ${brief.avoidedFeeling.join(", ")}

## Visual Direction: ${direction.name}
${direction.description}

### Color System
${direction.colorSystem.map((c) => `- ${c}`).join("\n")}

### Typography
${direction.typography}

### Layout Guidance
${direction.layoutAdvice.map((l) => `- ${l}`).join("\n")}

## Technical Requirements

### Primary CTA
"${brief.mainCTA}" — Must be prominently placed and visually distinct.

### Visual Intensity
${brief.visualIntensity.charAt(0).toUpperCase() + brief.visualIntensity.slice(1)} — ${brief.visualIntensity === "minimal" ? "Conservative use of color and decoration" : brief.visualIntensity === "expressive" ? "Bold use of color, large type, dynamic layouts" : "Balanced approach between minimal and expressive"}

### Content Density
${brief.contentDensity.charAt(0).toUpperCase() + brief.contentDensity.slice(1)} — ${brief.contentDensity === "light" ? "Lots of whitespace, minimal text" : brief.contentDensity === "dense" ? "Information-rich, minimal whitespace" : "Standard balance"}

## Implementation Checklist

Follow this progress sequence:

[  ] 0% - Project setup: Create React/Vue component structure, install dependencies, configure Tailwind
[  ] 10% - Base layout: Set up grid system, max-width containers, section spacing (48-64px padding)
[  ] 20% - Typography: Define type scale, set font weights, establish line-heights
[  ] 30% - Color system: Apply primary/secondary palette, ensure contrast ratios
[  ] 40% - Hero section: Value prop, headline, subheadline, primary CTA
[  ] 50% - Social proof: Logos, testimonials, or metrics section
[  ] 60% - Features: Benefits with icons, clear hierarchy
[  ] 70% - Secondary CTA: Conversion zone with trust indicators
[  ] 80% - Polish: Hover states, focus rings, micro-interactions
[  ] 90% - Responsive: Test all breakpoints, fix mobile layout issues
[  ] 100% - Quality: Accessibility audit, performance check, final review

## Coding Standards

- Use semantic HTML5 elements
- Follow BEM or CSS Modules naming
- Mobile-first responsive design
- Implement ${brief.contentDensity === "light" ? "generous" : brief.contentDensity === "dense" ? "compact" : "standard"} section padding
- Apply subtle shadows (0 4px 20px rgba(0,0,0,0.05))
- Use ${brief.visualIntensity === "minimal" ? "0-4px" : brief.visualIntensity === "expressive" ? "16-24px" : "8-12px"} border-radius

## Anti-AI-Look Rules
${generateAntiAILookChecklist().map((r) => `- ${r}`).join("\n")}

## Acceptance Criteria
${generateAcceptanceCriteria(brief, direction).map((c) => `- ${c}`).join("\n")}`;
}

function generateClaudeCodePrompt(
  brief: DesignBrief,
  direction: DesignDirection
): string {
  return `# ${brief.productName} - ${brief.productCategory} Page Implementation

## Context
You are helping build a landing page for ${brief.productName}, a ${brief.productCategory} targeting ${brief.targetUsers}.

## Current Task
Build a complete, production-ready landing page with ${direction.name} aesthetic.

---

## Step 1: Analyze & Read Existing Code

First, examine the current project structure:
- Check existing components, styles, and design patterns
- Identify any existing design tokens or theme configuration
- Note any existing assets or brand guidelines

## Step 2: Analyze Page Requirements

### Product Info
- **Name**: ${brief.productName}
- **Category**: ${brief.productCategory}
- **Target Users**: ${brief.targetUsers}
- **Page Goal**: ${brief.pageGoal}

### Desired Perception
**Positive**: ${brief.desiredFeeling.join(", ")}
**Avoid**: ${brief.avoidedFeeling.join(", ")}

### Visual Direction: ${direction.name}
${direction.description}

**Psychological Effect**: ${direction.psychologicalEffect}

### Color System
${direction.colorSystem.map((c) => `- ${c}`).join("\n")}

### Typography
${direction.typography}

### Layout Principles
${direction.layoutAdvice.map((l) => `- ${l}`).join("\n")}

### Interaction Guidelines
${direction.interactionAdvice.map((i) => `- ${i}`).join("\n")}

## Step 3: Implementation Plan

### Visual Intensity: ${brief.visualIntensity.toUpperCase()}
- ${brief.visualIntensity === "minimal" ? "Conservative use of color and decoration. Lots of whitespace. Clean typography." : ""}
- ${brief.visualIntensity === "balanced" ? "Moderate visual presence. Balanced whitespace. Clear hierarchy." : ""}
- ${brief.visualIntensity === "expressive" ? "Bold colors, large type, dynamic layouts. Strong visual impact." : ""}

### Content Density: ${brief.contentDensity.toUpperCase()}
- ${brief.contentDensity === "light" ? "Information sparse, generous spacing, focused messaging." : ""}
- ${brief.contentDensity === "standard" ? "Balanced information density with clear hierarchy." : ""}
- ${brief.contentDensity === "dense" ? "Information rich, compact layouts, comprehensive details." : ""}

### Page Sections
1. **Hero**: Value proposition + "${brief.mainCTA}" CTA
2. **Social Proof**: Trust indicators
3. **Features/Benefits**: Address user needs
4. **Conversion**: Final CTA with trust elements
5. **Footer**: Links and legal

## Step 4: Implementation Execution

### Phase A: Foundation
1. Set up CSS variables/design tokens
2. Configure typography scale
3. Define color palette
4. Set spacing system (8px base)

### Phase B: Components
1. Button (default, hover, active, disabled states)
2. Card (with optional image, title, description)
3. Section containers (max-width, padding)
4. Typography components (headings, body, captions)

### Phase C: Page Sections
Build each section following visual direction:
1. Hero with primary CTA
2. Social proof section
3. Features grid/list
4. CTA section
5. Footer

### Phase D: Polish
1. Hover/focus states
2. Scroll animations (if appropriate)
3. Responsive breakpoints
4. Accessibility features

## Step 5: Self-Check

Before completing, verify:

### Design Check
- [ ] Color palette matches ${direction.name} specification
- [ ] Typography follows defined scale
- [ ] Spacing is consistent with ${brief.contentDensity} density
- [ ] Visual intensity matches ${brief.visualIntensity} requirement

### Anti-AI-Look Check
- [ ] Does NOT look like generic SaaS template
- [ ] Colors are deliberate, not random
- [ ] Layout has intentional variation
- [ ] No uniform glass/blur overuse
- [ ] Typography has clear hierarchy

### Quality Check
- [ ] All CTAs are functional
- [ ] Responsive on mobile (375px+)
- [ ] Accessible: alt text, focus states, contrast
- [ ] Performance: optimized images, minimal JS

## Output Format

Present your implementation as:
1. File structure overview
2. Key design decisions
3. Component code
4. Integration notes
5. Any issues or suggestions

---

**Remember**: The goal is a page that feels human-crafted, not AI-generated. Prioritize clarity, consistency, and subtle sophistication over flashy effects.`;
}

function generateGeminiPrompt(
  brief: DesignBrief,
  direction: DesignDirection
): string {
  return `# ${brief.productName} Landing Page

**Role**: You are an expert frontend developer building a ${brief.productCategory} landing page.

**Goal**: Create a distinctive, non-generic landing page for ${brief.productName}.

---

## Page Specification

### Product
- **Name**: ${brief.productName}
- **Type**: ${brief.productCategory}
- **Audience**: ${brief.targetUsers}
- **Objective**: ${brief.pageGoal}

### Design Direction: ${direction.name}
${direction.description}

### Color Palette
${direction.colorSystem.map((c) => `- ${c}`).join("\n")}

### Typography
${direction.typography}

### Layout
${direction.layoutAdvice.map((l) => `- ${l}`).join("\n")}

### Interactions
${direction.interactionAdvice.map((i) => `- ${i}`).join("\n")}

## Desired Feel
**Must evoke**: ${brief.desiredFeeling.join(", ")}
**Must avoid**: ${brief.avoidedFeeling.join(", ")}

## Visual Style
- **Intensity**: ${brief.visualIntensity}
- **Density**: ${brief.contentDensity}
- **Primary CTA**: "${brief.mainCTA}"

---

## Implementation Workflow

### Terminal Agent Commands

Execute these steps using terminal:

\`\`\`bash
# Step 1: Check project structure
ls -la
cat package.json

# Step 2: Install dependencies
npm install

# Step 3: Create file structure
mkdir -p src/components src/styles
touch src/App.tsx src/components/Hero.tsx src/components/Features.tsx src/components/Footer.tsx

# Step 4: Implement components
# [Write your component code here]
\`\`\`

### Dependencies to Install
- React 18+
- Tailwind CSS
- Lucide React (icons)

### Design Token Implementation
\`\`\`css
:root {
  /* Colors from ${direction.name} */
  --color-primary: ${direction.colorSystem[0]};
  --color-secondary: ${direction.colorSystem[1]};
  --color-bg: ${direction.colorSystem[2]};
  --color-text: ${direction.colorSystem[direction.colorSystem.length - 1]};

  /* Spacing */
  --space-unit: 8px;
  --space-section: ${brief.visualIntensity === "expressive" ? "72px" : brief.visualIntensity === "minimal" ? "48px" : "64px"};
}
\`\`\`

## Anti-AI-Look Requirements
${generateAntiAILookChecklist().map((r) => `- ${r}`).join("\n")}

## Acceptance Criteria
${generateAcceptanceCriteria(brief, direction).map((c) => `- ${c}`).join("\n")}

---

## Code Quality Standards

1. **Type Safety**: Use TypeScript with strict mode
2. **Semantic HTML**: Proper heading hierarchy, landmarks
3. **Accessibility**: ARIA labels, focus management, color contrast
4. **Performance**: Lazy loading, optimized assets, minimal JS
5. **Responsive**: Mobile-first, test at 375px, 768px, 1024px, 1440px

## Final Check

Before marking complete, run:
\`\`\`bash
# TypeScript type check
npx tsc --noEmit

# ESLint check
npm run lint

# Build test
npm run build
\`\`\`

All checks must pass.`;
}

function generateWorkbuddyPrompt(
  brief: DesignBrief,
  direction: DesignDirection
): string {
  return `# ${brief.productName} - ${brief.productCategory} 页面实现任务

## 任务背景

你正在为 ${brief.productName}（${brief.productCategory}）构建一个专业的着陆页。

## 目标用户
${brief.targetUsers}

## 页面目标
${brief.pageGoal}

## 设计方向：${direction.name}
${direction.description}

## 视觉系统要求

### 色彩系统
${direction.colorSystem.map((c) => `- ${c}`).join("\n")}

### 字体排版
${direction.typography}

### 布局规范
${direction.layoutAdvice.map((l) => `- ${l}`).join("\n")}

### 交互规范
${direction.interactionAdvice.map((i) => `- ${i}`).join("\n")}

## 功能需求

### 必须实现的情感
${brief.desiredFeeling.map((f) => `- ${f}`).join("\n")}

### 必须避免的问题
${brief.avoidedFeeling.map((a) => `- ${a}`).join("\n")}

### 视觉强度：${brief.visualIntensity.toUpperCase()}
- ${brief.visualIntensity === "minimal" ? "保守用色和装饰，大量留白，干净排版" : ""}
- ${brief.visualIntensity === "balanced" ? "适度视觉存在感，平衡留白，清晰层次" : ""}
- ${brief.visualIntensity === "expressive" ? "大胆用色，大字号，动态布局" : ""}

### 内容密度：${brief.contentDensity.toUpperCase()}
- ${brief.contentDensity === "light" ? "信息稀疏，大量留白，聚焦信息" : ""}
- ${brief.contentDensity === "standard" ? "平衡信息密度，清晰层次" : ""}
- ${brief.contentDensity === "dense" ? "信息丰富，紧凑布局，全面细节" : ""}

### 主要 CTA
"${brief.mainCTA}" — 必须显眼放置，视觉上突出

## 页面结构

1. **Hero 区**：价值主张 + 主要 CTA
2. **社会证明**：信任标识（logo/评价/数据）
3. **功能/优势**：解决用户痛点
4. **转化区**：最终 CTA + 信任元素
5. **页脚**：链接和法律信息

## 实现要求

### 技术栈
- React 18+ 或 Vue 3
- Tailwind CSS
- TypeScript
- Lucide React 图标

### 代码质量
1. **类型安全**：严格 TypeScript 模式
2. **语义 HTML**：正确的标题层级，语义化标签
3. **可访问性**：ARIA 标签，焦点管理，颜色对比度
4. **性能**：懒加载，优化资源，最小化 JS
5. **响应式**：移动优先，测试 375px/768px/1024px/1440px

### 反 AI 痕迹清单
${generateAntiAILookChecklist().map((r) => `- ${r}`).join("\n")}

## 验收标准
${generateAcceptanceCriteria(brief, direction).map((c) => `- ${c}`).join("\n")}

## 执行流程

1. **分析需求**：理解产品定位和设计方向
2. **设计系统**：建立色彩、字体、间距系统
3. **组件开发**：Button、Card、Section 容器等
4. **页面组装**：Hero → Social Proof → Features → CTA → Footer
5. **交互完善**：Hover、Focus、动画
6. **响应式适配**：测试各断点
7. **质量检查**：可访问性、性能、类型检查

---

**重要提醒**：目标是创建一个看起来像人精心设计的页面，而不是 AI 批量生成的模板。优先考虑清晰度、一致性和微妙精致感，而不是花哨效果。`;
}

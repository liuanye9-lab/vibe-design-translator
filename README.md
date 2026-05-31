# Vibe Design Translator

> Design Decision SaaS for AI Coding Users

[English](#english) | [中文](#中文)

---

## English

### Project Overview

**Vibe Design Translator** is a design decision and diagnosis SaaS for AI coding users. It translates vague visual taste into executable frontend prompts for tools like Codex, Claude Code, Gemini, and WorkBuddy.

It helps users avoid generic AI-generated UI by producing:
- Structured design directions
- Execution packs with actionable guidelines
- Tool-specific prompts with acceptance criteria
- Anti-AI-Look diagnosis reports

### Target Users

- **Developers** using AI coding tools who want better design outcomes
- **Product managers** needing to communicate design vision to AI
- **Startup founders** building MVPs without dedicated designers
- **Designers** who want to translate their vision into prompts

### Core User Flow

```
1. Choose Mode
   ├── "I have an idea" → Full design brief with decision questions
   ├── "I have no direction" → Quick brief with direction suggestions
   └── "Diagnose my page" → AI-generated page audit

2. Design Brief (5-10 questions)
   - Product info
   - First impression goals
   - Business priorities
   - Visual references (abstract, not copying)
   - Avoided AI patterns

3. Choose Direction
   ├── Calm Professional (Enterprise, B2B, Finance)
   ├── Soft Intelligent (AI/Tech, Developer Tools)
   └── Experimental Premium (Creative, Luxury, Portfolio)

4. Get Execution Pack
   - Design strategy
   - Page structure
   - Visual system
   - Interaction guidelines
   - Content tone
   - Component rules
   - Acceptance criteria
   - Anti-AI-Look checklist

5. Generate Tool-Specific Prompts
   ├── Codex (progress-based, step-by-step)
   ├── Claude Code (analysis → plan → implement)
   ├── Gemini (terminal workflow)
   └── WorkBuddy (Chinese engineering tasks)
```

### Current MVP Features

| Feature | Status |
|---------|--------|
| Three-entry mode selector | ✅ Complete |
| Enhanced design brief form | ✅ Complete |
| 3 design directions | ✅ Complete |
| Direction recommendation engine | ✅ Complete |
| Execution pack generator | ✅ Complete |
| Tool-specific prompt compiler | ✅ Complete |
| 12 original design patterns | ✅ Complete |
| Diagnosis mock system | ✅ Complete |
| localStorage persistence | ✅ Complete |
| History tracking | ✅ Complete |
| Markdown export | ✅ Complete |

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Persistence**: localStorage

### How to Run

```bash
# Clone the repository
git clone https://github.com/liuanye9-lab/vibe-design-translator.git
cd vibe-design-translator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

### Project Structure

```
app/
├── page.tsx           # Home page
├── brief/page.tsx      # Design brief form
├── directions/page.tsx  # Direction selection
├── pack/page.tsx       # Execution pack view
├── compiler/page.tsx   # Prompt compiler
├── diagnosis/page.tsx  # Diagnosis tool
├── patterns/page.tsx   # Design patterns library
├── pricing/page.tsx    # Pricing page
└── settings/page.tsx   # Settings & history

components/
├── layout/            # App shell, nav, background
└── ui/                # Glass card, buttons, inputs
    └── product/       # Mode selector, brief form, etc.

lib/
├── types.ts           # TypeScript interfaces
├── constants.ts       # Constants and options
├── design-patterns.ts # 12 original patterns
├── design-directions.ts # 3 design directions
├── prompt-templates.ts # Tool prompt generators
├── diagnosis.ts        # Mock diagnosis logic
├── storage.ts          # localStorage utilities
└── utils.ts           # Helper functions

store/
└── use-design-store.ts # Zustand store
```

### Why Phase 1 Doesn't Connect Real AI

**Purpose**: Establish stable engineering foundation before adding complexity.

1. **Engineering stability first**: Ensure core flows work without API dependencies
2. **Mock data for development**: Test prompts without API costs
3. **User feedback loop**: Iterate on UX before investing in AI infrastructure
4. **Separation of concerns**: Frontend (this repo) vs AI logic (future services)

### Why Phase 1 Doesn't Use Scrapers

1. **Legal compliance**: Avoid copyright and IP issues
2. **Design integrity**: Promote original design thinking over copying
3. **User education**: Teach design principles rather than replication
4. **Long-term value**: Users learn to communicate design intent

### Compliance Strategy

- All 12 design patterns are **original abstract principles**
- Design directions describe **abstract signals**, not specific websites
- Prompt fragments guide **implementation approach**, not content
- No third-party screenshots, logos, or trademarks referenced
- All "reference" language uses: "abstract design signals", "implementation guidance", "logic reference"

### Roadmap

| Phase | Features |
|-------|----------|
| **Phase 1** (Current) | Engineering MVP, localStorage, mock AI |
| **Phase 2** | Real AI API connectors (Claude, Gemini) |
| **Phase 3** | Vision diagnosis (screenshot upload) |
| **Phase 4** | User auth, project workspace |
| **Phase 5** | Stripe billing, subscription tiers |
| **Phase 6** | Team workspace, shared design memory |
| **Phase 7** | Brand rules, private pattern library |
| **Phase 8** | API/MCP access, enterprise integration |

### Interview Highlights

When presenting this project in interviews:

1. **Product thinking**: Identified a real pain point (AI coding tools produce generic UI)
2. **User research**: Designed a brief that feels like a design consultation, not a form
3. **Technical depth**: TypeScript strict mode, Zustand with localStorage hydration
4. **Engineering judgment**: Chose Next.js App Router for proper routing
5. **Design sensibility**: Anti-AI-Look system shows understanding of aesthetics
6. **Business strategy**: Phased approach, compliance-first, no scraping

### Commercial Potential

- **SaaS subscription**: Free tier with limits, Pro/Team paid tiers
- **API access**: MCP integration for AI coding tool ecosystems
- **Enterprise**: Brand rules, team collaboration, design memory
- **Market timing**: AI coding is exploding; tools that improve output quality are valuable

---

## 中文

### 项目定位

**Vibe Design Translator** 是一款面向 AI Coding 用户的设计决策与诊断 SaaS。它将模糊的审美需求翻译成 Codex、Claude Code、Gemini、WorkBuddy 可执行的前端 Prompt。

它帮助用户避免 AI 生成页面的：
- 模板感
- 廉价感
- 同质化

### 核心用户流程

1. **选择模式**
   - "我有想法" → 完整设计简报
   - "我没有方向" → 快速简报
   - "诊断我的页面" → AI 生成页面审计

2. **设计简报**（设计决策反问）
   - 产品信息
   - 第一印象目标
   - 商业优先级
   - 视觉参考（抽象，不复制）
   - 避免的 AI 模式

3. **选择方向**
   - 冷静专业（企业、B2B、金融）
   - 柔和智能（AI/科技、开发者工具）
   - 实验 premium（创意、奢侈品、作品集）

4. **获取执行包**
   - 设计策略
   - 页面结构
   - 视觉系统
   - 交互指南
   - 内容调性
   - 组件规则
   - 验收标准
   - 反 AI 痕迹清单

5. **生成工具特定 Prompt**
   - Codex（进度式、逐步）
   - Claude Code（分析→计划→实现）
   - Gemini（终端工作流）
   - WorkBuddy（中文工程任务）

### 当前版本：Phase 2 Preparation

本版本为 **Phase 2 准备版本**，已包含：
- 完整的工程化结构
- 增强的设计反问系统
- 方向推荐引擎
- 工具特定 Prompt 编译器
- Markdown 导出
- 12 个原创设计模式

### 如何运行

```bash
# 克隆仓库
git clone https://github.com/liuanye9-lab/vibe-design-translator.git
cd vibe-design-translator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

---

## License

MIT License - See LICENSE file for details.

## Version

**Current Version**: Phase 2 Preparation (Engineering foundation for AI integration)

**Version Progress**: 50% → 78%

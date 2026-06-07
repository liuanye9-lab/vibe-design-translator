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
- Provider metadata, usage estimates, fallback traces, and local agent run history

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
| Screenshot upload & preview | ✅ Complete |
| Project workspace (local) | ✅ Complete |
| localStorage persistence | ✅ Complete |
| History tracking | ✅ Complete |
| Markdown export | ✅ Complete |
| AI Connector abstraction layer | ✅ Complete |
| Mock provider (ready for real AI) | ✅ Complete |
| OpenAI / Claude / Gemini real connectors | ✅ Complete |
| Provider capability matrix & fallback metadata | ✅ Complete |
| Structured schema validation for provider JSON | ✅ Complete |
| Agent run artifact history | ✅ Complete |
| Screenshot evidence zones & before/after rail | ✅ Complete |
| GitHub Actions CI | Prepared locally; blocked from push until GitHub token has `workflow` scope |

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Persistence**: localStorage

### Project Structure

```
app/
├── page.tsx              # Home page
├── brief/page.tsx        # Design brief form
├── directions/page.tsx   # Direction selection
├── pack/page.tsx         # Execution pack view
├── compiler/page.tsx      # Prompt compiler
├── diagnosis/page.tsx    # Diagnosis tool
├── agent-runs/page.tsx   # Local run artifacts and evaluations
├── patterns/page.tsx     # Design patterns library
├── pricing/page.tsx      # Pricing page
├── settings/page.tsx      # Settings & history
└── workspace/page.tsx     # Project workspace

components/
├── layout/               # App shell, nav, background
└── ui/                  # Glass card, buttons, inputs
    └── product/          # Mode selector, brief form, etc.

lib/
├── types.ts              # TypeScript interfaces
├── constants.ts          # Constants and options
├── design-patterns.ts    # 12 original patterns
├── design-directions.ts  # 3 design directions
├── prompt-templates.ts   # Tool prompt generators
├── diagnosis.ts          # Mock diagnosis logic
├── storage.ts           # localStorage utilities
├── utils.ts             # Helper functions
├── artifacts/           # Local run artifact persistence
├── llm/                 # Provider prompts, schemas, usage metadata
└── connectors/          # AI Provider abstraction
    ├── ai-provider.ts
    ├── vision-provider.ts
    ├── mock-provider.ts
    ├── openai-provider.ts
    ├── claude-provider.ts
    ├── gemini-provider.ts
    └── provider-registry.ts

store/
└── use-design-store.ts  # Zustand store
```

### AI Connector Architecture

The project includes a pluggable AI connector system:

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer                            │
│         (Pages, Components, State)                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│               Provider Registry                         │
│  (getDesignAIProvider, getVisionDiagnosisProvider)     │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Mock Provider │ │ OpenAI       │ │ Claude/Gemini│
│ (Local Rules) │ │ (Real API)   │ │ (Real API)   │
└───────────────┘ └───────────────┘ └───────────────┘
```

**Current Status**:
- ✅ Mock provider: Fully functional, no API required
- ✅ OpenAI provider: Text, vision, and JSON mode implemented
- ✅ Claude provider: Text, vision, and structured output implemented
- ✅ Gemini provider: Text, vision, and structured output implemented
- ✅ Mimo provider: Listed as unsupported because no connector exists in this repo
- ✅ Provider failures return structured errors and fall back to mock when possible

### Environment Variables

Copy `.env.example` to `.env.local` to configure AI providers:

```bash
# Enable real AI (default: false)
NEXT_PUBLIC_ENABLE_REAL_AI=false

# Provider selection (default: mock)
NEXT_PUBLIC_AI_PROVIDER=mock  # Options: mock, openai, claude, gemini, mimo

# API Keys (required when enabling real AI)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
```

### Why Default to Mock?

**Engineering Reasons**:
1. **No API costs during development**
2. **Instant feedback, no latency**
3. **Deterministic outputs for testing**
4. **Easy to iterate without rate limits**

**Product Reasons**:
1. **Users can try before paying**
2. **Stable baseline before AI complexity**
3. **Clear upgrade path when ready**

### Deep Research Upgrade Status

| Phase | Result |
|-------|--------|
| **Phase 1** | Provider status API and truthful capability matrix |
| **Phase 2** | Chinese-first locale flow across UI, store, routes, and mock output |
| **Phase 3** | Structured LLM schema validation, provider prompts, and usage metadata |
| **Phase 4** | Real OpenAI, Claude, and Gemini connectors with mock fallback |
| **Phase 5** | Local run artifacts, evaluations, screenshot evidence, and before/after views |
| **Phase 6** | Productized results, direction moodboard triptych, CI workflow prepared locally, and completion docs |

### Roadmap

| Phase | Features |
|-------|----------|
| **Phase 1** | Engineering MVP, localStorage, mock AI |
| **Phase 2** | Design decision enhancements, prompt system |
| **Phase 3** | Project workspace, AI connector abstraction, screenshot upload |
| **Phase 4** | Real AI API integration with provider fallback |
| **Phase 5** | Vision diagnosis and artifact history |
| **Phase 6** (Current) | Productized result pages and CI workflow prepared locally |
| **Phase 7** | Stripe billing, subscription tiers |
| **Phase 8** | Team workspace, shared design memory |
| **Phase 9** | Brand rules, private pattern library |
| **Phase 10** | API/MCP access, enterprise integration |

### Interview Highlights

When presenting this project in interviews:

1. **Product thinking**: Identified a real pain point (AI coding tools produce generic UI)
2. **User research**: Designed a brief that feels like a design consultation, not a form
3. **Technical depth**: TypeScript strict mode, Zustand with localStorage hydration
4. **Engineering judgment**: Chose Next.js App Router, pluggable AI connector architecture
5. **Design sensibility**: Anti-AI-Look system shows understanding of aesthetics
6. **Business strategy**: Phased approach, compliance-first, no scraping
7. **Scalability**: AI provider abstraction allows switching models without UI changes

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

### 当前版本：Phase 6 Deep Research Upgrade Complete

本版本已按深度研究报告推进到 **阶段六**，已包含：

**新增功能**：
- ✅ 项目工作区（本地存储）
- ✅ 截图上传与预览
- ✅ AI Connector 抽象层
- ✅ Mock Provider 默认兜底
- ✅ OpenAI / Claude / Gemini 真实 provider
- ✅ provider 状态矩阵、usage metadata、结构化错误与 fallback 追踪
- ✅ agent run artifact 历史、评分对比、重新运行入口
- ✅ 截图 evidence zones 与 before/after 修复轨道
- ✅ Direction moodboard triptych 和结果页 meta/evaluation 卡片
- ⚠️ GitHub Actions CI workflow prepared locally; remote push requires GitHub `workflow` token scope
- ✅ 项目 JSON/Markdown 导出

### 项目架构

```
前端层 (UI) → API Routes → Provider Registry → AI Provider (Mock/OpenAI/Claude/Gemini)
                         ↓
                localStorage Agent Runs
```

**当前状态**：
- Mock Provider: 完全可用，无需 API
- OpenAI Provider: 接口已就绪，待实现
- Claude Provider: 接口已就绪，待实现
- Gemini Provider: 接口已就绪，待实现

### 深度研究升级进度

**当前进度：30%**

- ✅ 阶段一：Provider source-of-truth、provider-status API、Settings 能力矩阵、mock fallback 透明化
- ✅ 阶段二：中文优先 locale source-of-truth、语言切换、关键 UI 字典、三条 AI route 的 locale 透传
- ✅ 新增检查：`npm run check:i18n` 与 `npm run check:bilingual`
- ✅ 新增 API route：`/api/ai/diagnose-screenshot`、`/api/ai/generate-execution-pack`、`/api/ai/generate-refactor-prompt`
- ⚠️ 真实 Gemini/OpenAI/Claude 接入仍未实现，当前真实输出仍依赖 mock provider

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

### 如何启用真实 AI

1. 复制环境变量模板：
   ```bash
   cp .env.example .env.local
   ```

2. 配置 API Key（选择一个提供商）：
   ```bash
   # OpenAI
   OPENAI_API_KEY=sk-...

   # 或 Anthropic (Claude)
   ANTHROPIC_API_KEY=sk-ant-...

   # 或 Google Gemini
   GEMINI_API_KEY=AIza...
   ```

3. 启用真实 AI：
   ```bash
   NEXT_PUBLIC_ENABLE_REAL_AI=true
   NEXT_PUBLIC_AI_PROVIDER=claude  # 或 openai, gemini
   ```

---

## License

MIT License - See LICENSE file for details.

## Version

**Current Version**: Phase 3 AI Diagnosis Foundation (Project workspace + AI connector abstraction)

**Version Progress**: 68% → 86%

**Deep Research Upgrade Progress**: 30%

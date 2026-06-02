# TODO - Vibe Design Translator

## Version: Phase 5 Agent Workflow Foundation
**Last Updated**: 2026-06-02
**Project Progress**: 90% → 94%

---

## Priority Legend

| Priority | Description |
|----------|-------------|
| **P0** | Must fix - blocks build, core flow broken |
| **P1** | Should fix - affects UX significantly |
| **P2** | Nice to have - improvements |

---

## P0 - Critical (Must Fix Before Phase 6)

### Engineering Stability

- [x] Build passes without errors
- [x] TypeScript strict mode compliance
- [x] ESLint passes
- [x] localStorage hydration works without flicker
- [x] All 14 pages route correctly (including 3 API routes)

### Core User Flows

- [x] Home → Mode selection → Brief → Directions → Pack → Compiler
- [x] Diagnosis flow end-to-end (Phase 4: server-side API routes)
- [x] Patterns library browse and search
- [x] Copy prompt functionality
- [x] History tracking
- [x] Project workspace CRUD (Phase 3)
- [x] Screenshot upload (Phase 3)
- [x] Server-side AI API routes with mock fallback (Phase 4)
- [x] GitHub Actions CI pipeline (Phase 4)

### Phase 5 Completed

- [x] AgentRun / AgentStep / AgentEvent 类型系统
- [x] 7 个 Agent Skills (brief-interpreter, direction-planner, execution-pack-generator, prompt-compiler, vision-diagnosis, refactor-prompt-generator, project-exporter)
- [x] Skill Registry (统一注册和获取)
- [x] Workflow Orchestrator (设计翻译、页面诊断、重构 Prompt 三个工作流)
- [x] Agent Workflow UI 组件 (AgentRunPanel, WorkflowTimeline, AgentStepCard, AgentProgressBar, ToolCallTrace, HumanApprovalGate, AgentEventLog)
- [x] Agent Runs 页面 (/agent-runs)
- [x] 顶部导航增加 "Agent 工作流" 入口
- [x] Diagnosis 页面接入 Agent Workflow 模式
- [x] Brief 页面接入 Agent Workflow 模式
- [x] Workspace 页面显示 Agent Run 状态
- [x] Zustand Store 新增 agentRuns 状态管理
- [x] localStorage 持久化 Agent Runs
- [x] 失败步骤支持重试
- [x] 人工确认门控 (Human Approval Gate)
- [x] docs/AGENT_WORKFLOW.md 文档
- [x] README.md 更新到 Phase 5

---

## P1 - Important (Next Sprint)

### Agent Workflow Enhancement

- [ ] MCP tool adapter for external tools
- [ ] Real background job queue
- [ ] Persistent DB-backed workflow storage
- [ ] Multi-agent role separation
- [ ] Human approval policy configuration
- [ ] Workflow replay / diff
- [ ] Agent evaluation metrics

### AI API Integration

- [ ] OpenAI API connector for brief interpretation
- [ ] Claude API connector for design analysis
- [ ] Gemini API connector for vision diagnosis
- [ ] API key management UI
- [ ] Rate limiting and retry logic
- [ ] Cost estimation display

### Vision Diagnosis Enhancement

- [ ] Image preview and crop
- [ ] Vision API integration (Claude/Gemini)
- [ ] Before/after comparison view
- [ ] Batch diagnosis for multiple pages

### User Authentication

- [ ] NextAuth.js setup
- [ ] Google OAuth provider
- [ ] GitHub OAuth provider
- [ ] User profile page
- [ ] Email/password fallback

---

## P2 - Nice to Have (Future Phases)

### Billing & Subscription

- [ ] Stripe integration
- [ ] Subscription tiers (Free/Pro/Team)
- [ ] Usage tracking (prompt exports, diagnoses)
- [ ] Billing dashboard
- [ ] Invoice history

### Team Workspace

- [ ] Team creation and management
- [ ] Team member invitations
- [ ] Shared design memory
- [ ] Team prompt templates
- [ ] Activity feed

### Brand Memory

- [ ] Brand color palette editor
- [ ] Brand typography rules
- [ ] Logo upload and guidelines
- [ ] Brand kit export
- [ ] Brand consistency checker

### Browser Extension

- [ ] Chrome extension scaffold
- [ ] Page analysis from extension
- [ ] Quick prompt generation
- [ ] Extension popup UI

### API & MCP

- [ ] REST API endpoints
- [ ] API key management
- [ ] MCP server setup
- [ ] API documentation
- [ ] Rate limiting

### Advanced Features

- [ ] A/B design comparison
- [ ] Design system import (Figma tokens)
- [ ] Multi-language support (EN/ZH/JP)
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts

---

## Technical Debt

### Current

- [ ] Mobile responsive menu (hamburger → full menu)
- [ ] Performance optimization (lazy load components)
- [ ] Error boundary implementation
- [ ] Loading skeleton states

### Future

- [ ] E2E testing (Playwright)
- [x] Unit testing setup with CI (Phase 4: GitHub Actions CI pipeline)
- [ ] Component documentation (Storybook)
- [x] CI/CD pipeline (Phase 4: GitHub Actions)

---

## Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| JSX `span` lowercase in settings | Fixed | Was causing warning |
| Diagnosis refactor prompt type | Fixed | Properly typed |
| ESLint config missing | Fixed | Created .eslintrc.json |

---

## Changelog

### 2026-06-02 - Phase 5 Agent Workflow Foundation

- **Agent Workflow Type System**: AgentRun, AgentStep, AgentEvent, AgentSkill, AgentContext
- **Skill Registry**: 7 composable skills (brief-interpreter, direction-planner, execution-pack-generator, prompt-compiler, vision-diagnosis, refactor-prompt-generator, project-exporter)
- **Workflow Orchestrator**: 3 standard workflows (Design Translation, Page Diagnosis, Refactor Prompt)
- **Agent UI Components**: AgentRunPanel, WorkflowTimeline, AgentStepCard, AgentProgressBar, ToolCallTrace, HumanApprovalGate, AgentEventLog
- **Agent Runs Page**: `/agent-runs` with run history, detail view, and clear functionality
- **Navigation Update**: Added "Agent 工作流" to top navigation
- **Diagnosis Integration**: Agent mode toggle in Diagnosis page
- **Brief Integration**: Agent mode toggle in Brief page
- **Workspace Integration**: Agent run status display in project cards
- **Zustand Store**: agentRuns state with localStorage persistence
- **Human Approval Gate**: Steps can require user confirmation
- **Retry Failed Steps**: Support retrying failed workflow steps
- **Documentation**: `docs/AGENT_WORKFLOW.md` with architecture, types, and workflows
- All health checks pass: `npm run lint` ✓, `npx tsc --noEmit` ✓, `npm run build` ✓

### 2026-05-31 - Phase 4 Real AI Vision MVP

- **Server-side AI API Routes**: 3 routes (`diagnose-screenshot`, `generate-execution-pack`, `generate-refactor-prompt`)
- **Secure API Key Handling**: Keys stay server-side only (in `process.env`, never `NEXT_PUBLIC_*`)
- **Graceful Fallback Pattern**: Real AI provider → catch error → automatic mock provider fallback
- **Unified Response Format**: `ApiSuccess<T>` with `meta` (provider, fallback, tokensUsed, estimatedCost) / `ApiError`
- **Diagnosis Page Refactor**: Replaced local mock with `fetch('/api/ai/diagnose-screenshot')` POST
- **Error State Display**: Glass card error UI with retry button in Diagnosis page
- **API Metadata Display**: Provider, fallback, token usage, and cost tracking shown in report view
- **VisionProvider Interface**: Updated to accept nullable screenshots (text-only diagnosis supported)
- **`.env.example` Updated**: Comprehensive comments explaining provider options and security notes
- **GitHub Actions CI**: `.github/workflows/ci.yml` with lint + tsc + build matrix (Node 20, 22)
- All health checks pass: `npm run lint` ✓, `npx tsc --noEmit` ✓, `npm run build` ✓

### 2026-05-31 - Phase 3 AI Diagnosis Foundation

- **Project Workspace**: Full CRUD (create/rename/delete/duplicate/export)
- **Screenshot Uploader**: Drag-drop, local preview, 5MB limit
- **AI Connector Abstraction**: Provider pattern, mock default, OpenAI/Claude/Gemini placeholders
- **Provider Registry**: Environment-based provider selection
- **Enhanced Diagnosis**: Dynamic findings based on pageType/painPoint
- **10 Page Routes**: Added /workspace
- Build passes, lint clean, TypeScript strict

### 2026-05-31 - Phase 2 Preparation

- Enhanced brief form with design decision questions
- Added direction recommendation engine
- Improved Execution Pack with 10 sections
- Added Markdown export functionality
- Enhanced diagnosis with repair strategy
- Added detailed findings with severity levels
- Created .eslintrc.json for linting
- Fixed TypeScript type issues

### 2026-05-30 - Engineering MVP

- Initial Next.js App Router setup
- TypeScript strict mode
- Zustand + localStorage persistence
- 9 pages with complete flows
- 26 components (layout/ui/product)
- 7 lib files (types, constants, utilities)
- 12 original design patterns
- 3 design directions
- 4 tool-specific prompt generators
- Mock diagnosis system

---

## How to Use This Document

1. **Weekly Review**: Check P0 and P1 items, update status
2. **Sprint Planning**: Pick top 5-7 items from P1 for next sprint
3. **Progress Tracking**: Update percentage as items are completed
4. **Handoff**: This document shows what's done and what's next

---

## Contributing

When adding features:
1. Update relevant TODO items
2. Add test coverage
3. Update README if user-facing
4. Update changelog

---

**Last reviewed**: 2026-06-02
**Next review**: Weekly

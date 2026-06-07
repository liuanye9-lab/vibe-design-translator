# TODO - Vibe Design Translator

## Version: Phase 6 Deep Research Upgrade Complete
**Last Updated**: 2026-06-07
**Project Progress**: 100%
**Deep Research Upgrade Progress**: 100%

---

## Priority Legend

| Priority | Description |
|----------|-------------|
| **P0** | Must fix - blocks build, core flow broken |
| **P1** | Should fix - affects UX significantly |
| **P2** | Nice to have - improvements |

---

## Completed - Deep Research Upgrade Phases 1-6

- [x] Phase 1: Provider status API, truthful capability matrix, settings visibility
- [x] Phase 2: Chinese-first locale store, UI dictionaries, route locale passthrough
- [x] Phase 3: Structured LLM prompts, JSON schema parsing, usage metadata
- [x] Phase 4: OpenAI, Claude, and Gemini real connectors with mock fallback
- [x] Phase 5: Local run artifacts, evaluations, evidence zones, before/after rail
- [x] Phase 6: Productized result summary, direction moodboard, completion docs; CI workflow prepared locally

## P0 - Critical

### Engineering Stability

- [x] Build passes without errors
- [x] TypeScript strict mode compliance
- [x] ESLint passes
- [x] localStorage hydration works without flicker
- [x] All pages route correctly (10 pages including workspace)

### Core User Flows

- [x] Home → Mode selection → Brief → Directions → Pack → Compiler
- [x] Diagnosis flow end-to-end with screenshot upload
- [x] Patterns library browse and search
- [x] Copy prompt functionality
- [x] History tracking

---

## P1 - Important (Next Sprint)

### AI API Integration

- [x] Provider status API with configured/used/fallback provider metadata
- [x] Locale-aware mock API routes for diagnosis, execution pack, and refactor prompt
- [x] Settings provider capability matrix
- [x] OpenAI API connector implementation
- [x] Claude API connector implementation
- [x] Gemini API connector implementation
- [x] Structured provider errors with mock fallback
- [x] Usage metadata and estimates in route responses
- [ ] API key management UI
- [ ] Rate limiting and retry logic
- [ ] Cost estimation display beyond token estimates
- [ ] Provider switcher in UI

### User Authentication

- [ ] NextAuth.js setup
- [ ] Google OAuth provider
- [ ] GitHub OAuth provider
- [ ] User profile page
- [ ] Email/password fallback

### Database & Cloud Sync

- [ ] Supabase or similar database setup
- [ ] Cloud sync for projects
- [ ] Cross-device support

---

## P2 - Nice to Have (Future Phases)

### Project Workspace

- [x] Save/load projects (localStorage)
- [x] Project list view
- [x] Project rename and delete
- [x] Project export (JSON/Markdown)
- [ ] Project sharing link
- [ ] Project templates

### Vision Diagnosis

- [x] Screenshot upload component
- [x] Image preview
- [x] Vision API integration (OpenAI/Claude/Gemini)
- [x] Before/after comparison view
- [x] Screenshot focus zone evidence view
- [ ] Image crop/resize
- [ ] Batch diagnosis for multiple pages

### AI Connector Layer

- [x] AI Provider abstraction layer
- [x] Vision Provider abstraction layer
- [x] Mock Provider (fully functional)
- [x] OpenAI Provider (real text/vision/schema)
- [x] Claude Provider (real text/vision/schema)
- [x] Gemini Provider (real text/vision/schema)
- [x] Provider Registry
- [x] Mimo capability row marked unsupported rather than faked

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
- [x] Recent run score comparison
- [x] Local artifact history
- [ ] Design system import (Figma tokens)
- [x] Chinese-first locale source-of-truth with EN/ZH switch
- [ ] JP locale support
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
- [ ] Unit testing (Vitest)
- [ ] Component documentation (Storybook)
- [ ] Publish CI/CD pipeline to GitHub Actions after granting `workflow` token scope

---

## Known Issues

| Issue | Status | Notes |
|-------|--------|-------|
| Provider truthfulness unclear | Fixed | Added `/api/ai/provider-status` and Settings capability matrix |
| Locale not reaching AI routes | Fixed | Added locale to three AI routes and provider signatures |
| Known bilingual leak: `平易近人 yet 前沿` | Fixed | Guarded by `npm run check:bilingual` |
| Known bilingual leak: `Before / After 可视化` | Fixed | Guarded by `npm run check:bilingual` |
| Known bilingual leak: `Agent 工作流` | Fixed | Guarded by `npm run check:bilingual` |
| JSX `span` lowercase in settings | Fixed | Was causing warning |
| Diagnosis refactor prompt type | Fixed | Properly typed |
| ESLint config missing | Fixed | Created .eslintrc.json |
| Mock provider not integrated | Fixed | Added provider-registry.ts |

---

## Changelog

### 2026-06-07 - Deep Research Upgrade Phase 1-6

**Structured Provider Runtime**:
- Added structured provider prompts and JSON validators
- Added provider usage metadata and estimated usage fallback
- Implemented OpenAI, Claude, and Gemini text/vision/schema connectors
- Added structured provider errors and mock fallback in API routes
- Added Mimo as unsupported capability row without fake availability

**Artifact & Evidence Loop**:
- Added local agent run artifact storage with `runId`, `agentStepId`, `type`, `title`, `content/url`, and `createdAt`
- Added `/agent-runs` with run details, artifact list, evaluation score, delta comparison, and rerun entry
- Added screenshot evidence zones and before/after repair rail
- Saved diagnosis and execution pack runs from product flows

**Product Finish & CI Prep**:
- Added direction moodboard triptych
- Added result page meta/evaluation summary cards
- Updated provider copy, phase status, README, and TODO to Phase 6
- Prepared GitHub Actions CI locally for i18n, bilingual guard, lint, and build; publishing it requires GitHub `workflow` token scope

**Verification Target**:
- `npm run check:i18n && npm run check:bilingual && npm run lint && npm run build`

### 2026-06-07 - Deep Research Upgrade Phase 1-2

**Provider Trust Layer**:
- Added provider capability source of truth
- Added `/api/ai/provider-status`
- Settings page now shows configured provider, provider actually used, fallback provider, and capability badges
- OpenAI/Claude/Gemini remain clearly marked as placeholders instead of production-ready providers

**Chinese-first Locale Flow**:
- Added `Locale` type, `locale` store state, and localStorage persistence
- Added structured i18n dictionaries under `lib/i18n`
- Added EN/ZH language toggle
- Translated critical paths: home, nav, brief form, diagnosis form/report, pack/compiler headings, Settings provider status, history labels
- Added locale-aware API routes for diagnosis, execution pack, and refactor prompt
- Mock diagnosis now returns Chinese findings/fixes/prompts when `locale=zh`

**Verification**:
- Added `npm run check:i18n`
- Added `npm run check:bilingual`
- `npm run check:i18n && npm run check:bilingual && npm run lint && npm run build` passes

### 2026-05-31 - Phase 3 AI Diagnosis Foundation

**Project Workspace**:
- Added DesignProject, PromptExport, ScreenshotAsset types
- Implemented project CRUD (create, read, update, delete)
- Added project duplication and export (JSON/Markdown)
- Integrated workspace into navigation
- Added project indicator in Brief page

**AI Connector Architecture**:
- Created lib/connectors/ directory
- Defined DesignAIProvider and VisionDiagnosisProvider interfaces
- Implemented Mock Provider (fully functional)
- Created placeholder providers (OpenAI, Claude, Gemini)
- Added Provider Registry for runtime switching
- Created .env.example for configuration

**Screenshot Upload**:
- Created ScreenshotUploader component
- Support PNG/JPG/WebP up to 5MB
- Local preview with dataUrl
- Drag-and-drop support
- Clear privacy notice (not uploaded to server)

**Diagnosis Integration**:
- Integrated screenshot upload into diagnosis page
- Updated diagnosis to use VisionProvider
- Added screenshot info to diagnosis report
- Added before/after state and confidence level
- Show mock notice when AI is disabled

**Navigation**:
- Added Workspace to nav items
- New page: app/workspace/page.tsx

### 2026-05-31 - Phase 2 Preparation

- Enhanced brief form with design decision questions
- Added direction recommendation engine
- Improved Execution Pack with 10 sections
- Added Markdown export functionality
- Enhanced diagnosis with repair strategy
- Added detailed findings with severity levels
- Created .eslintrc.json for linting
- Fixed TypeScript type issues
- Build passes with 12 pages

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

## Next Steps (Phase 4)

1. **Implement Real AI Providers**
   - Choose provider: OpenAI, Claude, or Gemini
   - Implement API calls with proper error handling
   - Add loading states and retry logic
   - Monitor API costs and rate limits

2. **Add API Key UI**
   - Settings page for API key management
   - Provider selection dropdown
   - Test connection button
   - Usage statistics display

3. **Database Integration**
   - Set up Supabase or similar
   - Migrate localStorage projects to cloud
   - Add user authentication
   - Implement real-time sync

---

**Last reviewed**: 2026-05-31
**Next review**: Weekly

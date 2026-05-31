# Vibe Design Translator

**Project Positioning:**
Vibe Design Translator is a design decision and diagnosis SaaS for AI coding users. It translates vague visual taste into executable frontend prompts for tools like Codex, Claude Code, Gemini, and WorkBuddy. It helps users avoid generic AI-generated UI by producing structured design directions, execution packs, tool-specific prompts, and anti-AI-look diagnosis reports.

**Target Users:**
- Developers using AI coding tools (Codex, Claude Code, Gemini, WorkBuddy)
- Designers who need to translate abstract aesthetic preferences into concrete implementation specs
- Product teams struggling with AI-generated UI that lacks personality and brand identity
- Frontend engineers building landing pages, product pages, or marketing sites

**Core User Flow:**

1. **I have an idea** → User fills design brief → Select design direction → Generate execution pack → Copy tool-specific prompt → Implement in AI coding tool
2. **I have no direction** → User provides lightweight brief → Get 3 curated design directions → Choose one → Generate execution pack → Copy prompt
3. **Diagnose my page** → User describes current page pain points → Upload screenshot placeholder → Get diagnosis report → Get refactor prompt → Fix issues

**Current MVP Features (Phase 1):**

- ✅ Design brief form (full & lightweight modes)
- ✅ 3 curated design directions (Calm Professional, Soft Intelligent, Experimental Premium)
- ✅ 12 original design patterns (abstract signals, no third-party assets)
- ✅ Tool-specific prompt generation (Codex, Claude Code, Gemini, WorkBuddy)
- ✅ Anti-AI-look diagnosis mock system
- ✅ Execution pack generator with acceptance criteria
- ✅ Local storage persistence
- ✅ History tracking
- ✅ Liquid Glass visual system (Apple-inspired, macOS Tahoe inspired)
- ✅ Responsive layout

**Tech Stack:**

- Next.js 14 App Router
- TypeScript (strict mode)
- Tailwind CSS
- Zustand (state management)
- lucide-react (icons)
- framer-motion (animations)
- localStorage (persistence)

**How to Run:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

**Project Structure:**

```
app/
  layout.tsx                 # Root layout with Liquid Glass background
  page.tsx                   # Home page (3 entry points)
  brief/page.tsx            # Design brief form
  directions/page.tsx       # Design direction selection
  pack/page.tsx             # Execution pack preview
  compiler/page.tsx         # Multi-tool prompt preview
  diagnosis/page.tsx        # Diagnosis form & report
  patterns/page.tsx         # Design pattern library
  pricing/page.tsx          # Pricing tiers (UI only)
  settings/page.tsx         # History & settings

components/
  layout/                   # App shell, navigation, background
  ui/                       # Glass cards, buttons, copy button, score bars
  product/                  # Mode selector, brief form, direction cards, etc.

lib/
  types.ts                  # TypeScript type definitions
  constants.ts              # App constants
  design-patterns.ts        # 12 original design patterns
  design-directions.ts      # 3 curated design directions
  prompt-templates.ts       # Tool-specific prompt generators
  diagnosis.ts              # Diagnosis mock logic
  storage.ts                # localStorage helpers
  utils.ts                  # Utility functions

store/
  use-design-store.ts       # Zustand global state

legacy/
  vibe_design_translator.prototype.tsx  # Original single-file prototype
```

**Why Phase 1 Does NOT Connect Real AI APIs:**

- Focus on engineering stability and architecture first
- Validate core user flow with mock data
- Build type-safe foundation before external dependencies
- Keep first version debuggable and predictable
- Separate "design logic" from "AI integration" to iterate independently

**Why Phase 1 Does NOT Build Scrapers:**

- Avoid legal risks (third-party copyright, trademark, screenshot)
- Focus on abstract design signals and original implementation guidance
- Build reusable design knowledge instead of copying existing sites
- Compliance with IP regulations
- Enable future commercialization without legal blockers

**Compliance Strategy:**

- All design patterns are abstract signals + original advice
- No third-party screenshots, logos, or trademarks
- Prompt templates reference design logic only, not specific branded sites
- Diagnosis reports focus on anti-patterns, not copying existing UI
- Clear legal notes in every pattern: "reference logic only, no copied assets"

**Roadmap:**

- **Phase 1 (Current):** Engineering foundation, type system, page routing, mock flows
- **Phase 2:** Connect real AI APIs (Claude, GPT-4, Gemini) for prompt generation
- **Phase 3:** Add real diagnosis via AI + screenshot analysis (computer vision)
- **Phase 4:** User authentication, project saving, cloud sync
- **Phase 5:** Stripe integration, subscription billing, team plans
- **Phase 6:** Private pattern library, brand rules, shared design memory
- **Phase 7:** API/MCP access for enterprise integration
- **Phase 8:** Bilingual output (Chinese + English), internationalization

**Interview Showcase Highlights:**

- Full-stack Next.js App Router architecture (not just SPA)
- Type-safe state management (Zustand + TypeScript)
- Design-to-prompt translation engine (product thinking + engineering)
- Anti-AI-look diagnosis logic (shows awareness of AI-generated UI problems)
- Compliance-first approach (IP-aware, legal-safe design patterns)
- Liquid Glass premium visual system (not default template)
- Clear separation of concerns (layout, UI, product, data, store)
- Multi-tool prompt adaptation (Codex, Claude Code, Gemini, WorkBuddy)
- Progress tracking and user flow visibility

**Commercialization Strategy:**

- **Free Tier:** Attract AI coding users with basic direction generator
- **Pro Tier:** Convert serious users with unlimited prompts + diagnosis
- **Team Tier:** Enterprise design memory, brand consistency, batch diagnosis
- **API/MCP Future:** Integrate into enterprise AI workflows
- **Consulting Add-on:** Custom design pattern library for specific brands
- **Training Content:** "How to avoid AI-generated UI" courses for teams

---

**Note:** This is Phase 1 MVP. Not production-ready yet. Focus is on engineering foundation, not full feature set.
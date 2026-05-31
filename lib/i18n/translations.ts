// ============================================================
// Vibe Design Translator - Bilingual Translations (zh / en)
// ============================================================

export type Locale = "zh" | "en";

export type TranslationDict = Record<string, string | Record<string, string>>;

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // ---------- Nav ----------
    nav_brand: "Vibe Translator",
    nav_home: "Home",
    nav_workspace: "Workspace",
    nav_patterns: "Patterns",
    nav_settings: "Settings",
    nav_back: "Back",

    // ---------- Language Toggle ----------
    lang_toggle: "EN / 中文",

    // ---------- Home Page ----------
    home_badge: "Design Decision SaaS for AI Coding",
    home_title_1: "Translate your vibe into",
    home_title_2: "executable prompts",
    home_description:
      "Stop fighting with AI to get the design you want. Describe your vision, get curated directions, and generate tool-specific prompts for Codex, Claude Code, Gemini, and WorkBuddy.",
    home_subtitle: "No sign-up required. No AI API connected. No data stored externally.",
    home_how_label: "How it works",
    home_how_title: "Three paths to better design",
    home_step1_title: "Describe your vision",
    home_step1_desc:
      "Tell us what you want—or what you want to avoid. We'll translate vague feelings into concrete design specs.",
    home_step2_title: "Choose a direction",
    home_step2_desc:
      "Pick from curated design directions that match your goals. Each comes with a complete execution strategy.",
    home_step3_title: "Get actionable prompts",
    home_step3_desc:
      "Generate tool-specific prompts with acceptance criteria, anti-AI-look checklists, and step-by-step guidance.",
    home_supports: "Supports prompts for",
    home_footer: "Vibe Design Translator — Phase 1 MVP. Engineering foundation, not production ready.",
    home_footer_patterns: "Design Patterns",
    home_footer_settings: "Settings",
    home_footer_pricing: "Pricing",

    // ---------- Brief Page ----------
    brief_loading: "Loading...",
    brief_back: "Back to home",
    brief_step_label: "Step 1 of 3",
    brief_title: "Design Brief",
    brief_subtitle:
      "Tell us about your product and design goals. The more detail you provide, the better the design direction we can suggest.",

    // ---------- Brief Form ----------
    brief_form_badge_1: "Quick Direction Finder",
    brief_form_badge_2: "Design Decision Workshop",
    brief_form_heading: "What are you building?",
    brief_form_subheading: "Tell us about your vision",
    brief_form_desc1: "Answer a few questions and we'll suggest a design direction.",
    brief_form_desc2: "We'll translate your feelings into concrete design specifications.",
    brief_form_product_label: "What are you building?",
    brief_form_product_placeholder: "e.g., A developer tool for API documentation",
    brief_form_category_label: "Product Category",
    brief_form_category_placeholder: "Select a category",
    brief_form_users_label: "Who is this for?",
    brief_form_users_placeholder: "e.g., Developers building REST APIs",
    brief_form_impression_label: "First Impression — What should users feel within 3 seconds?",
    brief_form_impression_helper: "Choose the emotional response you want to evoke",
    brief_form_selected: "Selected",
    brief_form_priority_label: "Business Priority — What's most important?",
    brief_form_priority_helper: "This helps us optimize the design for your goals",
    brief_form_visual_label: "Visual Reference — Which aesthetic direction resonates?",
    brief_form_visual_helper: "Abstract aesthetic tendencies (we're not copying, just finding direction)",
    brief_form_avoid_label: "What AI page problems do you want to avoid?",
    brief_form_avoid_helper: "Select the issues you most want to prevent",
    brief_form_audience_label: "Primary Audience — Who needs to be impressed?",
    brief_form_goal_label: "Page Goal — What should this page accomplish?",
    brief_form_goal_placeholder:
      "e.g., Drive sign-ups for the beta launch, explain the API-first approach, convince developers to try the product",
    brief_form_feeling_label: "Desired Feeling — Emotions to evoke",
    brief_form_feeling_helper: "Select the emotions your page should evoke",
    brief_form_avoid_feeling_label: "What to Avoid — Styles you want to prevent",
    brief_form_avoid_feeling_helper: "Select what you definitely do NOT want",
    brief_form_cta_label: "Primary Call-to-Action",
    brief_form_cta_placeholder: "e.g., Start Free Trial, Get Early Access, Book Demo",
    brief_form_intensity_label: "Visual Intensity",
    brief_form_density_label: "Content Density",
    brief_form_tool_label: "Output Tool — Which AI tool will you use?",
    brief_form_submit: "Find My Direction",
    brief_form_submit_alt: "Generate Design Directions",
    brief_form_product_default: "My Product",

    // ---------- Directions Page ----------
    directions_loading: "Loading...",
    directions_back: "Back to brief",
    directions_step_label: "Step 2 of 3",
    directions_title: "Design Direction",
    directions_subtitle:
      "Choose a design direction that matches your vision. Each direction comes with a complete strategy and visual system.",
    directions_generate: "Generate Pack",

    // ---------- Pack Page ----------
    pack_loading: "Generating your execution pack...",
    pack_back: "Back to directions",
    pack_step_label: "Step 3 of 3",
    pack_title: "Your Design Execution Pack",
    pack_subtitle: "Review your execution pack and copy the prompt for your preferred tool.",
    pack_direction_suffix: " direction",
    pack_view_all: "View All Prompts",
    pack_start_new: "Start New",

    // ---------- Compiler Page ----------
    compiler_empty: "No design brief found. Start from the home page.",
    compiler_go_home: "Go to Home",
    compiler_tag: "Prompt Compiler",
    compiler_title: "Tool-Specific Prompts",

    // ---------- Patterns Page ----------
    patterns_tag: "Design Patterns Library",
    patterns_title: "Pattern Library",
    patterns_subtitle:
      "12 original design patterns with abstract signals and implementation guidance. No third-party assets.",
    patterns_search: "Search patterns...",
    patterns_empty: "No patterns found matching your search.",
    patterns_disclaimer_title: "Design Pattern Disclaimer",
    patterns_disclaimer_desc:
      "This library contains abstract design signals and original implementation guidance only. No third-party screenshots, logos, or trademarked materials are stored or referenced. All patterns are designed to help you avoid generic AI-generated UI while maintaining originality.",

    // ---------- Pricing Page ----------
    pricing_tag: "Pricing",
    pricing_title: "Simple, transparent pricing",
    pricing_subtitle:
      "Choose the plan that fits your design workflow. All plans include localStorage persistence.",
    pricing_free: "Free",
    pricing_free_desc: "Get started with basic design direction generation.",
    pricing_free_price: "$0",
    pricing_free_period: "forever",
    pricing_pro: "Pro",
    pricing_pro_desc: "For individuals who want full access to design decision tools.",
    pricing_pro_price: "$19",
    pricing_pro_period: "/ month",
    pricing_team: "Team",
    pricing_team_desc: "For teams that need shared design memory and brand consistency.",
    pricing_team_price: "$49",
    pricing_team_period: "/ month per seat",
    pricing_popular: "Most Popular",
    pricing_btn_free: "Get Started",
    pricing_btn_paid: "Coming Soon",
    pricing_note_label: "Phase 1 MVP - No real payment integration yet",
    pricing_note_desc:
      "This is an engineering prototype. Real pricing and payment will be added in Phase 5. For now, all features are available for free during the testing period.",

    // ---------- Settings Page ----------
    settings_confirm_clear: "Are you sure you want to clear all data? This action cannot be undone.",
    settings_tag: "Settings & Data",
    settings_title: "Settings",
    settings_subtitle: "Manage your saved data, history, and preferences.",
    settings_state_title: "Current State",
    settings_brief_label: "Design Brief",
    settings_brief_empty: "No brief saved",
    settings_direction_label: "Selected Direction",
    settings_direction_empty: "No direction selected",
    settings_tool_label: "Preferred Tool",
    settings_data_title: "Data Management",
    settings_export: "Export Data as JSON",
    settings_clear_history: "Clear History Only",
    settings_clear_all: "Clear All Data",
    settings_about_title: "About Data Storage",
    settings_about_desc:
      "All data is stored locally in your browser using localStorage. No data is sent to any external server. Clearing your browser data will remove all saved information.",
    settings_tech_title: "Technical Info",
    settings_tech_storage: "Storage",
    settings_tech_storage_val: "localStorage (browser)",
    settings_tech_api: "AI API",
    settings_tech_api_val: "Not connected (Phase 1)",
    settings_tech_db: "Database",
    settings_tech_db_val: "None (Phase 1)",
    settings_tech_phase: "Phase",
    settings_tech_phase_val: "MVP Engineering",

    // ---------- Workspace Page ----------
    workspace_tag: "Workspace",
    workspace_title: "Workspace",
    workspace_subtitle: "Manage your design projects and diagnosis records.",
    workspace_new: "New Project",
    workspace_new_title: "New Project",
    workspace_name_label: "Project Name",
    workspace_name_placeholder: "e.g., My product landing page",
    workspace_type_label: "Project Type",
    workspace_cancel: "Cancel",
    workspace_create: "Create",
    workspace_empty_title: "No projects yet",
    workspace_empty_desc:
      "Click \"New Project\" to create your first design project, or start from the Brief page.",
    workspace_empty_action: "New Project",
    workspace_current: "Current",
    workspace_diagnose_count: "Diagnosed {n} time(s)",
    workspace_export_count: "Exported {n} time(s)",
    workspace_rename: "Rename",
    workspace_duplicate: "Duplicate Project",
    workspace_export_json: "Export JSON",
    workspace_export_md: "Export Markdown",
    workspace_delete: "Delete Project",
    workspace_delete_confirm: "Are you sure you want to delete this project? This action cannot be undone.",

    // ---------- Diagnosis Page ----------
    diagnosis_tag: "Diagnosis Tool",
    diagnosis_title: "Design Diagnosis",
    diagnosis_subtitle: "Identify issues with your current page and get actionable refactor prompts.",
    diagnosis_fail_title: "Diagnosis Failed",
    diagnosis_fail_desc: "An error occurred while diagnosing your page.",
    diagnosis_retry: "Back and Retry",
    diagnosis_upload_title: "Upload Screenshot (Optional)",
    diagnosis_upload_desc:
      "Upload a screenshot of your page to help the diagnosis system better analyze issues (local preview only, not uploaded to cloud).",
    diagnosis_tip: "Tip: This diagnosis result will not be saved automatically.",
    diagnosis_go_workspace: "Go to Workspace to create a project",
    diagnosis_tip_suffix: " to save diagnosis records.",
    diagnosis_error_fail: "Diagnosis request failed",
    diagnosis_error_unknown: "Unknown error occurred",
    diagnosis_error_label: "Diagnosis error:",

    // ---------- Diagnosis Form ----------
    diagnosis_form_page_type: "Page Type",
    diagnosis_form_page_type_placeholder: "Select page type",
    diagnosis_form_desc_label: "Page Description",
    diagnosis_form_desc_placeholder: "Describe your current page. What is it for? What does it contain?",
    diagnosis_form_pain_label: "Primary Pain Points",
    diagnosis_form_pain_helper: "Select all that apply",
    diagnosis_form_submit_loading: "Analyzing...",
    diagnosis_form_submit: "Run Diagnosis",

    // ---------- Diagnosis Report ----------
    diagnosis_report_overall: "Overall",
    diagnosis_report_score_good:
      "Your page has a solid foundation with some room for improvement.",
    diagnosis_report_score_medium:
      "Your page shows signs of generic design. Consider the fixes below.",
    diagnosis_report_score_bad:
      "Your page likely looks like an AI-generated template. Urgent redesign recommended.",
    diagnosis_report_provider: "Provider",
    diagnosis_report_provider_val: "Mock (Local)",
    diagnosis_report_mode: "Fallback to Mock",
    diagnosis_report_tokens: "Tokens Used",
    diagnosis_report_cost: "Est. Cost",
    diagnosis_report_breakdown: "Score Breakdown",
    diagnosis_report_findings: "Key Findings",
    diagnosis_report_fixes: "Recommended Fixes",
    diagnosis_report_prompt_title: "Refactor Prompt for {tool}",
    diagnosis_report_another: "Diagnose Another Page",
    diagnosis_report_fresh: "Start Fresh",

    // ---------- Direction Card ----------
    direction_card_best: "Best for",
    direction_card_color: "Color mood",
    direction_card_psych: "Psychological effect: {effect}",

    // ---------- Liquid Button ----------
    button_loading: "Loading...",

    // ---------- Constants - Tool Labels ----------
    tool_codex: "Codex",
    tool_claude_code: "Claude Code",
    tool_gemini: "Gemini",
    tool_workbuddy: "WorkBuddy",

    // ---------- Constants - Visual Intensity ----------
    intensity_minimal: "Minimal",
    intensity_balanced: "Balanced",
    intensity_expressive: "Expressive",

    // ---------- Constants - Content Density ----------
    density_light: "Light",
    density_standard: "Standard",
    density_dense: "Dense",

    // ---------- Constants - Product Categories ----------
    cat_saas: "SaaS Platform",
    cat_mobile: "Mobile App Landing",
    cat_ecommerce: "E-commerce",
    cat_portfolio: "Portfolio",
    cat_blog: "Blog / Editorial",
    cat_marketing: "Marketing Campaign",
    cat_dashboard: "Dashboard",
    cat_docs: "Documentation",
    cat_event: "Event Page",
    cat_other: "Other",

    // ---------- Constants - First Impressions ----------
    fi_professional: "Professional & Reliable",
    fi_professional_desc: "Communicates competence and trustworthiness",
    fi_futuristic: "Futuristic & Experimental",
    fi_futuristic_desc: "Signals innovation and cutting-edge technology",
    fi_calm: "Calm & Premium",
    fi_calm_desc: "Quiet luxury with refined aesthetics",
    fi_friendly: "Friendly & Intelligent",
    fi_friendly_desc: "Approachable yet sophisticated",
    fi_developer: "Sharp & Developer-focused",
    fi_developer_desc: "Technical credibility and precision",

    // ---------- Constants - Business Priority ----------
    bp_convert: "Convert Sign-ups",
    bp_convert_desc: "Drive user registration or purchase",
    bp_trust: "Build Trust & Credibility",
    bp_trust_desc: "Establish authority and reliability",
    bp_showcase: "Showcase Product Power",
    bp_showcase_desc: "Demonstrate features and capabilities",
    bp_impress: "Impress Interviewers/Investors",
    bp_impress_desc: "Portfolio and pitch presentations",
    bp_explain: "Explain Complex Features",
    bp_explain_desc: "Educational and explanatory content",

    // ---------- Constants - Visual Reference ----------
    vr_apple: "Apple-like Minimal",
    vr_apple_desc: "Clean, restrained, whitespace-forward",
    vr_linear: "Linear-like Structured",
    vr_linear_desc: "Systematic, information-dense, professional",
    vr_stripe: "Stripe-like Conversion",
    vr_stripe_desc: "Clear hierarchy, trust-building, persuasive",
    vr_vercel: "Vercel-like Developer Tool",
    vr_vercel_desc: "Technical, modern, dark mode capable",
    vr_original: "Original / No Reference",
    vr_original_desc: "Unique direction without obvious inspiration",

    // ---------- Constants - Avoid AI Styles ----------
    ai_gradient: "Excessive Blue-Purple Gradients",
    ai_gradient_desc: "Avoid glowing, neon-like color transitions",
    ai_glow: "Meaningless Glow Effects",
    ai_glow_desc: "Skip decorative blur and glow on every card",
    ai_centered: "Everything Perfectly Centered",
    ai_centered_desc: "Add asymmetric layouts for visual interest",
    ai_icons: "Icon Overload",
    ai_icons_desc: "Mix icon styles or reduce icon density",
    ai_copy: "Generic Copy & Buzzwords",
    ai_copy_desc: "Use specific, original product language",
    ai_no_product: "No Real Product Feel",
    ai_no_product_desc: "Show actual product UI, not stock placeholders",

    // ---------- Constants - Audience ----------
    aud_users: "Real Users",
    aud_users_desc: "End customers or consumers",
    aud_interviewers: "Interviewers",
    aud_interviewers_desc: "Hiring managers and recruiters",
    aud_investors: "Investors",
    aud_investors_desc: "VCs, angels, potential partners",
    aud_enterprise: "Enterprise Clients",
    aud_enterprise_desc: "B2B buyers and decision makers",
    aud_developers: "Developers",
    aud_developers_desc: "Technical audience, peers, contributors",

    // ---------- Constants - Desired Feelings ----------
    feel_trustworthy: "Trustworthy",
    feel_premium: "Premium",
    feel_innovative: "Innovative",
    feel_minimal: "Minimal",
    feel_friendly: "Friendly",
    feel_bold: "Bold",
    feel_calm: "Calm",
    feel_elegant: "Elegant",
    feel_dynamic: "Dynamic",
    feel_intelligent: "Intelligent",

    // ---------- Constants - Avoid Feelings ----------
    avoid_cheap: "Cheap",
    avoid_cluttered: "Cluttered",
    avoid_aggressive: "Aggressive",
    avoid_generic_ai: "Generic AI",
    avoid_template: "Template-like",
    avoid_overwhelming: "Overwhelming",
    avoid_confusing: "Confusing",
    avoid_dated: "Dated",
    avoid_inconsistent: "Inconsistent",

    // ---------- Constants - Pain Points ----------
    pain_ai_template: "Looks like AI-generated template",
    pain_hierarchy: "No clear visual hierarchy",
    pain_colors: "Colors feel random or messy",
    pain_typography: "Typography inconsistent",
    pain_spacing: "Spacing feels off",
    pain_animations: "Too many animations",
    pain_cta: "Unclear CTA or conversion path",
    pain_personality: "Missing brand personality",

    // ---------- Constants - Page Types ----------
    pt_saas: "SaaS Landing Page",
    pt_portfolio: "Portfolio",
    pt_ecommerce: "E-commerce Product Page",
    pt_dashboard: "Dashboard / Admin",
    pt_blog: "Blog Post",
    pt_mobile: "Mobile App Landing",
    pt_docs: "Documentation",
    pt_other: "Other",

    // ---------- Constants - Pattern Categories ----------
    pattern_all: "All",
    pattern_layout: "Layout",
    pattern_color: "Color",
    pattern_typography: "Typography",
    pattern_interaction: "Interaction",
  },

  zh: {
    // ---------- Nav ----------
    nav_brand: "Vibe Translator",
    nav_home: "首页",
    nav_workspace: "工作台",
    nav_patterns: "模式库",
    nav_settings: "设置",
    nav_back: "返回",

    // ---------- Language Toggle ----------
    lang_toggle: "EN / 中文",

    // ---------- Home Page ----------
    home_badge: "面向 AI 编程的设计决策 SaaS",
    home_title_1: "将你的直觉感受转化为",
    home_title_2: "可执行的前端提示词",
    home_description:
      "不再与 AI 反复拉扯。描述你的设计愿景，获取精选方向，并为 Codex、Claude Code、Gemini 和 WorkBuddy 生成专属提示词。",
    home_subtitle: "无需注册 · 不连接 AI API · 无外部数据存储",
    home_how_label: "工作原理",
    home_how_title: "三条路径，通往更好的设计",
    home_step1_title: "描述你的愿景",
    home_step1_desc: "告诉 AI 你想要什么——或想避免什么。将模糊的感受转化为具体的设计规范。",
    home_step2_title: "选择设计方向",
    home_step2_desc: "从精选设计方向中选择契合目标的方向。每个方向都附带完整的执行策略。",
    home_step3_title: "获取可操作提示词",
    home_step3_desc: "生成工具专属提示词，含验收标准、反 AI 模板检查清单和分步指导。",
    home_supports: "支持生成以下工具的提示词",
    home_footer: "Vibe Design Translator — Phase 1 MVP。工程原型，非生产就绪。",
    home_footer_patterns: "设计模式",
    home_footer_settings: "设置",
    home_footer_pricing: "定价",

    // ---------- Brief Page ----------
    brief_loading: "加载中...",
    brief_back: "返回首页",
    brief_step_label: "第 1 步 / 共 3 步",
    brief_title: "设计简报",
    brief_subtitle:
      "告诉我们你的产品和设计目标。提供的细节越多，推荐的设计方向就越精准。",

    // ---------- Brief Form ----------
    brief_form_badge_1: "快速方向定位器",
    brief_form_badge_2: "设计决策工坊",
    brief_form_heading: "你在构建什么？",
    brief_form_subheading: "告诉我们你的设计愿景",
    brief_form_desc1: "回答几个问题，我们会为你推荐合适的设计方向。",
    brief_form_desc2: "我们将把抽象感受转化为具体的设计规范。",
    brief_form_product_label: "你在构建什么？",
    brief_form_product_placeholder: "例如：面向 API 文档的开发者工具",
    brief_form_category_label: "产品类别",
    brief_form_category_placeholder: "选择一个类别",
    brief_form_users_label: "为谁而做？",
    brief_form_users_placeholder: "例如：构建 REST API 的开发者",
    brief_form_impression_label: "第一印象 — 用户 3 秒内应该感受到什么？",
    brief_form_impression_helper: "选择你希望唤起的情感反应",
    brief_form_selected: "已选择",
    brief_form_priority_label: "业务优先级 — 什么最重要？",
    brief_form_priority_helper: "帮助我们为你的目标优化设计",
    brief_form_visual_label: "视觉参考 — 哪种审美方向引起共鸣？",
    brief_form_visual_helper: "抽象审美倾向（不是抄袭，只是寻找方向）",
    brief_form_avoid_label: "你想避免哪些 AI 页面问题？",
    brief_form_avoid_helper: "选择你最想预防的问题",
    brief_form_audience_label: "主要受众 — 谁需要被打动？",
    brief_form_goal_label: "页面目标 — 这个页面要完成什么？",
    brief_form_goal_placeholder:
      "例如：推动内测注册，解释 API-first 理念，说服开发者试用产品",
    brief_form_feeling_label: "期望感受 — 唤起的情感",
    brief_form_feeling_helper: "选择你的页面应唤起的情感",
    brief_form_avoid_feeling_label: "想避免 — 不想要的风格",
    brief_form_avoid_feeling_helper: "选择你绝对不想要的风格",
    brief_form_cta_label: "主要行动号召",
    brief_form_cta_placeholder: "例如：免费试用、抢先体验、预约演示",
    brief_form_intensity_label: "视觉强度",
    brief_form_density_label: "内容密度",
    brief_form_tool_label: "输出工具 — 你将使用哪个 AI 工具？",
    brief_form_submit: "寻找我的方向",
    brief_form_submit_alt: "生成设计方向",
    brief_form_product_default: "我的产品",

    // ---------- Directions Page ----------
    directions_loading: "加载中...",
    directions_back: "返回简报",
    directions_step_label: "第 2 步 / 共 3 步",
    directions_title: "设计方向",
    directions_subtitle:
      "选择契合你愿景的设计方向。每个方向都附带完整的策略与视觉系统。",
    directions_generate: "生成执行包",

    // ---------- Pack Page ----------
    pack_loading: "正在生成执行包...",
    pack_back: "返回方向",
    pack_step_label: "第 3 步 / 共 3 步",
    pack_title: "你的设计执行包",
    pack_subtitle: "查看执行包并复制你首选工具的提示词。",
    pack_direction_suffix: " 方向",
    pack_view_all: "查看所有提示词",
    pack_start_new: "重新开始",

    // ---------- Compiler Page ----------
    compiler_empty: "未找到设计简报。请从首页开始。",
    compiler_go_home: "前往首页",
    compiler_tag: "提示词编译器",
    compiler_title: "工具专属提示词",

    // ---------- Patterns Page ----------
    patterns_tag: "设计模式库",
    patterns_title: "模式库",
    patterns_subtitle:
      "12 种原创设计模式，附带抽象信号与实现指导。不含第三方素材。",
    patterns_search: "搜索模式...",
    patterns_empty: "未找到匹配搜索的模式。",
    patterns_disclaimer_title: "设计模式声明",
    patterns_disclaimer_desc:
      "本库仅包含抽象设计信号与原创实现指导。不存储或引用第三方截图、Logo 或商标材料。所有模式旨在帮助你避免通用 AI 生成的界面，同时保持原创性。",

    // ---------- Pricing Page ----------
    pricing_tag: "定价",
    pricing_title: "简单透明的定价",
    pricing_subtitle: "选择适合你设计工作流的方案。所有方案均支持本地持久化存储。",
    pricing_free: "免费版",
    pricing_free_desc: "开始使用基础设计方向生成功能。",
    pricing_free_price: "$0",
    pricing_free_period: "永久",
    pricing_pro: "专业版",
    pricing_pro_desc: "适合希望完整使用设计决策工具的个人用户。",
    pricing_pro_price: "$19",
    pricing_pro_period: "/ 月",
    pricing_team: "团队版",
    pricing_team_desc: "适合需要共享设计记忆和品牌一致性的团队。",
    pricing_team_price: "$49",
    pricing_team_period: "/ 月 / 席位",
    pricing_popular: "最受欢迎",
    pricing_btn_free: "开始使用",
    pricing_btn_paid: "即将推出",
    pricing_note_label: "Phase 1 MVP — 暂无真实支付集成",
    pricing_note_desc:
      "这是工程原型。真实定价和支付将在 Phase 5 添加。目前所有功能在测试期间免费开放。",

    // ---------- Settings Page ----------
    settings_confirm_clear: "确定要清除所有数据吗？此操作不可撤销。",
    settings_tag: "设置与数据",
    settings_title: "设置",
    settings_subtitle: "管理已保存的数据、历史记录和偏好设置。",
    settings_state_title: "当前状态",
    settings_brief_label: "设计简报",
    settings_brief_empty: "未保存简报",
    settings_direction_label: "已选方向",
    settings_direction_empty: "未选择方向",
    settings_tool_label: "首选工具",
    settings_data_title: "数据管理",
    settings_export: "导出数据 (JSON)",
    settings_clear_history: "仅清除历史",
    settings_clear_all: "清除所有数据",
    settings_about_title: "关于数据存储",
    settings_about_desc:
      "所有数据使用浏览器 localStorage 本地存储。不会发送到任何外部服务器。清除浏览器数据将删除所有已保存信息。",
    settings_tech_title: "技术信息",
    settings_tech_storage: "存储方式",
    settings_tech_storage_val: "localStorage（浏览器）",
    settings_tech_api: "AI API",
    settings_tech_api_val: "未连接（Phase 1）",
    settings_tech_db: "数据库",
    settings_tech_db_val: "无（Phase 1）",
    settings_tech_phase: "阶段",
    settings_tech_phase_val: "MVP 工程原型",

    // ---------- Workspace Page ----------
    workspace_tag: "工作台",
    workspace_title: "项目工作台",
    workspace_subtitle: "管理你的设计项目与诊断记录",
    workspace_new: "新建项目",
    workspace_new_title: "新建项目",
    workspace_name_label: "项目名称",
    workspace_name_placeholder: "例如：我的产品落地页",
    workspace_type_label: "项目类型",
    workspace_cancel: "取消",
    workspace_create: "创建",
    workspace_empty_title: "暂无项目",
    workspace_empty_desc:
      "点击「新建项目」开始创建你的第一个设计项目，或者先从 Brief 页面创建。",
    workspace_empty_action: "新建项目",
    workspace_current: "当前",
    workspace_diagnose_count: "诊断 {n} 次",
    workspace_export_count: "导出 {n} 次",
    workspace_rename: "重命名",
    workspace_duplicate: "复制项目",
    workspace_export_json: "导出 JSON",
    workspace_export_md: "导出 Markdown",
    workspace_delete: "删除项目",
    workspace_delete_confirm: "确定要删除此项目吗？此操作不可撤销。",

    // ---------- Diagnosis Page ----------
    diagnosis_tag: "诊断工具",
    diagnosis_title: "设计诊断",
    diagnosis_subtitle: "识别当前页面问题，获取可操作的优化提示词。",
    diagnosis_fail_title: "诊断失败",
    diagnosis_fail_desc: "诊断页面时发生错误。",
    diagnosis_retry: "返回重试",
    diagnosis_upload_title: "上传截图（可选）",
    diagnosis_upload_desc:
      "上传你的页面截图，帮助诊断系统更好地分析问题（当前为本地预览，未上传到云端）。",
    diagnosis_tip: "提示：此诊断结果不会自动保存。",
    diagnosis_go_workspace: "前往工作台创建项目",
    diagnosis_tip_suffix: "，以便保存诊断记录。",
    diagnosis_error_fail: "诊断请求失败",
    diagnosis_error_unknown: "发生未知错误",
    diagnosis_error_label: "诊断错误：",

    // ---------- Diagnosis Form ----------
    diagnosis_form_page_type: "页面类型",
    diagnosis_form_page_type_placeholder: "选择页面类型",
    diagnosis_form_desc_label: "页面描述",
    diagnosis_form_desc_placeholder: "描述你当前的页面。它是做什么的？包含什么内容？",
    diagnosis_form_pain_label: "主要痛点",
    diagnosis_form_pain_helper: "可多选",
    diagnosis_form_submit_loading: "分析中...",
    diagnosis_form_submit: "运行诊断",

    // ---------- Diagnosis Report ----------
    diagnosis_report_overall: "综合",
    diagnosis_report_score_good: "你的页面基础扎实，仍有改进空间。",
    diagnosis_report_score_medium: "你的页面显示出通用设计的迹象。建议参考下方的修复方案。",
    diagnosis_report_score_bad: "你的页面看起来像 AI 生成的模板。建议尽快重新设计。",
    diagnosis_report_provider: "提供方",
    diagnosis_report_provider_val: "Mock（本地）",
    diagnosis_report_mode: "降级到 Mock",
    diagnosis_report_tokens: "Token 用量",
    diagnosis_report_cost: "预估费用",
    diagnosis_report_breakdown: "评分详情",
    diagnosis_report_findings: "关键发现",
    diagnosis_report_fixes: "建议修复",
    diagnosis_report_prompt_title: "{tool} 重构提示词",
    diagnosis_report_another: "诊断另一个页面",
    diagnosis_report_fresh: "重新开始",

    // ---------- Direction Card ----------
    direction_card_best: "最适合",
    direction_card_color: "色彩基调",
    direction_card_psych: "心理效应：{effect}",

    // ---------- Liquid Button ----------
    button_loading: "加载中...",

    // ---------- Constants - Tool Labels ----------
    tool_codex: "Codex",
    tool_claude_code: "Claude Code",
    tool_gemini: "Gemini",
    tool_workbuddy: "WorkBuddy",

    // ---------- Constants - Visual Intensity ----------
    intensity_minimal: "极简",
    intensity_balanced: "均衡",
    intensity_expressive: "表现力强",

    // ---------- Constants - Content Density ----------
    density_light: "轻量",
    density_standard: "标准",
    density_dense: "密集",

    // ---------- Constants - Product Categories ----------
    cat_saas: "SaaS 平台",
    cat_mobile: "移动应用落地页",
    cat_ecommerce: "电商",
    cat_portfolio: "作品集",
    cat_blog: "博客 / 编辑",
    cat_marketing: "营销活动",
    cat_dashboard: "仪表盘",
    cat_docs: "文档",
    cat_event: "活动页面",
    cat_other: "其他",

    // ---------- Constants - First Impressions ----------
    fi_professional: "专业可靠",
    fi_professional_desc: "传达能力与信任感",
    fi_futuristic: "未来感与实验性",
    fi_futuristic_desc: "传达创新与前沿技术感",
    fi_calm: "沉稳高级",
    fi_calm_desc: "低调奢华，精致审美",
    fi_friendly: "友好智能",
    fi_friendly_desc: "平易近人但不失精致",
    fi_developer: "锐利 · 开发者导向",
    fi_developer_desc: "技术可信度与精确感",

    // ---------- Constants - Business Priority ----------
    bp_convert: "转化注册",
    bp_convert_desc: "推动用户注册或购买",
    bp_trust: "建立信任与可信度",
    bp_trust_desc: "建立权威与可靠性",
    bp_showcase: "展示产品实力",
    bp_showcase_desc: "展示功能与能力",
    bp_impress: "打动面试官 / 投资人",
    bp_impress_desc: "作品集与路演演示",
    bp_explain: "解释复杂功能",
    bp_explain_desc: "教育与解释性内容",

    // ---------- Constants - Visual Reference ----------
    vr_apple: "类 Apple 极简",
    vr_apple_desc: "干净克制，留白为主",
    vr_linear: "类 Linear 结构化",
    vr_linear_desc: "系统化，信息密度高，专业",
    vr_stripe: "类 Stripe 转化导向",
    vr_stripe_desc: "层级清晰，建立信任，有说服力",
    vr_vercel: "类 Vercel 开发者工具",
    vr_vercel_desc: "技术感，现代，支持暗色模式",
    vr_original: "原创 / 无参考",
    vr_original_desc: "独特方向，无明显借鉴",

    // ---------- Constants - Avoid AI Styles ----------
    ai_gradient: "过度蓝紫渐变",
    ai_gradient_desc: "避免发光霓虹感的色彩过渡",
    ai_glow: "无意义的发光效果",
    ai_glow_desc: "跳过每个卡片上的装饰性模糊和发光",
    ai_centered: "一切都完美居中",
    ai_centered_desc: "增加不对称布局提升视觉趣味",
    ai_icons: "图标过载",
    ai_icons_desc: "混合图标风格或降低图标密度",
    ai_copy: "通用文案与热词堆砌",
    ai_copy_desc: "使用具体、原创的产品语言",
    ai_no_product: "没有真实产品感",
    ai_no_product_desc: "展示真实产品界面，而非占位符",

    // ---------- Constants - Audience ----------
    aud_users: "真实用户",
    aud_users_desc: "终端客户或消费者",
    aud_interviewers: "面试官",
    aud_interviewers_desc: "招聘经理与 HR",
    aud_investors: "投资人",
    aud_investors_desc: "VC、天使投资人、潜在合作伙伴",
    aud_enterprise: "企业客户",
    aud_enterprise_desc: "B2B 买家与决策者",
    aud_developers: "开发者",
    aud_developers_desc: "技术受众、同行、贡献者",

    // ---------- Constants - Desired Feelings ----------
    feel_trustworthy: "可信",
    feel_premium: "高级",
    feel_innovative: "创新",
    feel_minimal: "极简",
    feel_friendly: "友好",
    feel_bold: "大胆",
    feel_calm: "沉稳",
    feel_elegant: "优雅",
    feel_dynamic: "动感",
    feel_intelligent: "智能",

    // ---------- Constants - Avoid Feelings ----------
    avoid_cheap: "廉价",
    avoid_cluttered: "杂乱",
    avoid_aggressive: "激进",
    avoid_generic_ai: "通用 AI 感",
    avoid_template: "模板化",
    avoid_overwhelming: "信息过载",
    avoid_confusing: "令人困惑",
    avoid_dated: "过时",
    avoid_inconsistent: "不一致",

    // ---------- Constants - Pain Points ----------
    pain_ai_template: "看起来像 AI 生成的模板",
    pain_hierarchy: "没有清晰的视觉层级",
    pain_colors: "颜色随机或混乱",
    pain_typography: "排版不一致",
    pain_spacing: "间距不协调",
    pain_animations: "动画过多",
    pain_cta: "CTA 或转化路径不清晰",
    pain_personality: "缺少品牌个性",

    // ---------- Constants - Page Types ----------
    pt_saas: "SaaS 落地页",
    pt_portfolio: "作品集",
    pt_ecommerce: "电商产品页",
    pt_dashboard: "仪表盘 / 管理后台",
    pt_blog: "博客文章",
    pt_mobile: "移动应用落地页",
    pt_docs: "文档",
    pt_other: "其他",

    // ---------- Constants - Pattern Categories ----------
    pattern_all: "全部",
    pattern_layout: "布局",
    pattern_color: "色彩",
    pattern_typography: "排版",
    pattern_interaction: "交互",
  },
};

// Helper: get translation for a given key
export function t(key: string, locale: Locale): string {
  return translations[locale]?.[key] ?? translations.en?.[key] ?? key;
}

// Helper: replace placeholders like {n}, {tool}, {effect}
export function tVar(key: string, locale: Locale, vars: Record<string, string | number>): string {
  let result = t(key, locale);
  for (const [k, v] of Object.entries(vars)) {
    result = result.replace(`{${k}}`, String(v));
  }
  return result;
}

// ============================================================
// Vibe Design Translator - English Dictionary
// ============================================================

import { I18nDictionary } from "./types";

export const en: I18nDictionary = {
  // ---------- Navigation ----------
  nav: {
    brand: "Vibe Translator",
    home: "Home",
    workspace: "Workspace",
    patterns: "Patterns",
    agent_runs: "Agent Runs",
    settings: "Settings",
    back: "Back",
    language_toggle: "ZH | English",
  },

  // ---------- Common ----------
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    export: "Export",
    import: "Import",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    reset: "Reset",
    submit: "Submit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    retry: "Retry",
    refresh: "Refresh",
    more: "More",
    less: "Less",
    show: "Show",
    hide: "Hide",
    enable: "Enable",
    disable: "Disable",
    on: "On",
    off: "Off",
    yes: "Yes",
    no: "No",
    ok: "OK",
    apply: "Apply",
    preview: "Preview",
    download: "Download",
    upload: "Upload",
    select: "Select",
    selected: "Selected",
    none: "None",
    empty: "No data",
    no_results: "No results",
    coming_soon: "Coming Soon",
    beta: "Beta",
    stable: "Stable",
    version: "Version",
    phase: "Phase",
    step: "Step",
    of: "of",
  },

  // ---------- Home Page ----------
  home: {
    badge: "Design Decision SaaS for AI Coding",
    title_1: "Translate your vibe into",
    title_2: "executable prompts",
    description: "Stop fighting with AI to get the design you want. Describe your vision, get curated directions, and generate tool-specific prompts for Codex, Claude Code, Gemini, and WorkBuddy.",
    subtitle: "No sign-up required. No AI API connected. No data stored externally.",
    how_label: "How it works",
    how_title: "Three paths to better design",
    step1_title: "Describe your vision",
    step1_desc: "Tell us what you want—or what you want to avoid. We'll translate vague feelings into concrete design specs.",
    step2_title: "Choose a direction",
    step2_desc: "Pick from curated design directions that match your goals. Each comes with a complete execution strategy.",
    step3_title: "Get actionable prompts",
    step3_desc: "Generate tool-specific prompts with acceptance criteria, anti-AI-look checklists, and step-by-step guidance.",
    supports: "Supports prompts for",
    footer: "Vibe Design Translator — Phase 6. Global i18n + Visual Material System.",
    footer_patterns: "Design Patterns",
    footer_settings: "Settings",
    footer_pricing: "Pricing",
  },

  // ---------- Brief Page ----------
  brief: {
    loading: "Loading...",
    back: "Back to home",
    step_label: "Step 1 of 3",
    title: "Design Brief",
    subtitle: "Tell us about your product and design goals. The more detail you provide, the better the design direction we can suggest.",
    form_badge_1: "Quick Direction Finder",
    form_badge_2: "Design Decision Workshop",
    form_heading: "What are you building?",
    form_subheading: "Tell us about your vision",
    form_desc1: "Answer a few questions and we'll suggest a design direction.",
    form_desc2: "We'll translate your feelings into concrete design specifications.",
    form_product_label: "What are you building?",
    form_product_placeholder: "e.g., A developer tool for API documentation",
    form_category_label: "Product Category",
    form_category_placeholder: "Select a category",
    form_users_label: "Who is this for?",
    form_users_placeholder: "e.g., Developers building REST APIs",
    form_impression_label: "First Impression — What should users feel within 3 seconds?",
    form_impression_helper: "Choose the emotional response you want to evoke",
    form_selected: "Selected",
    form_priority_label: "Business Priority — What's most important?",
    form_priority_helper: "This helps us optimize the design for your goals",
    form_visual_label: "Visual Reference — Which aesthetic direction resonates?",
    form_visual_helper: "Abstract aesthetic tendencies (we're not copying, just finding direction)",
    form_avoid_label: "What AI page problems do you want to avoid?",
    form_avoid_helper: "Select the issues you most want to prevent",
    form_audience_label: "Primary Audience — Who needs to be impressed?",
    form_goal_label: "Page Goal — What should this page accomplish?",
    form_goal_placeholder: "e.g., Drive sign-ups for the beta launch, explain the API-first approach, convince developers to try the product",
    form_feeling_label: "Desired Feeling — Emotions to evoke",
    form_feeling_helper: "Select the emotions your page should evoke",
    form_avoid_feeling_label: "What to Avoid — Styles you want to prevent",
    form_avoid_feeling_helper: "Select what you definitely do NOT want",
    form_cta_label: "Primary Call-to-Action",
    form_cta_placeholder: "e.g., Start Free Trial, Get Early Access, Book Demo",
    form_intensity_label: "Visual Intensity",
    form_density_label: "Content Density",
    form_tool_label: "Output Tool — Which AI tool will you use?",
    form_submit: "Find My Direction",
    form_submit_alt: "Generate Design Directions",
    form_product_default: "My Product",
  },

  // ---------- Directions Page ----------
  directions: {
    loading: "Loading...",
    back: "Back to brief",
    step_label: "Step 2 of 3",
    title: "Design Direction",
    subtitle: "Choose a design direction that matches your vision. Each direction comes with a complete strategy and visual system.",
    generate: "Generate Pack",
    recommend: "Recommended",
    best_for: "Best for",
    color_mood: "Color mood",
    psychological_effect: "Psychological effect",
    risks: "Risks",
    select_direction: "Select this direction",
    selected_direction: "Selected",
  },

  // ---------- Pack Page ----------
  pack: {
    loading: "Generating your execution pack...",
    back: "Back to directions",
    step_label: "Step 3 of 3",
    title: "Your Design Execution Pack",
    subtitle: "Review your execution pack and copy the prompt for your preferred tool.",
    direction_suffix: " direction",
    view_all: "View All Prompts",
    start_new: "Start New",
    strategy: "Design Strategy",
    page_structure: "Page Structure",
    visual_system: "Visual System",
    interaction_system: "Interaction System",
    acceptance_criteria: "Acceptance Criteria",
    anti_ai_checklist: "Anti-AI-Look Checklist",
    color_system: "Color System",
    layout_thumbnail: "Layout Thumbnail",
    interaction_flow: "Interaction Flow",
    prompt_structure: "Prompt Structure",
  },

  // ---------- Compiler Page ----------
  compiler: {
    empty: "No design brief found. Start from the home page.",
    go_home: "Go to Home",
    tag: "Prompt Compiler",
    title: "Tool-Specific Prompts",
    no_brief: "No design brief found. Start from the home page.",
    step_label: "Prompt Compiler",
    subtitle: "Tool-Specific Prompts",
    copy_prompt: "Copy Prompt",
    prompt_language: "Prompt Language",
    chinese_prompt: "Chinese Prompt",
    english_prompt: "English Prompt",
  },

  // ---------- Diagnosis Page ----------
  diagnosis: {
    tag: "Diagnosis Tool",
    title: "Design Diagnosis",
    subtitle: "Identify issues with your current page and get actionable refactor prompts.",
    fail_title: "Diagnosis Failed",
    fail_desc: "An error occurred while diagnosing your page.",
    retry: "Back and Retry",
    upload_title: "Upload Screenshot (Optional)",
    upload_desc: "Upload a screenshot of your page to help the diagnosis system better analyze issues (local preview only, not uploaded to cloud).",
    tip: "Tip: This diagnosis result will not be saved automatically.",
    go_workspace: "Go to Workspace to create a project",
    tip_suffix: " to save diagnosis records.",
    error_fail: "Diagnosis request failed",
    error_unknown: "Unknown error occurred",
    error_label: "Diagnosis error:",
    form_page_type: "Page Type",
    form_page_type_placeholder: "Select page type",
    form_desc_label: "Page Description",
    form_desc_placeholder: "Describe your current page. What is it for? What does it contain?",
    form_pain_label: "Primary Pain Points",
    form_pain_helper: "Select all that apply",
    form_submit_loading: "Analyzing...",
    form_submit: "Run Diagnosis",
    report_overall: "Overall",
    report_score_good: "Your page has a solid foundation with some room for improvement.",
    report_score_medium: "Your page shows signs of generic design. Consider the fixes below.",
    report_score_bad: "Your page likely looks like an AI-generated template. Urgent redesign recommended.",
    report_provider: "Provider",
    report_provider_val: "Mock (Local)",
    report_mode: "Fallback to Mock",
    report_tokens: "Tokens Used",
    report_cost: "Est. Cost",
    report_breakdown: "Score Breakdown",
    report_findings: "Key Findings",
    report_fixes: "Recommended Fixes",
    report_prompt_title: "Refactor Prompt",
    report_another: "Diagnose Another Page",
    report_fresh: "Start Fresh",
    before: "Before",
    after: "After",
    score_radar: "Score Radar",
    fix_strategy: "Fix Strategy",
  },

  // ---------- Patterns Page ----------
  patterns: {
    tag: "Design Patterns Library",
    title: "Pattern Library",
    subtitle: "12 original design patterns with abstract signals and implementation guidance. No third-party assets.",
    search: "Search patterns...",
    empty: "No patterns found matching your search.",
    disclaimer_title: "Design Pattern Disclaimer",
    disclaimer_desc: "This library contains abstract design signals and original implementation guidance only. No third-party screenshots, logos, or trademarked materials are stored or referenced. All patterns are designed to help you avoid generic AI-generated UI while maintaining originality.",
    category_all: "All",
    category_layout: "Layout",
    category_interaction: "Interaction",
    category_visual: "Visual Style",
    category_diagnosis: "Diagnosis",
    category_prompt: "Prompt",
    composition_title: "How to Combine",
    composition_desc: "Choose the right pattern combination to create a professional design page.",
    suitable_for: "Suitable for",
    avoid: "Avoid",
    prompt_snippet: "Prompt Snippet",
  },

  // ---------- Workspace Page ----------
  workspace: {
    tag: "Workspace",
    title: "Workspace",
    subtitle: "Manage your design projects and diagnosis records.",
    new: "New Project",
    new_title: "New Project",
    name_label: "Project Name",
    name_placeholder: "e.g., My product landing page",
    type_label: "Project Type",
    cancel: "Cancel",
    create: "Create",
    empty_title: "No projects yet",
    empty_desc: "Click \"New Project\" to create your first design project, or start from the Brief page.",
    empty_action: "New Project",
    current: "Current",
    diagnose_count: "Diagnosed {n} time(s)",
    export_count: "Exported {n} time(s)",
    rename: "Rename",
    duplicate: "Duplicate Project",
    export_json: "Export JSON",
    export_md: "Export Markdown",
    delete: "Delete Project",
    delete_confirm: "Are you sure you want to delete this project? This action cannot be undone.",
    progress_map: "Project Progress",
    status_brief: "Brief",
    status_direction: "Direction",
    status_pack: "Pack",
    status_prompt: "Prompt",
    status_diagnosis: "Diagnosis",
    recent_agent_run: "Recent Agent Run",
    agent_status: "Status",
    agent_progress: "Progress",
  },

  // ---------- Pricing Page ----------
  pricing: {
    tag: "Pricing",
    title: "Simple, transparent pricing",
    subtitle: "Choose the plan that fits your design workflow. All plans include localStorage persistence.",
    free: "Free",
    free_desc: "Get started with basic design direction generation.",
    free_price: "$0",
    free_period: "forever",
    pro: "Pro",
    pro_desc: "For individuals who want full access to design decision tools.",
    pro_price: "$19",
    pro_period: "/ month",
    team: "Team",
    team_desc: "For teams that need shared design memory and brand consistency.",
    team_price: "$49",
    team_period: "/ month per seat",
    popular: "Most Popular",
    btn_free: "Get Started",
    btn_paid: "Coming Soon",
    note_label: "Phase 6 — Global i18n + Visual Material System",
    note_desc: "This is an engineering prototype. Real pricing and payment will be added in later phases. For now, all features are available for free during the testing period.",
    feat_basic_direction: "Basic direction generator",
    feat_3_exports: "3 prompt exports / month",
    feat_unlimited_exports: "Unlimited prompt exports",
    feat_all_tools: "All AI tool support",
    feat_local_storage: "localStorage persistence",
    feat_full_library: "Full pattern library",
    feat_export_json: "Export as JSON / Markdown",
    feat_priority_support: "Priority support",
    feat_shared_memory: "Shared design memory",
    feat_brand_consistency: "Brand consistency tools",
    feat_team_analytics: "Team analytics",
  },

  // ---------- Settings Page ----------
  settings: {
    confirm_clear: "Are you sure you want to clear all data? This action cannot be undone.",
    tag: "Settings & Data",
    title: "Settings",
    subtitle: "Manage your saved data, history, and preferences.",
    state_title: "Current State",
    brief_label: "Design Brief",
    brief_empty: "No brief saved",
    direction_label: "Selected Direction",
    direction_empty: "No direction selected",
    tool_label: "Preferred Tool",
    data_title: "Data Management",
    export: "Export Data as JSON",
    clear_history: "Clear History Only",
    clear_all: "Clear All Data",
    about_title: "About Data Storage",
    about_desc: "All data is stored locally in your browser using localStorage. No data is sent to any external server. Clearing your browser data will remove all saved information.",
    tech_title: "Technical Info",
    tech_storage: "Storage",
    tech_storage_val: "localStorage (browser)",
    tech_api: "AI API",
    tech_api_val: "Connected",
    tech_db: "Database",
    tech_db_val: "None (Phase 6)",
    tech_phase: "Phase",
    tech_phase_val: "Phase 6 — Global i18n + Visual Material System",
    language_title: "Language Settings",
    language_label: "Interface Language",
    language_zh: "中文",
    language_en: "English",
    prompt_language_label: "Prompt Output Language",
    prompt_language_desc: "Choose the language for generated prompts",
  },

  // ---------- Agent Runs ----------
  agent: {
    tag: "Agent Runs",
    title: "Agent Runs",
    subtitle: "View and manage Agent execution records.",
    empty: "No Agent runs yet",
    status: "Status",
    progress: "Progress",
    events: "Events",
    steps: "Steps",
    started_at: "Started at",
    completed_at: "Completed at",
    duration: "Duration",
    error: "Error",
    retry: "Retry",
    cancel: "Cancel",
  },

  // ---------- Prompts ----------
  prompts: {
    role: "Role",
    goal: "Goal",
    visual_direction: "Visual Direction",
    tasks: "Tasks",
    constraints: "Constraints",
    acceptance_criteria: "Acceptance Criteria",
    do_not: "Do Not",
    codex_version: "Codex Version",
    step_0: "Check project structure",
    step_20: "Establish visual system",
    step_40: "Implement core components",
    step_60: "Complete responsive & interactions",
    step_80: "Self-check and fix issues",
    step_100: "Output modification summary",
  },

  // ---------- Options (label + description) ----------
  options: {
    // First Impression
    "fi_professional-reliable": {
      label: "Professional & Reliable",
      description: "Communicates competence and trustworthiness"
    },
    "fi_futuristic-experimental": {
      label: "Futuristic & Experimental",
      description: "Signals innovation and cutting-edge technology"
    },
    "fi_calm-premium": {
      label: "Calm & Premium",
      description: "Quiet luxury with refined aesthetics"
    },
    "fi_friendly-intelligent": {
      label: "Friendly & Intelligent",
      description: "Approachable yet sophisticated"
    },
    "fi_developer-focused": {
      label: "Sharp & Developer-focused",
      description: "Technical credibility and precision"
    },

    // Business Priority
    "bp_convert-signup": {
      label: "Convert Sign-ups",
      description: "Drive user registration or purchase"
    },
    "bp_build-trust": {
      label: "Build Trust & Credibility",
      description: "Establish authority and reliability"
    },
    "bp_show-capability": {
      label: "Showcase Product Power",
      description: "Demonstrate features and capabilities"
    },
    "bp_impress-investor": {
      label: "Impress Interviewers/Investors",
      description: "Portfolio and pitch presentations"
    },
    "bp_explain-complexity": {
      label: "Explain Complex Features",
      description: "Educational and explanatory content"
    },

    // Visual Reference
    "vr_apple-minimal": {
      label: "Apple-like Minimal",
      description: "Clean, restrained, whitespace-forward"
    },
    "vr_linear-structured": {
      label: "Linear-like Structured",
      description: "Systematic, information-dense, professional"
    },
    "vr_stripe-conversion": {
      label: "Stripe-like Conversion",
      description: "Clear hierarchy, trust-building, persuasive"
    },
    "vr_vercel-developer": {
      label: "Vercel-like Developer Tool",
      description: "Technical, modern, dark mode capable"
    },
    "vr_original": {
      label: "Original / No Reference",
      description: "Unique direction without obvious inspiration"
    },

    // Avoided AI Smell
    "ai_blue-purple-gradient": {
      label: "Excessive Blue-Purple Gradients",
      description: "Avoid glowing, neon-like color transitions"
    },
    "ai_meaningless-glow": {
      label: "Meaningless Glow Effects",
      description: "Skip decorative blur and glow on every card"
    },
    "ai_centered-everything": {
      label: "Everything Perfectly Centered",
      description: "Add asymmetric layouts for visual interest"
    },
    "ai_icon-overload": {
      label: "Icon Overload",
      description: "Mix icon styles or reduce icon density"
    },
    "ai_vague-copy": {
      label: "Generic Copy & Buzzwords",
      description: "Use specific, original product language"
    },
    "ai_glass-overuse": {
      label: "Glass Effect Overuse",
      description: "Use frosted glass effects sparingly"
    },
    "ai_no-visual-rhythm": {
      label: "No Visual Rhythm",
      description: "Establish clear visual hierarchy and rhythm"
    },
    "ai_weak-cta": {
      label: "Weak CTA",
      description: "Strengthen the visual weight of call-to-action"
    },

    // Audience
    "aud_real-users": {
      label: "Real Users",
      description: "End customers or consumers"
    },
    "aud_interviewers": {
      label: "Interviewers",
      description: "Hiring managers and recruiters"
    },
    "aud_investors": {
      label: "Investors",
      description: "VCs, angels, potential partners"
    },
    "aud_enterprise-clients": {
      label: "Enterprise Clients",
      description: "B2B buyers and decision makers"
    },
    "aud_developers": {
      label: "Developers",
      description: "Technical audience, peers, contributors"
    },

    // Visual Intensity
    "intensity_minimal": {
      label: "Minimal",
      description: "Least visual elements"
    },
    "intensity_balanced": {
      label: "Balanced",
      description: "Balanced visual presentation"
    },
    "intensity_expressive": {
      label: "Expressive",
      description: "Rich visual elements"
    },

    // Content Density
    "density_light": {
      label: "Light",
      description: "Lots of whitespace, concise info"
    },
    "density_standard": {
      label: "Standard",
      description: "Balanced information density"
    },
    "density_dense": {
      label: "Dense",
      description: "Information-rich, compact layout"
    },

    // Product Categories
    "cat_saas": {
      label: "SaaS Platform",
      description: "Cloud software service"
    },
    "cat_mobile": {
      label: "Mobile App Landing",
      description: "App promotion page"
    },
    "cat_ecommerce": {
      label: "E-commerce",
      description: "Online store"
    },
    "cat_portfolio": {
      label: "Portfolio",
      description: "Personal or team showcase"
    },
    "cat_blog": {
      label: "Blog / Editorial",
      description: "Content publishing platform"
    },
    "cat_marketing": {
      label: "Marketing Campaign",
      description: "Promotion and marketing"
    },
    "cat_dashboard": {
      label: "Dashboard",
      description: "Data visualization admin"
    },
    "cat_docs": {
      label: "Documentation",
      description: "Technical docs and help center"
    },
    "cat_event": {
      label: "Event Page",
      description: "Conference and event promotion"
    },
    "cat_other": {
      label: "Other",
      description: "Other types"
    },

    // Desired Feelings
    "feel_trustworthy": { label: "Trustworthy" },
    "feel_premium": { label: "Premium" },
    "feel_innovative": { label: "Innovative" },
    "feel_minimal": { label: "Minimal" },
    "feel_friendly": { label: "Friendly" },
    "feel_bold": { label: "Bold" },
    "feel_calm": { label: "Calm" },
    "feel_elegant": { label: "Elegant" },
    "feel_dynamic": { label: "Dynamic" },
    "feel_intelligent": { label: "Intelligent" },

    // Avoid Feelings
    "avoid_cheap": { label: "Cheap" },
    "avoid_cluttered": { label: "Cluttered" },
    "avoid_aggressive": { label: "Aggressive" },
    "avoid_generic-ai": { label: "Generic AI" },
    "avoid_template": { label: "Template-like" },
    "avoid_overwhelming": { label: "Overwhelming" },
    "avoid_confusing": { label: "Confusing" },
    "avoid_dated": { label: "Dated" },
    "avoid_inconsistent": { label: "Inconsistent" },

    // Pain Points
    "pain_ai-template": {
      label: "Looks like AI-generated template",
      description: "Lacks originality and brand feel"
    },
    "pain_hierarchy": {
      label: "No clear visual hierarchy",
      description: "Information priorities unclear"
    },
    "pain_colors": {
      label: "Colors feel random or messy",
      description: "Color coordination is off"
    },
    "pain_typography": {
      label: "Typography inconsistent",
      description: "Font and size inconsistency"
    },
    "pain_spacing": {
      label: "Spacing feels off",
      description: "Whitespace and spacing not unified"
    },
    "pain_animations": {
      label: "Too many animations",
      description: "Excessive motion hurts experience"
    },
    "pain_cta": {
      label: "Unclear CTA or conversion path",
      description: "Call-to-action is not clear"
    },
    "pain_personality": {
      label: "Missing brand personality",
      description: "Lacks uniqueness and recognition"
    },

    // Page Types
    "pt_saas": { label: "SaaS Landing Page" },
    "pt_portfolio": { label: "Portfolio" },
    "pt_ecommerce": { label: "E-commerce Product Page" },
    "pt_dashboard": { label: "Dashboard / Admin" },
    "pt_blog": { label: "Blog Post" },
    "pt_mobile": { label: "Mobile App Landing" },
    "pt_docs": { label: "Documentation" },
    "pt_other": { label: "Other" },

    // Design Directions
    "dir_calm-professional": {
      label: "Calm Professional",
      description: "Stable, trustworthy, and authoritative. Ideal for enterprise software, financial services, B2B SaaS, and professional consulting."
    },
    "dir_soft-intelligent": {
      label: "Soft Intelligent",
      description: "Approachable yet cutting-edge. Ideal for AI/ML products, developer tools, productivity apps, and modern tech companies."
    },
    "dir_experimental-premium": {
      label: "Experimental Premium",
      description: "Bold, innovative, and high-end. Ideal for creative agencies, fashion brands, luxury brands, and experimental portfolios."
    },

    // Workspace Categories
    "wc_landing": { label: "Landing Page" },
    "wc_product": { label: "Product Page" },
    "wc_marketing": { label: "Marketing" },
    "wc_dashboard": { label: "Dashboard" },
    "wc_other": { label: "Other" },

    // Tools
    "tool_codex": { label: "Codex" },
    "tool_claude-code": { label: "Claude Code" },
    "tool_gemini": { label: "Gemini" },
    "tool_workbuddy": { label: "WorkBuddy" },

    // Pattern Categories
    "pattern_layout": { label: "Layout" },
    "pattern_interaction": { label: "Interaction" },
    "pattern_visual": { label: "Visual Style" },
    "pattern_diagnosis": { label: "Diagnosis" },
    "pattern_prompt": { label: "Prompt" },
  },
};

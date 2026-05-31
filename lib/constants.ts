// ============================================================
// Vibe Design Translator - Constants
// ============================================================

import { ToolType, VisualIntensity, ContentDensity } from "./types";

// Tool Labels (tKey maps to translation dict)
export const TOOL_LABELS: Record<ToolType, string> = {
  codex: "tool_codex",
  "claude-code": "tool_claude_code",
  gemini: "tool_gemini",
  workbuddy: "tool_workbuddy",
};

// Visual Intensity Labels (tKey)
export const VISUAL_INTENSITY_LABELS: Record<VisualIntensity, string> = {
  minimal: "intensity_minimal",
  balanced: "intensity_balanced",
  expressive: "intensity_expressive",
};

// Content Density Labels (tKey)
export const CONTENT_DENSITY_LABELS: Record<ContentDensity, string> = {
  light: "density_light",
  standard: "density_standard",
  dense: "density_dense",
};

// Product Categories (tKey)
export const PRODUCT_CATEGORIES = [
  "cat_saas",
  "cat_mobile",
  "cat_ecommerce",
  "cat_portfolio",
  "cat_blog",
  "cat_marketing",
  "cat_dashboard",
  "cat_docs",
  "cat_event",
  "cat_other",
];

// ============================================================
// Brief Form - Design Decision Questions
// ============================================================

// First Impression Options
export const FIRST_IMPRESSION_OPTIONS = [
  { value: "professional-reliable", label: "Professional & Reliable", description: "Communicates competence and trustworthiness", tKey: "fi_professional", tKeyDesc: "fi_professional_desc" },
  { value: "futuristic-experimental", label: "Futuristic & Experimental", description: "Signals innovation and cutting-edge technology", tKey: "fi_futuristic", tKeyDesc: "fi_futuristic_desc" },
  { value: "calm-premium", label: "Calm & Premium", description: "Quiet luxury with refined aesthetics", tKey: "fi_calm", tKeyDesc: "fi_calm_desc" },
  { value: "friendly-intelligent", label: "Friendly & Intelligent", description: "Approachable yet sophisticated", tKey: "fi_friendly", tKeyDesc: "fi_friendly_desc" },
  { value: "developer-focused", label: "Sharp & Developer-focused", description: "Technical credibility and precision", tKey: "fi_developer", tKeyDesc: "fi_developer_desc" },
];

// Business Priority Options
export const BUSINESS_PRIORITY_OPTIONS = [
  { value: "convert-signup", label: "Convert Sign-ups", description: "Drive user registration or purchase", tKey: "bp_convert", tKeyDesc: "bp_convert_desc" },
  { value: "build-trust", label: "Build Trust & Credibility", description: "Establish authority and reliability", tKey: "bp_trust", tKeyDesc: "bp_trust_desc" },
  { value: "showcase-product", label: "Showcase Product Power", description: "Demonstrate features and capabilities", tKey: "bp_showcase", tKeyDesc: "bp_showcase_desc" },
  { value: "impress-stakeholders", label: "Impress Interviewers/Investors", description: "Portfolio and pitch presentations", tKey: "bp_impress", tKeyDesc: "bp_impress_desc" },
  { value: "explain-complex", label: "Explain Complex Features", description: "Educational and explanatory content", tKey: "bp_explain", tKeyDesc: "bp_explain_desc" },
];

// Visual Reference Tolerance
export const VISUAL_REFERENCE_OPTIONS = [
  { value: "apple-minimal", label: "Apple-like Minimal", description: "Clean, restrained, whitespace-forward", tKey: "vr_apple", tKeyDesc: "vr_apple_desc" },
  { value: "linear-structured", label: "Linear-like Structured", description: "Systematic, information-dense, professional", tKey: "vr_linear", tKeyDesc: "vr_linear_desc" },
  { value: "stripe-conversion", label: "Stripe-like Conversion", description: "Clear hierarchy, trust-building, persuasive", tKey: "vr_stripe", tKeyDesc: "vr_stripe_desc" },
  { value: "vercel-developer", label: "Vercel-like Developer Tool", description: "Technical, modern, dark mode capable", tKey: "vr_vercel", tKeyDesc: "vr_vercel_desc" },
  { value: "original", label: "Original / No Reference", description: "Unique direction without obvious inspiration", tKey: "vr_original", tKeyDesc: "vr_original_desc" },
];

// Avoided AI Smell Options
export const AVOIDED_AI_SMELL_OPTIONS = [
  { value: "gradient-overload", label: "Excessive Blue-Purple Gradients", description: "Avoid glowing, neon-like color transitions", tKey: "ai_gradient", tKeyDesc: "ai_gradient_desc" },
  { value: "meaningless-glow", label: "Meaningless Glow Effects", description: "Skip decorative blur and glow on every card", tKey: "ai_glow", tKeyDesc: "ai_glow_desc" },
  { value: "everything-centered", label: "Everything Perfectly Centered", description: "Add asymmetric layouts for visual interest", tKey: "ai_centered", tKeyDesc: "ai_centered_desc" },
  { value: "icon-overload", label: "Icon Overload", description: "Mix icon styles or reduce icon density", tKey: "ai_icons", tKeyDesc: "ai_icons_desc" },
  { value: "generic-copy", label: "Generic Copy & Buzzwords", description: "Use specific, original product language", tKey: "ai_copy", tKeyDesc: "ai_copy_desc" },
  { value: "no-product-feel", label: "No Real Product Feel", description: "Show actual product UI, not stock placeholders", tKey: "ai_no_product", tKeyDesc: "ai_no_product_desc" },
];

// Audience Options
export const AUDIENCE_OPTIONS = [
  { value: "real-users", label: "Real Users", description: "End customers or consumers", tKey: "aud_users", tKeyDesc: "aud_users_desc" },
  { value: "interviewers", label: "Interviewers", description: "Hiring managers and recruiters", tKey: "aud_interviewers", tKeyDesc: "aud_interviewers_desc" },
  { value: "investors", label: "Investors", description: "VCs, angels, potential partners", tKey: "aud_investors", tKeyDesc: "aud_investors_desc" },
  { value: "enterprise", label: "Enterprise Clients", description: "B2B buyers and decision makers", tKey: "aud_enterprise", tKeyDesc: "aud_enterprise_desc" },
  { value: "developers", label: "Developers", description: "Technical audience, peers, contributors", tKey: "aud_developers", tKeyDesc: "aud_developers_desc" },
];

// Common Desired Feelings
export const DESIRED_FEELING_OPTIONS = [
  { value: "Trustworthy", tKey: "feel_trustworthy" },
  { value: "Premium", tKey: "feel_premium" },
  { value: "Innovative", tKey: "feel_innovative" },
  { value: "Minimal", tKey: "feel_minimal" },
  { value: "Friendly", tKey: "feel_friendly" },
  { value: "Bold", tKey: "feel_bold" },
  { value: "Calm", tKey: "feel_calm" },
  { value: "Elegant", tKey: "feel_elegant" },
  { value: "Dynamic", tKey: "feel_dynamic" },
  { value: "Intelligent", tKey: "feel_intelligent" },
];

// Common Avoided Feelings
export const AVOIDED_FEELING_OPTIONS = [
  { value: "Cheap", tKey: "avoid_cheap" },
  { value: "Cluttered", tKey: "avoid_cluttered" },
  { value: "Aggressive", tKey: "avoid_aggressive" },
  { value: "Generic AI", tKey: "avoid_generic_ai" },
  { value: "Template-like", tKey: "avoid_template" },
  { value: "Overwhelming", tKey: "avoid_overwhelming" },
  { value: "Confusing", tKey: "avoid_confusing" },
  { value: "Dated", tKey: "avoid_dated" },
  { value: "Inconsistent", tKey: "avoid_inconsistent" },
];

// Pain Points for Diagnosis
export const PAIN_POINT_OPTIONS = [
  { value: "ai-template", tKey: "pain_ai_template" },
  { value: "hierarchy", tKey: "pain_hierarchy" },
  { value: "colors", tKey: "pain_colors" },
  { value: "typography", tKey: "pain_typography" },
  { value: "spacing", tKey: "pain_spacing" },
  { value: "animations", tKey: "pain_animations" },
  { value: "cta", tKey: "pain_cta" },
  { value: "personality", tKey: "pain_personality" },
];

// Page Types for Diagnosis
export const PAGE_TYPE_OPTIONS = [
  { value: "saas", tKey: "pt_saas" },
  { value: "portfolio", tKey: "pt_portfolio" },
  { value: "ecommerce", tKey: "pt_ecommerce" },
  { value: "dashboard", tKey: "pt_dashboard" },
  { value: "blog", tKey: "pt_blog" },
  { value: "mobile", tKey: "pt_mobile" },
  { value: "docs", tKey: "pt_docs" },
  { value: "other", tKey: "pt_other" },
];

// Local Storage Keys
export const STORAGE_KEYS = {
  BRIEF: "vibe_translator_brief",
  MODE: "vibe_translator_mode",
  DIRECTION: "vibe_translator_direction",
  TOOL: "vibe_translator_tool",
  DIAGNOSIS: "vibe_translator_diagnosis",
  HISTORY: "vibe_translator_history",
};

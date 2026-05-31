// ============================================================
// Vibe Design Translator - Constants
// ============================================================

import { ToolType, VisualIntensity, ContentDensity } from "./types";

// Tool Labels
export const TOOL_LABELS: Record<ToolType, string> = {
  codex: "Codex",
  "claude-code": "Claude Code",
  gemini: "Gemini",
  workbuddy: "WorkBuddy",
};

// Visual Intensity Labels
export const VISUAL_INTENSITY_LABELS: Record<VisualIntensity, string> = {
  minimal: "Minimal",
  balanced: "Balanced",
  expressive: "Expressive",
};

// Content Density Labels
export const CONTENT_DENSITY_LABELS: Record<ContentDensity, string> = {
  light: "Light",
  standard: "Standard",
  dense: "Dense",
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  "SaaS Platform",
  "Mobile App Landing",
  "E-commerce",
  "Portfolio",
  "Blog / Editorial",
  "Marketing Campaign",
  "Dashboard",
  "Documentation",
  "Event Page",
  "Other",
];

// ============================================================
// Brief Form - Design Decision Questions
// ============================================================

// First Impression Options
export const FIRST_IMPRESSION_OPTIONS = [
  { value: "professional-reliable", label: "Professional & Reliable", description: "Communicates competence and trustworthiness" },
  { value: "futuristic-experimental", label: "Futuristic & Experimental", description: "Signals innovation and cutting-edge technology" },
  { value: "calm-premium", label: "Calm & Premium", description: "Quiet luxury with refined aesthetics" },
  { value: "friendly-intelligent", label: "Friendly & Intelligent", description: "Approachable yet sophisticated" },
  { value: "developer-focused", label: "Sharp & Developer-focused", description: "Technical credibility and precision" },
];

// Business Priority Options
export const BUSINESS_PRIORITY_OPTIONS = [
  { value: "convert-signup", label: "Convert Sign-ups", description: "Drive user registration or purchase" },
  { value: "build-trust", label: "Build Trust & Credibility", description: "Establish authority and reliability" },
  { value: "showcase-product", label: "Showcase Product Power", description: "Demonstrate features and capabilities" },
  { value: "impress-stakeholders", label: "Impress Interviewers/Investors", description: "Portfolio and pitch presentations" },
  { value: "explain-complex", label: "Explain Complex Features", description: "Educational and explanatory content" },
];

// Visual Reference Tolerance
export const VISUAL_REFERENCE_OPTIONS = [
  { value: "apple-minimal", label: "Apple-like Minimal", description: "Clean, restrained, whitespace-forward" },
  { value: "linear-structured", label: "Linear-like Structured", description: "Systematic, information-dense, professional" },
  { value: "stripe-conversion", label: "Stripe-like Conversion", description: "Clear hierarchy, trust-building, persuasive" },
  { value: "vercel-developer", label: "Vercel-like Developer Tool", description: "Technical, modern, dark mode capable" },
  { value: "original", label: "Original / No Reference", description: "Unique direction without obvious inspiration" },
];

// Avoided AI Smell Options
export const AVOIDED_AI_SMELL_OPTIONS = [
  { value: "gradient-overload", label: "Excessive Blue-Purple Gradients", description: "Avoid glowing, neon-like color transitions" },
  { value: "meaningless-glow", label: "Meaningless Glow Effects", description: "Skip decorative blur and glow on every card" },
  { value: "everything-centered", label: "Everything Perfectly Centered", description: "Add asymmetric layouts for visual interest" },
  { value: "icon-overload", label: "Icon Overload", description: "Mix icon styles or reduce icon density" },
  { value: "generic-copy", label: "Generic Copy & Buzzwords", description: "Use specific, original product language" },
  { value: "no-product-feel", label: "No Real Product Feel", description: "Show actual product UI, not stock placeholders" },
];

// Audience Options
export const AUDIENCE_OPTIONS = [
  { value: "real-users", label: "Real Users", description: "End customers or consumers" },
  { value: "interviewers", label: "Interviewers", description: "Hiring managers and recruiters" },
  { value: "investors", label: "Investors", description: "VCs, angels, potential partners" },
  { value: "enterprise", label: "Enterprise Clients", description: "B2B buyers and decision makers" },
  { value: "developers", label: "Developers", description: "Technical audience, peers, contributors" },
];

// Common Desired Feelings
export const DESIRED_FEELING_OPTIONS = [
  "Trustworthy",
  "Premium",
  "Innovative",
  "Minimal",
  "Friendly",
  "Bold",
  "Calm",
  "Elegant",
  "Dynamic",
  "Intelligent",
];

// Common Avoided Feelings
export const AVOIDED_FEELING_OPTIONS = [
  "Cheap",
  "Cluttered",
  "Aggressive",
  "Generic AI",
  "Template-like",
  "Overwhelming",
  "Confusing",
  "Dated",
  "Inconsistent",
];

// Pain Points for Diagnosis
export const PAIN_POINT_OPTIONS = [
  "Looks like AI-generated template",
  "No clear visual hierarchy",
  "Colors feel random or messy",
  "Typography inconsistent",
  "Spacing feels off",
  "Too many animations",
  "Unclear CTA or conversion path",
  "Missing brand personality",
];

// Page Types for Diagnosis
export const PAGE_TYPE_OPTIONS = [
  "SaaS Landing Page",
  "Portfolio",
  "E-commerce Product Page",
  "Dashboard / Admin",
  "Blog Post",
  "Mobile App Landing",
  "Documentation",
  "Other",
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

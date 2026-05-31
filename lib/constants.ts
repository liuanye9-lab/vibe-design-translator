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

// Local Storage Keys
export const STORAGE_KEYS = {
  BRIEF: "vibe_translator_brief",
  MODE: "vibe_translator_mode",
  DIRECTION: "vibe_translator_direction",
  TOOL: "vibe_translator_tool",
  DIAGNOSIS: "vibe_translator_diagnosis",
  HISTORY: "vibe_translator_history",
};
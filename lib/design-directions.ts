// ============================================================
// Vibe Design Translator - Design Directions
// ============================================================
//
// 3 curated design directions for AI-generated pages:
// - Calm Professional: Enterprise, SaaS, Finance
// - Soft Intelligent: Tech, Healthcare, Education
// - Experimental Premium: Creative, Fashion, Luxury
//
// ============================================================

import { DesignDirection } from "./types";

export const DESIGN_DIRECTIONS: DesignDirection[] = [
  // ============================================================
  // Direction 1: Calm Professional
  // ============================================================
  {
    id: "calm-professional",
    name: "Calm Professional",
    description:
      "Stable, trustworthy, and authoritative. Ideal for enterprise software, financial services, B2B SaaS, and professional consulting. Communicates competence through restraint rather than decoration.",
    suitableFor: [
      "Enterprise SaaS platforms",
      "Financial services",
      "B2B software",
      "Professional consulting",
      "Legal services",
      "Healthcare enterprise",
    ],
    psychologicalEffect:
      "Creates a sense of stability and competence. Users feel they're dealing with established, reliable professionals. Reduces cognitive load by maintaining familiar patterns.",
    visualKeywords: [
      "Restrained",
      "Precise",
      "Organized",
      "Balanced",
      "Professional",
      "Trustworthy",
      "Systematic",
      "Authoritative",
    ],
    colorSystem: [
      "Navy (#1E3A5F) as primary",
      "Slate gray (#64748B) as secondary",
      "White (#FFFFFF) for backgrounds",
      "Light gray (#F8FAFC) for section contrast",
      "Accent: Subdued blue (#3B82F6) used sparingly",
      "Text: Dark slate (#1E293B) for readability",
    ],
    typography:
      "Clean sans-serif hierarchy. Use Inter or system sans-serif at 16px base. Headings: Semi-bold to bold. Body: Regular weight. Line-height: 1.5-1.6 for readability. Letter-spacing: Normal to slight (-0.01em) on headings.",
    layoutAdvice: [
      "Use generous whitespace (48-64px section padding)",
      "Maintain consistent grid alignment",
      "Single-column layouts for key content",
      "Sidebar for secondary navigation",
      "Max content width: 1200px centered",
      "Clear visual hierarchy through size, not decoration",
    ],
    interactionAdvice: [
      "Subtle hover states (opacity change, not dramatic transforms)",
      "Understated animations (150-200ms ease)",
      "Focus on usability over delight",
      "Clear interactive affordances",
      "Avoid playful or bouncy interactions",
      "Professional loading states (spinners over excessive skeletons)",
    ],
    risks:
      "Can feel cold or impersonal. Risk of looking outdated if colors are too muted. May lack differentiation from competitors using same corporate palette.",
  },

  // ============================================================
  // Direction 2: Soft Intelligent
  // ============================================================
  {
    id: "soft-intelligent",
    name: "Soft Intelligent",
    description:
      "Approachable yet cutting-edge. Ideal for AI/ML products, developer tools, productivity apps, and modern tech companies. Balances technical credibility with human warmth.",
    suitableFor: [
      "AI/ML products",
      "Developer tools",
      "Productivity apps",
      "EdTech platforms",
      "Modern healthcare",
      "Consumer tech",
    ],
    psychologicalEffect:
      "Signals intelligence without intimidation. Users feel they're using sophisticated technology that's accessible and helpful. Reduces anxiety around complex products.",
    visualKeywords: [
      "Sophisticated",
      "Approachable",
      "Modern",
      "Clean",
      "Intelligent",
      "Warm",
      "Innovative",
      "Trustworthy",
    ],
    colorSystem: [
      "Deep purple (#7C3AED) as primary",
      "Soft cyan (#06B6D4) as secondary accent",
      "Off-white (#FAFAFA) for backgrounds",
      "Subtle gradient overlays (purple to blue, 10-15% opacity)",
      "Soft lavender (#F5F3FF) for highlights",
      "Text: Near-black (#18181B) with high contrast",
    ],
    typography:
      "Modern, slightly humanist sans-serif. Use Inter or Geist at 16px base. Mix weights strategically: Light/Regular for body, Medium/Semibold for emphasis. Generous line-height (1.6-1.7). Slight letter-spacing (-0.02em) on headings for sophistication.",
    layoutAdvice: [
      "Use generous padding (56-72px) for premium feel",
      "Incorporate subtle depth through layered cards",
      "Mix contained sections with full-bleed",
      "Soft shadows for elevation (not harsh)",
      "Max width: 1280px with asymmetric potential",
      "Consider subtle gradient backgrounds on hero",
    ],
    interactionAdvice: [
      "Smooth, physics-based animations (300-400ms spring)",
      "Micro-interactions that feel responsive",
      "Hover states with subtle scale (1.02) or lift",
      "Gradual reveal animations on scroll",
      "Focus on making AI feel approachable",
      "Avoid aggressive or attention-grabbing animations",
    ],
    risks:
      "Can feel generic in crowded AI/tech space. Risk of purple/blue gradient overuse making it look like typical AI startup. May feel too playful for enterprise buyers.",
  },

  // ============================================================
  // Direction 3: Experimental Premium
  // ============================================================
  {
    id: "experimental-premium",
    name: "Experimental Premium",
    description:
      "Bold, distinctive, and memorable. Ideal for creative agencies, luxury brands, fashion, and innovative products. Creates strong brand recognition through unconventional choices.",
    suitableFor: [
      "Creative agencies",
      "Luxury brands",
      "Fashion",
      "High-end retail",
      "Innovative startups",
      "Design studios",
      "Art platforms",
    ],
    psychologicalEffect:
      "Creates intrigue and perceived value. Users feel they're encountering something exclusive and crafted. Triggers curiosity and exploration motivation.",
    visualKeywords: [
      "Distinctive",
      "Luxurious",
      "Bold",
      "Curated",
      "Artful",
      "Exclusive",
      "Memorable",
      "Crafted",
    ],
    colorSystem: [
      "Deep charcoal (#18181B) as base",
      "Warm cream (#FDF7F0) for contrast",
      "Gold accent (#B8860B) used sparingly",
      "Monochrome with selective color moments",
      "Rich texture through gradients (3-5% subtle)",
      "Text: Off-white (#FAFAFA) on dark, charcoal on light",
    ],
    typography:
      "High-contrast type pairing. Consider serif + sans-serif mix. Display: Large (64-96px) with tight tracking. Body: Smaller (15-16px) with generous leading. Play with unconventional sizing. Mix elegant serif (Playfair, Cormorant) with clean sans (Inter).",
    layoutAdvice: [
      "Embrace asymmetry deliberately",
      "Use unconventional grid structures",
      "Large negative space as design element",
      "Full-bleed imagery with overlaid typography",
      "Max width: Wide (1400px) or no max for full expression",
      "Break expected layout patterns intentionally",
    ],
    interactionAdvice: [
      "Unexpected, delightful micro-interactions",
      "Custom cursor effects or interactions",
      "Scroll-driven storytelling with scroll-jacking",
      "Parallax depth effects",
      "Hover reveals with content transformation",
      "Consider gesture-based navigation",
    ],
    risks:
      "High risk—can easily become inaccessible or unusable. Over-design can obscure content. May alienate users expecting conventional patterns. Expensive to maintain and update.",
  },
];

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get direction by ID
 */
export function getDirectionById(id: string): DesignDirection | undefined {
  return DESIGN_DIRECTIONS.find((d) => d.id === id);
}

/**
 * Get direction by name (case-insensitive)
 */
export function getDirectionByName(name: string): DesignDirection | undefined {
  return DESIGN_DIRECTIONS.find(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  );
}
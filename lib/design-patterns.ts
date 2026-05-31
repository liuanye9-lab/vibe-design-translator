// ============================================================
// Vibe Design Translator - 12 Original Design Patterns
// ============================================================
//
// IMPORTANT: All patterns are abstract design signals + original
// implementation guidance. No third-party screenshots, logos, or
// trademarks. All reference logic is original, no copied assets.
//
// ============================================================

import { DesignPattern } from "./types";

export const DESIGN_PATTERNS: DesignPattern[] = [
  // ============================================================
  // Category: Layout Patterns
  // ============================================================

  {
    id: "p1",
    name: "Intentional White Space",
    category: "Layout",
    suitableFor: [
      "Premium product pages",
      "SaaS landing pages",
      "Portfolio sites",
      "Minimal brands",
    ],
    visualTraits: [
      "Generous padding (64px+) between sections",
      "Single focal point per viewport",
      "Breathing room around typography",
      "Negative space as active design element",
    ],
    layoutAdvice: [
      "Use CSS Grid with explicit gaps of 48-96px",
      "Set max-width: 1200px with auto margins",
      "Apply asymmetric layouts to create visual tension",
      "Let content dictate space, not the other way around",
    ],
    interactionAdvice: [
      "Hover states should be subtle, not space-consuming",
      "Avoid popups that disrupt the breathing room",
      "Scroll animations should maintain the sense of space",
      "Transitions should feel like expanding, not jumping",
    ],
    promptFragment: `Use intentional white space as a primary design element. Set section padding to 64px minimum, content max-width to 1200px, and maintain generous line-height (1.6-1.8) for body text. Create visual rhythm through varying space rather than decorative elements.`,
    avoid: [
      "Cramming content to fill the viewport",
      "Uniform padding across all sections",
      "Decorative elements that compete with space",
      "Popups and modals that feel claustrophobic",
    ],
    legalNote:
      "This pattern describes abstract white space principles and original implementation guidance. No specific brand, website, or third-party design is referenced or copied.",
  },

  {
    id: "p2",
    name: "Asymmetric Grid",
    category: "Layout",
    suitableFor: [
      "Creative agency sites",
      "Portfolio showcases",
      "Editorial content",
      "Magazine-style layouts",
    ],
    visualTraits: [
      "Non-equal column widths (e.g., 2:3 or 1:4 ratios)",
      "Offset alignment creating visual interest",
      "Content that breaks expected boundaries",
      "Dynamic visual hierarchy",
    ],
    layoutAdvice: [
      "Use CSS Grid with named template areas",
      "Set explicit grid tracks (not auto)",
      "Offset elements using transform or negative margins",
      "Allow some content to bleed past container edges",
    ],
    interactionAdvice: [
      "Parallax effects should enhance the asymmetry",
      "Hover reveals should maintain grid tension",
      "Avoid snapping all elements to center on interaction",
      "Transitions should feel like shifting blocks",
    ],
    promptFragment: `Implement an asymmetric grid layout using CSS Grid with non-equal column ratios (e.g., 2:3 or 1:4). Offset key elements to create visual tension and interest. Allow content to break traditional boundaries while maintaining readability. The layout should feel dynamic yet intentional, not random.`,
    avoid: [
      "Perfectly centered, symmetric layouts",
      "Equal column widths throughout",
      "Forcing all content into equal boxes",
      "Symmetric hover states",
    ],
    legalNote:
      "This pattern describes abstract asymmetric grid principles. Implementation guidance is original and does not reference any specific website, publication, or design system.",
  },

  {
    id: "p3",
    name: "Card Stacking",
    category: "Layout",
    suitableFor: [
      "Feature showcases",
      "Pricing comparisons",
      "Testimonial sections",
      "Multi-step processes",
    ],
    visualTraits: [
      "Cards overlapping slightly (8-16px)",
      "Layered depth through shadows",
      "3D perspective on hover",
      "Revealed content on stack interaction",
    ],
    layoutAdvice: [
      "Use CSS transform: translateZ() for stacking",
      "Apply increasing z-index to front cards",
      "Set subtle box-shadow to enhance depth",
      "Keep card dimensions consistent across stack",
    ],
    interactionAdvice: [
      "Hover should bring card to front with smooth transition",
      "Click should expand card to full view",
      "Drag should allow reordering with physics",
      "Scroll should reveal cards in sequence",
    ],
    promptFragment: `Create a card stacking effect where cards overlap by 8-16px with layered shadows. On hover, cards should lift and come to the front with a smooth 300ms transition. Use CSS transform: translateZ() for depth. The top card should be fully visible while lower cards show only edges.`,
    avoid: [
      "Flat, side-by-side cards without depth",
      "Abrupt transitions without easing",
      "Cards of varying sizes in same stack",
      "Stack that feels cluttered or busy",
    ],
    legalNote:
      "This pattern describes abstract card stacking techniques. No specific UI library, component, or third-party design is referenced. Implementation is original CSS/React code.",
  },

  // ============================================================
  // Category: Color Patterns
  // ============================================================

  {
    id: "p4",
    name: "Duo-Tone Elevation",
    category: "Color",
    suitableFor: [
      "Dark mode interfaces",
      "Premium tech products",
      "Data visualization",
      "Developer tools",
    ],
    visualTraits: [
      "Two-color palette (light + accent)",
      "Elevation through lightness, not color",
      "Subtle gradients suggesting depth",
      "High contrast on interactive elements",
    ],
    layoutAdvice: [
      "Define 5-7 elevation levels using lightness variations",
      "Use a single accent color for interactive states",
      "Apply gradient backgrounds sparingly (15-25% opacity)",
      "Maintain consistent contrast ratio (4.5:1 minimum)",
    ],
    interactionAdvice: [
      "Hover should increase elevation (lighten background)",
      "Active states should use accent color",
      "Disabled states should reduce to lowest elevation",
      "Focus rings should be accent-colored, not default",
    ],
    promptFragment: `Implement duo-tone elevation using only lightness variations (not hue changes). Create 5 elevation levels from base (#1a1a1a) to highest (#ffffff) with your accent color (#007AFF) appearing only on interactive elements. Use subtle linear gradients (top to bottom, lighter at top) for backgrounds.`,
    avoid: [
      "Multiple accent colors creating visual noise",
      "Elevation changes that also change hue",
      "Dark backgrounds with bright, competing colors",
      "Uniform background without depth cues",
    ],
    legalNote:
      "This pattern describes abstract duo-tone color principles. No specific brand colors, design systems, or trademarked palettes are referenced. Implementation is original.",
  },

  {
    id: "p5",
    name: "Color-Blocked Sections",
    category: "Color",
    suitableFor: [
      "Landing page storytelling",
      "Product feature highlights",
      "Service explanations",
      "About/Storytelling pages",
    ],
    visualTraits: [
      "Each section has distinct background color",
      "Colors create visual chapters",
      "Transition zones between color blocks",
      "Typography adapts to each background",
    ],
    layoutAdvice: [
      "Use full-bleed background colors per section",
      "Define 3-5 colors maximum for entire page",
      "Ensure text contrast within each color block",
      "Use subtle gradients at section transitions",
    ],
    interactionAdvice: [
      "Scroll should feel like moving through chapters",
      "Sticky elements should adapt to current section color",
      "Progress indicators should match section colors",
      "Avoid jarring color jumps between sections",
    ],
    promptFragment: `Create color-blocked sections where each section uses a distinct background color (max 5 colors). Use full-bleed backgrounds with smooth 50px gradient transitions between color blocks. Typography should adapt contrast (light on dark, dark on light) for readability within each block.`,
    avoid: [
      "Too many colors (more than 5 distinct backgrounds)",
      "Low contrast text within color blocks",
      "Sharp edges without transition gradients",
      "Colors that clash when adjacent",
    ],
    legalNote:
      "This pattern describes abstract color blocking techniques. No specific website sections, brand colors, or marketing designs are referenced. Implementation is original.",
  },

  {
    id: "p6",
    name: "Muted Gradient Overlay",
    category: "Color",
    suitableFor: [
      "Hero sections",
      "Backgrounds with text overlay",
      "Image treatments",
      "Atmospheric page sections",
    ],
    visualTraits: [
      "Soft, low-opacity gradients (10-30%)",
      "Subtle color transitions",
      "Enhanced readability for overlaid content",
      "No harsh color stops or banding",
    ],
    layoutAdvice: [
      "Use linear or radial gradients at 10-30% opacity",
      "Apply gradient overlays to existing backgrounds",
      "Ensure gradient direction complements content flow",
      "Test readability with all overlaid content",
    ],
    interactionAdvice: [
      "Gradients should not shift dramatically on hover",
      "Content above gradient should remain readable",
      "Avoid gradients that compete with foreground elements",
      "Parallax gradient movement should be subtle (2-5%)",
    ],
    promptFragment: `Apply muted gradient overlays (10-30% opacity) to hero sections. Use soft linear gradients (135deg direction) with colors that complement the brand. Ensure all overlaid text maintains WCAG AA contrast ratio (4.5:1). Avoid harsh color stops—use 5-7 gradient stops for smooth transitions.`,
    avoid: [
      "High-opacity gradients that obscure content",
      "Harsh, banding-prone gradients",
      "Gradients that clash with content colors",
      "Gradients that change dramatically on interaction",
    ],
    legalNote:
      "This pattern describes abstract gradient overlay techniques. No specific gradient presets, color tools, or third-party implementations are referenced.",
  },

  // ============================================================
  // Category: Typography Patterns
  // ============================================================

  {
    id: "p7",
    name: "Scale Contrast",
    category: "Typography",
    suitableFor: [
      "Hero headlines",
      "Feature sections",
      "Pricing displays",
      "Any key information hierarchy",
    ],
    visualTraits: [
      "Extreme size contrast (48px+ headings vs 16px body)",
      "Weight variation (Bold vs Regular)",
      "Strategic whitespace around type",
      "Clear visual hierarchy at a glance",
    ],
    layoutAdvice: [
      "Define type scale with at least 3:1 ratio between levels",
      "Use display fonts at 48-96px for heroes",
      "Keep body text at 16-18px maximum",
      "Apply generous line-height (1.4-1.8) for readability",
    ],
    interactionAdvice: [
      "Hover on large headings should create subtle scale (1.02)",
      "Avoid scaling text that creates layout breaks",
      "Focus states should be visible but not jarring",
      "Text selection color should match brand accent",
    ],
    promptFragment: `Create dramatic type scale contrast with headings at 48-96px (display weight) and body at 16-18px (regular weight). Use at least 3:1 size ratio between hierarchy levels. Apply generous letter-spacing (-0.02em) to large headings and 1.6 line-height to body text.`,
    avoid: [
      "Similar sizes across all text (no hierarchy)",
      "Overly large body text that competes with headings",
      "Tight line-height making text feel cramped",
      "Uniform font weights throughout",
    ],
    legalNote:
      "This pattern describes abstract typography scale principles. No specific typeface pairing, font stack, or typographic system is copied. Implementation uses system fonts or specified alternatives.",
  },

  {
    id: "p8",
    name: "Mixed Script Hierarchy",
    category: "Typography",
    suitableFor: [
      "Bilingual sites",
      "International brands",
      "Creative portfolios",
      "Editorial layouts",
    ],
    visualTraits: [
      "Two distinct typefaces (serif + sans-serif)",
      "Each script serves different content types",
      "Clear visual separation without borders",
      "Unified through color and weight",
    ],
    layoutAdvice: [
      "Pair serif (display) with sans-serif (body)",
      "Use serif for headings, sans-serif for body",
      "Match x-heights for visual harmony",
      "Limit to 2 typefaces maximum",
    ],
    interactionAdvice: [
      "Hover effects should apply uniformly across scripts",
      "Avoid mixing scripts mid-sentence",
      "Font loading should not cause layout shift",
      "Focus states should work across both typefaces",
    ],
    promptFragment: `Use mixed script hierarchy with serif for display headings (Playfair Display or similar) and sans-serif for body text (Inter or system). Apply serif at 32px+ with display weight, sans-serif at 16-18px with regular weight. Match x-heights where possible and ensure both scripts work at all weights used.`,
    avoid: [
      "More than 2 typefaces in conflict",
      "Mixing scripts within the same element",
      "Dramatically different x-heights causing misalignment",
      "Uniform weight across both typefaces",
    ],
    legalNote:
      "This pattern describes abstract mixed script typography. No specific font licenses, foundry designs, or trademarked typefaces are copied. Google Fonts are used as alternatives when specified.",
  },

  // ============================================================
  // Category: Interaction Patterns
  // ============================================================

  {
    id: "p9",
    name: "Magnetic Interactions",
    category: "Interaction",
    suitableFor: [
      "CTAs and buttons",
      "Navigation elements",
      "Feature highlights",
      "Gamified experiences",
    ],
    visualTraits: [
      "Elements subtly move toward cursor",
      "Magnetic pull radius of 50-100px",
      "Spring physics on approach",
      "Enhanced affordance on proximity",
    ],
    layoutAdvice: [
      "Define magnetic radius per element (50-100px)",
      "Use CSS transform for movement (not position)",
      "Set max movement distance (5-15px)",
      "Ensure magnetic elements don't overlap",
    ],
    interactionAdvice: [
      "Movement should feel organic, not mechanical",
      "Apply spring easing (cubic-bezier(0.34, 1.56, 0.64, 1))",
      "Disable magnetic effect on touch devices",
      "Return to origin with same spring physics",
    ],
    promptFragment: `Implement magnetic button interactions where elements subtly move toward the cursor within a 80px radius. Use spring physics with cubic-bezier(0.34, 1.56, 0.64, 1) for organic movement. Maximum displacement should be 10px. On touch devices, disable magnetic effect and use scale(1.05) on touch instead.`,
    avoid: [
      "Linear, robotic movement",
      "Elements jumping to cursor position",
      "Overlapping magnetic elements",
      "Magnetic effects on mobile causing confusion",
    ],
    legalNote:
      "This pattern describes abstract magnetic interaction principles. No specific library, component, or implementation from any third party is copied. Code is original vanilla CSS/JavaScript.",
  },

  {
    id: "p10",
    name: "Scroll-Reveal Choreography",
    category: "Interaction",
    suitableFor: [
      "Storytelling pages",
      "Product showcases",
      "About sections",
      "Onboarding flows",
    ],
    visualTraits: [
      "Elements reveal as user scrolls",
      "Staggered timing creates rhythm",
      "Fade + translateY for elegance",
      "Intersection Observer triggers",
    ],
    layoutAdvice: [
      "Set reveal threshold at 20% visibility",
      "Use 100-200ms stagger between siblings",
      "Define reveal distance (30-50px translateY)",
      "Create scroll-triggered sections",
    ],
    interactionAdvice: [
      "Reveal should use fade + translate (not scale)",
      "Duration should be 400-600ms per element",
      "Apply ease-out for natural deceleration",
      "Support prefers-reduced-motion preference",
    ],
    promptFragment: `Implement scroll-reveal choreography using Intersection Observer with 0.2 threshold. Stagger sibling elements by 150ms with fadeInUp animation (opacity 0→1, translateY 40px→0). Use 500ms duration with ease-out timing. Respect prefers-reduced-motion by replacing animations with instant display.`,
    avoid: [
      "Instant reveal without animation",
      "Scale animations that feel cheap",
      "No stagger, everything reveals simultaneously",
      "Ignoring accessibility preference for motion",
    ],
    legalNote:
      "This pattern describes abstract scroll animation principles. No specific animation library, scroll library, or third-party code is copied. Implementation uses native Intersection Observer API.",
  },

  {
    id: "p11",
    name: "Gesture-Based Navigation",
    category: "Interaction",
    suitableFor: [
      "Mobile-first experiences",
      "Portfolio sites",
      "Image galleries",
      "Storytelling interfaces",
    ],
    visualTraits: [
      "Swipe gestures for navigation",
      "Pull-to-refresh interactions",
      "Momentum scrolling",
      "Visual feedback on gesture recognition",
    ],
    layoutAdvice: [
      "Set clear swipe thresholds (50-100px)",
      "Define gesture directions (horizontal or vertical)",
      "Create momentum with deceleration curves",
      "Provide visual affordances for gestures",
    ],
    interactionAdvice: [
      "Swipe should feel responsive (<100ms delay)",
      "Apply rubber-band effect at boundaries",
      "Use spring physics for snap points",
      "Support both touch and trackpad gestures",
    ],
    promptFragment: `Implement horizontal swipe navigation with 80px threshold. Apply momentum scrolling with deceleration curve. Use spring physics (cubic-bezier(0.25, 0.46, 0.45, 0.94)) for snap-to-slide. Add rubber-band effect at first/last slide with resistance. Support both touch swipe and trackpad scroll for navigation.`,
    avoid: [
      "No visual feedback during gesture",
      "Sticky or jarring snap points",
      "Gesture conflicts with page scroll",
      "Ignoring swipe direction constraints",
    ],
    legalNote:
      "This pattern describes abstract gesture navigation principles. No specific gesture library, mobile framework, or third-party implementation is referenced. Code is original.",
  },

  {
    id: "p12",
    name: "Micro-Feedback Loops",
    category: "Interaction",
    suitableFor: [
      "Form submissions",
      "Button actions",
      "Toggle switches",
      "Any state-changing interaction",
    ],
    visualTraits: [
      "Instant visual feedback on interaction",
      "Subtle animations confirming action",
      "Progress indicators for async operations",
      "Error states with clear recovery paths",
    ],
    layoutAdvice: [
      "Set feedback delay to <100ms",
      "Use micro-animations (50-200ms)",
      "Design distinct success/error/loading states",
      "Ensure feedback is visible but not distracting",
    ],
    interactionAdvice: [
      "Click should have immediate visual response",
      "Loading states should show progress or skeleton",
      "Success should confirm action clearly",
      "Errors should suggest recovery, not just state",
    ],
    promptFragment: `Implement micro-feedback loops for all interactive elements. On click: apply 50ms scale(0.98) press effect, then 150ms scale(1) release with spring. For async actions: show skeleton immediately, then transition to result. Success: brief green flash + checkmark. Error: shake animation + red border + recovery suggestion.`,
    avoid: [
      "No feedback during loading states",
      "Overly dramatic animations (1s+ for simple actions)",
      "Errors that disappear before user reads them",
      "Inconsistent feedback across similar interactions",
    ],
    legalNote:
      "This pattern describes abstract micro-interaction principles. No specific animation library, UI kit, or component library is referenced. Implementation is original CSS/React code.",
  },
];

// ============================================================
// Pattern Category List
// ============================================================

export const PATTERN_CATEGORIES = [
  "All",
  "Layout",
  "Color",
  "Typography",
  "Interaction",
] as const;

export type PatternCategory = (typeof PATTERN_CATEGORIES)[number];

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get patterns by category
 */
export function getPatternsByCategory(
  category: PatternCategory
): DesignPattern[] {
  if (category === "All") return DESIGN_PATTERNS;
  return DESIGN_PATTERNS.filter((p) => p.category === category);
}

/**
 * Search patterns by name or description
 */
export function searchPatterns(query: string): DesignPattern[] {
  const lowerQuery = query.toLowerCase();
  return DESIGN_PATTERNS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.suitableFor.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      p.visualTraits.some((v) => v.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get pattern by ID
 */
export function getPatternById(id: string): DesignPattern | undefined {
  return DESIGN_PATTERNS.find((p) => p.id === id);
}
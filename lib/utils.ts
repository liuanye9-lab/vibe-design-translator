// ============================================================
// Vibe Design Translator - Utility Functions
// ============================================================

// ============================================================
// String Utilities
// ============================================================

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert kebab-case to Title Case
 */
export function kebabToTitle(str: string): string {
  return str
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

// ============================================================
// Number Utilities
// ============================================================

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ============================================================
// Date Utilities
// ============================================================

/**
 * Format ISO date to readable string
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function getRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hr ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return formatDate(isoString);
}

// ============================================================
// Array Utilities
// ============================================================

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

// ============================================================
// Object Utilities
// ============================================================

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// ============================================================
// CSS Class Utilities
// ============================================================

/**
 * Simple class name combiner (no dependencies)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// Debounce Utility
// ============================================================

/**
 * Create a debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// ============================================================
// Score Utilities
// ============================================================

/**
 * Get score color based on value (0-100)
 */
export function getScoreColor(value: number): string {
  if (value >= 70) return "text-accent-iosBlue";
  if (value >= 50) return "text-accent-mistBlue";
  return "text-rose-500";
}

/**
 * Get score background color based on value (0-100)
 */
export function getScoreBgColor(value: number): string {
  if (value >= 70) return "bg-accent-iosBlue";
  if (value >= 50) return "bg-accent-mistBlue";
  return "bg-rose-500";
}

/**
 * Get score label based on value (0-100)
 */
export function getScoreLabel(value: number): string {
  if (value >= 80) return "Excellent";
  if (value >= 60) return "Good";
  if (value >= 40) return "Needs Work";
  return "Critical";
}

// ============================================================
// Direction Recommendation Utilities
// ============================================================

export interface RecommendationContext {
  productCategory?: string;
  targetUsers?: string;
  businessPriority?: string;
  audience?: string;
  firstImpression?: string;
  visualReference?: string;
}

/**
 * Calculate direction recommendation scores based on brief context
 */
export function calculateDirectionScores(context: RecommendationContext): Record<string, number> {
  const scores: Record<string, number> = {
    "calm-professional": 0,
    "soft-intelligent": 0,
    "experimental-premium": 0,
  };

  // Product Category scoring
  const categoryMapping: Record<string, string[]> = {
    "calm-professional": ["SaaS Platform", "Dashboard", "Documentation", "E-commerce"],
    "soft-intelligent": ["SaaS Platform", "Mobile App Landing", "Blog / Editorial", "Marketing Campaign"],
    "experimental-premium": ["Portfolio", "Event Page", "E-commerce", "Other"],
  };

  if (context.productCategory) {
    Object.entries(categoryMapping).forEach(([direction, categories]) => {
      if (categories.includes(context.productCategory!)) {
        scores[direction] += 2;
      }
    });
  }

  // Audience scoring
  const audienceMapping: Record<string, string[]> = {
    "calm-professional": ["enterprise", "real-users", "investors"],
    "soft-intelligent": ["developers", "real-users", "interviewers"],
    "experimental-premium": ["investors", "interviewers"],
  };

  if (context.audience) {
    Object.entries(audienceMapping).forEach(([direction, audiences]) => {
      if (audiences.includes(context.audience!)) {
        scores[direction] += 3;
      }
    });
  }

  // Business Priority scoring
  if (context.businessPriority) {
    if (context.businessPriority.includes("convert")) {
      scores["calm-professional"] += 2;
      scores["soft-intelligent"] += 1;
    }
    if (context.businessPriority.includes("trust")) {
      scores["calm-professional"] += 3;
      scores["soft-intelligent"] += 1;
    }
    if (context.businessPriority.includes("impress")) {
      scores["experimental-premium"] += 3;
      scores["soft-intelligent"] += 1;
    }
  }

  // First Impression scoring
  if (context.firstImpression) {
    if (context.firstImpression.includes("professional")) {
      scores["calm-professional"] += 3;
    }
    if (context.firstImpression.includes("calm-premium")) {
      scores["experimental-premium"] += 3;
      scores["calm-professional"] += 1;
    }
    if (context.firstImpression.includes("friendly")) {
      scores["soft-intelligent"] += 2;
    }
    if (context.firstImpression.includes("futuristic")) {
      scores["soft-intelligent"] += 2;
      scores["experimental-premium"] += 1;
    }
    if (context.firstImpression.includes("developer")) {
      scores["soft-intelligent"] += 2;
      scores["calm-professional"] += 1;
    }
  }

  // Visual Reference scoring
  if (context.visualReference) {
    if (context.visualReference.includes("apple")) {
      scores["calm-professional"] += 2;
    }
    if (context.visualReference.includes("linear") || context.visualReference.includes("vercel")) {
      scores["soft-intelligent"] += 2;
    }
    if (context.visualReference.includes("stripe")) {
      scores["calm-professional"] += 1;
      scores["soft-intelligent"] += 1;
    }
    if (context.visualReference.includes("original")) {
      scores["experimental-premium"] += 2;
    }
  }

  return scores;
}

/**
 * Get recommended direction based on context
 */
export function getRecommendedDirection(context: RecommendationContext): string | null {
  const scores = calculateDirectionScores(context);
  const maxScore = Math.max(...Object.values(scores));
  
  if (maxScore === 0) return null;
  
  const winner = Object.entries(scores).find(([_, score]) => score === maxScore);
  return winner ? winner[0] : null;
}
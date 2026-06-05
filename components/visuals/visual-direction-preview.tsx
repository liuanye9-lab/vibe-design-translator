// ============================================================
// Vibe Design Translator - Visual Direction Preview
// ============================================================
// Generates original CSS/SVG previews for design directions
// No external images - pure CSS/SVG/div layouts
// Supports locale-aware titles and animations

"use client";

import React from "react";
import type { Locale } from "@/lib/i18n/types";

interface VisualDirectionPreviewProps {
  directionId: string;
  locale?: Locale;
  animated?: boolean;
  title?: string;
  explanation?: string;
  className?: string;
}

export function VisualDirectionPreview({
  directionId,
  locale = "zh",
  animated = true,
  title,
  explanation,
  className = "",
}: VisualDirectionPreviewProps) {
  const isZh = locale === "zh";

  const renderPreview = () => {
    switch (directionId) {
      case "calm-professional":
        return <CalmProfessionalPreview animated={animated} />;
      case "soft-intelligent":
        return <SoftIntelligentPreview animated={animated} />;
      case "experimental-premium":
        return <ExperimentalPremiumPreview animated={animated} />;
      default:
        return <DefaultPreview />;
    }
  };

  const defaultTitle = isZh
    ? directionId === "calm-professional"
      ? "冷静专业型"
      : directionId === "soft-intelligent"
      ? "柔和智能型"
      : "实验高级型"
    : directionId === "calm-professional"
    ? "Calm Professional"
    : directionId === "soft-intelligent"
    ? "Soft Intelligent"
    : "Experimental Premium";

  const defaultExplanation = isZh
    ? directionId === "calm-professional"
      ? "稳定、可信、权威。适合企业软件、金融服务、B2B SaaS。"
      : directionId === "soft-intelligent"
      ? "平易近人 yet 前沿。适合 AI/ML 产品、开发者工具。"
      : "大胆、创新、高端。适合创意机构、时尚品牌。"
    : directionId === "calm-professional"
    ? "Stable, trustworthy, and authoritative. Ideal for enterprise software."
    : directionId === "soft-intelligent"
    ? "Approachable yet cutting-edge. Ideal for AI/ML products."
    : "Bold, innovative, and high-end. Ideal for creative agencies.";

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      {(title || explanation) && (
        <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-700">
            {title || defaultTitle}
          </h4>
          {(explanation || defaultExplanation) && (
            <p className="text-xs text-gray-500 mt-1">
              {explanation || defaultExplanation}
            </p>
          )}
        </div>
      )}
      <div className="p-4">{renderPreview()}</div>
    </div>
  );
}

// Calm Professional: Low saturation, structured, enterprise feel
function CalmProfessionalPreview({ animated }: { animated: boolean }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className={`w-20 h-4 bg-blue-900/80 rounded ${animated ? "animate-pulse" : ""}`}></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/10 to-slate-900/5 rounded-lg p-4">
        <div className={`w-32 h-5 bg-blue-900/70 rounded mb-2 ${animated ? "animate-pulse" : ""}`}></div>
        <div className="w-48 h-3 bg-blue-800/40 rounded mb-3"></div>
        <div className={`w-24 h-6 bg-blue-700 rounded-md ${animated ? "animate-pulse" : ""}`}></div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`bg-white/80 border border-blue-100 rounded p-2 ${
              animated ? "hover:shadow-md transition-shadow duration-300" : ""
            }`}
          >
            <div className="w-8 h-8 bg-blue-100 rounded mb-1"></div>
            <div className="w-16 h-2 bg-blue-900/30 rounded mb-1"></div>
            <div className="w-12 h-2 bg-blue-900/20 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Soft Intelligent: Warm white, soft glass, light cards
function SoftIntelligentPreview({ animated }: { animated: boolean }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className={`w-20 h-4 bg-amber-800/70 rounded ${animated ? "animate-pulse" : ""}`}></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-amber-700/50 rounded"></div>
          <div className="w-12 h-3 bg-amber-700/50 rounded"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 rounded-lg p-4 backdrop-blur-sm">
        <div className={`w-36 h-5 bg-amber-800/60 rounded mb-2 ${animated ? "animate-pulse" : ""}`}></div>
        <div className="w-44 h-3 bg-amber-700/30 rounded mb-3"></div>
        <div className={`w-28 h-6 bg-amber-600 rounded-md ${animated ? "animate-pulse" : ""}`}></div>
      </div>

      {/* Glass Cards */}
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`bg-white/60 backdrop-blur-sm border border-amber-200/50 rounded-lg p-3 shadow-sm ${
              animated ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" : ""
            }`}
          >
            <div className="w-6 h-6 bg-amber-200 rounded-full mb-2"></div>
            <div className="w-20 h-2 bg-amber-800/30 rounded mb-1"></div>
            <div className="w-16 h-2 bg-amber-800/20 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Experimental Premium: Dark, Bento, abstract depth
function ExperimentalPremiumPreview({ animated }: { animated: boolean }) {
  return (
    <div className="space-y-3 bg-gray-900 rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className={`w-20 h-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded ${animated ? "animate-pulse" : ""}`}></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 rounded-lg p-4 border border-violet-500/20 ${
        animated ? "hover:border-violet-500/40 transition-colors duration-300" : ""
      }`}>
        <div className={`w-36 h-5 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded mb-2 ${animated ? "animate-pulse" : ""}`}></div>
        <div className="w-44 h-3 bg-gray-600 rounded mb-3"></div>
        <div className={`w-28 h-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md ${animated ? "animate-pulse" : ""}`}></div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <div className={`col-span-2 bg-gray-800/80 rounded-lg p-3 border border-gray-700 ${
          animated ? "hover:border-violet-500/30 transition-colors duration-300" : ""
        }`}>
          <div className="w-8 h-8 bg-violet-500/30 rounded-lg mb-2"></div>
          <div className="w-20 h-2 bg-gray-500 rounded"></div>
        </div>
        <div className={`row-span-2 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 rounded-lg p-3 border border-violet-500/20 ${
          animated ? "hover:border-violet-500/40 transition-colors duration-300" : ""
        }`}>
          <div className="w-6 h-6 bg-fuchsia-500/30 rounded-full mb-2"></div>
          <div className="w-16 h-2 bg-gray-600 rounded mb-1"></div>
          <div className="w-12 h-2 bg-gray-700 rounded"></div>
        </div>
        <div className={`bg-gray-800/80 rounded-lg p-2 border border-gray-700 ${
          animated ? "hover:border-violet-500/30 transition-colors duration-300" : ""
        }`}>
          <div className="w-12 h-2 bg-gray-500 rounded"></div>
        </div>
        <div className={`bg-gray-800/80 rounded-lg p-2 border border-gray-700 ${
          animated ? "hover:border-violet-500/30 transition-colors duration-300" : ""
        }`}>
          <div className="w-12 h-2 bg-gray-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function DefaultPreview() {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-2"></div>
      <div className="w-24 h-3 bg-gray-300 rounded mx-auto"></div>
    </div>
  );
}

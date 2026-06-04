// ============================================================
// Vibe Design Translator - Visual Direction Preview
// ============================================================
// Generates original CSS/SVG previews for design directions
// No external images - pure CSS/SVG/div layouts

"use client";

import React from "react";

interface VisualDirectionPreviewProps {
  directionId: string;
  title?: string;
  explanation?: string;
  className?: string;
}

export function VisualDirectionPreview({
  directionId,
  title,
  explanation,
  className = "",
}: VisualDirectionPreviewProps) {
  const renderPreview = () => {
    switch (directionId) {
      case "calm-professional":
        return <CalmProfessionalPreview />;
      case "soft-intelligent":
        return <SoftIntelligentPreview />;
      case "experimental-premium":
        return <ExperimentalPremiumPreview />;
      default:
        return <DefaultPreview />;
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-4 py-2 bg-white/50 backdrop-blur-sm border-b border-gray-100">
          <h4 className="text-sm font-medium text-gray-700">{title}</h4>
          {explanation && (
            <p className="text-xs text-gray-500 mt-1">{explanation}</p>
          )}
        </div>
      )}
      <div className="p-4">{renderPreview()}</div>
    </div>
  );
}

// Calm Professional: Low saturation, structured, enterprise feel
function CalmProfessionalPreview() {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-20 h-4 bg-blue-900/80 rounded"></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
          <div className="w-12 h-3 bg-blue-800/60 rounded"></div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900/10 to-slate-900/5 rounded-lg p-4">
        <div className="w-32 h-5 bg-blue-900/70 rounded mb-2"></div>
        <div className="w-48 h-3 bg-blue-800/40 rounded mb-3"></div>
        <div className="w-24 h-6 bg-blue-700 rounded-md"></div>
      </div>
      
      {/* Grid Section */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/80 border border-blue-100 rounded p-2">
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
function SoftIntelligentPreview() {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-20 h-4 bg-amber-800/70 rounded"></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-amber-700/50 rounded"></div>
          <div className="w-12 h-3 bg-amber-700/50 rounded"></div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/40 rounded-lg p-4 backdrop-blur-sm">
        <div className="w-36 h-5 bg-amber-800/60 rounded mb-2"></div>
        <div className="w-44 h-3 bg-amber-700/30 rounded mb-3"></div>
        <div className="w-28 h-6 bg-amber-600 rounded-md"></div>
      </div>
      
      {/* Glass Cards */}
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="bg-white/60 backdrop-blur-sm border border-amber-200/50 rounded-lg p-3 shadow-sm"
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
function ExperimentalPremiumPreview() {
  return (
    <div className="space-y-3 bg-gray-900 rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="w-20 h-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded"></div>
        <div className="flex gap-2">
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 rounded-lg p-4 border border-violet-500/20">
        <div className="w-36 h-5 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded mb-2"></div>
        <div className="w-44 h-3 bg-gray-600 rounded mb-3"></div>
        <div className="w-28 h-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md"></div>
      </div>
      
      {/* Bento Grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <div className="col-span-2 bg-gray-800/80 rounded-lg p-3 border border-gray-700">
          <div className="w-8 h-8 bg-violet-500/30 rounded-lg mb-2"></div>
          <div className="w-20 h-2 bg-gray-500 rounded"></div>
        </div>
        <div className="row-span-2 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/5 rounded-lg p-3 border border-violet-500/20">
          <div className="w-6 h-6 bg-fuchsia-500/30 rounded-full mb-2"></div>
          <div className="w-16 h-2 bg-gray-600 rounded mb-1"></div>
          <div className="w-12 h-2 bg-gray-700 rounded"></div>
        </div>
        <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700">
          <div className="w-12 h-2 bg-gray-500 rounded"></div>
        </div>
        <div className="bg-gray-800/80 rounded-lg p-2 border border-gray-700">
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
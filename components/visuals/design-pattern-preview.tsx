// ============================================================
// Vibe Design Translator - Design Pattern Preview
// ============================================================
// Generates small original previews for design patterns
// No external images - pure CSS/SVG/div layouts

"use client";

import React from "react";

interface DesignPatternPreviewProps {
  patternId: string;
  animated?: boolean;
  title?: string;
  explanation?: string;
  className?: string;
}

export function DesignPatternPreview({
  patternId,
  animated = true,
  title,
  explanation,
  className = "",
}: DesignPatternPreviewProps) {
  const renderPreview = () => {
    switch (patternId) {
      case "p1": // Intentional White Space
        return <WhiteSpacePreview />;
      case "p2": // Asymmetric Grid
        return <AsymmetricGridPreview />;
      case "p3": // Dark Liquid Hero
        return <DarkLiquidHeroPreview />;
      case "p4": // Soft Glass Navigation
        return <SoftGlassNavPreview />;
      case "p5": // Bento Feature Grid
        return <BentoGridPreview />;
      case "p6": // Minimal Pricing Section
        return <MinimalPricingPreview />;
      case "p7": // Agent Workflow Timeline
        return <AgentTimelinePreview />;
      case "p8": // AI Prompt Editor Panel
        return <PromptEditorPreview />;
      case "p9": // Data Visualization Dashboard
        return <DashboardPreview />;
      case "p10": // Testimonial Carousel
        return <TestimonialPreview />;
      case "p11": // Feature Comparison Table
        return <ComparisonTablePreview />;
      case "p12": // Onboarding Flow
        return <OnboardingPreview />;
      default:
        return <DefaultPatternPreview />;
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden ${animated ? "motion-preview" : ""} ${className}`}
      data-pattern-id={patternId}
      data-running={animated ? "true" : "false"}
    >
      {title && (
        <div className="px-3 py-2 bg-white/50 backdrop-blur-sm border-b border-gray-100">
          <h4 className="text-xs font-medium text-gray-700">{title}</h4>
          {explanation && (
            <p className="text-[10px] text-gray-500 mt-0.5">{explanation}</p>
          )}
        </div>
      )}
      <div className="p-3">{renderPreview()}</div>
    </div>
  );
}

// P1: Intentional White Space
function WhiteSpacePreview() {
  return (
    <div className="space-y-4">
      <div className="w-16 h-3 bg-gray-800 rounded"></div>
      <div className="h-8"></div>
      <div className="w-32 h-4 bg-gray-700 rounded"></div>
      <div className="h-6"></div>
      <div className="w-24 h-6 bg-gray-600 rounded-md"></div>
      <div className="h-8"></div>
      <div className="w-full h-2 bg-gray-200 rounded"></div>
    </div>
  );
}

// P2: Asymmetric Grid
function AsymmetricGridPreview() {
  return (
    <div className="grid grid-cols-3 gap-2 h-24">
      <div className="col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2">
        <div className="w-12 h-2 bg-blue-400 rounded mb-1"></div>
        <div className="w-8 h-2 bg-blue-300 rounded"></div>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2">
        <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-2">
        <div className="w-8 h-2 bg-green-400 rounded"></div>
      </div>
      <div className="col-span-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-2">
        <div className="w-20 h-2 bg-orange-400 rounded mb-1"></div>
        <div className="w-16 h-2 bg-orange-300 rounded"></div>
      </div>
    </div>
  );
}

// P3: Dark Liquid Hero
function DarkLiquidHeroPreview() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 rounded-lg p-3 relative overflow-hidden">
      {/* Liquid gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="w-24 h-4 bg-gradient-to-r from-violet-300 to-fuchsia-300 rounded mb-2"></div>
        <div className="w-32 h-2 bg-gray-500 rounded mb-3"></div>
        <div className="w-20 h-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md"></div>
      </div>
    </div>
  );
}

// P4: Soft Glass Navigation
function SoftGlassNavPreview() {
  return (
    <div className="space-y-2">
      <div className="bg-white/60 backdrop-blur-md rounded-xl p-2 border border-white/20 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="w-12 h-3 bg-gray-700 rounded"></div>
          <div className="flex gap-1">
            <div className="w-8 h-2 bg-gray-400 rounded"></div>
            <div className="w-8 h-2 bg-gray-400 rounded"></div>
            <div className="w-8 h-2 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
      <div className="h-16 bg-gradient-to-b from-blue-50/50 to-transparent rounded-lg"></div>
    </div>
  );
}

// P5: Bento Feature Grid
function BentoGridPreview() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-1.5 h-24">
      <div className="col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-2">
        <div className="w-6 h-6 bg-indigo-200 rounded-lg mb-1"></div>
        <div className="w-16 h-2 bg-indigo-400 rounded"></div>
      </div>
      <div className="row-span-2 bg-gradient-to-b from-violet-50 to-purple-50 rounded-lg p-2">
        <div className="w-5 h-5 bg-violet-200 rounded-full mb-1"></div>
        <div className="w-12 h-2 bg-violet-300 rounded"></div>
      </div>
      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-1.5">
        <div className="w-8 h-2 bg-cyan-400 rounded"></div>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-1.5">
        <div className="w-8 h-2 bg-emerald-400 rounded"></div>
      </div>
    </div>
  );
}

// P6: Minimal Pricing Section
function MinimalPricingPreview() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {["Basic", "Pro", "Team"].map((plan, i) => (
        <div 
          key={plan}
          className={`rounded-lg p-2 border ${
            i === 1 
              ? "border-blue-300 bg-blue-50" 
              : "border-gray-200 bg-white"
          }`}
        >
          <div className={`w-8 h-2 rounded mb-1 ${
            i === 1 ? "bg-blue-500" : "bg-gray-400"
          }`}></div>
          <div className={`w-12 h-3 font-bold rounded mb-1 ${
            i === 1 ? "bg-blue-600" : "bg-gray-600"
          }`}></div>
          <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
          <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
          <div className="w-full h-1 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// P7: Agent Workflow Timeline
function AgentTimelinePreview() {
  return (
    <div className="space-y-1.5">
      {["Step 1", "Step 2", "Step 3"].map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
            i < 2 ? "bg-green-500" : "bg-gray-300"
          }`}>
            {i < 2 && (
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className={`flex-1 h-3 rounded ${
            i < 2 ? "bg-green-100" : "bg-gray-100"
          }`}></div>
          <div className={`w-12 h-2 rounded ${
            i < 2 ? "bg-green-400" : "bg-gray-400"
          }`}></div>
        </div>
      ))}
    </div>
  );
}

// P8: AI Prompt Editor Panel
function PromptEditorPreview() {
  return (
    <div className="bg-gray-900 rounded-lg p-2">
      <div className="flex items-center gap-1 mb-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="flex-1"></div>
        <div className="w-8 h-2 bg-gray-700 rounded"></div>
      </div>
      <div className="space-y-1">
        <div className="w-20 h-2 bg-purple-400 rounded"></div>
        <div className="w-32 h-2 bg-gray-600 rounded"></div>
        <div className="w-24 h-2 bg-blue-400 rounded"></div>
        <div className="w-28 h-2 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
}

// P9: Data Visualization Dashboard
function DashboardPreview() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-white rounded-lg p-2 border border-gray-100">
        <div className="w-8 h-2 bg-gray-400 rounded mb-1"></div>
        <div className="flex items-end gap-0.5 h-8">
          {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg p-2 border border-gray-100">
        <div className="w-8 h-2 bg-gray-400 rounded mb-1"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full"></div>
      </div>
    </div>
  );
}

// P10: Testimonial Carousel
function TestimonialPreview() {
  return (
    <div className="space-y-2">
      {[1, 2].map((i) => (
        <div key={i} className="bg-white rounded-lg p-2 border border-gray-100">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
            <div>
              <div className="w-12 h-2 bg-gray-600 rounded"></div>
              <div className="w-8 h-1.5 bg-gray-400 rounded mt-0.5"></div>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded mb-0.5"></div>
          <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

// P11: Feature Comparison Table
function ComparisonTablePreview() {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-3 text-center">
        <div className="p-1.5 bg-gray-50 border-b border-r border-gray-100">
          <div className="w-8 h-2 bg-gray-400 rounded mx-auto"></div>
        </div>
        <div className="p-1.5 bg-gray-50 border-b border-r border-gray-100">
          <div className="w-8 h-2 bg-blue-400 rounded mx-auto"></div>
        </div>
        <div className="p-1.5 bg-gray-50 border-b border-gray-100">
          <div className="w-8 h-2 bg-purple-400 rounded mx-auto"></div>
        </div>
        {[1, 2, 3].map((row) => (
          <React.Fragment key={row}>
            <div className="p-1 border-b border-r border-gray-100">
              <div className="w-10 h-2 bg-gray-300 rounded mx-auto"></div>
            </div>
            <div className="p-1 border-b border-r border-gray-100">
              <div className="w-4 h-4 bg-green-200 rounded-full mx-auto"></div>
            </div>
            <div className="p-1 border-b border-gray-100">
              <div className="w-4 h-4 bg-green-200 rounded-full mx-auto"></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// P12: Onboarding Flow
function OnboardingPreview() {
  return (
    <div className="space-y-2">
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${
            i === 1 ? "bg-blue-500" : "bg-gray-300"
          }`}></div>
        ))}
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 text-center">
        <div className="w-10 h-10 bg-blue-200 rounded-full mx-auto mb-2"></div>
        <div className="w-20 h-3 bg-blue-400 rounded mx-auto mb-1"></div>
        <div className="w-28 h-2 bg-blue-300 rounded mx-auto mb-2"></div>
        <div className="w-16 h-4 bg-blue-500 rounded-md mx-auto"></div>
      </div>
    </div>
  );
}

function DefaultPatternPreview() {
  return (
    <div className="bg-gray-100 rounded-lg p-3 text-center">
      <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto mb-1"></div>
      <div className="w-16 h-2 bg-gray-300 rounded mx-auto"></div>
    </div>
  );
}

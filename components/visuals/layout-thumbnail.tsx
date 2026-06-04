// ============================================================
// Vibe Design Translator - Layout Thumbnail
// ============================================================
// Draws page structure thumbnails using CSS
// No external images - pure CSS/SVG/div layouts

"use client";

import React from "react";

interface LayoutThumbnailProps {
  layoutType: string;
  title?: string;
  explanation?: string;
  className?: string;
}

export function LayoutThumbnail({
  layoutType,
  title,
  explanation,
  className = "",
}: LayoutThumbnailProps) {
  const renderLayout = () => {
    switch (layoutType) {
      case "hero":
        return <HeroLayout />;
      case "feature-grid":
        return <FeatureGridLayout />;
      case "pricing":
        return <PricingLayout />;
      case "dashboard":
        return <DashboardLayout />;
      case "prompt-editor":
        return <PromptEditorLayout />;
      case "diagnosis-panel":
        return <DiagnosisPanelLayout />;
      case "timeline":
        return <TimelineLayout />;
      case "form":
        return <FormLayout />;
      default:
        return <DefaultLayout />;
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      {title && (
        <div className="px-3 py-2 bg-white/50 backdrop-blur-sm border-b border-gray-100">
          <h4 className="text-xs font-medium text-gray-700">{title}</h4>
          {explanation && (
            <p className="text-[10px] text-gray-500 mt-0.5">{explanation}</p>
          )}
        </div>
      )}
      <div className="p-3 bg-gray-50">{renderLayout()}</div>
    </div>
  );
}

// Hero Section Layout
function HeroLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between p-2 border-b border-gray-100">
        <div className="w-8 h-2 bg-gray-600 rounded"></div>
        <div className="flex gap-1">
          <div className="w-6 h-1.5 bg-gray-400 rounded"></div>
          <div className="w-6 h-1.5 bg-gray-400 rounded"></div>
          <div className="w-6 h-1.5 bg-gray-400 rounded"></div>
        </div>
      </div>
      {/* Hero */}
      <div className="p-4 text-center">
        <div className="w-24 h-3 bg-gray-700 rounded mx-auto mb-2"></div>
        <div className="w-32 h-2 bg-gray-400 rounded mx-auto mb-3"></div>
        <div className="w-16 h-4 bg-blue-500 rounded-md mx-auto"></div>
      </div>
    </div>
  );
}

// Feature Grid Layout
function FeatureGridLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="w-20 h-3 bg-gray-600 rounded mx-auto mb-3"></div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-50 rounded p-2 border border-gray-100">
            <div className="w-6 h-6 bg-gray-200 rounded mb-1"></div>
            <div className="w-12 h-2 bg-gray-400 rounded mb-0.5"></div>
            <div className="w-8 h-1.5 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pricing Layout
function PricingLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="w-24 h-3 bg-gray-600 rounded mx-auto mb-3"></div>
      <div className="grid grid-cols-3 gap-2">
        {["Basic", "Pro", "Enterprise"].map((plan, i) => (
          <div 
            key={plan}
            className={`rounded-lg p-2 border ${
              i === 1 
                ? "border-blue-300 bg-blue-50" 
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className={`w-10 h-2 rounded mb-1 ${
              i === 1 ? "bg-blue-500" : "bg-gray-500"
            }`}></div>
            <div className={`w-14 h-4 rounded mb-2 ${
              i === 1 ? "bg-blue-600" : "bg-gray-600"
            }`}></div>
            <div className="space-y-1 mb-2">
              {[1, 2, 3].map((f) => (
                <div key={f} className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-12 h-1.5 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
            <div className={`w-full h-4 rounded ${
              i === 1 ? "bg-blue-500" : "bg-gray-400"
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard Layout
function DashboardLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div className="flex">
        <div className="w-16 bg-gray-900 p-2 space-y-2">
          <div className="w-8 h-2 bg-gray-600 rounded"></div>
          <div className="space-y-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-1.5 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="w-16 h-2 bg-gray-600 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 rounded p-1.5 border border-gray-100">
                <div className="w-8 h-1.5 bg-gray-400 rounded mb-1"></div>
                <div className="w-12 h-3 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded p-2 border border-gray-100">
            <div className="flex items-end gap-0.5 h-12">
              {[30, 50, 40, 70, 45, 60, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-200 rounded-t" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prompt Editor Layout
function PromptEditorLayout() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-1 p-2 bg-gray-800">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="flex-1"></div>
        <div className="w-12 h-2 bg-gray-700 rounded"></div>
      </div>
      {/* Editor */}
      <div className="p-3">
        <div className="flex gap-2">
          {/* Line numbers */}
          <div className="space-y-1 text-right">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="w-4 h-2 bg-gray-700 rounded"></div>
            ))}
          </div>
          {/* Code */}
          <div className="flex-1 space-y-1">
            <div className="w-20 h-2 bg-purple-400 rounded"></div>
            <div className="w-28 h-2 bg-gray-600 rounded"></div>
            <div className="w-24 h-2 bg-blue-400 rounded"></div>
            <div className="w-16 h-2 bg-green-400 rounded"></div>
            <div className="w-20 h-2 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Diagnosis Panel Layout
function DiagnosisPanelLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex gap-3">
        {/* Screenshot preview */}
        <div className="w-20 h-24 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
        {/* Diagnosis results */}
        <div className="flex-1 space-y-2">
          <div className="w-16 h-3 bg-gray-600 rounded"></div>
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-12 h-1.5 bg-gray-400 rounded"></div>
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-6 h-1.5 bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
          <div className="w-full h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Timeline Layout
function TimelineLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                i <= 2 ? "bg-green-500" : "bg-gray-300"
              }`}></div>
              {i < 4 && <div className="w-0.5 h-6 bg-gray-200"></div>}
            </div>
            <div className="flex-1 pb-2">
              <div className="w-16 h-2 bg-gray-600 rounded mb-0.5"></div>
              <div className="w-24 h-1.5 bg-gray-400 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Form Layout
function FormLayout() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="w-20 h-3 bg-gray-600 rounded mb-3"></div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="w-12 h-2 bg-gray-500 rounded mb-1"></div>
            <div className="w-full h-5 bg-gray-100 rounded border border-gray-200"></div>
          </div>
        ))}
        <div className="w-16 h-5 bg-blue-500 rounded-md mt-2"></div>
      </div>
    </div>
  );
}

function DefaultLayout() {
  return (
    <div className="bg-gray-100 rounded-lg p-3 text-center">
      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-1"></div>
      <div className="w-20 h-2 bg-gray-300 rounded mx-auto"></div>
    </div>
  );
}
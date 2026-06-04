// ============================================================
// Vibe Design Translator - Diagnosis Before/After
// ============================================================
// Shows before/after visualization for diagnosis results
// No external images - abstract wireframes

"use client";

import React from "react";

interface DiagnosisBeforeAfterProps {
  findings?: string[];
  fixes?: string[];
  className?: string;
}

export function DiagnosisBeforeAfter({
  findings = [],
  fixes = [],
  className = "",
}: DiagnosisBeforeAfterProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {/* Before */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <span className="text-xs font-medium text-red-600">当前问题</span>
        </div>
        <div className="bg-red-50/50 rounded-lg p-3 border border-red-100">
          <BeforeLayout issues={findings} />
        </div>
      </div>

      {/* After */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xs font-medium text-green-600">修复方向</span>
        </div>
        <div className="bg-green-50/50 rounded-lg p-3 border border-green-100">
          <AfterLayout fixes={fixes} />
        </div>
      </div>
    </div>
  );
}

// Before: Issues visualization
function BeforeLayout({ issues }: { issues: string[] }) {
  return (
    <div className="space-y-2">
      {/* Cluttered layout */}
      <div className="bg-white rounded p-2 border border-red-200">
        <div className="flex items-center justify-between mb-1">
          <div className="w-12 h-2 bg-gray-400 rounded"></div>
          <div className="flex gap-0.5">
            <div className="w-4 h-1.5 bg-gray-400 rounded"></div>
            <div className="w-4 h-1.5 bg-gray-400 rounded"></div>
            <div className="w-4 h-1.5 bg-gray-400 rounded"></div>
          </div>
        </div>
        {/* Too much content, no breathing room */}
        <div className="space-y-1">
          <div className="w-full h-2 bg-gray-300 rounded"></div>
          <div className="w-full h-2 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
        </div>
        {/* Crowded buttons */}
        <div className="flex gap-1 mt-1">
          <div className="flex-1 h-3 bg-gray-400 rounded"></div>
          <div className="flex-1 h-3 bg-gray-400 rounded"></div>
          <div className="flex-1 h-3 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Generic gradients */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded p-2">
        <div className="w-20 h-2 bg-white/50 rounded mb-1"></div>
        <div className="w-16 h-1.5 bg-white/30 rounded"></div>
      </div>

      {/* Issues list */}
      {issues.length > 0 && (
        <div className="space-y-1">
          {issues.slice(0, 3).map((issue, i) => (
            <div key={i} className="flex items-start gap-1">
              <div className="w-3 h-3 bg-red-200 rounded-full mt-0.5 flex-shrink-0"></div>
              <div className="w-full h-2 bg-red-100 rounded"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// After: Fixes visualization
function AfterLayout({ fixes }: { fixes: string[] }) {
  return (
    <div className="space-y-2">
      {/* Clean, spacious layout */}
      <div className="bg-white rounded p-3 border border-green-200">
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-2 bg-gray-700 rounded"></div>
          <div className="flex gap-2">
            <div className="w-6 h-1.5 bg-gray-500 rounded"></div>
            <div className="w-6 h-1.5 bg-gray-500 rounded"></div>
          </div>
        </div>
        {/* Breathing room */}
        <div className="h-2"></div>
        <div className="space-y-1.5">
          <div className="w-24 h-2 bg-gray-600 rounded"></div>
          <div className="w-32 h-1.5 bg-gray-400 rounded"></div>
        </div>
        {/* Single focused CTA */}
        <div className="h-2"></div>
        <div className="w-20 h-4 bg-blue-500 rounded-md"></div>
      </div>

      {/* Subtle, controlled colors */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded p-2 border border-gray-200">
        <div className="w-20 h-2 bg-gray-700 rounded mb-1"></div>
        <div className="w-16 h-1.5 bg-gray-500 rounded"></div>
      </div>

      {/* Fixes list */}
      {fixes.length > 0 && (
        <div className="space-y-1">
          {fixes.slice(0, 3).map((fix, i) => (
            <div key={i} className="flex items-start gap-1">
              <div className="w-3 h-3 bg-green-200 rounded-full mt-0.5 flex-shrink-0"></div>
              <div className="w-full h-2 bg-green-100 rounded"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
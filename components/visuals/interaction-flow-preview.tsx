// ============================================================
// Vibe Design Translator - Interaction Flow Preview
// ============================================================
// Shows interaction step flows
// No external images - pure CSS animations and layouts

"use client";

import React from "react";

interface InteractionFlowPreviewProps {
  flowType?: string;
  title?: string;
  explanation?: string;
  className?: string;
}

export function InteractionFlowPreview({
  flowType = "default",
  title,
  explanation,
  className = "",
}: InteractionFlowPreviewProps) {
  const renderFlow = () => {
    switch (flowType) {
      case "hover":
        return <HoverFlow />;
      case "scroll-reveal":
        return <ScrollRevealFlow />;
      case "cta":
        return <CTAFlow />;
      case "prompt-compile":
        return <PromptCompileFlow />;
      case "diagnosis":
        return <DiagnosisFlow />;
      default:
        return <DefaultFlow />;
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
      <div className="p-3 bg-gray-50">{renderFlow()}</div>
    </div>
  );
}

// Hover interaction flow
function HoverFlow() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 mb-1">Hover 状态变化</div>
      <div className="flex gap-2">
        {/* Default state */}
        <div className="flex-1">
          <div className="text-[9px] text-gray-400 mb-1">默认</div>
          <div className="bg-white rounded-lg p-2 border border-gray-200">
            <div className="w-full h-3 bg-gray-200 rounded mb-1"></div>
            <div className="w-3/4 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        {/* Hover state */}
        <div className="flex-1">
          <div className="text-[9px] text-blue-500 mb-1">Hover</div>
          <div className="bg-white rounded-lg p-2 border border-blue-300 shadow-sm shadow-blue-100">
            <div className="w-full h-3 bg-blue-100 rounded mb-1"></div>
            <div className="w-3/4 h-2 bg-blue-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Scroll reveal flow
function ScrollRevealFlow() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 mb-1">滚动渐显</div>
      <div className="relative">
        {/* Scroll indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-4">
          <div className="w-1 h-8 bg-gray-300 rounded-full mx-auto"></div>
        </div>
        {/* Content blocks */}
        <div className="space-y-1.5 pr-6">
          {[
            { opacity: 100, translateY: 0 },
            { opacity: 70, translateY: 2 },
            { opacity: 40, translateY: 4 },
            { opacity: 10, translateY: 6 },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded p-2 border border-gray-200 transition-all"
              style={{
                opacity: item.opacity / 100,
                transform: `translateY(${item.translateY}px)`,
              }}
            >
              <div className="w-20 h-2 bg-gray-400 rounded mb-1"></div>
              <div className="w-28 h-1.5 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CTA interaction flow
function CTAFlow() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 mb-1">CTA 交互流程</div>
      <div className="flex items-center gap-2">
        {/* Normal */}
        <div className="text-center">
          <div className="w-16 h-6 bg-blue-500 rounded-md mb-1"></div>
          <div className="text-[9px] text-gray-400">默认</div>
        </div>
        {/* Arrow */}
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {/* Hover */}
        <div className="text-center">
          <div className="w-16 h-6 bg-blue-600 rounded-md mb-1 shadow-sm shadow-blue-200"></div>
          <div className="text-[9px] text-blue-500">Hover</div>
        </div>
        {/* Arrow */}
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {/* Active */}
        <div className="text-center">
          <div className="w-16 h-6 bg-blue-700 rounded-md mb-1 scale-95"></div>
          <div className="text-[9px] text-blue-600">点击</div>
        </div>
        {/* Arrow */}
        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {/* Loading */}
        <div className="text-center">
          <div className="w-16 h-6 bg-blue-200 rounded-md mb-1 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-[9px] text-blue-400">加载</div>
        </div>
      </div>
    </div>
  );
}

// Prompt compile flow
function PromptCompileFlow() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 mb-1">Prompt 编译流程</div>
      <div className="space-y-1.5">
        {[
          { label: "设计 Brief", status: "done", icon: "✓" },
          { label: "方向选择", status: "done", icon: "✓" },
          { label: "执行包生成", status: "active", icon: "..." },
          { label: "Prompt 编译", status: "pending", icon: "" },
          { label: "导出使用", status: "pending", icon: "" },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step.status === "done"
                ? "bg-green-500 text-white"
                : step.status === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-400"
            }`}>
              {step.icon}
            </div>
            <div className={`flex-1 h-3 rounded ${
              step.status === "done"
                ? "bg-green-100"
                : step.status === "active"
                ? "bg-blue-100"
                : "bg-gray-100"
            }`}>
              <div className="w-16 h-full flex items-center px-1.5">
                <span className="text-[9px] text-gray-600">{step.label}</span>
              </div>
            </div>
            {step.status === "active" && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Diagnosis flow
function DiagnosisFlow() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 mb-1">诊断流程</div>
      <div className="bg-white rounded-lg p-2 border border-gray-200">
        <div className="flex items-center gap-3">
          {/* Upload */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <span className="text-[8px] text-gray-400 mt-0.5">上传</span>
          </div>
          {/* Arrow */}
          <div className="flex-1 h-px bg-gray-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></div>
          </div>
          {/* Analyze */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-[8px] text-blue-500 mt-0.5">分析</span>
          </div>
          {/* Arrow */}
          <div className="flex-1 h-px bg-gray-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-300 rotate-45"></div>
          </div>
          {/* Report */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[8px] text-green-500 mt-0.5">报告</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultFlow() {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          {i < 3 && (
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
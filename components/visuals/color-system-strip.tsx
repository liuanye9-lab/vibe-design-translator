// ============================================================
// Vibe Design Translator - Color System Strip
// ============================================================
// Displays color system for design directions
// No external images - pure CSS color swatches

"use client";

import React from "react";

interface ColorSystemStripProps {
  directionId: string;
  title?: string;
  explanation?: string;
  className?: string;
}

export function ColorSystemStrip({
  directionId,
  title,
  explanation,
  className = "",
}: ColorSystemStripProps) {
  const colorSystems: Record<string, Array<{ name: string; hex: string; usage: string }>> = {
    "calm-professional": [
      { name: "Primary", hex: "#1e3a5f", usage: "标题、强调" },
      { name: "Secondary", hex: "#4a6fa5", usage: "次要元素" },
      { name: "Accent", hex: "#6b8cae", usage: "交互、链接" },
      { name: "Background", hex: "#f8fafc", usage: "页面背景" },
      { name: "Surface", hex: "#ffffff", usage: "卡片、面板" },
      { name: "Text", hex: "#1a1a2e", usage: "正文文字" },
      { name: "Muted", hex: "#94a3b8", usage: "次要文字" },
    ],
    "soft-intelligent": [
      { name: "Primary", hex: "#92400e", usage: "标题、强调" },
      { name: "Secondary", hex: "#b45309", usage: "次要元素" },
      { name: "Accent", hex: "#d97706", usage: "交互、链接" },
      { name: "Background", hex: "#fffbeb", usage: "页面背景" },
      { name: "Surface", hex: "#fef3c7", usage: "卡片、面板" },
      { name: "Text", hex: "#1c1917", usage: "正文文字" },
      { name: "Muted", hex: "#a8a29e", usage: "次要文字" },
    ],
    "experimental-premium": [
      { name: "Primary", hex: "#7c3aed", usage: "标题、强调" },
      { name: "Secondary", hex: "#a855f7", usage: "次要元素" },
      { name: "Accent", hex: "#d946ef", usage: "交互、链接" },
      { name: "Background", hex: "#0f0f23", usage: "页面背景" },
      { name: "Surface", hex: "#1a1a2e", usage: "卡片、面板" },
      { name: "Text", hex: "#f8fafc", usage: "正文文字" },
      { name: "Muted", hex: "#64748b", usage: "次要文字" },
    ],
  };

  const colors = colorSystems[directionId] || colorSystems["calm-professional"];

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
      <div className="p-3">
        <div className="flex gap-1.5 flex-wrap">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-1">
              <div
                className="w-10 h-10 rounded-lg shadow-sm border border-gray-200/50"
                style={{ backgroundColor: color.hex }}
              />
              <div className="text-center">
                <div className="text-[9px] font-medium text-gray-700">{color.name}</div>
                <div className="text-[8px] text-gray-500 font-mono">{color.hex}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient preview */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-[10px] text-gray-500 mb-1.5">渐变预览</div>
          <div 
            className="h-8 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${colors[0].hex} 0%, ${colors[2].hex} 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
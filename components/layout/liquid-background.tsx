// ============================================================
// Vibe Design Translator - Liquid Background Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";

interface LiquidBackgroundProps {
  className?: string;
}

export function LiquidBackground({ className }: LiquidBackgroundProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -20%, rgba(158, 167, 196, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 80%, rgba(169, 155, 198, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 10% 90%, rgba(156, 207, 216, 0.08) 0%, transparent 50%),
            #F5F5F7
          `,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(158, 167, 196, 0.12) 0%, transparent 70%)",
          top: "10%",
          left: "60%",
          animation: "float1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(169, 155, 198, 0.1) 0%, transparent 70%)",
          top: "50%",
          right: "10%",
          animation: "float2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(156, 207, 216, 0.08) 0%, transparent 70%)",
          bottom: "20%",
          left: "5%",
          animation: "float3 18s ease-in-out infinite",
        }}
      />

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
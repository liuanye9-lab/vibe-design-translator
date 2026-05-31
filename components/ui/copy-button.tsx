// ============================================================
// Vibe Design Translator - Copy Button Component
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
}

export function CopyButton({
  value,
  label = "Copy",
  className,
  onCopied,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopied?.();

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [value, onCopied]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-xl",
        "bg-[var(--color-surface-strong)] border border-[var(--color-border)]",
        "text-sm font-medium text-[var(--color-text-primary)]",
        "transition-all duration-200",
        "hover:bg-white hover:border-[var(--color-accent-silver)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-ios-blue)]",
        "active:scale-[0.98]",
        copied && "text-green-600 border-green-200 bg-green-50",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
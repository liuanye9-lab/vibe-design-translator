"use client";

// ============================================================
// Vibe Design Translator - Screenshot Uploader Component
// ============================================================

import { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import { ScreenshotAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScreenshotUploaderProps {
  value?: ScreenshotAsset | null;
  onChange: (asset: ScreenshotAsset | null) => void;
  disabled?: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ScreenshotUploader({
  value,
  onChange,
  disabled = false,
  className,
}: ScreenshotUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only PNG, JPG, and WebP images are supported";
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${formatFileSize(MAX_FILE_SIZE)}`;
    }
    return null;
  }, []);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setIsLoading(true);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });

      const asset: ScreenshotAsset = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: file.name,
        dataUrl,
        size: file.size,
        type: file.type,
        createdAt: new Date().toISOString(),
      };

      onChange(asset);
    } catch (err) {
      setError("Failed to process file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [validateFile, onChange]);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || isLoading) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    [disabled, isLoading, processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [processFile]
  );

  const handleRemove = useCallback(() => {
    onChange(null);
    setError(null);
  }, [onChange]);

  if (value) {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden bg-white/40 backdrop-blur-xl",
          "border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)]",
          "transition-all duration-300",
          className
        )}
      >
        {/* Preview Image */}
        <div className="relative aspect-video w-full bg-gray-50">
          <img
            src={value.dataUrl}
            alt={value.name}
            className="w-full h-full object-contain"
          />
          
          {/* Overlay with info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2 text-white">
              <ImageIcon className="w-4 h-4" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{value.name}</p>
                <p className="text-xs opacity-75">{formatFileSize(value.size)}</p>
              </div>
            </div>
          </div>
          
          {/* Remove button */}
          {!disabled && (
            <button
              onClick={handleRemove}
              className={cn(
                "absolute top-3 right-3 p-2 rounded-full",
                "bg-black/40 hover:bg-black/60 text-white",
                "transition-all duration-200",
                "backdrop-blur-sm"
              )}
              aria-label="Remove screenshot"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Preview notice */}
        <div className="px-4 py-3 border-t border-white/10">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Image preview only. Not uploaded to server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "border-2 border-dashed transition-all duration-300",
        isDragging
          ? "border-blue-400 bg-blue-50/50"
          : "border-gray-200 hover:border-gray-300 bg-white/30",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <label className="block cursor-pointer">
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleFileSelect}
          disabled={disabled || isLoading}
          className="sr-only"
        />
        
        <div className="px-6 py-10 text-center">
          {/* Icon */}
          <div
            className={cn(
              "w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center",
              "bg-white/60 backdrop-blur-sm border border-white/80",
              "shadow-[0_4px_16px_rgba(0,0,0,0.02)]",
              isDragging && "bg-blue-50 border-blue-200"
            )}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <Upload
                className={cn(
                  "w-6 h-6",
                  isDragging ? "text-blue-500" : "text-gray-400"
                )}
              />
            )}
          </div>
          
          {/* Text */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {isDragging ? "Drop your screenshot here" : "Upload a screenshot"}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              PNG, JPG, or WebP up to {formatFileSize(MAX_FILE_SIZE)}
            </p>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-rose-50 border border-rose-100">
              <p className="text-xs text-rose-600 flex items-center justify-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}

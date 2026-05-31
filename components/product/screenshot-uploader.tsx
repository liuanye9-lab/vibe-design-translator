"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";
import type { ScreenshotAsset } from "@/lib/types";
import { useI18n } from "@/lib/i18n/use-i18n";

interface ScreenshotUploaderProps {
  value?: ScreenshotAsset | null;
  onChange: (asset: ScreenshotAsset | null) => void;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const DEFAULT_MAX_SIZE = 5; // MB

export default function ScreenshotUploader({
  value,
  onChange,
  maxSizeMB = DEFAULT_MAX_SIZE,
}: ScreenshotUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, tVar } = useI18n();

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(t("screenshot_type_error"));
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(tVar("screenshot_size_error", { n: maxSizeMB }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const asset: ScreenshotAsset = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          dataUrl,
          uploadedAt: new Date().toISOString(),
        };
        onChange(asset);
      };
      reader.onerror = () => setError(t("screenshot_read_error"));
      reader.readAsDataURL(file);
    },
    [maxSizeMB, onChange, t, tVar]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDelete = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (value) {
    return (
      <div className="relative group">
        <div className="rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl overflow-hidden">
          {/* Preview */}
          <div className="relative aspect-video bg-gray-100/50">
            <img
              src={value.dataUrl}
              alt={value.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Metadata Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/80 border-t border-white/20">
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">{value.name}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatSize(value.size)}</span>
            </div>
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              title={t("screenshot_delete")}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative rounded-2xl border-2 border-dashed p-8 cursor-pointer
          transition-all duration-200 text-center
          ${
            isDragging
              ? "border-blue-400 bg-blue-50/50"
              : "border-gray-200 hover:border-gray-300 bg-white/40 backdrop-blur-sm"
          }
        `}
      >
        <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium text-gray-800">{t("screenshot_upload_hint")}</span>
        </p>
        <p className="text-xs text-gray-400">
          {tVar("screenshot_format_hint", { n: maxSizeMB })}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl bg-red-50/80 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

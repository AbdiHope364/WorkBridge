"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Modal } from "@repo/ui";

interface EditProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string | null;
  initials?: string;
  onSave?: (file: File, dataUrl: string) => void | Promise<void>;
  onRemove?: () => void | Promise<void>;
}

export function EditProfileImageModal({
  isOpen,
  onClose,
  currentImage,
  initials = "W",
  onSave,
  onRemove,
}: EditProfileImageModalProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with currentImage whenever modal opens or currentImage changes
  useEffect(() => {
    if (isOpen) {
      setPreview(currentImage || null);
      setSelectedFile(null);
      setErrorMsg(null);
    }
  }, [isOpen, currentImage]);

  const validateAndProcessFile = (file: File) => {
    setErrorMsg(null);

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Please select a valid image file (PNG, JPG, or WEBP).");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please choose a smaller photo.");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleSave = async () => {
    if (!selectedFile && !preview) return;

    setIsUploading(true);
    setErrorMsg(null);
    try {
      if (selectedFile && onSave && preview) {
        await onSave(selectedFile, preview);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save image:", error);
      setErrorMsg("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setPreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onRemove) {
      await onRemove();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Profile Photo"
      size="md"
    >
      <div className="space-y-6 pt-1">
        <p className="text-xs sm:text-sm text-slate-500 text-center font-medium">
          Upload a high-quality photo to personalize your worker profile & build trust with clients.
        </p>

        {/* Central Avatar Preview Area */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-emerald-500/20 bg-slate-900 shadow-xl flex items-center justify-center cursor-pointer group"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile preview"
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-slate-950 text-amber-200 font-black text-4xl sm:text-5xl flex items-center justify-center tracking-wider">
                  {initials}
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[11px] font-bold">Change Photo</span>
              </div>
            </div>

            {/* Quick Camera Action Badge */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload new image"
              className="absolute -bottom-2 -right-2 w-11 h-11 bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-2xl flex items-center justify-center text-white transition shadow-lg border-2 border-white cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Selected File Details */}
          {selectedFile && (
            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              <span className="text-emerald-600 text-[10px]">
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
              : "border-slate-200 hover:border-emerald-400 bg-slate-50/50 hover:bg-slate-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs sm:text-sm font-bold text-slate-800">
            {isDragging ? "Drop your photo here" : "Drag & drop your photo here, or "}
            <span className="text-emerald-600 underline">browse</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-medium">
            Supported formats: PNG, JPG, WEBP · Max size: 5MB
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 justify-end pt-4 border-t border-slate-100">
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-xl transition"
            >
              Remove Photo
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="w-full sm:w-auto px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedFile || isUploading}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-xl transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving Photo...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

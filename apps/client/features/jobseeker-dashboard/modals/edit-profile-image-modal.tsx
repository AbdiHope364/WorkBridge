"use client";

import { useState, useRef } from "react";
import { Modal } from "@repo/ui";

interface EditProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  onSave?: (file: File) => void;
}

export function EditProfileImageModal({
  isOpen,
  onClose,
  currentImage,
  onSave,
}: EditProfileImageModalProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave?.(selectedFile);
    }
    onClose();
  };

  const handleRemove = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile Image"
      size="sm"
    >
      <div className="space-y-6">
        <p className="text-sm text-slate-600 text-center">
          Tap to Add or Change profile Image
        </p>

        {/* Preview Circle */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full border-2 border-slate-300 bg-slate-50 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <svg
                className="w-20 h-20 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0l5.172 5.172m-9-3a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            )}

            {/* Camera Icon Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition shadow-md"
            >
              <svg
                className="w-6 h-6"
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
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-center text-xs text-slate-500">
          <p>
            or{" "}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
              type="button"
            >
              Click to browse from your device
            </button>
          </p>
          <p className="mt-1">
            PDF, DOCX &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MAX 5MB
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center pt-4 border-t border-slate-200">
          {preview && (
            <button
              onClick={handleRemove}
              className="px-6 py-2 text-sm font-semibold text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition"
            >
              Remove
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!selectedFile}
            className="px-6 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 rounded-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

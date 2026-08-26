"use client";

import { useState, useRef } from "react";
import { Modal } from "@repo/ui";

interface EditResumesAndSocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    resumeFile?: File | string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  onSave?: (data: any) => void;
}

export function EditResumesAndSocialsModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditResumesAndSocialsModalProps) {
  const [formData, setFormData] = useState<{
    resumeFile?: File | string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  }>(initialData || {});
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setFormData((prev) => ({ ...prev, resumeFile: file }));
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName(null);
    setFormData((prev) => {
      const { resumeFile, ...rest } = prev;
      return rest;
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Resumes and Socials"
      size="md"
    >
      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <div
            className="border-2 border-dashed border-emerald-300 bg-emerald-50 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-100 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              className="mx-auto w-12 h-12 text-emerald-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-semibold text-emerald-700 mb-1">
              Drag and drop your resume/CV here
            </p>
            <p className="text-xs text-emerald-600">
              or{" "}
              <button
                type="button"
                className="font-semibold hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Click to browse from your device
              </button>
            </p>
            <p className="text-xs text-emerald-600 mt-2">
              PDF, DOCX &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MAX 5MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploadedFileName && (
            <div className="mt-3 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-md p-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 16a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2zm0-6V6h2v4H8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-slate-950">
                  {uploadedFileName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-rose-500 hover:text-rose-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-500 text-center">
          Online presence (optional if you are a physical worker)
        </p>

        {/* Social Links */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Github URL
          </label>
          <input
            type="url"
            name="github"
            value={formData.github || ""}
            onChange={handleChange}
            placeholder="https://github.com/in/username"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Portfolio URL
          </label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio || ""}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

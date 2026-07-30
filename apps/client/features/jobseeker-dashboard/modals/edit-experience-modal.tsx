"use client";

import { useState } from "react";
import { Modal } from "@repo/ui";

interface EditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    companyName?: string;
    position?: string;
    isCurrent?: boolean;
    startDate?: string;
    endDate?: string;
    jobDescription?: string;
  };
  onSave?: (data: any) => void;
}

export function EditExperienceModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditExperienceModalProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit your Experience"
      size="md"
    >
      <div className="space-y-5">
        {/* Company Name and Position */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleChange}
              placeholder="e.g. Egalieon systems technology"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position || ""}
              onChange={handleChange}
              placeholder="e.g. Backend developer and system maintenance"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Currently Working Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCurrent"
            name="isCurrent"
            checked={formData.isCurrent || false}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          />
          <label
            htmlFor="isCurrent"
            className="text-xs font-medium text-slate-950 cursor-pointer"
          >
            I am currently working in this role
          </label>
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              disabled={formData.isCurrent}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription || ""}
            onChange={handleChange}
            placeholder="Describe your responsibilities and key achievements..."
            className="w-full min-h-24 px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <p className="text-xs text-slate-500 mt-1 text-right">
            0/1000 characters
          </p>
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

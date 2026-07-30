"use client";

import { useState } from "react";
import { Modal } from "@repo/ui";

interface EditEducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    schoolName?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  };
  onSave?: (data: any) => void;
}

export function EditEducationModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditEducationModalProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit your Education"
      size="md"
    >
      <div className="space-y-5">
        {/* School Name and Degree */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              School Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName || ""}
              onChange={handleChange}
              placeholder="e.g. Jimma University"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Degree <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree || ""}
              onChange={handleChange}
              placeholder="e.g. Bachelors Degree"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Field of Study */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Field of Study <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy || ""}
            onChange={handleChange}
            placeholder="e.g. Software Engineering"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
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
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Describe your educational status..."
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

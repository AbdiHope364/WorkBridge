"use client";

import { useState } from "react";
import { Modal } from "@repo/ui";

interface EditBasicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    phoneNumber?: string;
    cityLocation?: string;
    gender?: string;
    dateOfBirth?: string;
    addressLine1?: string;
    addressLine2?: string;
    skills?: string[];
    currentPosition?: string;
  };
  onSave?: (data: any) => void;
}

export function EditBasicProfileModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditBasicProfileModalProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skills?.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), skill],
      }));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills?.filter((s) => s !== skill) || [],
    }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
      <div className="space-y-6">
        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Bio (optional)
          </label>
          <textarea
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            placeholder="Say something about yourself..."
            className="w-full min-h-24 px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* First and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder="Your first name"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="Your last name"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Phone and Location */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phoneNumber || ""}
              onChange={handleChange}
              placeholder="+251-900-000-000"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              City/Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.cityLocation || ""}
              onChange={handleChange}
              placeholder="Your current location"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Gender and DOB */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Address Lines */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Address line 1 (optional)
          </label>
          <input
            type="email"
            name="addressLine1"
            value={formData.addressLine1 || ""}
            onChange={handleChange}
            placeholder="youraddressline1@gmail.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Address line 2 (optional)
          </label>
          <input
            type="email"
            name="addressLine2"
            value={formData.addressLine2 || ""}
            onChange={handleChange}
            placeholder="youraddressline2@gmail.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Skills <span className="text-red-500">*</span>
          </label>
          <div className="mb-2 flex gap-2">
            <input
              type="text"
              placeholder="Search skills (e.g. UI/UX design, node, java)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills?.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-emerald-900"
                  type="button"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Current Position */}
        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Current position <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currentPosition"
            value={formData.currentPosition || ""}
            onChange={handleChange}
            placeholder="e.g. Senior software engineer"
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

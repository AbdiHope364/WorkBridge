import { useState, useEffect } from "react";
import { Modal } from "@repo/ui";

interface EditBasicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    bio?: string;
    phone?: string;
    phoneNumber?: string;
    cityLocation?: string;
    location?: string;
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
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    bio: initialData?.bio || "",
    phone: initialData?.phone || initialData?.phoneNumber || "",
    cityLocation: initialData?.cityLocation || initialData?.location || "",
    gender: initialData?.gender || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    addressLine1: initialData?.addressLine1 || "",
    addressLine2: initialData?.addressLine2 || "",
    skills: initialData?.skills || [],
    currentPosition: initialData?.currentPosition || "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        bio: initialData?.bio || "",
        phone: initialData?.phone || initialData?.phoneNumber || "",
        cityLocation: initialData?.cityLocation || initialData?.location || "",
        gender: initialData?.gender || "",
        dateOfBirth: initialData?.dateOfBirth || "",
        addressLine1: initialData?.addressLine1 || "",
        addressLine2: initialData?.addressLine2 || "",
        skills: Array.isArray(initialData?.skills) ? initialData.skills : [],
        currentPosition: initialData?.currentPosition || "",
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !formData.skills?.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), trimmed],
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
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="md">
      <div className="space-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-950 mb-2">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
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
              name="cityLocation"
              value={formData.cityLocation || ""}
              onChange={handleChange}
              placeholder="Your current location (e.g. Addis Ababa)"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Gender and DOB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            type="text"
            name="addressLine1"
            value={formData.addressLine1 || ""}
            onChange={handleChange}
            placeholder="e.g. Bole Sub-city, Woreda 03"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-950 mb-2">
            Address line 2 (optional)
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2 || ""}
            onChange={handleChange}
            placeholder="e.g. House No. 124"
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
              placeholder="Search skills (e.g. Plumbing, Electrician, Node.js)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills?.map((skill: string) => (
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
            placeholder="e.g. Master Electrician & Cable Specialist"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 sm:gap-3 sm:justify-end pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition cursor-pointer text-center shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

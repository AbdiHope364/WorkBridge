// features/settings/components/general-settings.tsx
"use client";

import React, { useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Save,
  Edit2,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface GeneralSettingsData {
  companyName: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  language: string;
  currency: string;
}

export function GeneralSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<GeneralSettingsData>({
    companyName: "WorkBridge",
    website: "https://workbridge.com",
    email: "admin@workbridge.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Park, Silicon Valley, CA 94025",
    timezone: "America/Los_Angeles",
    language: "English",
    currency: "USD",
  });

  const [formData, setFormData] = useState(settings);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSettings(formData);
    setIsEditing(false);
    // TODO: Save to backend
    console.log("Saving settings:", formData);
  };

  const handleCancel = () => {
    setFormData(settings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                General Settings
              </h4>
              <p className="text-[9px] font-medium text-slate-400 mt-0.5">
                Basic platform information and preferences
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#4100F2] text-white rounded-lg text-[10px] font-bold hover:bg-[#2B00A1] transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Settings
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-600 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Logo/Company Image */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#4100F2] to-[#2B00A1] flex items-center justify-center text-white text-2xl font-black">
                WB
              </div>
              {isEditing && (
                <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-600" />
                </button>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-slate-800">Company Logo</p>
              <p className="text-[10px] font-medium text-slate-400">
                Upload your company logo. Recommended size: 200x200px
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">
                    {settings.companyName}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-[#4100F2]">
                    {settings.website}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {settings.email}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {settings.phone}
                  </span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {settings.address}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Timezone
              </label>
              {isEditing ? (
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                >
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Dubai">Dubai (GST)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                  <option value="Australia/Sydney">Sydney (AEDT)</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {settings.timezone}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1.5">
                Language
              </label>
              {isEditing ? (
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#4100F2] focus:ring-4 focus:ring-purple-100 transition-all"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Arabic">Arabic</option>
                </select>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">
                    {settings.language}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

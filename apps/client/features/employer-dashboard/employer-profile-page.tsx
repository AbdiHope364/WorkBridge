"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  User,
  ShieldCheck,
  Lock,
  Camera,
  MapPin,
  Phone,
  Globe,
  Briefcase,
  Users,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  FileText,
  Calendar,
  Save,
  X,
  Edit3,
  Bell,
  CreditCard,
  QrCode,
  FileCheck2,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";
import { EmployerSidebar } from "./components/employer-sidebar";
import {
  CompanyProfile,
  IndividualEmployerProfile,
  EmployerProfile,
  UpdateIndividualEmployerProfileRequest,
} from "@repo/api-client";
import { useProfile } from "@/contexts/profile-context";
import { useNotifications } from "@/contexts/notification-context";
import { api } from "../../lib/api";
import { env } from "../../lib/env";
import { WorkBridgeLogo, Spinner } from "@repo/ui";

export function cloudinaryUrl(publicId: string | undefined): string | null {
  if (!publicId) return null;
  if (
    publicId.startsWith("http://") ||
    publicId.startsWith("https://") ||
    publicId.startsWith("blob:")
  ) {
    return publicId;
  }
  return `https://res.cloudinary.com/${
    env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "workbridge"
  }/image/upload/${publicId}`;
}

type TabType = "details" | "verification" | "security";

// ─── Header Component ──────────────────────────────────────────────────────────

function Header({ profile }: { profile: EmployerProfile }) {
  const isCompany = profile.employerType === "COMPANY_EMPLOYER";
  const { unreadCount } = useNotifications();

  const imageId = isCompany
    ? (profile as CompanyProfile).companyLogoUrl?.publicId
    : (profile as IndividualEmployerProfile).profilePictureUrl?.publicId;

  const initials = isCompany
    ? (profile as CompanyProfile).companyName?.charAt(0) ?? "C"
    : (profile as IndividualEmployerProfile).fullName?.charAt(0) ?? "E";

  const avatarSrc = cloudinaryUrl(imageId);

  return (
    <header className="hidden md:flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10 sticky top-0 z-20">
      <Link href="/dashboard/employer" className="flex items-center">
        <WorkBridgeLogo className="h-9 w-auto max-w-[190px]" />
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/dashboard/employer/notifications"
          aria-label="Notifications"
          className="relative p-2 rounded-xl text-slate-400 hover:text-teal-600 hover:bg-slate-50 transition"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white shadow-xs">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        <Link
          href="/dashboard/employer/profile"
          aria-label="Profile"
          className="flex items-center gap-3 pl-2 border-l border-slate-200 hover:opacity-90 transition"
        >
          <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt="Profile"
                fill
                className="object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

// ─── Company Profile Summary & Hero ──────────────────────────────────────────

function CompanyHeroCard({
  profile,
  editing,
  setEditing,
  pendingLogo,
  setPendingLogo,
  logoPreview,
  setLogoPreview,
  pendingBanner,
  setPendingBanner,
  bannerPreview,
  setBannerPreview,
  onSave,
  isSaving,
}: {
  profile: CompanyProfile;
  editing: boolean;
  setEditing: (v: boolean) => void;
  pendingLogo: File | null;
  setPendingLogo: (f: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (s: string | null) => void;
  pendingBanner: File | null;
  setPendingBanner: (f: File | null) => void;
  bannerPreview: string | null;
  setBannerPreview: (s: string | null) => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  const companyName = profile.companyName || "Your Company Name";
  const industry = profile.industry || "General Services & Skilled Labor";
  const city = profile.headquarters?.city || "Addis Ababa";
  const country = profile.headquarters?.country || "Ethiopia";
  const website = profile.officialWebsite;
  const activeJobs = profile.totalJobsPosted ?? 0;
  const applications = profile.totalApplicantsReceived ?? 0;
  const hires = profile.totalEmployeesHired ?? 0;

  const serverLogo = cloudinaryUrl(profile.companyLogoUrl?.publicId);
  const serverBanner = cloudinaryUrl(profile.companyBannerUrl?.publicId);

  const displayLogo = logoPreview ?? serverLogo;
  const displayBanner = bannerPreview ?? serverBanner;

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setPendingLogo(file);
    setLogoPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleBannerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setPendingBanner(file);
    setBannerPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Banner Area */}
      <div className="relative h-44 sm:h-56 w-full bg-gradient-to-r from-slate-900 via-blue-950 to-teal-950">
        {displayBanner ? (
          <Image
            src={displayBanner}
            alt="Company Banner"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Banner Edit Control */}
        {editing && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-xl text-xs font-bold cursor-pointer transition border border-white/20 shadow-lg">
              <Camera className="w-4 h-4" />
              <span>{pendingBanner ? "Change Banner" : "Upload Banner"}</span>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleBannerSelect}
              />
            </label>
            {pendingBanner && (
              <button
                type="button"
                onClick={() => {
                  if (bannerPreview) URL.revokeObjectURL(bannerPreview);
                  setPendingBanner(null);
                  setBannerPreview(null);
                }}
                className="p-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-lg"
                title="Discard banner preview"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Profile Header Content */}
      <div className="px-6 sm:px-10 pb-8">
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
          {/* Logo Badge */}
          <div className="relative group">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-slate-900 font-black text-3xl">
              {displayLogo ? (
                <Image
                  src={displayLogo}
                  alt="Company Logo"
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <span className="text-teal-700">
                  {companyName.charAt(0) || "C"}
                </span>
              )}
            </div>

            {editing && (
              <label
                className="absolute bottom-1 right-1 p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl cursor-pointer shadow-lg transition border-2 border-white"
                title={pendingLogo ? "Change Logo" : "Upload Logo"}
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleLogoSelect}
                />
              </label>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {editing ? (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    setEditing(false);
                    if (logoPreview) URL.revokeObjectURL(logoPreview);
                    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
                    setPendingLogo(null);
                    setPendingBanner(null);
                    setLogoPreview(null);
                    setBannerPreview(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={onSave}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md hover:shadow-teal-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Spinner className="w-4 h-4 text-white" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Company Title & Meta */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {companyName}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Verified Employer
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" /> {industry}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> {city}, {country}
            </span>
            {website && (
              <a
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700 hover:underline"
              >
                <Globe className="w-4 h-4" /> {website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* Stat Metric Cards */}
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4 text-teal-600 hidden sm:block" />
              <span>Jobs Posted</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {activeJobs}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-blue-600 hidden sm:block" />
              <span>Applicants</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {applications}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 hidden sm:block" />
              <span>Hired Workers</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {hires}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Individual Profile Summary & Hero ────────────────────────────────────────

function IndividualHeroCard({
  profile,
  editing,
  setEditing,
  pendingAvatar,
  setPendingAvatar,
  avatarPreview,
  setAvatarPreview,
  onSave,
  isSaving,
}: {
  profile: IndividualEmployerProfile;
  editing: boolean;
  setEditing: (v: boolean) => void;
  pendingAvatar: File | null;
  setPendingAvatar: (f: File | null) => void;
  avatarPreview: string | null;
  setAvatarPreview: (s: string | null) => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  const fullName = profile.fullName || "Your Full Name";
  const occupation = profile.occupation || "Client / Homeowner";
  const city = profile.location?.city || "Addis Ababa";
  const activeJobs = profile.totalJobsPosted ?? 0;
  const hires = profile.totalHires ?? 0;

  const serverAvatar = cloudinaryUrl(profile.profilePictureUrl?.publicId);
  const displayAvatar = avatarPreview ?? serverAvatar;

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setPendingAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Mini Cover Header */}
      <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />
      </div>

      <div className="px-6 sm:px-10 pb-8">
        <div className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl bg-slate-900 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-white font-black text-3xl">
              {displayAvatar ? (
                <Image
                  src={displayAvatar}
                  alt="Profile Avatar"
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <span className="text-teal-400">
                  {fullName.charAt(0) || "U"}
                </span>
              )}
            </div>

            {editing && (
              <label
                className="absolute bottom-1 right-1 p-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl cursor-pointer shadow-lg transition border-2 border-white"
                title={pendingAvatar ? "Change Photo" : "Upload Photo"}
              >
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarSelect}
                />
              </label>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {editing ? (
              <>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    setEditing(false);
                    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
                    setPendingAvatar(null);
                    setAvatarPreview(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={onSave}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md hover:shadow-teal-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Spinner className="w-4 h-4 text-white" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {fullName}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              Verified Client
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-400" /> {occupation}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400" /> {city}, Ethiopia
            </span>
          </div>
        </div>

        {/* Stat Metric Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4 text-teal-600 hidden sm:block" />
              <span>Jobs Posted</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {activeJobs}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 hidden sm:block" />
              <span>Workers Hired</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {hires}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Modern Form Input Component ──────────────────────────────────────────────

function InputGroup({
  label,
  value,
  onChange,
  editing,
  placeholder,
  icon: Icon,
  type = "text",
  required = false,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  editing: boolean;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${fullWidth ? "sm:col-span-2" : ""}`}>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      {editing ? (
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-xs ${
              Icon ? "pl-10" : ""
            }`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-900 font-medium">
          {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
          <span className="truncate">{value || "—"}</span>
        </div>
      )}
    </div>
  );
}

function TextAreaGroup({
  label,
  value,
  onChange,
  editing,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  editing: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5 sm:col-span-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
      </label>

      {editing ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition shadow-xs"
        />
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-900 font-medium min-h-[80px] whitespace-pre-wrap leading-relaxed">
          {value || "No description provided."}
        </div>
      )}
    </div>
  );
}

// ─── Company Details Tab ──────────────────────────────────────────────────────

function CompanyDetailsTab({
  fields,
  patch,
  editing,
}: {
  fields: {
    companyName: string;
    industry: string;
    hqCity: string;
    hqCountry: string;
    hqRegion: string;
    hqAddressLine: string;
    website: string;
    description: string;
    tagline: string;
    phone: string;
    businessLicenseNumber: string;
    nationalIdOrPassportNumber: string;
  };
  patch: (k: string, v: string) => void;
  editing: boolean;
}) {
  return (
    <div className="space-y-8">
      {/* General Info */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-600" /> Company Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <InputGroup
            label="Company Name"
            value={fields.companyName}
            onChange={(v) => patch("companyName", v)}
            editing={editing}
            placeholder="e.g. Acme Construction Ltd."
            icon={Building2}
            required
          />
          <InputGroup
            label="Industry / Sector"
            value={fields.industry}
            onChange={(v) => patch("industry", v)}
            editing={editing}
            placeholder="e.g. Electrical & Civil Contracting"
            icon={Briefcase}
          />
          <InputGroup
            label="Company Tagline"
            value={fields.tagline}
            onChange={(v) => patch("tagline", v)}
            editing={editing}
            placeholder="e.g. Building Quality Structures Since 2012"
            fullWidth
          />
          <TextAreaGroup
            label="About the Company"
            value={fields.description}
            onChange={(v) => patch("description", v)}
            editing={editing}
            placeholder="Describe your organization, trade specializations, and services..."
            rows={4}
          />
        </div>
      </div>

      {/* Contact & Headquarters */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" /> Contact & Location
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <InputGroup
            label="Official Phone Number"
            value={fields.phone}
            onChange={(v) => patch("phone", v)}
            editing={editing}
            placeholder="+251 9..."
            icon={Phone}
          />
          <InputGroup
            label="Website URL"
            value={fields.website}
            onChange={(v) => patch("website", v)}
            editing={editing}
            placeholder="https://example.com"
            icon={Globe}
          />
          <InputGroup
            label="Headquarters City"
            value={fields.hqCity}
            onChange={(v) => patch("hqCity", v)}
            editing={editing}
            placeholder="e.g. Addis Ababa"
            icon={MapPin}
          />
          <InputGroup
            label="Region / State"
            value={fields.hqRegion}
            onChange={(v) => patch("hqRegion", v)}
            editing={editing}
            placeholder="e.g. Addis Ababa / Oromia"
          />
          <InputGroup
            label="Country"
            value={fields.hqCountry}
            onChange={(v) => patch("hqCountry", v)}
            editing={editing}
            placeholder="Ethiopia"
          />
          <InputGroup
            label="Street Address / Building"
            value={fields.hqAddressLine}
            onChange={(v) => patch("hqAddressLine", v)}
            editing={editing}
            placeholder="e.g. Bole Sub-City, Word 03, House 102"
          />
        </div>
      </div>

      {/* Legal & Business Registration */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600" /> Business Registration
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <InputGroup
            label="Business License Number (TIN)"
            value={fields.businessLicenseNumber}
            onChange={(v) => patch("businessLicenseNumber", v)}
            editing={editing}
            placeholder="e.g. BL-98412-ET"
            icon={FileText}
          />
          <InputGroup
            label="Principal Representative National ID"
            value={fields.nationalIdOrPassportNumber}
            onChange={(v) => patch("nationalIdOrPassportNumber", v)}
            editing={editing}
            placeholder="e.g. 01-1234567-89"
            icon={ShieldCheck}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Individual Personal Info Tab ─────────────────────────────────────────────

function IndividualDetailsTab({
  fields,
  patch,
  editing,
}: {
  fields: {
    fullName: string;
    phone: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    gender: string;
    dateOfBirth: string;
    bio: string;
    occupation: string;
  };
  patch: (k: string, v: string) => void;
  editing: boolean;
}) {
  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-teal-600" /> Personal Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <InputGroup
            label="Full Name"
            value={fields.fullName}
            onChange={(v) => patch("fullName", v)}
            editing={editing}
            placeholder="e.g. Abel Tesfaye"
            icon={User}
            required
          />
          <InputGroup
            label="Title / Occupation"
            value={fields.occupation}
            onChange={(v) => patch("occupation", v)}
            editing={editing}
            placeholder="e.g. Site Manager, Homeowner, Project Lead"
            icon={Briefcase}
          />
          <InputGroup
            label="Gender"
            value={fields.gender}
            onChange={(v) => patch("gender", v)}
            editing={editing}
            placeholder="Male / Female / Prefer not to say"
          />
          <InputGroup
            label="Date of Birth"
            value={fields.dateOfBirth}
            onChange={(v) => patch("dateOfBirth", v)}
            editing={editing}
            placeholder="YYYY-MM-DD"
            icon={Calendar}
          />
          <TextAreaGroup
            label="Bio / Notes"
            value={fields.bio}
            onChange={(v) => patch("bio", v)}
            editing={editing}
            placeholder="Brief introduction or hiring preferences..."
            rows={3}
          />
        </div>
      </div>

      {/* Contact & Location */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" /> Contact & Location
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <InputGroup
            label="Phone Number"
            value={fields.phone}
            onChange={(v) => patch("phone", v)}
            editing={editing}
            placeholder="+251 9..."
            icon={Phone}
          />
          <InputGroup
            label="City"
            value={fields.city}
            onChange={(v) => patch("city", v)}
            editing={editing}
            placeholder="e.g. Addis Ababa"
            icon={MapPin}
          />
          <InputGroup
            label="Primary Address"
            value={fields.addressLine1}
            onChange={(v) => patch("addressLine1", v)}
            editing={editing}
            placeholder="e.g. Kazanchis, Behind UNECA"
          />
          <InputGroup
            label="Address Line 2 (Optional)"
            value={fields.addressLine2}
            onChange={(v) => patch("addressLine2", v)}
            editing={editing}
            placeholder="Apartment, suite, unit, etc."
          />
        </div>
      </div>
    </div>
  );
}

// ─── Verification Tab ─────────────────────────────────────────────────────────

function VerificationTab({ isCompany = false }: { isCompany?: boolean }) {
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [faydaFin, setFaydaFin] = useState(
    isCompany ? "FIN-8812-4439-0192" : "FIN-4820-1945-7731"
  );
  const [officerName, setOfficerName] = useState(
    isCompany ? "Solomon Tesfaye (Managing Director)" : "Dawit Mekonnen"
  );
  const [tinNumber, setTinNumber] = useState("0048192847");
  const [businessLicense, setBusinessLicense] = useState("BL/AA/2024/99182");
  const [docFrontName, setDocFrontName] = useState(
    isCompany ? "trade_license_certified_2025.pdf" : "fayda_nid_front.jpg"
  );
  const [docBackName, setDocBackName] = useState(
    isCompany ? "director_fayda_nid_scan.jpg" : "fayda_nid_back.jpg"
  );
  const [verificationStatus, setVerificationStatus] = useState<
    "VERIFIED" | "PENDING" | "UNVERIFIED"
  >("VERIFIED");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg(null);

    try {
      await new Promise((r) => setTimeout(r, 650));
      setVerificationStatus("PENDING");
      setEditing(false);
      setSuccessMsg("Fayda KYC credentials submitted for Admin Verification review!");
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Verification Status Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0b241b] via-[#103b2c] to-[#0b241b] text-white border border-emerald-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black text-white">
                {isCompany
                  ? "Enterprise Fayda KYC & Trade License"
                  : "Fayda National ID Verification"}
              </h4>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                0% Commission Verified
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1 max-w-xl">
              {isCompany
                ? "Your company is authorized to post jobs, hire workers directly, and disburse milestone payments with complete trust."
                : "Your personal Fayda Identification Number (FIN) is verified on WorkBridge, ensuring trusted hiring and secure direct hiring."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 self-start sm:self-auto">
          {verificationStatus === "VERIFIED" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
              <BadgeCheck className="w-4 h-4" /> Active Verified
            </span>
          )}
          {verificationStatus === "PENDING" && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin" /> Pending Review
            </span>
          )}
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
          >
            {editing ? "Cancel Edit" : "Update ID"}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Digital Fayda ID Card Summary */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black text-slate-900">
              {isCompany ? "Authorized Officer Fayda Identity" : "Fayda National Digital Credential"}
            </h4>
            <p className="text-xs text-slate-500">
              Official Ethiopian National Digital ID (FIN) verification badge
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {faydaFin}
          </span>
        </div>

        <div className="max-w-md mx-auto bg-gradient-to-br from-[#0c2e1d] via-[#10482c] to-[#0b2618] text-white p-5 rounded-2xl shadow-md border border-emerald-600/30">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">
                ET
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider">
                FDRE National ID (Fayda / ፋይዳ)
              </span>
            </div>
            <QrCode className="w-5 h-5 text-emerald-300" />
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="w-16 h-20 rounded-lg bg-slate-800 border border-emerald-400/40 flex flex-col items-center justify-center text-emerald-200 shrink-0">
              <User className="w-8 h-8" />
              <span className="text-[8px] font-bold bg-emerald-600 text-white w-full text-center mt-1">
                VERIFIED
              </span>
            </div>
            <div className="space-y-1 min-w-0">
              <div>
                <span className="text-[9px] uppercase text-emerald-300 font-bold block">
                  {isCompany ? "Officer Name" : "Legal Name"}
                </span>
                <span className="font-bold text-white text-xs truncate block">{officerName}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-emerald-300 font-bold block">
                  Fayda FIN Number
                </span>
                <span className="font-mono font-extrabold text-amber-300 text-xs tracking-wider">
                  {faydaFin}
                </span>
              </div>
              {isCompany && (
                <div>
                  <span className="text-[9px] uppercase text-emerald-300 font-bold block">
                    TIN / Business Reg
                  </span>
                  <span className="font-mono text-white text-[11px]">{tinNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {editing ? (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div>
            <h4 className="text-base font-black text-slate-900">
              Update Fayda KYC Information
            </h4>
            <p className="text-xs text-slate-500">
              Resubmit your National ID and credentials for updated verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Fayda Identification Number (FIN) *
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={faydaFin}
                  onChange={(e) => setFaydaFin(e.target.value)}
                  placeholder="e.g. FIN-4820-1945-7731"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-teal-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isCompany ? "Authorized Officer Legal Name *" : "Full Legal Name *"}
              </label>
              <input
                type="text"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                placeholder="e.g. Dawit Mekonnen"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-teal-500 focus:outline-none"
                required
              />
            </div>

            {isCompany && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Tax Identification Number (TIN) *
                  </label>
                  <input
                    type="text"
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value)}
                    placeholder="e.g. 0048192847"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Commercial Business License Number *
                  </label>
                  <input
                    type="text"
                    value={businessLicense}
                    onChange={(e) => setBusinessLicense(e.target.value)}
                    placeholder="e.g. BL/AA/2024/99182"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>
              </>
            )}
          </div>

          {/* Document Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/30 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-white rounded-xl text-teal-600 shadow-xs">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-900">
                {isCompany ? "Trade License / TIN Certificate" : "Fayda ID Card (Front)"}
              </div>
              <span className="text-[11px] font-mono text-teal-700">{docFrontName}</span>
              <label className="cursor-pointer text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-white px-3 py-1 rounded-lg border border-teal-200">
                Choose New File
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setDocFrontName(e.target.files[0].name);
                  }}
                />
              </label>
            </div>

            <div className="p-4 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/30 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-white rounded-xl text-teal-600 shadow-xs">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-slate-900">
                {isCompany ? "Authorized Officer Fayda ID" : "Fayda ID Card (Back)"}
              </div>
              <span className="text-[11px] font-mono text-teal-700">{docBackName}</span>
              <label className="cursor-pointer text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-white px-3 py-1 rounded-lg border border-teal-200">
                Choose New File
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setDocBackName(e.target.files[0].name);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Submitting...
                </>
              ) : (
                "Save & Submit Verification"
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Uploaded Documents Showcase */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {isCompany ? "Trade License / TIN Certificate" : "Fayda National ID (Front)"}
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {isCompany
                ? "Official commercial registration and tax certificate issued in Ethiopia."
                : "Clear scanned image of your Ethiopian Fayda National ID front."}
            </p>
            <div className="h-28 rounded-xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
              <span className="text-xs font-semibold text-slate-700">
                {docFrontName}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-teal-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  {isCompany ? "Officer Fayda ID (FIN)" : "Fayda National ID (Back)"}
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {isCompany
                ? "Government Fayda National ID of the authorized company officer."
                : "Back side of your Ethiopian Fayda National ID with barcodes and stamps."}
            </p>
            <div className="h-28 rounded-xl border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-400 gap-1.5">
              <CheckCircle2 className="w-6 h-6 text-teal-600" />
              <span className="text-xs font-semibold text-slate-700">
                {docBackName}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!passwords.oldPassword || !passwords.newPassword) {
      setMessage({
        type: "error",
        text: "Please enter both your current and new password.",
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters.",
      });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate/request password update
      await new Promise((resolve) => setTimeout(resolve, 600));
      setMessage({
        type: "success",
        text: "Password updated successfully!",
      });
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-teal-600" /> Change Password
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Update your password regularly to keep your employer account protected.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Old Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Current Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, oldPassword: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowOld((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            New Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, newPassword: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowNew((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Confirm New Password <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))
              }
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Spinner className="w-4 h-4 text-white" /> Updating...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" /> Update Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ─── Main Employer Profile Page Component ─────────────────────────────────────

export function EmployerProfilePage() {
  const { isLoading, employerProfile, refreshProfile } = useProfile();

  const [activeTab, setActiveTab] = useState<TabType>("details");
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Staged files
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const isCompany = employerProfile?.employerType === "COMPANY_EMPLOYER";
  const companyProf = isCompany ? (employerProfile as CompanyProfile) : null;
  const indivProf = !isCompany
    ? (employerProfile as IndividualEmployerProfile)
    : null;

  // Company Form State
  const [companyFields, setCompanyFields] = useState({
    companyName: "",
    industry: "",
    hqCity: "",
    hqCountry: "",
    hqRegion: "",
    hqAddressLine: "",
    website: "",
    description: "",
    tagline: "",
    phone: "",
    businessLicenseNumber: "",
    nationalIdOrPassportNumber: "",
  });

  // Individual Form State
  const [individualFields, setIndividualFields] = useState({
    fullName: "",
    phone: "",
    city: "",
    addressLine1: "",
    addressLine2: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
    occupation: "",
  });

  // Sync state when profile loads
  React.useEffect(() => {
    if (companyProf) {
      setCompanyFields({
        companyName: companyProf.companyName ?? "",
        industry: companyProf.industry ?? "",
        hqCity: companyProf.headquarters?.city ?? "",
        hqCountry: companyProf.headquarters?.country ?? "Ethiopia",
        hqRegion: companyProf.headquarters?.region ?? "",
        hqAddressLine: companyProf.headquarters?.addressLine ?? "",
        website: companyProf.officialWebsite ?? "",
        description: companyProf.companyDescription ?? "",
        tagline: companyProf.tagline ?? "",
        phone: companyProf.phoneNumber ?? "",
        businessLicenseNumber: companyProf.businessLicenseNumber ?? "",
        nationalIdOrPassportNumber:
          companyProf.nationalIdOrPassportNumber ?? "",
      });
    }
    if (indivProf) {
      setIndividualFields({
        fullName: indivProf.fullName ?? "",
        phone: indivProf.phoneNumber ?? "",
        city: indivProf.location?.city ?? "",
        addressLine1: indivProf.location?.addressLine1 ?? "",
        addressLine2: indivProf.location?.addressLine2 ?? "",
        gender: indivProf.gender ?? "",
        dateOfBirth: indivProf.dateOfBirth ?? "",
        bio: indivProf.bio ?? "",
        occupation: indivProf.occupation ?? "",
      });
    }
  }, [companyProf, indivProf]);

  const patchCompany = useCallback((key: string, val: string) => {
    setCompanyFields((prev) => ({ ...prev, [key]: val }));
  }, []);

  const patchIndividual = useCallback((key: string, val: string) => {
    setIndividualFields((prev) => ({ ...prev, [key]: val }));
  }, []);

  // Save handler for Company
  const handleSaveCompany = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      if (pendingLogo) {
        await api.profiles.employer.uploadLogo(pendingLogo);
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setPendingLogo(null);
        setLogoPreview(null);
      }
      if (pendingBanner) {
        await api.profiles.employer.uploadBanner(pendingBanner);
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setPendingBanner(null);
        setBannerPreview(null);
      }

      await api.profiles.employer.updateCompanyProfile({
        companyName: companyFields.companyName || undefined,
        industry: companyFields.industry || undefined,
        officialWebsite: companyFields.website || undefined,
        companyDescription: companyFields.description || undefined,
        tagline: companyFields.tagline || undefined,
        phoneNumber: companyFields.phone || undefined,
        businessLicenseNumber: companyFields.businessLicenseNumber || undefined,
        nationalIdOrPassportNumber:
          companyFields.nationalIdOrPassportNumber || undefined,
        headquarters: companyFields.hqCity
          ? {
              city: companyFields.hqCity,
              country: companyFields.hqCountry,
              region: companyFields.hqRegion,
              addressLine: companyFields.hqAddressLine,
            }
          : undefined,
      });

      await refreshProfile();
      setEditing(false);
      setStatusMessage({
        type: "success",
        text: "Company profile updated successfully!",
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update company profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Save handler for Individual
  const handleSaveIndividual = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      if (pendingAvatar) {
        await api.profiles.employer.uploadAvatar(pendingAvatar);
        if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        setPendingAvatar(null);
        setAvatarPreview(null);
      }

      await api.profiles.employer.updateMyIndividualProfile({
        fullName: individualFields.fullName || undefined,
        phoneNumber: individualFields.phone || undefined,
        gender:
          (individualFields.gender as UpdateIndividualEmployerProfileRequest["gender"]) ||
          undefined,
        dateOfBirth: individualFields.dateOfBirth || undefined,
        bio: individualFields.bio || undefined,
        occupation: individualFields.occupation || undefined,
        location: individualFields.city
          ? {
              city: individualFields.city,
              addressLine1: individualFields.addressLine1,
              addressLine2: individualFields.addressLine2,
            }
          : undefined,
      });

      await refreshProfile();
      setEditing(false);
      setStatusMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 text-slate-700 font-bold">
          <Spinner className="w-5 h-5 text-teal-600" />
          <span>Loading profile...</span>
        </div>
      </main>
    );
  }

  if (!employerProfile) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-black text-slate-900">
            No Employer Profile Found
          </h2>
          <p className="text-sm text-slate-500">
            Please complete the onboarding step to set up your profile.
          </p>
          <Link
            href="/dashboard/employer/onboarding"
            className="inline-flex px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition"
          >
            Go to Onboarding
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col pt-16 pb-20 md:pt-0 md:pb-0 overflow-y-auto">
          <Header profile={employerProfile} />

          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Breadcrumbs / Back Link */}
            <div className="flex items-center justify-between">
              <Link
                href="/dashboard/employer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Link>
            </div>

            {/* Status Feedback Message */}
            {statusMessage && (
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3 text-sm font-semibold transition-all ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border-rose-200 text-rose-800"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Hero Card */}
            {isCompany && companyProf ? (
              <CompanyHeroCard
                profile={companyProf}
                editing={editing}
                setEditing={setEditing}
                pendingLogo={pendingLogo}
                setPendingLogo={setPendingLogo}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
                pendingBanner={pendingBanner}
                setPendingBanner={setPendingBanner}
                bannerPreview={bannerPreview}
                setBannerPreview={setBannerPreview}
                onSave={handleSaveCompany}
                isSaving={isSaving}
              />
            ) : indivProf ? (
              <IndividualHeroCard
                profile={indivProf}
                editing={editing}
                setEditing={setEditing}
                pendingAvatar={pendingAvatar}
                setPendingAvatar={setPendingAvatar}
                avatarPreview={avatarPreview}
                setAvatarPreview={setAvatarPreview}
                onSave={handleSaveIndividual}
                isSaving={isSaving}
              />
            ) : null}

            {/* Tabbed Content Card */}
            <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              {/* Tab Navigation Header */}
              <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center gap-2 py-4 px-3 sm:px-4 text-sm font-bold border-b-2 transition -mb-px cursor-pointer ${
                    activeTab === "details"
                      ? "border-teal-600 text-teal-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {isCompany ? (
                    <Building2 className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>{isCompany ? "Company Details" : "Personal Info"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("verification")}
                  className={`flex items-center gap-2 py-4 px-3 sm:px-4 text-sm font-bold border-b-2 transition -mb-px cursor-pointer ${
                    activeTab === "verification"
                      ? "border-teal-600 text-teal-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verification & ID</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-2 py-4 px-3 sm:px-4 text-sm font-bold border-b-2 transition -mb-px cursor-pointer ${
                    activeTab === "security"
                      ? "border-teal-600 text-teal-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Security</span>
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="p-6 sm:p-10">
                {activeTab === "details" &&
                  (isCompany ? (
                    <CompanyDetailsTab
                      fields={companyFields}
                      patch={patchCompany}
                      editing={editing}
                    />
                  ) : (
                    <IndividualDetailsTab
                      fields={individualFields}
                      patch={patchIndividual}
                      editing={editing}
                    />
                  ))}

                {activeTab === "verification" && (
                  <VerificationTab isCompany={isCompany} />
                )}

                {activeTab === "security" && <SecurityTab />}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

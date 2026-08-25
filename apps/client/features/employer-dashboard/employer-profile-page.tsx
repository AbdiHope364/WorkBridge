"use client";

import Link from "next/link";
import { BellIcon } from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import {
  CompanyProfile,
  EmployerProfile,
  IndividualEmployerProfile,
  UpdateCompanyProfileRequest,
  UpdateIndividualEmployerProfileRequest,
} from "@repo/api-client";
import { useProfile } from "@/contexts/profile-context";
import { ReactNode, SVGProps, useState, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { api } from "../../lib/api";
;
import { useNotifications } from "@/contexts/notification-context";
import { env } from "../../lib/env";

type IconProps = SVGProps<SVGSVGElement>;
type ProfileTab = "personal" | "company" | "verification" | "security";

const placeholderIndividualProfile = {
  name: "Your Name",
  title: "Type a title",
  activeJobs: 0,
  workersHired: 0,
  fields: {
    fullName: "Eg. Robera Wakjira",
    phone: "",
    location: { city: "Shegger", addressLine1: "", addressLine2: "" },
    gender: "",
    dateOfBirth: "",
    bio: "",
  },
};

const placeholderCompanyProfile = {
  name: "Company name",
  industry: "",
  location: { city: "", country: "" },
  activeJobs: 0,
  applications: 0,
  fields: {
    companyName: "",
    description: "",
    industry: "",
    headquarters: { country: "", region: "", city: "", addressLine: "" },
    website: "",
  },
};

const individualTabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "personal", label: "Personal" },
  { id: "verification", label: "Verification" },
  { id: "security", label: "Security" },
];

const companyTabs: Array<{ id: ProfileTab; label: string }> = [
  { id: "company", label: "Company" },
  { id: "verification", label: "Verification" },
  { id: "security", label: "Security" },
];

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 6 9 12l6 6M9.5 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 8.5 9.5 6h5L16 8.5h3v10H5v-10h3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ScanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4H4v3m13-3h3v3M4 17v3h3m13-3v3h-3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M10 10h.01M14 10h.01M10 14h.01M14 14h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2M5 10h14v10H5V10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeOffIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 4 16 16M9.5 9.5A3.5 3.5 0 0 0 14 14m2.2 2.2A10.6 10.6 0 0 1 12 17.5C6.5 17.5 3.5 12 3.5 12a17 17 0 0 1 3.2-3.8m3.1-1.5A9.7 9.7 0 0 1 12 6.5c5.5 0 8.5 5.5 8.5 5.5a16 16 0 0 1-2 2.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 13a5 5 0 0 0 7 0l1.5-1.5a5 5 0 0 0-7-7L10.5 5.5m3.5 5.5a5 5 0 0 0-7 0L5.5 12.5a5 5 0 0 0 7 7l1-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocumentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4h6l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13 4v4h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Avatar({
  small = false,
  initials = "?",
}: {
  small?: boolean;
  initials?: string;
}) {
  return (
    <span
      className={
        `grid shrink-0 place-items-center rounded-full border-4 border-[#d8d4bc] bg-[#111827] font-semibold text-[#f4b28a] shadow-inner ` +
        (small ? "h-10 w-10 text-xs" : "h-[74px] w-[74px] text-lg")
      }
    >
      {initials}
    </span>
  );
}

export function cloudinaryUrl(publicId: string | undefined): string | null {
  return publicId
    ? `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`
    : null;
}

function Field({
  label,
  value,
  wide = false,
  editing = false,
  onChange,
}: {
  label: string;
  value: string;
  wide?: boolean;
  editing?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <label className={wide ? "sm:col-span-2" : undefined}>
      <span className="text-xs font-normal text-black">{label}</span>
      <input
        readOnly={!editing}
        value={value}
        onChange={
          editing && onChange ? (e) => onChange(e.target.value) : undefined
        }
        className={`mt-1 h-10 w-full rounded border px-3 text-xs text-[#4b4b4b] outline-none transition-colors ${
          editing
            ? "border-[#c5c5c9] bg-white focus:border-[#00aaa8] focus:ring-1 focus:ring-[#00aaa8]"
            : "border-[#c5c5c9] bg-[#ececec]"
        }`}
      />
    </label>
  );
}

function Header({ profile }: { profile: EmployerProfile }) {
  const isCompany = profile.employerType === "COMPANY_EMPLOYER";
  const { badgeCounts } = useNotifications();

  const unread = badgeCounts?.data.totalUnread ?? 0;

  const imageId = isCompany
    ? (profile as CompanyProfile).companyLogoUrl?.publicId
    : (profile as IndividualEmployerProfile).profilePictureUrl?.publicId;

  const initials = isCompany
    ? ((profile as CompanyProfile).companyName?.charAt(0) ?? "C")
    : ((profile as IndividualEmployerProfile).fullName?.charAt(0) ?? "I");

  const avatarSrc = cloudinaryUrl(imageId);

  return (
    <header className="flex h-[50px] items-center justify-between border-b border-[#d9d9df] bg-white px-6 shadow-[0_2px_5px_rgba(15,23,42,0.16)] md:px-10">
      <Link
        href="/"
        aria-label="WorkBridge home"
        className="hidden h-full w-[82px] items-center justify-center text-[#172653] md:flex"
      >
        <span className="relative h-11 w-7">
          <span className="absolute left-1/2 top-0 h-11 w-0.5 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute bottom-2 left-1 h-0.5 w-6 rotate-[60deg] rounded-full bg-current" />
          <span className="absolute bottom-2 right-1 h-0.5 w-6 -rotate-[60deg] rounded-full bg-current" />
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-8">
        <Link
          href="/dashboard/employer/notifications"
          aria-label="Notifications"
          className="relative inline-flex items-center justify-center"
        >
          <BellIcon className="h-6 w-6 text-black" />

          {unread > 0 && (
            <span className="absolute top-2 right-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#00aaa8] px-1 text-[10px] font-bold leading-none text-white shadow-sm">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>
        <Link href="/dashboard/employer/profile" aria-label="Profile">
          {avatarSrc ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={avatarSrc}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Avatar small initials={initials} />
          )}
        </Link>
      </div>
    </header>
  );
}

function ProfileSummary({
  profile,
  onEditClick,
}: {
  profile: IndividualEmployerProfile;
  onEditClick: () => void;
}) {
  const name = profile.fullName || placeholderIndividualProfile.name;
  const title = profile.occupation || placeholderIndividualProfile.title;
  const activeJobs =
    profile.totalJobsPosted ?? placeholderIndividualProfile.activeJobs;
  const workersHired =
    profile.totalHires ?? placeholderIndividualProfile.workersHired;
  const avatarSrc = cloudinaryUrl(profile.profilePictureUrl?.publicId);
  const initials = name.charAt(0);

  return (
    <section className="overflow-hidden rounded-lg border border-[#d5d6df] bg-white">
      <div className="h-[45px] bg-[#56627f]" />
      <div className="-mt-8 flex flex-col items-center px-6 pb-5 text-center">
        {avatarSrc ? (
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-[#d8d4bc]">
            <Image
              src={avatarSrc}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <Avatar initials={initials} />
        )}

        <h1 className="mt-2 text-2xl font-normal leading-tight text-[#333]">
          {name}
        </h1>
        <p className="mt-1 text-xs text-[#6b6b6b]">{title}</p>

        <div className="mt-2 grid grid-cols-[70px_1px_70px] items-center">
          <div>
            <strong className="block text-xl font-normal leading-none text-[#00aaa8]">
              {activeJobs}
            </strong>
            <span className="text-[9px] text-[#555]">Active Jobs</span>
          </div>
          <span className="h-7 bg-[#d3d3d8]" />
          <div>
            <strong className="block text-xl font-normal leading-none text-[#00aaa8]">
              {workersHired}
            </strong>
            <span className="text-[9px] text-[#555]">Workers Hired</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="mt-4 h-6 w-[90px] rounded border border-[#c5c7cf] bg-white text-[10px] font-medium text-black hover:bg-[#f5f5f5]"
        >
          Edit Profile
        </button>
      </div>
    </section>
  );
}

function CompanySummary({
  profile,
  onEditClick,
}: {
  profile: CompanyProfile;
  onEditClick: () => void;
}) {
  const name = profile.companyName || placeholderCompanyProfile.name;
  const industry = profile.industry || placeholderCompanyProfile.industry;
  const city =
    profile.headquarters?.city || placeholderCompanyProfile.location.city;
  const activeJobs =
    profile.totalJobsPosted ?? placeholderCompanyProfile.activeJobs;
  const applications =
    profile.totalApplicantsReceived ?? placeholderCompanyProfile.applications;
  const bannerSrc = cloudinaryUrl(profile.companyBannerUrl?.publicId);
  const logoSrc = cloudinaryUrl(profile.companyLogoUrl?.publicId);
  const initials = name.charAt(0);

  return (
    <section className="overflow-hidden rounded-lg border border-[#d5d6df] bg-white">
      <div className="relative h-40">
        <div className=" left-0 top-0  h-28 bg-[#0f1f46]">
          {bannerSrc && (
            <Image
              src={bannerSrc}
              alt="Company banner"
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="absolute left-6 top-6 h-20 w-20 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Company logo"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
              {initials}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 px-6 pb-6 pt-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-[#172653]">{name}</h1>
          <p className="text-sm text-[#555]">{industry}</p>
          <p className="text-xs text-[#6b6b6b]">{city}</p>
        </div>

        <div className="grid grid-cols-[88px_1px_88px] items-center justify-center gap-4 text-center text-sm">
          <div>
            <strong className="block text-xl font-normal leading-none text-[#00aaa8]">
              {activeJobs}
            </strong>
            <span className="text-[10px] text-[#555]">Active Jobs</span>
          </div>
          <span className="h-7 bg-[#d3d3d8]" />
          <div>
            <strong className="block text-xl font-normal leading-none text-[#00aaa8]">
              {applications}
            </strong>
            <span className="text-[10px] text-[#555]">Applications</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEditClick}
          className="mx-auto mt-3 h-10 w-[180px] rounded bg-[#172653] text-sm font-semibold text-white hover:opacity-90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          Edit Company Profile
        </button>
      </div>
    </section>
  );
}

function TabBar({
  activeTab,
  setActiveTab,
  options,
}: {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
  options: Array<{ id: ProfileTab; label: string }>;
}) {
  return (
    <div className="grid grid-cols-3 border-b border-[#cfd1d8]">
      {options.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className="relative h-[42px] text-base font-normal text-black"
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 h-1 w-full bg-[#00aaa8]" />
          )}
        </button>
      ))}
    </div>
  );
}

function PersonalTab({
  profile,
  editing,
  onSave,
}: {
  profile: IndividualEmployerProfile;
  editing: boolean;
  onSave: (payload: UpdateIndividualEmployerProfileRequest) => Promise<void>;
}) {
  const [fields, setFields] = useState({
    fullName: profile.fullName ?? "",
    phone: profile.phoneNumber ?? "",
    city: profile.location?.city ?? "",
    addressLine1: profile.location?.addressLine1 ?? "",
    addressLine2: profile.location?.addressLine2 ?? "",
    gender: profile.gender ?? "",
    dateOfBirth: profile.dateOfBirth ?? "",
    bio: profile.bio ?? "",
  });

  // Avatar — same deferred pattern as logo/banner in CompanyTab
  const [avatarSrc, setAvatarSrc] = useState(
    cloudinaryUrl(profile.profilePictureUrl?.publicId),
  );
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const patch = useCallback((key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setPendingAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const discardAvatar = () => {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setPendingAvatar(null);
    setAvatarPreview(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      // Upload avatar first if staged, then patch text fields
      if (pendingAvatar) {
        const updated = await api.profiles.employer.uploadAvatar(pendingAvatar);
        setAvatarSrc(cloudinaryUrl(updated.profilePictureUrl?.publicId));
        if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        setPendingAvatar(null);
        setAvatarPreview(null);
      }

      await onSave({
        fullName: fields.fullName || undefined,
        phoneNumber: fields.phone || undefined,
        gender:
          (fields.gender as UpdateIndividualEmployerProfileRequest["gender"]) ||
          undefined,
        dateOfBirth: fields.dateOfBirth || undefined,
        bio: fields.bio || undefined,
        location: fields.city
          ? {
              city: fields.city,
              addressLine1: fields.addressLine1,
              addressLine2: fields.addressLine2,
            }
          : undefined,
      });
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const displayAvatarSrc = avatarPreview ?? avatarSrc;
  const initials = fields.fullName?.charAt(0) ?? "?";

  return (
    <div className="p-5 sm:px-7">
      {saveError && (
        <div
          role="alert"
          className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {saveError}
        </div>
      )}
      {editing && (
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border-4 border-[#d8d4bc] bg-[#111827]">
            {displayAvatarSrc ? (
              <Image
                src={displayAvatarSrc}
                alt="Profile picture preview"
                fill
                loading="eager"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-[#f4b28a]">
                {initials}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <label className="flex h-7 cursor-pointer items-center justify-center rounded border border-[#c5c7cf] bg-white px-3 text-[11px] font-semibold text-[#172653] hover:bg-[#f5f5f5]">
              {pendingAvatar
                ? "Change Selection"
                : displayAvatarSrc
                  ? "Change Photo"
                  : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
              />
            </label>

            {pendingAvatar && (
              <button
                type="button"
                onClick={discardAvatar}
                className="h-7 cursor-pointer rounded border border-red-200 bg-white px-3 text-[11px] font-semibold text-red-500 hover:bg-red-50"
              >
                Discard
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Field
          label="Full Name"
          value={fields.fullName}
          editing={editing}
          onChange={(v) => patch("fullName", v)}
        />
        <Field
          label="Phone Number"
          value={fields.phone}
          editing={editing}
          onChange={(v) => patch("phone", v)}
        />
        <Field
          label="City"
          value={fields.city}
          editing={editing}
          onChange={(v) => patch("city", v)}
        />
        <Field
          label="Gender"
          value={fields.gender}
          editing={editing}
          onChange={(v) => patch("gender", v)}
        />
        <Field
          label="Date of Birth"
          value={fields.dateOfBirth}
          editing={editing}
          onChange={(v) => patch("dateOfBirth", v)}
        />
        <Field
          label="Address Line 1"
          value={fields.addressLine1}
          editing={editing}
          onChange={(v) => patch("addressLine1", v)}
        />
        <Field
          label="Address Line 2"
          value={fields.addressLine2}
          editing={editing}
          onChange={(v) => patch("addressLine2", v)}
        />
        <Field
          label="Bio"
          value={fields.bio}
          editing={editing}
          onChange={(v) => patch("bio", v)}
          wide
        />
      </div>

      {editing && (
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="mt-5 h-10 w-full cursor-pointer rounded bg-[#172653] text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
      )}
    </div>
  );
}

function UploadCard({ title, caption }: { title: string; caption: string }) {
  return (
    <article className="rounded-lg border border-[#dedfe6] bg-white p-5">
      <h3 className="inline-flex items-center gap-2 text-base font-semibold text-black">
        <LinkIcon className="h-4 w-4 text-[#8b8b8b]" />
        {title}
      </h3>
      <div className="mx-auto mt-4 grid h-[75px] max-w-[150px] place-items-center border border-dashed border-[#9fa1a8] text-[#777]">
        <div className="text-center">
          <CameraIcon className="mx-auto h-5 w-5" />
          <p className="mt-2 text-[10px]">{caption}</p>
        </div>
      </div>
      <p className="mx-auto mt-2 max-w-[145px] text-center text-[9px] italic leading-tight text-[#777]">
        Ensure all text is clearly visible and within the frame.
      </p>
    </article>
  );
}

function VerificationTab() {
  return (
    <div className="px-6 pb-7 pt-4 sm:px-14">
      <h2 className="text-xl font-normal text-black">
        National Id Verification
      </h2>
      <p className="mt-1 text-sm text-[#555]">
        Follow below instructions and provide necessary documents.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <UploadCard title="Front of ID" caption="Capture Front" />
        <UploadCard title="Back of ID" caption="Capture Back" />
      </div>

      <section className="mt-5 grid gap-5 rounded-lg border border-[#dedfe6] bg-white p-5 sm:grid-cols-[120px_1fr] sm:items-center">
        <div className="grid h-[88px] w-[88px] place-items-center rounded-full border-[3px] border-[#00a77f] bg-[#dde9e6] text-[#00a77f] sm:mx-auto">
          <ScanIcon className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">
            Selfie Verification
          </h3>
          <p className="mt-2 max-w-[390px] text-xs leading-tight text-[#555]">
            To verify your identity, we need to compare your live photo with the
            photo on your ID. Position your face in the center of the frame and
            look directly at camera.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded bg-[#dff4ef] px-3 py-1 text-[10px] text-[#49715f]">
              Good Lighting
            </span>
            <span className="rounded bg-[#dff4ef] px-3 py-1 text-[10px] text-[#49715f]">
              No Glasses
            </span>
          </div>
        </div>
      </section>

      <button className="mt-6 h-10 w-full rounded bg-[#172653] text-lg font-semibold text-white">
        Submit For Review
      </button>
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label>
      <span className="text-xs text-black">
        {label} <span className="text-red-500">*</span>
      </span>
      <span className="mt-1 flex h-10 items-center gap-3 rounded-lg border border-[#c5c7cf] bg-white px-3">
        <LockIcon className="h-4 w-4 shrink-0 text-[#9b9b9b]" />
        <input
          type="password"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#999]"
        />
        <EyeOffIcon className="h-4 w-4 shrink-0 text-[#9b9b9b]" />
      </span>
    </label>
  );
}

function SecurityTab() {
  return (
    <div className="px-6 pb-20 pt-4 sm:px-14">
      <h2 className="text-xl font-normal text-black">Security</h2>
      <p className="mt-1 text-sm text-[#555]">
        Change your password if it is less secure.
      </p>

      <div className="mt-6 max-w-[430px] space-y-5">
        <PasswordField
          label="Old Password"
          placeholder="Enter your old password"
        />
        <PasswordField
          label="New Password"
          placeholder="Enter your new password"
        />
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your new password"
        />

        <button className="h-10 w-full rounded bg-[#172653] text-base font-semibold text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function CompanyTab({
  profile,
  editing,
  onSave,
}: {
  profile: CompanyProfile;
  editing: boolean;
  onSave: (payload: UpdateCompanyProfileRequest) => Promise<void>;
  isSaving: boolean;
}) {
  const [fields, setFields] = useState({
    companyName: profile.companyName ?? "",
    industry: profile.industry ?? "",
    hqCity: profile.headquarters?.city ?? "",
    hqCountry: profile.headquarters?.country ?? "",
    hqRegion: profile.headquarters?.region ?? "",
    hqAddressLine: profile.headquarters?.addressLine ?? "",
    website: profile.officialWebsite ?? "",
    description: profile.companyDescription ?? "",
    tagline: profile.tagline ?? "",
  });

  const [logoSrc, setLogoSrc] = useState(
    cloudinaryUrl(profile.companyLogoUrl?.publicId),
  );
  const [bannerSrc, setBannerSrc] = useState(
    cloudinaryUrl(profile.companyBannerUrl?.publicId),
  );

  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const patch = useCallback((key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (logoPreview) URL.revokeObjectURL(logoPreview);

    const blobUrl = URL.createObjectURL(file);
    setPendingLogo(file);
    setLogoPreview(blobUrl);
    e.target.value = "";
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (bannerPreview) URL.revokeObjectURL(bannerPreview);

    const blobUrl = URL.createObjectURL(file);
    setPendingBanner(file);
    setBannerPreview(blobUrl);
    e.target.value = "";
  };

  const discardLogo = () => {
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setPendingLogo(null);
    setLogoPreview(null);
  };

  const discardBanner = () => {
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setPendingBanner(null);
    setBannerPreview(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setUploadError(null);
    try {
      if (pendingLogo) {
        const updated = await api.profiles.employer.uploadLogo(pendingLogo);
        setLogoSrc(cloudinaryUrl(updated.companyLogoUrl?.publicId));
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setPendingLogo(null);
        setLogoPreview(null);
      }

      if (pendingBanner) {
        const updated = await api.profiles.employer.uploadBanner(pendingBanner);
        setBannerSrc(cloudinaryUrl(updated.companyBannerUrl?.publicId));
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setPendingBanner(null);
        setBannerPreview(null);
      }

      await onSave({
        companyName: fields.companyName || undefined,
        industry: fields.industry || undefined,
        officialWebsite: fields.website || undefined,
        companyDescription: fields.description || undefined,
        tagline: fields.tagline || undefined,
        headquarters: fields.hqCity
          ? {
              city: fields.hqCity,
              country: fields.hqCountry,
              region: fields.hqRegion,
              addressLine: fields.hqAddressLine,
            }
          : undefined,
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const displayLogoSrc = logoPreview ?? logoSrc;
  const displayBannerSrc = bannerPreview ?? bannerSrc;

  return (
    <div className="p-5 sm:px-7">
      {uploadError && (
        <div
          role="alert"
          className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {uploadError}
        </div>
      )}

      {(editing || !logoSrc || !bannerSrc) && (
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-[#d9d9df] bg-white p-4 text-center">
            <div className="relative mx-auto mb-3 h-28 w-28 overflow-hidden rounded-3xl bg-[#e9eef5]">
              {displayLogoSrc ? (
                <Image
                  src={displayLogoSrc}
                  loading="eager"
                  alt="Company logo preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[#172653]">
                  {fields.companyName?.charAt(0) ?? "?"}
                </div>
              )}
            </div>

            <p className="mt-1 text-[11px] leading-tight text-[#555]">
              Recommended 200×200px.
            </p>

            {editing && (
              <div className="mt-4 flex flex-col gap-2">
                <label className="flex h-9 w-full cursor-pointer items-center justify-center rounded border border-[#c5c7cf] bg-white text-[11px] font-semibold text-[#172653] hover:bg-[#f5f5f5]">
                  {pendingLogo
                    ? "Change Selection"
                    : displayLogoSrc
                      ? "Change Logo"
                      : "Select Logo"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleLogoChange}
                  />
                </label>
                {pendingLogo && (
                  <button
                    type="button"
                    onClick={discardLogo}
                    className="h-9 w-full rounded border border-red-200 bg-white text-[11px] font-semibold text-red-500 hover:bg-red-50"
                  >
                    Discard
                  </button>
                )}
              </div>
            )}
          </article>
          <article className="rounded-2xl border border-[#d9d9df] bg-white p-4 text-center">
            <div className="relative mx-auto mb-3 h-28 w-full overflow-hidden rounded-3xl bg-[#e9eef5]">
              {displayBannerSrc ? (
                <Image
                  src={displayBannerSrc}
                  loading="eager"
                  alt="Company banner preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-[#9b9b9b]">
                  No banner
                </div>
              )}
            </div>

            <p className="mt-1 text-[11px] leading-tight text-[#555]">
              Recommended 1200×450px.
            </p>

            {editing && (
              <div className="mt-4 flex flex-col gap-2">
                <label className="flex h-9 w-full cursor-pointer items-center justify-center rounded border border-[#c5c7cf] bg-white text-[11px] font-semibold text-[#172653] hover:bg-[#f5f5f5]">
                  {pendingBanner
                    ? "Change Selection"
                    : displayBannerSrc
                      ? "Change Banner"
                      : "Select Banner"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleBannerChange}
                  />
                </label>
                {pendingBanner && (
                  <button
                    type="button"
                    onClick={discardBanner}
                    className="h-9 w-full rounded border border-red-200 bg-white text-[11px] font-semibold text-red-500 hover:bg-red-50"
                  >
                    Discard
                  </button>
                )}
              </div>
            )}
          </article>
        </div>
      )}

      <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <Field
          label="Company Name"
          value={fields.companyName}
          editing={editing}
          onChange={(v) => patch("companyName", v)}
        />
        <Field
          label="Industry"
          value={fields.industry}
          editing={editing}
          onChange={(v) => patch("industry", v)}
        />
        <Field
          label="Tagline"
          value={fields.tagline}
          editing={editing}
          onChange={(v) => patch("tagline", v)}
          wide
        />
        <Field
          label="City"
          value={fields.hqCity}
          editing={editing}
          onChange={(v) => patch("hqCity", v)}
        />
        <Field
          label="Country"
          value={fields.hqCountry}
          editing={editing}
          onChange={(v) => patch("hqCountry", v)}
        />
        <Field
          label="Region"
          value={fields.hqRegion}
          editing={editing}
          onChange={(v) => patch("hqRegion", v)}
        />
        <Field
          label="Address"
          value={fields.hqAddressLine}
          editing={editing}
          onChange={(v) => patch("hqAddressLine", v)}
          wide
        />
        <Field
          label="Website"
          value={fields.website}
          editing={editing}
          onChange={(v) => patch("website", v)}
          wide
        />
        <Field
          label="Company Description"
          value={fields.description}
          editing={editing}
          onChange={(v) => patch("description", v)}
          wide
        />
      </div>

      {editing && (
        <button
          type="button"
          disabled={isSaving}
          onClick={handleSave}
          className="mt-5 h-10 w-full rounded bg-[#172653] text-lg font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
      )}
    </div>
  );
}

function StatusMarker({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex h-3.5 w-3.5 rounded-full ${active ? "bg-[#00aaa8]" : "bg-[#d9d9df]"}`}
    />
  );
}

function VerificationStep({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold text-[#1b293e]">
      <StatusMarker active={active} />
      <span>{label}</span>
    </div>
  );
}

function CompanyVerificationTab() {
  return (
    <div className="px-6 pb-7 pt-4 sm:px-14">
      <div className="rounded-2xl border border-[#dde2eb] bg-white p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <VerificationStep label="Submitted" active />
          <VerificationStep label="Under review" active />
          <VerificationStep label="Verified" active={false} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#dedfe6] bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6a6b78]">
                Business Licence
              </p>
              <p className="mt-2 text-sm text-[#1b293e]">
                Official document issued by government authorities authorizing
                your business operations.
              </p>
            </div>
            <span className="rounded-full bg-[#dcf6e9] px-2.5 py-1 text-[10px] font-semibold text-[#1b7a58]">
              VERIFIED
            </span>
          </div>
          <p className="mt-4 text-sm text-[#0f9b88]">License_v3_final.pdf</p>
        </article>

        <article className="rounded-2xl border border-[#dedfe6] bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6a6b78]">
                Tax Registration
              </p>
              <p className="mt-2 text-sm text-[#1b293e]">
                Proof of your company&apos;s tax identification number and
                registration status.
              </p>
            </div>
            <span className="rounded-full bg-[#f7f4e8] px-2.5 py-1 text-[10px] font-semibold text-[#7a6c2a]">
              PENDING
            </span>
          </div>
          <p className="mt-4 text-sm text-[#555]">Reviewing…</p>
          <button className="mt-4 text-sm font-semibold text-[#00aaa8]">
            View File
          </button>
        </article>

        <article className="rounded-2xl border border-dashed border-[#9fa1a8] bg-[#f6f8fb] p-5 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#172653]">
            <DocumentIcon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-base font-semibold text-black">
            Company Registration
          </p>
          <p className="mt-2 text-[11px] leading-tight text-[#555]">
            Article of incorporation or Certificate of Formation required.
          </p>
          <button className="mt-5 h-9 w-full rounded border border-[#c5c7cf] bg-white text-[11px] font-semibold text-[#172653]">
            Upload Document
          </button>
        </article>
      </div>

      <div className="mt-6 rounded-2xl border border-[#1f7070] bg-[#e8f6f5] p-4 text-sm text-[#173d3b]">
        <strong className="block font-semibold">Company Verification</strong>
        <p className="mt-1 text-[13px] text-[#3a5250]">
          Verifying your company helps you gain the &quot;Verified&quot; badge
          to increase candidate trust by up to 40%. Your document is kept
          securely.
        </p>
      </div>
    </div>
  );
}

function IndividualProfile({
  profile,
}: {
  profile: IndividualEmployerProfile;
}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { refreshProfile } = useProfile();

  const handleSave = useCallback(
    async (payload: UpdateIndividualEmployerProfileRequest) => {
      setIsSaving(true);
      setSaveError(null);
      try {
        await api.profiles.employer.updateMyIndividualProfile(payload);
        await refreshProfile();
        setEditing(false);
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : "Failed to save.");
      } finally {
        setIsSaving(false);
      }
    },
    [refreshProfile],
  );

  const tabContent: Record<ProfileTab, ReactNode> = {
    personal: (
      <PersonalTab profile={profile} editing={editing} onSave={handleSave} />
    ),
    company: null,
    verification: <VerificationTab />,
    security: <SecurityTab />,
  };

  return (
    <div className="w-full max-w-[590px] px-6 pb-5 pt-5 md:px-0">
      <ProfileSummary
        profile={profile}
        onEditClick={() => setEditing((e) => !e)}
      />

      {saveError && (
        <div
          role="alert"
          className="mt-2 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {saveError}
        </div>
      )}

      <section className="mt-3 overflow-hidden rounded-lg border border-[#d5d6df] bg-white">
        <TabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={individualTabs}
        />
        {tabContent[activeTab]}
      </section>

      <Link
        href="/dashboard/employer"
        className="mt-4 inline-flex items-center gap-2 text-xl font-normal text-black"
      >
        <BackIcon className="h-5 w-5" />
        Back
      </Link>
    </div>
  );
}

function CompanyProfileView({ profile }: { profile: CompanyProfile }) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("company");
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { refreshProfile } = useProfile();

  const handleSave = useCallback(
    async (payload: UpdateCompanyProfileRequest) => {
      setIsSaving(true);
      setSaveError(null);
      try {
        await api.profiles.employer.updateCompanyProfile(payload);
        await refreshProfile();
        setEditing(false);
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : "Failed to save.");
      } finally {
        setIsSaving(false);
      }
    },
    [refreshProfile],
  );

  const tabContent: Record<ProfileTab, ReactNode> = {
    personal: null,
    company: (
      <CompanyTab
        profile={profile}
        editing={editing}
        onSave={handleSave}
        isSaving={isSaving}
      />
    ),
    verification: <CompanyVerificationTab />,
    security: <SecurityTab />,
  };

  return (
    <div className="w-full max-w-[930px] px-6 pb-5 pt-5 md:px-0">
      <CompanySummary
        profile={profile}
        onEditClick={() => setEditing((e) => !e)}
      />

      {saveError && (
        <div
          role="alert"
          className="mt-2 rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
        >
          {saveError}
        </div>
      )}

      <section className="mt-3 overflow-hidden rounded-lg border border-[#d5d6df] bg-white">
        <TabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={companyTabs}
        />
        {tabContent[activeTab]}
      </section>

      <Link
        href="/dashboard/employer"
        className="mt-4 inline-flex items-center gap-2 text-xl font-normal text-black"
      >
        <BackIcon className="h-5 w-5" />
        Back
      </Link>
    </div>
  );
}

export function EmployerProfilePage() {
  const { isLoading, employerProfile } = useProfile();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Loading…
        </div>
      </main>
    );
  }

  if (!employerProfile) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Loading profile…
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-black">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Header profile={employerProfile} />

          <div className="flex flex-1 justify-center">
            {employerProfile.employerType === "INDIVIDUAL_EMPLOYER" ? (
              <IndividualProfile
                profile={employerProfile as IndividualEmployerProfile}
              />
            ) : (
              <CompanyProfileView profile={employerProfile as CompanyProfile} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

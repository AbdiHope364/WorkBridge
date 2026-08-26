"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// import { useCurrentUser } from "../../hooks/use-current-user";
import { useProfile } from "@/contexts/profile-context";
import { api } from "../../lib/api";
import { EmployerSidebar } from "./components/employer-sidebar";

import type {
  CompanySize,
  Headquarters,
  UpdateCompanyProfileRequest,
  UpdateIndividualEmployerProfileRequest,
} from "@repo/api-client";
import Link from "next/link";
import { BellIcon } from "../jobseeker-dashboard/components/dashboard-icons";
import { useAuth } from "@/contexts/auth-context";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProfileType = "company" | "individual";

interface CompanyFormState {
  companyName: string;
  industry: string;
  companySize: CompanySize | "";
  foundedYear: string;
  officialWebsite: string;
  companyDescription: string;
  tagline: string;
  phoneNumber: string;
  address: string;
  businessLicenseNumber: string;
  nationalIdOrPassportNumber: string;
  // Headquarters fields flattened for easy input binding
  hqCountry: string;
  hqRegion: string;
  hqCity: string;
  hqAddressLine: string;
}

interface IndividualFormState {
  fullName: string;
  phoneNumber: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  bio: string;
  address: string;
  nationalIdNumber: string;
  businessLicenseNumber: string;
  // Location fields flattened
  city: string;
  addressLine1: string;
  addressLine2: string;
}

const defaultCompanyState: CompanyFormState = {
  companyName: "",
  industry: "",
  companySize: "",
  foundedYear: "",
  officialWebsite: "",
  companyDescription: "",
  tagline: "",
  phoneNumber: "",
  address: "",
  businessLicenseNumber: "",
  nationalIdOrPassportNumber: "",
  hqCountry: "",
  hqRegion: "",
  hqCity: "",
  hqAddressLine: "",
};

const defaultIndividualState: IndividualFormState = {
  fullName: "",
  phoneNumber: "",
  occupation: "",
  gender: "",
  dateOfBirth: "",
  bio: "",
  address: "",
  nationalIdNumber: "",
  businessLicenseNumber: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
};

const COMPANY_SIZES: CompanySize[] = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5000+",
];

function Avatar({ small = false }: { small?: boolean }) {
  return (
    <span
      className={
        `grid shrink-0 place-items-center rounded-full border-4 border-[#d8d4bc] bg-[#111827] font-semibold text-[#f4b28a] shadow-inner ` +
        (small ? "h-10 w-10 text-xs" : "h-[74px] w-[74px] text-lg")
      }
    >
      E
    </span>
  );
}

function Header() {
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
        >
          <BellIcon className="h-5 w-5 text-black" />
        </Link>
        <Link href="/dashboard/employer/profile" aria-label="Profile">
          <Avatar small />
        </Link>
      </div>
    </header>
  );
}

const inputClass =
  "mt-1 h-10 w-full rounded border border-[#c5c5c9] bg-white px-3 text-xs text-[#4b4b4b] outline-none focus:border-[#00aaa8] focus:ring-1 focus:ring-[#00aaa8]";

function EditableField({
  label,
  value,
  onChange,
  wide = false,
  placeholder = "",
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className={wide ? "sm:col-span-2" : undefined}>
      <span className="text-xs font-normal text-black">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  wide = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  wide?: boolean;
  required?: boolean;
}) {
  return (
    <label className={wide ? "sm:col-span-2" : undefined}>
      <span className="text-xs font-normal text-black">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProfileTypeSwitcher({
  value,
  onChange,
}: {
  value: ProfileType;
  onChange: (v: ProfileType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Select employer profile type"
      className="inline-flex rounded-full border border-[#c5c7cf] bg-white p-1"
    >
      {(["company", "individual"] as const).map((type) => {
        const active = value === type;
        return (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(type)}
            className={[
              "h-9 min-w-[108px] rounded-full px-5 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00aaa8]",
              active
                ? "bg-[#172653] text-white shadow-sm"
                : "bg-transparent text-[#555] hover:text-[#172653]",
            ].join(" ")}
          >
            {type === "company" ? "Company" : "Individual"}
          </button>
        );
      })}
    </div>
  );
}

function CompanyOnboardingForm({
  fields,
  onChange,
  onSave,
  isSaving,
}: {
  fields: CompanyFormState;
  onChange: (patch: Partial<CompanyFormState>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}) {
  return (
    <div className="p-5 sm:px-7">
      {/* Logo / Banner upload placeholders — wired up separately */}
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-[#d9d9df] bg-white p-4 text-center">
          <div className="mx-auto mb-3 flex h-28 w-28 items-center justify-center rounded-3xl bg-[#e9eef5] text-2xl font-semibold text-[#172653]">
            TS
          </div>
          <p className="text-sm font-semibold text-[#172653]">Company Logo</p>
          <p className="mt-2 text-[11px] leading-tight text-[#555]">
            Recommended 200×200px.
          </p>
          <button
            type="button"
            className="mt-4 h-9 w-full rounded border border-[#c5c7cf] bg-white text-[11px] font-semibold text-[#172653]"
          >
            Upload Logo
          </button>
        </article>

        <article className="rounded-2xl border border-[#d9d9df] bg-white p-4 text-center">
          <div className="mx-auto mb-3 h-28 w-full overflow-hidden rounded-3xl bg-[#e9eef5]">
            <div className="h-full bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center" />
          </div>
          <p className="text-sm font-semibold text-[#172653]">Company Banner</p>
          <p className="mt-2 text-[11px] leading-tight text-[#555]">
            Recommended 1200×450px.
          </p>
          <button
            type="button"
            className="mt-4 h-9 w-full rounded border border-[#c5c7cf] bg-white text-[11px] font-semibold text-[#172653]"
          >
            Upload Banner
          </button>
        </article>
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <EditableField
          label="Company Name"
          required
          value={fields.companyName}
          onChange={(v) => onChange({ companyName: v })}
          placeholder="e.g. Acme Corp"
        />
        <EditableField
          label="Industry"
          value={fields.industry}
          onChange={(v) => onChange({ industry: v })}
          placeholder="e.g. Software Development"
        />
        <SelectField
          label="Company Size"
          value={fields.companySize}
          onChange={(v) => onChange({ companySize: v as CompanySize | "" })}
          options={COMPANY_SIZES}
        />
        <EditableField
          label="Founded Year"
          value={fields.foundedYear}
          onChange={(v) => onChange({ foundedYear: v })}
          placeholder="e.g. 2010"
          type="number"
        />
        <EditableField
          label="Official Website"
          value={fields.officialWebsite}
          onChange={(v) => onChange({ officialWebsite: v })}
          placeholder="https://yourcompany.com"
          wide
        />
        <EditableField
          label="Tagline"
          value={fields.tagline}
          onChange={(v) => onChange({ tagline: v })}
          placeholder="A short company tagline"
          wide
        />
        <EditableField
          label="Description"
          value={fields.companyDescription}
          onChange={(v) => onChange({ companyDescription: v })}
          placeholder="What does your company do?"
          wide
        />

        {/* Headquarters */}
        <p className="text-xs font-semibold text-[#172653] sm:col-span-2 mt-2">
          Headquarters
        </p>
        <EditableField
          label="Country"
          required
          value={fields.hqCountry}
          onChange={(v) => onChange({ hqCountry: v })}
          placeholder="e.g. Ethiopia"
        />
        <EditableField
          label="Region / State"
          value={fields.hqRegion}
          onChange={(v) => onChange({ hqRegion: v })}
          placeholder="e.g. Addis Ababa"
        />
        <EditableField
          label="City"
          value={fields.hqCity}
          onChange={(v) => onChange({ hqCity: v })}
          placeholder="e.g. Addis Ababa"
        />
        <EditableField
          label="Address"
          value={fields.hqAddressLine}
          onChange={(v) => onChange({ hqAddressLine: v })}
          placeholder="Street address"
        />
        <EditableField
          label="Phone Number"
          required
          value={fields.phoneNumber}
          onChange={(v) => onChange({ phoneNumber: v })}
          placeholder="+251-900-000-000"
          type="tel"
        />
        <EditableField
          label="Company Address"
          value={fields.address}
          onChange={(v) => onChange({ address: v })}
          placeholder="Registered company address"
          wide
        />
        <EditableField
          label="Business License Number"
          required
          value={fields.businessLicenseNumber}
          onChange={(v) => onChange({ businessLicenseNumber: v })}
          placeholder="e.g. BL-123456"
        />
        <EditableField
          label="National ID / Passport Number"
          required
          value={fields.nationalIdOrPassportNumber}
          onChange={(v) => onChange({ nationalIdOrPassportNumber: v })}
          placeholder="e.g. ETH-123456789"
        />
      </div>

      <button
        type="button"
        disabled={isSaving}
        onClick={onSave}
        className="mt-6 h-11 w-full rounded bg-[#00aaa8] text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSaving ? "Saving…" : "Continue →"}
      </button>
    </div>
  );
}

function IndividualOnboardingForm({
  fields,
  onChange,
  onSave,
  isSaving,
}: {
  fields: IndividualFormState;
  onChange: (patch: Partial<IndividualFormState>) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}) {
  return (
    <div className="p-5 sm:px-7">
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        <EditableField
          label="Full Name"
          required
          value={fields.fullName}
          onChange={(v) => onChange({ fullName: v })}
          placeholder="e.g. Robera Wakjira"
        />
        <EditableField
          label="Phone Number"
          value={fields.phoneNumber}
          onChange={(v) => onChange({ phoneNumber: v })}
          placeholder="+251-900-000-000"
          type="tel"
        />
        <EditableField
          label="Occupation"
          value={fields.occupation}
          onChange={(v) => onChange({ occupation: v })}
          placeholder="e.g. Software Engineer"
        />
        <SelectField
          label="Gender"
          value={fields.gender}
          onChange={(v) => onChange({ gender: v })}
          options={["MALE", "FEMALE", "OTHER"]}
        />
        <EditableField
          label="Date of Birth"
          value={fields.dateOfBirth}
          onChange={(v) => onChange({ dateOfBirth: v })}
          type="date"
        />
        <EditableField
          label="City"
          value={fields.city}
          onChange={(v) => onChange({ city: v })}
          placeholder="e.g. Addis Ababa"
        />
        <EditableField
          label="Address Line 1"
          value={fields.addressLine1}
          onChange={(v) => onChange({ addressLine1: v })}
          placeholder="Street address"
        />
        <EditableField
          label="Address Line 2"
          value={fields.addressLine2}
          onChange={(v) => onChange({ addressLine2: v })}
          placeholder="Apartment, suite, etc. (optional)"
        />
        <EditableField
          label="Address"
          value={fields.address}
          onChange={(v) => onChange({ address: v })}
          placeholder="Your full address"
          wide
        />
        <EditableField
          label="National ID / Passport Number"
          required
          value={fields.nationalIdNumber}
          onChange={(v) => onChange({ nationalIdNumber: v })}
          placeholder="e.g. ETH-123456789"
        />
        <EditableField
          label="Business License Number"
          value={fields.businessLicenseNumber}
          onChange={(v) => onChange({ businessLicenseNumber: v })}
          placeholder="e.g. BL-123456"
        />
        <EditableField
          label="Bio"
          value={fields.bio}
          onChange={(v) => onChange({ bio: v })}
          placeholder="A short bio about yourself"
          wide
        />
      </div>

      <button
        type="button"
        disabled={isSaving}
        onClick={onSave}
        className="mt-6 h-11 w-full rounded bg-[#00aaa8] text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSaving ? "Saving…" : "Continue →"}
      </button>
    </div>
  );
}

function OnboardingShell() {
  const router = useRouter();
  const [profileType, setProfileType] = useState<ProfileType>("company");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [companyFields, setCompanyFields] =
    useState<CompanyFormState>(defaultCompanyState);
  const [individualFields, setIndividualFields] = useState<IndividualFormState>(
    defaultIndividualState,
  );

  const patchCompany = useCallback((patch: Partial<CompanyFormState>) => {
    setCompanyFields((prev) => ({ ...prev, ...patch }));
  }, []);

  const patchIndividual = useCallback((patch: Partial<IndividualFormState>) => {
    setIndividualFields((prev) => ({ ...prev, ...patch }));
  }, []);

  const { refreshProfile } = useProfile();

  const handleSaveCompany = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      const headquarters: Headquarters = {
        country: companyFields.hqCountry,
        region: companyFields.hqRegion,
        city: companyFields.hqCity,
        addressLine: companyFields.hqAddressLine,
      };

      const payload: UpdateCompanyProfileRequest = {
        companyName: companyFields.companyName || undefined,
        industry: companyFields.industry || undefined,
        companySize: (companyFields.companySize as CompanySize) || undefined,
        foundedYear: companyFields.foundedYear
          ? Number(companyFields.foundedYear)
          : undefined,
        officialWebsite: companyFields.officialWebsite || undefined,
        companyDescription: companyFields.companyDescription || undefined,
        tagline: companyFields.tagline || undefined,
        phoneNumber: companyFields.phoneNumber || undefined,
        address: companyFields.address || undefined,
        businessLicenseNumber: companyFields.businessLicenseNumber || undefined,
        nationalIdOrPassportNumber: companyFields.nationalIdOrPassportNumber || undefined,
        headquarters: companyFields.hqCountry ? headquarters : undefined,
      };

      await api.profiles.employer.createCompanyProfile(payload);
      await refreshProfile();
      router.replace("/dashboard/employer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }, [companyFields, router, refreshProfile]);

  const handleSaveIndividual = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      const payload: UpdateIndividualEmployerProfileRequest = {
        fullName: individualFields.fullName || undefined,
        phoneNumber: individualFields.phoneNumber || undefined,
        occupation: individualFields.occupation || undefined,
        gender:
          (individualFields.gender as UpdateIndividualEmployerProfileRequest["gender"]) ||
          undefined,
        dateOfBirth: individualFields.dateOfBirth || undefined,
        bio: individualFields.bio || undefined,
        address: individualFields.address || undefined,
        nationalIdNumber: individualFields.nationalIdNumber || undefined,
        businessLicenseNumber: individualFields.businessLicenseNumber || undefined,
        location: individualFields.city
          ? {
              city: individualFields.city,
              addressLine1: individualFields.addressLine1,
              addressLine2: individualFields.addressLine2,
            }
          : undefined,
      };

      await api.profiles.employer.createMyIndividualProfile(payload);
      await refreshProfile();
      router.replace("/dashboard/employer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }, [individualFields, router, refreshProfile]);

  return (
    <div className="w-full max-w-[590px] px-6 pb-8 pt-6 md:px-0">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-[#172653]">
          Welcome! Let&apos;s set up your employer profile.
        </h1>
        <p className="mt-1 text-sm text-[#6b6b6b]">
          You can always update these details later from your profile settings.
        </p>
      </div>

      <div className="mb-5 flex items-center gap-4">
        <ProfileTypeSwitcher value={profileType} onChange={setProfileType} />
        <span className="text-xs text-[#9b9b9b]">
          {profileType === "company"
            ? "Posting jobs on behalf of a company"
            : "Hiring as an individual or freelancer"}
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-lg border border-[#d5d6df] bg-white">
        {profileType === "company" ? (
          <CompanyOnboardingForm
            fields={companyFields}
            onChange={patchCompany}
            onSave={handleSaveCompany}
            isSaving={isSaving}
          />
        ) : (
          <IndividualOnboardingForm
            fields={individualFields}
            onChange={patchIndividual}
            onSave={handleSaveIndividual}
            isSaving={isSaving}
          />
        )}
      </section>
    </div>
  );
}

export function EmployerOnboardingPage() {
  const { isLoading } = useAuth();
  const { employerProfile } = useProfile();
  const router = useRouter();

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Loading…
        </div>
      </main>
    );
  }

  if (employerProfile) {
    router.replace("/dashboard/employer");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-black">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />
        <section className="flex min-w-0 flex-1 flex-col">
          <Header />
          <div className="flex flex-1 justify-center">
            <OnboardingShell />
          </div>
        </section>
      </div>
    </main>
  );
}

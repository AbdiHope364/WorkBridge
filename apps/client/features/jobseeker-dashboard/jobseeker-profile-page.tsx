"use client";

import {
  getProfileInitials,
  ProfileAvatar,
  ProfileTopHeader,
} from "./components/profile-settings-layout";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import {
  profileChecklist,
  profileEducation,
  profileExperience,
  profileSkills,
  profileSocialLinks,
} from "./profile-data";
import { EditBasicProfileModal } from "./modals/edit-basic-profile-modal";
import { EditProfileImageModal } from "./modals/edit-profile-image-modal";
import { EditEducationModal } from "./modals/edit-education-modal";
import { EditExperienceModal } from "./modals/edit-experience-modal";
import { EditResumesAndSocialsModal } from "./modals/edit-resumes-socials-modal";
import { ChangeEmailModal } from "./modals/change-email-modal";
import { ChangePasswordModal } from "./modals/change-password-modal";
import { api } from "../../lib/api";
import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import { useState } from "react";
import { useProfile } from "@/contexts/profile-context";
import {
  JobseekerProfile,
  UpdateJobseekerProfileRequest,
} from "@repo/api-client";
import { env } from "@/lib/env";
import { Spinner } from "@repo/ui";

function EditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V5h6v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="m7 12 3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmptyCircleIcon() {
  return (
    <span
      className="h-4 w-4 rounded-full border-2 border-slate-900"
      aria-hidden="true"
    />
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.4 6-11a6 6 0 0 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 4h3l1.5 4-2 1.2A12 12 0 0 0 15 14.7l1.2-2.1 3.8 1.7V17a3 3 0 0 1-3.5 3A15 15 0 0 1 4 7.5 3 3 0 0 1 7 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M7 4v3M17 4v3M5 9h14M6.5 6h11A1.5 1.5 0 0 1 19 7.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5v-11A1.5 1.5 0 0 1 6.5 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileShellCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        {action ? (
          <button
            type="button"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
          >
            + {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function IconButton({
  label,
  tone = "edit",
}: {
  label: string;
  tone?: "edit" | "delete";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={
        `grid h-6 w-6 place-items-center rounded text-xs transition ` +
        (tone === "delete"
          ? "text-rose-500 hover:bg-rose-50"
          : "text-emerald-600 hover:bg-emerald-50")
      }
    >
      {tone === "delete" ? <TrashIcon /> : <EditIcon />}
    </button>
  );
}

export function JobseekerProfilePage() {
  const { isLoading, isAuthenticated, user } = useAuth();
  const {
    isLoading: profileLoading,
    jobseekerProfile,
    setJobseekerProfile,
    refreshProfile,
  } = useProfile();

  const [modals, setModals] = useState({
    basicProfile: false,
    profileImage: false,
    education: false,
    experience: false,
    resumesSocials: false,
    changeEmail: false,
    changePassword: false,
  });

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleSave = async (
    modalName: keyof typeof modals,
    data: JobseekerProfile,
  ) => {
    try {
      setJobseekerProfile(data);
      await refreshProfile();
    } catch (error) {
      console.error(error);
    } finally {
      closeModal(modalName);
    }
  };
  // router.replace("/login?next=/dashboard/profile");
  //   }
  // }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    <Spinner className="h-16" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const initials = getProfileInitials(
    jobseekerProfile?.firstName ?? user?.fullName,
  );

  if (user?.role !== "jobseeker") {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Access denied. This page is only available to jobseekers.
        </div>
      </main>
    );
  }

  const fullName = `${jobseekerProfile?.firstName} ${jobseekerProfile?.lastName}`;

  return (
    <main className="h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 overflow-y-auto">
          <ProfileTopHeader
            condition={!jobseekerProfile?.avatar?.publicId}
            initials={initials}
            url={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${jobseekerProfile?.avatar?.publicId}`}
          />

          <div className="mx-auto grid max-w-295 gap-8 px-6 py-9 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-5">
              <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h1 className="text-sm font-black text-slate-950">
                    Profile Strength
                  </h1>
                  <span className="text-xs font-black text-emerald-600">
                    70%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[70%] rounded-full bg-emerald-500" />
                </div>
                <p className="mt-3 text-xs leading-5 text-neutral-600">
                  Complete your profile to get most job opportunities
                </p>
              </section>

              <nav className="space-y-3">
                {profileChecklist.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      `flex h-11 w-full items-center gap-3 rounded-md border px-4 text-left text-sm font-semibold transition ` +
                      (item.isComplete
                        ? "border-emerald-100 bg-emerald-100 text-slate-950"
                        : "border-slate-200 bg-white text-slate-950 hover:border-emerald-200")
                    }
                  >
                    {item.isComplete ? (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                        <CheckIcon />
                      </span>
                    ) : (
                      <EmptyCircleIcon />
                    )}
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            <section className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-5">
                  <button
                    type="button"
                    onClick={() => openModal("profileImage")}
                    className="relative group"
                  >
                    {jobseekerProfile?.avatar?.publicId ? (
                      <Image
                        src={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${jobseekerProfile.avatar.publicId}`}
                        alt="Profile Avatar"
                        width={100}
                        height={100}
                        style={{
                          borderRadius: 20,
                          height: "auto",
                          width: "auto",
                        }}
                      />
                    ) : (
                      <ProfileAvatar />
                    )}

                    <div className="absolute inset-0 flex items-end justify-end pr-1 pb-1">
                      <div className="p-2 bg-emerald-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition cursor-pointer">
                        <EditIcon className="h-3 w-3" />
                      </div>
                    </div>
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-normal leading-tight text-slate-950">
                          {fullName ?? "Abdi Abiot"}
                        </h2>
                        <p className="text-sm font-semibold text-teal-600">
                          {jobseekerProfile?.bio ?? "Full Stack developer"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openModal("basicProfile")}
                        aria-label="Edit profile"
                        className="grid h-6 w-6 place-items-center rounded text-emerald-600 transition hover:bg-emerald-50"
                      >
                        <EditIcon />
                      </button>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs text-neutral-600 sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <CalendarIcon />
                        {jobseekerProfile?.gender ?? "Male"}
                      </span>
                      <span className="flex items-center gap-2">
                        {jobseekerProfile?.dateOfBirth ?? "May 30, 2005"}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPinIcon />
                        {jobseekerProfile?.location?.toString() ??
                          "Dire Dawa, Ethiopia"}
                      </span>
                      <span className="flex items-center gap-2">
                        <PhoneIcon />
                        {jobseekerProfile?.phone ?? "+251-900-000-000"}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <ProfileShellCard title="Manage Credentials">
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-950">
                    Email
                    <div className="mt-1 flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500">
                      <span>{user?.email}</span>
                      <button
                        className="font-semibold text-emerald-600 hover:text-emerald-700"
                        type="button"
                        onClick={() => openModal("changeEmail")}
                      >
                        Change email
                      </button>
                    </div>
                  </label>
                  <label className="block text-xs font-semibold text-slate-950">
                    Password
                    <div className="mt-1 flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500">
                      <span>Change Password</span>
                      <button
                        type="button"
                        aria-label="Edit password"
                        onClick={() => openModal("changePassword")}
                        className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                      >
                        <EditIcon />
                      </button>
                    </div>
                  </label>
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Bio (optional)">
                <div className="rounded-md border border-slate-200 bg-white p-3">
                  <div className="mb-2 flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Edit bio"
                      onClick={() => openModal("basicProfile")}
                      className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                    >
                      <EditIcon />
                    </button>
                    <IconButton label="Delete bio" tone="delete" />
                  </div>
                  <textarea
                    readOnly
                    value={jobseekerProfile?.bio ?? ""}
                    placeholder="Say something about your self..."
                    className="h-20 w-full resize-none bg-transparent text-xs outline-none placeholder:text-neutral-400"
                  />
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Address Line 1">
                <div className="space-y-3">
                  {[
                    jobseekerProfile?.location?.addressLine1 ??
                      "youraddressline1@gmail.com",
                    jobseekerProfile?.location?.addressLine2 ??
                      "youraddressline2@gmail.com",
                  ].map((address, index) => (
                    <div
                      key={address}
                      className="flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500"
                    >
                      <span>Address Line {index + 1}</span>
                      <span className="ml-auto mr-3">{address}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={`Edit address ${index + 1}`}
                          onClick={() => openModal("basicProfile")}
                          className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                        >
                          <EditIcon />
                        </button>
                        <IconButton
                          label={`Delete address ${index + 1}`}
                          tone="delete"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Your Skills" action="Add Skills">
                <div className="rounded-md border border-slate-200 p-4">
                  <div className="flex flex-wrap gap-3">
                    {(jobseekerProfile?.skills ?? profileSkills).map(
                      (skill) => (
                        <span
                          key={skill.toString()}
                          className="inline-flex h-7 min-w-24 items-center justify-center rounded-full bg-emerald-100 px-4 text-xs font-medium text-emerald-600"
                        >
                          {skill.toString()}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </ProfileShellCard>

              <ProfileShellCard
                title="Your Experiences - 2 years"
                action="Add Experience"
              >
                <div className="rounded-md border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-emerald-600">
                        {jobseekerProfile?.experiences?.[0]?.position ??
                          profileExperience.role}
                      </h3>
                      <p className="mt-1 text-xs text-slate-950">
                        {jobseekerProfile?.experiences?.[0]?.companyName ??
                          profileExperience.company}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {jobseekerProfile?.experienceYears ??
                          profileExperience.period}
                      </p>
                      <p className="mt-3 text-xs text-neutral-600">
                        {jobseekerProfile?.experiences?.[0]?.description ??
                          profileExperience.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Edit experience"
                      onClick={() => openModal("experience")}
                      className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Your Education" action="Add Education">
                <div className="rounded-md border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black text-emerald-600">
                        {jobseekerProfile?.educations?.[0]?.fieldOfStudy ??
                          profileEducation.program}
                      </h3>
                      <p className="mt-1 text-xs text-slate-950">
                        {jobseekerProfile?.educations?.[0]?.schoolName ??
                          profileEducation.school}
                      </p>
                      <p className="mt-1 whitespace-pre-line text-xs text-neutral-500">
                        {jobseekerProfile?.educations?.[0]?.endDate ??
                          profileEducation.period}
                        {"\n"}
                        {jobseekerProfile?.educations?.[0]?.description ??
                          profileEducation.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Edit education"
                      onClick={() => openModal("education")}
                      className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Resume & Socials">
                <div className="space-y-3">
                  {(jobseekerProfile?.socialLinks ?? profileSocialLinks).map(
                    (link) => (
                      <div
                        key={link.platform}
                        className="flex h-9 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500"
                      >
                        <span className="truncate">{link.url}</span>
                        <div className="ml-3 flex items-center gap-1">
                          <button
                            type="button"
                            aria-label={`Edit ${link.platform}`}
                            onClick={() => openModal("resumesSocials")}
                            className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                          >
                            <EditIcon />
                          </button>
                          <IconButton
                            label={`Delete ${link.platform}`}
                            tone="delete"
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </ProfileShellCard>
            </section>
          </div>
        </section>
      </div>

      {/* Modals */}
      <EditBasicProfileModal
        isOpen={modals.basicProfile}
        onClose={() => closeModal("basicProfile")}
        initialData={{
          bio: jobseekerProfile?.bio,
          firstName: jobseekerProfile?.firstName?.split(" ")[0],
          lastName: jobseekerProfile?.lastName?.split(" ").slice(1).join(" "),
          phoneNumber: jobseekerProfile?.phone,
          gender: jobseekerProfile?.gender,
          dateOfBirth: jobseekerProfile?.dateOfBirth,
          currentPosition: jobseekerProfile?.currentPosition,
        }}
        onSave={(data) => handleSave("basicProfile", data)}
      />

      <EditProfileImageModal
        isOpen={modals.profileImage}
        onClose={() => closeModal("profileImage")}
        onSave={async (file) => {
          await api.profiles.jobseeker.uploadAvatar(file);
          await refreshProfile();
        }}
      />

      <EditEducationModal
        isOpen={modals.education}
        onClose={() => closeModal("education")}
        onSave={(data) => handleSave("education", data)}
      />

      <EditExperienceModal
        isOpen={modals.experience}
        onClose={() => closeModal("experience")}
        onSave={(data) => handleSave("experience", data)}
      />

      <EditResumesAndSocialsModal
        isOpen={modals.resumesSocials}
        onClose={() => closeModal("resumesSocials")}
        onSave={(data) => handleSave("resumesSocials", data)}
      />

      <ChangeEmailModal
        isOpen={modals.changeEmail}
        onClose={() => closeModal("changeEmail")}
        // onSave={(data) => handleSave("changeEmail", data)}
      />

      <ChangePasswordModal
        isOpen={modals.changePassword}
        onClose={() => closeModal("changePassword")}
        // onSave={(data) => handleSave("changePassword", data)}
      />
    </main>
  );
}

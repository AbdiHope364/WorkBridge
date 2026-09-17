"use client";

import {
  getProfileInitials,
  ProfileTopHeader,
} from "./components/profile-settings-layout";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
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
import { useState, useMemo } from "react";
import { useProfile } from "@/contexts/profile-context";
import {
  JobseekerProfile,
} from "@repo/api-client";
import { env } from "../../lib/env";
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

  const fullName =
    `${jobseekerProfile?.firstName || ""} ${jobseekerProfile?.lastName || ""}`.trim() ||
    user?.fullName ||
    "Worker";

  const checklistItems = useMemo(() => {
    const hasBasic = Boolean(fullName && fullName !== "Worker");
    const hasKyc = Boolean(user?.faydaFin || jobseekerProfile?.faydaFin);
    const hasSkills = Boolean(jobseekerProfile?.skills && jobseekerProfile.skills.length > 0);
    const hasExp = Boolean(jobseekerProfile?.experiences && jobseekerProfile.experiences.length > 0);
    const hasEdu = Boolean(jobseekerProfile?.educations && jobseekerProfile.educations.length > 0);
    const hasResume = Boolean(
      jobseekerProfile?.socialLinks &&
        jobseekerProfile.socialLinks.some((l: { platform: string; url: string }) => l.platform === "resume" && l.url)
    );

    return [
      { id: "basic-info", label: "Basic Info", isComplete: hasBasic },
      { id: "fayda-kyc", label: "Fayda National ID (KYC)", isComplete: hasKyc },
      { id: "skills", label: "Skills", isComplete: hasSkills },
      { id: "experience", label: "Experience", isComplete: hasExp },
      { id: "education", label: "Education", isComplete: hasEdu },
      { id: "resume", label: "Resumes", isComplete: hasResume },
    ];
  }, [fullName, user, jobseekerProfile]);

  const completionPercent = useMemo(() => {
    const completedCount = checklistItems.filter((i) => i.isComplete).length;
    return Math.round((completedCount / checklistItems.length) * 100);
  }, [checklistItems]);

  const avatarUrl =
    jobseekerProfile?.avatar?.url ||
    (jobseekerProfile?.avatar?.publicId && env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      ? `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${jobseekerProfile.avatar.publicId}`
      : null) ||
    user?.avatarUrl ||
    null;

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0">
          <ProfileTopHeader
            initials={initials}
            url={avatarUrl || undefined}
          />

          <div className="mx-auto grid max-w-295 gap-6 px-4 py-6 sm:px-6 sm:py-9 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-950">
                  <span>Profile Completion</span>
                  <span className="text-emerald-600">
                    {completionPercent}% Complete
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="mt-3 text-xs leading-5 text-neutral-600">
                  Complete your profile to get the best job and trade booking opportunities.
                </p>
              </section>

              <nav className="space-y-3">
                {checklistItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      `flex h-11 w-full items-center gap-3 rounded-md border px-4 text-left text-sm font-semibold transition ` +
                      (item.isComplete
                        ? "border-emerald-100 bg-emerald-50 text-emerald-950 font-bold"
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
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-4 sm:gap-5 items-start">
                  <button
                    type="button"
                    onClick={() => openModal("profileImage")}
                    className="relative group shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
                    title="Click to change profile photo"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-sm flex items-center justify-center relative">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Profile Avatar"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-slate-950 text-amber-200 font-black text-2xl sm:text-3xl flex items-center justify-center">
                          {initials || "W"}
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-1 -right-1 p-1.5 bg-emerald-600 group-hover:bg-emerald-500 text-white rounded-xl shadow-md border-2 border-white transition transform group-hover:scale-110 flex items-center justify-center cursor-pointer">
                      <EditIcon className="h-3.5 w-3.5" />
                    </div>
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-xl font-bold leading-tight text-slate-950">
                            {fullName || user?.fullName || "Worker"}
                          </h2>
                          {jobseekerProfile?.faydaFin || user?.faydaFin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Fayda Verified (FIN: {jobseekerProfile?.faydaFin || user?.faydaFin})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
                              Fayda Unverified
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-teal-600 mt-0.5">
                          {jobseekerProfile?.bio || jobseekerProfile?.currentPosition || "Skilled Trade Professional"}
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
                        {jobseekerProfile?.gender || "Gender not set"}
                      </span>
                      <span className="flex items-center gap-2">
                        {jobseekerProfile?.dateOfBirth || "Birthdate not set"}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPinIcon />
                        {jobseekerProfile?.location?.city
                          ? `${jobseekerProfile.location.city}, Ethiopia`
                          : typeof jobseekerProfile?.location === "string" && jobseekerProfile.location
                          ? jobseekerProfile.location
                          : "Location not set"}
                      </span>
                      <span className="flex items-center gap-2">
                        <PhoneIcon />
                        {jobseekerProfile?.phone || (user as any)?.phone || "Phone not set"}
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
                    placeholder="Say something about yourself..."
                    className="h-20 w-full resize-none bg-transparent text-xs outline-none placeholder:text-neutral-400"
                  />
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Address Lines">
                <div className="space-y-3">
                  {[
                    { label: "Address Line 1", val: jobseekerProfile?.location?.addressLine1 },
                    { label: "Address Line 2", val: jobseekerProfile?.location?.addressLine2 },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex h-10 items-center justify-between rounded-md border border-slate-200 px-3 text-xs text-neutral-500"
                    >
                      <span>{item.label}</span>
                      <span className="ml-auto mr-3 text-slate-700 font-medium">
                        {item.val || "Not configured"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={`Edit ${item.label}`}
                          onClick={() => openModal("basicProfile")}
                          className="grid h-6 w-6 place-items-center rounded text-xs transition text-emerald-600 hover:bg-emerald-50"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Your Skills" action="Add Skills">
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.skills && jobseekerProfile.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {jobseekerProfile.skills.map((skill) => (
                        <span
                          key={skill.toString()}
                          className="inline-flex h-7 min-w-24 items-center justify-center rounded-full bg-emerald-100 px-4 text-xs font-medium text-emerald-600"
                        >
                          {skill.toString()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No skills added yet. Click &quot;Add Skills&quot; to showcase your trade skills.</p>
                  )}
                </div>
              </ProfileShellCard>

              <ProfileShellCard
                title={`Your Experiences${jobseekerProfile?.experienceYears ? ` - ${jobseekerProfile.experienceYears} years` : ""}`}
                action="Add Experience"
              >
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.experiences && jobseekerProfile.experiences.length > 0 ? (
                    <div className="space-y-4">
                      {jobseekerProfile.experiences.map((exp, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-black text-emerald-600">
                              {exp.position}
                            </h3>
                            <p className="mt-1 text-xs text-slate-950">
                              {exp.companyName}
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">
                              {exp.startDate ? `${exp.startDate} - ${exp.endDate || "Present"}` : ""}
                            </p>
                            {exp.description && (
                              <p className="mt-3 text-xs text-neutral-600">
                                {exp.description}
                              </p>
                            )}
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
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No work experience added yet. Click &quot;Add Experience&quot; to highlight your background.</p>
                  )}
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Your Education" action="Add Education">
                <div className="rounded-md border border-slate-200 p-4">
                  {jobseekerProfile?.educations && jobseekerProfile.educations.length > 0 ? (
                    <div className="space-y-4">
                      {jobseekerProfile.educations.map((edu, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-black text-emerald-600">
                              {edu.fieldOfStudy}
                            </h3>
                            <p className="mt-1 text-xs text-slate-950">
                              {edu.schoolName}
                            </p>
                            <p className="mt-1 whitespace-pre-line text-xs text-neutral-500">
                              {edu.endDate || ""}
                              {edu.description ? `\n${edu.description}` : ""}
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
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No education history added yet. Click &quot;Add Education&quot; to add certifications or degrees.</p>
                  )}
                </div>
              </ProfileShellCard>

              <ProfileShellCard title="Resume & Socials">
                <div className="space-y-3">
                  {jobseekerProfile?.socialLinks && jobseekerProfile.socialLinks.length > 0 ? (
                    jobseekerProfile.socialLinks.map(
                      (link: { platform: string; url: string }) => (
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
                    )
                  ) : (
                    <p className="text-xs text-neutral-400 italic">No social links or resumes uploaded yet.</p>
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
        currentImage={avatarUrl}
        initials={initials}
        onSave={async (_file, dataUrl) => {
          try {
            await api.client.request("/accounts/jobseekers/upload-avatar", {
              method: "POST",
              body: { avatarUrl: dataUrl },
            });
          } catch (e) {
            console.error("Avatar upload fallback error:", e);
          }
          await refreshProfile();
        }}
        onRemove={async () => {
          try {
            await api.client.request("/accounts/jobseekers/upload-avatar", {
              method: "POST",
              body: { avatarUrl: "" },
            });
          } catch (e) {
            console.error("Avatar remove fallback error:", e);
          }
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

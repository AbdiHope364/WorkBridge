"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { useCurrentUser } from "../../hooks/use-current-user";
import {
  getProfileInitials,
  ProfileAvatar,
  ProfileTopHeader,
} from "./components/profile-settings-layout";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";

const initialSkills = ["UI/UX design", "UI/UX design", "UI/UX design"];

interface BasicProfileForm {
  bio: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  cityLocation: string;
  gender: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  currentPosition: string;
}

const initialForm: BasicProfileForm = {
  bio: "",
  firstName: "",
  lastName: "",
  phoneNumber: "+251-900-000-000",
  cityLocation: "",
  gender: "",
  dateOfBirth: "",
  addressLine1: "yourusername@gmail.com",
  addressLine2: "yourusername@gmail.com",
  currentPosition: "eg. Senior software engineer",
};

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M4 8.5A2.5 2.5 0 0 1 6.5 6H9l1.2-1.5h3.6L15 6h2.5A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-semibold text-slate-950">
      {label}
      {required ? <span className="text-rose-500"> *</span> : null}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function inputClass() {
  return "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-950 outline-none transition placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";
}

export function EditBasicProfilePage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  const [form, setForm] = useState<BasicProfileForm>(initialForm);
  const [skills, setSkills] = useState(initialSkills);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?next=/dashboard/profile/edit");
    }
  }, [isAuthenticated, isLoading, router]);

  const updateField = (field: keyof BasicProfileForm, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/dashboard/profile");
  };

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 text-sm font-semibold shadow-sm">
          Checking your session...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const initials = getProfileInitials(user?.fullName);

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1">
          <ProfileTopHeader initials={initials} />

          <div className="mx-auto w-full max-w-[940px] px-6 py-4">
            <h1 className="text-center text-2xl font-black text-black">
              Edit Profile
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mt-1 rounded-lg border border-slate-200 bg-white px-16 py-5 shadow-sm"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ProfileAvatar size="sm" />
                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-white bg-emerald-500 text-white"
                  >
                    <CameraIcon />
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-slate-950 hover:text-emerald-600"
                >
                  View or Edit
                </button>
              </div>

              <div className="mt-2">
                <Field label="Bio (optional)">
                  <textarea
                    value={form.bio}
                    onChange={(event) => updateField("bio", event.target.value)}
                    placeholder="Say something about your self..."
                    className="h-14 w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-xs outline-none placeholder:text-neutral-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="First name" required>
                  <input
                    value={form.firstName}
                    onChange={(event) =>
                      updateField("firstName", event.target.value)
                    }
                    placeholder="Your first name"
                    className={inputClass()}
                  />
                </Field>
                <Field label="Last name" required>
                  <input
                    value={form.lastName}
                    onChange={(event) =>
                      updateField("lastName", event.target.value)
                    }
                    placeholder="Your last name"
                    className={inputClass()}
                  />
                </Field>
                <Field label="Phone number" required>
                  <input
                    value={form.phoneNumber}
                    onChange={(event) =>
                      updateField("phoneNumber", event.target.value)
                    }
                    className={inputClass()}
                  />
                </Field>
                <Field label="City Location" required>
                  <input
                    value={form.cityLocation}
                    onChange={(event) =>
                      updateField("cityLocation", event.target.value)
                    }
                    placeholder="Your current location"
                    className={inputClass()}
                  />
                </Field>
                <Field label="Gender" required>
                  <select
                    value={form.gender}
                    onChange={(event) =>
                      updateField("gender", event.target.value)
                    }
                    className={inputClass()}
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </Field>
                <Field label="Date of Birth" required>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(event) =>
                      updateField("dateOfBirth", event.target.value)
                    }
                    className={inputClass()}
                  />
                </Field>
                <Field label="Address line 1 (optional)">
                  <input
                    value={form.addressLine1}
                    onChange={(event) =>
                      updateField("addressLine1", event.target.value)
                    }
                    className={inputClass()}
                  />
                </Field>
                <Field label="Address line 2 (optional)">
                  <input
                    value={form.addressLine2}
                    onChange={(event) =>
                      updateField("addressLine2", event.target.value)
                    }
                    className={inputClass()}
                  />
                </Field>
                <Field label="Skills" required>
                  <div className="rounded-md border border-slate-300 px-3 py-2">
                    <input
                      placeholder="Search skills e.g UI/UX design, node, java"
                      className="h-6 w-full text-xs outline-none placeholder:text-neutral-400"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="inline-flex h-6 items-center gap-2 rounded-full bg-emerald-100 px-3 text-xs font-medium text-emerald-600"
                        >
                          {skill}
                          <button
                            type="button"
                            aria-label={`Remove ${skill}`}
                            onClick={() =>
                              setSkills((currentSkills) =>
                                currentSkills.filter(
                                  (_, itemIndex) => itemIndex !== index,
                                ),
                              )
                            }
                            className="text-emerald-500 hover:text-emerald-700"
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </Field>
                <Field label="Current position" required>
                  <input
                    value={form.currentPosition}
                    onChange={(event) =>
                      updateField("currentPosition", event.target.value)
                    }
                    className={inputClass()}
                  />
                </Field>
              </div>

              <div className="mt-6 flex justify-end gap-5">
                <Link
                  href="/dashboard/profile"
                  className="inline-flex h-11 min-w-40 items-center justify-center rounded-md bg-neutral-300 px-6 text-base font-black text-black transition hover:bg-neutral-400"
                >
                  Cancel
                </Link>
                <Button
                  type="submit"
                  className="h-11 min-w-40 rounded-md bg-emerald-600 text-base font-black hover:bg-emerald-700"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

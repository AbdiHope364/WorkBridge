'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { ReactNode, SVGProps } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';

type IconProps = SVGProps<SVGSVGElement>;

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

function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 4 17 8-17 8 4-8-4-8Zm4 8h13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"
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

function MonitorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14v10H5V6Zm5 14h4m-2-4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 9h14v10H5V9Zm0 4h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkplaceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 7h14v10H5V7Zm3 0V5h8v2M8 17v2m8-2v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 19V9m5 10V5m5 14v-7m4 7H4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoneyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v10m-3-2c.7.8 1.8 1.2 3 1.2 1.7 0 3-.8 3-2 0-1.3-1.2-1.8-3-2.2-1.8-.4-3-.9-3-2.2 0-1.2 1.3-2 3-2 1.1 0 2.1.3 2.8 1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BankIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 9h16L12 4 4 9Zm2 0v9m4-9v9m4-9v9m4-9v9M4 20h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 4v3m10-3v3M5 8h14v11H5V8Zm3 4h2m3 0h2m-7 3h2m3 0h2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PreviewField({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-8 border border-[#d8d9df] bg-white px-5 py-2 ${className}`}
    >
      {children}
    </div>
  );
}

function DetailRow({
  label,
  value,
  icon: Icon,
  wide = false,
}: {
  label: string;
  value: string;
  icon: (props: IconProps) => ReactNode;
  wide?: boolean;
}) {
  return (
    <PreviewField className={wide ? 'lg:col-span-2' : undefined}>
      <div className="grid grid-cols-[22px_1fr_auto] items-center gap-3 text-xs">
        <Icon className="h-4 w-4 text-[#00aaa8]" />
        <span className="text-[#555]">{label}</span>
        <span className="inline-flex items-center gap-7 text-[#333]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00aaa8]" />
          {value}
        </span>
      </div>
    </PreviewField>
  );
}

export function EmployerPreviewJobPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Load job data from sessionStorage
  useEffect(() => {
    const data = sessionStorage.getItem('job_preview');

    if (!data) {
      router.push('/dashboard/employer/create');
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      setJob(parsedData);
    } catch (err) {
      console.error('Error parsing job preview data:', err);
      router.push('/dashboard/employer/create');
    }
  }, [router]);

  const handlePostJob = async () => {
    if (!job) return;

    try {
      setIsSubmitting(true);
      setError(null);

      // Transform skills to the format expected by the backend
      const skillsAsObjects =
        job.skills?.map((skill: string) => ({
          name: skill.trim(),
        })) || [];

      const payload = {
        title: job.title.trim(),
        description: job.description.trim(),
        category: job.category,
        skills: skillsAsObjects,
        jobType: job.jobType,
        workplaceType: job.workplaceType,
        workerType: job.workerType,
        experienceLevel: job.experienceLevel,
        salary: Number(job.salary),
        budget: job.budget,
        deadline: job.deadline,
        vacancies: job.vacancies || 1,
        isUrgent: job.isUrgent || false,
        location: {
          city: job.city.trim(),
          country: 'ETHIOPIA',
        },
      };

      await api.jobs.createJob(payload);

      sessionStorage.removeItem('job_preview');

      alert('Job posted successfully!');
      router.push('/dashboard/employer');
    } catch (err: any) {
      console.error('Error posting job:', err);

      if (err.status === 401) {
        setError('Your session has expired. Please log in again.');
        router.push('/login');
      } else if (err.status === 403) {
        setError('You do not have permission to create jobs.');
      } else if (err.status === 400) {
        setError(err.message || 'Invalid job data. Please check your inputs.');
      } else {
        setError(err.message || 'Failed to post job. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!job) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const skillsAsObjects =
        job.skills?.map((skill: string) => ({
          name: skill.trim(),
        })) || [];

      const payload = {
        title: job.title.trim(),
        description: job.description.trim(),
        category: job.category,
        skills: skillsAsObjects,
        jobType: job.jobType,
        workplaceType: job.workplaceType,
        workerType: job.workerType,
        experienceLevel: job.experienceLevel,
        salary: Number(job.salary),
        budget: job.budget,
        deadline: job.deadline,
        vacancies: job.vacancies || 1,
        isUrgent: job.isUrgent || false,
        location: {
          city: job.city.trim(),
          country: 'ETHIOPIA',
        },
        status: 'DRAFT',
      };

      await api.jobs.createJob(payload);

      sessionStorage.removeItem('job_preview');

      alert('Draft saved successfully!');
      router.push('/dashboard/employer');
    } catch (err: any) {
      setError(err.message || 'Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format display values
  const formatValue = (value: string) => {
    if (!value) return 'N/A';
    return value.replace(/_/g, ' ');
  };

  // Show loading state
  if (isLoading || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading preview...</div>
      </div>
    );
  }

  const skills = job.skills || [];

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-black">
      <header className="relative flex h-12 items-center justify-center border-b border-[#00aaa8] bg-white">
        <Link
          href="/dashboard/employer/create"
          aria-label="Back"
          className="absolute left-9 top-1/2 -translate-y-1/2 text-black"
        >
          <BackIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-medium text-black">Preview Job Posting</h1>
      </header>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-8 py-7">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <section className="mb-3 flex min-h-[43px] items-center gap-4 rounded bg-[#172653] px-5 text-[#00aaa8]">
          <EyeIcon className="h-5 w-5 shrink-0" />
          <div>
            <p className="text-xs font-semibold uppercase leading-tight">
              Preview Mode
            </p>
            <p className="text-[10px] leading-tight">
              This is how your listing will appear to candidates.
            </p>
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <PreviewField>
            <h2 className="text-xl font-normal text-[#333]">
              {job.title || 'Untitled'}
            </h2>
          </PreviewField>
          <PreviewField>
            <div className="flex items-center gap-4 text-[10px] text-[#777]">
              <PinIcon className="h-3.5 w-3.5 text-[#777]" />
              {job.city || 'Unknown'}, Ethiopia
            </div>
          </PreviewField>

          <DetailRow
            label="Work Environment"
            value={formatValue(job.workerType)}
            icon={MonitorIcon}
          />

          <DetailRow
            label="Job Category"
            value={formatValue(job.category)}
            icon={BriefcaseIcon}
          />

          <DetailRow
            label="Work Place Type"
            value={formatValue(job.workplaceType)}
            icon={WorkplaceIcon}
          />

          <DetailRow
            label="Job Type"
            value={formatValue(job.jobType)}
            icon={ClockIcon}
          />

          <DetailRow
            label="Experience"
            value={formatValue(job.experienceLevel)}
            icon={ChartIcon}
          />

          <DetailRow
            label="Salary"
            value={`${job.salary || 0} ETB`}
            icon={MoneyIcon}
          />

          <DetailRow
            label="Budget Type"
            value={formatValue(job.budget)}
            icon={BankIcon}
          />

          <DetailRow
            label="Application Deadline"
            value={
              job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'
            }
            icon={CalendarIcon}
          />

          <PreviewField className="lg:col-span-2">
            <p className="text-xs text-black">Required Skills</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {skills.length > 0 ? (
                skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#d4f1f1] px-5 py-1 text-[10px] text-[#00aaa8]"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#777]">No skills added</span>
              )}
            </div>
          </PreviewField>

          <PreviewField className="lg:col-span-2">
            <p className="text-base font-medium text-black">Description</p>
            <div className="mt-3 px-8 text-xs leading-tight text-[#777] whitespace-pre-wrap">
              {job.description || 'No description provided'}
            </div>
          </PreviewField>
        </div>

        <div className="mt-4 grid gap-4">
          <button
            onClick={handlePostJob}
            disabled={isSubmitting}
            className="inline-flex h-8 items-center justify-center gap-2 rounded bg-[#00aaa8] text-lg font-semibold text-white hover:bg-[#009999] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
            <SendIcon className="h-4 w-4" />
          </button>

          <div className="grid gap-5 sm:grid-cols-2">
            <button
              onClick={() => {
                router.push('/dashboard/employer/create');
              }}
              disabled={isSubmitting}
              className="grid h-8 place-items-center border border-[#00aaa8] bg-white text-base font-medium text-black hover:bg-gray-50"
            >
              Edit Again
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="h-8 border border-[#00aaa8] bg-white text-base font-medium text-[#00aaa8] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
          </div>

          <Link
            href="/dashboard/employer/create"
            className="inline-flex items-center gap-2 text-xl font-normal text-black hover:text-gray-600"
          >
            <BackIcon className="h-5 w-5" />
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}

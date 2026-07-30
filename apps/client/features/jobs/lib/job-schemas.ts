import { z } from 'zod';

import {
  JOB_CATEGORIES,
  JOB_TYPES,
  WORKPLACE_TYPES,
  WORKER_TYPES,
  EXPERIENCE_LEVELS,
  BUDGET_TYPES,
} from '@repo/types';

export const createJobSchema = z.object({
  title: z.string().trim().min(3, 'Job title must be at least 3 characters'),

  description: z
    .string()
    .trim()
    .min(20, 'Job description must be at least 20 characters'),

  category: z.enum(JOB_CATEGORIES),

  jobType: z.enum(JOB_TYPES),

  workplaceType: z.enum(WORKPLACE_TYPES),

  workerType: z.enum(WORKER_TYPES),

  experienceLevel: z.enum(EXPERIENCE_LEVELS),

  salary: z.coerce.number().positive('Salary must be greater than 0'),

  budget: z.enum(BUDGET_TYPES),

  deadline: z.string().min(1, 'Application deadline is required'),

  vacancies: z.coerce.number().int().min(1).optional(),

  isUrgent: z.boolean().optional(),

  location: z.object({
    city: z.string().trim().min(2, 'City is required'),

    region: z.string().trim().optional(),

    country: z.string().trim().min(2, 'Country is required'),
  }),

  skills: z
    .array(
      z.object({
        name: z.string().trim().min(1, 'Skill name is required'),
      }),
    )
    .min(3, 'At least 3 skills are required'),
});

export type CreateJobFormValues = z.infer<typeof createJobSchema>;

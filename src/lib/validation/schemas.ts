import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string()
  .email('Invalid email address')
  .min(5, 'Email too short')
  .max(255, 'Email too long')
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format');

// Tech stack validation
export const techStackSchema = z.array(z.string().max(100))
  .min(1, 'At least one tool must be selected')
  .max(50, 'Too many tools selected');

// Ticket distribution validation
export const ticketDistributionSchema = z.object({
  applications: z.number().int().min(0).max(100),
  hardware: z.number().int().min(0).max(100),
  security: z.number().int().min(0).max(100),
  onboarding: z.number().int().min(0).max(100),
  network: z.number().int().min(0).max(100),
  distributionLists: z.number().int().min(0).max(100),
}).refine(
  (data) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);
    return total === 100;
  },
  { message: 'Distribution percentages must sum to 100' }
);

// Assessment creation schema
export const createAssessmentSchema = z.object({
  techStack: techStackSchema,
  monthlyTickets: z.number()
    .int('Monthly tickets must be a whole number')
    .min(100, 'Minimum 100 tickets per month required')
    .max(1000000, 'Monthly tickets exceed maximum allowed'),
  ticketDistribution: ticketDistributionSchema,
  additionalContext: z.string()
    .max(5000, 'Additional context too long')
    .nullable()
    .optional(),
  reportData: z.object({}).passthrough().refine(
    (data) => {
      // Limit report data to ~1MB when serialized
      const dataSize = JSON.stringify(data).length;
      return dataSize < 1000000;
    },
    { message: 'Report data too large (max 1MB)' }
  ),
});

// Email update schema
export const updateEmailSchema = z.object({
  email: emailSchema,
  consentTimestamp: z.string().datetime().optional(),
});

// Rate limit key validation
export const ipAddressSchema = z.string().ip();

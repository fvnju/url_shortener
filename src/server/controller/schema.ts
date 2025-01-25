import { z } from "zod";

// For creating new short URLs
export const CreateShortUrlSchema = z.object({
  originalUrl: z.string().url(),
  customCode: z
    .string()
    .optional()
    .refine((val) => !val || /^[a-zA-Z0-9_-]+$/.test(val), {
      message: "Invalid custom code format",
    }),
  expiresAt: z.date().optional(),
});

// For updating analytics
export const AnalyticsSchema = z.object({
  shortCode: z.string().min(4).max(16),
});

export type CreateShortUrlInput = z.infer<typeof CreateShortUrlSchema>;
export type AnalyticsInput = z.infer<typeof AnalyticsSchema>;

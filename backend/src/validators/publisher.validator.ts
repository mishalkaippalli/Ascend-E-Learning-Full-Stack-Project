import { z } from 'zod';

export const publisherSignupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),

    email: z
      .string()
      .trim()
      .email('Please provide a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters'),

    publisherType: z.enum(['individual', 'organization']),

    organizationName: z
      .string()
      .trim()
      .min(2, 'Organization name must be at least 2 characters')
      .max(100, 'Organization name must not exceed 100 characters')
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.publisherType === 'organization' &&
      !data.organizationName
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['organizationName'],
        message: 'Organization name is required',
      });
    }
  });

export type PublisherSignupInput =
  z.infer<typeof publisherSignupSchema>;
import { z } from "zod";

export function apiSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
) {
  return z.object({
    data: dataSchema.optional(),
    message: z.string().optional(),
  });
}

export const apiMessageOnlySchema = z.object({
  message: z.string().catch("Success"),
});

export const apiErrorResponseSchema = z.object({
  status: z.string(),
  message: z.string().catch("An unexpected error occurred"),
});

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

export type ApiSuccess<T> = {
  data?: T;
  message?: string;
};

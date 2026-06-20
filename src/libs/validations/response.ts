import { z } from "zod";

export const apiErrorResponseSchema = z.object({
  status: z.literal("error").default("error"),
  message: z.string().catch("An unexpected error occurred"),
});

export function apiSuccessResponseSchema<T extends z.ZodTypeAny>(
  dataSchema?: T,
) {
  return z.object({
    status: z.literal("success").default("success"),
    data: dataSchema ? dataSchema.optional() : z.any().optional(),
    message: z.string().catch("Success"),
  });
}

export const apiMessageOnlySchema = apiSuccessResponseSchema();

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

export type ApiSuccessResponse<T> = {
  status: "success";
  data?: T;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

import { z } from "zod";
import { apiErrorResponseSchema } from "@/libs/validations/response";

interface HandleResponseOptions<T extends z.ZodTypeAny> {
  response: Response;
  successSchema: T;
}

export async function handleApiResponse<T extends z.ZodTypeAny>({
  response,
  successSchema,
}: HandleResponseOptions<T>) {
  if (!response.ok) {
    const json = await response.json().catch(() => ({}));
    const parsedError = apiErrorResponseSchema.safeParse(json);

    if (parsedError.success) {
      return parsedError.data;
    }

    return {
      status: "error",
      message: `Server returned an error status: ${response.status}`,
    };
  }

  const json = await response.json();
  const parsedRes = successSchema.safeParse(json);

  if (!parsedRes.success) {
    return {
      status: "error",
      message: "API succeeded, but returned an invalid data format.",
    };
  }

  return parsedRes.data;
}

"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { updateUserRequestSchema } from "@/libs/validations/user";
import {
  ApiErrorResponse,
  apiErrorResponseSchema,
  apiMessageOnlySchema,
  ApiSuccess,
} from "@/libs/validations/response";

export async function updateUserAction(
  formData: FormData,
): Promise<ApiSuccess<unknown> | ApiErrorResponse> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const userId = Number(formData.get("id"));

  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    role: formData.get("role") as string,
  };

  const parsedData = updateUserRequestSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      status: "error",
      message: parsedData.error.message,
    };
  }

  const valid = parsedData.data;

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: allCookies,
      },
      body: JSON.stringify(valid),
    });

    if (!res.ok) {
      const json = (await res.json().catch(() => ({}))) as unknown;
      const parsedError = apiErrorResponseSchema.safeParse(json);

      if (parsedError.success) {
        return parsedError.data;
      } else {
        return {
          status: "error",
          message: `Server returned an invalid error response format (Status: ${res.status})`,
        };
      }
    }

    const json = await res.json();
    const parsedRes = apiMessageOnlySchema.safeParse(json);

    if (!parsedRes.success) {
      return {
        status: "error",
        message: "API succeeded, but returned an invalid success data format.",
      };
    }

    revalidatePath("/user-management");
    return parsedRes.data;
  } catch (error) {
    return { status: "error", message: "Network connection error" };
  }
}

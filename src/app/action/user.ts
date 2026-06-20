"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  updateUserRequestSchema,
  userResponseSchema,
} from "@/libs/validations/user";
import {
  apiMessageOnlySchema,
  ApiResponse,
  apiSuccessResponseSchema,
} from "@/libs/validations/response";
import z from "zod";
import { handleApiResponse } from "@/libs/api-handler";

type UserListType = z.infer<typeof userResponseSchema>[];

export async function ListUsersAction(): Promise<ApiResponse<UserListType>> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/users/`, {
      headers: { Cookie: allCookies },
    });

    return (await handleApiResponse({
      response: res,
      successSchema: apiSuccessResponseSchema(z.array(userResponseSchema)),
    })) as ApiResponse<UserListType>;
  } catch {
    return { status: "error", message: "Network connection error" };
  }
}

export async function updateUserAction(
  formData: FormData,
): Promise<ApiResponse<unknown>> {
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

    const result = await handleApiResponse({
      response: res,
      successSchema: apiMessageOnlySchema,
    });

    if (result.status === "success") {
      revalidatePath("/user-management", "layout");
    }
    return result as ApiResponse<UserListType>;
  } catch {
    return { status: "error", message: "Network connection error" };
  }
}

import { z } from "zod";

const phoneRegex = new RegExp(/^0[689]\d{8}$/);

const ALL_ROLES = ["ADMIN", "CASHIER", "SCANNER"] as const;

const CREATABLE_ROLES = ["CASHIER", "SCANNER"] as const;

const userBaseSchema = z.object({
  id: z.number(),
  username: z.string().min(4, "username must be more than 4 characters long"),
  role: z.enum(ALL_ROLES),
  firstName: z.string().min(1, "First Name required"),
  lastName: z.string().min(1, "Last Name required"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number"),
});

export const createUserRequestSchema = userBaseSchema
  .omit({ id: true, role: true })
  .extend({
    password: z.string().min(8, "password must be at least 8 characters long"),
    role: z.enum(CREATABLE_ROLES, "Only cashier or scanner can be created"),
  });

export const updateUserRequestSchema = userBaseSchema
  .omit({ id: true })
  .extend({
    role: z.enum(CREATABLE_ROLES, "Only cashier or scanner can be update"),
  });

export const userResponseSchema = userBaseSchema;

export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;

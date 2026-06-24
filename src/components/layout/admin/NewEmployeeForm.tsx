"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/app/action/user";
import { useToast } from "@/components/ToastProvider";

export default function NewEmployeeForm() {
  const router = useRouter();
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const handleFormAction = async (formData: FormData) => {
    setIsPending(true);

    const result = await createUserAction(formData);

    if (result.status === "error") {
      toast.error(result.message);
      setIsPending(false);
      return;
    }

    toast.success(result.message || "Employee created successfully");
    router.push("/user-management");
  };

  return (
    <form action={handleFormAction} className="w-full max-w-md mx-auto">
      <fieldset className="fieldset">
        <label className="label">Username</label>
        <input
          name="username"
          type="text"
          className="input w-full"
          placeholder="Username"
          required
          disabled={isPending}
        />

        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          className="input w-full"
          placeholder="Password"
          required
          disabled={isPending}
        />

        <label className="label">First Name</label>
        <input
          name="firstName"
          type="text"
          className="input w-full"
          required
          disabled={isPending}
        />

        <label className="label">Last Name</label>
        <input
          name="lastName"
          type="text"
          className="input w-full"
          required
          disabled={isPending}
        />

        <label className="label">Phone Number</label>
        <input
          name="phoneNumber"
          type="text"
          className="input w-full"
          placeholder="0XXXXXXXXX"
          required
          disabled={isPending}
        />

        <label className="label">Role</label>
        <select
          name="role"
          className="select w-full"
          defaultValue="CASHIER"
          disabled={isPending}
        >
          <option value="CASHIER">Cashier</option>
          <option value="SCANNER">Scanner</option>
        </select>

        <button
          type="submit"
          className="btn btn-neutral mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Create employee"
          )}
        </button>
      </fieldset>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserAction } from "@/app/action/user";
import { useToast } from "@/components/ToastProvider";
import { UserResponse } from "@/libs/validations/user";

export default function UserDetailForm({ user }: { user: UserResponse }) {
  const router = useRouter();
  const toast = useToast();
  const [isPending, setIsPending] = useState(false);

  const isAdminUser = user.role === "ADMIN";

  const handleFormAction = async (formData: FormData) => {
    setIsPending(true);

    const result = await updateUserAction(formData);

    if (result.status === "error") {
      toast.error(result.message);
      setIsPending(false);
      return;
    }

    toast.success(result.message || "User updated successfully");
    router.refresh();
    setIsPending(false);
  };

  if (isAdminUser) {
    return (
      <div className="w-full max-w-md mx-auto">
        <fieldset className="fieldset">
          <label className="label">Username</label>
          <input
            type="text"
            className="input w-full"
            value={user.username}
            readOnly
            disabled
          />

          <label className="label">First Name</label>
          <input
            type="text"
            className="input w-full"
            value={user.firstName}
            readOnly
            disabled
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input w-full"
            value={user.lastName}
            readOnly
            disabled
          />

          <label className="label">Phone Number</label>
          <input
            type="text"
            className="input w-full"
            value={user.phoneNumber}
            readOnly
            disabled
          />

          <label className="label">Role</label>
          <input
            type="text"
            className="input w-full"
            value={user.role}
            readOnly
            disabled
          />
        </fieldset>

        <p className="text-sm text-center text-gray-500 mt-4">
          Admin accounts cannot be edited.
        </p>
      </div>
    );
  }

  return (
    <form action={handleFormAction} className="w-full max-w-md mx-auto">
      <input type="hidden" name="id" value={user.id} />

      <fieldset className="fieldset">
        <label className="label">Username</label>
        <input
          name="username"
          type="text"
          className="input w-full"
          defaultValue={user.username}
          required
          disabled={isPending}
        />

        <label className="label">First Name</label>
        <input
          name="firstName"
          type="text"
          className="input w-full"
          defaultValue={user.firstName}
          required
          disabled={isPending}
        />

        <label className="label">Last Name</label>
        <input
          name="lastName"
          type="text"
          className="input w-full"
          defaultValue={user.lastName}
          required
          disabled={isPending}
        />

        <label className="label">Phone Number</label>
        <input
          name="phoneNumber"
          type="text"
          className="input w-full"
          defaultValue={user.phoneNumber}
          placeholder="0XXXXXXXXX"
          required
          disabled={isPending}
        />

        <label className="label">Role</label>
        <select
          name="role"
          className="select w-full"
          defaultValue={user.role}
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
            "Save changes"
          )}
        </button>
      </fieldset>
    </form>
  );
}

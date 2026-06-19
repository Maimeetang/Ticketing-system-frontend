"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleFormAction = async (formData: FormData) => {
    setIsPending(true);
    setError("");

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Invalid username or password");
        setIsPending(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setIsPending(false);
    }
  };

  return (
    <form action={handleFormAction} className="w-full">
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

        {error && (
          <div className="text-error text-xs mt-2 text-center bg-error/10 p-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-neutral mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </fieldset>
    </form>
  );
}

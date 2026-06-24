"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ToastProvider";

export default function UserFetchError({ message }: { message: string }) {
  const toast = useToast();

  useEffect(() => {
    toast.error(message);
  }, [message, toast]);

  return (
    <p className="text-center text-gray-500">Unable to load user details.</p>
  );
}

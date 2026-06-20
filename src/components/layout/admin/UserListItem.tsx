"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserListItem({ item }: { item: any }) {
  const params = useParams();
  const isActive = params.id === String(item.id);

  return (
    <li
      className={`list-row flex items-center justify-between border-b border-base-200 last:border-0 transition-colors ${
        isActive ? "bg-base-200" : "hover:bg-base-100/60"
      }`}
    >
      <div className="flex items-center">
        <div>
          <Image
            src="/icons/user-profile.svg"
            alt="user profile"
            width={40}
            height={40}
            className="my-1.5 inline-block"
          />
        </div>
        <div className="ml-4">
          <div className="font-semibold">
            {item.firstName} {item.lastName}
          </div>
          <div className="text-xs uppercase font-bold opacity-60">
            {item.role}
          </div>
        </div>
      </div>

      <Link
        className="btn btn-square btn-ghost shrink-0"
        href={`/user-management/${item.id}`}
      >
        <Image
          src="/icons/user-pen.svg"
          alt="edit user"
          width={16}
          height={16}
          className="my-1.5 inline-block"
        />
      </Link>
    </li>
  );
}

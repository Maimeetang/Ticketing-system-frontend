import { userResponseSchema } from "@/libs/validations/user";
import Image from "next/image";
import { z } from "zod";
import { cookies } from "next/headers";
import Link from "next/link";

interface UserListProps {
  currentUserId?: string;
}

export default async function UserList({ currentUserId }: UserListProps) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const res = await fetch(`${process.env.API_BASE_URL}/users`, {
    method: "GET",
    headers: {
      Cookie: allCookies,
    },
  });

  if (!res.ok) {
    return (
      <div className="text-red-500 p-4">
        The employee list could not be loaded.
      </div>
    );
  }

  const json = await res.json();
  const data = json.data;
  const result = z.array(userResponseSchema).safeParse(data);

  if (!result.success) {
    return (
      <div className="text-red-500 p-4">
        The employee data format is incorrect.
      </div>
    );
  }

  const users = result.data;

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {users.map((item) => {
        const isActive = currentUserId === String(item.id);

        return (
          <li
            key={item.id}
            className={`list-row flex items-center justify-between border-b border-base-200 last:border-0 transition-colors ${
              isActive ? "bg-base-200" : "hover:bg-base-100/60"
            }`}
          >
            <div className="flex items-center">
              <div>
                <Image
                  src="/icons/user-profile.svg"
                  alt="edit user"
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
              href={`/user-management?userId=${item.id}`}
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
      })}

      {users.length === 0 && (
        <li className="p-8 text-center text-gray-500">
          There are no users in the system.
        </li>
      )}
    </ul>
  );
}

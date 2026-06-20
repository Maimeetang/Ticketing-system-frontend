import { ListUsersAction } from "@/app/action/user";
import UserListItem from "./UserListItem";

export default async function UserList() {
  const result = await ListUsersAction();

  if (result.status === "error") {
    return (
      <div className="text-red-500 p-4 text-center bg-base-100 rounded-box shadow-md">
        {result.message}
      </div>
    );
  }

  const users = result.data || [];

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      {users.map((item) => (
        <UserListItem key={item.id} item={item} />
      ))}

      {users.length === 0 && (
        <li className="p-8 text-center text-gray-500">
          There are no users in the system.
        </li>
      )}
    </ul>
  );
}

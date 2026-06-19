import UserList from "@/components/layout/admin/UserList";
// import UserEditForm from "@/components/UserEditForm";

export default async function UserManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string }>;
}) {
  const { userId } = await searchParams;

  return (
    <div className="block md:grid md:grid-cols-3 gap-4 h-full overflow-hidden">
      <div
        className={`overflow-y-auto pr-2 ${userId ? "hidden md:block" : "block"}`}
      >
        <UserList currentUserId={userId} />
      </div>
      <div
        className={`h-full overflow-y-auto ${userId ? "block md:col-span-2" : "hidden md:block md:col-span-2"}`}
      >
        {userId ? (
          <div className="p-8 bg-base-100 rounded-box shadow-md min-h-full">
            <div className="mb-6 md:hidden">
              <a href="/user-management" className="btn btn-soft btn-block">
                ← Back to User List
              </a>
            </div>
            <div className="flex justify-center items-center">
              show user details user id: {userId}
            </div>
            {/* <UserEditForm currentUserId={userId}/> */}
          </div>
        ) : (
          <div className="flex items-center justify-center p-8 bg-base-100 rounded-box shadow-md h-full text-center text-gray-500">
            Please select a user to view details.
          </div>
        )}
      </div>
    </div>
  );
}

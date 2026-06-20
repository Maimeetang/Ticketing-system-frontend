import UserManagementBackButton from "@/components/layout/admin/UserBackButton";
// import { GetUserByIdAction } from "@/app/action/user";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div data-has-child="true">
      <div className="mb-6 md:hidden">
        <UserManagementBackButton />
      </div>
      <div className="p-8 bg-base-100 rounded-box shadow-md">
        <div className="flex items-center justify-center text-center text-gray-500">
          show user details user id: {id}
        </div>
      </div>
    </div>
  );
}

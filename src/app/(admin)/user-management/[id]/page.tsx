import { GetUserByIdAction } from "@/app/action/user";
import UserManagementBackButton from "@/components/layout/admin/UserBackButton";
import UserDetailForm from "@/components/layout/admin/UserDetailForm";
import UserFetchError from "@/components/layout/admin/UserFetchError";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await GetUserByIdAction(id);

  return (
    <div data-has-child="true">
      <div className="mb-6 md:hidden">
        <UserManagementBackButton />
      </div>
      <div className="p-8 bg-base-100 rounded-box shadow-md">
        {result.status === "error" ? (
          <UserFetchError message={result.message} />
        ) : (
          <UserDetailForm user={result.data!} />
        )}
      </div>
    </div>
  );
}

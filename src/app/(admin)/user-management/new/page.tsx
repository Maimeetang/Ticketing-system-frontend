import UserManagementBackButton from "@/components/layout/admin/UserBackButton";

export default function NewEmployee() {
  return (
    <div data-has-child="true">
      <div className="mb-6 md:hidden">
        <UserManagementBackButton />
      </div>
      <div className="p-8 bg-base-100 rounded-box shadow-md">
        <div className="flex items-center justify-center text-center text-gray-500">
          create new employee
        </div>
      </div>
    </div>
  );
}

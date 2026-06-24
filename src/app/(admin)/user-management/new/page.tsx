import UserManagementBackButton from "@/components/layout/admin/UserBackButton";
import NewEmployeeForm from "@/components/layout/admin/NewEmployeeForm";

export default function NewEmployee() {
  return (
    <div data-has-child="true">
      <div className="mb-6 md:hidden">
        <UserManagementBackButton />
      </div>
      <div className="p-8 bg-base-100 rounded-box shadow-md">
        <h1 className="text-lg font-semibold mb-6 text-center">
          Add new employee
        </h1>
        <NewEmployeeForm />
      </div>
    </div>
  );
}

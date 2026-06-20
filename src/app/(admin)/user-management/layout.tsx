import UserList from "@/components/layout/admin/UserList";
import Link from "next/link";

export default function UserManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:grid md:grid-cols-3 gap-4 h-full max-h-full overflow-hidden group/layout">
      <div
        className="h-full max-h-full flex flex-col min-h-0 
        group-has-data-[has-child=true]/layout:hidden 
        md:group-has-data-[has-child=true]/layout:flex"
      >
        <div className="overflow-y-auto">
          <UserList />
        </div>
        <Link
          href="/user-management/new"
          className="btn btn-neutral btn-block mt-5"
        >
          Add new employee
        </Link>
      </div>
      <div className="h-full max-h-full overflow-y-auto md:min-h-0 md:col-span-2">
        {children}
      </div>
    </div>
  );
}

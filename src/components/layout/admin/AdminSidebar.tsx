import Link from "next/link";
import Image from "next/image";

export default function AdminSidebar() {
  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <ul className="menu w-full grow">
          {/* Dashboard Menu */}
          <li>
            <Link
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Dashboard"
              href={"/dashboard"}
            >
              <Image
                src="/icons/dashboard.svg"
                alt="dashboard"
                width={16}
                height={16}
                className="my-1.5 inline-block"
              />
              <span className="is-drawer-close:hidden">Dashboard</span>
            </Link>
          </li>

          {/* User Management Menu */}
          <li>
            <Link
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Employee Management"
              href={"/user-management"}
            >
              <Image
                src="/icons/user-add.svg"
                alt="user-add"
                width={16}
                height={16}
                className="my-1.5 inline-block"
              />
              <span className="is-drawer-close:hidden">
                Employee Management
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function UserManagementBackButton() {
  return (
    <Link href="/user-management" className="btn btn-neutral btn-block">
      ← Back to User List
    </Link>
  );
}

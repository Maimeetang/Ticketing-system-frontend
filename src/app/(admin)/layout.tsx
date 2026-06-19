import Navbar from "@/components/Navbar";
import Sidebar from "@/components/layout/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open bg-base-300">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <Navbar />
        <main className="p-4 grow overflow-hidden">{children}</main>
      </div>
      <Sidebar />
    </div>
  );
}

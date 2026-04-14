import { auth } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Login page doesn't need the admin chrome
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-layout-bg">
      <AdminSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}

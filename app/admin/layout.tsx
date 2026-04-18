import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <main className="lg:pl-60 min-h-screen">
        {children}
      </main>
    </div>
  );
}

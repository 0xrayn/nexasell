"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";

function AdminContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <AdminSidebar />
      <main className="min-h-screen pt-14 lg:pt-0 transition-[padding-left] duration-300 ease-in-out"
        style={{ paddingLeft: `max(0px, ${collapsed ? "64px" : "248px"})` }}
        // On mobile paddingLeft is 0 (lg: prefix)
      >
        <style>{`@media(max-width:1023px){main{padding-left:0!important}}`}</style>
        <div className="w-full max-w-full overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SidebarProvider><AdminContent>{children}</AdminContent></SidebarProvider>;
}

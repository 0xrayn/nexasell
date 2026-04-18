"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";

function AdminContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <AdminSidebar />
      {/* Desktop: dynamic left padding. Mobile: top padding for hamburger button */}
      <main
        className="min-h-screen transition-[padding] duration-250 ease-in-out pt-14 lg:pt-0"
        style={{ paddingLeft: `${collapsed ? 64 : 240}px` }}
      >
        <div className="w-full max-w-full overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminContent>{children}</AdminContent>
    </SidebarProvider>
  );
}

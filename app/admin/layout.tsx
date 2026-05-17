"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";
import { usePathname } from "next/navigation";

function AdminContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <AdminSidebar />
      {/* On mobile: pt-16 to clear hamburger. On lg: paddingLeft for sidebar width */}
      <div
        className="pt-16 lg:pt-0 w-full max-w-full overflow-x-hidden"
        style={{ paddingLeft: 0 }}
      >
        {/* This inner div only gets padding on lg+ via a class we'll add */}
        <div className="lg:transition-[padding] lg:duration-300" style={{ paddingLeft: `var(--sidebar-offset, 0)` }}>
          <style>{`
            @media (min-width: 1024px) {
              :root { --sidebar-offset: ${collapsed ? "68px" : "256px"}; }
            }
            @media (max-width: 1023px) {
              :root { --sidebar-offset: 0px; }
            }
          `}</style>
          {children}
        </div>
      </div>
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

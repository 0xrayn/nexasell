"use client";
import CashierSidebar from "@/components/cashier/CashierSidebar";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";
import { usePathname } from "next/navigation";

function CashierContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  if (pathname === "/cashier/login") {
    return <>{children}</>;
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <CashierSidebar />
      <div className="pt-16 lg:pt-0 w-full max-w-full overflow-x-hidden">
        <div className="lg:transition-[padding] lg:duration-300" style={{ paddingLeft: `var(--cashier-sidebar-offset, 0)` }}>
          <style>{`
            @media (min-width: 1024px) {
              :root { --cashier-sidebar-offset: ${collapsed ? "68px" : "256px"}; }
            }
            @media (max-width: 1023px) {
              :root { --cashier-sidebar-offset: 0px; }
            }
          `}</style>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function CashierLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CashierContent>{children}</CashierContent>
    </SidebarProvider>
  );
}

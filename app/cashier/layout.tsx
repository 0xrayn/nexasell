"use client";
import CashierSidebar from "@/components/cashier/CashierSidebar";
import { SidebarProvider, useSidebar } from "@/lib/SidebarContext";

function CashierContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <CashierSidebar />
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

export default function CashierLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CashierContent>{children}</CashierContent>
    </SidebarProvider>
  );
}

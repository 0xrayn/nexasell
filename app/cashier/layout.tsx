import CashierSidebar from "@/components/cashier/CashierSidebar";

export default function CashierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <CashierSidebar />
      <main className="lg:pl-60 min-h-screen">
        {children}
      </main>
    </div>
  );
}

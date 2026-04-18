import Link from "next/link";
import { Zap, Github, Twitter, Instagram, Mail } from "lucide-react";

const links = {
  Shop: [
    { label: "Home", href: "/" },
    { label: "Cart", href: "/customer/cart" },
    { label: "Checkout", href: "/customer/checkout" },
  ],
  Panel: [
    { label: "Admin Dashboard", href: "/admin" },
    { label: "Cashier POS", href: "/cashier" },
    { label: "Analytics", href: "/admin/analytics" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0a101e] border-t border-black/[0.06] dark:border-white/[0.06] mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-black text-xl text-gray-900 dark:text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                Nexa<span className="text-indigo-500">Sell</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
              Modern Point of Sale system for your business. Manage products, track sales, and serve customers — all in one place.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center text-gray-400 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
                {title}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/[0.05] dark:border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2025 NexaSell. All rights reserved.</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span>Built with</span>
            <span className="text-red-400">♥</span>
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

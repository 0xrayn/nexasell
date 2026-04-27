import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata: Metadata = {
  title: "NexaSell – Modern POS System",
  description: "Platform POS modern untuk bisnis Anda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Inline script: runs BEFORE paint — prevents theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('nexasell-theme');
                  if (t === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

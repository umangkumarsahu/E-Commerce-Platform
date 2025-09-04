import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { UIProvider } from "@/context/UIContext";
import { SiteHeader } from "@/components/SiteHeader";
import { CartDrawer } from "@/components/CartDrawer";
import { ToastViewport } from "@/components/ToastViewport";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AstraMart — Your Cosmic Marketplace",
    template: "%s · AstraMart",
  },
  description: "Discover stellar deals at AstraMart. Shop electronics, apparel, and more.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--surface)] text-[var(--foreground)]`}>
        <UIProvider>
          <CartProvider>
            <WishlistProvider>
              <SiteHeader />
              <main className="mx-auto max-w-6xl px-4 py-8 min-h-[70vh]">
                {children}
              </main>
              <CartDrawer />
              <ToastViewport />
            </WishlistProvider>
          </CartProvider>
        </UIProvider>
        <footer className="border-t border-white/10 bg-[var(--surface-2)]">
          <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-white/70">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-secondary)] shadow-[0_0_20px_var(--brand-secondary)]" />
                <span className="font-semibold">AstraMart</span>
              </div>
              <p>Shop across the cosmos with confidence.</p>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/faq" className="hover:text-white">FAQ</Link>
            </div>
            <div className="flex flex-col gap-1">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
          <div className="text-center text-xs text-white/50 pb-6">© {new Date().getFullYear()} AstraMart</div>
        </footer>
      </body>
    </html>
  );
}


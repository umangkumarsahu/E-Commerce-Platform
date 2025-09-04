"use client";
import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";

export function SiteHeader() {
  const { openCart } = useUI();
  const { state } = useCart();
  const count = state.items.reduce((s, i) => s + i.quantity, 0);
  return (
    <header className="border-b border-white/10 bg-[var(--surface-2)]/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-secondary)] shadow-[0_0_20px_var(--brand-secondary)]" />
          <span className="text-lg font-semibold tracking-wide">AstraMart</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/catalog" className="hover:text-[var(--brand-secondary)]">Catalog</Link>
          <Link href="/wishlist" className="hover:text-[var(--brand-secondary)]">Wishlist</Link>
          <button onClick={openCart} className="relative hover:text-[var(--brand-secondary)]">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--brand-accent)] text-black">{count}</span>
            )}
          </button>
          <Link href="/account" className="hover:text-[var(--brand-secondary)]">Account</Link>
        </nav>
      </div>
    </header>
  );
}


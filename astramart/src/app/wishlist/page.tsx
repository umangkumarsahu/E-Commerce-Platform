"use client";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { state, clear } = useWishlist();
  const items = products.filter((p) => state.productIds.includes(p.id));
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
      {items.length === 0 ? (
        <p className="text-white/70">No items yet. <Link href="/catalog" className="link">Browse catalog</Link>.</p>
      ) : (
        <div className="grid gap-3">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <li key={p.id} className="rounded-lg border border-white/10 bg-[var(--surface-2)] p-4">
                <div className="font-medium mb-1">{p.name}</div>
                <Link href={`/product/${p.slug}`} className="link">View</Link>
              </li>
            ))}
          </ul>
          <div>
            <button onClick={() => clear()} className="px-3 py-2 rounded-md border border-white/10">Clear</button>
          </div>
        </div>
      )}
    </section>
  );
}


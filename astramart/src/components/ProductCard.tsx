"use client";
import Link from "next/link";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggle } = useWishlist();
  const { pushToast, openCart } = useUI();

  function handleAdd() {
    addItem(product.id);
    pushToast({ title: "Added to cart", description: product.name });
    openCart();
  }

  return (
    <li className="rounded-lg border border-white/10 bg-[var(--surface-2)] p-4">
      <div className="aspect-video rounded-md bg-[var(--surface)] mb-3 flex items-center justify-center text-xs text-white/50">img</div>
      <h3 className="font-medium mb-1">{product.name}</h3>
      <div className="text-xs text-white/60 mb-1">{product.category}</div>
      <div className="text-xs text-white/70 mb-3">⭐ {product.rating.toFixed(1)}</div>
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold">{formatPrice(product.priceCents)}</span>
        <Link href={`/product/${product.slug}`} className="link">Details</Link>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleAdd} className="btn-primary px-3 py-2 rounded-md">Add to Cart</button>
        <button onClick={() => toggle(product.id)} aria-label="Toggle wishlist" className="px-3 py-2 rounded-md border border-white/10">♥</button>
      </div>
    </li>
  );
}


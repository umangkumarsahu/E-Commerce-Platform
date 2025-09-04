"use client";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type Params = { params: { slug: string } };

export default function ProductPage({ params }: Params) {
  const { addItem } = useCart();
  const { toggle } = useWishlist();
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="aspect-square rounded-lg bg-[var(--surface-2)] border border-white/10" />
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
        <p className="text-white/70 mb-4">{product.description}</p>
        <div className="text-xl font-semibold mb-6">{formatPrice(product.priceCents)}</div>
        <div className="flex items-center gap-3">
          <button onClick={() => addItem(product.id)} type="button" className="btn-primary px-4 py-2 rounded-md">Add to Cart</button>
          <button onClick={() => toggle(product.id)} type="button" className="px-3 py-2 rounded-md border border-white/10">Wishlist</button>
        </div>
      </div>
    </section>
  );
}


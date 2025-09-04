"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products, formatPrice } from "@/data/products";

export default function CartPage() {
  const { state, updateItem, removeItem, clear } = useCart();
  const items = state.items.map((i) => ({
    ...i,
    product: products.find((p) => p.id === i.productId),
  })).filter((x) => x.product);

  const subtotal = items.reduce((sum, i) => sum + (i.product!.priceCents * i.quantity), 0);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-white/70">Your cart is empty. <Link className="link" href="/catalog">Shop now</Link>.</p>
      ) : (
        <div className="grid gap-4">
          <ul className="grid gap-3">
            {items.map((i) => (
              <li key={i.productId} className="flex items-center justify-between rounded-lg border border-white/10 bg-[var(--surface-2)] p-4">
                <div>
                  <div className="font-medium">{i.product!.name}</div>
                  <div className="text-white/70 text-sm">{formatPrice(i.product!.priceCents)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    value={i.quantity}
                    onChange={(e) => updateItem(i.productId, Number(e.target.value))}
                    className="w-16 rounded-md bg-[var(--surface)] border border-white/10 px-2 py-1"
                  />
                  <button onClick={() => removeItem(i.productId)} className="px-3 py-1 rounded-md border border-white/10">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Subtotal: {formatPrice(subtotal)}</div>
            <div className="flex items-center gap-3">
              <button onClick={() => clear()} className="px-3 py-2 rounded-md border border-white/10">Clear</button>
              <Link href="/checkout" className="btn-primary px-4 py-2 rounded-md">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


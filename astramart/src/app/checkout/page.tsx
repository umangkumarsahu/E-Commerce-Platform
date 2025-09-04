"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { state, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.items.length === 0) return;
    setSubmitted(true);
    clear();
  }

  if (submitted) {
    return (
      <section className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-2">Order placed</h1>
        <p className="text-white/70">Thank you for your purchase!</p>
      </section>
    );
  }

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input required className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input required type="email" className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Card Number</label>
            <input required inputMode="numeric" className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Expiry</label>
            <input required className="w-full rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2" />
          </div>
        </div>
        <button disabled={state.items.length === 0} type="submit" className="btn-primary px-4 py-2 rounded-md disabled:opacity-50">Place Order</button>
      </form>
    </section>
  );
}


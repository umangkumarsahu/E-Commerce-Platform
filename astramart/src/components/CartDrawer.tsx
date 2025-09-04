"use client";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  const { state, updateItem, removeItem } = useCart();
  const hasItems = state.items.length > 0;
  return (
    <div className={`fixed inset-0 z-50 transition ${isCartOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isCartOpen}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${isCartOpen ? "opacity-100" : "opacity-0"}`} onClick={closeCart} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-[var(--surface-2)] border-l border-white/10 shadow-xl transform transition-transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`} role="dialog" aria-label="Cart Drawer">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="font-semibold">Your Cart</div>
          <button onClick={closeCart} aria-label="Close" className="px-2 py-1 border border-white/10 rounded">Close</button>
        </div>
        <div className="p-4 grid gap-3">
          {!hasItems ? (
            <div className="text-white/70">Your cart is empty.</div>
          ) : (
            state.items.map((i) => (
              <div key={i.productId} className="flex items-center justify-between rounded border border-white/10 p-3">
                <div className="text-sm">{i.productId}</div>
                <div className="flex items-center gap-2">
                  <input type="number" min={0} value={i.quantity} onChange={(e) => updateItem(i.productId, Number(e.target.value))} className="w-16 rounded bg-[var(--surface)] border border-white/10 px-2 py-1" />
                  <button onClick={() => removeItem(i.productId)} className="px-2 py-1 rounded border border-white/10">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}


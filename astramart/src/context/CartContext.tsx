"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, ReactNode } from "react";
import type { Product } from "@/data/products";

type CartItem = { productId: string; quantity: number };
type CartState = { items: CartItem[] };

type CartAction =
  | { type: "add"; productId: string; quantity?: number }
  | { type: "remove"; productId: string }
  | { type: "update"; productId: string; quantity: number }
  | { type: "clear" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find((i) => i.productId === action.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === action.productId ? { ...i, quantity: i.quantity + qty } : i
          ),
        };
      }
      return { items: [...state.items, { productId: action.productId, quantity: qty }] };
    }
    case "remove": {
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    }
    case "update": {
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, quantity: Math.max(0, action.quantity) } : i
        ).filter((i) => i.quantity > 0),
      };
    }
    case "clear": {
      return { items: [] };
    }
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("astramart_cart");
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed && Array.isArray(parsed.items)) {
          parsed.items.forEach((i) => dispatch({ type: "add", productId: i.productId, quantity: i.quantity }));
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("astramart_cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addItem: (productId, quantity) => dispatch({ type: "add", productId, quantity }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      updateItem: (productId, quantity) => dispatch({ type: "update", productId, quantity }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


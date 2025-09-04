"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, ReactNode } from "react";

type WishlistState = { productIds: string[] };
type WishlistAction =
  | { type: "toggle"; productId: string }
  | { type: "clear" };

function reducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "toggle": {
      const exists = state.productIds.includes(action.productId);
      return {
        productIds: exists
          ? state.productIds.filter((id) => id !== action.productId)
          : [...state.productIds, action.productId],
      };
    }
    case "clear":
      return { productIds: [] };
    default:
      return state;
  }
}

type WishlistContextValue = {
  state: WishlistState;
  toggle: (productId: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { productIds: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("astramart_wishlist");
      if (raw) {
        const parsed = JSON.parse(raw) as WishlistState;
        if (parsed?.productIds) {
          parsed.productIds.forEach((id: string) => dispatch({ type: "toggle", productId: id }));
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("astramart_wishlist", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<WishlistContextValue>(
    () => ({ state, toggle: (productId) => dispatch({ type: "toggle", productId }), clear: () => dispatch({ type: "clear" }) }),
    [state]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}


"use client";
import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";

export type Toast = { id: string; title: string; description?: string };

type UIContextValue = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const toast: Toast = { id, ...t };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => setToasts((prev) => prev.filter((x) => x.id !== id)), []);

  const value = useMemo<UIContextValue>(
    () => ({ isCartOpen, openCart, closeCart, toasts, pushToast, removeToast }),
    [isCartOpen, toasts, pushToast, removeToast]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}


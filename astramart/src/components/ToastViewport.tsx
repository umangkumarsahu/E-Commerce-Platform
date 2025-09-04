"use client";
import { useUI } from "@/context/UIContext";

export function ToastViewport() {
  const { toasts, removeToast } = useUI();
  return (
    <div className="fixed bottom-4 right-4 z-50 grid gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="rounded-md border border-white/10 bg-[var(--surface-2)] px-4 py-3 shadow">
          <div className="font-medium">{t.title}</div>
          {t.description && <div className="text-white/70 text-sm">{t.description}</div>}
          <button onClick={() => removeToast(t.id)} className="text-xs mt-1 opacity-70 hover:opacity-100">Dismiss</button>
        </div>
      ))}
    </div>
  );
}


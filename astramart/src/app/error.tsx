"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body className="bg-[var(--surface)] text-[var(--foreground)]">
        <div className="min-h-screen grid place-items-center p-6">
          <div className="max-w-md w-full rounded-lg border border-white/10 bg-[var(--surface-2)] p-6 text-center">
            <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
            <p className="text-white/70 mb-4">Please try again. If the problem persists, contact support.</p>
            <button onClick={reset} className="btn-primary px-4 py-2 rounded-md">Try again</button>
          </div>
        </div>
      </body>
    </html>
  );
}


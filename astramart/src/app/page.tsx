import Link from "next/link";
import { products, formatPrice } from "@/data/products";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-xl p-8 bg-gradient-to-br from-[var(--brand-primary)]/20 via-[var(--brand-secondary)]/10 to-transparent border border-white/10">
        <h1 className="text-3xl font-semibold mb-2">Welcome to AstraMart</h1>
        <p className="text-white/80">Your cosmic marketplace for stellar products.</p>
        <div className="mt-6">
          <Link href="/catalog" className="btn-primary px-4 py-2 rounded-md inline-block">
            Browse Catalog
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg p-4 border border-white/10 bg-[var(--surface-2)]">Fast delivery across the galaxy</div>
        <div className="rounded-lg p-4 border border-white/10 bg-[var(--surface-2)]">Secure checkout</div>
        <div className="rounded-lg p-4 border border-white/10 bg-[var(--surface-2)]">Premium support</div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Featured</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.filter((p) => p.featured).map((p) => (
            <li key={p.id} className="rounded-lg border border-white/10 bg-[var(--surface-2)] p-4">
              <div className="font-medium mb-1">{p.name}</div>
              <div className="text-white/70 text-sm mb-3">{formatPrice(p.priceCents)}</div>
              <Link href={`/product/${p.slug}`} className="link">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

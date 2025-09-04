"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [sort, setSort] = useState("relevance");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const q = sp.get("q") || "";
    const c = (sp.get("c") as any) || "all";
    const s = sp.get("s") || "relevance";
    setQuery(q);
    setCategory(c);
    setSort(s);
  }, []);

  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const sp = new URLSearchParams();
      if (query) sp.set("q", query);
      if (category !== "all") sp.set("c", category);
      if (sort !== "relevance") sp.set("s", sort);
      const url = sp.toString() ? `/catalog?${sp.toString()}` : "/catalog";
      window.history.replaceState(null, "", url);
    }, 250);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query, category, sort]);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (category === "all" || p.category === category) &&
      (p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()))
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [query, category, sort]);

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">Catalog</h1>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2">
          {categories.map((c) => (
            <option key={c} value={c}>{c[0].toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-md bg-[var(--surface-2)] border border-white/10 px-3 py-2">
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}


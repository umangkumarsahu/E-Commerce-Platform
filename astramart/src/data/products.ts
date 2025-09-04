export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  category: "electronics" | "apparel" | "accessories";
  image: string;
  rating: number; // 0-5
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "astro-001",
    slug: "starlight-headphones",
    name: "Starlight Headphones",
    description: "Immersive audio with cosmic clarity.",
    priceCents: 12999,
    category: "electronics",
    image: "/next.svg",
    rating: 4.6,
    featured: true,
  },
  {
    id: "astro-002",
    slug: "nebula-jacket",
    name: "Nebula Jacket",
    description: "Lightweight, warm, and stellar style.",
    priceCents: 8999,
    category: "apparel",
    image: "/vercel.svg",
    rating: 4.2,
  },
  {
    id: "astro-003",
    slug: "quantum-smartwatch",
    name: "Quantum Smartwatch",
    description: "Timekeeping beyond light speed.",
    priceCents: 15999,
    category: "accessories",
    image: "/globe.svg",
    rating: 4.8,
    featured: true,
  },
];

export function formatPrice(priceCents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

export const categories = ["all", "electronics", "apparel", "accessories"] as const;


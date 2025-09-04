import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // replace when deploying
  return [
    "",
    "/catalog",
    "/cart",
    "/checkout",
    "/account",
    "/about",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((p) => ({ url: base + p, changeFrequency: "weekly" }));
}


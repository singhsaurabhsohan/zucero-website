import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/our-story", "/journal", "/contact", "/shipping", "/returns", "/privacy", "/terms", "/refunds"];
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: path === "/" ? "weekly" as const : "monthly" as const, priority: path === "/" ? 1 : 0.6 })),
    ...products.map((product) => ({ url: absoluteUrl(`/products/${product.slug}`), changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}

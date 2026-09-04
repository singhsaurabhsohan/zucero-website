import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionDivider } from "@/components/section-divider";
import { SiteFooter } from "@/components/site-footer";
import { StoreHeader } from "@/components/store-header";
import { products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Explore Zucero Desi Khand and Original Brown Khand Mishri — traditional Indian sweetness, thoughtfully made.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "The Collection | Zucero",
    description: "Explore Zucero Desi Khand and Original Brown Khand Mishri — traditional Indian sweetness, thoughtfully made.",
    url: absoluteUrl("/products"),
    images: [{ url: "/images/carousel-khand-matka-v2.png", alt: "The Zucero collection" }],
  },
};

export default function ProductsPage() {
  return (
    <main className="store-page">
      <StoreHeader />
      <div className="heritage">
        <div className="collection-intro">
          <p>Luxury is not about adding more.<br />It’s about preserving what truly matters.</p>
        </div>
        <section id="products" className="heritage-collection">
          <SectionDivider number="04" title="The Collection" light />
          <header>
            <span className="heritage-rule" />
            <p>Each one distinct. Each one with a story older than the brand.</p>
            <div className="collection-launch-callout">
              <p className="eyebrow">Be first to experience The Good Sugar</p>
              <p>Priority access <span>·</span> Deliveries begin 14 September.</p>
            </div>
          </header>
          <div className="heritage-product-grid">
            {products.map((product, index) => (
              <article className="heritage-product" key={product.slug}>
                <Link href={`/products/${product.slug}`} className="heritage-picture" aria-label={`Explore ${product.name}`}>
                  <Image
                    src={index === 0 ? "/images/carousel-khand-matka-v2.png" : "/images/collection-mishri-v2.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 760px) 88vw, 42vw"
                  />
                  <div className="heritage-image-title">
                    <span>No. 0{index + 1}</span>
                    <h3>{product.name}</h3>
                  </div>
                </Link>
                <div className="heritage-product-details">
                  <p className="eyebrow">{index ? "Crystal" : "Cane"}</p>
                  <span className="heritage-rule" />
                  <div className="heritage-product-story">
                    <p>{index ? "A centuries-old tradition of crystallised sweetness." : "Before refined sugar, there was Khand — a centuries-old Indian tradition of sweetness."}</p>
                    <p>{product.description}</p>
                  </div>
                  <p className="heritage-sizes">{product.variants.map((variant) => `${variant.label} · ₹${(variant.pricePaise ?? 0) / 100}`).join(" / ")}</p>
                  <Link href={`/products/${product.slug}`} className="text-link">Explore &amp; buy →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}

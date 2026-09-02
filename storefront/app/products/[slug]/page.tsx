import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/product-purchase";
import { StoreHeader } from "@/components/store-header";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/catalog";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main className="store-page">
    <StoreHeader />
    <section className="product-detail">
      <div className="product-gallery"><Image src={product.image} alt={product.name} width={1100} height={1250} priority /></div>
      <ProductPurchase product={product} />
    </section>
    <section className="product-facts"><article><span>Ingredients</span><strong>{product.ingredients}</strong></article><article><span>Made in</span><strong>Haryana, India</strong></article><article><span>Storage</span><strong>Keep cool and dry</strong></article></section>
    <section className="product-story"><p className="eyebrow">The Zucero standard</p><h2>Nothing hidden<br /><em>behind sweetness.</em></h2><p>Ingredient, batch, manufacturing, nutrition, and best-before details will be visible on every pack and product page. Product claims will remain specific, supportable, and easy to understand.</p></section>
    <SiteFooter />
  </main>;
}

import Link from "next/link";
import { Leaf, PackageCheck, Truck, MessageCircle } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
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
  const isKhand = slug === "desi-khand";
  const goodFacts = isKhand ? [["Sun-dried", "Naturally dried under the sun as part of our traditional process."], ["No added flavours", "Nothing added to alter its natural character or taste."], ["No added sweeteners", "Sweetness comes from sugarcane, without added sweeteners."], ["Traditional iron vessel craft", "Traditionally prepared in iron vessels as part of the time-honoured making process."], ["Natural character, preserved", "A slower process designed to retain the character of sugarcane."]] : [["Khand-based", "Crafted from sugarcane-derived Khand, not refined white sugar."], ["Thread-crafted", "Crystallised slowly around carefully positioned threads using an age-old Indian technique."], ["Crystal by crystal", "Each crystal forms gradually through a patient, traditional process."], ["No added flavours", "Nothing added to alter its natural sweetness or character."], ["No added sweeteners", "Sweetness comes from the sugarcane-derived base."], ["Traditional craft", "A time-honoured method where patience, precision and nature shape every crystal."]];
  return <main className="store-page pdp-page">
    <StoreHeader />
    <nav className="pdp-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#products">The Collection</Link><span>/</span><span>{product.name}</span></nav>
    <section className="product-detail">
      <ProductGallery product={product} />
      <ProductPurchase product={product} />
    </section>
    <section className="pdp-service-strip" aria-label="Shopping information"><Link href="/shipping"><Truck /><strong>Delivery by PIN code</strong><span>Check availability above</span></Link><Link href="/returns"><PackageCheck /><strong>Care with every order</strong><span>Read our returns policy</span></Link><Link href="/contact"><MessageCircle /><strong>Here to help</strong><span>Contact Zucero support</span></Link><a href="#product-information"><Leaf /><strong>Know your sugar</strong><span>Ingredients, clearly stated</span></a></section>
    <section className="pdp-difference"><p className="eyebrow">The Good Facts — {isKhand ? "Desi Khand" : "Mishri"}</p><h2>Good begins<br /><em>with how it’s made.</em></h2><div>{goodFacts.map(([title, copy]) => <article key={title}><Leaf /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="transparency-section"><p className="eyebrow">Transparency</p><h2>Nothing hidden<br /><em>behind sweetness.</em></h2><p>Clear information. Specific claims. Nothing overstated.</p><p>Check your pack for the complete ingredients, manufacturing, nutrition and best-before details.</p><p><strong>Contains milk.</strong> Both products are prepared with desi cow milk and desi cow ghee.</p></section>
    <section id="product-information" className="pdp-information"><div><p className="eyebrow">Every detail matters</p><h2>Get to know<br />{product.name}.</h2></div><div>
      <details open><summary>Description <span>+</span></summary><p>{product.description} {isKhand ? "Use it where you enjoy a rounded sweetness in your everyday cooking." : "Enjoy its crystalline texture and allow time for it to dissolve in warm drinks."}</p><p>Zucero products are sugars. Enjoy in moderation; they are not sugar-free or a treatment for any health condition.</p></details>
      <details><summary>Character &amp; uses <span>+</span></summary><p>{isKhand ? "A versatile choice for tea, coffee, kheer, halwa and home baking. Start with a small amount and adjust to taste." : "A traditional format for warm beverages and sweet preparations. Larger crystals take longer to dissolve than fine sugar."}</p></details>
      <details><summary>How to use <span>+</span></summary><p>{isKhand ? "Measure with a clean, dry spoon. Stir into hot drinks or incorporate into your recipe, adjusting the amount to your taste." : "Separate the sugar crystals from any thread before using them. Dissolve in a warm drink or use in a recipe. Do not consume the thread."}</p></details>
      <details><summary>Ingredients <span>+</span></summary><p>{product.ingredients}. Refer to the final pack label for the complete product declaration and batch details.</p></details>
      <details><summary>Storage <span>+</span></summary><p>Keep tightly closed in a cool, dry place, away from moisture. Always use a clean, dry spoon. Check your pack for the batch-specific best-before date.</p></details>
      <details><summary>Shipping &amp; returns <span>+</span></summary><p>Delivery serviceability is checked using your PIN code. Final charges and taxes are shown at checkout. Please see our <Link href="/shipping">shipping</Link> and <Link href="/returns">returns policies</Link> for details.</p></details>
    </div></section>
    <section className="pdp-related"><p className="eyebrow">Complete your collection</p><h2>You may also enjoy</h2><div className="product-grid">{products.filter(p => p.slug !== slug).map(p => <ProductCard product={p} key={p.slug} />)}</div></section>
    <SiteFooter />
  </main>;
}

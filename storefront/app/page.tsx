import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Droplets, FlaskConical, Leaf, PackageCheck, Sparkles, Sun } from "lucide-react";
import { Header } from "@/components/header";
import { LocationConsent } from "@/components/location-consent";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { products } from "@/lib/catalog";

const carousel = ["artisan_hands.webp", "crystal_divider.webp", "heritage_khand.webp", "khand_texture.webp", "mishri_macro.webp", "sugarcane_origin.webp", "tea_ritual.webp"];
const faqs = [
  ["What makes Zucero different from refined white sugar?", "Zucero focuses on minimally processed, traditional sugar formats. Each product page will clearly state ingredients, process, and nutrition so you can make an informed choice."],
  ["Is Zucero sugar-free or suitable for diabetes?", "No. Zucero products are sugars and should be consumed mindfully. We do not make disease-treatment claims; please follow advice from your healthcare professional."],
  ["How are taxes and shipping calculated?", "The first location prompt gives an estimate. Final GST and Shiprocket delivery charges are calculated from your checkout address and PIN code before payment."],
  ["Where do you deliver?", "We are preparing pan-India delivery. Serviceability and the expected delivery window will be confirmed from your PIN code during checkout."],
  ["Can I track my order?", "Yes. Once dispatched, your account and shipment email will contain the Shiprocket tracking link and current status."],
  ["What if my jar arrives damaged?", "Share your order number and clear photos with our support team within the policy window shown on the website. We will review it promptly."]
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image className="hero-image" src="/images/hero-cinematic-poster.png" alt="Zucero Desi Khand in warm sunlight among sugarcane" fill priority sizes="100vw" />
        <div className="hero-shade" />
        <Header />
        <div className="hero-copy">
          <p className="eyebrow gold">Rooted in Indian sugar-making</p>
          <h1>Nature perfected<br /><em>sweetness.</em></h1>
          <p>We simply preserved it.</p>
          <div className="button-row"><Link className="button button-gold" href="#products">Shop Now <ArrowRight size={16} /></Link><Link className="text-link light" href="#problem">Why good sugar?</Link></div>
        </div>
        <div className="hero-proofs" aria-label="Product highlights">
          <span><Leaf /> 100% sugarcane</span><span><FlaskConical /> Quality tested</span><span><Sparkles /> No artificial colours</span><span><PackageCheck /> Securely packed</span>
        </div>
        <Link href="#carousel" className="scroll-cue" aria-label="Scroll to explore"><ArrowDown /></Link>
      </section>

      <section id="carousel" className="image-marquee" aria-label="Zucero moments">
        <div className="marquee-track">{[...carousel, ...carousel].map((image, index) => <div className="marquee-image" key={`${image}-${index}`}><Image src={`/images/${image}`} alt="" width={520} height={360} /></div>)}</div>
      </section>

      <section id="problem" className="split-section problem">
        <div className="section-copy"><p className="eyebrow">The sugar problem</p><h2>Sweetness lost its <em>story.</em></h2><p>Much of today’s sugar is treated like an anonymous white ingredient—processed for uniformity, marketed with vague claims, and disconnected from how it was made.</p><ul className="check-list"><li><Check /> Labels that hide more than they explain</li><li><Check /> Over-processing that removes character</li><li><Check /> Health halos instead of honest context</li></ul><p className="note">Sugar is still sugar. The meaningful difference is transparency, process, taste, and how mindfully it fits into your life.</p></div>
        <div className="editorial-image"><Image src="/images/khand_texture.webp" alt="Close-up of golden unrefined sugar crystals" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      </section>

      <section className="nature-section">
        <div className="nature-art"><Image src="/images/sugarcane_origin.webp" alt="Sugarcane growing in warm sunlight" fill sizes="100vw" /></div>
        <div className="nature-copy"><Sun /><p className="eyebrow gold">Nature’s solution</p><h2>Begin with better sugarcane.<br />Interfere less.</h2><p>Our approach is beautifully simple: start close to the source, respect time-tested craft, and explain every step without pretending sugar is something it is not.</p></div>
      </section>

      <section id="products" className="products-section section-shell">
        <div className="section-heading"><div><p className="eyebrow">The opening collection</p><h2>Good sugar, in its<br /><em>most honest forms.</em></h2></div><p>Two launch products, carefully sized for everyday kitchens and considered gifting.</p></div>
        <div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
      </section>

      <section id="process" className="process-section section-shell">
        <div className="section-heading centered"><div><p className="eyebrow">How we make it</p><h2>Patient by process.<br /><em>Precise by principle.</em></h2></div></div>
        <div className="process-grid"><article><span>01</span><Droplets /><h3>Source</h3><p>Start with carefully selected sugarcane and documented supplier standards.</p></article><article><span>02</span><Sun /><h3>Clarify</h3><p>Clean the juice with a restrained process designed for clarity without cosmetic shortcuts.</p></article><article><span>03</span><Sparkles /><h3>Concentrate</h3><p>Reduce patiently until the flavour and texture reach the intended expression.</p></article><article><span>04</span><PackageCheck /><h3>Test & pack</h3><p>Complete batch checks and pack securely for freshness, traceability, and transit.</p></article></div>
      </section>

      <section id="philosophy" className="philosophy split-section">
        <div className="editorial-image"><Image src="/images/slow_sweetness.webp" alt="A slow sweetness ritual" fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
        <div className="section-copy"><p className="eyebrow">Our philosophy</p><h2>Honesty is the<br /><em>best ingredient.</em></h2><p>Zucero was shaped by a marketer who grew tired of seeing food reduced to clever claims. Our work begins where advertising should: with a product worthy of clear language.</p><blockquote>“We will tell you what it is, how it is made, and what it is not—so your choice remains yours.”</blockquote><p className="founder-line">— Tamanna, Founder of Zucero</p><Link className="text-link" href="/our-story">Read our story <ArrowRight size={15} /></Link></div>
      </section>

      <section className="proof-section section-shell">
        <p className="eyebrow">Trust, before testimonials</p><h2>Launching with proof.<br /><em>Reviews will be earned.</em></h2><p className="intro">As a new brand, we will not invent customer praise. This space will publish verified purchaser reviews after launch; until then, here is what you can inspect.</p>
        <div className="proof-grid"><article><FlaskConical /><h3>Batch information</h3><p>Testing and traceability details linked to the product you receive.</p></article><article><Leaf /><h3>Clear ingredients</h3><p>No vague blends or distracting wellness language.</p></article><article><PackageCheck /><h3>Real order support</h3><p>Shipment updates, human support, and a written resolution policy.</p></article></div>
      </section>

      <section id="faqs" className="faq-section section-shell"><div><p className="eyebrow">Before you ask</p><h2>Clear answers,<br /><em>without the fine print.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section id="contact" className="contact-section"><div><p className="eyebrow gold">The launch list</p><h2>Be first to taste<br /><em>the good sugar.</em></h2><p>Get launch availability, founder notes, and early product access. No noisy inbox.</p></div><form className="launch-form"><label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><button className="button button-gold" type="submit">Join the launch list <ArrowRight size={16} /></button><small>By joining, you agree to receive Zucero updates. Unsubscribe anytime.</small></form></section>

      <SiteFooter />
      <LocationConsent />
    </main>
  );
}

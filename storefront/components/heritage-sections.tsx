import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/catalog";

export function PhilosophySection() {
  return <div className="heritage">
    <section id="philosophy" className="heritage-philosophy">
      <p className="eyebrow">Our philosophy</p>
      <h2>We believe in leaving<br /><em>good things alone.</em></h2>
      <p>Nature has a remarkable way of getting things right. A sugarcane stalk carries sweetness within it. Generations before us knew how to draw it out. We simply believe there is wisdom in that simplicity.</p>
      <p>At Zucero, we don’t believe in changing something merely because we can. We believe in thoughtful sourcing. In patient craft. In honest ingredients. In knowing what belongs — and what doesn’t.</p><p>Because true refinement isn’t about doing more. It’s about knowing what to leave behind.</p>
    </section>
  </div>;
}

export function HeritageSections() {
  return <div className="heritage">
    <div className="collection-intro"><p>Luxury is not about adding more.<br />It’s about preserving what truly matters.</p></div>
    <section id="products" className="heritage-collection">
      <header><p className="eyebrow">The Zucero Collection</p><h2>The Collection</h2><span className="heritage-rule" /><p>Each one distinct. Each one with a story older than the brand.</p><p className="eyebrow">Be first to experience The Good Sugar</p><p>Priority access · Deliveries begin 14 September.</p></header>
      <div className="heritage-product-grid">
        {products.map((product, index) => <article className="heritage-product" key={product.slug}>
          <div className="heritage-picture"><Image src={index === 0 ? "/images/carousel-khand-matka-v2.png" : "/images/collection-mishri-v2.png"} alt={product.name} fill sizes="(max-width: 760px) 88vw, 42vw" /><div className="heritage-image-title"><span>No. 0{index + 1}</span><h3>{product.name}</h3></div></div>
          <div className="heritage-product-details"><p className="eyebrow">{index ? "Crystal" : "Cane"}</p><span className="heritage-rule" /><div className="heritage-product-story"><p>{index ? "A centuries-old tradition of crystallised sweetness." : "Before refined sugar, there was Khand — a centuries-old Indian tradition of sweetness."}</p><p>{product.description}</p></div><p className="heritage-sizes">{product.variants.map(v => `${v.label} · ₹${(v.pricePaise ?? 0) / 100}`).join(" / ")}</p><Link href={`/products/${product.slug}`} className="text-link">Shop {index ? "Mishri" : "Khand"} →</Link></div>
        </article>)}
      </div>
    </section>
    <section id="process" className="heritage-dark heritage-craft">
      <div className="heritage-panorama"><Image src="/images/artisan_hands.webp" alt="Traditional sugar-making in a brass vessel" fill sizes="100vw" /></div>
      <div className="heritage-columns"><div><p className="eyebrow">The Craft</p><h2>Good<br />takes time.</h2></div><div><span className="heritage-rule" /><p className="heritage-lead">At Zucero, we honour the wisdom of how sweetness was made before shortcuts became the norm.</p><p>Our Khand begins with fresh sugarcane juice and is prepared using time-honoured methods. Traditionally prepared in iron vessels and naturally dried under the sun, it allows time and nature to do their work.</p><p>And then there is our Mishri. Fine threads are carefully positioned to encourage the slow formation of crystals — a meeting of geometry, patience and traditional Indian craft.</p><p>No shortcuts. No unnecessary intervention. Just sugarcane, time, tradition and craft. Because purity isn’t created at the end. It is protected from the beginning.</p></div></div>
      <div className="craft-steps">{[["Source", "Good begins at the source — with carefully selected sugarcane, chosen for its natural character and quality."], ["Purify", "Traditionally clarified using natural ingredients to remove unwanted impurities while preserving its natural character."], ["Crystallise", "Slowly transformed into crystals through the art of traditional craftsmanship."], ["Deliver", "Carefully packed and prepared to bring Zucero to your home."]].map(([title, copy], i) => <article key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="heritage-dark heritage-slow"><div><p className="eyebrow">Chapter 04</p><h2>Slow<br /><em>sweetness.</em></h2><span className="heritage-rule" /><p>There is something that happens when Mishri dissolves slowly in hot water. You wait for it. That waiting is the ritual. Not the sugar itself, but what it asks of you.</p></div><div className="heritage-panorama"><Image src="/images/slow_sweetness.webp" alt="A quiet tea ritual with mishri" fill sizes="100vw" /></div></section>
    <section className="heritage-founder"><Image src="/images/foundertamanna.webp" alt="Tamanna Sharma, founder of Zucero" width={380} height={480} sizes="(max-width: 640px) 70vw, 300px" /><p className="eyebrow">Tamanna Sharma · The founder’s point of view</p><blockquote>If marketing can create trust,<br />it should also earn it.</blockquote><p className="eyebrow">Founder &amp; Managing Director, Zucero</p><span className="heritage-rule" /><p>With leadership experience across India and international markets, Tamanna Sharma has spent years understanding the power of brands — and, more importantly, the power of trust.</p><p>A good brand is not built by marketing alone. It is built by a good product, and strengthened by trust earned over time.</p><p>Zucero exists to make good more visible. Not by making bigger promises or creating unnecessary noise, but by making people more aware of what they choose.</p><Link className="text-link" href="/our-story">Read the founder’s story →</Link></section>
    <section className="heritage-dark heritage-rituals"><p className="eyebrow">Made for real life</p><h2>Everyday rituals,<br />elevated.</h2><div className="heritage-ritual-grid">{[
      ["Morning chai", "Stir a spoon of khand into strong cardamom tea. Start small and sweeten to your taste.", "desi-khand", "Meet Khand"],
      ["After-dinner pause", "Let a mishri crystal dissolve slowly beside a cup of warm water. Make a little room for the pause.", "dhage-wali-mishri", "Meet Mishri"],
      ["Slow baking", "Bring khand into cakes, puddings and time-honoured Indian sweets. Familiar ingredients, considered moments.", "desi-khand", "Bake with Khand"]
    ].map(([title, copy, slug, cta], i) => <article key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{copy}</p><Link className="text-link" href={`/products/${slug}`}>{cta} →</Link></article>)}</div></section>
    <section className="heritage-dark heritage-journal"><p className="eyebrow">From the Journal</p><h2>From the journal</h2><div className="heritage-journal-grid">{[
      ["slow_sweetness.webp", "Rituals", "The Ritual of Morning Tea", "A slower beginning, one cup at a time.", "morning-tea"],
      ["journal_editorial.webp", "Heritage", "The Hands Behind the Craft", "On the value of patience and traditional sugar-making.", "the-craft"]
    ].map(([img, tag, title, copy, slug]) => <Link href={`/journal#${slug}`} key={slug}><div className="heritage-picture"><Image src={`/images/${img}`} alt={title} fill sizes="(max-width: 760px) 88vw, 43vw" /></div><p className="eyebrow">{tag}</p><h3>{title}</h3><p>{copy}</p><span className="text-link">Read story →</span></Link>)}</div><Link className="button" href="/journal">View all stories</Link></section>
  </div>;
}

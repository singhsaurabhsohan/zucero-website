import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, FlaskConical, Leaf, PackageCheck, Sparkles, Sun } from "lucide-react";
import { Header } from "@/components/header";
import { LocationConsent } from "@/components/location-consent";
import { HeritageSections, PhilosophySection } from "@/components/heritage-sections";
import { SiteFooter } from "@/components/site-footer";
import { StoryCarousel } from "@/components/story-carousel";

const highlights = [
  { Icon: Leaf, title: "PURE BY NATURE", description: "Nothing Artificial" },
  { Icon: FlaskConical, title: "NATURAL GOODNESS", description: "Retains the goodness of its natural source" },
  { Icon: Sparkles, title: "MINDFUL SWEETNESS", description: "A natural alternative to refined sugar" },
  { Icon: PackageCheck, title: "DELICATE SWEETNESS", description: "Light, subtle and naturally sweet" },
];
export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image className="hero-image" src="/images/hero-cinematic-poster.png" alt="Zucero Desi Khand in warm sunlight among sugarcane" fill priority sizes="100vw" />
        <div className="hero-video-embed" aria-hidden="true">
          <iframe
            title="Zucero cinematic hero film"
            src="https://play.gumlet.io/embed/6a2ee82136223b22766f448c?background=true"
            referrerPolicy="origin"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
            tabIndex={-1}
          />
        </div>
        <div className="hero-shade" />
        <Header />
        <div className="hero-copy">
          <p className="eyebrow gold">Rooted in Indian sugar-making</p>
          <h1>Sweetness<br />is a <em>ritual.</em></h1>
          <p>Nature perfected sweetness.<br />We simply preserved it.</p>
          <div className="button-row"><Link className="button button-gold" href="#products">Add natural sweetness to your life <ArrowRight size={16} /></Link></div>
          <div className="hero-labels"><Link href="/products/desi-khand#product-information">Pure by nature</Link><Link href="#nature">Natural goodness</Link><Link href="#problem">Mindful sweetness</Link><Link href="/products/dhage-wali-mishri">Delicate sweetness</Link></div>
        </div>
        <div className="hero-proofs" aria-label="Product highlights">
          <div className="hero-proofs-track">
            {[...highlights, ...highlights].map(({ Icon, title, description }, index) => (
              <span key={`${title}-${index}`} aria-hidden={index >= highlights.length ? true : undefined}>
                <Icon aria-hidden="true" />
                <b className="hero-proof-copy"><strong>{title}</strong><small>{description}</small></b>
              </span>
            ))}
          </div>
        </div>
        <Link href="#carousel" className="scroll-cue" aria-label="Scroll to explore"><ArrowDown /></Link>
      </section>

      <StoryCarousel />

      <PhilosophySection />

      <section id="problem" className="split-section problem">
        <div className="section-copy"><p>Sugar begins with something beautifully simple. A stalk of sugarcane. Sunlight. Soil. Time.</p><p>For generations, India knew how to turn that sweetness into Gur, Khand and Mishri — with patience, craft and a deep respect for the ingredient.</p><p>But somewhere along the way, sweetness became increasingly refined, standardised and disconnected from where it began. The colour became whiter. The crystals became more uniform. The story became harder to see.</p><p>We believe sweetness deserves better. Not more. Not louder. Just closer to its source. So we went back to the beginning.</p><p className="note">Sugar is still sugar. Enjoy it mindfully; natural sweetness is not sugar-free.</p></div>
        <div className="editorial-image"><Image src="/images/sugar-problem-v2.png" alt="Sugarcane field illuminated by warm sunrise light" fill sizes="(max-width: 760px) 100vw, 50vw" /><div className="section-image-caption"><span>The sugar problem</span><strong>Sweetness lost<br />its story.</strong></div></div>
      </section>

      <section id="nature" className="nature-section">
        <div className="nature-art"><Image src="/images/nature-sugarcane-field-v2.png" alt="An Indian woman walking through mature sugarcane at sunrise" fill sizes="100vw" /></div>
        <div className="nature-copy"><Sun /><p className="eyebrow gold">Nature’s answer</p><h2>Begin with sugarcane.<br />Interfere less.</h2><p>At Zucero, we believe some things don’t need to be reinvented. They simply need to be respected.</p><p>We return to traditional forms of sweetness, thoughtfully crafted from sugarcane and brought into the modern kitchen with greater care, clarity and intention.</p><p>This is sweetness with its story intact.<br />This is The Good Sugar.</p></div>
      </section>

      <HeritageSections />

      <section className="why-zucero section-shell"><p className="eyebrow">Why Zucero exists</p><h2>We question what goes into everything else.<br /><em>Why not sugar?</em></h2><p>We know where our coffee comes from. We ask about our milk. We read the labels on what we eat. Yet sugar — something we consume every day — is rarely questioned.</p><p>Zucero exists to change that. To make sweetness more thoughtful. More transparent. More connected to its source.</p><Link className="button button-gold" href="#products">Be first to experience The Good Sugar</Link><p className="eyebrow">Deliveries begin 14 September</p></section>

      <section id="contact" className="contact-section"><div><p className="eyebrow gold">The launch list</p><h2>Be first to taste<br /><em>the good sugar.</em></h2><p>Get launch availability, founder notes, and early product access. No noisy inbox.</p></div><form className="launch-form"><label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><button className="button button-gold" type="submit">Join the launch list <ArrowRight size={16} /></button><small>By joining, you agree to receive Zucero updates. Unsubscribe anytime.</small></form></section>

      <SiteFooter />
      <LocationConsent />
    </main>
  );
}

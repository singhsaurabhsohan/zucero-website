import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { absoluteUrl } from "@/lib/seo";

const title = "Our Story | Why Zucero Chose Traditional Indian Sweetness";
const description = "Discover why Zucero was created to bring greater transparency, provenance and traditional craft to Desi Khand, Mishri and everyday sugar choices.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Zucero story", "Desi Khand brand", "traditional Indian sweetness", "sugar alternatives", "health and wellness", "Khand", "Mishri"],
  alternates: { canonical: "/our-story" },
  openGraph: {
    type: "article",
    url: absoluteUrl("/our-story"),
    title: `${title} | Zucero`,
    description,
    images: [{ url: "/images/foundertamanna.webp", alt: "Zucero founder story" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Zucero`,
    description,
    images: ["/images/foundertamanna.webp"],
  },
};

export default function OurStoryPage() {
  return <ContentPage eyebrow="Tamanna Sharma · The founder’s story" title="It Started With a Simple Search for Something Better." intro="A personal search became a larger purpose — to bring traditional sweetness out of the grey and into the light.">
    <p>My journey with Zucero began with a personal search.</p><p>When I started my fitness journey, I began looking more closely at what I was consuming — and naturally, I started looking for an <Link href="/guides/sugar-alternatives">alternative to refined sugar</Link>.</p><p>But having grown up in the heart of Haryana, sweetness had always meant something very different to me.</p><p>Jaggery after a meal was tradition. It was familiar. It was something I genuinely loved.</p><p>Yet as I began looking for it more consciously, I discovered something unsettling.</p><p>Finding genuinely pure, unadulterated jaggery or Khand was becoming surprisingly difficult.</p><p>The traditional carts.<br />The small local sellers.<br />Even farmers selling directly from villages.</p><p>They looked wonderfully raw and authentic. But when I actually tried the products, I found that the story of “natural” did not always match what was inside.</p><p>That made me realise just how grey the category had become.</p><p>Jaggery, Khand and Mishri are everywhere. Yet there was no distinctive brand that made purity, provenance and the craft of these traditional sweeteners its very identity.</p><p>And that raised a bigger question for me:</p><h2>If we can be so conscious about what goes into our food, why have we never really questioned our sugar?</h2><p>Today, adults are increasingly conscious about health and wellness. We read labels, change our diets and make more informed choices.</p><p>But our children will still grow up around sweetness. Festivals, celebrations, desserts and little moments of indulgence will always be part of life.</p><p>So perhaps the answer isn&apos;t to take sweetness away.<br />Perhaps it is to make a better choice when we choose it.</p><p>That is where Zucero began.</p><p>A personal search became a larger purpose — to bring the goodness of natural sweetness out of the grey and into the light.</p><p><Link href="/guides/desi-khand">Learn what Desi Khand, Shudh Khand and organic Khand claims actually mean →</Link></p><p><strong>ZUCERO — THE GOOD SUGAR</strong></p><p className="note">Zucero products contain sugar. Traditional processing does not make them sugar-free or a treatment for health conditions.</p>
  </ContentPage>;
}

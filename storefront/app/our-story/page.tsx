import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return <ContentPage eyebrow="The reason behind Zucero" title="Good marketing begins with an honest product." intro="Zucero was created to bring clarity, character, and care back to everyday Indian sweetness.">
    <h2>Why Zucero exists</h2><p>Food marketing often asks people to choose between pleasure and purity, then hides the important details in fine print. Zucero takes a simpler position: sugar remains sugar, but its source, process, flavour, and transparency still matter.</p>
    <h2>A marketer’s point of view</h2><p>Founder Tamanna built her career understanding how brands earn attention. Zucero began with a different question: what would a sugar brand look like if it worked as hard to earn trust? The answer is clear ingredients, specific claims, visible batch information, and a product experience designed with restraint.</p>
    <h2>Nature perfected sweetness</h2><p>We begin with sugarcane and respect traditional Indian formats such as desi khand and dhage wali mishri. Our role is not to overstate them. It is to source thoughtfully, make carefully, pack securely, and explain honestly.</p>
  </ContentPage>;
}

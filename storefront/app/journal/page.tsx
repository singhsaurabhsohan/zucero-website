import Image from "next/image";
import { StoreHeader } from "@/components/store-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "The Journal", description: "Notes on everyday rituals and traditional Indian sweetness." };
export default function Journal() {
  return <main className="store-page"><StoreHeader /><header className="content-hero"><p className="eyebrow">Zucero Journal</p><h1>Stories worth<br />slowing down for.</h1><p>Notes on taste, craft and the small rituals of everyday life.</p></header><div className="content-shell journal-articles">
    <article id="morning-tea"><Image src="/images/slow_sweetness.webp" alt="A quiet morning tea ritual" width={920} height={600} /><p className="eyebrow">Rituals</p><h2>The Ritual of Morning Tea</h2><p>Before the messages and the rush, there is the kettle. A cup of tea creates a small space between waking and doing. The water warms, the leaves open, and the kitchen begins to feel like the start of a day.</p><p>Sweeten thoughtfully. A little khand brings its own character; a mishri crystal invites you to wait as it dissolves. Taste before adding more. The ritual is not about how much sweetness you use, but the attention you give to an ordinary moment.</p><p>Keep your favourite cup close. Leave the phone aside for a minute. Let the first sip be enough.</p></article>
    <article id="the-craft"><Image src="/images/journal_editorial.webp" alt="An editorial view of traditional sweetness" width={920} height={600} /><p className="eyebrow">Heritage</p><h2>The Hands Behind the Craft</h2><p>Traditional ingredients carry more than a name. They carry a way of noticing: the texture of a crystal, the colour of a batch, the point at which an ingredient tastes ready.</p><p>At Zucero, the story of craft begins with questions. What went into this product? How was it made? How should it be stored and enjoyed? Clear answers matter more than grand promises.</p><p>Our journal is a place for that curiosity. As the brand grows, we look forward to sharing documented stories from the people and processes behind the collection.</p></article>
  </div><SiteFooter /></main>;
}

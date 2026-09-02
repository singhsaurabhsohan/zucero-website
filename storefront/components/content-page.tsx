import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { StoreHeader } from "@/components/store-header";

export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main className="store-page">
    <StoreHeader />
    <header className="content-hero"><p className="eyebrow gold">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header>
    <article className="content-shell">{children}</article>
    <SiteFooter />
  </main>;
}

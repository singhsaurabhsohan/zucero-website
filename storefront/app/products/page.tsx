import type { Metadata } from "next";
import { CollectionSection } from "@/components/heritage-sections";
import { SiteFooter } from "@/components/site-footer";
import { StoreHeader } from "@/components/store-header";

export const metadata: Metadata = {
  title: "The Collection",
  description: "Explore Zucero Desi Khand and Dhage Wali Mishri, thoughtfully made from sugarcane using traditional craft.",
};

export default function ProductsPage() {
  return <main className="store-page collection-page">
    <StoreHeader />
    <CollectionSection />
    <SiteFooter />
  </main>;
}

import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { BackToTop } from "@/components/back-to-top";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Zucero — The Good Sugar", template: "%s | Zucero" },
  description: "Thoughtfully made Indian sugar, preserving sweetness the way nature intended.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Zucero — The Good Sugar",
    title: "Zucero — The Good Sugar",
    description: "Thoughtfully made Indian sugar, preserving sweetness the way nature intended.",
    images: [{ url: "/images/hero-cinematic-poster.png", alt: "Zucero — The Good Sugar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zucero — The Good Sugar",
    description: "Thoughtfully made Indian sugar, preserving sweetness the way nature intended.",
    images: ["/images/hero-cinematic-poster.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/zucero-favicon.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider>{children}<BackToTop /><a href={whatsappLink()} className="whatsapp-contact" aria-label="Chat with Zucero on WhatsApp at +91 87963 49977"><MessageCircle size={24} /><span>WhatsApp</span></a></CartProvider></body></html>;
}

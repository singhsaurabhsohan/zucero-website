import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { BackToTop } from "@/components/back-to-top";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thegoodsugar.in"),
  title: { default: "Zucero — The Good Sugar", template: "%s | Zucero" },
  description: "Thoughtfully made Indian sugar, preserving sweetness the way nature intended.",
  icons: { icon: "/images/zucero-favicon.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider>{children}<BackToTop /><aside aria-label="WhatsApp contact"><a href={whatsappLink()} className="whatsapp-contact" aria-label="Chat with Zucero on WhatsApp at +91 87963 49977"><MessageCircle size={24} /><span>WhatsApp</span></a></aside></CartProvider></body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: { default: "Zucero — The Good Sugar", template: "%s | Zucero" },
  description: "Thoughtfully made Indian sugar, preserving sweetness the way nature intended.",
  icons: { icon: "/images/zucero-favicon.webp" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider>{children}</CartProvider></body></html>;
}

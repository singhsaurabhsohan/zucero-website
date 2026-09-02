import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <ContentPage eyebrow="Store terms" title="Terms of use and sale" intro="By using the Zucero storefront or placing an order, you agree to these terms and the policies linked here.">
    <h2>Products and information</h2><p>We aim to present ingredients, pack sizes, prices, images, and availability accurately. Natural products can show reasonable variation. Product information is not medical advice and our products are not sugar-free.</p>
    <h2>Orders</h2><p>An order is accepted after successful payment and confirmation. We may cancel and refund an order if a product is unavailable, pricing is clearly erroneous, delivery is not serviceable, or fraud checks require it.</p>
    <h2>Prices and tax</h2><p>Final prices, applicable GST, and shipping are displayed before payment using the delivery address. Browser location may provide an estimate but does not replace the checkout address.</p>
    <h2>Accounts</h2><p>You are responsible for access to your email account and for providing accurate information. Do not misuse the website, interfere with security, or attempt unauthorised access.</p>
    <h2>Related policies</h2><p>Our <Link href="/privacy">privacy</Link>, <Link href="/shipping">shipping</Link>, <Link href="/returns">returns</Link>, and <Link href="/refunds">refund</Link> policies form part of these terms.</p>
  </ContentPage>;
}

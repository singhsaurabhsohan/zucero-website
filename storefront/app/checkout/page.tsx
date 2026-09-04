"use client";

import Link from "next/link";
import { useState } from "react";
import { StoreHeader } from "@/components/store-header";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { SiteFooter } from "@/components/site-footer";
import { whatsappOrder } from "@/lib/whatsapp";
import { VerifiedPurchaseLink } from "@/components/verified-purchase-link";

export default function CheckoutPage() {
  const { lines, subtotalPaise } = useCart();
  const [email, setEmail] = useState("");

  if (!lines.length) return <main className="store-page"><StoreHeader /><section className="empty-cart"><h1>Your bag is empty.</h1><Link className="button button-dark" href="/#products">Shop products</Link></section><SiteFooter /></main>;

  return <main className="store-page checkout-page"><StoreHeader /><section className="checkout-layout">
    <div className="checkout-form">
      <div className="checkout-heading"><p className="eyebrow">Secure purchase journey</p><h1>Continue your order on WhatsApp.</h1><p>Verify your email, then we’ll open a pre-filled WhatsApp message with your selected products. Our team will confirm delivery address, shipping, taxes and payment with you directly.</p></div>
      <fieldset><legend>Contact</legend><div className="field-grid"><label className="wide"><span>Email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label></div></fieldset>
      <p className="note">Your address is not collected on this page. You’ll share delivery details directly with the Zucero team on WhatsApp after email verification.</p>
      <VerifiedPurchaseLink className="button button-dark checkout-button" href={whatsappOrder(lines)} defaultEmail={email}>Verify email &amp; continue on WhatsApp</VerifiedPurchaseLink>
    </div>
    <aside className="checkout-summary"><p className="eyebrow">Your order</p>{lines.map((line) => <div className="checkout-line" key={line.variantId}><span>{line.productName} · {line.variantLabel} × {line.quantity}</span><strong>{formatPrice(line.pricePaise * line.quantity)}</strong></div>)}<div className="checkout-total"><span>Product subtotal</span><strong>{formatPrice(subtotalPaise)}</strong></div><p>Shipping, applicable taxes and payment are confirmed with our team on WhatsApp.</p></aside>
  </section><SiteFooter /></main>;
}

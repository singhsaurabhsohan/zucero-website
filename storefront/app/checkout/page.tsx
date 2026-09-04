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
    <form className="checkout-form">
      <div className="checkout-heading"><p className="eyebrow">Secure checkout</p><h1>Where should we send it?</h1><p>You may check out as a guest. Create an account afterward to save the address and track future orders.</p></div>
      <fieldset><legend>Contact</legend><div className="field-grid"><label className="wide"><span>Email</span><input required type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} /></label><label><span>First name</span><input required autoComplete="given-name" /></label><label><span>Last name</span><input required autoComplete="family-name" /></label><label className="wide"><span>Mobile number</span><input required inputMode="tel" autoComplete="tel" /></label></div></fieldset>
      <fieldset><legend>Delivery address</legend><div className="field-grid"><label className="wide"><span>Address</span><input required autoComplete="address-line1" /></label><label className="wide"><span>Apartment, suite, etc. (optional)</span><input autoComplete="address-line2" /></label><label><span>PIN code</span><input required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" /></label><label><span>City</span><input required autoComplete="address-level2" /></label><label><span>State</span><input required autoComplete="address-level1" /></label><label><span>Country</span><input value="India" readOnly /></label></div></fieldset>
      <p className="note">Orders are currently completed on WhatsApp. Only your product selection is included in the chat; confirm your address and payment directly with our team. Deliveries begin 14 September.</p>
      <VerifiedPurchaseLink className="button button-dark checkout-button" href={whatsappOrder(lines)} defaultEmail={email}>Verify email &amp; continue on WhatsApp</VerifiedPurchaseLink>
    </form>
    <aside className="checkout-summary"><p className="eyebrow">Your order</p>{lines.map((line) => <div className="checkout-line" key={line.variantId}><span>{line.productName} · {line.variantLabel} × {line.quantity}</span><strong>{formatPrice(line.pricePaise * line.quantity)}</strong></div>)}<div className="checkout-total"><span>Current subtotal</span><strong>{formatPrice(subtotalPaise)}</strong></div><p>Final tax and live Shiprocket shipping will appear after a valid PIN code.</p></aside>
  </section><SiteFooter /></main>;
}

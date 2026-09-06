"use client";

import Link from "next/link";
import { useState } from "react";
import { StoreHeader } from "@/components/store-header";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { SiteFooter } from "@/components/site-footer";
import { whatsappOrder } from "@/lib/whatsapp";
import { VerifiedPurchaseLink } from "@/components/verified-purchase-link";
import type { CustomerDetails } from "@/lib/customer-details";
import { emptyCustomerDetails } from "@/lib/customer-details";

export default function CheckoutPage() {
  const { lines, subtotalPaise } = useCart();
  const [details, setDetails] = useState<CustomerDetails>(emptyCustomerDetails);
  function update(field: keyof CustomerDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }
  if (!lines.length) return <main className="store-page"><StoreHeader /><section className="empty-cart"><h1>Your bag is empty.</h1><Link className="button button-dark" href="/products">Shop products</Link></section><SiteFooter /></main>;
  return <main className="store-page checkout-page"><StoreHeader /><section className="checkout-layout">
    <form className="checkout-form">
      <div className="checkout-heading"><p className="eyebrow">Secure checkout</p><h1>Where should we send it?</h1><p>You may check out as a guest. Create an account afterward to save the address and track future orders.</p></div>
      <fieldset><legend>Contact</legend><div className="field-grid"><label className="wide"><span>Email</span><input required type="email" autoComplete="email" value={details.email} onChange={event => update("email", event.target.value)} /></label><label className="wide"><span>Full name</span><input required autoComplete="name" value={details.fullName} onChange={event => update("fullName", event.target.value)} /></label><label className="wide"><span>Mobile number</span><input required inputMode="tel" autoComplete="tel" value={details.phone} onChange={event => update("phone", event.target.value)} /></label></div></fieldset>
      <fieldset><legend>Delivery address</legend><div className="field-grid"><label className="wide"><span>Address</span><input required autoComplete="address-line1" value={details.addressLine1} onChange={event => update("addressLine1", event.target.value)} /></label><label className="wide"><span>Apartment, suite, etc. (optional)</span><input autoComplete="address-line2" value={details.addressLine2} onChange={event => update("addressLine2", event.target.value)} /></label><label><span>PIN code</span><input required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" value={details.postalCode} onChange={event => update("postalCode", event.target.value.replace(/\D/g, "").slice(0, 6))} /></label><label><span>City</span><input required autoComplete="address-level2" value={details.city} onChange={event => update("city", event.target.value)} /></label><label><span>State</span><input required autoComplete="address-level1" value={details.state} onChange={event => update("state", event.target.value)} /></label><label><span>Country</span><input value={details.country} onChange={event => update("country", event.target.value)} /></label></div></fieldset>
      <p className="note">Your verified contact, delivery address and product selection are securely saved before WhatsApp opens. Our team will confirm payment, tax and shipping in the chat. Deliveries begin 14 September.</p>
      <VerifiedPurchaseLink className="button button-dark checkout-button" href={whatsappOrder(lines)} lines={lines} defaultDetails={details}>Review details, verify email &amp; continue</VerifiedPurchaseLink>
    </form>
    <aside className="checkout-summary"><p className="eyebrow">Your order</p>{lines.map((line) => <div className="checkout-line" key={line.variantId}><span>{line.productName} · {line.variantLabel} × {line.quantity}</span><strong>{formatPrice(line.pricePaise * line.quantity)}</strong></div>)}<div className="checkout-total"><span>Current subtotal</span><strong>{formatPrice(subtotalPaise)}</strong></div><p>Final tax and live Shiprocket shipping will appear after a valid PIN code.</p></aside>
  </section><SiteFooter /></main>;
}

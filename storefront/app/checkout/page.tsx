"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { StoreHeader } from "@/components/store-header";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { SiteFooter } from "@/components/site-footer";
import type { CustomerDetails } from "@/lib/customer-details";
import { emptyCustomerDetails } from "@/lib/customer-details";
import { INDIAN_STATES } from "@/lib/india";
import { calculateCheckoutTotal } from "@/lib/tax";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  handler: (response: RazorpayResponse) => void | Promise<void>;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { lines, subtotalPaise, clear } = useCart();
  const [details, setDetails] = useState<CustomerDetails>(emptyCustomerDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState<{ orderNumber: string; captured: boolean } | null>(null);
  const quote = useMemo(() => details.state ? calculateCheckoutTotal(subtotalPaise, details.state) : null, [details.state, subtotalPaise]);

  function update(field: keyof CustomerDetails, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const orderResponse = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: { ...details, country: "India" },
          lines: lines.map((line) => ({ variantId: line.variantId, quantity: line.quantity })),
        }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.error ?? "Could not prepare checkout.");

      const scriptReady = await loadRazorpay();
      if (!scriptReady || !window.Razorpay) throw new Error("Secure payment window could not load. Please try again.");

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amountPaise,
        currency: "INR",
        name: "Zucero",
        description: `Order ${order.orderNumber}`,
        order_id: order.razorpayOrderId,
        prefill: { name: details.fullName, email: details.email, contact: details.phone },
        handler: async (payment: RazorpayResponse) => {
          try {
            const verification = await fetch("/api/payments/razorpay/verify", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                localOrderId: order.localOrderId,
                razorpayOrderId: payment.razorpay_order_id,
                razorpayPaymentId: payment.razorpay_payment_id,
                razorpaySignature: payment.razorpay_signature,
              }),
            });
            const result = await verification.json();
            if (!verification.ok && verification.status !== 202) throw new Error(result.error ?? "Payment confirmation failed.");
            clear();
            setCompleted({ orderNumber: result.orderNumber ?? order.orderNumber, captured: result.captured !== false });
          } catch (verificationError) {
            setError(verificationError instanceof Error ? verificationError.message : "Payment confirmation failed. Please contact us with your payment ID.");
          } finally {
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      checkout.open();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Checkout is temporarily unavailable.");
      setLoading(false);
    }
  }

  if (completed) {
    return <main className="store-page"><StoreHeader /><section className="empty-cart"><p className="eyebrow">Order received</p><h1>{completed.captured ? "Payment successful." : "Payment received."}</h1><p>Order <strong>{completed.orderNumber}</strong> has been recorded. {completed.captured ? "Your order is being sent to our fulfilment system automatically." : "We are waiting for final payment capture confirmation."}</p><Link className="button button-dark" href="/products">Continue shopping</Link></section><SiteFooter /></main>;
  }

  if (!lines.length) return <main className="store-page"><StoreHeader /><section className="empty-cart"><h1>Your bag is empty.</h1><Link className="button button-dark" href="/products">Shop products</Link></section><SiteFooter /></main>;

  return <main className="store-page checkout-page"><StoreHeader /><section className="checkout-layout">
    <form className="checkout-form" onSubmit={submit}>
      <div className="checkout-heading"><p className="eyebrow">Secure checkout</p><h1>Where should we send it?</h1><p>Enter your India delivery address. GST and shipping update automatically before Razorpay opens.</p></div>
      <fieldset><legend>Contact</legend><div className="field-grid"><label className="wide"><span>Email</span><input required type="email" autoComplete="email" value={details.email} onChange={event => update("email", event.target.value)} /></label><label className="wide"><span>Full name</span><input required autoComplete="name" value={details.fullName} onChange={event => update("fullName", event.target.value)} /></label><label className="wide"><span>Mobile number</span><input required inputMode="tel" autoComplete="tel" value={details.phone} onChange={event => update("phone", event.target.value)} /></label></div></fieldset>
      <fieldset><legend>Delivery address</legend><div className="field-grid"><label className="wide"><span>Address</span><input required autoComplete="address-line1" value={details.addressLine1} onChange={event => update("addressLine1", event.target.value)} /></label><label className="wide"><span>Apartment, suite, etc. (optional)</span><input autoComplete="address-line2" value={details.addressLine2} onChange={event => update("addressLine2", event.target.value)} /></label><label><span>PIN code</span><input required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" value={details.postalCode} onChange={event => update("postalCode", event.target.value.replace(/\D/g, "").slice(0, 6))} /></label><label><span>City</span><input required autoComplete="address-level2" value={details.city} onChange={event => update("city", event.target.value)} /></label><label><span>State / UT</span><select required autoComplete="address-level1" value={details.state} onChange={event => update("state", event.target.value)}><option value="">Select state</option>{INDIAN_STATES.map((state) => <option value={state} key={state}>{state}</option>)}</select></label><label><span>Country</span><input value="India" readOnly /></label></div></fieldset>
      <p className="note">Shipping is ₹79 within Haryana, ₹129 to the rest of India, and free on product subtotals of ₹1,499 or more. We verify courier serviceability with Shiprocket before payment.</p>
      {error && <p className="form-message">{error}</p>}
      <button className="button button-dark checkout-button" type="submit" disabled={loading || !details.state || details.postalCode.length !== 6}>{loading ? "Preparing secure payment…" : quote ? `Pay ${formatPrice(quote.totalPaise)} securely` : "Enter address to calculate total"}</button>
    </form>
    <aside className="checkout-summary"><p className="eyebrow">Your order</p>{lines.map((line) => <div className="checkout-line" key={line.variantId}><span>{line.productName} · {line.variantLabel} × {line.quantity}</span><strong>{formatPrice(line.pricePaise * line.quantity)}</strong></div>)}<div className="checkout-line"><span>Product subtotal</span><strong>{formatPrice(subtotalPaise)}</strong></div>{quote ? <><div className="checkout-line"><span>Shipping</span><strong>{quote.shippingPaise === 0 ? "Free" : formatPrice(quote.shippingPaise)}</strong></div>{quote.mode === "CGST_SGST" ? <><div className="checkout-line"><span>CGST @ 2.5%</span><strong>{formatPrice(quote.cgstPaise)}</strong></div><div className="checkout-line"><span>SGST @ 2.5%</span><strong>{formatPrice(quote.sgstPaise)}</strong></div></> : <div className="checkout-line"><span>IGST @ 5%</span><strong>{formatPrice(quote.igstPaise)}</strong></div>}<div className="checkout-total"><span>Total payable</span><strong>{formatPrice(quote.totalPaise)}</strong></div></> : <p>Select your delivery state to calculate GST and shipping.</p>}</aside>
  </section><SiteFooter /></main>;
}

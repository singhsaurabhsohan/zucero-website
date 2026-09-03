"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Leaf, PackageCheck, Coffee, ShieldCheck, Truck } from "lucide-react";
import { whatsappOrder } from "@/lib/whatsapp";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

export function ProductPurchase({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const [postalCode, setPostalCode] = useState("");
  const [shippingMessage, setShippingMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const variant = product.variants.find((item) => item.id === variantId)!;
  const readyForSale = variant.pricePaise !== null;
  const isKhand = product.slug === "desi-khand";

  const buyLink = whatsappOrder([{ productName: product.name, variantLabel: variant.label, quantity }]);
  function addToBag() {
    if (variant.pricePaise === null) return;
    add({ variantId: variant.id, productSlug: product.slug, productName: product.name, variantLabel: variant.label, sku: variant.sku, image: product.image, pricePaise: variant.pricePaise }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  async function checkDelivery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setShippingMessage("");
    try {
      const response = await fetch("/api/shipping/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postalCode, weightGrams: variant.weightGrams * quantity }) });
      const data = await response.json();
      if (!response.ok || !data.configured) throw new Error("unavailable");
      const couriers = data.result?.data?.available_courier_companies;
      setShippingMessage(Array.isArray(couriers) && couriers.length > 0 ? "Delivery options are available for this PIN code. Final shipping charges are confirmed at checkout." : "No delivery option was returned for this PIN code. Please contact us for help.");
    } catch { setShippingMessage("We couldn’t confirm delivery right now. Please try again or contact us before ordering."); }
    finally { setChecking(false); }
  }

  return <div className="purchase-panel">
    <p className="eyebrow">{product.eyebrow}</p>
    <h1>{product.name}</h1>
    <p className="product-description">{product.description}</p>
    {isKhand ? <aside className="featured-prebook-offer"><span>Limited pre-launch offer - 490 g</span><strong>₹399* <small>for 490 g</small></strong><p><Truck aria-hidden="true" /> Free delivery for pre-book orders</p></aside> : <><p className="product-price">{formatPrice(variant.pricePaise)}</p><p className="prelaunch-price-label">Limited pre-launch offer · {variant.label}</p><aside className="prelaunch-card"><span className="eyebrow">Before the world tastes it.</span><p>A limited window to experience The Good Sugar before its official launch.</p><strong>14 September</strong><small>Deliveries begin 14 September · Order through WhatsApp.</small></aside></>}
    <p className="pdp-tax-note">Our team will confirm taxes, shipping and payment on WhatsApp.</p>
    <a className="pdp-review-link" href="#product-reviews">No reviews yet — a new beginning</a>
    <div className="pdp-benefits"><span><Leaf />Cane sweetness</span><span><Coffee />Everyday rituals</span><span><PackageCheck />Carefully packed</span><span><ShieldCheck />Clear ingredients</span></div>
    <div className="purchase-block"><span>Selected size: {variant.label}</span><div className="variant-row pdp-sizes">{product.variants.map((item) => <button key={item.id} aria-pressed={variantId === item.id} className={variantId === item.id ? "active" : ""} onClick={() => { setVariantId(item.id); setShippingMessage(""); }}><strong>{item.label}</strong><small>{formatPrice(item.pricePaise)}</small></button>)}</div></div>
    <div className="purchase-actions">
      <div className="quantity-picker" aria-label="Quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity"><Plus size={16} /></button></div>
      <button className="button button-dark add-button" disabled={!readyForSale} onClick={() => addToBag()}>{added ? <><Check size={17} /> Added</> : <><ShoppingBag size={17} /> {readyForSale ? "Add to cart" : "Awaiting launch price"}</>}</button>
    </div>
    <a className="button button-gold pdp-buy-now" href={buyLink}>Buy on WhatsApp</a>
    <p className="pdp-tax-note">Opens a prefilled chat. Your order is confirmed by our team on WhatsApp.</p>
    {!readyForSale && <p className="pdp-tax-note">Ordering opens once the final launch prices are confirmed.</p>}
    <form className="pdp-delivery" onSubmit={checkDelivery}><label htmlFor="delivery-pin"><Truck size={18} /> Check delivery availability</label><div><input id="delivery-pin" value={postalCode} onChange={e => { setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setShippingMessage(""); }} inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" minLength={6} maxLength={6} placeholder="Enter 6-digit PIN code" required /><button type="submit" disabled={checking}>{checking ? "Checking…" : "Check"}</button></div><p role="status">{shippingMessage}</p></form>
    <div className="pdp-sticky-buy"><span>{product.name}<small>{variant.label} · {formatPrice(variant.pricePaise)}</small></span><a className="button button-dark" href={buyLink}>Buy on WhatsApp</a></div>
  </div>;
}

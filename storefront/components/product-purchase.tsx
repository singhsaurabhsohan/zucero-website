"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

export function ProductPurchase({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const variant = product.variants.find((item) => item.id === variantId)!;
  const readyForSale = variant.pricePaise !== null;

  function addToBag() {
    if (variant.pricePaise === null) return;
    add({ variantId: variant.id, productSlug: product.slug, productName: product.name, variantLabel: variant.label, sku: variant.sku, image: product.image, pricePaise: variant.pricePaise }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return <div className="purchase-panel">
    <p className="eyebrow">{product.eyebrow}</p>
    <h1>{product.name}</h1>
    <p className="product-description">{product.description}</p>
    <p className="product-price">{formatPrice(variant.pricePaise)}</p>
    <div className="purchase-block"><span>Choose size</span><div className="variant-row">{product.variants.map((item) => <button key={item.id} className={variantId === item.id ? "active" : ""} onClick={() => setVariantId(item.id)}>{item.label}</button>)}</div></div>
    <div className="purchase-actions">
      <div className="quantity-picker" aria-label="Quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(10, quantity + 1))} aria-label="Increase quantity"><Plus size={16} /></button></div>
      <button className="button button-dark add-button" disabled={!readyForSale} onClick={addToBag}>{added ? <><Check size={17} /> Added</> : <><ShoppingBag size={17} /> {readyForSale ? "Add to bag" : "Awaiting launch price"}</>}</button>
    </div>
    <ul className="purchase-assurances"><li><Check /> Taxes calculated from delivery state</li><li><Check /> Shipping quoted from your PIN code</li><li><Check /> Secure online payment at checkout</li></ul>
  </div>;
}

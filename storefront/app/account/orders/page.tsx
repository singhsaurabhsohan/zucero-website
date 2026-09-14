"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StoreHeader } from "@/components/store-header";
import { SiteFooter } from "@/components/site-footer";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase-browser";
import { formatPrice } from "@/lib/catalog";

type OrderItem = { sku: string; product_name: string; variant_label: string; quantity: number; line_total_paise: number };
type Order = {
  id: string;
  order_number: string;
  display_status: string;
  payment_status: string;
  subtotal_paise: number;
  tax_paise: number;
  shipping_paise: number;
  total_paise: number;
  tracking_awb: string | null;
  courier_name: string | null;
  tracking_url: string | null;
  shipping_address: { fullName?: string; addressLine1?: string; addressLine2?: string; city?: string; state?: string; postalCode?: string } | null;
  created_at: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const router = useRouter();
  const client = useMemo(() => isSupabaseConfigured() ? createSupabaseBrowserClient() : null, []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      if (!client) { setError("Account services are temporarily unavailable."); setLoading(false); return; }
      const { data } = await client.auth.getUser();
      if (!data.user) { router.replace("/account"); return; }
      if (!active) return;
      setEmail(data.user.email ?? "");
      const response = await fetch("/api/account/orders", { cache: "no-store" });
      const payload = await response.json();
      if (!active) return;
      if (!response.ok) setError(payload.error ?? "Could not load your orders.");
      else setOrders(payload.orders ?? []);
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, [client, router]);

  async function signOut() {
    if (client) await client.auth.signOut();
    router.replace("/account");
  }

  return <main className="store-page"><StoreHeader /><section className="orders-shell"><div className="orders-heading"><div><p className="eyebrow">Order history</p><h1>Your orders</h1>{email && <p className="orders-email">Signed in as {email}</p>}</div><button className="otp-change" type="button" onClick={signOut}>Sign out</button></div>{loading ? <div className="empty-orders"><h2>Loading your orders…</h2></div> : error ? <div className="empty-orders"><h2>We couldn’t load your orders.</h2><p>{error}</p><button className="button button-dark" type="button" onClick={() => window.location.reload()}>Try again</button></div> : !orders.length ? <div className="empty-orders"><h2>No orders to show yet.</h2><p>Orders placed with <strong>{email}</strong> will appear here automatically.</p><Link className="button button-dark" href="/products">Explore products</Link></div> : <div className="account-orders-list">{orders.map((order) => <article className="account-order-card" key={order.id}><div className="account-order-head"><div><p className="eyebrow">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p><h2>{order.order_number}</h2></div><span className={`order-status order-status-${order.display_status.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{order.display_status}</span></div><div className="account-order-items">{order.items.map((item) => <div key={`${order.id}-${item.sku}`}><span>{item.product_name} · {item.variant_label} × {item.quantity}</span><strong>{formatPrice(item.line_total_paise)}</strong></div>)}</div><div className="account-order-money"><span>Shipping <strong>{order.shipping_paise ? formatPrice(order.shipping_paise) : "Free"}</strong></span><span>GST <strong>{formatPrice(order.tax_paise)}</strong></span><span>Total <strong>{formatPrice(order.total_paise)}</strong></span></div><div className="account-order-tracking"><p><strong>Payment:</strong> {order.payment_status === "captured" ? "Paid" : order.payment_status}</p>{order.tracking_awb ? <><p><strong>Courier:</strong> {order.courier_name || "Assigned"}</p><p><strong>AWB:</strong> {order.tracking_awb}</p>{order.tracking_url && <a className="button button-dark" href={order.tracking_url} target="_blank" rel="noreferrer">Track shipment</a>}</> : <p><strong>Delivery:</strong> Your order is being prepared. Tracking will appear after courier assignment.</p>}</div></article>)}</div>}</section><SiteFooter /></main>;
}

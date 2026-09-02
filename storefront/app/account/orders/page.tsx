import Link from "next/link";
import { StoreHeader } from "@/components/store-header";

export default function OrdersPage() {
  return <main className="store-page"><StoreHeader /><section className="orders-shell"><p className="eyebrow">Order history</p><h1>Your orders</h1><div className="empty-orders"><h2>No orders to show yet.</h2><p>Paid orders and Shiprocket tracking updates will appear here.</p><Link className="button button-dark" href="/#products">Explore products</Link></div></section></main>;
}

import { supabaseAdmin } from "@/lib/supabase-admin";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.thegoodsugar.in";
const DEFAULT_MERCHANT_EMAIL = "zucero.thegoodsugar@gmail.com";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(paise: number | null | undefined) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format((paise ?? 0) / 100);
}

async function sendEmail(input: { to: string; subject: string; html: string; text: string }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn("Email notification skipped: SendGrid is not configured");
    return false;
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: input.to }] }],
      from: { email: from, name: "Zucero" },
      subject: input.subject,
      content: [
        { type: "text/plain", value: input.text },
        { type: "text/html", value: input.html },
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`SendGrid email failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
  return true;
}

async function once(key: string, eventType: string, payload: Record<string, unknown>, send: () => Promise<boolean>) {
  const db = supabaseAdmin();
  const { error } = await db.from("payment_events").insert({
    provider: "internal",
    provider_event_id: key,
    event_type: eventType,
    payload,
    processed_at: new Date().toISOString(),
  });

  if (error) {
    if (error.code === "23505") return false;
    throw new Error(`Could not reserve notification event: ${error.message}`);
  }

  try {
    const sent = await send();
    if (!sent) {
      await db.from("payment_events").delete().eq("provider", "internal").eq("provider_event_id", key);
    }
    return sent;
  } catch (error) {
    await db.from("payment_events").delete().eq("provider", "internal").eq("provider_event_id", key);
    throw error;
  }
}

async function orderSnapshot(orderId: string) {
  const db = supabaseAdmin();
  const { data: order, error } = await db.from("orders").select("*").eq("id", orderId).single();
  if (error || !order) throw new Error("Order not found for notification");
  const { data: items } = await db.from("order_items").select("*").eq("order_id", orderId);
  return { order, items: items ?? [] };
}

function itemsHtml(items: any[]) {
  return items.map((item) => `<tr><td style="padding:8px 0">${escapeHtml(item.product_name)} · ${escapeHtml(item.variant_label)} × ${escapeHtml(item.quantity)}</td><td style="padding:8px 0;text-align:right">${escapeHtml(money(item.line_total_paise))}</td></tr>`).join("");
}

function itemsText(items: any[]) {
  return items.map((item) => `${item.product_name} · ${item.variant_label} × ${item.quantity} — ${money(item.line_total_paise)}`).join("\n");
}

export async function notifyPaidOrder(orderId: string) {
  const { order, items } = await orderSnapshot(orderId);
  const address = (order.shipping_address ?? {}) as Record<string, string>;
  const merchantEmail = process.env.ORDER_NOTIFICATION_EMAIL?.trim() || DEFAULT_MERCHANT_EMAIL;
  const accountUrl = `${SITE_URL}/account/orders`;

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#10271d">
      <h1 style="font-family:Georgia,serif;font-weight:500">Your Zucero order is confirmed.</h1>
      <p>Thank you, ${escapeHtml(address.fullName || "there")}. We have received your payment for order <strong>${escapeHtml(order.order_number)}</strong>.</p>
      <table style="width:100%;border-collapse:collapse">${itemsHtml(items)}</table>
      <hr style="border:0;border-top:1px solid #ddd;margin:20px 0" />
      <p>Subtotal: <strong>${escapeHtml(money(order.subtotal_paise))}</strong><br/>Shipping: <strong>${escapeHtml(order.shipping_paise ? money(order.shipping_paise) : "Free")}</strong><br/>GST: <strong>${escapeHtml(money(order.tax_paise))}</strong><br/>Total paid: <strong>${escapeHtml(money(order.total_paise))}</strong></p>
      <p>We’ll email you again when the shipment status changes. You can also sign in with this email address to see your orders and tracking.</p>
      <p><a href="${accountUrl}" style="display:inline-block;padding:12px 18px;background:#10271d;color:white;text-decoration:none">View your orders</a></p>
    </div>`;
  const customerText = `Your Zucero order ${order.order_number} is confirmed.\n\n${itemsText(items)}\n\nSubtotal: ${money(order.subtotal_paise)}\nShipping: ${order.shipping_paise ? money(order.shipping_paise) : "Free"}\nGST: ${money(order.tax_paise)}\nTotal paid: ${money(order.total_paise)}\n\nView orders: ${accountUrl}`;

  const merchantHtml = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#10271d">
      <h1>New paid Zucero order</h1>
      <p><strong>${escapeHtml(order.order_number)}</strong> · ${escapeHtml(money(order.total_paise))}</p>
      <table style="width:100%;border-collapse:collapse">${itemsHtml(items)}</table>
      <p><strong>Customer</strong><br/>${escapeHtml(address.fullName)}<br/>${escapeHtml(order.customer_email)}<br/>${escapeHtml(order.customer_phone)}</p>
      <p><strong>Delivery</strong><br/>${escapeHtml(address.addressLine1)} ${escapeHtml(address.addressLine2)}<br/>${escapeHtml(address.city)}, ${escapeHtml(address.state)} ${escapeHtml(address.postalCode)}</p>
      <p>Razorpay payment: ${escapeHtml(order.razorpay_payment_id || "captured")}<br/>Shiprocket order: ${escapeHtml(order.shiprocket_order_id || "being created")}</p>
    </div>`;
  const merchantText = `New paid Zucero order ${order.order_number}\nTotal: ${money(order.total_paise)}\nCustomer: ${address.fullName} · ${order.customer_email} · ${order.customer_phone}\n${itemsText(items)}\nShiprocket: ${order.shiprocket_order_id || "being created"}`;

  const results = await Promise.allSettled([
    once(`paid-customer:${order.id}`, "order.confirmed.customer", { order_id: order.id }, () => sendEmail({ to: order.customer_email, subject: `Order confirmed · ${order.order_number}`, html: customerHtml, text: customerText })),
    once(`paid-merchant:${order.id}`, "order.confirmed.merchant", { order_id: order.id }, () => sendEmail({ to: merchantEmail, subject: `New paid order · ${order.order_number}`, html: merchantHtml, text: merchantText })),
  ]);
  results.forEach((result) => { if (result.status === "rejected") console.error("Order email notification failed", result.reason); });
}

export async function notifyShipmentStatus(orderId: string, status: string) {
  const { order } = await orderSnapshot(orderId);
  const normalized = status.trim() || "Shipment updated";
  const merchantEmail = process.env.ORDER_NOTIFICATION_EMAIL?.trim() || DEFAULT_MERCHANT_EMAIL;
  const trackingLine = order.tracking_awb ? `AWB ${order.tracking_awb}${order.courier_name ? ` · ${order.courier_name}` : ""}` : "Tracking details will be available shortly.";
  const accountUrl = `${SITE_URL}/account/orders`;
  const keyStatus = normalized.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80);

  const customerHtml = `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#10271d"><h1 style="font-family:Georgia,serif;font-weight:500">Your order is ${escapeHtml(normalized)}.</h1><p>Order <strong>${escapeHtml(order.order_number)}</strong> has a new delivery update.</p><p>${escapeHtml(trackingLine)}</p><p><a href="${accountUrl}" style="display:inline-block;padding:12px 18px;background:#10271d;color:white;text-decoration:none">Track your order</a></p></div>`;
  const customerText = `Order ${order.order_number}: ${normalized}\n${trackingLine}\nTrack: ${accountUrl}`;
  const merchantText = `Shipment update for ${order.order_number}: ${normalized}\n${trackingLine}`;

  const results = await Promise.allSettled([
    once(`shipment-customer:${order.id}:${keyStatus}`, "shipment.status.customer", { order_id: order.id, status: normalized }, () => sendEmail({ to: order.customer_email, subject: `${normalized} · ${order.order_number}`, html: customerHtml, text: customerText })),
    once(`shipment-merchant:${order.id}:${keyStatus}`, "shipment.status.merchant", { order_id: order.id, status: normalized }, () => sendEmail({ to: merchantEmail, subject: `Shipment update · ${order.order_number}`, html: `<p>${escapeHtml(merchantText)}</p>`, text: merchantText })),
  ]);
  results.forEach((result) => { if (result.status === "rejected") console.error("Shipment email notification failed", result.reason); });
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyShipmentStatus } from "@/lib/notifications";

function text(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value).trim() : "";
}

function normalizeStatus(value: string) {
  const status = value.toLowerCase();
  if (status.includes("delivered")) return "delivered";
  if (status.includes("out for delivery") || status.includes("out_for_delivery")) return "out_for_delivery";
  if (status.includes("rto") || status.includes("return")) return "rto";
  if (status.includes("cancel")) return "cancelled";
  if (status.includes("undelivered") || status.includes("exception") || status.includes("ndr")) return "delivery_exception";
  if (status.includes("shipped") || status.includes("in transit") || status.includes("in_transit") || status.includes("picked")) return "shipped";
  return "processing";
}

function displayStatus(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export async function POST(request: Request) {
  const secret = process.env.SHIPROCKET_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });

  const supplied = request.headers.get("x-zucero-webhook-secret")
    ?? request.headers.get("x-api-key")
    ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!supplied || supplied !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await request.json() as Record<string, any>;
    const awb = text(payload.awb ?? payload.awb_code ?? payload.AWB ?? payload.tracking_number);
    const shiprocketOrderId = text(payload.sr_order_id ?? payload.shiprocket_order_id ?? payload.shiprocket_order_id);
    const merchantOrderId = text(payload.order_id ?? payload.order_number ?? payload.channel_order_id);
    const rawStatus = text(payload.current_status ?? payload.shipment_status ?? payload.status ?? payload.current_status_id) || "Shipment updated";
    const courier = text(payload.courier_name ?? payload.courier ?? payload.courier_company_name);
    const trackingUrl = text(payload.tracking_url ?? payload.track_url);

    const db = supabaseAdmin();
    let order: any = null;
    if (awb) {
      const { data } = await db.from("orders").select("*").eq("tracking_awb", awb).maybeSingle();
      order = data;
    }
    if (!order && shiprocketOrderId) {
      const { data } = await db.from("orders").select("*").eq("shiprocket_order_id", shiprocketOrderId).maybeSingle();
      order = data;
    }
    if (!order && merchantOrderId) {
      const { data } = await db.from("orders").select("*").eq("order_number", merchantOrderId).maybeSingle();
      order = data;
    }

    if (!order) return NextResponse.json({ received: true, matched: false });

    const status = normalizeStatus(rawStatus);
    const update: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (awb) update.tracking_awb = awb;
    if (courier) update.courier_name = courier;
    if (trackingUrl) update.tracking_url = trackingUrl;
    if (shiprocketOrderId && !order.shiprocket_order_id) update.shiprocket_order_id = shiprocketOrderId;

    const { error } = await db.from("orders").update(update).eq("id", order.id);
    if (error) throw new Error(`Could not save shipment update: ${error.message}`);

    await notifyShipmentStatus(order.id, displayStatus(rawStatus)).catch((notificationError) => {
      console.error("Shipment notification failed", notificationError);
    });

    return NextResponse.json({ received: true, matched: true });
  } catch (error) {
    console.error("Shiprocket webhook processing failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

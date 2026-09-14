import { NextResponse } from "next/server";
import { getShippingOptions } from "@/lib/shiprocket";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function message(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function GET() {
  const checks: Record<string, { ok: boolean; detail?: string }> = {};

  try {
    const db = supabaseAdmin();
    const { error } = await db.from("orders").select("id").limit(1);
    if (error) throw new Error(error.message);
    checks.supabase = { ok: true };
  } catch (error) {
    checks.supabase = { ok: false, detail: message(error) };
  }

  try {
    const pickupPostcode = process.env.SHIPROCKET_PICKUP_POSTCODE;
    if (!pickupPostcode) throw new Error("Pickup postcode missing");
    const result = await getShippingOptions({
      pickupPostcode,
      deliveryPostcode: "110001",
      weightKg: 0.74,
      cod: false,
    }) as { data?: { available_courier_companies?: unknown[] } };
    checks.shiprocket = {
      ok: Boolean(result?.data?.available_courier_companies?.length),
      detail: result?.data?.available_courier_companies?.length ? undefined : "No serviceable courier returned for diagnostic PIN",
    };
  } catch (error) {
    checks.shiprocket = { ok: false, detail: message(error) };
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !secret) throw new Error("Razorpay credentials missing");
    const response = await fetch("https://api.razorpay.com/v1/orders?count=1", {
      headers: { authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}` },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Razorpay credential check failed (${response.status})`);
    checks.razorpay = { ok: true };
  } catch (error) {
    checks.razorpay = { ok: false, detail: message(error) };
  }

  const ok = Object.values(checks).every((check) => check.ok);
  return NextResponse.json({ ok, checks }, { status: ok ? 200 : 503 });
}

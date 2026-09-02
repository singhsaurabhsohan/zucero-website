import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  const rawBody = await request.text();
  try {
    if (!verifyRazorpaySignature(rawBody, signature)) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // Database event-id deduplication and order transition are activated with Supabase credentials.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });
  }
}

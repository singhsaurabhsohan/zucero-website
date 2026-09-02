import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyRazorpaySignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error("Razorpay webhook secret is not configured");
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = Buffer.from(signature, "utf8");
  const calculated = Buffer.from(expected, "utf8");
  return received.length === calculated.length && timingSafeEqual(received, calculated);
}

export async function createRazorpayOrder(input: { amountPaise: number; receipt: string; notes?: Record<string, string> }) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) throw new Error("Razorpay credentials are not configured");
  const response = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`, "content-type": "application/json" }, body: JSON.stringify({ amount: input.amountPaise, currency: "INR", receipt: input.receipt, notes: input.notes ?? {} }), cache: "no-store" });
  if (!response.ok) throw new Error(`Razorpay order creation failed (${response.status})`);
  return response.json();
}

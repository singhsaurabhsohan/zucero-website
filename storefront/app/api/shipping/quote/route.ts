import { NextResponse } from "next/server";
import { z } from "zod";
import { getShippingOptions } from "@/lib/shiprocket";

const inputSchema = z.object({ postalCode: z.string().regex(/^\d{6}$/), weightGrams: z.number().int().positive().max(30_000) });

export async function POST(request: Request) {
  try {
    const input = inputSchema.parse(await request.json());
    const pickupPostcode = process.env.SHIPROCKET_PICKUP_POSTCODE;
    if (!pickupPostcode) return NextResponse.json({ configured: false, message: "Shipping quote is awaiting pickup configuration." }, { status: 503 });
    const result = await getShippingOptions({ pickupPostcode, deliveryPostcode: input.postalCode, weightKg: input.weightGrams / 1000 });
    return NextResponse.json({ configured: true, result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof z.ZodError ? "Invalid shipping request" : "Shipping quote unavailable" }, { status: 400 });
  }
}

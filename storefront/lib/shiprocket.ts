import { z } from "zod";

const API_BASE = "https://apiv2.shiprocket.in/v1/external";
let cachedToken: { value: string; expiresAt: number } | null = null;

function credentials() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) throw new Error("Shiprocket API credentials are not configured");
  return { email, password };
}

async function token() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const response = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(credentials()), cache: "no-store" });
  if (!response.ok) throw new Error(`Shiprocket authentication failed (${response.status})`);
  const parsed = z.object({ token: z.string().min(20) }).parse(await response.json());
  cachedToken = { value: parsed.token, expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000 };
  return parsed.token;
}

async function shiprocketFetch(path: string, init?: RequestInit) {
  const authToken = await token();
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers: { authorization: `Bearer ${authToken}`, "content-type": "application/json", ...(init?.headers ?? {}) }, cache: "no-store" });
  if (!response.ok) throw new Error(`Shiprocket request failed (${response.status})`);
  return response.json();
}

export async function getShippingOptions(input: { pickupPostcode: string; deliveryPostcode: string; weightKg: number; cod?: boolean }) {
  const params = new URLSearchParams({ pickup_postcode: input.pickupPostcode, delivery_postcode: input.deliveryPostcode, weight: input.weightKg.toFixed(3), cod: input.cod ? "1" : "0" });
  return shiprocketFetch(`/courier/serviceability/?${params}`);
}

export async function createShiprocketOrder(payload: Record<string, unknown>) {
  return shiprocketFetch("/orders/create/adhoc", { method: "POST", body: JSON.stringify(payload) });
}

export async function trackAwb(awb: string) {
  if (!/^\d{6,30}$/.test(awb)) throw new Error("Invalid AWB");
  return shiprocketFetch(`/courier/track/awb/${awb}`);
}

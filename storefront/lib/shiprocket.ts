import { z } from "zod";

const API_BASE = "https://apiv2.shiprocket.in/v1/external";
let cachedToken: { value: string; expiresAt: number } | null = null;

type ShippingQuote = {
  shippingPaise: number;
  courierCompanyId: number | null;
  courierName: string;
  chargeWeightKg: number;
};

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

function numeric(value: unknown) {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

function courierRateRupees(option: Record<string, unknown>) {
  const rate = option.rate;
  if (rate && typeof rate === "object") {
    const rateObject = rate as Record<string, unknown>;
    const nested = numeric(rateObject.total) ?? numeric(rateObject.rate);
    if (nested !== null && nested > 0) return nested;
  }
  const direct = numeric(rate);
  if (direct !== null && direct > 0) return direct;

  const freight = numeric(option.freight_charge);
  if (freight === null || freight <= 0) return null;
  const other = numeric(option.other_charges) ?? 0;
  const coverage = numeric(option.coverage_charges) ?? 0;
  return freight + other + coverage;
}

export async function getShippingOptions(input: { pickupPostcode: string; deliveryPostcode: string; weightKg: number; cod?: boolean }) {
  const params = new URLSearchParams({ pickup_postcode: input.pickupPostcode, delivery_postcode: input.deliveryPostcode, weight: input.weightKg.toFixed(3), cod: input.cod ? "1" : "0" });
  return shiprocketFetch(`/courier/serviceability/?${params}`);
}

export function selectPrepaidShippingQuote(result: unknown, fallbackWeightKg: number): ShippingQuote | null {
  if (!result || typeof result !== "object") return null;
  const data = (result as Record<string, unknown>).data;
  if (!data || typeof data !== "object") return null;
  const dataObject = data as Record<string, unknown>;
  const companies = Array.isArray(dataObject.available_courier_companies) ? dataObject.available_courier_companies : [];

  const candidates = companies.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const option = entry as Record<string, unknown>;
    const rateRupees = courierRateRupees(option);
    if (rateRupees === null || rateRupees <= 0) return [];
    return [{
      rateRupees,
      courierCompanyId: numeric(option.courier_company_id),
      courierName: typeof option.courier_name === "string" ? option.courier_name : "Shiprocket courier",
      chargeWeightKg: numeric(option.charge_weight) ?? fallbackWeightKg,
    }];
  });

  if (!candidates.length) return null;

  const recommendedId = numeric(dataObject.recommended_courier_company_id) ?? numeric(dataObject.shiprocket_recommended_courier_id);
  const recommended = recommendedId === null ? null : candidates.find((item) => item.courierCompanyId === recommendedId) ?? null;
  const selected = recommended ?? candidates.reduce((best, item) => item.rateRupees < best.rateRupees ? item : best);

  return {
    shippingPaise: Math.max(1, Math.round(selected.rateRupees * 100)),
    courierCompanyId: selected.courierCompanyId === null ? null : Math.round(selected.courierCompanyId),
    courierName: selected.courierName,
    chargeWeightKg: selected.chargeWeightKg,
  };
}

export async function getPrepaidShippingQuote(input: { pickupPostcode: string; deliveryPostcode: string; weightKg: number }) {
  const billableWeightKg = Math.max(0.5, input.weightKg);
  const result = await getShippingOptions({ ...input, weightKg: billableWeightKg, cod: false });
  const quote = selectPrepaidShippingQuote(result, billableWeightKg);
  if (!quote) throw new Error("Delivery is currently unavailable for this PIN code.");
  return quote;
}

export async function createShiprocketOrder(payload: Record<string, unknown>) {
  return shiprocketFetch("/orders/create/adhoc", { method: "POST", body: JSON.stringify(payload) });
}

export async function trackAwb(awb: string) {
  if (!/^\d{6,30}$/.test(awb)) throw new Error("Invalid AWB");
  return shiprocketFetch(`/courier/track/awb/${awb}`);
}

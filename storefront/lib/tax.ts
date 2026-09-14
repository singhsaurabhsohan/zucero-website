export const ZUCERO_ORIGIN_STATE = "Haryana";
export const GST_RATE_BPS = 500;
export const FREE_SHIPPING_THRESHOLD_PAISE = 149900;
export const HARYANA_SHIPPING_PAISE = 7900;
export const REST_OF_INDIA_SHIPPING_PAISE = 12900;

export function isIntraState(destinationState: string) {
  return destinationState.trim().toLowerCase() === ZUCERO_ORIGIN_STATE.toLowerCase();
}

export function calculateShipping(subtotalPaise: number, destinationState: string) {
  if (subtotalPaise >= FREE_SHIPPING_THRESHOLD_PAISE) return 0;
  return isIntraState(destinationState) ? HARYANA_SHIPPING_PAISE : REST_OF_INDIA_SHIPPING_PAISE;
}

export function calculateTax(taxablePaise: number, destinationState: string) {
  const totalTaxPaise = Math.round(taxablePaise * GST_RATE_BPS / 10000);
  if (isIntraState(destinationState)) {
    const cgstPaise = Math.floor(totalTaxPaise / 2);
    return { mode: "CGST_SGST" as const, ratePercent: 5, cgstPaise, sgstPaise: totalTaxPaise - cgstPaise, igstPaise: 0, totalTaxPaise };
  }
  return { mode: "IGST" as const, ratePercent: 5, cgstPaise: 0, sgstPaise: 0, igstPaise: totalTaxPaise, totalTaxPaise };
}

export function calculateCheckoutTotal(subtotalPaise: number, destinationState: string) {
  const shippingPaise = calculateShipping(subtotalPaise, destinationState);
  const taxablePaise = subtotalPaise + shippingPaise;
  const tax = calculateTax(taxablePaise, destinationState);
  return { subtotalPaise, shippingPaise, taxablePaise, totalPaise: taxablePaise + tax.totalTaxPaise, ...tax };
}

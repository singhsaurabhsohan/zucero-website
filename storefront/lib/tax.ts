export const ZUCERO_ORIGIN_STATE = "Haryana";
export const GST_RATE_BPS = 500;
export const HARYANA_SHIPPING_PAISE = 7900;
export const REST_OF_INDIA_SHIPPING_PAISE = 12900;
export const ZUCADD10_CODE = "ZUCADD10";
export const ZUCADD10_DISCOUNT_BPS = 1000;

export function isIntraState(destinationState: string) {
  return destinationState.trim().toLowerCase() === ZUCERO_ORIGIN_STATE.toLowerCase();
}

export function normalizeCouponCode(code: string | null | undefined) {
  return (code ?? "").trim().toUpperCase();
}

export function calculateCouponDiscount(subtotalPaise: number, code: string | null | undefined) {
  if (normalizeCouponCode(code) !== ZUCADD10_CODE) return 0;
  return Math.round(subtotalPaise * ZUCADD10_DISCOUNT_BPS / 10000);
}

export function calculateShipping(_subtotalPaise: number, destinationState: string) {
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

export function calculateCheckoutTotal(subtotalPaise: number, destinationState: string, discountPaise = 0) {
  const normalizedDiscountPaise = Math.min(Math.max(Math.round(discountPaise), 0), subtotalPaise);
  const discountedSubtotalPaise = subtotalPaise - normalizedDiscountPaise;
  const shippingPaise = calculateShipping(subtotalPaise, destinationState);
  const taxablePaise = discountedSubtotalPaise + shippingPaise;
  const tax = calculateTax(taxablePaise, destinationState);
  return {
    subtotalPaise,
    discountPaise: normalizedDiscountPaise,
    discountedSubtotalPaise,
    shippingPaise,
    taxablePaise,
    totalPaise: taxablePaise + tax.totalTaxPaise,
    ...tax,
  };
}

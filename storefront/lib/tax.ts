export const ZUCERO_ORIGIN_STATE = "Haryana";
export const GST_RATE_BPS = 1800;

export function calculateTax(taxablePaise: number, destinationState: string) {
  const totalTaxPaise = Math.round(taxablePaise * GST_RATE_BPS / 10_000);
  const intraState = destinationState.trim().toLowerCase() === ZUCERO_ORIGIN_STATE.toLowerCase();
  if (intraState) {
    const cgstPaise = Math.floor(totalTaxPaise / 2);
    return { mode: "CGST_SGST" as const, ratePercent: 18, cgstPaise, sgstPaise: totalTaxPaise - cgstPaise, igstPaise: 0, totalTaxPaise };
  }
  return { mode: "IGST" as const, ratePercent: 18, cgstPaise: 0, sgstPaise: 0, igstPaise: totalTaxPaise, totalTaxPaise };
}

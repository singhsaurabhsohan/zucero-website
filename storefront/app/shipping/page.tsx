import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Shipping Policy",
  description: "Zucero shipping policy for Desi Khand and Mishri orders across India, including weight-based delivery charges, Shiprocket serviceability, dispatch and tracking.",
  path: "/shipping",
  keywords: ["Zucero shipping", "Desi Khand delivery", "Shiprocket delivery", "Khand shipping India"],
});

export default function ShippingPage() {
  return <ContentPage eyebrow="Delivery, clearly explained" title="Shipping policy" intro="Zucero currently ships within India from Haryana. Delivery serviceability and shipping charges are calculated before payment.">
    <h2>Shipping charges</h2><p>All deliveries are chargeable. The shipping amount is calculated at checkout using the destination PIN code and the total packed weight of the order. When multiple products or quantities are purchased, their packed weights are combined for the shipping calculation.</p>
    <h2>Serviceability</h2><p>Before Razorpay opens, the checkout verifies the destination PIN code and applicable prepaid courier rate through Shiprocket. If the courier network cannot currently serve that PIN code, payment is not started.</p>
    <h2>Processing</h2><p>After Razorpay confirms a captured payment, the order is automatically sent to Shiprocket for fulfilment from our Haryana pickup location. The Zucero team then prepares and dispatches the parcel.</p>
    <h2>Tracking</h2><p>Once a shipment receives an AWB, courier tracking details can be associated with the order. Courier scans may take several hours to update after handover.</p>
    <h2>Address accuracy</h2><p>Please provide a complete address, reachable mobile number, correct state and six-digit PIN code. Re-shipping charges caused by an incorrect or incomplete customer address may be payable by the customer.</p>
  </ContentPage>;
}

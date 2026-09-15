import { ContentPage } from "@/components/content-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Shipping Policy",
  description: "Zucero shipping policy for Desi Khand and Mishri orders across India, including Haryana and interstate delivery charges, Shiprocket serviceability, dispatch and tracking.",
  path: "/shipping",
  keywords: ["Zucero shipping", "Desi Khand delivery", "Shiprocket delivery", "Khand shipping India"],
});

export default function ShippingPage() {
  return <ContentPage eyebrow="Delivery, clearly explained" title="Shipping policy" intro="Zucero currently ships within India from Haryana. Delivery serviceability is checked before payment, and delivery is usually within ~7 days.">
    <h2>Shipping charges</h2><p>All deliveries are chargeable. Shipping is ₹79 for Haryana deliveries and ₹129 for deliveries to other Indian states and union territories.</p>
    <h2>Serviceability</h2><p>Before Razorpay opens, the checkout verifies the destination PIN code through Shiprocket. If the courier network cannot currently serve that PIN code, payment is not started.</p>
    <h2>Delivery timing</h2><p>Delivery is usually within ~7 days after order confirmation. Actual delivery time can vary by destination PIN code, courier movement, public holidays and other operational conditions.</p>
    <h2>Processing</h2><p>After Razorpay confirms a captured payment, the order is automatically sent to Shiprocket for fulfilment from our Haryana pickup location. The Zucero team then prepares and dispatches the parcel.</p>
    <h2>Tracking</h2><p>Once a shipment receives an AWB, courier tracking details can be associated with the order. Courier scans may take several hours to update after handover.</p>
    <h2>Address accuracy</h2><p>Please provide a complete address, reachable mobile number, correct state and six-digit PIN code. Re-shipping charges caused by an incorrect or incomplete customer address may be payable by the customer.</p>
  </ContentPage>;
}

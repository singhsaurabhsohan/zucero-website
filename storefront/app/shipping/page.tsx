import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return <ContentPage eyebrow="Delivery, clearly explained" title="Shipping policy" intro="Delivery availability, charges, and estimates are calculated from your PIN code before payment.">
    <h2>Serviceability and charges</h2><p>We use Shiprocket and its courier network for domestic delivery. The available courier, delivery estimate, and shipping charge depend on the destination PIN code, parcel weight, and package dimensions. The checkout total shown before payment is the applicable charge for that order.</p>
    <h2>Processing</h2><p>Orders are prepared after payment confirmation. The dispatch estimate shown at checkout or in the order confirmation applies; weekends, public holidays, severe weather, and courier restrictions can affect timing.</p>
    <h2>Tracking</h2><p>Once a shipment receives an AWB, tracking will appear in your account and may also be sent by email. Courier scans can take several hours to update after handover.</p>
    <h2>Address accuracy</h2><p>Please provide a complete address, reachable mobile number, and correct PIN code. Re-shipping charges caused by an incorrect or incomplete customer address may be payable by the customer.</p>
  </ContentPage>;
}

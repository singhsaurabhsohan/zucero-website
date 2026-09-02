import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundsPage() {
  return <ContentPage eyebrow="Fair resolutions" title="Refund policy" intro="Approved refunds are processed transparently to the payment method used for the order.">
    <h2>When a refund may apply</h2><p>A refund may be approved for a cancelled order that has not entered fulfilment, an unavailable item, a verified damaged or incorrect delivery, or another case required by applicable consumer law.</p>
    <h2>How to request one</h2><p>Email zucero.thegoodsugar@gmail.com with the order number and supporting details. For transit damage, include photographs of the parcel, label, and product.</p>
    <h2>Processing time</h2><p>After approval, Zucero will initiate the refund to the original payment method. Banks and payment providers may require additional business days before the amount appears in your account.</p>
    <h2>Shipping charges</h2><p>Original shipping charges are refundable when the entire order is cancelled before fulfilment or when required as part of an approved resolution. Other cases are assessed on their facts.</p>
  </ContentPage>;
}

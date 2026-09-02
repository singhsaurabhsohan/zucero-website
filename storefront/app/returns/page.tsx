import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return <ContentPage eyebrow="We will make it right" title="Returns and replacements" intro="Food products need careful handling, so return eligibility depends on the condition and reason for the request.">
    <h2>Damaged, incorrect, or missing items</h2><p>Contact us promptly after delivery with your order number, clear photographs of the outer package, shipping label, and affected product. Keep the original packaging until the request is resolved.</p>
    <h2>Change-of-mind returns</h2><p>For food-safety reasons, opened products and correctly delivered food items are generally not returnable for a change of mind. This does not limit remedies available for damaged, defective, or incorrectly supplied goods.</p>
    <h2>Resolution</h2><p>After verification, we may offer a replacement, refund, or another appropriate resolution. Approved refunds are returned to the original payment method according to payment-provider timelines.</p>
    <p>For payment-specific information, read the <Link href="/refunds">refund policy</Link>.</p>
  </ContentPage>;
}

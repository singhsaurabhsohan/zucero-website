import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <ContentPage eyebrow="Your information, treated carefully" title="Privacy policy" intro="This page explains the information used to operate the Zucero storefront and fulfil your orders.">
    <h2>Information we collect</h2><p>We may collect contact, account, delivery, order, support, device, and consent information. Precise browser location is requested only with permission; your checkout address and PIN code determine final tax and delivery eligibility.</p>
    <h2>How it is used</h2><p>Information is used to authenticate accounts, process and deliver orders, prevent fraud, provide support, send transactional messages, meet legal obligations, and improve the storefront.</p>
    <h2>Service providers</h2><p>Necessary information may be processed by providers supporting hosting, authentication, database services, payments, email, analytics, and shipping—including Vercel, Supabase, Razorpay, and Shiprocket—subject to their applicable terms and safeguards.</p>
    <h2>Your choices</h2><p>You may deny location access and enter your address manually. You may also request access, correction, or deletion where applicable by emailing zucero.thegoodsugar@gmail.com. Certain records may be retained for tax, fraud-prevention, or legal requirements.</p>
    <h2>Security</h2><p>We use access controls and protected environment settings, but no online service can promise absolute security. Payment-card details are handled by the payment provider rather than stored by Zucero.</p>
  </ContentPage>;
}

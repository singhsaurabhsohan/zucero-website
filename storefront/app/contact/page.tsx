import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContentPage eyebrow="Human support" title="Talk to Zucero" intro="Questions about products, orders, wholesale, or the launch are welcome.">
    <div className="contact-grid"><aside className="contact-details"><p className="eyebrow">Email</p><p><a href="mailto:zucero.thegoodsugar@gmail.com">zucero.thegoodsugar@gmail.com</a></p><h3>Order support</h3><p>Please include your order number and the email or mobile number used at checkout.</p><h3>Response times</h3><p>We aim to respond during Indian business hours. Launch periods may take a little longer.</p></aside><ContactForm /></div>
  </ContentPage>;
}

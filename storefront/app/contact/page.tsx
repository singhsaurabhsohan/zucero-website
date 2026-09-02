import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ContentPage eyebrow="Human support" title="Talk to Zucero" intro="Questions about products, orders, wholesale, or the launch are welcome.">
    <div className="contact-grid"><aside className="contact-details"><p className="eyebrow">Email</p><p><a href="mailto:zucero.thegoodsugar@gmail.com">zucero.thegoodsugar@gmail.com</a></p><h3>Order support</h3><p>Please include your order number and the email or mobile number used at checkout.</p><h3>Response times</h3><p>We aim to respond during Indian business hours. Launch periods may take a little longer.</p></aside><form className="contact-form"><label><span>Name</span><input name="name" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>Order number (optional)</span><input name="order" /></label><label><span>Message</span><textarea name="message" required /></label><button type="submit" className="button button-dark">Send message</button></form></div>
  </ContentPage>;
}

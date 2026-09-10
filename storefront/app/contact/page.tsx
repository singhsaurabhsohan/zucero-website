import { ContentPage } from "@/components/content-page";
import { ContactForm } from "@/components/contact-form";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Zucero",
  description: "Contact Zucero for product questions, Desi Khand and Mishri information, orders, shipping, wholesale enquiries and customer support.",
  path: "/contact",
  keywords: ["Zucero contact", "Desi Khand support", "Khand order support"],
});

export default function ContactPage() {
  return <ContentPage eyebrow="Human support" title="Talk to Zucero" intro="Questions about products, orders, wholesale, or the launch are welcome.">
    <div className="contact-grid"><aside className="contact-details"><p className="eyebrow">Email</p><p><a href="mailto:zucero.thegoodsugar@gmail.com">zucero.thegoodsugar@gmail.com</a></p><h3>Order support</h3><p>Please include your order number and the email or mobile number used at checkout.</p><h3>Response times</h3><p>We aim to respond during Indian business hours. Launch periods may take a little longer.</p></aside><ContactForm /></div>
  </ContentPage>;
}

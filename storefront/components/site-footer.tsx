import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return <footer>
    <div className="footer-brand"><Image className="footer-logo" src="/images/zucero-highres-logo.png" alt="Zucero — The Good Sugar" width={180} height={120} /><p>Thoughtfully made Indian sweetness, explained honestly.</p></div>
    <div><h3>Explore</h3><Link href="/#products">Products</Link><Link href="/#process">Our process</Link><Link href="/our-story">Our story</Link><Link href="/journal">Journal</Link></div>
    <div><h3>Help</h3><Link href="/account/orders">Track order</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link><Link href="/contact">Contact</Link><a href={whatsappLink()}>WhatsApp: +91 97171 69977</a></div>
    <div><h3>Legal</h3><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refunds">Refund policy</Link></div>
    <div className="footer-socials" aria-label="Follow Zucero"><a href="https://www.youtube.com/@ZuceroIndia" target="_blank" rel="noreferrer" aria-label="Zucero on YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3Z" /></svg></a><a href="https://x.com/zuceroindia" target="_blank" rel="noreferrer" aria-label="Zucero on X"><span aria-hidden="true">X</span></a><a href="https://www.instagram.com/zuceroindia/" target="_blank" rel="noreferrer" aria-label="Zucero on Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="social-fill" /></svg></a><a href="https://www.linkedin.com/company/zuceroindia" target="_blank" rel="noreferrer" aria-label="Zucero on LinkedIn"><span className="social-letter" aria-hidden="true">in</span></a><a href="https://www.facebook.com/zuceroindia" target="_blank" rel="noreferrer" aria-label="Zucero on Facebook"><span className="social-letter" aria-hidden="true">f</span></a></div>
    <div className="footer-compliance" aria-label="Business registration details"><div className="footer-fssai"><Image src="/images/fssai-logo.png" alt="FSSAI" width={86} height={86} /><p><span>FSSAI Licence</span><strong>20826018000800</strong></p></div><p><span>CIN</span><strong>U56290HR2026PTC145994</strong></p><address><span>Registered office</span><strong>TIARA TRIVERSE PRIVATE LIMITED</strong><small>Sector-2, Rohtak, 124001, Haryana, India</small></address></div>
    <div className="footer-bottom"><span>© 2026 Zucero. All rights reserved.</span><span>Made with patience in Haryana, India.</span></div>
  </footer>;
}

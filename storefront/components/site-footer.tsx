import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return <footer>
    <div className="footer-brand"><Image className="footer-logo" src="/images/zucerothegoodsugar-logo.webp" alt="Zucero — The Good Sugar" width={112} height={112} /><p>Thoughtfully made Indian sweetness, explained honestly.</p></div>
    <div><h3>Explore</h3><Link href="/#products">Products</Link><Link href="/#process">Our process</Link><Link href="/our-story">Our story</Link></div>
    <div><h3>Help</h3><Link href="/account/orders">Track order</Link><Link href="/shipping">Shipping</Link><Link href="/returns">Returns</Link><Link href="/contact">Contact</Link></div>
    <div><h3>Legal</h3><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refunds">Refund policy</Link></div>
    <div className="footer-bottom"><span>© 2026 Zucero. All rights reserved.</span><span>Made with patience in Haryana, India.</span></div>
  </footer>;
}

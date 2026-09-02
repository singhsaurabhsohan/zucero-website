"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

const links = [["Our story", "/#philosophy"], ["Products", "/#products"], ["How it’s made", "/#process"], ["FAQs", "/#faqs"], ["Contact", "/contact"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Zucero home">
        <Image src="/images/zucerothegoodsugar-logo.webp" alt="Zucero — The Good Sugar" width={124} height={124} priority />
      </Link>
      <nav className={open ? "nav open" : "nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/account" className="icon-button" aria-label="Account"><UserRound size={20} /></Link>
        <Link href="/cart" className="icon-button bag" aria-label={`Shopping bag with ${count} items`}><ShoppingBag size={20} />{count > 0 && <span>{count}</span>}</Link>
        <button className="icon-button mobile-menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

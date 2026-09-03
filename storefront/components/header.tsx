"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart-provider";

const links = [["Our story", "/#philosophy"], ["Products", "/#products"], ["How it’s made", "/#process"], ["FAQs", "/#faqs"], ["Contact", "/contact"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [showPriorityNotice, setShowPriorityNotice] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lightBackground, setLightBackground] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const header = headerRef.current;
    header?.querySelector<HTMLAnchorElement>(".nav a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButtonRef.current?.focus(); }
      if (event.key !== "Tab" || !header) return;
      const items = Array.from(header.querySelectorAll<HTMLElement>("a[href],button")).filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const wideScreen = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = () => { if (wideScreen.matches) setOpen(false); };
    window.addEventListener("keydown", onKey);
    wideScreen.addEventListener("change", closeOnDesktop);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKey); wideScreen.removeEventListener("change", closeOnDesktop); };
  }, [open]);
  useEffect(() => {
    let frame = 0;
    const detect = () => {
      frame = 0;
      const header = headerRef.current;
      if (!header) return;
      const box = header.getBoundingClientRect();
      const below = document.elementsFromPoint(window.innerWidth / 2, box.top + box.height / 2).find(el => !header.contains(el));
      let element: Element | null = below ?? document.body;
      if (element.closest(".hero,.nature-section,.heritage-dark,footer,.content-hero,.heritage-collection,.collection-intro,.transparency-section,.contact-section,.account-story")) { setLightBackground(false); return; }
      while (element) {
        const values = getComputedStyle(element).backgroundColor.match(/[\d.]+/g)?.map(Number);
        if (values && values.length >= 3 && (values.length < 4 || values[3] > .5)) {
          setLightBackground((values[0] * .299 + values[1] * .587 + values[2] * .114) > 145);
          return;
        }
        element = element.parentElement;
      }
      setLightBackground(true);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(detect); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.removeEventListener("load", schedule); };
  }, [pathname]);
  const { count } = useCart();
  return (
    <>
    <header ref={headerRef} className={`site-header ${lightBackground && !open ? "nav-on-light" : "nav-on-dark"} ${scrolled || open ? "is-scrolled" : "is-at-top"}`}>
      <Link href="/" className="brand" aria-label="Zucero home" onClick={() => setOpen(false)}>
        <Image src="/images/zucerothegoodsugar-logo.webp" alt="Zucero — The Good Sugar" width={124} height={124} priority />
      </Link>
      <nav id="primary-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
        {links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <Link href="/account" className="icon-button" aria-label="Account" onClick={() => setOpen(false)}><UserRound size={20} /></Link>
        <Link href="/cart" className="icon-button bag" aria-label={`Shopping bag with ${count} items`} onClick={() => setOpen(false)}><ShoppingBag size={20} />{count > 0 && <span>{count}</span>}</Link>
        <button ref={menuButtonRef} className="icon-button mobile-menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
      {showPriorityNotice && (
        <aside className="priority-popup" aria-label="Desi Khand pre-book offer">
          <button type="button" aria-label="Dismiss priority access offer" onClick={() => setShowPriorityNotice(false)}><X size={16} /></button>
          <Link href="/products/desi-khand" onClick={() => setShowPriorityNotice(false)}>Priority access <ArrowRight aria-hidden="true" /></Link>
        </aside>
      )}
    </>
  );
}

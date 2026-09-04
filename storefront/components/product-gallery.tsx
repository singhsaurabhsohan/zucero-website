"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Product } from "@/lib/catalog";

export function ProductGallery({ product }: { product: Product }) {
  const photos = product.slug === "dhage-wali-mishri"
    ? [
        { src: product.image, label: product.name },
        { src: "/images/mishri-raw-hero.png", label: "Brown Mishri served in a silver bowl" },
        { src: "/images/mishri-jar-lifestyle.png", label: "Zucero Brown Mishri jar with serving pieces" },
        { src: "/images/slow_sweetness.webp", label: "Mishri serving inspiration" },
        { src: "/images/sugarcane_origin.webp", label: "Sugarcane inspiration" },
      ]
    : [
        { src: product.image, label: product.name },
        { src: "/images/khand_texture.webp", label: "Natural fine-granule Desi Khand texture" },
        { src: "/images/carousel-khand-matka-v2.png", label: "Desi Khand served from a traditional matka" },
        { src: "/images/hero-khand-photoreal-v1.png", label: "Desi Khand with sugarcane at sunrise" },
        { src: "/images/sugarcane_origin.webp", label: "Sugarcane inspiration" },
      ];
  const [active, setActive] = useState(0);
  const zoom = useRef<HTMLDialogElement>(null);
  return <div className="pdp-gallery"><div className="pdp-main-image"><button className="pdp-zoom" onClick={() => zoom.current?.showModal()} aria-label={`Enlarge ${photos[active].label}`}><Image src={photos[active].src} alt={photos[active].label} fill priority sizes="(max-width: 900px) 92vw, 48vw" /><Expand className="zoom-icon" size={22} /></button><div className="gallery-controls"><button aria-label="Previous image" onClick={() => setActive((active + photos.length - 1) % photos.length)}><ChevronLeft /></button><span aria-live="polite">{active + 1} / {photos.length}</span><button aria-label="Next image" onClick={() => setActive((active + 1) % photos.length)}><ChevronRight /></button></div></div><div className="pdp-thumbnails">{photos.map((photo, i) => <button key={photo.src} aria-label={`View ${photo.label}`} aria-pressed={i === active} onClick={() => setActive(i)}><Image src={photo.src} alt="" width={100} height={100} /></button>)}</div><dialog className="pdp-lightbox" ref={zoom}><button autoFocus aria-label="Close enlarged image" onClick={() => zoom.current?.close()}><X /></button><Image src={photos[active].src} alt={photos[active].label} width={1200} height={1200} /></dialog></div>;
}

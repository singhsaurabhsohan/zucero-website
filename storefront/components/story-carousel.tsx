"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const stories = [
  { image: "artisan_hands.webp", title: "Good is traditional.", copy: "Made with respect for craft.", href: "/#process", alt: "Traditional sugar-making by hand" },
  { image: "carousel-khand-matka-v2.png", title: "Good is pure.", copy: "Khand, closer to its source.", href: "/products/desi-khand", alt: "Fine brown Desi Khand spilling from a black clay pot" },
  { image: "carousel-dew-leaf-v2.png", title: "Good begins in nature.", copy: "Begin with sugarcane.", href: "/#nature", alt: "A dew drop resting on a green sugarcane leaf at sunrise" },
  { image: "carousel-mishri-v2.png", title: "Good is transparent.", copy: "Crystal by crystal.", href: "/products/dhage-wali-mishri", alt: "Natural amber-brown Mishri crystals in warm sunlight" },
  { image: "tea_ritual.webp", title: "Good is a choice.", copy: "Choose better. Choose Zucero.", href: "/#products", alt: "An everyday tea ritual with natural sweetness" },
  { image: "carousel-gud-tradition.png", title: "Gud is tradition.", copy: "Sweetness rooted in Indian homes.", href: "/#process", alt: "Traditional Gud pieces arranged on a brass plate" },
] as const;

export function StoryCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const moveTo = useCallback((index: number) => {
    const nextIndex = (index + stories.length) % stories.length;
    const viewport = viewportRef.current;
    const card = viewport?.children[nextIndex] as HTMLElement | undefined;
    if (viewport && card) viewport.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((current) => {
      const next = (current + 1) % stories.length;
      const viewport = viewportRef.current;
      const card = viewport?.children[next] as HTMLElement | undefined;
      if (viewport && card) viewport.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      return next;
    }), 7500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section id="carousel" className="story-carousel" aria-label="Zucero stories" onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="carousel-viewport" ref={viewportRef}>
        {stories.map((story) => (
          <Link className="marquee-image" href={story.href} key={story.title}>
            <Image src={`/images/${story.image}`} alt={story.alt} width={768} height={512} sizes="(max-width: 640px) 82vw, 360px" />
            <span><strong>{story.title}</strong><small>{story.copy}</small></span>
          </Link>
        ))}
      </div>
      <button className="carousel-arrow carousel-arrow-left" type="button" onClick={() => moveTo(activeIndex - 1)} aria-label="Previous Zucero story"><ChevronLeft aria-hidden="true" /></button>
      <button className="carousel-arrow carousel-arrow-right" type="button" onClick={() => moveTo(activeIndex + 1)} aria-label="Next Zucero story"><ChevronRight aria-hidden="true" /></button>
      <p className="carousel-status" aria-live="polite">{activeIndex + 1} / {stories.length}</p>
    </section>
  );
}

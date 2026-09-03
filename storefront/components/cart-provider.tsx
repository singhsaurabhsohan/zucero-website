"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  variantId: string;
  productSlug: string;
  productName: string;
  variantLabel: string;
  sku: string;
  image: string;
  pricePaise: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalPaise: number;
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  update: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem("zucero-cart-prelaunch-v2");
        if (saved) setLines(JSON.parse(saved));
      } catch { localStorage.removeItem("zucero-cart-prelaunch-v2"); }
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("zucero-cart-prelaunch-v2", JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    count: lines.reduce((total, line) => total + line.quantity, 0),
    subtotalPaise: lines.reduce((total, line) => total + line.pricePaise * line.quantity, 0),
    add: (incoming, quantity = 1) => setLines((current) => {
      const found = current.find((line) => line.variantId === incoming.variantId);
      return found
        ? current.map((line) => line.variantId === incoming.variantId ? { ...line, quantity: Math.min(10, line.quantity + quantity) } : line)
        : [...current, { ...incoming, quantity }];
    }),
    update: (variantId, quantity) => setLines((current) => quantity < 1 ? current.filter((line) => line.variantId !== variantId) : current.map((line) => line.variantId === variantId ? { ...line, quantity: Math.min(10, quantity) } : line)),
    remove: (variantId) => setLines((current) => current.filter((line) => line.variantId !== variantId)),
    clear: () => setLines([])
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

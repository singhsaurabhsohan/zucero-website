export type ProductVariant = {
  id: string;
  label: string;
  sku: string;
  weightGrams: number;
  pricePaise: number | null;
};

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  ingredients: string;
  variants: ProductVariant[];
};

// Pre-launch sizes and prices supplied in the September website-flow brief.
export const products: Product[] = [
  {
    slug: "desi-khand",
    name: "Desi Khand",
    eyebrow: "Natural unrefined cane sugar",
    description: "Born from fresh sugarcane juice. Shaped by time. Crafted to preserve its natural character.",
    image: "/images/heritage_khand.webp",
    ingredients: "Sugarcane juice, desi cow milk and desi cow ghee. Contains milk.",
    variants: [
      { id: "khand-490", label: "490 g", sku: "ZUC-KHA-490", weightGrams: 490, pricePaise: 39900 },
      { id: "khand-990", label: "990 g", sku: "ZUC-KHA-990", weightGrams: 990, pricePaise: 79900 }
    ]
  },
  {
    slug: "dhage-wali-mishri",
    name: "Original Brown Khand Mishri",
    eyebrow: "From the abundance of sugarcane to the rarity of every crystal",
    description: "Crafted crystal by crystal through an age-old Indian thread technique, preserving its distinctive colour, delicate sweetness and refined crunch.",
    image: "/images/mishri_macro.webp",
    ingredients: "Sugarcane juice, desi cow milk and desi cow ghee. Contains milk.",
    variants: [
      { id: "mishri-250", label: "250 g", sku: "ZUC-MIS-250", weightGrams: 250, pricePaise: 79900 },
      { id: "mishri-500", label: "500 g", sku: "ZUC-MIS-500", weightGrams: 500, pricePaise: 179900 }
    ]
  }
];

export function formatPrice(pricePaise: number | null) {
  if (pricePaise === null) return "Price to be confirmed";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(pricePaise / 100);
}

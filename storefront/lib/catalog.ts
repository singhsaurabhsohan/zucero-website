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

// Prices remain intentionally unset until the founder approves the launch price list.
export const products: Product[] = [
  {
    slug: "desi-khand",
    name: "Desi Khand",
    eyebrow: "Natural unrefined cane sugar",
    description: "Slow-made from sugarcane juice to preserve its warm flavour and naturally occurring character.",
    image: "/images/heritage_khand.webp",
    ingredients: "100% sugarcane",
    variants: [
      { id: "khand-500", label: "500 g", sku: "ZUC-KHA-500", weightGrams: 500, pricePaise: null },
      { id: "khand-1000", label: "1 kg", sku: "ZUC-KHA-1000", weightGrams: 1000, pricePaise: null }
    ]
  },
  {
    slug: "dhage-wali-mishri",
    name: "Dhage Wali Mishri",
    eyebrow: "Traditional crystal sugar",
    description: "Patiently crystallised for a clean sweetness, delicate crunch, and a slower everyday ritual.",
    image: "/images/mishri_macro.webp",
    ingredients: "Sugarcane sugar",
    variants: [
      { id: "mishri-250", label: "250 g", sku: "ZUC-MIS-250", weightGrams: 250, pricePaise: null },
      { id: "mishri-500", label: "500 g", sku: "ZUC-MIS-500", weightGrams: 500, pricePaise: null }
    ]
  }
];

export function formatPrice(pricePaise: number | null) {
  if (pricePaise === null) return "Price to be confirmed";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(pricePaise / 100);
}

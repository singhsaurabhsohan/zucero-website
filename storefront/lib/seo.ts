export const SITE_URL = "https://www.thegoodsugar.in";
export const SITE_NAME = "Zucero — The Good Sugar";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-cinematic-poster.png`;

export const coreKeywords = [
  "Zucero",
  "Desi Khand",
  "Khand sugar",
  "traditional Khand",
  "Shudh Khand",
  "Dhage Wali Mishri",
  "brown Khand Mishri",
  "traditional Indian sugar",
  "natural sugar alternatives",
  "sugar alternatives",
  "health and wellness",
  "mindful sweetness",
  "sugarcane sugar",
];

export const socialProfiles = [
  "https://www.youtube.com/@ZuceroIndia",
  "https://x.com/zuceroindia",
  "https://www.instagram.com/zuceroindia/",
  "https://www.linkedin.com/company/zuceroindia",
  "https://www.facebook.com/zuceroindia",
];

export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

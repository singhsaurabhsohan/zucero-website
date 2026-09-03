export const WHATSAPP_NUMBER = "919717169977";
export function whatsappLink(message = "Hello Zucero! I’d like to know more about The Good Sugar.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export function whatsappOrder(lines: { productName: string; variantLabel: string; quantity: number }[]) {
  return whatsappLink(`Hello Zucero! I’d like to order:\n${lines.map(line => `• ${line.productName} — ${line.variantLabel} × ${line.quantity}`).join("\n")}\nPlease confirm availability, the final price including tax and shipping, and payment details.`);
}

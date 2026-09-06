import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  kind: z.enum(["launch_list", "contact", "purchase"]),
  email: z.string().email().max(320),
  fields: z.record(z.string().max(80), z.string().max(4000)),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!accessToken || !supabaseUrl || !publishableKey) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createClient(supabaseUrl, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user?.email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid submission" }, { status: 400 });
  if (user.email.toLowerCase() !== parsed.data.email.toLowerCase()) return Response.json({ error: "Verified email mismatch" }, { status: 403 });

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const toEmail = process.env.ORDER_NOTIFICATION_EMAIL || "zucero.thegoodsugar@gmail.com";
  if (!apiKey || !fromEmail) return Response.json({ accepted: true, delivered: false, reason: "email_provider_not_configured" }, { status: 202 });

  const labels = Object.entries(parsed.data.fields);
  const subjectLabel = parsed.data.kind === "purchase" ? "Purchase request" : parsed.data.kind === "contact" ? "Contact enquiry" : "Launch-list signup";
  const text = labels.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2>${escapeHtml(subjectLabel)}</h2><table>${labels.map(([label, value]) => `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ personalizations: [{ to: [{ email: toEmail }] }], from: { email: fromEmail, name: "Zucero Website" }, subject: `Zucero: ${subjectLabel}`, content: [{ type: "text/plain", value: text }, { type: "text/html", value: html }] }),
  });
  if (!response.ok) return Response.json({ error: "Notification delivery failed" }, { status: 502 });
  return Response.json({ accepted: true, delivered: true });
}

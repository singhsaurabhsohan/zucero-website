"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { StoreHeader } from "@/components/store-header";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase-browser";
import { SiteFooter } from "@/components/site-footer";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  async function sendMagicLink(event: FormEvent) {
    event.preventDefault();
    if (!configured) return setMessage("Account service is awaiting secure Supabase connection.");
    setLoading(true); setMessage("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setMessage(error ? error.message : "Check your email for your secure sign-in link.");
    setLoading(false);
  }

  return <main className="store-page"><StoreHeader /><section className="account-shell"><div className="account-story"><p className="eyebrow gold">Your Zucero account</p><h1>Orders, addresses,<br />and tracking in one place.</h1><p>Use a secure email link—no password to remember. Guest checkout remains available.</p><ul><li><ShieldCheck /> Secure Supabase authentication</li><li><Mail /> Order and shipment notifications</li></ul></div><form className="account-card" onSubmit={sendMagicLink}><p className="eyebrow">Sign in or create account</p><h2>Continue with email</h2><label><span>Email address</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></label><button className="button button-dark" disabled={loading}>{loading ? "Sending…" : "Email me a secure link"}</button>{message && <p className="form-message" role="status">{message}</p>}<small>By continuing, you accept our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.</small></form></section><SiteFooter /></main>;
}

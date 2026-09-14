"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase-browser";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.thegoodsugar.in";

export function SocialAuthButtons() {
  const client = useMemo(() => isSupabaseConfigured() ? createSupabaseBrowserClient() : null, []);
  const [busy, setBusy] = useState<"google" | "apple" | null>(null);
  const [message, setMessage] = useState("");

  async function continueWith(provider: "google" | "apple") {
    if (!client) { setMessage("Account sign in is temporarily unavailable."); return; }
    setBusy(provider);
    setMessage("");
    const redirectTo = new URL("/auth/callback", SITE_URL).toString();
    const { error } = await client.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) {
      setBusy(null);
      setMessage(error.message);
    }
  }

  return <div className="social-auth"><button className="social-auth-button" type="button" disabled={Boolean(busy)} onClick={() => continueWith("google")}><span className="social-auth-mark">G</span>{busy === "google" ? "Connecting…" : "Continue with Google"}</button><button className="social-auth-button" type="button" disabled={Boolean(busy)} onClick={() => continueWith("apple")}><span className="social-auth-mark apple-mark">●</span>{busy === "apple" ? "Connecting…" : "Continue with Apple"}</button>{message && <p className="form-message" role="status">{message}</p>}</div>;
}

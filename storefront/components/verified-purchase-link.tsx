"use client";

import { MailCheck, X } from "lucide-react";
import { useState } from "react";
import { useEmailOtp } from "@/lib/use-email-otp";

export function VerifiedPurchaseLink({ href, className, children, defaultEmail = "" }: { href: string; className?: string; children: React.ReactNode; defaultEmail?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(defaultEmail);
  const [token, setToken] = useState("");
  const otp = useEmailOtp();

  async function begin() {
    const purchaseEmail = email || defaultEmail;
    if (purchaseEmail !== email) setEmail(purchaseEmail);
    const existing = purchaseEmail ? await otp.currentVerifiedUser(purchaseEmail) : null;
    if (existing) { window.location.assign(href); return; }
    setOpen(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const existing = await otp.currentVerifiedUser(email);
    if (existing) { window.location.assign(href); return; }
    if (!otp.codeSent) { await otp.sendCode(email); return; }
    const user = await otp.verifyCode(email, token);
    if (user) window.location.assign(href);
  }

  function close() { setOpen(false); setToken(""); otp.resetCode(); }

  return <>
    <button type="button" className={className} onClick={begin}>{children}</button>
    {open && <div className="otp-modal-backdrop" role="presentation" onMouseDown={event => { if (event.currentTarget === event.target) close(); }}>
      <section className="otp-modal" role="dialog" aria-modal="true" aria-labelledby="purchase-verification-title">
        <button className="otp-modal-close" type="button" aria-label="Close email verification" onClick={close}><X /></button>
        <MailCheck aria-hidden="true" />
        <p className="eyebrow">Secure purchase journey</p>
        <h2 id="purchase-verification-title">Verify your email</h2>
        <p>We’ll send a six-digit code before opening your pre-filled WhatsApp order.</p>
        <form className="otp-form" onSubmit={submit}>
          <label><span>Email address</span><input type="email" autoComplete="email" required autoFocus value={email} onChange={event => setEmail(event.target.value)} disabled={otp.codeSent} placeholder="you@example.com" /></label>
          {otp.codeSent && <label><span>Verification code</span><input inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} required value={token} onChange={event => setToken(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit code" /></label>}
          <button className="button button-gold" disabled={otp.busy}>{otp.busy ? "Please wait…" : otp.codeSent ? "Verify & continue" : "Send verification code"}</button>
          {otp.codeSent && <button className="otp-change" type="button" onClick={() => { otp.resetCode(); setToken(""); }}>Use a different email</button>}
          {otp.message && <p className="otp-message" role="status">{otp.message}</p>}
        </form>
      </section>
    </div>}
  </>;
}

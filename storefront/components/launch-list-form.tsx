"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useEmailOtp } from "@/lib/use-email-otp";

export function LaunchListForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [complete, setComplete] = useState(false);
  const otp = useEmailOtp();

  async function save(userId: string) {
    if (!otp.client) return;
    const { error } = await otp.client.from("waitlist").insert({ user_id: userId, email: email.trim().toLowerCase(), full_name: name.trim(), source: "homepage" });
    if (error && error.code !== "23505") { otp.setMessage(error.message); return; }
    setComplete(true);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const existing = await otp.currentVerifiedUser(email);
    if (existing) { await save(existing.id); return; }
    if (!otp.codeSent) { await otp.sendCode(email, name); return; }
    const user = await otp.verifyCode(email, token);
    if (user) await save(user.id);
  }

  if (complete) return <div className="verified-success" role="status"><CheckCircle2 /><strong>You’re on the launch list.</strong><span>Your email has been verified.</span></div>;
  return <form className="launch-form otp-form" onSubmit={submit}>
    <label><span>Name</span><input name="name" autoComplete="name" placeholder="Your name" required value={name} onChange={event => setName(event.target.value)} disabled={otp.codeSent} /></label>
    <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required value={email} onChange={event => setEmail(event.target.value)} disabled={otp.codeSent} /></label>
    {otp.codeSent && <label><span>Verification code</span><input name="otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" minLength={6} maxLength={6} placeholder="6-digit code" required value={token} onChange={event => setToken(event.target.value.replace(/\D/g, "").slice(0, 6))} /></label>}
    <button className="button button-gold" type="submit" disabled={otp.busy}>{otp.busy ? "Please wait…" : otp.codeSent ? "Verify & join" : <>Send verification code <ArrowRight size={16} /></>}</button>
    {otp.codeSent && <button className="otp-change" type="button" onClick={() => { otp.resetCode(); setToken(""); }}>Use a different email</button>}
    {otp.message && <p className="otp-message" role="status">{otp.message}</p>}
    <small>By joining, you agree to receive Zucero updates. Unsubscribe anytime.</small>
  </form>;
}

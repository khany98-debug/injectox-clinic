"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";
import { ClinicLogo } from "@/components/clinic-logo";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const payload = await response.json() as { error?: string };
    if (!response.ok) { setError(payload.error ?? "Sign-in failed."); setLoading(false); return; }
    window.location.reload();
  }
  return <section className="admin-login-page"><form className="admin-login-card" onSubmit={submit}><span className="admin-login-mark"><ClinicLogo showClinic /></span><span className="eyebrow">Injectox Studio Admin</span><h1>Welcome back,<br /><em>Fatima.</em></h1><p>Enter the clinic password to manage public prices, client reviews and clinic details.</p><label><span>Admin password</span><div><LockKeyhole size={16} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required autoFocus /></div></label>{error && <p className="admin-login-error" role="alert">{error}</p>}<button className="button button-dark" type="submit" disabled={loading}>{loading ? "Signing in…" : "Open clinic dashboard"}</button></form></section>;
}

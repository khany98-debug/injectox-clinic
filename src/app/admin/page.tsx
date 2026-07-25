import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin-dashboard";
import { AdminLogin } from "@/components/admin-login";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Studio Admin", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const password = process.env.ADMIN_PASSWORD;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!password) return <AdminLogin />;
  if (password && cookie !== await adminToken(password)) return <AdminLogin />;
  return <><section className="admin-intro"><div className="shell"><span className="eyebrow">Injectox Clinic</span><p>Use this private workspace to manage the clinic diary, pricing, reviews and payment settings.</p></div></section><AdminDashboard /></>;
}

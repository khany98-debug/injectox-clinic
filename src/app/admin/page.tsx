import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Studio Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <><section className="admin-intro"><div className="shell"><span className="eyebrow">Injectox Clinic</span><p>Use this private workspace to manage the clinic diary, pricing, reviews and payment settings.</p></div></section><AdminDashboard /></>;
}

import type { Metadata } from "next";
import { Button } from "@/components/ui";

export const metadata: Metadata = { title: "Shop — Coming Soon", description: "A future curated edit of Injectox Clinic skincare and aftercare." };
export default function ShopPage() { return <section className="coming-soon shell"><div><span className="eyebrow">The Injectox edit</span><h1>Aftercare,<br /><em>curated.</em></h1><p>A considered collection of treatment-support and skincare products is coming soon. The shop route is ready to connect to a future commerce platform.</p><Button href="/treatments">Explore treatments</Button></div></section>; }

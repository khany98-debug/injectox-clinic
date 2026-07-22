import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage path="legal.cookies" title={legal.cookies.title} intro={legal.cookies.intro} sections={legal.cookies.sections} />; }

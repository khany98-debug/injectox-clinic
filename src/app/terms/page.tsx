import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";
export const metadata: Metadata = { title: "Website Terms" };
export default function TermsPage() { return <LegalPage path="legal.terms" title={legal.terms.title} intro={legal.terms.intro} sections={legal.terms.sections} />; }

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legal } from "@/lib/content";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <LegalPage path="legal.privacy" title={legal.privacy.title} intro={legal.privacy.intro} sections={legal.privacy.sections} />; }

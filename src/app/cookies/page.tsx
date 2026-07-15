import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage title="Cookies" intro="The current build is designed to work without marketing cookies. Update this page when analytics or advertising tools are selected." sections={[
  { title: "Essential cookies", copy: "These may be used where strictly necessary to provide security, remember choices or operate core website features." },
  { title: "Analytics", copy: "No analytics provider is assumed in this prototype. If analytics is added, document the provider, retention and consent requirements here." },
  { title: "External embeds", copy: "This build links to Instagram and Faces rather than loading tracking-heavy social embeds automatically. Those sites may set cookies after you follow a link." },
  { title: "Your choices", copy: "A consent banner should be enabled before any non-essential cookies are deployed. Users should be able to change or withdraw consent at any time." },
]} />; }

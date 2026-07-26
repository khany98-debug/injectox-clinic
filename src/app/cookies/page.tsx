import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage title="Cookies" intro="The current build is designed to work without marketing or analytics cookies from the site itself. Update this page and add a consent-management tool before enabling analytics, advertising or other non-essential tracking." sections={[
  { title: "Essential cookies", copy: "These may be used where strictly necessary to provide security, remember choices or operate core website features." },
  { title: "Analytics", copy: "No analytics provider is assumed in this prototype. If analytics is added, document the provider, retention and consent requirements here." },
  { title: "External embeds", copy: "Instagram and Faces are opened as external services. Google Maps is loaded only after you choose to load it; Google may then set cookies under its own privacy terms." },
  { title: "Your choices", copy: "A consent banner should be enabled before any non-essential cookies are deployed. Users should be able to change or withdraw consent at any time." },
]} />; }

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage title="Cookies" intro="The current build is designed to work without marketing or analytics cookies from the site itself. Update this page and add a consent-management tool before enabling analytics, advertising or other non-essential tracking." sections={[
  { title: "Essential cookies", copy: "These may be used where strictly necessary to provide security, remember choices or operate core website features. Your cookie choice is stored locally so we can remember it." },
  { title: "Analytics", copy: "No analytics provider is assumed in this prototype. If analytics is added, document the provider, retention and consent requirements here." },
  { title: "External embeds", copy: "Instagram and Faces are opened as external services. After you accept cookies, Google Maps loads as you scroll to the clinic-location section and may set cookies under Google’s own privacy terms." },
  { title: "Your choices", copy: "You can choose essential-only storage or accept cookies for the map. To change a saved choice, clear this site’s browser storage and reload the page." },
]} />; }

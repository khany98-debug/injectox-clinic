import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Cookie Policy" };
export default function CookiesPage() { return <LegalPage title="Cookies" intro="We use essential storage for core site features. If you accept cookies, we also enable selected advertising measurement and external embeds." sections={[
  { title: "Essential cookies", copy: "These may be used where strictly necessary to provide security, remember choices or operate core website features. Your cookie choice is stored locally so we can remember it." },
  { title: "Advertising measurement", copy: "If you accept cookies, Meta Pixel is loaded to measure page visits and when a visitor starts the external Faces booking journey. Meta processes this information under its own privacy terms." },
  { title: "External embeds", copy: "Instagram and Faces are opened as external services. After you accept cookies, Google Maps loads as you scroll to the clinic-location section and may set cookies under Google’s own privacy terms." },
  { title: "Your choices", copy: "You can choose essential-only storage or accept cookies for maps and advertising measurement. To change a saved choice, clear this site’s browser storage and reload the page." },
]} />; }

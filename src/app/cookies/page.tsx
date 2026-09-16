import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Cookie Policy", description: "How Injectox Clinic uses essential storage, advertising measurement and external services.", path: "/cookies" });
export default function CookiesPage() { return <LegalPage title="Cookies" intro="We use essential storage for core site features. If you accept cookies, we also enable selected advertising measurement and external embeds." sections={[
  { title: "Essential cookies", copy: "These may be used where strictly necessary to provide security, remember choices or operate core website features. Your cookie choice is stored locally so we can remember it." },
  { title: "Advertising measurement", copy: "If you accept cookies, Meta Pixel is loaded to measure page visits and when a visitor starts the external Faces booking journey. Meta processes this information under its own privacy terms." },
  { title: "External services", copy: "Instagram and Faces are opened as external services. A still map image is available without cookies; the link opens Google Maps in a separate service when you choose it." },
  { title: "Your choices", copy: "You can choose essential-only storage or accept cookies for maps and advertising measurement. To change a saved choice, clear this site’s browser storage and reload the page." },
]} />; }
